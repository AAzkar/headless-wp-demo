import Link from 'next/link';
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
    <footer className="relative bg-black text-white mt-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-white/60 leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-5">
              Navigation
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-white/70 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-5">
              Let's Build
            </h3>

            <p className="text-white/60 mb-6">
              Ready to build something modern with headless WordPress?
            </p>

            <Link
              href="/contact"
              className="inline-flex bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {title}. All rights reserved.
          </p>

          <p className="text-white/30 text-sm">
            Built with Next.js + WordPress Headless
          </p>
        </div>
      </div>
    </footer>
  );
}