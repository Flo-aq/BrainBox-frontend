# BrainBox: planner académico para estudiantes

Aplicación web para organizar el semestre: ramos, notas, tareas, eventos de estudio compartidos y calendario. Proyecto grupal del curso IIC2513 (Tecnologías y Aplicaciones Web, PUC Chile, 2024-2).

## Qué hace

- Registro e inicio de sesión (JWT) para estudiantes y administradores
- Catálogo de ramos y carga de cada uno; el usuario agrega ramos a su cuenta
- Calendario semanal y mensual con eventos y tareas; creación de sesiones de estudio y reuniones, e invitación a otros usuarios
- Notas por ramo con promedio actual; marcar tareas y eventos como completados
- Notificaciones, modo claro/oscuro
- Panel de administración para crear y editar ramos

## Stack

React 18, Vite, React Router, Axios, jwt-decode, IndexedDB (`idb`), date-fns y moment. Despliegue en Netlify con CI en GitHub Actions. El backend vive en un repositorio aparte.

## Mi rol

Diseñé e implementé el frontend, con CSS puro (sin librerías de componentes ni Tailwind): calendario mensual y semanal, notas con promedio, eventos compartidos y modo claro/oscuro.

## Equipo

Florencia Aqueveque ([@Flo-aq](https://github.com/Flo-aq)), [@cpschulz](https://github.com/cpschulz), [@vich1n](https://github.com/vich1n) y [@rodrigoogalde](https://github.com/rodrigoogalde). El historial conserva la autoría de cada integrante.

## Ejecutar localmente

```bash
cp .env.example .env   # definir VITE_BACKEND_URL
npm install
npm run dev
```

## Estructura

```
src/Pages/        Landing, LogIn, SignUp, Calendar, UserClasses, AdminClasses, Instructions, AboutUs
src/Components/   Calendario, formularios, popups, navbar, rutas protegidas
src/Api/          Cliente HTTP hacia el backend
src/auth/         Manejo de sesión y token
src/db/           Almacenamiento local (IndexedDB)
```
