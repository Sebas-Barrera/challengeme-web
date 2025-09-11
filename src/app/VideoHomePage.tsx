"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const VideoScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    // Asegurar que el video esté listo
    const handleLoadedMetadata = () => {
      const videoDuration = video.duration;

      // Crear el ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "bottom top",
        pin: true,
        anticipatePin: 0.1,
        scrub: 10,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Controlar el currentTime del video basado en el progress del scroll
          const progress = self.progress;
          const newTime = progress * videoDuration;

          // Solo actualizar si hay una diferencia significativa para evitar jitter
          if (Math.abs(video.currentTime - newTime) > 0.1) {
            video.currentTime = newTime;
          }
        },
        onEnter: () => {
          // Pausar el video cuando entramos a la sección para control manual
          video.pause();
        },
        onLeave: () => {
          // Opcional: resetear o pausar cuando salimos
          video.pause();
        },
        onEnterBack: () => {
          video.pause();
        },
      });
    };

    // Si el video ya está cargado
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
          {/* Texto - Mobile First Order */}
          <div className="text-center lg:text-left order-2 lg:order-1 space-y-4 lg:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 leading-tight">
              Página de inicio <span className="text-gradient">intuitiva</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-300 mb-4 lg:mb-6 leading-relaxed">
              Todo lo que necesitas al alcance de un tap. Opciones de juego
              organizadas, consejos diarios para mejorar tus conversaciones y tu
              actividad reciente para continuar donde te quedaste.
            </p>

            <div className="space-y-2 lg:space-y-3 text-left">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-challenge-green rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                  Juegos categorizados por situación
                </span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-challenge-pink rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                  Consejos personalizados del día
                </span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-challenge-purple rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                  Historial de actividad reciente
                </span>
              </div>
            </div>

            <div className="mt-4 lg:mt-6 text-xs sm:text-sm text-gray-400 bg-white/5 rounded-lg p-2 lg:p-3">
              <span className="text-challenge-green">💡 Tip:</span> Haz scroll
              para explorar la interfaz interactiva →
            </div>
          </div>

          {/* iPhone Mockup - Responsive */}
          <div className="relative order-1 lg:order-2 flex justify-center">
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
                  />

                  {/* Video positioned inside iPhone screen - Responsive */}
                  <div className="absolute top-[6%] left-[10%] right-[10%] bottom-[4.5%] z-0 rounded-[20px] sm:rounded-[25px] overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src="/videos/inicio.mp4"
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
              <div className="absolute inset-0 bg-gradient-to-r from-challenge-purple/20 to-challenge-pink/20 rounded-[2rem] blur-xl scale-105 -z-10"></div>

              {/* Floating Elements - Responsive */}
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 bg-challenge-green rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-3 h-3 sm:w-4 sm:h-4 bg-challenge-orange rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Responsive */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs sm:text-sm text-gray-400 mb-2">
          Scroll para explorar la app
        </div>
        <div className="w-4 h-6 lg:w-5 lg:h-8 border-2 border-white/20 rounded-full flex justify-center mx-auto">
          <div className="w-0.5 lg:w-1 h-1.5 lg:h-2 bg-white/40 rounded-full mt-1 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoScrollSection;
