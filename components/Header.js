import Link from 'next/link';
import { fetchGraphQL } from '@/lib/wordpress';

export default async function Header() {
  const data = await fetchGraphQL(`
    {
      generalSettings {
        title
      }
      menu(id: "main-menu", idType: SLUG) {
        menuItems {
          nodes {
            label
            path
          }
        }
      }
    }
  `);

  const siteTitle = data.generalSettings.title;
  const menuItems = data.menu.menuItems.nodes;

  return (
    <header className="fixed top-6 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
          <Link
            href="/"
            className="text-xl font-bold text-white"
          >
            {siteTitle}
          </Link>

          <nav className="flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.path === '#' ? '/' : item.path}
                className="text-sm text-white/80 hover:text-white transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}