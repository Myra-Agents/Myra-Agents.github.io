/** macOS-style window chrome around a demo or screenshot. */
export function WindowFrame({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] border border-line-strong bg-paper shadow-[0_24px_60px_-24px_rgb(38_37_30_/_0.25)] ${className}`}
    >
      <div className="relative flex h-9 items-center border-b border-line bg-paper-2 px-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        {title ? (
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-ink-55">
            {title}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
