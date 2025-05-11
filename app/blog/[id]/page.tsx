// app/blog/[id]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostData, getSortedPostsData } from '@/lib/posts';

type PageProps = {
  params: {
    id: string;
  };
};

// 動的なメタデータ生成
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostData(params.id);
  if (!post) return { title: '記事が見つかりません' };
  return {
    title: post.title,
  };
}

// 静的に生成するパス一覧
export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// 実際のページ本体
export default async function Post({ params }: PageProps) {
  const post = await getPostData(params.id);
  if (!post) return notFound();

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto p-8">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={`${post.title} のサムネイル`}
          className="mb-8 rounded-lg shadow-lg w-full max-h-[400px] object-cover"
        />
      )}
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}