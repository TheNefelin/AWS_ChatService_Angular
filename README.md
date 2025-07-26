# AWS ChatService Angular 20.1.2

### Structure
```
src/
├── assets/
│
└── app/
    ├── core/                      # Funciones esenciales y globales
    │   ├── services/              # Servicios singleton (ej: Auth, Socket, API base)
    │   ├── interceptors/          # HTTP interceptors
    │   ├── guards/                # Guards de rutas
    │   ├── models/                # Modelos globales (User, Message, etc.)
    │   └── utils/                 # Funciones reutilizables (helpers)
    │
    ├── shared/                    # Componentes, pipes y módulos reutilizables
    │   ├── components/            # Ej: Button, Modal, Avatar, etc.
    │   ├── directives/
    │   └── pipes/
    │
    ├── features/                  # Funcionalidades agrupadas (modular)
    │   ├── chat/                  # Todo lo relacionado al chat
    │   │   ├── components/        # ChatRoomList, MessageList, ChatHeader, etc.
    │   │   ├── pages/             # ChatPage, NewChatPage, etc.
    │   │   ├── services/          # ChatService, MessageService
    │   │   └── chat-routing.module.ts
    │   │
    │   └── user/                  # Funcionalidad de usuarios
    │       ├── components/        # UserList, UserCard, etc.
    │       ├── pages/             # UserProfilePage, etc.
    │       ├── services/          # UserService
    │       └── user-routing.module.ts
    │
    ├── layout/                    # Layouts generales (con sidebar, sin sidebar, etc.)
    │   └── main-layout/           # Header, sidebar, footer, etc.
    │       ├── components/
    │       │   ├── footerbar/
    │       │   └── navbar/    
    │       ├── main-layout.html  
    │       └── main-layout.ts
    │
    ├── pages/                     # Páginas no relacionadas con features (Landing, Error 404, Login)
    │   ├── home/
    │   │   ├── components/
    │   │   │   ├── chat-area/
    │   │   │   │   ├── chat-input/
    │   │   │   │   └── message-list/         
    │   │   │   └── navigation/   
    │   │   │       ├── rooms-list/
    │   │   │       └── users-list/        
    │   │   ├── home.html  
    │   │   └── home.ts    
    │   ├── login/
    │   └── not-found/
    │
    ├── app-routing.module.ts
    └── app.component.ts
```

### Commands
- Components
```bash
ng generate component shared/components/loading
ng generate component shared/components/error

ng generate component layout/main-layout
ng generate component layout/main-layout/components/navbar
ng generate component layout/main-layout/components/footerbar

ng generate component pages/home
ng generate component pages/home/components/navigation
ng generate component pages/home/components/navigation/tabs
ng generate component pages/home/components/navigation/rooms-list
ng generate component pages/home/components/navigation/users-list
ng generate component pages/home/components/chat-area
ng generate component pages/home/components/chat-area/message-list
ng generate component pages/home/components/chat-area/chat-input

ng generate component pages/not-found
```
- Services
```bash
ng generate service core/services/user-service
ng generate service core/services/room-service
```

## app.routes.ts
```typescript
import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';  

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  }
];
```

## tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@core/*": ["app/core/*"],
      "@shared/*": ["app/shared/*"]
    }
  }
}
```

## environment.ts
- src/environments/environment.ts
```typescript
export const environment = {
  production: false,
  ignoreSSL: true,
  apiBaseUrl: 'https://localhost:7081/api'
};
```

## server.ts
```typescript
// Configuración SSL segura
if (!environment.production && environment.ignoreSSL) {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  console.warn('⚠️  SSL verification disabled (development only)');
}
```

# AWSChatServiceAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
