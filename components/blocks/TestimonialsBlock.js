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
        <section className="w-full bg-zinc-950 text-white py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="max-w-3xl mb-14">
                    {data.eyebrow && (
                        <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4">
                            {data.eyebrow}
                        </p>
                    )}

                    {data.heading && (
                        <h2 className="text-4xl md:text-6xl font-bold">
                            {data.heading}
                        </h2>
                    )}
                </div>

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="h-full rounded-3xl bg-white/10 border border-white/10 p-8 backdrop-blur">
                                <p className="text-xl leading-relaxed text-white/80 mb-8">
                                    “{item.quote}”
                                </p>

                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-full object-cover mb-6 border border-white/10"
                                    />
                                )}

                                <div>
                                    <h3 className="font-bold text-lg">
                                        {item.name}
                                    </h3>
                                    <p className="text-white/50">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}