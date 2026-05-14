import Link from 'next/link';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/wordpress';

export async function generateMetadata() {
  return {
    title: 'Blog',
    description: 'Latest articles and insights.',
  };
}

export default async function BlogPage() {
  const data = await fetchGraphQL(`
    {
      posts(first: 12) {
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
    <main className="min-h-screen bg-[linear-gradient(90deg,#ffffff_0%,#f8fbf9_45%,#edf8f3_100%)] pt-40 pb-24">
      <section className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-700 mb-4">
            Blog
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#10231d]">
            Latest insights
          </h1>

          <p className="text-lg text-gray-600 mt-6">
            Articles pulled directly from WordPress through GraphQL.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition duration-300"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={1200}
                  height={700}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              )}

              <div className="p-7">
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>

                <h2 className="text-2xl font-bold text-[#10231d] mb-4">
                  {post.title}
                </h2>

                <div
                  className="text-gray-600 leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />

                <Link
                  href={`/post/${post.slug}`}
                  className="inline-flex mt-6 text-teal-700 font-semibold hover:text-teal-900"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}