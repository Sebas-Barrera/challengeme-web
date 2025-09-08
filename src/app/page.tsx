"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useInView as useInViewHook } from "react-intersection-observer";
import {
  ArrowRight,
  Play,
  Check,
  Download,
  Zap,
  Heart,
  Gamepad2,
  Coffee,
  Crown,
  Star,
  Shield,
} from "lucide-react";
import { appContent } from "../data/app-content";
import Image from "next/image";
import LaunchCountdown from "./LaunchCountdown";

// Interfaces para los tipos
interface AnimatedTextProps {
  children: ReactNode;
  variant?: "visible" | "slideFromLeft" | "slideFromRight";
  className?: string;
  delay?: number;
}

interface AnimatedImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface InfiniteCarouselProps {
  items: ReactNode[];
  direction?: "left" | "right";
}

interface AnimatedCounterProps {
  value: string;
  delay?: number;
  suffix?: string;
}

// Variants para animaciones de texto
const textVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    x: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Variants para slideFromLeft
const slideFromLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Variants para slideFromRight
const slideFromRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Variants para animaciones de imágenes
const imageVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    borderRadius: "50%",
  },
  visible: {
    scale: 1,
    opacity: 1,
    borderRadius: "12px",
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

// Variants para staggered children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Componente de contador animado
const AnimatedCounter = ({ value, delay = 0, suffix = "" }: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [ref, inView] = useInViewHook({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const controls = animate(count, parseInt(value.replace(/\D/g, "")), {
          duration: 2,
          ease: "easeOut",
        });
        return controls.stop;
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, count, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2"
    >
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </motion.div>
  );
};

// Componente para texto animado
const AnimatedText = ({
  children,
  variant = "visible",
  className = "",
  delay = 0,
}: AnimatedTextProps) => {
  const [ref, inView] = useInViewHook({
    threshold: 0.3,
    triggerOnce: true,
  });

  const getVariants = () => {
    switch (variant) {
      case "slideFromLeft":
        return slideFromLeftVariants;
      case "slideFromRight":
        return slideFromRightVariants;
      default:
        return textVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Componente para imagen animada
const AnimatedImage = ({
  children,
  className = "",
  delay = 0,
}: AnimatedImageProps) => {
  const [ref, inView] = useInViewHook({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={imageVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Componente para carrusel infinito
const InfiniteCarousel = ({
  items,
  direction = "left",
}: InfiniteCarouselProps) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex space-x-8"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ChallengeMeLanding(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Stats para el carrusel
  const statsItems = appContent.stats.map((stat, index) => (
    <motion.div
      key={index}
      className="text-center hover-lift min-w-[200px]"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.2, type: "spring" }}
      >
        {stat.number}
      </motion.div>
      <div className="text-gray-400">{stat.label}</div>
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Background decorative elements animados */}
      <div className="fixed inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-40 right-1/3 w-28 h-28 bg-green-400 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Navigation animado */}
      <motion.nav
        className="relative z-50 p-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image
              src="/assets/ChallengeMe-05.png"
              alt="ChallengeMe Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-gradient-primary">
              {appContent.hero.title}
            </span>
          </motion.div>
          {/* <motion.button
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span>Descargar App</span>
          </motion.button> */}
        </div>
      </motion.nav>

      {/* Hero Section con scroll snapping */}
      <section className="relative z-10 px-6 py-20 min-h-screen flex items-center overflow-hidden">
        {/* Partículas flotantes de fondo */}
        <div className="absolute inset-0 opacity-20">
          {/* Partículas grandes */}
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-pink-600"
            style={{ top: "20%", left: "10%" }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600"
            style={{ top: "60%", right: "15%" }}
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600"
            style={{ top: "80%", left: "20%" }}
            animate={{
              y: [0, -20, 0],
              x: [0, 30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Partículas medianas */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600"
            style={{ top: "30%", right: "25%" }}
            animate={{
              y: [0, 15, 0],
              x: [0, -25, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          <motion.div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500"
            style={{ top: "15%", right: "40%" }}
            animate={{
              y: [0, -25, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          {/* Partículas pequeñas */}
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300"
            style={{ top: "45%", left: "5%" }}
            animate={{
              y: [0, 20, 0],
              x: [0, 15, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          <motion.div
            className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-orange-300 to-yellow-400"
            style={{ top: "70%", right: "35%" }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
          />

          <motion.div
            className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-green-300 to-blue-400"
            style={{ top: "25%", left: "70%" }}
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />

          {/* Ondas de fondo sutil */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-500/5 to-orange-500/5"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(139, 69, 19, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(251, 146, 60, 0.05) 100%)",
                "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(251, 146, 60, 0.05) 50%, rgba(139, 69, 19, 0.05) 100%)",
                "linear-gradient(225deg, rgba(251, 146, 60, 0.05) 0%, rgba(139, 69, 19, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)",
                "linear-gradient(315deg, rgba(139, 69, 19, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(251, 146, 60, 0.05) 100%)",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center w-full relative z-10">
          <AnimatedText className="mb-6">
            <h1 className="text-6xl md:text-8xl font-bold text-gradient-warm">
              {appContent.hero.title}
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.2} className="mb-4">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {appContent.hero.tagline}
            </p>
          </AnimatedText>

          <AnimatedText delay={0.4} className="mb-12">
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {appContent.hero.description}
            </p>
          </AnimatedText>

          {/* Character Animation usando assets reales */}
          <motion.div
            className="flex justify-center items-center mb-12 space-x-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="w-20 h-20 relative"
              variants={{
                hidden: { scale: 0, rotate: -180 },
                visible: { scale: 1, rotate: 0 },
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Image
                src="/assets/ChallengeMe-21.png"
                alt="Personaje Pink ChallengeMe"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.div
              className="w-24 h-24 relative"
              variants={{
                hidden: { scale: 0, rotate: 180 },
                visible: { scale: 1, rotate: 0 },
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
            >
              <Image
                src="/assets/ChallengeMe-25.png"
                alt="Personaje Orange ChallengeMe"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.div
              className="w-20 h-20 relative"
              variants={{
                hidden: { scale: 0, rotate: -180 },
                visible: { scale: 1, rotate: 0 },
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            >
              <Image
                src="/assets/ChallengeMe-23.png"
                alt="Personaje Purple ChallengeMe"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Preview visual de la app */}
          <AnimatedText delay={0.6} className="mb-12">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {/* Mock de pantalla de la app */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-64 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-gray-600 p-4 shadow-2xl">
                  {/* Notch del teléfono */}
                  <div className="w-24 h-6 bg-black rounded-full mx-auto mb-4"></div>

                  {/* Contenido de la pantalla */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-xl text-center">
                      <h3 className="text-white font-bold text-sm mb-2">
                        RETOS PARA LA PEDA
                      </h3>
                      <p className="text-white/80 text-xs">
                        ¿Quién se atreverá primero?
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-orange-500/20 border border-orange-500/30 p-3 rounded-lg text-center">
                        <span className="text-orange-400 text-xs font-semibold">
                          DeepTalks
                        </span>
                      </div>
                      <div className="bg-green-500/20 border border-green-500/30 p-3 rounded-lg text-center">
                        <span className="text-green-400 text-xs font-semibold">
                          Party Games
                        </span>
                      </div>
                    </div>

                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl text-center"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-white font-bold text-xs">
                        ¡COMENZAR RETO!
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Efectos alrededor del teléfono */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-75"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full opacity-75"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>

              {/* Texto descriptivo */}
              <div className="text-center md:text-left max-w-md">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                    Tu anfitrión digital favorito
                  </span>
                </motion.h2>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300">
                      Cientos de retos únicos para cada ocasión
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300">
                      Conversaciones que crean conexiones reales
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300">
                      Nunca más te quedarás sin ideas
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatedText>

          {/* CTA Buttons animados */}
          <AnimatedText delay={0.8}>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* <motion.button
                className="btn-primary flex items-center space-x-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(250, 81, 162, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                <span>Descargar Gratis</span>
              </motion.button> */}
              {/* <motion.button
                className="btn-secondary flex items-center space-x-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(123, 70, 248, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Ver Demo</span>
              </motion.button> */}
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Stats Section con contadores animados */}
      <section className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <AnimatedText className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              En Números
            </h2>
          </AnimatedText>

          <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8">
            {appContent.stats.map((stat, index) => (
              <AnimatedImage key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center hover-lift"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedCounter
                    value={stat.number}
                    delay={index * 0.3}
                    suffix={stat.number.includes("+") ? "+" : ""}
                  />
                  <motion.div
                    className="text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 2.2, duration: 0.5 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              </AnimatedImage>
            ))}
          </div>

          {/* Carrusel para móviles con contadores animados */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-6">
              {appContent.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center hover-lift"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <AnimatedCounter
                    value={stat.number}
                    delay={index * 0.4}
                    suffix={stat.number.includes("+") ? "+" : ""}
                  />
                  <motion.div
                    className="text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.4 + 2.2 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section con staggered animation */}
      {/* Features Section con personajes estratégicamente posicionados */}
      <section className="relative z-10 px-6 py-20 overflow-hidden">
        {/* Fondo animado con personajes más grandes y visibles */}
        <div className="absolute inset-0 opacity-40">
          {/* Personaje Rosa - XL flotando arriba izquierda */}
          <motion.div
            className="absolute -top-8 -left-8 w-56 h-56"
            animate={{
              y: [0, -35, 0],
              x: [0, 25, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/assets/ChallengeMe-21.png"
              alt="Personaje Rosa"
              width={224}
              height={224}
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </motion.div>

          {/* Personaje Naranja - XL flotando arriba derecha */}
          <motion.div
            className="absolute -top-12 -right-12 w-48 h-48"
            animate={{
              y: [0, 30, 0],
              x: [0, -30, 0],
              rotate: [0, -20, 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <Image
              src="/assets/ChallengeMe-25.png"
              alt="Personaje Naranja"
              width={192}
              height={192}
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </motion.div>

          {/* Personaje Morado - XL flotando abajo derecha */}
          <motion.div
            className="absolute -bottom-16 -right-8 w-52 h-52"
            animate={{
              y: [0, -40, 0],
              x: [0, 35, 0],
              rotate: [0, 25, -25, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <Image
              src="/assets/ChallengeMe-23.png"
              alt="Personaje Morado"
              width={208}
              height={208}
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </motion.div>

          {/* Personaje Rosa - Grande flotando abajo izquierda */}
          <motion.div
            className="absolute -bottom-12 -left-16 w-44 h-44"
            animate={{
              y: [0, 25, 0],
              x: [0, -20, 0],
              scale: [0.9, 1.3, 0.9],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4.5,
            }}
          >
            <Image
              src="/assets/ChallengeMe-21.png"
              alt="Personaje Rosa"
              width={176}
              height={176}
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </motion.div>

          {/* Personaje Naranja - Mediano centro izquierda */}
          <motion.div
            className="absolute top-1/2 -left-8 w-36 h-36 transform -translate-y-1/2"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, -35, 35, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <Image
              src="/assets/ChallengeMe-25.png"
              alt="Personaje Naranja"
              width={144}
              height={144}
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </motion.div>

          {/* Personaje Morado - Mediano centro derecha */}
          <motion.div
            className="absolute top-1/3 -right-12 w-40 h-40"
            animate={{
              y: [0, 35, 0],
              x: [0, -25, 0],
              scale: [1, 0.85, 1],
              rotate: [0, 30, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
          >
            <Image
              src="/assets/ChallengeMe-23.png"
              alt="Personaje Morado"
              width={160}
              height={160}
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </motion.div>

          {/* Personaje Rosa - Mediano flotando centro superior */}
          <motion.div
            className="absolute top-8 left-1/2 w-32 h-32 transform -translate-x-1/2"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
          >
            <Image
              src="/assets/ChallengeMe-21.png"
              alt="Personaje Rosa"
              width={128}
              height={128}
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </motion.div>

          {/* Personaje Naranja - Mediano flotando centro inferior */}
          <motion.div
            className="absolute bottom-12 left-1/2 w-36 h-36 transform -translate-x-1/2"
            animate={{
              y: [0, -25, 0],
              x: [0, 15, -15, 0],
              rotate: [0, -45, 45, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          >
            <Image
              src="/assets/ChallengeMe-25.png"
              alt="Personaje Naranja"
              width={144}
              height={144}
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </motion.div>

          {/* Ondas de color más intensas */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 25% 75%, rgba(250, 81, 162, 0.15) 0%, transparent 60%)",
                "radial-gradient(circle at 75% 25%, rgba(123, 70, 248, 0.15) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(253, 134, 22, 0.15) 0%, transparent 60%)",
                "radial-gradient(circle at 25% 25%, rgba(189, 245, 34, 0.1) 0%, transparent 60%)",
                "radial-gradient(circle at 25% 75%, rgba(250, 81, 162, 0.15) 0%, transparent 60%)",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient-primary">Características</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Todo lo que necesitas para transformar cualquier reunión en una
              experiencia memorable
            </p>
          </AnimatedText>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {appContent.features.map((feature, index) => {
              const IconComponent =
                feature.icon === "zap"
                  ? Zap
                  : feature.icon === "heart"
                  ? Heart
                  : feature.icon === "gamepad2"
                  ? Gamepad2
                  : Coffee;

              return (
                <motion.div
                  key={index}
                  className="challenge-card relative z-30 backdrop-blur-sm"
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                      },
                    },
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(123, 70, 248, 0.25)",
                  }}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <LaunchCountdown />

      {/* Benefits Section con paralaje */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedText variant="slideFromLeft">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="text-gradient-primary">
                    ¿Por qué elegir ChallengeMe?
                  </span>
                </h2>
              </AnimatedText>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {appContent.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6 },
                      },
                    }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-green-600 p-1 rounded-full flex-shrink-0 mt-1"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                    <p className="text-lg text-gray-300">{benefit}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <AnimatedImage delay={0.3}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Usando mockup real de la app */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 mx-auto max-w-sm hover-glow relative">
                  {/* Imagen de fondo con patrón real */}
                  <div
                    className="absolute inset-0 opacity-10 rounded-3xl"
                    style={{
                      backgroundImage:
                        "url('/images/11-.Fondos de color/11.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <motion.div
                    className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl mb-6 relative z-10"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(123, 70, 248, 0.3)",
                        "0 0 30px rgba(250, 81, 162, 0.4)",
                        "0 0 20px rgba(123, 70, 248, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Image
                        src="/assets/ChallengeMe-20.png"
                        alt="Personaje Challenge"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="text-white font-bold text-sm">
                        ELIGE TU RETO
                      </div>
                      <Image
                        src="/assets/ChallengeMe-16.png"
                        alt="Personaje Challenge"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain transform scale-x-[-1]"
                      />
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl">
                      <h3 className="text-white font-bold mb-2 text-sm">
                        RETOS PARA LA PEDA
                      </h3>
                      <p className="text-white/80 text-xs">
                        Los clásicos de toda fiesta. Shots, confesiones y
                        castigos que harán legendaria tu noche
                      </p>
                    </div>
                  </motion.div>
                  <div className="space-y-3 relative z-10">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className={`p-3 rounded-xl border h-8 ${
                          i === 0
                            ? "bg-pink-500/20 border-pink-500/30"
                            : i === 1
                            ? "bg-orange-500/20 border-orange-500/30"
                            : "bg-purple-500/20 border-purple-500/30"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: i * 0.2, duration: 0.8 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedImage>
          </div>
        </div>
      </section>

      {/* CTA Final con efectos especiales */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-gradient-warm">
                ¿Listo para el desafío?
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Únete a miles de usuarios que ya están transformando sus reuniones
              con ChallengeMe
            </p>
          </AnimatedText>

          <AnimatedImage delay={0.4} className="mb-12">
            <motion.div
              className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-3xl border border-purple-500/30 hover-glow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-2xl font-bold">Membresía Premium</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    Con una membresía de{" "}
                    <span className="text-green-400 font-bold">$50 pesos</span>{" "}
                    tienes acceso total a todas las funciones de la app
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Contenido ilimitado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>Sin anuncios</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span>Actualizaciones semanales</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span>Soporte prioritario</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                      Precio mensual
                    </span>
                  </div>
                  <div className="text-6xl font-bold text-green-400 mb-2">
                    $50
                  </div>
                  <div className="text-sm text-gray-400">MXN mensuales</div>

                  {/* <div className="mt-4 p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Primer mes gratis
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </AnimatedImage>

          {/* <AnimatedText delay={0.6}>
            <motion.button
              className="btn-primary flex items-center space-x-3 mx-auto text-xl px-12 py-6"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(250, 81, 162, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-6 h-6" />
              <span>Comenzar Ahora</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </AnimatedText> */}
        </div>
      </section>

      {/* Footer animado */}
      <motion.footer
        className="relative z-10 px-6 py-12 border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="text-3xl font-bold mb-4 text-gradient-primary flex items-center justify-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/assets/ChallengeMe-10.png"
              width={300}
              height={300}
              alt="ChallengeMe Logo"
              className="w-80 h-30 pt-6 pb-6"
            />
          </motion.div>
          <p className="text-gray-400 mb-6">
            Desarrollado por {appContent.company.name}
          </p>
          {/* <div className="flex justify-center space-x-8 text-gray-400">
            {["Términos", "Privacidad", "Contacto"].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link}
              </motion.a>
            ))}
          </div> */}
        </div>
      </motion.footer>
    </div>
  );
}