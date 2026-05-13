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
        <header className="border-b">
            <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    {siteTitle}
                </Link>

                <nav className="flex gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.path === '#' ? '/' : item.path}
                            className="text-sm hover:text-blue-600"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}