import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

export function MetaProgramVisual({
  imagePath,
  title,
  visualScene,
}: {
  imagePath?: string;
  title: string;
  visualScene: string;
}) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-md border border-dashed border-border/80 bg-background/70 p-3">
      <div className="mb-2 flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-normal text-muted-foreground">
        <ImageIcon className="size-4 shrink-0" />
        <span className="min-w-0 break-words [overflow-wrap:anywhere]">
          {imagePath ? "Visual reference" : "Visual placeholder"}
        </span>
      </div>
      {imagePath ? (
        <div className="relative aspect-[4/3] w-full min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-muted/20">
          <Image
            alt={`Meta-program visual for ${title}: ${visualScene}`}
            className="object-contain"
            fill
            sizes="(min-width: 1280px) 390px, (min-width: 768px) 50vw, 100vw"
            src={imagePath}
          />
        </div>
      ) : (
        <p className="min-w-0 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
          {visualScene}
        </p>
      )}
    </div>
  );
}
