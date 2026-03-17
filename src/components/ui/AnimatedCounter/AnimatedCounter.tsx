/**
 * @file AnimatedCounter.tsx
 * @description Scroll-activated number counter for stat highlights.
 * @module src/components/ui/AnimatedCounter/AnimatedCounter
 */
import { useEffect, useRef, useState } from 'react';

export interface IAnimatedCounterProps {
  target: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter = ({
  target,
  label,
  suffix = '',
  duration = 2000,
}: IAnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    const element = containerReference.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    let animationFrame = 0;
    const animationStart = performance.now();

    const updateCount = (timestamp: number) => {
      const elapsed = timestamp - animationStart;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(target * progress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(updateCount);
      }
    };

    animationFrame = window.requestAnimationFrame(updateCount);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [duration, isVisible, target]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm" ref={containerReference}>
      <span className="font-heading text-4xl text-primary">
        {count}
        {suffix}
      </span>
      <span className="mt-2 block font-body text-sm text-muted">{label}</span>
    </div>
  );
};
