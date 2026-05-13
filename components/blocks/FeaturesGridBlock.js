export default function FeaturesGridBlock({ data }) {
  const totalFeatures = Number(data.features || 0);

  const features = Array.from({ length: totalFeatures }, (_, index) => ({
    icon: data[`features_${index}_icon`],
    title: data[`features_${index}_title`],
    description: data[`features_${index}_description`],
  }));

  return (
    <section className="w-full bg-white text-black py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          
          {data.eyebrow && (
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
              {data.eyebrow}
            </p>
          )}

          {data.heading && (
            <h2 className="text-4xl md:text-6xl font-bold">
              {data.heading}
            </h2>
          )}

          {data.description && (
            <p className="text-lg text-gray-600 mt-6">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition"
            >
              {feature.icon && (
                <div className="text-4xl mb-6">
                  {feature.icon}
                </div>
              )}

              <h3 className="text-xl font-bold mb-3">
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