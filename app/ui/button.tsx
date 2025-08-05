import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
    className?: string;
}>) {
  return (
    <button
      type="button"
      className={twMerge("bg-neutral-400 text-white px-4 py-1.5 hover:bg-neutral-500 transition-colors text-base", className)}
    >
      {children}
    </button>
  );
}