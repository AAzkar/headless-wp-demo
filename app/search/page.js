import Link from 'next/link';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/wordpress';

export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    const query = params?.q || '';

    return {
        title: query
            ? `Search: ${query}`
            : 'Search',
        description: 'Search WordPress content',
    };
}

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const query = params?.q || '';

    let posts = [];

    if (query) {
        const data = await fetchGraphQL(
            `
      query SearchPosts($query: String!) {
        posts(first: 12, where: { search: $query }) {
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
      `,
            {
                query,
            }
        );

        posts = data.posts.nodes;
    }

    return (
        <main className="min-h-screen bg-[linear-gradient(90deg,#ffffff_0%,#f8fbf9_45%,#edf8f3_100%)] pt-40 pb-24">
            <section className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <p className="text-sm uppercase tracking-[0.3em] text-teal-700 mb-4">
                        Search
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#10231d]">
                        Search content
                    </h1>

                    <p className="text-lg text-gray-600 mt-6">
                        Search posts from WordPress.
                    </p>
                </div>

                <form
                    action="/search"
                    className="mb-16"
                >
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="Search posts..."
                        className="w-full rounded-2xl border border-gray-200 px-6 py-5 text-lg outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </form>

                {query && (
                    <p className="mb-10 text-gray-600">
                        Found {posts.length} result(s) for:
                        <span className="font-semibold text-[#10231d]">
                            {' '}"{query}"
                        </span>
                    </p>
                )}

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
                                    loading="eager"
                                />
                            )}

                            <div className="p-7">
                                <p className="text-sm text-gray-500 mb-3">
                                    {new Date(post.date).toLocaleDateString()}
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
                                    className="inline-flex mt-6 text-teal-700 font-semibold"
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