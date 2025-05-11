import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default async function BlogPage() {
  const allPostsData = await getSortedPostsData(); // ← await を追加

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-accent mb-6">Blog</h1>
      <ul className="space-y-4">
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/blog/${id}`} className="text-xl text-accent hover:underline">
              {title}
            </Link>
            <div className="text-sm text-gray-400">
              {new Date(date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
