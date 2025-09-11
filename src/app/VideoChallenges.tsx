"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const VideoChallenges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    // Función para inicializar ScrollTrigger
    const initializeScrollTrigger = () => {
      const videoDuration = video.duration;

      // Limpiar triggers existentes para esta sección
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });

      // Pequeño delay para asegurar que el DOM esté estable
      setTimeout(() => {
        // Refrescar ScrollTrigger antes de crear nuevos triggers
        ScrollTrigger.refresh();

        ScrollTrigger.create({
          trigger: section,
          start: "center center",
          end: "bottom top",
          pin: true,
          anticipatePin: 0,
          scrub: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          refreshPriority: -1, // Prioridad baja para que se ejecute después
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
          },
          onLeave: () => {
            video.pause();
          },
          onEnterBack: () => {
            video.pause();
          },
        });
      }, 100); // 100ms delay para estabilidad
    };

    // Función para manejar cuando todo esté listo
    const handleAllReady = () => {
      if (video.readyState >= 2 && isReady) {
        initializeScrollTrigger();
      }
    };

    // Esperar a que el video esté completamente cargado
    const handleVideoReady = () => {
      if (video.readyState >= 2) {
        setIsReady(true);
      }
    };

    // Event listeners para diferentes estados de carga
    video.addEventListener("loadedmetadata", handleVideoReady);
    video.addEventListener("canplaythrough", handleVideoReady);

    // Si ya está listo, inicializar
    if (video.readyState >= 2) {
      handleVideoReady();
    }

    // Inicializar cuando todo esté listo
    handleAllReady();

    // Cleanup
    return () => {
      video.removeEventListener("loadedmetadata", handleVideoReady);
      video.removeEventListener("canplaythrough", handleVideoReady);

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [isReady]); // Dependencia en isReady

  // Efecto adicional para manejar el resize y refresh
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Refrescar en window load para asegurar que todo esté cargado
    const handleLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);

    // Si ya está cargado, ejecutar inmediatamente
    if (document.readyState === "complete") {
      handleLoad();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-challenge-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* iPhone Mockup - Responsive Order */}
          <div className="relative order-1 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[320px] xl:max-w-[360px]">
              <div className="relative flex justify-center">
                {/* iPhone Mockup Container */}
                <div className="relative w-full">
                  {/* iPhone Frame */}
                  <Image
                    src="/videos/Iiphone13promax.png"
                    alt="iPhone 13 Pro Max"
                    width={320}
                    height={600}
                    className="relative z-10 w-full h-auto"
                    priority
                    onLoad={() => {
                      // Cuando la imagen carga, refrescar ScrollTrigger
                      setTimeout(() => {
                        ScrollTrigger.refresh();
                      }, 50);
                    }}
                  />

                  {/* Video positioned inside iPhone screen - Responsive */}
                  <div className="absolute top-[6%] left-[10%] right-[10%] bottom-[4.5%] z-0 rounded-[20px] sm:rounded-[25px] overflow-hidden">
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

              {/* Background Effects - Responsive */}
              <div className="absolute inset-0 bg-gradient-to-r from-challenge-orange/20 to-challenge-purple/20 rounded-[2rem] blur-xl scale-105 -z-10"></div>

              {/* Floating Elements - Responsive */}
              <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-challenge-orange rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-3 h-3 sm:w-4 sm:h-4 bg-challenge-purple rounded-full animate-pulse delay-300"></div>
            </div>
          </div>

          {/* Texto - Responsive Order */}
          <div className="text-center lg:text-left order-2 lg:order-2 space-y-4 lg:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 leading-tight">
              Retos que <span className="text-gradient">desafían</span> y
              conectan
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-300 mb-4 lg:mb-6 leading-relaxed">
              Desde retos ligeros para romper el hielo hasta desafíos intensos
              que crearán momentos inolvidables. Cada categoría está diseñada
              para el momento perfecto y la compañía adecuada.
            </p>

            <div className="space-y-2 lg:space-y-3 text-left">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-challenge-green rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                  Retos categorizados por intensidad
                </span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-challenge-pink rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                  Perfecto para cualquier ambiente social
                </span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-challenge-purple rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                  Desde divertidos hasta atrevidos
                </span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-challenge-orange rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                  Nuevos retos cada semana
                </span>
              </div>
            </div>

            <div className="mt-4 lg:mt-6 text-xs sm:text-sm text-gray-400 bg-white/5 rounded-lg p-2 lg:p-3">
              <span className="text-challenge-orange">🎯 Nivel:</span> Tú
              decides qué tan lejos quieres llegar con cada reto
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Responsive */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs sm:text-sm text-gray-400 mb-2">
          Scroll para explorar los retos
        </div>
        <div className="w-4 h-6 lg:w-5 lg:h-8 border-2 border-white/20 rounded-full flex justify-center mx-auto">
          <div className="w-0.5 lg:w-1 h-1.5 lg:h-2 bg-white/40 rounded-full mt-1 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoChallenges;
