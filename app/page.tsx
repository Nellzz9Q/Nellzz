import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const allPostsData = await getSortedPostsData(); // SSG的な使い方OK
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
      {/* アイコン */}
      <div className="mb-4">
        <img
          src="/NellzzRD-2x.jpg"
          alt="Profile Icon"
          className="w-55 h-55 rounded-full"
        />
      </div>
      <h1 className="text-5xl font-bold mb-2">Nellzz</h1>
      <p className='text-1xl mb-2'>日本の常に眠気がMaxの学生開発者</p>
      <p className="text-gray-500">Web Developer & Designer</p>
      <div className="mb-4 flex">
        <a href="https://github.com/nellzz9Q" target="_blank">
          <img
          src="/github.jpg"
          alt="github"
          className="w-5 h-5"
          />
        </a>
        <a href="https://figma.com/@nellzz9uestQ" target="_blank">
        <img
          src="/figma.jpg"
          alt="figma"
          className="w-5 h-5"
        />
        </a>
      </div>
<section className="mt-8">
  <h2 className="text-3xl font-semibold mb-4">Blogz</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {allPostsData.map((post) => (
      <div key={post.id} className="rounded overflow-hidden shadow-lg bg-white">
        {post.thumbnail && ( //thumbnailがエラー
          <Image
            src={post.thumbnail} //thumbnailがエラー
            alt={`${post.title} のサムネイル`}
            width={800}
            height={400}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-lg font-bold">
            <Link href={`/blog/${post.id}`}>
            {post.title}
            </Link> 
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  );
}
