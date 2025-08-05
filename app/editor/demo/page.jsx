"use client";

import Button from "@/app/ui/button";
import CodeEditor from "@/app/ui/editor";
import ReceiptPrinterEncoder from "@point-of-sale/receipt-printer-encoder";
import React, { useRef } from "react";

async function text(encoder) {
  let result = "";

  if (encoder) {
    let columns = encoder.columns;
    let data = encoder.encode("commands");

    console.log(data);

    let classes = new Set();
    let size = "w1h1";
    let font = "fonta";
    let align = "left";

    let barcode = {};
    let qrcode = {};
    let pdf417 = {};

    result += `<div class="receipt" style="--columns: ${columns};">`;

    for (let line of data) {
      result += '<div class="text">';

      for (let command of line.commands) {
        if (command.type === "text") {
          result += command.value
            .split("")
            .map(
              (c) =>
                `<span class='character ${font} ${size} ${[
                  ...classes.keys(),
                ].join(" ")}'>${c}</span>`
            )
            .join("");
        }

        if (command.type === "align") {
          align = command.value;
        }

        if (command.type === "font") {
          font = `font${command.value.toLowerCase()}`;
        }

        if (command.type === "style") {
          if (command.property === "size") {
            size =
              command.value.width > 1 || command.value.height > 1
                ? `scale w${command.value.width} h${command.value.height}`
                : "";
          } else {
            if (command.value) {
              classes.add(command.property);
            } else {
              classes.delete(command.property);
            }
          }
        }

        if (command.type === "qrcode") {
          if (command.property) {
            qrcode[command.property] = command.value;
          }

          if (command.command === "print") {
            let properties = {
              bcid: "qrcode",
              text: qrcode.data,
              eclevel: qrcode.errorlevel.toUpperCase(),
              scale: qrcode.size,
            };

            result += `<div class='placeholder ${
              command.type
            } ${align}'><img src='https://bwipjs-api.metafloor.com/?${Object.entries(
              properties
            )
              .map((i) => i[0] + "=" + escape(i[1]))
              .join("&")}' onerror="this.style.display='none'"></div>`;

            qrcode = {};
          }
        }

        if (command.type === "pdf417") {
          if (command.property) {
            pdf417[command.property] = command.value;
          }

          if (command.command === "print") {
            let properties = {
              bcid: "pdf417",
              text: pdf417.data,
              eclevel: pdf417.errorlevel,
              rows: pdf417.rows,
              columns: pdf417.columns,
              scaleX: pdf417.width * 2,
              scaleY: pdf417.height * pdf417.width,
            };

            result += `<div class='placeholder ${
              command.type
            } ${align}'><img src='https://bwipjs-api.metafloor.com/?${Object.entries(
              properties
            )
              .map((i) => i[0] + "=" + escape(i[1]))
              .join("&")}' onerror="this.style.display='none'"></div>`;

            pdf417 = {};
          }
        }

        if (command.type === "barcode") {
          if (command.property) {
            barcode[command.property] = command.value;
          } else {
            if (command.value) {
              for (let key in command.value) {
                barcode[key] = command.value[key];
              }
            }

            let symbologies = {
              upca: "upca",
              upce: "upce",
              ean13: "ean13",
              ean8: "ean8",
              code39: "code39",
              coda39: "code39",
              itf: "interleaved2of5",
              "interleaved-2-of-5": "interleaved2of5",
              "nw-7": "rationalizedCodabar",
              codabar: "rationalizedCodabar",
              code93: "code93",
              code128: "code128",
              "gs1-128": "gs1-128",
              "gs1-databar-omni": "databaromni",
              "gs1-databar-truncated": "databartruncated",
              "gs1-databar-limited": "databarlimited",
              "gs1-databar-expanded": "databarexpanded",
              "code128-auto": "code128",
            };

            let properties = {
              bcid: symbologies[barcode.symbology],
              text: barcode.data,
              height: barcode.height / barcode.width / 4,
              scale: barcode.width,
            };

            if (barcode.text) {
              properties.includetext = "true";
              properties.textsize = 8;
            }

            result += `<div class='placeholder ${
              command.type
            } ${align}'><img src='https://bwipjs-api.metafloor.com/?${Object.entries(
              properties
            )
              .map((i) => i[0] + "=" + escape(i[1]))
              .join("&")}' onerror="this.style.display='none'"></div>`;

            barcode = {};
          }
        }

        if (command.type === "image") {
          let canvas = document.createElement("canvas");
          canvas.width = command.width;
          canvas.height = command.height;

          let ctx = canvas.getContext("2d");
          ctx.fillStyle = "black";

          for (let x = 0; x < command.width; x++) {
            for (let y = 0; y < command.height; y++) {
              let bit = 0;

              if (command.value == "raster") {
                let byte = y * (command.width >> 3) + (x >> 3) + 8;
                bit = (command.payload[byte] >> (7 - (x % 8))) & 1;
              } else {
                let skip = 4;

                if (encoder.language == "esc-pos") {
                  skip = 5;
                }

                let byte = x * 3 + Math.floor(y / 8) + skip;
                bit = (command.payload[byte] >> (7 - (y % 8))) & 1;
              }

              if (bit) {
                ctx.fillRect(x, y, 1, 1);
              }
            }
          }

          result += `<div class='placeholder ${
            command.type
          } ${align}'><img src='${canvas.toDataURL()}'  style='width: ${
            (command.width / 4) * 3
          }px; height: ${(command.height / 4) * 3}px;'></div>`;
        }

        if (command.type === "cut") {
          result += `<div class='cut'></div>`;
        }
      }

      result += "</div>";
    }

    result += "</div>";
  }

  return result;
}

export default function Editor() {
  const [preview, setPreview] = React.useState("");
  const aceRef = useRef(null);

  async function onChange(value) {
    let encoder = new ReceiptPrinterEncoder({
      columns: 32,
    });

    console.log(value);

    let eval_err = null;

    try {
      eval(`
      (function() {
          try {
              ${value}
          } catch (e) {
              eval_err = e;
          }
      })();
    `);
    } catch (e) {
      eval_err = e;
    }

    let temp_result = await text(encoder);
    console.log(temp_result);
    setPreview(temp_result);
  }

  return (
    <div className="min-h-screen h-full flex flex-col">
      <main className="grow flex flex-col">
        <nav className="h-14 border-b border-neutral-200 bg-neutral-100 flex space-x-1.5 text-lg items-center px-8">
          <p className="underline">Example Project</p>
          <p>by you</p>
          <div className="grow"></div>
          <Button className="bg-neutral-600">Run</Button>
        </nav>
        <div className="grid grid-cols-2 grow">
          <div className="w-full h-full border-r border-neutral-200">
            <CodeEditor ref={aceRef} onChange={onChange} />
          </div>
          <div className="bg-neutral-100 flex flex-col items-center px-4 py-12">
            <div className="w-[25rem] bg-neutral-400 h-2 translate-y-1"></div>
            <div
              className="bg-white w-[23rem] min-h-10 p-4 px-8 shrink font-mono z-10 whitespace-break-spaces"
              dangerouslySetInnerHTML={{ __html: preview }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}
