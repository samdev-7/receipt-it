import Button from "@/app/ui/button";

export default function Editor() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="h-14 bg-neutral-900 flex space-x-1.5 text-lg items-center px-8 text-white">
        <p className="underline">Example Project</p>
        <p>by you</p>
        <div className="grow"></div>
        <Button className="bg-neutral-700">Share</Button>
      </nav>
      <main className="grow flex flex-col">
        <div></div>
        <div className="grow bg-red-200">
          <Editor />
        </div>
      </main>
    </div>
  );
}
