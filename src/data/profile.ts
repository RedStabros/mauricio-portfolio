// Central profile content and bilingual UI strings.
// Edit this file to update projects, roles, stack groups, or copy in both languages.

export type Locale = 'es' | 'en';

export interface LocalizedText {
  es: string;
  en: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'mail';
}

export interface StackCategory {
  id: string;
  label: LocalizedText;
  items: string[];
}

export interface FeaturedProject {
  id: string;
  name: string;
  role: LocalizedText;
  period: LocalizedText;
  status: 'production' | 'enterprise';
  nonProfit?: boolean;
  metrics?: Array<{
    value: string;
    label: LocalizedText;
  }>;
  summary: LocalizedText;
  highlights: {
    es: string[];
    en: string[];
  };
  stack: string[];
  links: Array<{
    label: LocalizedText;
    href: string;
  }>;
}

export interface ExperienceItem {
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  location: string;
  summary: LocalizedText;
  stack: string[];
}

export interface EducationItem {
  institution: string;
  degree: LocalizedText;
  period: string;
}

export interface LanguageItem {
  name: LocalizedText;
  level: LocalizedText;
  detail?: LocalizedText;
}

export const PROFILE = {
  name: 'Mauricio Saldarriaga Garcia',
  shortName: 'Mauricio Saldarriaga',
  role: {
    es: 'Full-Stack & Mobile Engineer',
    en: 'Full-Stack & Mobile Engineer',
  },
  availability: {
    es: 'Disponible para roles remotos · Inglés EF SET C2 (R&L) / B1-B2 Speaking',
    en: 'Open to remote roles · English EF SET C2 (R&L) / B1-B2 Speaking',
  },
  location: 'Bogotá, Colombia',
  cvPath: '/cv.pdf',
  bio: {
    es: 'Ingeniero de Software orientado a producto con casi 4 años construyendo apps móviles multiplataforma y ecosistemas web escalables. Domino el ciclo completo (SDLC): desde arquitectura de datos y seguridad RLS hasta interfaces de alta precisión en React Native, Vue.js y TypeScript.',
    en: 'Product-minded Software Engineer with nearly 4 years building cross-platform mobile apps and scalable web ecosystems. I drive the full SDLC—from database architecture and RLS security to precision interfaces in React Native, Vue.js, and TypeScript.',
  },
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/RedStabros',
      handle: '@RedStabros',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/maurosaldagarcia',
      handle: 'in/maurosaldagarcia',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      href: 'mailto:udcarkangel@gmail.com',
      handle: 'udcarkangel@gmail.com',
      icon: 'mail',
    },
  ] satisfies SocialLink[],

  stack: [
    {
      id: 'mobile',
      label: { es: 'Mobile', en: 'Mobile' },
      items: ['React Native', 'Expo', 'TypeScript', 'Google Play Deploy', 'QR & Geolocation'],
    },
    {
      id: 'frontend',
      label: { es: 'Frontend', en: 'Frontend' },
      items: ['Vue.js', 'React.js', 'Astro', 'Tailwind CSS', 'HTML / CSS', 'Figma'],
    },
    {
      id: 'backend',
      label: { es: 'Backend & DB', en: 'Backend & DB' },
      items: ['Node.js', 'Express', 'PostgreSQL', 'Supabase (RLS)', 'Prisma ORM', 'REST APIs', 'JWT Auth'],
    },
    {
      id: 'tools-ai',
      label: { es: 'Herramientas / IA', en: 'Tools / AI' },
      items: ['Claude Code', 'Google Gemini', 'Cloudflare Pages', 'Git', 'DevOps', 'SCRUM'],
    },
  ] satisfies StackCategory[],

  featuredProjects: [
    {
      id: 'ciudad-friki',
      name: 'Ciudad Friki',
      role: {
        es: 'Founder & Lead Full-Stack Engineer',
        en: 'Founder & Lead Full-Stack Engineer',
      },
      period: {
        es: 'Nov 2025 — Presente',
        en: 'Nov 2025 — Present',
      },
      status: 'production',
      nonProfit: true,
      metrics: [
        { value: '850+', label: { es: 'usuarios', en: 'users' } },
        { value: '500+', label: { es: 'descargas en Google Play', en: 'Google Play downloads' } },
        { value: '5.0 / 5', label: { es: 'calificación', en: 'Play Store rating' } },
      ],
      summary: {
        es: 'Ecosistema digital multiplataforma sin ánimo de lucro para comunidades y eventos masivos, desplegado globalmente en Google Play Store y Web, incluyendo desarrollo de minijuegos y mecánicas gamificadas.',
        en: 'Non-profit cross-platform digital ecosystem for communities and large-scale events, deployed globally on Google Play Store and Web, including in-app game development and gamified community mechanics.',
      },
      highlights: {
        es: [
          'Arquitectura escalable en Node.js, Express, Prisma ORM y PostgreSQL (Supabase) con transacciones atómicas y seguridad RLS.',
          'Sincronización móvil (React Native) y web (Vue.js) con autenticación JWT, geolocalización y APIs REST.',
          'Desarrollo de juegos y motor de recompensas con trivias, encuestas interactivas y validación de asistencia en sitio vía QR.',
        ],
        en: [
          'Scalable backend with Node.js, Express, Prisma ORM, and PostgreSQL (Supabase) supporting atomic transactions and RLS.',
          'Synchronized mobile (React Native) and web (Vue.js) clients with JWT auth, geolocation, and REST APIs.',
          'In-app game development and dynamic rewards engine powered by interactive trivia, surveys, and QR attendance validation for on-site staff.',
        ],
      },
      stack: ['React Native', 'TypeScript', 'Vue.js', 'Game Dev', 'Node.js', 'Supabase', 'PostgreSQL', 'Prisma'],
      links: [
        {
          label: { es: 'Web en Producción', en: 'Live Web App' },
          href: 'https://ciudadfriki.app/',
        },
        {
          label: { es: 'Google Play', en: 'Google Play' },
          href: 'https://play.google.com/store/apps/details?id=com.redstabros.ciudadfriki',
        },
      ],
    },
    {
      id: 'gss-enterprise',
      name: 'GSS Group — Enterprise Web Suite',
      role: {
        es: 'Frontend Engineer',
        en: 'Frontend Engineer',
      },
      period: {
        es: 'Mar 2023 — Presente',
        en: 'Mar 2023 — Present',
      },
      status: 'enterprise',
      summary: {
        es: 'Desarrollo frontend de aplicaciones web empresariales de alta mantenibilidad con arquitectura modular en Vue.js y flujos acelerados por IA.',
        en: 'Enterprise-grade web applications engineered with modular Vue.js architecture and AI-accelerated frontend delivery pipelines.',
      },
      highlights: {
        es: [
          'Construcción de interfaces empresariales robustas en Vue.js y Tailwind CSS a partir de especificaciones de producto.',
          'Adopción pionera de flujos con Claude Code y Google Gemini, reduciendo tiempos de entrega manteniendo estándares de calidad.',
        ],
        en: [
          'Built maintainable enterprise interfaces with Vue.js and Tailwind CSS translated directly from product design specs.',
          'Pioneered AI-assisted workflows using Claude Code and Google Gemini to accelerate delivery without compromising code quality.',
        ],
      },
      stack: ['Vue.js', 'Tailwind CSS', 'TypeScript', 'Claude Code', 'Google Gemini', 'SCRUM'],
      links: [],
    },
  ] satisfies FeaturedProject[],

  experience: [
    {
      company: 'Ciudad Friki',
      role: {
        es: 'Founder & Lead Full-Stack Engineer',
        en: 'Founder & Lead Full-Stack Engineer',
      },
      period: { es: 'Nov 2025 — Presente', en: 'Nov 2025 — Present' },
      location: 'Bogotá, Colombia',
      summary: {
        es: 'Liderazgo técnico integral de producto: diseño en Figma, arquitectura backend, desarrollo móvil/web, registro de propiedad intelectual y publicación global en Google Play.',
        en: 'End-to-end solo product engineering: Figma prototyping, backend architecture, mobile/web development, IP registration, and global Google Play release.',
      },
      stack: ['React Native', 'Vue.js', 'Node.js', 'Supabase', 'Prisma'],
    },
    {
      company: 'GSS Group',
      role: {
        es: 'Frontend Engineer',
        en: 'Frontend Engineer',
      },
      period: { es: 'Mar 2023 — Presente', en: 'Mar 2023 — Present' },
      location: 'Bogotá, Colombia',
      summary: {
        es: 'Desarrollo frontend para plataformas corporativas en Vue.js y Tailwind CSS. Integración de flujos de ingeniería asistidos por IA (Claude Code, Gemini). Inicio previo como Practicante de Desarrollo (Sep 2022 — Mar 2023).',
        en: 'Frontend engineering for enterprise web platforms using Vue.js and Tailwind CSS. Pioneered AI-assisted workflows (Claude Code, Gemini). Previously Software Dev Intern (Sep 2022 — Mar 2023).',
      },
      stack: ['Vue.js', 'Tailwind CSS', 'Claude Code', 'Gemini'],
    },
    {
      company: 'ODONTOSS & Independiente',
      role: {
        es: 'Systems Manager & IT Consultant',
        en: 'Systems Manager & IT Consultant',
      },
      period: { es: '2008 — 2022', en: '2008 — 2022' },
      location: 'Medellín, Colombia',
      summary: {
        es: 'Gestión integral de infraestructura TI, arquitectura de redes (VPN), seguridad de sistemas y operación de accesos remotos.',
        en: 'End-to-end IT infrastructure management, network architecture (VPN setups), systems security, and remote access operations.',
      },
      stack: ['Infrastructure', 'VPN / Networking', 'System Security'],
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      institution: 'UNAD Colombia',
      degree: {
        es: 'Ingeniería de Sistemas (B.E.)',
        en: 'B.E. Systems Engineering',
      },
      period: '2024 — 2028',
    },
    {
      institution: 'SENA',
      degree: {
        es: 'Tecnólogo en Análisis y Desarrollo de Sistemas de Información',
        en: 'Associate Degree in Software Analysis & Development',
      },
      period: '2020 — 2023',
    },
    {
      institution: 'Universidad El Bosque',
      degree: {
        es: 'Developer MinTIC 2022 — Software y Aplicaciones Multimedia',
        en: 'MinTIC 2022 Software & Multimedia Applications',
      },
      period: '2021',
    },
  ] satisfies EducationItem[],

  languages: [
    {
      name: { es: 'Español', en: 'Spanish' },
      level: { es: 'Nativo', en: 'Native' },
    },
    {
      name: { es: 'Inglés', en: 'English' },
      level: { es: 'EF SET C2 (Lectura y Escucha)', en: 'EF SET C2 (Reading & Listening)' },
      detail: { es: 'Conversacional B1-B2', en: 'B1-B2 Speaking (Working proficiency)' },
    },
    {
      name: { es: 'Italiano', en: 'Italian' },
      level: { es: 'Elemental', en: 'Elementary' },
    },
  ] satisfies LanguageItem[],

  collaboration: {
    relocationTitle: {
      es: 'Remoto y relocación global',
      en: 'Remote & global relocation',
    },
    relocationBody: {
      es: 'Trabajo de forma remota y estoy dispuesto a relocarme en cualquier parte del mundo si el rol y el equipo son los adecuados.',
      en: 'Available for remote work and open to relocating anywhere in the world for the right team and engineering challenge.',
    },
    nonProfitTitle: {
      es: 'Proyectos sin ánimo de lucro',
      en: 'Non-profit initiatives',
    },
    nonProfitBody: {
      es: 'Me encantan los proyectos sin ánimo de lucro. Si lideras uno y necesitas apoyo técnico, escríbeme y hablemos, sin cargos.',
      en: 'I love supporting non-profit projects. If you are building one and need engineering help, reach out and let us talk, at no charge.',
    },
    nonProfitCta: {
      es: 'Conversemos por correo',
      en: 'Start a conversation',
    },
  },
} as const;

export const UI_COPY = {
  es: {
    metaTitle: 'Mauricio Saldarriaga — Full-Stack & Mobile Engineer',
    metaDescription:
      'Portafolio de Mauricio Saldarriaga Garcia. Ingeniero Full-Stack y Mobile especializado en React Native, Vue.js, TypeScript, Node.js y Supabase.',
    skipToContent: 'Ir al contenido principal',
    nav: {
      featured: 'Destacados',
      repos: 'GitHub Sync',
      stack: 'Stack',
      experience: 'Experiencia',
    },
    downloadCv: 'Descargar CV',
    copyEmail: 'Copiar email',
    emailCopied: 'Copiado',
    sections: {
      featuredTitle: 'Proyectos Destacados',
      reposTitle: 'GitHub Sync',
      reposSubtitle: 'Sincronizado en el Edge vía Cloudflare Pages Functions · Topic portfolio',
      stackTitle: 'Stack Tecnológico',
      experienceTitle: 'Experiencia y Formación',
      educationLabel: 'Educación',
      languagesLabel: 'Idiomas',
      collaborationLabel: 'Disponibilidad y Colaboración',
    },
    filters: {
      all: 'Todos',
      public: 'Open Source',
      private: 'Privado',
    },
    badges: {
      openSource: 'Open Source',
      privateProd: 'Privado · Producción',
      production: 'En Producción',
      nonProfit: 'Sin ánimo de lucro',
      enterprise: 'Enterprise',
    },
    actions: {
      sourceCode: 'Código',
      liveDemo: 'Demo / App',
      retry: 'Reintentar',
    },
    reposState: {
      loading: 'Sincronizando repositorios desde GitHub...',
      empty: 'No se encontraron repositorios con el topic portfolio.',
      emptyFilter: 'No hay repositorios en esta categoría.',
      error: 'No fue posible sincronizar los repositorios en este momento.',
      mockNotice: 'Modo desarrollo local · Datos de respaldo (configura .dev.vars para sincronizar con GitHub)',
      liveAnnouncementSingular: '1 repositorio mostrado',
      liveAnnouncement: '{n} repositorios mostrados',
      updatedPrefix: 'Actualizado',
      today: 'hoy',
      yesterday: 'hace 1 día',
      daysAgo: 'hace {n} días',
      monthsAgo: 'hace {n} meses',
      yearsAgo: 'hace {n} años',
    },
    footer: {
      builtWith: 'Construido con Astro, Tailwind CSS y Cloudflare Pages Functions.',
    },
  },
  en: {
    metaTitle: 'Mauricio Saldarriaga — Full-Stack & Mobile Engineer',
    metaDescription:
      'Portfolio of Mauricio Saldarriaga Garcia. Full-Stack & Mobile Engineer specialized in React Native, Vue.js, TypeScript, Node.js, and Supabase.',
    skipToContent: 'Skip to main content',
    nav: {
      featured: 'Featured',
      repos: 'GitHub Sync',
      stack: 'Stack',
      experience: 'Experience',
    },
    downloadCv: 'Download CV',
    copyEmail: 'Copy email',
    emailCopied: 'Copied',
    sections: {
      featuredTitle: 'Featured Work',
      reposTitle: 'GitHub Sync',
      reposSubtitle: 'Edge-cached via Cloudflare Pages Functions · Topic portfolio',
      stackTitle: 'Tech Stack',
      experienceTitle: 'Experience & Education',
      educationLabel: 'Education',
      languagesLabel: 'Languages',
      collaborationLabel: 'Availability & Collaboration',
    },
    filters: {
      all: 'All',
      public: 'Open Source',
      private: 'Private',
    },
    badges: {
      openSource: 'Open Source',
      privateProd: 'Private · Production',
      production: 'Production',
      nonProfit: 'Non-profit',
      enterprise: 'Enterprise',
    },
    actions: {
      sourceCode: 'Source',
      liveDemo: 'Live / App',
      retry: 'Retry',
    },
    reposState: {
      loading: 'Syncing repositories from GitHub...',
      empty: 'No repositories found with the portfolio topic.',
      emptyFilter: 'No repositories match this filter.',
      error: 'Unable to sync repositories right now.',
      mockNotice: 'Local dev mode · Fallback data (configure .dev.vars for live GitHub sync)',
      liveAnnouncementSingular: 'Showing 1 repository',
      liveAnnouncement: 'Showing {n} repositories',
      updatedPrefix: 'Updated',
      today: 'today',
      yesterday: '1 day ago',
      daysAgo: '{n} days ago',
      monthsAgo: '{n} months ago',
      yearsAgo: '{n} years ago',
    },
    footer: {
      builtWith: 'Built with Astro, Tailwind CSS, and Cloudflare Pages Functions.',
    },
  },
} as const;
