"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const ComingSoon = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects - Reducidos
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowAnimation = {
    initial: { boxShadow: "0 0 0 rgba(250, 81, 162, 0)" },
    animate: {
      boxShadow: [
        "0 0 15px rgba(250, 81, 162, 0.3)",
        "0 0 30px rgba(250, 81, 162, 0.5)",
        "0 0 15px rgba(250, 81, 162, 0.3)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const iconHover = {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const bulletPointAnimation = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="py-12 px-4 bg-gradient-to-b from-transparent to-challenge-gray/10 relative overflow-hidden"
    >
      {/* Floating background elements - Más pequeños */}
      <motion.div
        style={{ y: y1 }}
        className="hidden md:block absolute top-16 left-8 w-20 h-20 bg-gradient-to-br from-challenge-pink/10 to-challenge-purple/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{ y: y2 }}
        className="hidden md:block absolute bottom-16 right-8 w-24 h-24 bg-gradient-to-br from-challenge-orange/10 to-challenge-green/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center bg-gradient-primary/10 px-3 py-2 rounded-full mb-4 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-4 h-4 text-challenge-pink mr-2" />
            </motion.div>
            <span className="text-challenge-pink font-semibold text-sm">
              Coming Soon
            </span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">
            Lo que está <span className="text-gradient">por venir</span>
          </h2>
          <motion.p
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Estamos trabajando en funcionalidades increíbles que llevarán tus
            momentos sociales al siguiente nivel
          </motion.p>
        </motion.div>

        {/* Date Ideas Feature */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 order-2 lg:order-1"
            >
              <motion.div
                className="flex items-center space-x-3 mb-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-400 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={iconHover}
                  variants={glowAnimation}
                  initial="initial"
                  animate="animate"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold">Date Ideas</h3>
                  <p className="text-challenge-pink text-sm font-medium">
                    Tu cupido digital personal
                  </p>
                </div>
              </motion.div>

              <motion.p
                className="text-gray-300 text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                ¿Se te acabaron las ideas para impresionar? Nuestro sistema de
                Date Ideas te dará estrategias probadas para cada situación:
                desde el primer mensaje hasta la cita perfecta.
              </motion.p>

              <div className="space-y-3">
                {[
                  {
                    title: "8 categorías especializadas",
                    subtitle:
                      "Social, Romántico, Casual, Creativo, Digital y más",
                  },
                  {
                    title: "Niveles de dificultad",
                    subtitle:
                      "Desde principiante hasta experto en el arte del coqueteo",
                  },
                  {
                    title: "Tips estratégicos",
                    subtitle:
                      "Consejos específicos para cada situación y contexto",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    variants={bulletPointAnimation}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-challenge-pink rounded-full mt-2 flex-shrink-0"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm">
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-xs">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-3 h-3 mr-1 text-challenge-pink" />
                  </motion.div>
                  <span>Premium Feature</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Mockup */}
            <motion.div
              variants={fadeInUp}
              className="relative flex justify-center order-1 lg:order-2 lg:justify-end"
            >
              <motion.div
                className="relative"
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-challenge-pink/20 to-challenge-purple/20 rounded-2xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Image
                  src="/assets/muckup-DateIdeas.png"
                  alt="Date Ideas Mockup"
                  width={400}
                  height={850}
                  className="rounded-2xl shadow-2xl relative z-10 w-auto h-auto max-w-[280px] sm:max-w-[350px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Drinking Games Feature */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Mockup - On the left for desktop, order-1 for mobile */}
            <motion.div
              variants={fadeInUp}
              className="relative flex justify-center lg:justify-center order-1"
            >
              <motion.div
                className="relative"
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-challenge-orange/20 to-challenge-green/20 rounded-2xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />
                <Image
                  src="/assets/muckup-DrinkingGames.png"
                  alt="Drinking Games Mockup"
                  width={200}
                  height={400}
                  className="rounded-2xl shadow-2xl relative z-10 w-auto h-auto max-w-[150px] sm:max-w-[200px]"
                />
              </motion.div>
            </motion.div>

            {/* Text Content - On the right for desktop, order-2 for mobile */}
            <motion.div variants={fadeInUp} className="space-y-4 order-2">
              <motion.div
                className="flex items-center space-x-3 mb-4"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={iconHover}
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(253, 134, 22, 0.3)",
                      "0 0 30px rgba(253, 134, 22, 0.5)",
                      "0 0 15px rgba(253, 134, 22, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="text-lg"
                    animate={{
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🍻
                  </motion.div>
                </motion.div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold">Drinking Games</h3>
                  <p className="text-challenge-orange text-sm font-medium">
                    El alma de toda fiesta
                  </p>
                </div>
              </motion.div>

              <motion.p
                className="text-gray-300 text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Convierte cualquier reunión en una fiesta épica. Juegos de
                shots, desafíos grupales y actividades que harán que todos se
                diviertan y se conecten como nunca.
              </motion.p>

              <div className="space-y-3">
                {[
                  {
                    title: "Juegos clásicos y únicos",
                    subtitle: "Beer Pong, Carrera de Reyes, Carta Mayor y más",
                  },
                  {
                    title: "Niveles de intensidad",
                    subtitle:
                      "Desde mild hasta extreme - tú decides qué tan salvaje",
                  },
                  {
                    title: "Para grupos de todos los tamaños",
                    subtitle:
                      "Desde 3 hasta 8+ jugadores, siempre hay opciones",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    variants={bulletPointAnimation}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: -5 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-challenge-orange rounded-full mt-2 flex-shrink-0"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm">
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-xs">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Users className="w-3 h-3 mr-1" />
                  </motion.div>
                  <span>Multijugador</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mt-12 p-6 card-glass rounded-2xl relative overflow-hidden mx-4 sm:mx-0"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-challenge-pink/5 to-challenge-purple/5"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-bold mb-3">
              ¿Quieres ser el primero en{" "}
              <span className="text-gradient">probarlo</span>?
            </h3>
            <p className="text-gray-300 mb-4 max-w-xl mx-auto text-sm">
              Mantente al tanto del lanzamiento de ChallengeMe. De esta manera,
              serás de las primeras personas en descargarla.
            </p>
            <motion.div
              className="flex items-center justify-center space-x-2 text-challenge-green"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-2 h-2 bg-challenge-green rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="font-semibold text-sm">
                En desarrollo activo
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
