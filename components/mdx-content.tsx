import fs from "node:fs/promises";
import path from "node:path";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
  file: string;
}

export async function MDXContent({ file }: MDXContentProps) {
  const filePath = path.join(process.cwd(), "content", file);
  const source = await fs.readFile(filePath, "utf8");
  return (
    <div className="mdx-content">
      <MDXRemote
        source={source}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}

export default MDXContent;
