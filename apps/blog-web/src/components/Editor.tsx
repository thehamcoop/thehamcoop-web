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
    placeholders: {
      default: "명령어는 '/'를 입력하세요.",
    },
  });

  const handleChange = () => {
    // --- 입력 시 구분선으로 변환
    const block = editor.getTextCursorPosition().block;
    if (
      block.type === "paragraph" &&
      block.content &&
      Array.isArray(block.content) &&
      block.content.length === 1 &&
      block.content[0].type === "text" &&
      block.content[0].text === "---"
    ) {
      editor.updateBlock(block, {
        type: "paragraph",
        content: [{ type: "text", text: "———", styles: {} }],
        props: { ...block.props, textColor: "gray" },
      } as Parameters<typeof editor.updateBlock>[1]);
    }

    const content = JSON.stringify(editor.document);
    onChange?.(content);
  };

  return (
    <div className="editor-wrapper">
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={handleChange}
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
        .editor-wrapper [data-content-type="codeBlock"] {
          background-color: #F1F1F5 !important;
          border-radius: 0.5rem;
        }
        .editor-wrapper [data-content-type="codeBlock"] code,
        .editor-wrapper [data-content-type="codeBlock"] pre,
        .editor-wrapper [data-content-type="codeBlock"] span,
        .editor-wrapper [data-content-type="codeBlock"] * {
          color: #111111 !important;
        }
        .editor-wrapper [data-text-color="gray"] .bn-inline-content {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 100%;
          border-top: 1px solid #d1d5db;
          padding-top: 0.75rem;
          margin: 0.75rem 0;
        }
        .editor-wrapper .bn-block-outer.bn-block-outer-selected > .bn-block {
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
