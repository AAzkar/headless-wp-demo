import { fetchGraphQL } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const data = await fetchGraphQL(
        `
    query GetPageSEO($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        slug
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
        blocks
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
        <main>
            <BlockRenderer blocks={page.blocks} />
        </main>
    );
}