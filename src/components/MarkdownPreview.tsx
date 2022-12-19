import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";

export const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);
