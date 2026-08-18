import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), title: 'Nour Ibrahem — Front-End Developer' },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent), title: 'About — Nour Ibrahem' },
  { path: 'skills', loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent), title: 'Skills — Nour Ibrahem' },
  { path: 'experience', loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent), title: 'Experience — Nour Ibrahem' },
  { path: 'projects', loadComponent: () => import('./features/projects/projects-list.component').then(m => m.ProjectsListComponent), title: 'Projects — Nour Ibrahem' },
  { path: 'projects/:slug', loadComponent: () => import('./features/projects/project-detail.component').then(m => m.ProjectDetailComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent), title: 'Contact — Nour Ibrahem' },
  { path: 'cv', loadComponent: () => import('./features/cv/cv.component').then(m => m.CvComponent), title: 'CV — Nour Ibrahem' },

  { path: 'admin/login', canActivate: [guestGuard], loadComponent: () => import('./features/admin/login.component').then(m => m.AdminLoginComponent), title: 'Admin Login' },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./features/admin/dashboard.component').then(m => m.AdminDashboardComponent), title: 'Dashboard — Admin' },
      { path: 'projects', loadComponent: () => import('./features/admin/projects-manage.component').then(m => m.AdminProjectsComponent), title: 'Projects — Admin' },
      { path: 'projects/new', loadComponent: () => import('./features/admin/project-form.component').then(m => m.AdminProjectFormComponent), title: 'New Project' },
      { path: 'projects/:id/edit', loadComponent: () => import('./features/admin/project-form.component').then(m => m.AdminProjectFormComponent), title: 'Edit Project' },
      { path: 'experiences', loadComponent: () => import('./features/admin/experiences-manage.component').then(m => m.AdminExperiencesComponent), title: 'Experience — Admin' },
      { path: 'skills', loadComponent: () => import('./features/admin/skills-manage.component').then(m => m.AdminSkillsComponent), title: 'Skills — Admin' },
      { path: 'messages', loadComponent: () => import('./features/admin/messages-manage.component').then(m => m.AdminMessagesComponent), title: 'Messages — Admin' },
    ]
  },

  { path: '404', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent), title: '404 — Not Found' },
  { path: '**', redirectTo: '404' },
];
