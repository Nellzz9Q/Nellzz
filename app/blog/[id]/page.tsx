// app/blog/[slug]/page.tsx

import { getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/getSortedPostsData'; // ← @ が使えるならこれ

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.id);
  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id, // ← post.id が 'first-post' のようなスラッグになっていること！
  }));
}

export default async function Post({ params }: Props) {
  const post = await getPostData(params.id);
  if (!post) return notFound(); //slug

  return (
<div className="prose prose-lg dark:prose-invert max-w-none mx-auto p-8">
  {post.thumbnail && ( //post.tsは直したのにここのファイルだけがなぜかエラー
    <img
      src={post.thumbnail} //post.tsは直したのにここのファイルだけがなぜかエラー
      alt={`${post.title} のサムネイル`}
      className="mb-8 rounded-lg shadow-lg w-full max-h-[400px] object-cover"
    />
  )}
  <h1 className='text-3xl font-bold'>{post.title}</h1>
  <div className="text-gray-500 mb-4">
    {new Date(post.date).toLocaleDateString()}
  </div>
  <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
</div>

  );
}
