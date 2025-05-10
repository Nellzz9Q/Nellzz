import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
  title: matterResult.data.title, //ここがエラーになってる
  date: new Date(matterResult.data.date).toISOString(),
  thumbnail: matterResult.data.thumbnail ?? null,
};

  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
