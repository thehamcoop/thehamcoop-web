"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const VALID_CATEGORIES = ["education", "manufacturing", "marketing", "rnd"];

export async function bulkDeletePosts(ids: string[]) {
  if (ids.length === 0) {
    return { success: false, error: "삭제할 게시글이 없습니다.", deletedCount: 0 };
  }

  const { error: attError } = await supabase
    .from("attachments")
    .delete()
    .in("post_id", ids);

  if (attError) {
    return { success: false, error: `첨부파일 삭제 실패: ${attError.message}`, deletedCount: 0 };
  }

  const { error, count } = await supabase
    .from("posts")
    .delete()
    .in("id", ids);

  if (error) {
    return { success: false, error: error.message, deletedCount: 0 };
  }

  return { success: true, deletedCount: count ?? ids.length };
}

export async function bulkUpdateCategory(ids: string[], categorySlug: string) {
  if (ids.length === 0) {
    return { success: false, error: "변경할 게시글이 없습니다.", updatedCount: 0 };
  }

  if (!VALID_CATEGORIES.includes(categorySlug)) {
    return { success: false, error: "유효하지 않은 카테고리입니다.", updatedCount: 0 };
  }

  const { error, count } = await supabase
    .from("posts")
    .update({ category_slug: categorySlug })
    .in("id", ids);

  if (error) {
    return { success: false, error: error.message, updatedCount: 0 };
  }

  return { success: true, updatedCount: count ?? ids.length };
}

export async function updatePostOrder(updates: { id: string; sort_order: number }[]) {
  if (updates.length === 0) {
    return { success: false, error: "변경할 순서 정보가 없습니다." };
  }

  const results = await Promise.all(
    updates.map(({ id, sort_order }) =>
      supabase.from("posts").update({ sort_order }).eq("id", id)
    )
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) {
    return { success: false, error: failed.error.message };
  }

  return { success: true };
}
