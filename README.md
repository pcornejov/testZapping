# test Zapping

Este proyecto es una aplicación de streaming de video que utiliza **Node.js**, **Express**, **MongoDB**, y **HLS.js** para servir contenido de video en formato HLS. La aplicación está lista para ejecutarse completamente en contenedores Docker.

---

## Características

- **Reproductor de video HLS**: Utiliza `HLS.js` para reproducir contenido en formato `.m3u8`.
- **Backend con Express**: Maneja las rutas de autenticación y streaming.
- **Base de datos MongoDB**: Almacena los datos de los usuarios.
- **Docker**: Configuración lista para ejecutar la aplicación y MongoDB en contenedores.

---

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Instalación y ejecución con Docker

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/pcornejov/testZapping.git
   cd test-zapping

2. **Construye y ejecuta los contenedores:**:
    docker-compose up --build

3. **Accede a la aplicación:**:
    http://localhost:5000/login

    
4. **Estructura del proyecto:**:
```plaintext
test-zapping/
├── backend/
│   ├── server.js          # Configuración principal del servidor
│   ├── routes/
│   │   ├── authRoutes.js  # Rutas de autenticación
│   │   ├── streamRoutes.js # Rutas de streaming
│   ├── models/
│   │   └── User.js        # Modelo de usuario
├── frontend/
│   ├── login.html         # Página de inicio de sesión
│   ├── register.html      # Página de registro
│   ├── player.html        # Reproductor de video
├── [docker-compose.yml](http://_vscodecontentref_/1)     # Configuración de Docker
└── [README.md](http://_vscodecontentref_/2)              # Documentación del proyecto
```

## Endpoints principales

### Autenticación
- **POST /api/auth/register**: Registra un nuevo usuario.
- **POST /api/auth/login**: Inicia sesión con un usuario existente.

### Streaming
- **GET /api/stream/playlist**: Devuelve la playlist `.m3u8` para el reproductor HLS.
- **GET /api/stream/segments/:segment**: Devuelve un segmento de video `.ts`.
