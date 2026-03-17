import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(request: Request) {
  const { password, token } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // 토큰 검증 모드 (페이지 로드 시 localStorage 토큰 확인)
  if (token) {
    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data } = await adminClient
      .from("admin_sessions")
      .select("*")
      .eq("token", token)
      .gt("expires_at", new Date().toISOString())
      .single();

    return NextResponse.json({ success: !!data });
  }

  // 비밀번호 로그인 모드
  if (password !== adminPassword) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  if (!serviceRoleKey || !supabaseUrl) {
    return NextResponse.json({ success: true });
  }

  // 세션 토큰 생성 및 DB 저장
  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24시간

  // 기존 만료된 세션 정리
  await adminClient
    .from("admin_sessions")
    .delete()
    .lt("expires_at", new Date().toISOString());

  // 새 세션 저장
  await adminClient.from("admin_sessions").insert({
    token: sessionToken,
    expires_at: expiresAt,
  });

  return NextResponse.json({ success: true, token: sessionToken });
}
