/* ──────────────────────────────────────────────
 *  Supabase 테이블 스키마 기반 TypeScript 타입 정의
 *  테이블: posts, attachments
 * ────────────────────────────────────────────── */

// ─── posts ───────────────────────────────────

export interface Post {
  id: string;
  category_slug: string;
  title: string;
  content: string;
  author_name: string;
  thumbnail_url: string;
  thumbnail_position: string;
  views: number;
  is_pinned: boolean;
  sort_order: number;
  naver_blog_synced: boolean;
  instagram_synced: boolean;
  created_at: string;
  updated_at: string;
}

export type PostInsert = Omit<Post, "id" | "views" | "is_pinned" | "sort_order" | "naver_blog_synced" | "instagram_synced" | "thumbnail_position" | "created_at" | "updated_at"> &
  Partial<Pick<Post, "id" | "views" | "is_pinned" | "sort_order" | "naver_blog_synced" | "instagram_synced" | "thumbnail_position" | "created_at" | "updated_at">>;

export type PostUpdate = Partial<Omit<Post, "id">>;

// ─── attachments ─────────────────────────────

export interface Attachment {
  id: string;
  post_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  created_at: string;
}

export type AttachmentInsert = Omit<Attachment, "id" | "created_at"> &
  Partial<Pick<Attachment, "id" | "created_at">>;

export type AttachmentUpdate = Partial<Omit<Attachment, "id">>;

// ─── Supabase Database 타입 (createClient 제네릭용) ──

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: PostInsert;
        Update: PostUpdate;
      };
      attachments: {
        Row: Attachment;
        Insert: AttachmentInsert;
        Update: AttachmentUpdate;
      };
    };
  };
}
