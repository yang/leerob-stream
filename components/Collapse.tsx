import { ReactNode, useState } from "react";
import { usePlasmicCanvasContext } from "@plasmicapp/host";

export function Collapse({
  className,
  header,
  children,
  previewOpen,
}: {
  className?: string;
  header?: ReactNode;
  children?: ReactNode;
  previewOpen?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isEditing = usePlasmicCanvasContext();
  const actuallyOpen = open || (previewOpen && isEditing);
  return (
    <div className={className}>
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: 8, cursor: "pointer" }}
      >
        {header}
      </div>
      {actuallyOpen && <div style={{ padding: 8 }}>{children}</div>}
    </div>
  );
}
