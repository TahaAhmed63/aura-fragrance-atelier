
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Show loader for at least 1.5 seconds
    const timer = setTimeout(() => {
      // Animate the logo and text
      timeline
        .to('.loader-content', {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: 'power2.inOut'
        })
        .to('.preloader', {
          height: 0,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            setLoading(false);
          }
        });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader fixed inset-0 bg-luxury-black flex items-center justify-center z-50 overflow-hidden">
      <div className="loader-content flex flex-col items-center">
        <span className="loader mb-4"></span>
        <div className="mt-6">
          <h1 className={cn(
            "text-3xl font-bold text-gold font-cormorant tracking-wider",
            "animate-pulse"
          )}>
            BLISS & BLESS
          </h1>
          <p className="text-luxury-silver mt-2 text-sm tracking-widest font-light">SPECIALIST IN PERFUMES</p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
