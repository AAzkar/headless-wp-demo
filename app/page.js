import { fetchGraphQL } from '@/lib/wordpress';
import BlockRenderer from '@/components/BlockRenderer';

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
      page(id: "home", idType: URI) {
        title
        blocks
      }
    }
  `);

  const page = data.page;

  return (
    <main>
      <BlockRenderer blocks={page.blocks} />
    </main>
  );
}