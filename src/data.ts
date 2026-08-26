export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  completedLessons: string[];
  purchasedCourses: string[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  content: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  masterclassCount: number;
  duration: string;
  price: number;
  isRecent?: boolean;
  prerequisites: string[];
  prerequisiteNames?: string[];
  modules: Module[];
}

export const CATEGORIES = [
  'Todos',
  'ARQUITECTURA IA',
  'GOOGLE SHEETS & SCRIPT',
  'PROMPT ENGINEERING',
  'AGENTES & AUTOMATIZACIÓN',
] as const;

export type Category = typeof CATEGORIES[number];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'arquitectura-ia',
    category: 'ARQUITECTURA IA',
    title: 'Arquitectura de Soluciones con Inteligencia Artificial',
    subtitle: 'Diseña e implementa sistemas inteligentes escalables',
    description: 'Aprende a diseñar, conectar y desplegar arquitecturas de software modernas potenciadas con LLMs, agentes autónomos y APIs de IA de alto rendimiento.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    masterclassCount: 16,
    duration: '14 Horas',
    price: 67,
    isRecent: true,
    prerequisites: [],
    modules: [
      {
        id: 'arq-m1',
        title: 'Módulo 1: Fundamentos de Arquitectura con LLMs',
        lessons: [
          {
            id: 'arq-1-1',
            title: 'Anatomía de una aplicación moderna con IA',
            duration: '12 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            quiz: {
              question: '¿Qué componente es esencial al diseñar arquitectura RAG (Retrieval-Augmented Generation)?',
              options: ['Una base de datos vectorial', 'Un disco duro mecánico', 'Un servidor FTP legacy', 'Una hoja de cálculo local'],
              correctIndex: 0
            }
          },
          {
            id: 'arq-1-2',
            title: 'Patrones de diseño para Agentes Autónomos',
            duration: '15 min',
            type: 'reading',
            content: 'Los agentes autónomos combinan razonamiento (LLM), memoria a corto/largo plazo y herramientas externas (Tools/APIs) para ejecutar flujos de trabajo complejos sin intervención humana constante. Los patrones más comunes incluyen: ReAct (Reasoning + Acting), Chain-of-Thought y Tool-Use.'
          },
          {
            id: 'arq-1-3',
            title: 'Conceptos clave: Tokens, Context Window y Temperature',
            duration: '10 min',
            type: 'reading',
            content: 'Los tokens son las unidades básicas de procesamiento en LLMs. El context window define cuánta información puede procesar una vez. La temperature controla la aleatoriedad: 0 = determinista, 1 = creativo.'
          }
        ]
      },
      {
        id: 'arq-m2',
        title: 'Módulo 2: Integración de APIs y Modelos',
        lessons: [
          {
            id: 'arq-2-1',
            title: 'Conectando OpenAI, Claude y Gemini APIs',
            duration: '18 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            quiz: {
              question: '¿Cuál es la diferencia principal entre la API de OpenAI y la de Claude?',
              options: ['Claude no usa tokens', 'OpenAI no tiene límite de contexto', 'Claude tiene un enfoque más conversacional y mayor contexto', 'No hay diferencia'],
              correctIndex: 2
            }
          },
          {
            id: 'arq-2-2',
            title: 'Diseñando flujos con LangChain y LlamaIndex',
            duration: '20 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        id: 'arq-m3',
        title: 'Módulo 3: Despliegue y Escalamiento',
        lessons: [
          {
            id: 'arq-3-1',
            title: 'Desplegando soluciones de IA en la nube',
            duration: '16 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-3-2',
            title: 'Monitoreo y optimización de costos en producción',
            duration: '14 min',
            type: 'reading',
            content: 'Monitorear latencia, costos por token y tasas de error es crucial. Usa herramientas como LangSmith, Helicone o LiteLLM para tracking en tiempo real.'
          }
        ]
      }
    ]
  },
  {
    id: 'catalogos-sheets',
    category: 'GOOGLE SHEETS & SCRIPT',
    title: 'Catálogos Digitales con Google Sheets y Apps Script',
    subtitle: 'Automatiza tu inventario y genera catálogos web profesionales',
    description: 'Conecta Google Sheets con Apps Script e Inteligencia Artificial para crear catálogos digitales interactivos, actualizar precios automáticos y generar descripciones de productos con IA.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    masterclassCount: 6,
    duration: '2 Horas',
    price: 49,
    isRecent: true,
    prerequisites: [],
    modules: [
      {
        id: 'cat-m1',
        title: 'Módulo 1: Fundamentos de Google Sheets',
        lessons: [
          {
            id: 'cat-1-1',
            title: 'Configuración inicial y estructura de datos',
            duration: '12 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'cat-1-2',
            title: 'Fórmulas esenciales para catálogos',
            duration: '15 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'cat-1-3',
            title: 'Diseñando tu hoja de inventario profesional',
            duration: '18 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        id: 'cat-m2',
        title: 'Módulo 2: Automatización con Apps Script',
        lessons: [
          {
            id: 'cat-2-1',
            title: 'Introducción a Google Apps Script',
            duration: '20 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'cat-2-2',
            title: 'Creando triggers automáticos para actualizaciones',
            duration: '16 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'cat-2-3',
            title: 'Generando tu catálogo web desde Sheets',
            duration: '22 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'prompt-engineering',
    category: 'PROMPT ENGINEERING',
    title: 'Prompt Engineering Avanzado',
    subtitle: 'Domina la comunicación precisa con Modelos de Lenguaje',
    description: 'Técnicas avanzadas de prompting (Few-Shot, Chain-of-Thought, ReAct, Tree-of-Thought) para construir prompts deterministas y robustos en aplicaciones de producción.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    masterclassCount: 14,
    duration: '12 Horas',
    price: 57,
    isRecent: true,
    prerequisites: [],
    modules: [
      {
        id: 'pe-m1',
        title: 'Módulo 1: Fundamentos del Prompting Efectivo',
        lessons: [
          {
            id: 'pe-1-1',
            title: 'Anatomía de un buen prompt: Rol, Contexto, Instrucción, Formato',
            duration: '14 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            quiz: {
              question: '¿Cuál es el componente MÁS importante de un prompt efectivo?',
              options: ['El contexto claro y la instrucción específica', 'Usar mayúsculas', 'Escribir en inglés', 'Usar muchos adjetivos'],
              correctIndex: 0
            }
          },
          {
            id: 'pe-1-2',
            title: 'Zero-Shot vs Few-Shot Prompting',
            duration: '12 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'pe-1-3',
            title: 'Chain-of-Thought: Forzar el razonamiento paso a paso',
            duration: '16 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        id: 'pe-m2',
        title: 'Módulo 2: Técnicas Avanzadas',
        lessons: [
          {
            id: 'pe-2-1',
            title: 'Tree-of-Thought y prompting multi-perspectiva',
            duration: '18 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            quiz: {
              question: '¿Qué es Tree-of-Thought?',
              options: ['Una técnica que explora múltiples líneas de razonamiento simultáneamente', 'Un árbol de decisiones en Python', 'Una librería de IA', 'Un método de compresión de datos'],
              correctIndex: 0
            }
          },
          {
            id: 'pe-2-2',
            title: 'Prompt Chaining: Encadenar múltiples llamadas',
            duration: '15 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'pe-2-3',
            title: 'ReAct: Razonar y Actuar en loops',
            duration: '14 min',
            type: 'reading',
            content: 'ReAct (Reasoning + Acting) es un patrón donde el modelo alterna entre razonar sobre el problema y ejecutar acciones (como buscar en una base de datos o llamar a una API). Es la base de los agentes autónomos modernos.'
          }
        ]
      },
      {
        id: 'pe-m3',
        title: 'Módulo 3: Prompts para Producción',
        lessons: [
          {
            id: 'pe-3-1',
            title: 'Sistema de prompts para chatbots profesionales',
            duration: '20 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'pe-3-2',
            title: 'Testing y evaluación de prompts',
            duration: '16 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'agentes-n8n',
    category: 'AGENTES & AUTOMATIZACIÓN',
    title: 'Agentes de IA y Workflows con n8n',
    subtitle: 'Automatiza procesos empresariales sin código complejo',
    description: 'Crea flujos de trabajo inteligentes conectando CRM, WhatsApp, Google Sheets y modelos de Inteligencia Artificial mediante n8n y herramientas no-code.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800',
    masterclassCount: 18,
    duration: '16 Horas',
    price: 79,
    isRecent: false,
    prerequisites: ['catalogos-sheets'],
    prerequisiteNames: ['Catálogos Digitales con Google Sheets y Apps Script'],
    modules: [
      {
        id: 'ag-m1',
        title: 'Módulo 1: Fundamentos de n8n',
        lessons: [
          {
            id: 'ag-1-1',
            title: 'Instalación y configuración de n8n (Self-hosted o Cloud)',
            duration: '15 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'ag-1-2',
            title: 'Nodos, Webhooks y Conexiones básicas',
            duration: '18 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            quiz: {
              question: '¿Qué es un Webhook en n8n?',
              options: ['Un punto de entrada que recibe datos HTTP externos', 'Un tipo de base de datos', 'Un plugin de IA', 'Un formato de archivo'],
              correctIndex: 0
            }
          },
          {
            id: 'ag-1-3',
            title: 'Tu primer workflow: Guardar emails en Google Sheets',
            duration: '20 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        id: 'ag-m2',
        title: 'Módulo 2: Integrando Inteligencia Artificial',
        lessons: [
          {
            id: 'ag-2-1',
            title: 'Conectando OpenAI/Claude como nodo en n8n',
            duration: '22 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'ag-2-2',
            title: 'Clasificación automática de emails con IA',
            duration: '18 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            quiz: {
              question: '¿Qué nodo de n8n se usa para conectar con la API de OpenAI?',
              options: ['OpenAI Node', 'HTTP Request con API Key', 'AI Agent Node', 'Todas las anteriores son válidas'],
              correctIndex: 3
            }
          },
          {
            id: 'ag-2-3',
            title: 'Generación automática de contenido con IA',
            duration: '16 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        id: 'ag-m3',
        title: 'Módulo 3: Agentes Autónomos en n8n',
        lessons: [
          {
            id: 'ag-3-1',
            title: 'Creando un agente de atención al cliente con WhatsApp',
            duration: '25 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
           {
            id: 'ag-3-2',
            title: 'Automatización completa: Lead → CRM → Email → Seguimiento',
            duration: '30 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'tienda-gemini-sheets',
    category: 'GOOGLE SHEETS & SCRIPT',
    title: 'Crea tu Tienda Digital Gratis con Gemini y Google Sheets',
    subtitle: 'Sin hosting, sin dominio, sin mensualidades',
    description: 'Aprende a crear tu tienda en línea funcionando sin pagar hosting, dominio ni mensualidades. Usa Google Sheets como base de datos, Apps Script como motor y Gemini como tu programador personal.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    masterclassCount: 12,
    duration: '1.5 Horas',
    price: 20,
    isRecent: true,
    prerequisites: [],
    modules: [
      {
        id: 'tg-m1',
        title: 'Módulo 1: La base de tu tienda (Diseño y estructura de datos)',
        lessons: [
          {
            id: 'tg-1-1',
            title: 'Bienvenida y Muestra Visual de tu tienda terminada',
            duration: '7 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-1-2',
            title: 'El rol de Google Sheets como panel de control de inventario',
            duration: '8 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-1-3',
            title: 'Estructura de la Tabla: Columnas clave (ID, Producto, Descripción, Precio, Imagen_URL, Disponible)',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-1-t',
            title: '📌 Tarea: Crea tu hoja con al menos 3 productos reales',
            duration: '15 min',
            type: 'reading',
            content: 'Crea tu hoja en Google Sheets con las columnas indicadas y llena al menos 3 productos reales de tu negocio con sus datos básicos.'
          }
        ]
      },
      {
        id: 'tg-m2',
        title: 'Módulo 2: El motor detrás de la tienda (Apps Script y estructura web)',
        lessons: [
          {
            id: 'tg-2-1',
            title: '¿Qué es Apps Script? Extensiones > Apps Script en tu Google Sheet',
            duration: '9 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-2-2',
            title: 'El archivo .gs: Lógica interna que lee datos del Sheet y los envía a la web',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-2-3',
            title: 'El archivo .html: Estructura y diseño de la tienda (CSS básico moderno)',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-2-t',
            title: '📌 Tarea: Crea archivos .gs y .html en Apps Script',
            duration: '15 min',
            type: 'reading',
            content: 'Abre Apps Script en tu hoja de cálculo, crea un archivo .gs y un archivo .html, y déjalos listos y guardados para la magia de la IA.'
          }
        ]
      },
      {
        id: 'tg-m3',
        title: 'Módulo 3: Programando con IA (Gemini al rescate y pruebas en vivo)',
        lessons: [
          {
            id: 'tg-3-1',
            title: 'Cómo hablarle a Gemini: Prompts efectivos para generar código',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-3-2',
            title: 'Copiado y pegado estratégico: Dónde colocar el código en Apps Script',
            duration: '8 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-3-3',
            title: 'Prueba y Despliegue en vivo: Publicar la aplicación web y revisar resultados',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-3-t',
            title: '📌 Tarea: Genera código con Gemini, pégalo y despliega tu tienda',
            duration: '20 min',
            type: 'reading',
            content: 'Pídele a Gemini el código con la plantilla de prompt que te damos, pégalo en Apps Script, despliega la web y comparte el enlace de tu primera versión en nuestra comunidad.'
          }
        ]
      },
      {
        id: 'tg-m4',
        title: 'Módulo 4: Control total y gestión súper fácil (Precios, imágenes y edición)',
        lessons: [
          {
            id: 'tg-4-1',
            title: 'Actualización instantánea: Cambia precios y se reflejan automáticamente',
            duration: '7 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-4-2',
            title: 'Gestión de imágenes: Enlaces directos gratuitos para tu tabla',
            duration: '8 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-4-3',
            title: 'Mantenimiento: Ocultar productos agotados y mantener tu tienda impecable',
            duration: '7 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-4-t',
            title: '📌 Tarea Final: Publica tu tienda lista para recibir clientes',
            duration: '20 min',
            type: 'reading',
            content: 'Añade una imagen a uno de tus productos, cambia un precio en el Sheet, verifica el cambio en tu tienda en vivo y publica el link final de tu tienda lista para recibir clientes.'
          }
        ]
      }
    ]
  }
];
