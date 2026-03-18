/**
 * BlockNote JSON → 플레인 텍스트 (인스타그램 캡션용)
 * BlockNote JSON → HTML (네이버 블로그용)
 */

interface InlineContent {
  type: string;
  text?: string;
  styles?: { bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean };
  props?: { url?: string };
  content?: InlineContent[];
}

interface BlockContent {
  type: string;
  props?: Record<string, unknown>;
  content?: InlineContent[];
  children?: BlockContent[];
}

/** 인라인 콘텐츠에서 텍스트만 추출 */
function inlineToText(inlines: InlineContent[]): string {
  return inlines
    .map((inline) => {
      if (inline.type === "text") return inline.text || "";
      if (inline.type === "link")
        return inline.content?.map((c) => c.text || "").join("") || "";
      return "";
    })
    .join("");
}

/** BlockNote JSON → 플레인 텍스트 */
export function blocksToPlainText(blocks: BlockContent[]): string {
  const lines: string[] = [];

  for (const block of blocks) {
    if (block.content && block.content.length > 0) {
      const text = inlineToText(block.content);
      if (text) {
        if (block.type === "heading") {
          lines.push(`\n${text}\n`);
        } else if (block.type === "bulletListItem") {
          lines.push(`• ${text}`);
        } else if (block.type === "numberedListItem") {
          lines.push(`- ${text}`);
        } else {
          lines.push(text);
        }
      }
    }

    if (block.children && block.children.length > 0) {
      const childText = blocksToPlainText(block.children);
      if (childText) lines.push(childText);
    }
  }

  return lines.join("\n");
}

/** 인라인 콘텐츠 → HTML */
function inlineToHtml(inlines: InlineContent[]): string {
  return inlines
    .map((inline) => {
      if (inline.type === "text") {
        let html = escapeHtml(inline.text || "");
        if (inline.styles?.bold) html = `<b>${html}</b>`;
        if (inline.styles?.italic) html = `<i>${html}</i>`;
        if (inline.styles?.underline) html = `<u>${html}</u>`;
        if (inline.styles?.strikethrough) html = `<s>${html}</s>`;
        return html;
      }
      if (inline.type === "link") {
        const href = inline.props?.url || "#";
        const content = inline.content
          ?.map((c) => escapeHtml(c.text || ""))
          .join("");
        return `<a href="${escapeHtml(href)}">${content}</a>`;
      }
      return "";
    })
    .join("");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** BlockNote JSON → HTML */
export function blocksToHtml(blocks: BlockContent[]): string {
  const parts: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "heading": {
        const level = (block.props?.level as number) || 1;
        const tag = `h${Math.min(level, 6)}`;
        parts.push(
          `<${tag}>${inlineToHtml(block.content || [])}</${tag}>`
        );
        break;
      }
      case "paragraph":
        parts.push(`<p>${inlineToHtml(block.content || [])}</p>`);
        break;
      case "bulletListItem":
        parts.push(`<li>${inlineToHtml(block.content || [])}</li>`);
        break;
      case "numberedListItem":
        parts.push(`<li>${inlineToHtml(block.content || [])}</li>`);
        break;
      case "image":
        if (block.props?.url) {
          parts.push(
            `<figure><img src="${escapeHtml(block.props.url as string)}" alt="" style="max-width:100%;" /></figure>`
          );
        }
        break;
      case "codeBlock":
        parts.push(
          `<pre><code>${inlineToHtml(block.content || [])}</code></pre>`
        );
        break;
      default:
        if (block.content && block.content.length > 0) {
          parts.push(`<p>${inlineToHtml(block.content)}</p>`);
        }
        break;
    }

    if (block.children && block.children.length > 0) {
      parts.push(blocksToHtml(block.children));
    }
  }

  return parts.join("\n");
}

/** BlockNote JSON에서 첫 번째 이미지 URL 추출 */
export function extractFirstImageUrl(
  blocks: BlockContent[]
): string | null {
  for (const block of blocks) {
    if (block.type === "image" && block.props?.url) {
      return block.props.url as string;
    }
    if (block.children) {
      const found = extractFirstImageUrl(block.children);
      if (found) return found;
    }
  }
  return null;
}
