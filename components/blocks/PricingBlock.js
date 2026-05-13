import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingBlock({ data }) {
  const totalPlans = Number(data.plans || 0);

  const plans = Array.from({ length: totalPlans }, (_, index) => ({
    name: data[`plans_${index}_name`],
    price: data[`plans_${index}_price`],
    billing: data[`plans_${index}_billing_note`],
    features: data[`plans_${index}_features`]
      ?.split('\n')
      .filter(Boolean),
    buttonText: data[`plans_${index}_button_text`] || 'Get Started',
    buttonUrl: data[`plans_${index}_button_url`] || '#',
    highlighted: data[`plans_${index}_highlighted`] === '1',
  }));

  return (
    <section className="relative w-full overflow-hidden bg-[#0f1714] py-28 text-white">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-[420px] h-[420px] rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[520px] h-[520px] rounded-full bg-lime-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          {data.eyebrow && (
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                {data.eyebrow}
              </p>
            </div>
          )}

          {data.heading && (
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-teal-100 to-lime-200 bg-clip-text text-transparent">
                {data.heading}
              </span>
            </h2>
          )}

          {data.description && (
            <p className="text-lg text-white/65 mt-8 leading-relaxed max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl border p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-teal-500/20 to-lime-400/10 border-teal-300/30 shadow-2xl shadow-teal-500/20 scale-105'
                  : 'bg-white/[0.05] border-white/10 hover:bg-white/[0.08]'
              }`}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  {plan.name}
                </h3>

                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold">
                    ${plan.price}
                  </span>

                  <span className="text-white/50 mb-2">
                    {plan.billing}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features?.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white/75"
                  >
                    <Check
                      size={18}
                      className="text-teal-300 flex-shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.buttonUrl}
                className={`w-full inline-flex justify-center px-6 py-4 rounded-full font-semibold transition ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-teal-400 to-lime-300 text-black hover:scale-105'
                    : 'bg-white text-black hover:scale-105'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}