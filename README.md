# Academia CONLOSRODRIGUEZ

Plataforma de cursos online de microaprendizaje en tecnología e IA.

## Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Supabase (Auth + Database)
- **Estilos**: Tailwind CSS + Inline Styles
- **Pago**: VenePagos + Binance Pay (próximamente)

## Setup

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env` con:
```
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### 3. Crear tablas en Supabase
Ejecuta el SQL de `supabase/schema.sql` en el SQL Editor de Supabase.

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

### 5. Build para producción
```bash
npm run build
```

## Estructura

```
src/
├── components/
│   ├── Header.tsx          # Navegación responsive
│   ├── HeroSection.tsx     # Banner principal
│   ├── Methodology.tsx     # Sección metodología
│   ├── AboutUs.tsx         # Sección quiénes somos
│   ├── AboutPage.tsx       # Página dedicada conócenos
│   ├── CourseGrid.tsx      # Catálogo de cursos
│   ├── CourseCard.tsx      # Tarjeta de curso
│   ├── CourseDetail.tsx    # Detalle del curso
│   ├── CoursePlayer.tsx    # Reproductor de cursos
│   ├── StudentDashboard.tsx # Dashboard del estudiante
│   ├── Certificate.tsx     # Constancia de finalización
│   ├── AuthModal.tsx       # Login con Supabase
│   ├── CheckoutModal.tsx   # Checkout de pago
│   ├── AdminPanel.tsx      # Panel de administración
│   └── WhatsAppButton.tsx  # Botón flotante de WhatsApp
├── lib/
│   └── supabase.ts         # Configuración de Supabase
├── data.ts                 # Cursos y tipos
├── App.tsx                 # Router principal
└── main.tsx                # Entry point
```

## Próximos pasos

- [ ] Integrar VenePagos para Pago Móvil
- [ ] Integrar Binance Pay
- [ ] Sistema de envío de credenciales por correo
- [ ] Desplegar en Vercel
