// src/data/app-content.ts
export const appContent = {
  hero: {
    title: "ChallengeMe.",
    tagline: "El anfitrión digital que nunca se queda sin ideas",
    description: "Transforma cualquier reunión en una experiencia dinámica y memorable. Retos, conversaciones profundas, juegos y más.",
    motto: "BREAK PLAY REPEAT"
  },
  
  pricing: {
    regular: "$50 MXN",
    discount: "$25 MXN",
    discountPercentage: "50%",
    period: "mensuales"
  },

  features: [
    {
      id: "retos",
      title: "Retos Interactivos",
      description: "Peda, After, Bar, Pareja, En la Calle, Hot y más. Opciones para todos los contextos sociales.",
      color: "from-pink-400 to-pink-600",
      icon: "zap"
    },
    {
      id: "deeptalks", 
      title: "DeepTalks",
      description: "Conversaciones profundas e intrigantes. Ideal para crear conexiones auténticas. Preguntas categorizadas por nivel de intimidad.",
      color: "from-purple-400 to-purple-600",
      icon: "heart"
    },
    {
      id: "party-games",
      title: "Party Games", 
      description: "Juegos para hacer con tus amigos mientras están en alguna peda o reunión. Entretenimiento garantizado.",
      color: "from-orange-400 to-orange-600",
      icon: "gamepad2"
    },
    {
      id: "date-ideas",
      title: "Date Ideas",
      description: "Temas para romper el hielo en citas. Actividades creativas para parejas. Sugerencias para diferentes tipos de encuentros.",
      color: "from-green-400 to-green-600",
      icon: "coffee"
    }
  ],

  stats: [
    { number: "5+", label: "Categorías de Retos" },
    { number: "100+", label: "Preguntas DeepTalk" },
    { number: "10+", label: "Party Games" },
    { number: "50+", label: "Ideas de Citas" }
  ],

  benefits: [
    "Contenido premium con actualizaciones constantes",
    "Versión gratuita limitada disponible", 
    "Categorías diversas para cada ocasión",
    "Interface intuitiva y fácil de usar",
    "Experiencias personalizadas",
    "Comunidad activa de usuarios"
  ],

  company: {
    name: "TechVision",
    description: "Desarrolladora de soluciones innovadoras de software o tecnológicas",
    date: "Agosto 2025"
  }
};

export default appContent;