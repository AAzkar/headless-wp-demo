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
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      generalSettings {
        title
      }
    }
    `,
    { slug }
  );

  if (!data.post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${data.post.title} | ${data.generalSettings.title}`,
    description: data.post.excerpt?.replace(/<[^>]*>/g, '') || '',
    openGraph: {
      title: data.post.title,
      description: data.post.excerpt?.replace(/<[^>]*>/g, '') || '',
      images: data.post.featuredImage?.node?.sourceUrl
        ? [data.post.featuredImage.node.sourceUrl]
        : [],
    },
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
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    `,
    { slug }
  );

  const post = data.post;

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(90deg,#ffffff_0%,#f8fbf9_45%,#edf8f3_100%)] pt-40 pb-24">
      <article>
        <section className="max-w-5xl mx-auto px-6 text-center">
          <Link
            href="/blog"
            className="inline-flex mb-8 text-sm font-semibold text-teal-700 hover:text-teal-900"
          >
            ← Back to blog
          </Link>

          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {post.categories?.nodes?.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="rounded-full bg-teal-50 text-teal-700 px-4 py-2 text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#10231d] max-w-5xl mx-auto">
            {post.title}
          </h1>

          <p className="text-gray-500 mt-6">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </section>

        {post.featuredImage?.node?.sourceUrl && (
          <section className="max-w-6xl mx-auto px-6 mt-14">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              width={1600}
              height={900}
              priority
              className="w-full h-[520px] object-cover rounded-[2rem] shadow-2xl"
            />
          </section>
        )}

        <section className="max-w-3xl mx-auto px-6 mt-16">
          <div
            className="
  prose
  prose-lg
  max-w-none
  text-gray-700

  prose-p:text-gray-700
  prose-li:text-gray-700
  prose-strong:text-[#10231d]

  prose-h1:text-[#10231d]
  prose-h1:text-5xl
  prose-h1:font-bold

  prose-h2:text-[#10231d]
  prose-h2:text-4xl
  prose-h2:font-bold
  prose-h2:mt-12
  prose-h2:mb-6

  prose-h3:text-[#10231d]
  prose-h3:text-3xl
  prose-h3:font-semibold
  prose-h3:mt-10
  prose-h3:mb-5

  prose-h4:text-[#10231d]
  prose-h4:text-2xl
  prose-h4:font-semibold

  prose-a:text-teal-700
  prose-a:no-underline
  hover:prose-a:text-teal-900

  prose-blockquote:text-gray-600
  prose-code:text-[#10231d]

  prose-img:rounded-3xl
  prose-img:shadow-xl
"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
      </article>
    </main>
  );
}