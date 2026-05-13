import { fetchGraphQL } from '@/lib/wordpress';

export default async function Footer() {
  const data = await fetchGraphQL(`
    {
      generalSettings {
        title
        description
      }
    }
  `);

  const { title, description } = data.generalSettings;

  return (
    <footer className="border-t mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between gap-3">
        <p>© {new Date().getFullYear()} {title}</p>
        <p>{description}</p>
      </div>
    </footer>
  );
}