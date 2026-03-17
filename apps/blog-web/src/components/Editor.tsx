"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { supabase } from "@/lib/supabase";

async function uploadFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("blog-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

interface EditorProps {
  onChange?: (content: string) => void;
  initialContent?: string;
}

export default function Editor({ onChange, initialContent }: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile,
  });

  return (
    <div className="editor-wrapper">
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={() => {
          const content = JSON.stringify(editor.document);
          onChange?.(content);
        }}
      />
      <style jsx global>{`
        .editor-wrapper .bn-editor {
          min-height: 420px;
          font-family: var(--font-sans);
          padding: 0;
          margin: 0 auto;
        }
        .editor-wrapper .bn-container {
          border: none;
          border-radius: 0;
        }
        .editor-wrapper .bn-block-group {
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
