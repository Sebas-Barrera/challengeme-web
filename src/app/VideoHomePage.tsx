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
        anticipatePin: 1,
        scrub: 1,
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
      <div className="max-w-7xl mx-auto px-4 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Página de inicio <span className="text-gradient">intuitiva</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Todo lo que necesitas al alcance de un tap. Opciones de juego
              organizadas, consejos diarios para mejorar tus conversaciones y tu
              actividad reciente para continuar donde te quedaste.
            </p>

            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-challenge-green rounded-full"></div>
                <span className="text-gray-300">
                  Juegos categorizados por situación
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-challenge-pink rounded-full"></div>
                <span className="text-gray-300">
                  Consejos personalizados del día
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-challenge-purple rounded-full"></div>
                <span className="text-gray-300">
                  Historial de actividad reciente
                </span>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-400 bg-white/5 rounded-lg p-4">
              <span className="text-challenge-green">💡 Tip:</span> Haz scroll
              para explorar la interfaz interactiva →
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="relative flex justify-center">
                {/* iPhone Mockup Container */}
                <div className="relative">
                  {/* iPhone Frame */}
                  <Image
                    src="/videos/Iiphone13promax.png"
                    alt="iPhone 13 Pro Max"
                    width={450}
                    height={850}
                    className="relative z-10"
                  />

                  {/* Video positioned inside iPhone screen */}
                  <div className="absolute top-[54px] left-[44px] right-[44px] bottom-[40px] z-0 rounded-[35px] overflow-hidden">
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

              <div className="absolute inset-0 bg-gradient-to-r from-challenge-purple/20 to-challenge-pink/20 rounded-[3rem] blur-xl scale-105 -z-10"></div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-challenge-green rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-challenge-orange rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-sm text-gray-400 mb-2">
          Scroll para explorar la app
        </div>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoScrollSection;
