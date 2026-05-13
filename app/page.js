import { fetchGraphQL } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata() {
  const data = await fetchGraphQL(`
    {
      generalSettings {
        title
        description
      }
    }
  `);

  return {
    title: data.generalSettings.title,
    description: data.generalSettings.description,
  };
}

export default async function Home() {
  const data = await fetchGraphQL(`
    {
      posts {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage {
          node {
            sourceUrl
            altText
            }
          }
        }
      }
    }
  `);

  const posts = data.posts.nodes;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">
        Headless WordPress Blog
      </h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-2xl p-6">
            {post.featuredImage?.node?.sourceUrl && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                width={1200}
                height={700}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
            )}
            <Link href={`/post/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600">
                {post.title}
              </h2>
            </Link>

            <div
              className="text-gray-600 mt-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </article>
        ))}
      </div>
    </main>
  );
}