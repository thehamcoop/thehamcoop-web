"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface InstagramWebhookPayload {
  postId: string;
  thumbnailUrl: string;
  caption: string;
}

interface NaverBlogWebhookPayload {
  postId: string;
  title: string;
  content: string; // HTML
}

export async function publishToInstagram(payload: InstagramWebhookPayload) {
  const webhookUrl = process.env.INSTAGRAM_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: "인스타그램 웹훅 URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: "instagram",
        image_url: payload.thumbnailUrl,
        caption: payload.caption,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: `웹훅 요청 실패 (${response.status}): ${text}` };
    }

    // DB에 연동 상태 업데이트
    await supabase
      .from("posts")
      .update({ instagram_synced: true })
      .eq("id", payload.postId);

    return { success: true };
  } catch (err) {
    return { success: false, error: `웹훅 요청 오류: ${(err as Error).message}` };
  }
}

export async function publishToNaverBlog(payload: NaverBlogWebhookPayload) {
  const webhookUrl = process.env.NAVER_BLOG_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: "네이버 블로그 웹훅 URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: "naver_blog",
        title: payload.title,
        content: payload.content,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: `웹훅 요청 실패 (${response.status}): ${text}` };
    }

    // DB에 연동 상태 업데이트
    await supabase
      .from("posts")
      .update({ naver_blog_synced: true })
      .eq("id", payload.postId);

    return { success: true };
  } catch (err) {
    return { success: false, error: `웹훅 요청 오류: ${(err as Error).message}` };
  }
}
