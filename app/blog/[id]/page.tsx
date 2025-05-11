// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostData, getSortedPostsData } from '@/lib/posts';

type Props = {
  params: {
    id: string;
  };
};

// params.idの非同期解決
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.id); // 非同期でデータを取得
  return {
    title: post.title,
  };
}

// generateStaticParams は修正しなくて大丈夫
export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ id: post.id }));
}

export default async function Post({ params }: Props) {
  // params.idの非同期解決
  const post = await getPostData(params.id);

  // slugが見つからなければ404ページを表示
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
