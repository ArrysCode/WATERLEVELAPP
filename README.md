# Sistema de Monitoreo de Niveles de Agua (Water Level App)☔

Este proyecto se ha desarrollado en la Universidad Libre, sede Bosque Popular, con el objetivo de implementar un sistema de monitoreo automatizado para mejorar la supervisión y gestión de los niveles de agua en los tanques de la planta de tratamiento de aguas pluviales. 

## Descripción del Proyecto

La planta de tratamiento, liderada por el ingeniero ambiental Rafael Nikolay Agudelo Valencia, enfrenta desafíos debido a la falta de un monitoreo preciso de los niveles de agua en sus tanques. Este proyecto se ha enfocado en desarrollar una aplicación funcional utilizando sensores IoT y una aplicación móvil, logrando una supervisión integral en tiempo real y reduciendo la intervención humana.

### Características Principales

- Supervisión en tiempo real de los niveles de agua.
- Notificaciones y alertas oportunas.
- Reducción de la intervención humana en el monitoreo.
- Optimización de la gestión de recursos hídricos.
- Promoción de la sostenibilidad en la universidad.

### Arquitectura

El sistema utiliza la arquitectura MVC (Modelo-Vista-Controlador) y el patrón de diseño Singleton para asegurar una implementación eficiente y escalable.

#### Modelo

El modelo define la estructura de los datos utilizados en la aplicación, incluyendo:

1. **Usuario (User):**
   - Correo: String
   - Rol: String
   - UID (Identificador único): id

2. **Niveles de Agua (Water Levels):**
   - Sensor#: int
   - Distancia: float

#### Vista

Las vistas son las interfaces de usuario implementadas utilizando componentes de Angular y las interfaces proporcionadas por Ionic:

- Login / Signup
- Home (para mostrar información de sesión)
- Niveles (para mostrar los niveles de agua)
- Alertas (para mostrar alertas)
- Usuarios (solo para administradores)

#### Controlador

Los controladores actúan como intermediarios entre el modelo y la vista, implementados a través de componentes y servicios en Angular:

- `Alert.service.ts`
- `Auth.service.ts`
- `Water-level.service.ts`

### Patrón de Diseño Singleton

Los servicios de Angular encapsulan la lógica de negocio y la interacción con Firebase, asegurando una única instancia de cada servicio en toda la aplicación.

#### Servicios

1. **Servicio de Autenticación:** Maneja las operaciones de registro, inicio de sesión y cierre de sesión comunicándose con el servicio de autenticación de Firebase.
2. **Servicio de Nivel de Agua:** Interactúa con los datos de niveles de agua en Firebase Realtime Database.
3. **Servicio de Alertas:** Gestiona las alertas basadas en los niveles de agua registrados en Firebase Realtime Database.


## Cómo Empezar

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ArrysCode/WATERLEVELAPP.git
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar Firebase:**
   
   - Configura Firebase en el archivo `src/environments/environment.ts`
   
4. **Ejecutar la aplicación:**
   ```bash
   ionic serve
   ```
