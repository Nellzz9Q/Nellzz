// posts.ts
import fs from 'fs/promises'; // ←同期から非同期へ！
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import breaks from 'remark-breaks';
import { remarkSubTitle } from '@/lib/remarkPlugins';
import { rehype } from 'rehype';
import rehypeClassNames from 'rehype-class-names';
import gfm from 'remark-gfm'; // ← 追加

const postsDirectory = path.join(process.cwd(), 'posts');

// ✅ 非同期に修正
export async function getSortedPostsData() {
  const fileNames = await fs.readdir(postsDirectory);

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as { date: string; title: string; thumbnail?: string }),
      };
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ✅ これも非同期に
export async function getAllPostSlugs() {
  const fileNames = await fs.readdir(postsDirectory);

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
}

// ✅ ここも非同期に
export async function getPostData(id: string) {
  // 拡張子を二重に追加しないように、idに`.md`が含まれている場合は追加しない
  const fileName = id.endsWith('.md') ? id : `${id}.md`;
  const fullPath = path.join(postsDirectory, fileName);
  
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // 他の処理...
    const processedContent = await remark()
      .use(remarkSubTitle)
      .use(breaks)
      .use(gfm)
      .use(html)
      .process(matterResult.content);
    const rehypeContent = await rehype()
      .use(rehypeClassNames, { h3: 'text-2xl font-bold' })
      .process(processedContent.toString());

    const contentHtml = rehypeContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as { date: string; title: string; thumbnail?: string }),
    };
  } catch (error) {
    console.error(`Error reading file at path: ${fullPath}`, error);
    throw error; // ファイルが見つからない場合など、エラー処理を加える
  }
}
