import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const budget = formData.get("budget") as string;
    const taskType = formData.get("taskType") as string;
    const detail = formData.get("detail") as string;
    const selectedChannels = JSON.parse(
      formData.get("selectedChannels") as string,
    ) as string[];
    const otherChannel = (formData.get("otherChannel") as string) || "";
    const otherTaskType = (formData.get("otherTaskType") as string) || "";

    const fileEntries = formData.getAll("files") as File[];
    const attachments = await Promise.all(
      fileEntries.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    // Supabase DB에 상담 신청 저장
    const supabase = getSupabase();
    const { error: dbError } = await supabase.from("consultations").insert({
      name,
      phone,
      email,
      company,
      message,
      budget,
      task_type: taskType,
      detail,
      visit_channels: selectedChannels,
      other_channel: otherChannel,
      other_task_type: otherTaskType,
    });

    if (dbError) {
      console.error("DB 저장 실패:", dbError.message);
    }

    // 이메일 전송
    const htmlContent = `
      <h2>새로운 상담 신청이 접수되었습니다.</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold; width: 140px;">방문 경로</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${selectedChannels.join(", ")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">성함</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">연락처</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">기관/직함</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${company}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">이메일</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">프로젝트 설명</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${message}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">희망 견적</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${Number(budget).toLocaleString("ko-KR")}원</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">의뢰 업무</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${taskType}</td>
        </tr>
        ${otherTaskType ? `<tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">그 외 문의분야</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${otherTaskType}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">의뢰 내용</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd; white-space: pre-wrap;">${detail}</td>
        </tr>
      </table>
    `;

    const { data, error } = await resend.emails.send({
      from: "상담 신청 <onboarding@resend.dev>",
      to: "thehamcoop@gmail.com",
      subject: `[상담 신청] ${name}님의 문의`,
      html: htmlContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { error: "이메일 전송에 실패했습니다." },
      { status: 500 },
    );
  }
}
