import Button from "@/app/ui/button";
import CodeEditor from "@/app/ui/editor";

export default function Editor() {
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
            <CodeEditor />
          </div>
          <div className="bg-neutral-100 flex flex-col items-center px-4 py-12">
            <div className="w-[25rem] bg-neutral-400 h-2 translate-y-1"></div>
            <div className="bg-white w-96 min-h-10 p-4 px-8 shrink font-mono z-10">
              hi
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
