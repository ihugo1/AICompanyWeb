# Manual del Programador - AICompanyWeb

## 📋 Descripción General
Aplicación web de reclutamiento desarrollada con React + TypeScript + Vite que permite a candidatos postularse y a administradores gestionar el proceso de selección.

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico
- **Frontend**: React 19.1.1 + TypeScript
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.4
- **Backend**: Supabase
- **Notificaciones**: React Hot Toast
- **Estilos**: CSS Modules

### Estructura de Directorios
```
src/
├── api/                    # Cliente de Supabase
├── assets/                 # Recursos estáticos (imágenes, iconos)
├── components/             # Componentes reutilizables
├── constants/              # Constantes de la aplicación
├── context/                # Context API (AuthContext)
├── helpers/                # Funciones de validación
├── pages/                  # Páginas principales
├── types/                  # Definiciones de TypeScript
├── App.tsx                 # Componente principal
└── main.tsx               # Punto de entrada
```

## 🔧 Configuración del Entorno

### Instalación
```bash
npm install
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Linting con ESLint
npm run preview  # Preview del build
```

### Variables de Entorno
Crear archivo `.env` con:
```
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_key
```

## 📱 Funcionalidades Principales

### 1. Landing Page (`/`)
- Página de inicio con información de la empresa
- Navegación hacia el proceso de reclutamiento

### 2. Proceso de Reclutamiento (`/reclutamiento`)
- **FormularioPersonal**: Captura datos personales del candidato
- **Cuestionario**: Evaluación técnica con sistema de puntuación
- **SubirCurriculum**: Upload de CV (opcional)

### 3. Panel de Administración (`/admin`)
- **Protegido por autenticación**
- **ListaCandidatos**: Vista de todos los candidatos
- **ModalCandidato**: Detalles y gestión de estado de candidatos

### 4. Login (`/login`)
- Autenticación de administradores

## 🎯 Tipos de Datos Principales

### Candidato
```typescript
type Candidato = {
  // Datos personales
  nombre_completo: string;
  correo: string;
  dui: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;
  
  // Datos del cuestionario
  experiencia: string;
  tareas_capaces: string[];
  certificado: boolean;
  equipos_capaces: string[];
  capacidad_mantenimiento: string;
  ubicacion_residencia: string;
  
  // Extras
  url_curriculo?: string;
  porcentaje_efectividad?: number;
  id?: string;
  estado?: EstadoCandidato;
};
```

### Estados de Candidato
```typescript
type EstadoCandidato = 
  | "en_espera"
  | "entrevista_agendada" 
  | "contratado"
  | "rechazado";
```

## 🔄 Flujo de la Aplicación

### Para Candidatos
1. **Landing** → Información inicial
2. **Reclutamiento** → Formulario personal
3. **Cuestionario** → Evaluación técnica
4. **Subir CV** → Upload opcional
5. **Confirmación** → Proceso completado

### Para Administradores
1. **Login** → Autenticación
2. **Admin Panel** → Lista de candidatos
3. **Modal Candidato** → Gestión individual
4. **Cambio de Estado** → Actualización del proceso

## 🛠️ Componentes Clave

### AuthContext
Maneja la autenticación global:
```typescript
// Uso en componentes
const { user, login, logout } = useAuth();
```

### ProtectedRoute
Protege rutas que requieren autenticación:
```typescript
<ProtectedRoute>
  <Admin />
</ProtectedRoute>
```

### Validadores
- `validarFormulario.ts`: Validación de datos personales
- `validarCuestionario.ts`: Validación de respuestas del cuestionario

## 📊 Sistema de Puntuación

El cuestionario utiliza un sistema de puntuación basado en:
- Cada pregunta tiene un `max_puntaje`
- Las opciones tienen `puntaje` individual
- Se calcula `porcentaje_efectividad` final

## 🎨 Estilos

### CSS Modules
Cada componente tiene su archivo `.module.css`:
```typescript
import styles from './Componente.module.css';

<div className={styles.container}>
```

### Estructura de Estilos
- Estilos globales en `main.css`
- Estilos por componente en módulos CSS
- Responsive design implementado

## 🔐 Autenticación

### Supabase Auth
```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});

// Logout  
await supabase.auth.signOut();
```

## 📝 Buenas Prácticas

### Desarrollo
1. **Usar TypeScript** para type safety
2. **CSS Modules** para estilos encapsulados
3. **Validación** en formularios
4. **Error handling** con toast notifications
5. **Responsive design** en todos los componentes

### Estructura de Código
1. **Separación de responsabilidades** por carpetas
2. **Componentes reutilizables** en `/components`
3. **Tipos centralizados** en `/types`
4. **Constantes** en archivos separados

### Performance
1. **Lazy loading** para rutas si es necesario
2. **Optimización de imágenes** en `/assets`
3. **Tree shaking** automático con Vite

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

### Vercel (configurado)
- Archivo `vercel.json` incluido
- Deploy automático desde repositorio

## 🐛 Debugging

### Herramientas
- **React DevTools** para componentes
- **Supabase Dashboard** para base de datos
- **Network Tab** para requests API
- **Console** para logs de desarrollo

### Logs Importantes
```typescript
// En desarrollo
console.log('Candidato:', candidato);
console.error('Error:', error);
```

## 📚 Recursos Adicionales

### Documentación
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/docs)
- [React Router](https://reactrouter.com/)

### Extensiones VSCode Recomendadas
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- CSS Modules
- Prettier
- ESLint

---

