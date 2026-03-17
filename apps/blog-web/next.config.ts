import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@tiptap/core",
    "@tiptap/pm",
    "@tiptap/react",
    "@tiptap/starter-kit",
    "@tiptap/extension-bold",
    "@tiptap/extension-code",
    "@tiptap/extension-italic",
    "@tiptap/extension-strike",
    "@tiptap/extension-underline",
    "@tiptap/extension-link",
    "@tiptap/extension-text",
    "@tiptap/extension-paragraph",
    "@tiptap/extension-document",
    "@tiptap/extension-heading",
    "@tiptap/extension-hard-break",
    "@tiptap/extension-horizontal-rule",
    "@tiptap/extension-blockquote",
    "@tiptap/extension-code-block",
    "@tiptap/extension-list",
    "@tiptap/extension-bubble-menu",
    "@tiptap/extension-floating-menu",
    "@tiptap/extensions",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
