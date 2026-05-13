import Link from 'next/link';

export default function HeroBlock({ data }) {
  return (
    <section className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-8 text-center">
        {data.eyebrow && (
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
            {data.eyebrow}
          </p>
        )}

        {data.heading && (
          <h1 className="text-5xl md:text-7xl font-bold max-w-4xl mx-auto">
            {data.heading}
          </h1>
        )}

        {data.description && (
          <p className="text-lg md:text-xl text-gray-300 mt-8 max-w-2xl mx-auto">
            {data.description}
          </p>
        )}

        {data.button_text && data.button_url && (
          <Link
            href={data.button_url}
            className="inline-flex mt-10 bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            {data.button_text}
          </Link>
        )}
      </div>
    </section>
  );
}