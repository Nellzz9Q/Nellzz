import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import breaks from 'remark-breaks'; // 改行処理
import { remarkSubTitle } from '@/lib/remarkPlugins'; // 自作プラグイン
import { rehype } from 'rehype'; // 変更点
import rehypeClassNames from 'rehype-class-names';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; thumbnail?: string }), // ←ここ
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // remark でマークダウンを処理
  const processedContent = await remark()
    .use(remarkSubTitle) // 自作プラグイン
    .use(breaks) // 改行処理
    .use(html) // HTMLに変換
    .process(matterResult.content); // マークダウンからHTMLに変換

  // rehype でクラス名追加などの最終的な加工
  const rehypeContent = await rehype()
    .use(rehypeClassNames, { h3: 'text-2xl font-bold' }) // h3タグにクラス追加
    .process(processedContent.toString()); // processedContentを渡して最終処理

  const contentHtml = rehypeContent.toString(); // 最終的なHTML

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}