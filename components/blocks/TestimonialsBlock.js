'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TestimonialsBlock({ data }) {
  const totalTestimonials = Number(data.testimonials || 0);

  const testimonials = Array.from({ length: totalTestimonials }, (_, index) => ({
    quote: data[`testimonials_${index}_quote`],
    name: data[`testimonials_${index}_name`],
    role: data[`testimonials_${index}_role`],
    image: data[`testimonials_${index}_profile_image`],
  }));

  return (
    <section className="relative w-full overflow-hidden bg-[#0f1714] text-white py-28">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute bottom-[-160px] left-[-120px] w-[520px] h-[520px] rounded-full bg-lime-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
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
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={28}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
          className="!pb-16"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-8 shadow-2xl shadow-black/20 hover:-translate-y-2 hover:bg-white/[0.09] transition duration-300">
                <div className="text-5xl text-teal-300/60 mb-6">“</div>

                <p className="text-lg leading-relaxed text-white/75 mb-10">
                  {item.quote}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover border border-white/10"
                    />
                  )}

                  <div>
                    <h3 className="font-bold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-white/45">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}