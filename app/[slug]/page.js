import { fetchGraphQL } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await fetchGraphQL(
    `
    query GetPageSEO($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
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

  if (!data.page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${data.page.title} | ${data.generalSettings.title}`,
    description: data.page.content?.replace(/<[^>]*>/g, '') || '',
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const data = await fetchGraphQL(
    `
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
        slug
      }
    }
    `,
    {
      slug,
    }
  );

  const page = data.page;

  if (!page) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">
        {page.title}
      </h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}