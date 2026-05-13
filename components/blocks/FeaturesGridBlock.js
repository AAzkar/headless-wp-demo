import IconRenderer from '@/components/ui/IconRenderer';

export default function FeaturesGridBlock({ data }) {
  const totalFeatures = Number(data.features || 0);

  const features = Array.from({ length: totalFeatures }, (_, index) => ({
    icon: data[`features_${index}_icon`],
    title: data[`features_${index}_title`],
    description: data[`features_${index}_description`],
  }));

  return (
    <section className="relative w-full py-28 overflow-hidden bg-[linear-gradient(90deg,#ffffff_0%,#f8fbf9_45%,#edf8f3_100%)]">

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-lime-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          {data.eyebrow && (
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
                {data.eyebrow}
              </p>
            </div>
          )}

          {data.heading && (
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#10231d] via-teal-700 to-lime-600 bg-clip-text text-transparent">
                {data.heading}
              </span>
            </h2>
          )}

          {data.description && (
            <p className="text-lg md:text-xl text-gray-600 mt-8 leading-relaxed max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              {feature.icon && (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-lime-400 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-teal-500/20">
                  <IconRenderer
                    name={feature.icon}
                    size={28}
                    className="text-white"
                  />
                </div>
              )}

              <h3 className="text-2xl font-bold text-[#10231d] mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}