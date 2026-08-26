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
  'GOOGLE SHEETS & SCRIPT',
  'ARQUITECTURA DE SOFTWARE',
] as const;

export type Category = typeof CATEGORIES[number];

export const INITIAL_COURSES: Course[] = [
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
        title: 'Módulo 2: Programando con IA (Gemini al rescate y pruebas en vivo)',
        lessons: [
          {
            id: 'tg-2-1',
            title: 'Cómo hablarle a Gemini: Prompts efectivos para generar código',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-2-2',
            title: 'Copiado y pegado estratégico: Dónde colocar el código en Apps Script',
            duration: '8 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-2-3',
            title: 'Prueba y Despliegue en vivo: Publicar la aplicación web y revisar resultados',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-2-t',
            title: '📌 Tarea: Genera código con Gemini, pégalo y despliega tu tienda',
            duration: '20 min',
            type: 'reading',
            content: 'Pídele a Gemini el código con la plantilla de prompt que te damos, pégalo en Apps Script, despliega la web y comparte el enlace de tu primera versión en nuestra comunidad.'
          }
        ]
      },
      {
        id: 'tg-m3',
        title: 'Módulo 3: El motor detrás de la tienda (Apps Script y estructura web)',
        lessons: [
          {
            id: 'tg-3-1',
            title: '¿Qué es Apps Script? Extensiones > Apps Script en tu Google Sheet',
            duration: '9 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-3-2',
            title: 'El archivo .gs: Lógica interna que lee datos del Sheet y los envía a la web',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-3-3',
            title: 'El archivo .html: Estructura y diseño de la tienda (CSS básico moderno)',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'tg-3-t',
            title: '📌 Tarea: Crea archivos .gs y .html en Apps Script',
            duration: '15 min',
            type: 'reading',
            content: 'Abre Apps Script en tu hoja de cálculo, crea un archivo .gs y un archivo .html, y déjalos listos y guardados para la magia de la IA.'
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
  },
  {
    id: 'arquitecto-no-code',
    category: 'ARQUITECTURA DE SOFTWARE',
    title: 'Arquitecto de Software No-Code',
    subtitle: 'Aprende a pensar como un ingeniero para diseñar sistemas a medida',
    description: 'Al finalizar este programa de 8 módulos prácticos, sabrás cómo desglosar cualquier idea de negocio, seleccionar la combinación ideal de tecnologías y construir la arquitectura de un software completo a medida sin escribir código.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    masterclassCount: 32,
    duration: '4 Horas',
    price: 100,
    isRecent: true,
    prerequisites: [],
    modules: [
      {
        id: 'arq-m1',
        title: 'Módulo 1: La Mente del Arquitecto (Pensamiento Sistémico)',
        lessons: [
          {
            id: 'arq-1-1',
            title: 'Qué hace un Arquitecto de Software',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-1-2',
            title: 'Desglose de Problemas: De requerimientos a diagramas de flujo',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-1-3',
            title: 'Los 4 Pilares: Base de Datos, Backend, Frontend e Infraestructura',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-1-t',
            title: '📌 Tarea: Mapea el flujo de usuarios de tu idea de sistema',
            duration: '20 min',
            type: 'reading',
            content: 'Mapea el flujo de usuarios y procesos de la idea de sistema que vas a construir a lo largo del curso.'
          }
        ]
      },
      {
        id: 'arq-m2',
        title: 'Módulo 2: Modelado de Datos Avanzado (El Corazón de la Solución)',
        lessons: [
          {
            id: 'arq-2-1',
            title: 'Tablas, Relaciones y Llaves: Entidades y relaciones 1-a-1, 1-a-muchos',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-2-2',
            title: 'Normalización Sencilla: Evitar duplicar datos y mantener limpio el sistema',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-2-3',
            title: 'Seguridad desde la Base: Lógica de permisos básicos',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-2-t',
            title: '📌 Tarea: Diseña el esquema completo de la base de datos',
            duration: '20 min',
            type: 'reading',
            content: 'Diseña en diagrama el esquema completo de la base de datos para tu proyecto.'
          }
        ]
      },
      {
        id: 'arq-m3',
        title: 'Módulo 3: Elección del Motor de Datos e Infraestructura',
        lessons: [
          {
            id: 'arq-3-1',
            title: 'Criterios de Selección: Bases de datos visuales vs. relacionales en la nube',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-3-2',
            title: 'Escalabilidad y Costos: Evaluar límites gratuitos y velocidad',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-3-3',
            title: 'Configuración del Entorno de Datos: Creación y aislamiento de la BD',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-3-t',
            title: '📌 Tarea: Levanta y configura la base de datos real de tu sistema',
            duration: '20 min',
            type: 'reading',
            content: 'Levanta y configura la base de datos real de tu sistema siguiendo la arquitectura definida en el Módulo 2.'
          }
        ]
      },
      {
        id: 'arq-m4',
        title: 'Módulo 4: Lógica de Negocio y Flujos Automáticos (El Backend)',
        lessons: [
          {
            id: 'arq-4-1',
            title: 'Triggers y Acciones: Automatizaciones en tiempo real',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-4-2',
            title: 'Integraciones mediante APIs y Webhooks sin programar',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-4-3',
            title: 'Manejo de Errores: Garantizar que el sistema nunca se caiga',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-4-t',
            title: '📌 Tarea: Crea el primer flujo automatizado con tu base de datos',
            duration: '20 min',
            type: 'reading',
            content: 'Crea el primer flujo automatizado que reciba información del usuario y actualice la base de datos en segundo plano.'
          }
        ]
      },
      {
        id: 'arq-m5',
        title: 'Módulo 5: Arquitectura de la Interfaz (Diseño Visual y UX)',
        lessons: [
          {
            id: 'arq-5-1',
            title: 'Jerarquía Visual y Wireframes: Estructurar pantallas efectivas',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-5-2',
            title: 'Consumo de Datos en Vivo: La interfaz le pide datos al backend',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-5-3',
            title: 'Interfaces Adaptables (Responsive): Funciona en móvil y escritorio',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-5-t',
            title: '📌 Tarea: Diseña wireframe de las 3 pantallas principales',
            duration: '20 min',
            type: 'reading',
            content: 'Diseña la estructura visual (wireframe) de las 3 pantallas principales de la solución.'
          }
        ]
      },
      {
        id: 'arq-m6',
        title: 'Módulo 6: Ensamblaje Visual e Inteligencia Artificial',
        lessons: [
          {
            id: 'arq-6-1',
            title: 'Uso de Entornos de Generación Asistida por IA',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-6-2',
            title: 'Conexión Frontend-Backend: Vincular componentes con endpoints',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-6-3',
            title: 'Estructura de Estilos: Componentes globales profesionales',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-6-t',
            title: '📌 Tarea: Conecta tu interfaz con la base de datos en vivo',
            duration: '20 min',
            type: 'reading',
            content: 'Conecta tu interfaz visual con la base de datos real para que empiece a mostrar información en vivo.'
          }
        ]
      },
      {
        id: 'arq-m7',
        title: 'Módulo 7: Despliegue, Servidores y Publicación',
        lessons: [
          {
            id: 'arq-7-1',
            title: 'Entornos de Desarrollo vs. Producción',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-7-2',
            title: 'Selección de Hosting: Dónde hospedar para máxima velocidad',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-7-3',
            title: 'Dominios y SSL: Nombres de dominio y seguridad web',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-7-t',
            title: '📌 Tarea: Despliega tu sistema y conecta un dominio de prueba',
            duration: '20 min',
            type: 'reading',
            content: 'Despliega tu sistema en la web, conecta un subdominio o dominio de prueba y verifica que la versión en vivo sea 100% funcional.'
          }
        ]
      },
      {
        id: 'arq-m8',
        title: 'Módulo 8: Auditoría de Seguridad, Optimización y Mantenimiento',
        lessons: [
          {
            id: 'arq-8-1',
            title: 'Pruebas de Estrés y Seguridad: Verificación de roles de usuario',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-8-2',
            title: 'Optimización de Carga: Acelerar consultas e imágenes',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-8-3',
            title: 'Entrega al Cliente: Documentar y entregar el sistema',
            duration: '10 min',
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'arq-8-t',
            title: '📌 Proyecto Final: Checklist de auditoría y enlace de producción',
            duration: '30 min',
            type: 'reading',
            content: 'Realiza el checklist de auditoría de tu sistema terminado, comparte el enlace de producción en el grupo y obtén tu retroalimentación guiada.'
          }
        ]
      }
    ]
  }
];
