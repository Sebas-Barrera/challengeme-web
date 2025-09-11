'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const LaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = (): TimeLeft => {
      // 9 de octubre 2025 a las 10:00 PM (22:00)
      const targetDate = new Date('2025-10-09T22:00:00-06:00') // Ajustar timezone según necesites
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Calcular inmediatamente
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null // Evitar hidration mismatch
  }

  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <section className="relative py-20 px-4 overflow-hidden" id="inicio">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-challenge-purple/20 via-challenge-pink/20 to-challenge-orange/20" />
      
      {/* Personajes flotantes */}
      <div className="absolute top-10 left-10 opacity-30">
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-challenge-orange rounded-full flex items-center justify-center text-sm font-bold"
        >
        </motion.div>
      </div>

      <div className="absolute top-20 right-16 opacity-40">
        <motion.div
          animate={{ 
            y: [15, -15, 15],
            rotate: [3, -3, 3]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="w-16 h-16 bg-challenge-pink rounded-full flex items-center justify-center text-xs font-bold"
        >
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-20 opacity-35">
        <motion.div
          animate={{ 
            y: [-8, 12, -8],
            rotate: [-2, 4, -2]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="w-18 h-18 bg-challenge-purple rounded-full flex items-center justify-center text-xs font-bold"
        >
        </motion.div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {isLaunched ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              ¡Ya llegamos! 🎉
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              ChallengeMe ya está aquí para cambiar tus pláticas para siempre
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Descargar ahora
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              La revolución de las <span className="bg-gradient-primary bg-clip-text text-transparent">conversaciones</span> está por llegar
            </motion.h2>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Se acabó hablar del clima. Llegan las preguntas que de verdad conectan y hacen que cada momento valga la pena.
            </motion.p>

            {/* Contador */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
              {[
                { label: 'Días', value: timeLeft.days },
                { label: 'Horas', value: timeLeft.hours },
                { label: 'Minutos', value: timeLeft.minutes },
                { label: 'Segundos', value: timeLeft.seconds }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <motion.div
                    key={item.value} // Key para animar cambios
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.div>
                  <div className="text-sm md:text-base text-gray-300 mt-2 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-gray-400 text-sm md:text-base"
            >
              9 de octubre, 2025 • 10:00 PM
            </motion.p>
          </>
        )}
      </div>
    </section>
  )
}

export default LaunchCountdown