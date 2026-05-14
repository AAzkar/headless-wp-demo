'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Reveal({
  children,
  y = 60,
  duration = 1,
  delay = 0,
}) {
  const container = useRef();

  useGSAP(() => {
    gsap.from(container.current, {
      y,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: container });

  return (
    <div ref={container}>
      {children}
    </div>
  );
}