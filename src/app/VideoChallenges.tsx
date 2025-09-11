"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const VideoChallenges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    // Asegurar que el video esté listo
    const handleLoadedMetadata = () => {
      const videoDuration = video.duration;

      // Crear el ScrollTrigger con configuración responsiva
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "bottom top",
        pin: true,
        anticipatePin: 0,
        scrub: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress >= 0) {
            const progress = self.progress;
            const newTime = progress * videoDuration;

            if (Math.abs(video.currentTime - newTime) > 0.1) {
              video.currentTime = newTime;
            }
          }
        },
        onEnter: () => {
          video.pause();
          console.log("Video section entered at center");
        },
        onLeave: () => {
          video.pause();
        },
        onEnterBack: () => {
          video.pause();
        },
      });
    };

    if (video.readyState >= 2) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // Cleanup
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-challenge-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* iPhone Mockup - Responsivo */}
          <div className="relative order-1 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative flex justify-center">
                {/* iPhone Mockup Container Responsivo */}
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[450px]">
                  {/* iPhone Frame */}
                  <Image
                    src="/videos/Iiphone13promax.png"
                    alt="iPhone 13 Pro Max"
                    width={450}
                    height={850}
                    className="relative z-10 w-full h-auto"
                    priority
                  />

                  {/* Video positioned inside iPhone screen - Responsivo */}
                  <div className="absolute top-[6.4%] left-[9.8%] right-[9.8%] bottom-[4.7%] z-0 rounded-[8%] overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src="/videos/Challenges.mp4"
                      muted
                      playsInline
                      preload="metadata"
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Efectos visuales responsivos */}
              <div className="absolute inset-0 bg-gradient-to-r from-challenge-orange/20 to-challenge-purple/20 rounded-[3rem] blur-xl scale-105 -z-10"></div>

              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-challenge-orange rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-4 h-4 sm:w-6 sm:h-6 bg-challenge-purple rounded-full animate-pulse delay-300"></div>
            </div>
          </div>

          {/* Texto - Responsivo */}
          <div className="text-center lg:text-left order-2 lg:order-2 space-y-6 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Retos que <span className="text-gradient">desafían</span> y conectan
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-gray-300 leading-relaxed">
              Desde retos ligeros para romper el hielo hasta desafíos intensos que crearán 
              momentos inolvidables. Cada categoría está diseñada para el momento perfecto 
              y la compañía adecuada.
            </p>

            <div className="space-y-3 sm:space-y-4 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-challenge-green rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">
                  Retos categorizados por intensidad
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-challenge-pink rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">
                  Perfecto para cualquier ambiente social
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-challenge-purple rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">
                  Desde divertidos hasta atrevidos
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-challenge-orange rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm sm:text-base">
                  Nuevos retos cada semana
                </span>
              </div>
            </div>

            <div className="mt-6 lg:mt-8 text-xs sm:text-sm text-gray-400 bg-white/5 rounded-lg p-3 sm:p-4 max-w-md mx-auto lg:mx-0">
              <span className="text-challenge-orange">🎯 Nivel:</span> Tú decides 
              qué tan lejos quieres llegar con cada reto
            </div>
          </div>

        </div>
      </div>

      {/* Indicador de scroll responsivo */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs sm:text-sm text-gray-400 mb-2">
          Scroll para explorar los retos
        </div>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/20 rounded-full flex justify-center mx-auto">
          <div className="w-1 h-2 sm:h-3 bg-white/40 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoChallenges;