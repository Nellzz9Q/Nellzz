import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostData, getSortedPostsData } from '@/lib/posts';

type Props = {
  params: {
    id: string;
  };
};

// ✅ 動的パラメータを生成するApp Routerの方法
export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ id: post.id }));
}

// ✅ メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.id);
  return { title: post.title };
}

// ✅ 実際のページ本体
export default async function Post({ params }: Props) {
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
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}
