import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useClipMaxGsap() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hudContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Top Viewport Scroll Progress Ribbon
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15,
          },
        });
      }

      // 2. Hero Viewfinder HUD Scroll Dissolve (0px -> 480px)
      // Scales corners outward and fades out to guarantee ZERO text collision with lower sections!
      if (hudContainerRef.current) {
        gsap.to(hudContainerRef.current, {
          opacity: 0,
          scale: 1.08,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: hudContainerRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: true,
          },
        });

        // Dissolve corner brackets
        const corners = hudContainerRef.current.querySelectorAll(".hud-corner-bracket");
        if (corners.length > 0) {
          gsap.to(corners, {
            opacity: 0,
            x: (i) => (i % 2 === 0 ? -30 : 30),
            y: (i) => (i < 2 ? -20 : 20),
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: hudContainerRef.current,
              start: "top top",
              end: "bottom 40%",
              scrub: true,
            },
          });
        }
      }

      // 3. Staggered 3D Batch Reveal on the 6 Studio Clip Cards
      ScrollTrigger.batch(".studio-clip-card", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 44, rotateX: 10 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.08,
              ease: "power3.out",
              duration: 0.7,
              overwrite: "auto",
            }
          );
        },
        once: true,
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return {
    progressBarRef,
    hudContainerRef,
  };
}
