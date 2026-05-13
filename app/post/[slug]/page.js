import { fetchGraphQL } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await fetchGraphQL(
    `
    query GetPostSEO($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        excerpt
      }
      generalSettings {
        title
      }
    }
    `,
    {
      slug,
    }
  );

  if (!data.post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${data.post.title} | ${data.generalSettings.title}`,
    description: data.post.excerpt?.replace(/<[^>]*>/g, '') || '',
  };
}

export default async function SinglePost({ params }) {
  const { slug } = await params;

  const data = await fetchGraphQL(
    `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    `,
    {
      slug,
    }
  );

  const post = data.post;

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-blue-600">
        ← Back to posts
      </Link>

      {post.featuredImage?.node?.sourceUrl && (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          width={1400}
          height={800}
          className="w-full h-[420px] object-cover rounded-2xl mt-8 mb-8"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}