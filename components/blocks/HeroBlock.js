'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function HeroBlock({ data }) {
  const container = useRef();
  const eyebrowRef = useRef();
  const headingRef = useRef();
  const descRef = useRef();
  const buttonRef = useRef();
  const dashboardRef = useRef();
  const glowLeftRef = useRef();
  const glowRightRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(eyebrowRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .from(
        descRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .from(
        buttonRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      )
      .from(
        dashboardRef.current,
        {
          y: 80,
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
        },
        '-=0.2'
      );

    gsap.to(glowLeftRef.current, {
      x: 40,
      y: 20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(glowRightRef.current, {
      x: -30,
      y: -20,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0f1714] text-white"
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <div
          ref={glowLeftRef}
          className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-teal-500/20 blur-3xl"
        />

        <div
          ref={glowRightRef}
          className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full bg-lime-400/15 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        {data.eyebrow && (
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              {data.eyebrow}
            </p>
          </div>
        )}

        {data.heading && (
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-5xl mx-auto leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-teal-100 to-lime-200 bg-clip-text text-transparent">
              {data.heading}
            </span>
          </h1>
        )}

        {data.description && (
          <p
            ref={descRef}
            className="text-lg md:text-xl text-white/65 mt-8 max-w-3xl mx-auto leading-relaxed"
          >
            {data.description}
          </p>
        )}

        {data.button_text && data.button_url && (
          <div ref={buttonRef} className="mt-12">
            <Link
              href={data.button_url}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-lime-400 text-black px-8 py-4 rounded-full font-semibold shadow-2xl shadow-teal-500/20 hover:scale-105 transition duration-300"
            >
              {data.button_text}
              <span>→</span>
            </Link>
          </div>
        )}

        <div
          ref={dashboardRef}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl">
            <div className="rounded-2xl bg-[#111c18] p-8 grid md:grid-cols-3 gap-6">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-teal-500/20 to-transparent border border-white/5" />
              <div className="h-32 rounded-2xl bg-gradient-to-br from-lime-400/15 to-transparent border border-white/5" />
              <div className="h-32 rounded-2xl bg-gradient-to-br from-teal-300/10 to-transparent border border-white/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}