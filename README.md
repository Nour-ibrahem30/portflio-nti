# Nour Ibrahem — MEAN Stack Portfolio (NTI Project)

---

## 📖 About

Personal portfolio website and **NTI MEAN Stack** final project demonstration. Built from scratch to showcase full-stack development mastery using the MEAN stack:

- **Frontend:** Angular 18 (Standalone Components, Lazy Loading, Signals, Reactive Forms, HTTP Client, Interceptors, Guards)
- **Backend:** Node.js + Express.js (RESTful API with Routes, Controllers, Services, Models, Middleware, Validators)
- **Database:** MongoDB + Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) + bcrypt password hashing
- **Architecture:** Full REST API with CRUD operations, protected routes, and role-based access

---

## 🎯 Why This Was Built

This project was developed as the **final graduation project** for the **NTI (National Telecommunication Institute) MEAN Stack Development Track**. It demonstrates proficiency across the entire stack:

- **Database Design:** Schema design with proper relations, indexing, and validation
- **REST API:** Clean architecture with Routes → Controllers → Services layers
- **Authentication System:** JWT tokens, password hashing, protected middleware, admin role guards
- **Frontend Architecture:** Modular Angular structure with lazy-loaded feature modules, standalone components, and reactive state management
- **Responsive UI:** Mobile-first design with accessible components and smooth user experience

---

## 🖼️ Screenshots

> **Note:** Screenshots will be added here in future updates. Placeholder locations:
> - Home page hero section
> - Projects gallery with filter
> - Admin dashboard with CRUD operations
> - Contact form with messages list

---

## 🏗️ Architecture

```
portflio-nti/
├── client/   # Angular 18 (Standalone, Lazy routes, Signals, Reactive Forms, HTTP Client, Interceptors, Guards)
├── server/   # Node.js + Express (Routes, Controllers, Services, Models, Middleware, Validators)
└── MongoDB   # Collections: users, projects, experiences, skills, education, contactMessages
```

### Database Collections

| Collection          | Key Fields                                                                 |
|---------------------|----------------------------------------------------------------------------|
| **users**           | `_id`, `name`, `email`, `password` (hashed), `role` (admin/user), `createdAt` |
| **projects**        | `_id`, `title`, `description`, `technologies[]`, `imageUrl`, `githubUrl`, `liveUrl`, `featured`, `order`, `createdAt` |
| **experiences**     | `_id`, `jobTitle`, `company`, `location`, `startDate`, `endDate`, `description[]`, `current`, `createdAt` |
| **skills**          | `_id`, `name`, `category` (frontend/backend/soft/tools), `level` (1-100), `icon`, `order`, `createdAt` |
| **education**       | `_id`, `degree`, `institution`, `location`, `startDate`, `endDate`, `description`, `createdAt` |
| **contactMessages** | `_id`, `name`, `email`, `subject`, `message`, `status` (unread/read/replied), `readAt`, `repliedAt`, `createdAt` |

---

## 🔌 REST API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint     | Access    | Description                  |
|--------|--------------|-----------|------------------------------|
| POST   | `/login`     | Public    | Login with email & password → JWT token |
| GET    | `/me`        | Protected | Get current authenticated user profile |

### Projects (`/api/projects`)
| Method | Endpoint     | Access    | Description                  |
|--------|--------------|-----------|------------------------------|
| GET    | `/`          | Public    | Get all projects             |
| GET    | `/:id`       | Public    | Get single project by ID     |
| POST   | `/`          | Admin     | Create new project           |
| PUT    | `/:id`       | Admin     | Update existing project      |
| DELETE | `/:id`       | Admin     | Delete project               |

### Experiences (`/api/experiences`)
| Method | Endpoint     | Access    | Description                  |
|--------|--------------|-----------|------------------------------|
| GET    | `/`          | Public    | Get all experiences          |
| GET    | `/:id`       | Public    | Get single experience        |
| POST   | `/`          | Admin     | Create new experience        |
| PUT    | `/:id`       | Admin     | Update experience            |
| DELETE | `/:id`       | Admin     | Delete experience            |

### Skills (`/api/skills`)
| Method | Endpoint     | Access    | Description                  |
|--------|--------------|-----------|------------------------------|
| GET    | `/`          | Public    | Get all skills               |
| GET    | `/:id`       | Public    | Get single skill             |
| POST   | `/`          | Admin     | Create new skill             |
| PUT    | `/:id`       | Admin     | Update skill                 |
| DELETE | `/:id`       | Admin     | Delete skill                 |

### Education (`/api/education`)
| Method | Endpoint     | Access    | Description                  |
|--------|--------------|-----------|------------------------------|
| GET    | `/`          | Public    | Get all education records    |
| GET    | `/:id`       | Public    | Get single education record  |
| POST   | `/`          | Admin     | Create education record      |
| PUT    | `/:id`       | Admin     | Update education record      |
| DELETE | `/:id`       | Admin     | Delete education record      |

### Contact Messages (`/api/contact`)
| Method | Endpoint         | Access    | Description                          |
|--------|------------------|-----------|--------------------------------------|
| POST   | `/`              | Public    | Submit new contact message (fast)    |
| GET    | `/`              | Admin     | Get all contact messages             |
| GET    | `/:id`           | Admin     | Get single contact message           |
| PATCH  | `/:id/status`    | Admin     | Update message status (unread/read/replied) |
| DELETE | `/:id`           | Admin     | Delete contact message               |

### Dashboard (`/api/dashboard`)
| Method | Endpoint     | Access    | Description                  |
|--------|--------------|-----------|------------------------------|
| GET    | `/stats`     | Admin     | Get dashboard stats (counts, recent messages, etc.) |

**Access Levels:**
- **Public:** No authentication required
- **Protected:** Requires valid JWT Bearer token in `Authorization` header
- **Admin:** Requires valid JWT token **with `role: "admin"`**

---

## 🔐 Authentication

- **JWT Tokens:** Stateless authentication using JSON Web Tokens (expires after configurable duration)
- **Password Hashing:** All passwords hashed with **bcrypt** (salt rounds = 10) before storage — never stored in plaintext
- **Protect Middleware:** Verifies JWT token signature and attaches user to `req.user`
- **adminOnly Middleware:** Additional guard that checks `req.user.role === "admin"` for administrative endpoints
- **Auth Interceptor (Angular):** Automatically attaches JWT token to every HTTP request for protected routes
- **Auth Guard (Angular):** Prevents unauthenticated users from accessing `/admin/**` routes client-side

---

## ✨ Features

### Public (Visitor) Features
- 🏠 **Home Page** — Hero section with intro, quick stats, and CTA buttons
- 👤 **About Page** — Personal bio, info cards, and highlights
- 🛠️ **Skills Page** — Categorized skills with progress bars (Frontend, Backend, Tools, Soft Skills)
- 💼 **Experience Page** — Timeline view of work history with descriptions
- 📚 **Education Section** — Academic qualifications
- 🎨 **Projects Gallery** — Grid/list view with filters, **detailed project view page** for each project
- 📧 **Contact Form** — Fast submission, messages saved directly to database (no email service required for demo)
- 📄 **CV / Resume Page** — Structured view with download CV option
- 📱 **Fully Responsive Design** — Works perfectly on mobile, tablet, and desktop
- ♿ **Accessibility** — Semantic HTML5, skip-to-content link, visible focus styles, keyboard-navigable

### Admin (Authenticated) Features
- 🔐 **Admin Login** — Secure login page with JWT authentication
- 📊 **Dashboard** — Overview statistics (total projects, messages, skills, experiences) + recent messages
- 📝 **Projects CRUD** — Full Create / Read / Update / Delete for portfolio projects
- 💼 **Experience CRUD** — Manage work experience entries
- 🛠️ **Skills CRUD** — Manage skills, categories, and proficiency levels
- 📨 **Messages Inbox** — View all contact messages, mark as read/replied, delete
- 📈 **Dashboard Stats** — Real-time counts and KPIs

---

## ⚙️ Environment Variables

### Server (`server/.env`)

Copy `server/.env.example` → `server/.env` and fill in your values:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/nour-portfolio
# OR remote URI: MONGO_URI=mongodb+srv://user:pass@cluster...

# JWT Auth
JWT_SECRET=your_jwt_secret_key_here_change_this
JWT_EXPIRES_IN=30d

# Optional: CORS
CORS_ORIGIN=http://localhost:4200
```

### Client (`client/src/environments/`)

The API base URL is configured in the environment files:

- **`environment.ts` (production):** Update `apiUrl` to your deployed server URL
- **`environment.development.ts` (dev):** Defaults to `http://localhost:5000/api`

---

## 🚀 Installation & Setup

### Step 1 — Prerequisites

Make sure you have installed:
- **Node.js** 18+ (recommended: Node 20 LTS)
- **npm** (bundled with Node.js)
- **MongoDB** — either running locally on `mongodb://localhost:27017` or have a MongoDB Atlas URI ready

### Step 2 — Get the project

```bash
# Clone (if from repo) OR navigate to extracted folder
cd portflio-nti
```

### Step 3 — Install dependencies

From the **project root** (monorepo scripts):

```bash
# Install both server AND client dependencies in one command:
npm run install:all

# OR install them separately:
# npm run install:server
# npm run install:client
```

### Step 4 — Configure server environment

```bash
# Copy the example env file
cp server/.env.example server/.env
# (On Windows PowerShell: Copy-Item server\.env.example server\.env)
```

Then open `server/.env` and fill in:
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — a strong random secret key for JWT signing

### Step 5 — Seed the database (IMPORTANT!)

This creates the default admin user and sample data (projects, skills, experience, education):

```bash
npm run seed
```

### Step 6 — Start development servers

Open **two separate terminals** from the project root:

**Terminal 1 — Backend API (Port 5000):**
```bash
npm run dev:server
```

**Terminal 2 — Frontend Angular (Port 4200):**
```bash
npm run dev:client
```

### Step 7 — Open in browser

- **Portfolio Site:** 👉 http://localhost:4200
- **Admin Panel Login:** 👉 http://localhost:4200/admin/login

---

## 🏗️ Build for Production

```bash
# Build both server and client optimized for production
npm run build
```

- **Client build output:** `client/dist/` — deploy static files to any web host (Netlify, Vercel, Nginx, etc.)
- **Server:** Node.js app ready to run with `npm start` in the `server/` directory on your Node hosting (Render, Railway, DigitalOcean, etc.)

---

## 🔑 Default Admin Login (Development)

After running `npm run seed`, use these credentials to access the admin panel:

| Field    | Value              |
|----------|--------------------|
| **Email**    | `admin@nour.dev`   |
| **Password** | `admin123`         |

> ⚠️ **IMPORTANT SECURITY REMINDER:**
> Change the default admin email and password **immediately** when deploying to production. Either update via the seed file before seeding, or create a new admin user and delete the default one. **Never use these default credentials in production.**

---

## 📁 Project Structure

### Backend — `server/src/`

```
server/src/
├── config/
│   ├── db.js          # MongoDB connection (Mongoose)
│   └── env.js         # Env vars loader & validation
├── controllers/       # Request handlers / business logic entry
│   ├── auth.controller.js
│   ├── contact.controller.js
│   ├── dashboard.controller.js
│   ├── education.controller.js
│   ├── experience.controller.js
│   ├── project.controller.js
│   └── skill.controller.js
├── middleware/
│   ├── auth.middleware.js       # JWT verify + adminOnly guard
│   ├── error.middleware.js      # Global error handler
│   └── validation.middleware.js # Express-validator runner
├── models/            # Mongoose schemas & models
│   ├── ContactMessage.model.js
│   ├── Education.model.js
│   ├── Experience.model.js
│   ├── Project.model.js
│   ├── Skill.model.js
│   └── User.model.js
├── routes/            # Express route definitions
│   ├── auth.routes.js
│   ├── contact.routes.js
│   ├── dashboard.routes.js
│   ├── education.routes.js
│   ├── experience.routes.js
│   ├── project.routes.js
│   └── skill.routes.js
├── seed/
│   └── seed.js        # Database seeder script (admin + sample data)
├── services/          # Reusable business logic layer
│   ├── auth.service.js
│   ├── contact.service.js
│   ├── dashboard.service.js
│   ├── education.service.js
│   ├── experience.service.js
│   ├── project.service.js
│   └── skill.service.js
├── utils/
│   └── helpers.js     # Shared utility functions
├── validators/
│   └── index.js       # Express-validator schemas per endpoint
├── app.js             # Express app setup (middleware, routes, CORS)
└── server.js          # HTTP server bootstrap + DB connect
```

### Frontend — `client/src/app/`

```
client/src/app/
├── core/
│   ├── models.ts           # Shared TypeScript interfaces/types
│   └── theme.service.ts    # Theme / styling utilities
├── features/               # Lazy-loaded feature components
│   ├── about/
│   │   └── about.component.ts
│   ├── admin/
│   │   ├── dashboard.component.ts
│   │   ├── layout.component.ts
│   │   ├── login.component.ts
│   │   └── projects-manage.component.ts
│   ├── contact/
│   │   └── contact.component.ts
│   ├── cv/
│   │   └── cv.component.ts
│   ├── experience/
│   │   └── experience.component.ts
│   ├── home/
│   │   └── home.component.ts
│   ├── not-found/
│   │   └── not-found.component.ts
│   ├── projects/
│   │   ├── project-detail.component.ts
│   │   └── projects-list.component.ts
│   └── skills/
│       └── skills.component.ts
├── guards/
│   └── auth.guard.ts       # CanActivate guard for admin routes
├── interceptors/
│   └── auth.interceptor.ts # Auto-attach JWT token
├── services/               # Angular HTTP services (one per API domain)
│   ├── auth.service.ts
│   ├── contact.service.ts
│   ├── dashboard.service.ts
│   ├── education.service.ts
│   ├── experience.service.ts
│   ├── project.service.ts
│   └── skill.service.ts
├── shared/                 # Reusable presentational components
│   ├── empty.component.ts
│   ├── footer.component.ts
│   ├── loading.component.ts
│   ├── navbar.component.ts
│   ├── project-card.component.ts
│   └── section-header.component.ts
├── app.component.ts        # Root component
├── app.config.ts           # Angular app config (providers)
└── app.routes.ts           # Route definitions (lazy-loaded where applicable)
```

---

## 🚧 Future Improvements & Placeholders

The following items are intentional placeholders that can be enhanced in future iterations:

- 📄 **CV PDF Download** — Place the actual PDF file at `/client/src/assets/cv.pdf` (the CV page references this path)
- 🖼️ **Project Gallery Images** — Add real project screenshots to `/client/src/assets/images/projects/` and update `imageUrl` fields in project documents
- 🔗 **Project URLs** — Fill in `githubUrl` and `liveUrl` for each project via the admin dashboard
- 👤 **User Avatar / Profile Image** — Add avatar upload support (admin profile) and user avatars on the about page
- 📧 **Email Notifications** — Integrate Nodemailer to send email notifications when new contact messages arrive
- 📸 **Image Uploads** — Add Multer or cloud storage (Cloudinary/S3) for project images instead of URLs
- 🔍 **Search & Filter** — Advanced project filtering by technology stack
- 🌙 **Dark / Light Theme Toggle** — Add theme switcher component with persistent preference
- ✅ **End-to-End Tests** — Add Cypress/Playwright E2E tests for critical flows
- 🧪 **Unit Tests** — Expand test coverage for API services and Angular components

---

## 🎓 Academic Note

This project is an **NTI (National Telecommunication Institute) academic final project** for the MEAN Stack Development diploma track. It is intended for educational demonstration purposes. All code, design patterns, and architectural decisions follow modern best practices and the curriculum guidelines provided during the program.

---

**Built with ❤️ by Nour Ibrahem — 2026**
