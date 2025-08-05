import Button from "@/app/ui/button";
import CodeEditor from "@/app/ui/editor";

export default function Editor() {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <nav className="h-14 bg-neutral-200 flex space-x-1.5 text-lg items-center px-8">
        <p className="underline">Example Project</p>
        <p>by you</p>
        <div className="grow"></div>
        <Button className="bg-neutral-700">Share</Button>
      </nav>
      <main className="grow flex flex-col">
        <div className="h-18 border-b border-neutral-300"></div>
        <div className="grid grid-cols-2 grow">
          <div className="w-full h-full border-r border-neutral-300">
            <CodeEditor />
          </div>
          <div className=""></div>
        </div>
      </main>
    </div>
  );
}
