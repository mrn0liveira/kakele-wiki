"use client";

import MarkdownPreview from "../protected/blog/create/markdown-preview";

export default function Content({ content }: { content: string }) {
	return <MarkdownPreview content={content || ""} />;
}
