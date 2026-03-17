"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(content),
  });

  return (
    <div className="viewer-wrapper">
      <BlockNoteView editor={editor} theme="light" editable={false} />
      <style jsx global>{`
        .viewer-wrapper .bn-editor {
          font-family: var(--font-sans);
          padding: 0;
        }
        .viewer-wrapper .bn-container {
          border: none;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}
