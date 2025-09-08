"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, Rocket, Star } from "lucide-react";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LaunchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);

  // Fecha de lanzamiento: 9 de octubre de 2025 a las 22:00 (10:00 PM)
  const launchDate = new Date("2025-10-09T22:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setIsLaunched(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  // Variants para animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const numberVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  if (isLaunched) {
    return (
      <section className="relative z-10 px-6 py-20 overflow-hidden">
        {/* Efectos de fondo para celebración */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="mb-8"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="w-24 h-24 text-gradient-primary mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-warm">
            ¡YA ESTÁ AQUÍ!
          </h2>
          <p className="text-2xl text-gradient-primary mb-8">
            ChallengeMe ha sido lanzado oficialmente
          </p>

          <motion.button
            className="btn-primary flex items-center space-x-3 mx-auto text-xl px-12 py-6"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(250, 81, 162, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket className="w-6 h-6" />
            <span>Descargar Ahora</span>
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative z-10 px-6 py-20 overflow-hidden">
      {/* Partículas de fondo animadas */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 4 === 0
                ? "bg-pink-400"
                : i % 4 === 1
                ? "bg-purple-400"
                : i % 4 === 2
                ? "bg-orange-400"
                : "bg-green-400"
            }`}
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Personajes flotantes */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-16 left-8 w-24 h-24"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/assets/ChallengeMe-21.png"
            alt="Personaje Rosa"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </motion.div>

        <motion.div
          className="absolute top-20 right-12 w-20 h-20"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Image
            src="/assets/ChallengeMe-25.png"
            alt="Personaje Naranja"
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Título principal */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient-primary">
              Gran Lanzamiento
            </h2>
            
          </motion.div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            El momento que has estado esperando está llegando...
          </p>

          <motion.div
            className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30"
            animate={{
              boxShadow: [
                "0 0 10px rgba(123, 70, 248, 0.3)",
                "0 0 20px rgba(250, 81, 162, 0.4)",
                "0 0 10px rgba(123, 70, 248, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-lg font-semibold text-gradient-warm">
              9 de Octubre 2025 • 10:00 PM
            </span>
          </motion.div>
        </motion.div>

        {/* Contador principal */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-gray-700/50 hover-glow mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                label: "Días",
                value: timeLeft.days,
                color: "from-pink-500 to-pink-600",
              },
              {
                label: "Horas",
                value: timeLeft.hours,
                color: "from-purple-500 to-purple-600",
              },
              {
                label: "Minutos",
                value: timeLeft.minutes,
                color: "from-orange-500 to-orange-600",
              },
              {
                label: "Segundos",
                value: timeLeft.seconds,
                color: "from-green-500 to-green-600",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${item.color} p-6 md:p-8 rounded-2xl mb-4 relative overflow-hidden`}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(123, 70, 248, 0.2)",
                      "0 0 30px rgba(250, 81, 162, 0.3)",
                      "0 0 20px rgba(123, 70, 248, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {/* Efecto de brillo */}
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.8,
                      ease: "easeInOut",
                    }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.value}
                      variants={numberVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="text-4xl md:text-6xl font-bold text-white relative z-10"
                    >
                      {item.value.toString().padStart(2, "0")}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  className="text-lg md:text-xl font-semibold text-gray-300 uppercase tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {item.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mensaje motivacional */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            className="inline-block p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gradient-warm">
              ¿Estás listo para el desafío?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Prepárate para una experiencia que transformará tus reuniones para
              siempre. El futuro de la diversión social está a punto de llegar.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LaunchCountdown;
