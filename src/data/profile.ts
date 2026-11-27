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

export interface FeaturedProjectLink {
  label: LocalizedText;
  href: string | LocalizedText;
}

export interface FeaturedAppGroup {
  category: LocalizedText;
  accentDot: string;
  apps: Array<{
    name: string;
    slug: string;
    icon: string;
    description: LocalizedText;
  }>;
}

export interface FeaturedProject {
  id: string;
  name: string;
  role: LocalizedText;
  period: LocalizedText;
  status: 'production' | 'enterprise';
  nonProfit?: boolean;
  badges?: LocalizedText[];
  metrics?: Array<{
    value: string;
    label: LocalizedText;
  }>;
  summary: LocalizedText;
  highlights: {
    es: string[];
    en: string[];
  };
  appCatalog?: {
    triggerLabel: LocalizedText;
    groups: FeaturedAppGroup[];
  };
  stack: string[];
  links: FeaturedProjectLink[];
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
      items: ['React Native', 'Expo', 'NativeWind', 'TypeScript', 'C++ (Google Oboe)', 'Android Auto', 'Google Play'],
    },
    {
      id: 'frontend',
      label: { es: 'Frontend', en: 'Frontend' },
      items: ['Vue.js', 'React.js', 'Astro', 'Tailwind CSS', 'react-i18next', 'Figma'],
    },
    {
      id: 'backend',
      label: { es: 'Backend & DB', en: 'Backend & DB' },
      items: ['Node.js', 'Express', 'PostgreSQL', 'Supabase (RLS)', 'Prisma ORM', 'REST / GraphQL', 'JWT Auth'],
    },
    {
      id: 'tools-ai',
      label: { es: 'Herramientas / IA', en: 'Tools / AI' },
      items: ['Turborepo', 'pnpm', 'Cloudflare Pages', 'Gradle / RSA-4096', 'Claude Code', 'Google Gemini', 'Git'],
    },
  ] satisfies StackCategory[],

  featuredProjects: [
    {
      id: 'apps-4all',
      name: 'Para Todos (4All)',
      role: {
        es: 'Creador & Arquitecto Mobile / Sistemas (15 Apps Android)',
        en: 'Creator & Lead Mobile / Systems Architect (15 Android Apps)',
      },
      period: {
        es: 'v1.0.1 en Producción',
        en: 'v1.0.1 in Production',
      },
      status: 'production',
      nonProfit: true,
      badges: [
        { es: '100% Offline', en: '100% Offline' },
        { es: '0 Trackers / 0 Ads', en: '0 Trackers / 0 Ads' },
        { es: 'C++ Oboe & Android Auto', en: 'C++ Oboe & Android Auto' },
        { es: 'Gratis · PolyForm No Comercial', en: 'Free · PolyForm Noncommercial' },
      ],
      metrics: [
        { value: '15', label: { es: 'apps Android firmadas', en: 'signed Android apps' } },
        { value: '26', label: { es: 'idiomas', en: 'languages' } },
        { value: '495', label: { es: 'páginas estáticas', en: 'static pages' } },
        { value: '$0/mes', label: { es: 'costo operativo', en: 'operating cost' } },
      ],
      summary: {
        es: 'Ecosistema de 15 aplicaciones Android de utilidad diaria construidas con arquitectura 100% Offline (Local-First) y Privacy-First: sin cuentas, sin servidores remotos, sin anuncios y sin telemetría. Vive en un monorepo con Turborepo y pnpm, soporta 26 idiomas y se distribuye con un portal de 495 páginas en Astro sobre Cloudflare Pages + GitHub Releases.',
        en: 'An ecosystem of 15 everyday Android utility apps built with a strict 100% Offline (Local-First) and Privacy-First architecture: zero accounts, zero remote servers, zero ads, and zero telemetry. Engineered as a Turborepo + pnpm monorepo localized across 26 languages, paired with a 495-page Astro portal on Cloudflare Pages and signed ARM APK releases via GitHub Releases at $0/month operating cost.',
      },
      highlights: {
        es: [
          'Ingeniería nativa en C++ y Kotlin: motor audiófilo en C++ (Google Oboe + AAudio/OpenSL ES) con ecualizador paramétrico de 5 bandas (filtros Biquad IIR en tiempo real) y soporte nativo para Android Auto (MediaBrowserServiceCompat) en Reproductor 4All.',
          'Privacidad y criptografía local: cifrado 256-bit respaldado por hardware (Android KeyStore y biometría), compresión ZIP con AES-256, edición vectorial local de PDFs (pdf-lib) y limpieza automática de metadatos EXIF/GPS en imágenes.',
          'Monorepo Turborepo + pnpm (@apps4all/ui-components, @apps4all/i18n) y pipeline automatizado en PowerShell + Gradle para compilar los 15 APKs ARM ligeros (~51-64 MB) con keystores RSA-4096 independientes y hashes SHA-256 en versions.json (licencia PolyForm Noncommercial 1.0.0).',
        ],
        en: [
          'Native C++ and Kotlin engineering: audiophile C++ audio engine (Google Oboe + AAudio/OpenSL ES) with a 5-band real-time Biquad IIR parametric EQ and native Android Auto support (MediaBrowserServiceCompat) in Reproductor 4All.',
          'Local-first security and privacy: 256-bit hardware-backed encryption (Android KeyStore and biometrics), native AES-256 ZIP archiving, local vector PDF tooling (pdf-lib), and automatic EXIF/GPS metadata scrubbing.',
          'Turborepo + pnpm monorepo (@apps4all/ui-components, @apps4all/i18n) with an automated PowerShell + Gradle release pipeline building 15 ARM-only signed APKs (~51-64 MB) using isolated RSA-4096 keystores and SHA-256 manifests in versions.json (PolyForm Noncommercial 1.0.0).',
        ],
      },
      appCatalog: {
        triggerLabel: {
          es: 'Explorar las 15 aplicaciones del ecosistema (Productividad · Utilidades · Tiempo y Matemáticas)',
          en: 'Browse all 15 apps in the ecosystem (Productivity · Utilities · Time & Math)',
        },
        groups: [
          {
            category: { es: 'Productividad', en: 'Productivity' },
            accentDot: '#3B82F6',
            apps: [
              {
                name: 'Apuntes 4All',
                slug: 'apuntes-4all',
                icon: '/icons/4all/apuntes-4all.webp',
                description: {
                  es: 'Notas rápidas con vista Markdown, fotos locales, checklists y bóveda privada cifrada con biometría.',
                  en: 'Quick notes with Markdown preview, local photos, checklists, and a biometric-encrypted private vault.',
                },
              },
              {
                name: 'Seguridad 4All',
                slug: 'seguridad-4all',
                icon: '/icons/4all/seguridad-4all.webp',
                description: {
                  es: 'Generador de contraseñas y passphrases (128 palabras), medidor de entropía, auto-limpieza del portapapeles (30s) y bóveda biométrica.',
                  en: 'Password and 128-word passphrase generator, entropy meter, 30s clipboard auto-clear, and biometric encrypted vault.',
                },
              },
              {
                name: 'PDF 4All',
                slug: 'pdf-4all',
                icon: '/icons/4all/pdf-4all.webp',
                description: {
                  es: 'Suite de 8 herramientas PDF offline: leer, fotos a PDF, unir, dividir, organizar páginas, optimizar, rotar 90° y marcas de agua.',
                  en: '8-tool offline PDF suite: reader, images to PDF, merge, split, reorder pages, optimize, rotate 90°, and watermarks.',
                },
              },
              {
                name: 'Docs 4All',
                slug: 'docs-4all',
                icon: '/icons/4all/docs-4all.webp',
                description: {
                  es: 'Visor ultraligero offline para .docx, .xlsx, .csv, .md y .txt con zoom, buscador y exportación a PDF.',
                  en: 'Lightweight offline viewer for .docx, .xlsx, .csv, .md, and .txt with zoom, search, and PDF export.',
                },
              },
              {
                name: 'Notas de Voz 4All',
                slug: 'notas-voz-4all',
                icon: '/icons/4all/notas-voz-4all.webp',
                description: {
                  es: 'Grabadora M4A/AAC con pausa/reanudar, grabación con pantalla apagada, etiquetas, velocidad variable y recorte no destructivo.',
                  en: 'M4A/AAC recorder with pause/resume, screen-off recording, tags, variable speed playback, and non-destructive trimming.',
                },
              },
            ],
          },
          {
            category: { es: 'Utilidades', en: 'Utilities' },
            accentDot: '#14B8A6',
            apps: [
              {
                name: 'QR 4All',
                slug: 'qr-4all',
                icon: '/icons/4all/qr-4all.webp',
                description: {
                  es: 'Generador en 10 formatos con gradientes, marcos y logos (Nivel H), escáner Solo QR / QR+Barras y respaldo JSON.',
                  en: '10-format QR generator with gradients, frames, and custom logos (Level H), QR/barcode scanner, and JSON backups.',
                },
              },
              {
                name: 'ZIP 4All',
                slug: 'zip-4all',
                icon: '/icons/4all/zip-4all.webp',
                description: {
                  es: 'Compresor y extractor ZIP nativo con cifrado AES-256 e inspección/extracción selectiva.',
                  en: 'Native ZIP compressor and extractor with AES-256 encryption and selective archive inspection.',
                },
              },
              {
                name: 'Fotos Ligeras 4All',
                slug: 'fotos-ligeras-4all',
                icon: '/icons/4all/fotos-ligeras-4all.webp',
                description: {
                  es: 'Compresor por lotes con escudo de privacidad EXIF/GPS, rotación 90° y comparador antes/después.',
                  en: 'Batch image compressor with EXIF/GPS privacy scrubbing, 90° rotation, and before/after visual comparison.',
                },
              },
              {
                name: 'Lupa y Linterna 4All',
                slug: 'lupa-4all',
                icon: '/icons/4all/lupa-4all.webp',
                description: {
                  es: 'Magnificador 1x-4x con congelación nítida, filtros clínicos de alto contraste y linterna LED.',
                  en: '1x-4x magnifier with crisp frame freeze, high-contrast clinical filters, and LED flashlight.',
                },
              },
              {
                name: 'Reproductor 4All',
                slug: 'reproductor-4all',
                icon: '/icons/4all/reproductor-4all.webp',
                description: {
                  es: 'Reproductor audiófilo offline con motor C++ Google Oboe, EQ de 5 bandas, espectro visual, filtro anti-WhatsApp y Android Auto nativo.',
                  en: 'Offline audiophile player powered by C++ Google Oboe, 5-band EQ, live spectrum, WhatsApp-audio filter, and native Android Auto.',
                },
              },
            ],
          },
          {
            category: { es: 'Tiempo y Matemáticas', en: 'Time & Math' },
            accentDot: '#F59E0B',
            apps: [
              {
                name: 'Enfoque 4All',
                slug: 'enfoque-4all',
                icon: '/icons/4all/enfoque-4all.webp',
                description: {
                  es: 'Temporizador Pomodoro antidesfase con etiquetas de tarea, ambientes sonoros offline, matriz de rachas y exportación JSON.',
                  en: 'Drift-free Pomodoro timer with task tags, offline ambient soundscapes, streak matrix, and JSON export.',
                },
              },
              {
                name: 'Cuentas 4All',
                slug: 'cuentas-4all',
                icon: '/icons/4all/cuentas-4all.webp',
                description: {
                  es: 'Calculadora de propinas, comensales guardados, platos compartidos y redondeo de efectivo.',
                  en: 'Tip and bill splitter supporting saved diners, shared dishes, and cash rounding.',
                },
              },
              {
                name: 'Medidas 4All',
                slug: 'medidas-4all',
                icon: '/icons/4all/medidas-4all.webp',
                description: {
                  es: 'Conversor universal en 10 categorías físicas y digitales con favoritos fijados y buscador.',
                  en: 'Universal unit converter across 10 physical and digital categories with pinned favorites and instant search.',
                },
              },
              {
                name: 'Azar 4All',
                slug: 'azar-4all',
                icon: '/icons/4all/azar-4all.webp',
                description: {
                  es: 'Ruleta 360° con memoria local, dados, moneda y divisor de equipos Fisher-Yates.',
                  en: '360° decision wheel with local memory, dice, coin flip, and Fisher-Yates team splitter.',
                },
              },
              {
                name: 'Festivos 4All',
                slug: 'festivos-4all',
                icon: '/icons/4all/festivos-4all.webp',
                description: {
                  es: 'Calendario perpetuo multipaís con filtro "Solo Puentes", calculadora de días hábiles y exportación a calendario nativo.',
                  en: 'Multi-country perpetual holiday calendar with long-weekend filter, business-day calculator, and native calendar export.',
                },
              },
            ],
          },
        ],
      },
      stack: [
        'React Native',
        'Expo',
        'TypeScript',
        'NativeWind v4',
        'C++ (Google Oboe)',
        'Android Auto',
        'Turborepo',
        'Astro',
        'Cloudflare Pages',
      ],
      links: [
        {
          label: { es: 'Ver Portal Web', en: 'Live Web Portal' },
          href: { es: 'https://apps-4all.pages.dev/es/', en: 'https://apps-4all.pages.dev/en/' },
        },
        {
          label: { es: 'Descargar APKs', en: 'Download APKs' },
          href: 'https://github.com/RedStabros/apps-4all/releases',
        },
        {
          label: { es: 'Código en GitHub', en: 'GitHub Monorepo' },
          href: 'https://github.com/RedStabros/apps-4all',
        },
        {
          label: { es: 'SHA-256 Manifest', en: 'SHA-256 Manifest' },
          href: 'https://apps-4all.pages.dev/versions.json',
        },
      ],
    },
    {
      id: 'ciudad-friki-app',
      name: 'Ciudad Friki — App Móvil',
      role: {
        es: 'Founder & Lead Mobile / Full-Stack Engineer',
        en: 'Founder & Lead Mobile / Full-Stack Engineer',
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
        es: 'Aplicación móvil multiplataforma sin ánimo de lucro para comunidades y eventos masivos, publicada globalmente en Google Play Store con minijuegos y mecánicas gamificadas.',
        en: 'Non-profit cross-platform mobile application for communities and large-scale events, published globally on Google Play with in-app mini-games and gamified mechanics.',
      },
      highlights: {
        es: [
          'Desarrollo de minijuegos y motor de recompensas con trivias, retos interactivos y validación de asistencia en sitio vía escaneo QR.',
          'Cliente móvil en React Native y TypeScript con autenticación JWT, geolocalización y sincronización directa con el backend.',
          'Ciclo completo liderado de forma autónoma: diseño en Figma, registro de propiedad intelectual y publicación en Google Play.',
        ],
        en: [
          'In-app game development and dynamic rewards engine featuring trivia, interactive challenges, and QR attendance validation for on-site staff.',
          'Mobile client built with React Native and TypeScript supporting JWT auth, geolocation check-ins, and real-time backend sync.',
          'End-to-end solo delivery from Figma prototyping and intellectual property registration to global Google Play releases.',
        ],
      },
      stack: ['React Native', 'Expo', 'TypeScript', 'Game Dev', 'QR & Geolocation', 'JWT'],
      links: [
        {
          label: { es: 'Google Play', en: 'Google Play' },
          href: 'https://play.google.com/store/apps/details?id=com.redstabros.ciudadfriki',
        },
      ],
    },
    {
      id: 'ciudad-friki-web',
      name: 'Ciudad Friki — Ecosistema Web',
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
      summary: {
        es: 'Plataforma web en producción desplegada en Cloudflare Pages con paridad funcional respecto a la app móvil, gestión de reseñas, retos QR y arquitectura segura sobre Supabase.',
        en: 'Production web platform deployed on Cloudflare Pages with feature parity alongside the mobile app, covering reviews, QR challenges, and secure Supabase data architecture.',
      },
      highlights: {
        es: [
          'Arquitectura backend en Node.js, Express, Prisma ORM y PostgreSQL (Supabase) con transacciones atómicas y seguridad Row-Level Security (RLS).',
          'Interfaz web moderna en Vue.js y TypeScript sincronizada en tiempo real con la app móvil para comunidad y operación de eventos.',
          'Despliegue continuo y optimización en el Edge sobre Cloudflare Pages con dominio propio ciudadfriki.app.',
        ],
        en: [
          'Backend architecture built on Node.js, Express, Prisma ORM, and PostgreSQL (Supabase) with atomic transactions and strict Row-Level Security (RLS).',
          'Modern Vue.js and TypeScript web client synchronized with the mobile app for community engagement and live event operations.',
          'Continuous edge deployment on Cloudflare Pages under the custom domain ciudadfriki.app.',
        ],
      },
      stack: ['Vue.js', 'TypeScript', 'Node.js', 'Supabase (RLS)', 'Prisma', 'PostgreSQL', 'Cloudflare Pages'],
      links: [
        {
          label: { es: 'Web en Producción', en: 'Live Web App' },
          href: 'https://ciudadfriki.app/',
        },
      ],
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
      public: 'Público',
      private: 'Privado',
    },
    badges: {
      openSource: 'Open Source',
      sourceAvailable: 'Código Público · No comercial',
      publicRepo: 'Código Público',
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
      madeWithLovePrefix: 'Hecho con amor por',
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
      public: 'Public',
      private: 'Private',
    },
    badges: {
      openSource: 'Open Source',
      sourceAvailable: 'Source-Available · Non-Commercial',
      publicRepo: 'Public Repo',
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
      madeWithLovePrefix: 'Made with love by',
    },
  },
} as const;
