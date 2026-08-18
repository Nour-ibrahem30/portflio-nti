import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-admin-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="form-page">
      <div class="page-head">
        <div>
          <h2>{{ isEdit ? 'Edit Project' : 'New Project' }}</h2>
          <p>{{ isEdit ? 'Update project details.' : 'Create a new portfolio project.' }}</p>
        </div>
        <a routerLink="/admin/projects" class="btn btn-ghost btn-sm">&larr; Back to list</a>
      </div>

      @if (success()) {
        <div class="alert alert-success">{{ success() }}</div>
      }
      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }

      <div class="card form-card">
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="form-field">
              <label for="title">Title <span class="req">*</span></label>
              <input id="title" type="text" class="form-control" formControlName="title" />
              @if (isInvalid('title')) {
                <span class="form-error">Title is required.</span>
              }
            </div>

            <div class="form-field">
              <label for="slug">Slug</label>
              <input id="slug" type="text" class="form-control" formControlName="slug" />
            </div>

            <div class="form-field full">
              <label for="description">Description <span class="req">*</span></label>
              <textarea id="description" class="form-control" formControlName="description" rows="6"></textarea>
              @if (isInvalid('description')) {
                <span class="form-error">Description is required.</span>
              }
            </div>

            <div class="form-field full">
              <label for="shortDescription">Short Description</label>
              <textarea id="shortDescription" class="form-control" formControlName="shortDescription" rows="2"></textarea>
            </div>

            <div class="form-field">
              <label for="category">Category</label>
              <input id="category" type="text" class="form-control" formControlName="category" />
            </div>

            <div class="form-field">
              <label for="year">Year</label>
              <input id="year" type="number" class="form-control" formControlName="year" />
            </div>

            <div class="form-field full">
              <label for="technologies">Technologies <span class="hint mono">(comma separated)</span></label>
              <input id="technologies" type="text" class="form-control" formControlName="technologies"
                placeholder="Angular, TypeScript, Node.js" />
            </div>

            <div class="form-field">
              <label for="image">Image URL</label>
              <input id="image" type="text" class="form-control" formControlName="image" />
            </div>

            <div class="form-field">
              <label for="status">Status</label>
              <select id="status" class="form-control" formControlName="status">
                <option value="Project">Project</option>
                <option value="Concept / Prototype">Concept / Prototype</option>
                <option value="In Progress">In Progress</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div class="form-field full">
              <label for="gallery">Gallery URLs <span class="hint mono">(one per line)</span></label>
              <textarea id="gallery" class="form-control" formControlName="gallery" rows="4"
                placeholder="https://...&#10;https://..."></textarea>
            </div>

            <div class="form-field">
              <label for="githubUrl">GitHub URL</label>
              <input id="githubUrl" type="text" class="form-control" formControlName="githubUrl" />
            </div>

            <div class="form-field">
              <label for="liveUrl">Live URL</label>
              <input id="liveUrl" type="text" class="form-control" formControlName="liveUrl" />
            </div>

            <div class="form-field">
              <label for="order">Order</label>
              <input id="order" type="number" class="form-control" formControlName="order" />
            </div>

            <div class="form-field checkbox-field">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="featured" />
                <span>Featured Project</span>
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-ghost" routerLink="/admin/projects">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="loading()">
              @if (loading()) {
                <span class="spinner" style="width:14px;height:14px;border-width:2px;"></span>
                {{ isEdit ? 'Saving...' : 'Creating...' }}
              } @else {
                {{ isEdit ? 'Save Changes' : 'Create Project' }}
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-page { max-width: 900px; }
    .page-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
    .page-head h2 { margin: 0 0 .25rem; }
    .page-head p { margin: 0; color: var(--text-muted); font-size: var(--fs-sm); }

    .form-card { padding: 1.75rem; }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 700px) { .form-grid { grid-template-columns: 1fr; } }
    .form-field.full { grid-column: 1 / -1; }

    .req { color: var(--danger); }
    .hint { color: var(--text-dim); font-weight: 400; margin-left: .25rem; }

    .checkbox-field { display: flex; align-items: center; }
    .checkbox-label {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      cursor: pointer;
      font-size: var(--fs-sm);
    }
    .checkbox-label input {
      width: 18px; height: 18px;
      accent-color: var(--accent);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: .75rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
    }
  `]
})
export class AdminProjectFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required]],
    slug: [''],
    description: ['', [Validators.required]],
    shortDescription: [''],
    category: [''],
    technologies: [''],
    image: [''],
    gallery: [''],
    githubUrl: [''],
    liveUrl: [''],
    featured: [false],
    status: ['Project'],
    year: [null as number | null],
    order: [0],
  });

  loading = signal(false);
  error = signal('');
  success = signal('');
  isEdit = false;
  private projectId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.projectId = id;
      this.loadProject(id);
    }
  }

  loadProject(id: string) {
    this.loading.set(true);
    this.projectService.getById(id).subscribe({
      next: (res) => {
        const p = res.data;
        if (p) {
          this.form.patchValue({
            title: p.title || '',
            slug: p.slug || '',
            description: p.description || '',
            shortDescription: p.shortDescription || '',
            category: p.category || '',
            technologies: (p.technologies || []).join(', '),
            image: p.image || '',
            gallery: (p.gallery || []).join('\n'),
            githubUrl: p.githubUrl || '',
            liveUrl: p.liveUrl || '',
            featured: p.featured || false,
            status: p.status || 'Project',
            year: p.year ?? null,
            order: p.order ?? 0,
          });
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Failed to load project.');
        this.loading.set(false);
      },
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const raw = this.form.value;
    const payload: Partial<Project> = {
      title: raw.title!,
      slug: raw.slug || raw.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: raw.description!,
      shortDescription: raw.shortDescription || undefined,
      category: raw.category || undefined,
      technologies: raw.technologies
        ? raw.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : [],
      image: raw.image || undefined,
      gallery: raw.gallery
        ? raw.gallery.split('\n').map(g => g.trim()).filter(Boolean)
        : [],
      githubUrl: raw.githubUrl || undefined,
      liveUrl: raw.liveUrl || undefined,
      featured: !!raw.featured,
      status: (raw.status as Project['status']) || 'Project',
      year: raw.year ?? undefined,
      order: raw.order ?? 0,
    };

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const obs = this.isEdit
      ? this.projectService.update(this.projectId, payload)
      : this.projectService.create(payload);

    obs.subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.success) {
          this.success.set(this.isEdit ? 'Project updated!' : 'Project created!');
          setTimeout(() => this.router.navigate(['/admin/projects']), 700);
        } else {
          this.error.set(res.message || 'Operation failed.');
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'An error occurred.');
      },
    });
  }
}
