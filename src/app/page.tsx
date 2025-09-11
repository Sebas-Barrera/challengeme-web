"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  Heart,
  Brain,
  Target,
  Sparkles,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import LaunchCountdown from "./LaunchCountdown";
import Image from "next/image";
import VideoHomePage from "./VideoHomePage";
import VideoChallenges from "./VideoChallenges";
import ComingSoon from "./ComingSoon";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="min-h-screen" id="inicio">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-challenge-dark/80 backdrop-blur-lg border-b border-white/10"
      >
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/ChallengeMe-06.png"
              alt="Logo"
              width={32}
              height={32}
            />
            <span className="text-lg font-bold">ChallengeMe.</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#inicio"
              className="hover:text-challenge-pink transition-colors text-sm"
            >
              Inicio
            </a>
            <a
              href="#coming"
              className="hover:text-challenge-pink transition-colors text-sm"
            >
              Coming Soon
            </a>
            <a
              href="#features"
              className="hover:text-challenge-pink transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-challenge-pink transition-colors text-sm"
            >
              Precios
            </a>
            <a
              href="#faq"
              className="hover:text-challenge-pink transition-colors text-sm"
            >
              FAQ
            </a>
          </div>
        </nav>
      </motion.header>

      {/* Launch Countdown */}
      <div className="pt-16">
        <LaunchCountdown />
      </div>

      {/* Hero Section */}
      <section className="hero-section py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              className="text-center lg:text-left"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-hero font-bold mb-4 text-shadow-lg"
              >
                Se acabaron las reuniones{" "}
                <span className="text-gradient">aburridas</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
              >
                ChallengeMe. Es ese anfitrión que todos quieren en sus reuniones
                y fiestas, aquel que pone el ambiente y nunca se queda sin ideas
                para divertirse.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <div className="flex items-center space-x-2 text-challenge-green">
                  <div className="w-2 h-2 bg-challenge-green rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm">
                    En desarrollo activo
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  Lanzamiento: Octubre 2025
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-6 flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-400"
              >
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>4.8/5 rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-challenge-green mr-1" />
                  <span>+10k usuarios</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative max-w-sm mx-auto">
                <div className="w-full">
                  <Image
                    src="/assets/captura.png"
                    width={350}
                    height={350}
                    alt="Mockup de la App"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <VideoHomePage />

      <VideoChallenges />

      <div id="coming">
        <ComingSoon />
      </div>

      {/* Métricas de Impacto */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { number: "4.8⭐", label: "Rating de conexión", icon: "⭐" },
              { number: "3+", label: "Países conectando", icon: "🌎" },
              {
                number: "89%",
                label: "Dice que cambió su relación",
                icon: "❤️",
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{metric.icon}</div>
                <div className="text-xl md:text-2xl font-bold text-gradient mb-1">
                  {metric.number}
                </div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categorías de Conversaciones */}
      <section id="features" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Elige tu <span className="text-gradient">aventura</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Desde pláticas ligeras para romper el hielo hasta conversaciones
              que te van a volar la mente. Tú decides qué tan profundo quieres
              ir.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Amor & Relaciones",
                subtitle: "Para cuando quieres ir al grano",
                gradient: "from-pink-500 to-rose-400",
                icon: <Heart className="w-6 h-6" />,
                preview: "¿Cuál ha sido tu 'casi algo' más intenso?",
                intensity: "🔥🔥🔥",
              },
              {
                title: "Miedos Ocultos",
                subtitle: "Lo que nos mantiene despiertos",
                gradient: "from-purple-600 to-indigo-500",
                icon: <Brain className="w-6 h-6" />,
                preview: "¿De qué tienes miedo pero nunca le dices a nadie?",
                intensity: "🔥🔥🔥🔥",
              },
              {
                title: "Sueños Locos",
                subtitle: "Esas metas que te dan pena contar",
                gradient: "from-orange-500 to-yellow-400",
                icon: <Target className="w-6 h-6" />,
                preview: "¿Cuál es ese sueño que te da miedo perseguir?",
                intensity: "🔥🔥",
              },
              {
                title: "Filosofía Profunda",
                subtitle: "Para los que piensan mucho",
                gradient: "from-indigo-600 to-purple-600",
                icon: <Sparkles className="w-6 h-6" />,
                preview: "¿Crees que tenemos libre albedrío?",
                intensity: "🔥🔥🔥🔥🔥",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="card-glass p-5 h-full hover-lift group-hover:bg-white/15 transition-all duration-300">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>

                  <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {category.subtitle}
                  </p>

                  <div className="bg-black/20 rounded-lg p-3 mb-3">
                    <p className="text-sm italic text-gray-300">
                      {category.preview}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Intensidad</span>
                    <span className="text-sm">{category.intensity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent to-challenge-gray/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Para cada <span className="text-gradient">momento</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              No importa si estás con tu crush, tu familia o contigo mismo.
              Tenemos las preguntas perfectas para cada situación.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Para Parejas",
                subtitle: "Redescubre a tu persona favorita",
                emoji: "💕",
                description:
                  "Preguntas que van más allá de 'cómo estuvo tu día' y te ayudan a conocer lados nuevos de tu pareja.",
                testimonial:
                  "Llevamos 3 años juntos y esta app nos hizo sentir como si apenas nos conociéramos 🥺",
              },
              {
                title: "Para Familias",
                subtitle: "Conversaciones que nos acercan",
                emoji: "👨‍👩‍👧‍👦",
                description:
                  "Porque hablar en la cena puede ser más que solo 'pásenme la sal'.",
                testimonial:
                  "Mi hermano adolescente por fin me platicó algo que no fuera 'está bien' 😂",
              },
              {
                title: "Para Amigos",
                subtitle: "Más allá de memes y chismes",
                emoji: "👯‍♀️",
                description:
                  "Para esas noches de viernes donde quieren algo más profundo que solo cotilleo.",
                testimonial:
                  "Nos quedamos hasta las 4am platicando. No había pasado desde la prepa ✨",
              },
              {
                title: "Para Ti Solo",
                subtitle: "Autoconocimiento sin terapia cara",
                emoji: "🤔",
                description:
                  "Reflexiona sobre tu vida, tus metas y quién eres realmente. Pero sin rollos.",
                testimonial:
                  "Mejor que mi diario. Me ayudó a entender por qué hago las cosas que hago 🧠",
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glass p-5 hover-lift"
              >
                <div className="text-3xl mb-3">{useCase.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-challenge-pink text-sm font-medium mb-3">
                  {useCase.subtitle}
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  {useCase.description}
                </p>

                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-xs italic text-gray-400">
                    {useCase.testimonial}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Precios que no <span className="text-gradient">duelen</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Empieza gratis y si te gusta, únete por menos de lo que gastas en
              un café con leche.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Plan Gratuito */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card-glass p-6 relative"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Para Probar</h3>
                <div className="text-3xl font-bold text-gradient mb-3">
                  Gratis
                </div>
                <p className="text-gray-400 mb-6">
                  Perfecto para ver si te gusta el rollo
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  "Acceso a contenido limitado",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-challenge-green mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="w-full text-center py-2 bg-white/5 rounded-lg text-gray-400 text-sm">
                Disponible al lanzamiento
              </div>
            </motion.div>

            {/* Plan Premium */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-glass p-6 relative border-2 border-challenge-pink"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-primary px-3 py-1 rounded-full text-sm font-bold">
                  Más popular
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Full Access</h3>
                <div className="text-3xl font-bold text-gradient mb-3">$50</div>
                <p className="text-gray-400 mb-6">
                  Por mes • Cancela cuando quieras
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  "Todas las categorías desbloqueadas",
                  "Preguntas de todos los niveles",
                  "Contenido actualizado"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-challenge-green mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="w-full text-center py-2 bg-gradient-primary/20 rounded-lg text-challenge-pink text-sm font-semibold">
                Plan recomendado
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 text-sm mt-6"
          >
            Sin compromisos raros • Cancela en cualquier momento • Soporte 24/7
          </motion.p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-12 px-4 bg-gradient-to-b from-challenge-gray/20 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Esto dicen los{" "}
              <span className="text-gradient">que ya lo probaron</span>
            </h2>
            <p className="text-lg text-gray-300">
              Spoiler: les gustó más de lo que esperaban
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "No mames, esta app me hizo llorar. Pero de buena manera. Mi novio y yo hablamos de cosas que llevábamos años evitando y ahora estamos más conectados que nunca.",
                author: "María, 24",
                rating: 5,
                emoji: "😭❤️",
              },
              {
                text: "Pensé que iba a ser cursi pero la neta está muy buena. Las preguntas están bien pensadas y no se sienten forzadas. 10/10 would recommend.",
                author: "Carlos, 28",
                rating: 5,
                emoji: "🔥",
              },
              {
                text: "La uso con mis amigas cuando ya nos cansamos de hablar de los mismos dramas. Siempre descubrimos algo nuevo de nosotras mismas. Es adictiva la app.",
                author: "Ana, 22",
                rating: 5,
                emoji: "✨",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glass p-5"
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-300 mb-4 italic text-sm">
                  {testimonial.text}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-challenge-pink">
                    {testimonial.author}
                  </span>
                  <span className="text-xl">{testimonial.emoji}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Las <span className="text-gradient">dudas</span> que todos tienen
            </h2>
            <p className="text-lg text-gray-300">
              Respondemos las preguntas antes de que las hagas
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                question:
                  "¿Las preguntas son muy intensas o puedo empezar suave?",
                answer:
                  "Tranqui, puedes empezar con preguntas más ligeras y después ir subiendo la intensidad. Cada categoría tiene diferentes niveles para que no te sientas abrumado.",
              },
              {
                question: "¿Funciona si soy medio antisocial?",
                answer:
                  "¡Claro! De hecho es perfecto para gente que no sabe cómo empezar conversaciones profundas. Las preguntas hacen todo el trabajo pesado por ti.",
              },
              {
                question: "¿Puedo usarla en diferentes idiomas?",
                answer:
                  "Por ahora solo está en español, pero estamos trabajando en más idiomas. ¡Mantente al pendiente!",
              },
              {
                question: "¿Qué pasa si cancelo mi suscripción?",
                answer:
                  "Puedes cancelar cuando quieras sin pedos. Mantienes acceso hasta que termine tu periodo y después regresas al plan gratuito.",
              },
              {
                question: "¿Hay preguntas para situaciones específicas?",
                answer:
                  "Sí! Tenemos categorías para parejas, familias, amigos, autoconocimiento y más. Incluso hay preguntas especiales para first dates y momentos incómodos.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glass overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium pr-4 text-sm">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <Minus className="w-4 h-4 text-challenge-pink flex-shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-challenge-pink flex-shrink-0" />
                  )}
                </button>

                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 px-4 bg-gradient-to-br from-challenge-purple/20 via-challenge-pink/20 to-challenge-orange/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para las mejores{" "}
            <span className="text-gradient">reuniones</span> de tu vida?
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Deja de hablar del clima y empieza a hablar de lo que realmente
            importa. Tus relaciones te lo van a agradecer.
          </p>

          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-3 text-base">
              <div className="flex items-center space-x-2 text-challenge-green">
                <div className="w-2 h-2 bg-challenge-green rounded-full animate-pulse"></div>
                <span>En desarrollo</span>
              </div>
              <div className="w-1 h-4 bg-white/20"></div>
              <div className="text-gray-300">Octubre 2025</div>
            </div>
            <div className="text-sm text-gray-400 text-center">
              Síguenos en redes para actualizaciones • Desarrollo transparente
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="rounded-full flex items-center justify-center text-lg font-bold animate-pulse">
              <Image
                src="/assets/ChallengeMe-05.png"
                alt="Logo"
                width={80}
                height={80}
              />
            </div>
          </div>
        </motion.div>
      </section>      
    </main>
  );
}
