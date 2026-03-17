"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BlockContent {
  type: string;
  props?: { url?: string };
  content?: Array<{ type: string; props?: { url?: string } }>;
  children?: BlockContent[];
}

function extractFirstImage(blocks: BlockContent[]): string | null {
  for (const block of blocks) {
    if (block.type === "image" && block.props?.url) {
      return block.props.url;
    }
    if (block.content) {
      for (const inline of block.content) {
        if (inline.type === "image" && inline.props?.url) {
          return inline.props.url;
        }
      }
    }
    if (block.children) {
      const found = extractFirstImage(block.children);
      if (found) return found;
    }
  }
  return null;
}

function extractAttachments(
  blocks: BlockContent[]
): Array<{ file_name: string; file_url: string }> {
  const attachments: Array<{ file_name: string; file_url: string }> = [];

  for (const block of blocks) {
    if (block.type === "image" && block.props?.url) {
      const url = block.props.url;
      const name = url.split("/").pop() || "image";
      attachments.push({ file_name: name, file_url: url });
    }
    if (block.type === "file" && block.props?.url) {
      const url = block.props.url;
      const name = url.split("/").pop() || "file";
      attachments.push({ file_name: name, file_url: url });
    }
    if (block.children) {
      attachments.push(...extractAttachments(block.children));
    }
  }

  return attachments;
}

interface SavePostInput {
  title: string;
  category_slug: string;
  content: string;
  author_name: string;
  is_pinned: boolean;
}

export async function savePost(input: SavePostInput) {
  const blocks: BlockContent[] = JSON.parse(input.content);

  const thumbnailUrl = extractFirstImage(blocks) || "";

  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      category_slug: input.category_slug,
      content: input.content,
      author_name: input.author_name,
      thumbnail_url: thumbnailUrl,
      is_pinned: input.is_pinned,
    })
    .select()
    .single();

  if (postError) {
    return { success: false, error: postError.message };
  }

  const attachments = extractAttachments(blocks);

  if (attachments.length > 0) {
    const attachmentRows = attachments.map((att) => ({
      post_id: post.id,
      file_name: att.file_name,
      file_url: att.file_url,
      file_size: 0,
    }));

    const { error: attError } = await supabase
      .from("attachments")
      .insert(attachmentRows);

    if (attError) {
      return { success: true, post, warning: `첨부파일 저장 실패: ${attError.message}` };
    }
  }

  return { success: true, post };
}
