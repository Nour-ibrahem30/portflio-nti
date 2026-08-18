import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExperienceService } from '../../services/experience.service';
import type { Experience } from '../../core/models';

const EXP_TYPES = ['Internship', 'Training', 'Volunteer', 'Community', 'Work', 'Education'] as const;

@Component({
  selector: 'app-admin-experiences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="manage">
      <div class="page-head">
        <div>
          <h2>Experiences</h2>
          <p>Manage work, education, and volunteer entries.</p>
        </div>
      </div>

      @if (success()) {
        <div class="alert alert-success">{{ success() }}</div>
      }
      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }

      <div class="card create-form">
        <h3 class="form-title">Add Experience</h3>
        <form [formGroup]="createForm" (ngSubmit)="create()" class="create-grid">
          <div class="form-field">
            <label>Organization <span class="req">*</span></label>
            <input type="text" class="form-control" formControlName="organization" />
          </div>
          <div class="form-field">
            <label>Position <span class="req">*</span></label>
            <input type="text" class="form-control" formControlName="position" />
          </div>
          <div class="form-field">
            <label>Type <span class="req">*</span></label>
            <select class="form-control" formControlName="type">
              @for (t of EXP_TYPES; track t) {
                <option [value]="t">{{ t }}</option>
              }
            </select>
          </div>
          <div class="form-field">
            <label>Date Label</label>
            <input type="text" class="form-control" formControlName="dateLabel" placeholder="e.g. 2023 - Present" />
          </div>
          <div class="form-actions-inline">
            <button type="submit" class="btn btn-primary btn-sm" [disabled]="creating()">
              @if (creating()) { Adding... } @else { + Add }
            </button>
          </div>
        </form>
      </div>

      @if (loading()) {
        <div class="card empty-state">Loading...</div>
      } @else if (items().length === 0) {
        <div class="card empty-state">No experiences yet. Add one above!</div>
      } @else {
        <div class="card table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Position</th>
                <th>Type</th>
                <th>Date Label</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (e of items(); track e._id) {
                @if (editingId() === e._id) {
                  <tr class="edit-row">
                    <td colspan="5">
                      <form [formGroup]="editForm!" (ngSubmit)="saveEdit(e._id!)" class="edit-grid">
                        <div class="form-field">
                          <label>Organization</label>
                          <input type="text" class="form-control" formControlName="organization" />
                        </div>
                        <div class="form-field">
                          <label>Position</label>
                          <input type="text" class="form-control" formControlName="position" />
                        </div>
                        <div class="form-field">
                          <label>Type</label>
                          <select class="form-control" formControlName="type">
                            @for (t of EXP_TYPES; track t) {
                              <option [value]="t">{{ t }}</option>
                            }
                          </select>
                        </div>
                        <div class="form-field">
                          <label>Date Label</label>
                          <input type="text" class="form-control" formControlName="dateLabel" />
                        </div>
                        <div class="form-actions-inline">
                          <button type="submit" class="btn btn-primary btn-sm" [disabled]="savingEdit()">
                            @if (savingEdit()) { Saving... } @else { Save }
                          </button>
                          <button type="button" class="btn btn-ghost btn-sm" (click)="cancelEdit()">Cancel</button>
                        </div>
                      </form>
                    </td>
                  </tr>
                } @else {
                  <tr>
                    <td class="org-name">{{ e.organization }}</td>
                    <td>{{ e.position }}</td>
                    <td><span class="badge" [ngClass]="typeBadge(e.type)">{{ e.type }}</span></td>
                    <td class="mono">{{ e.dateLabel || '&mdash;' }}</td>
                    <td>
                      <div class="actions">
                        <button class="btn btn-ghost btn-sm" (click)="startEdit(e)">Edit</button>
                        <button class="btn btn-danger btn-sm" (click)="remove(e)">Delete</button>
                      </div>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .manage { max-width: 1100px; }
    .page-head { margin-bottom: 1.5rem; }
    .page-head h2 { margin: 0 0 .25rem; }
    .page-head p { margin: 0; color: var(--text-muted); font-size: var(--fs-sm); }

    .req { color: var(--danger); }
    .empty-state { padding: 3rem; text-align: center; color: var(--text-dim); }

    .create-form { padding: 1.25rem; margin-bottom: 1.5rem; }
    .form-title { margin: 0 0 1rem; font-size: var(--fs-md); }
    .create-grid {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr 2fr auto;
      gap: .75rem;
      align-items: end;
    }
    @media (max-width: 900px) {
      .create-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .create-grid { grid-template-columns: 1fr; }
    }
    .form-actions-inline { display: flex; gap: .35rem; }

    .table-wrap { padding: 0; overflow-x: auto; }

    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td {
      padding: 10px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      font-size: var(--fs-sm);
    }
    .table th {
      background: var(--bg-soft);
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .05em;
    }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: var(--bg-hover); }
    .table tr.edit-row td { background: var(--bg-soft); padding: 1rem; }

    .org-name { font-weight: 600; }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-family: var(--font-mono);
      font-weight: 500;
    }

    .actions { display: flex; gap: .35rem; flex-wrap: wrap; }

    .edit-grid {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr 2fr auto;
      gap: .75rem;
      align-items: end;
    }
    @media (max-width: 900px) {
      .edit-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .edit-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AdminExperiencesComponent implements OnInit {
  EXP_TYPES = EXP_TYPES;

  items = signal<Experience[]>([]);
  loading = signal(true);
  error = signal('');
  success = signal('');
  creating = signal(false);
  editingId = signal<string | null>(null);
  savingEdit = signal(false);
  editForm: FormGroup | null = null;

  createForm = this.fb.group({
    organization: ['', [Validators.required]],
    position: ['', [Validators.required]],
    type: ['Work' as Experience['type'], [Validators.required]],
    dateLabel: [''],
  });

  constructor(
    private experienceService: ExperienceService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.experienceService.getAll().subscribe({
      next: (res) => { this.items.set(res.data || []); this.loading.set(false); },
      error: (err) => { this.error.set(err?.error?.message || 'Failed to load.'); this.loading.set(false); },
    });
  }

  create() {
    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }
    this.creating.set(true);
    this.error.set(''); this.success.set('');
    this.experienceService.create(this.createForm.value as Partial<Experience>).subscribe({
      next: (res) => {
        this.creating.set(false);
        if (res.success && res.data) {
          this.items.update(list => [res.data!, ...list]);
          this.createForm.reset({ organization: '', position: '', type: 'Work', dateLabel: '' });
          this.flash('Experience added!', 'success');
        } else {
          this.error.set(res.message || 'Failed to add.');
        }
      },
      error: (err) => { this.creating.set(false); this.error.set(err?.error?.message || 'Error.'); },
    });
  }

  startEdit(e: Experience) {
    this.editingId.set(e._id!);
    this.editForm = this.fb.group({
      organization: [e.organization, [Validators.required]],
      position: [e.position, [Validators.required]],
      type: [e.type || 'Work', [Validators.required]],
      dateLabel: [e.dateLabel || ''],
    });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editForm = null;
  }

  saveEdit(id: string) {
    if (!this.editForm || this.editForm.invalid) { this.editForm?.markAllAsTouched(); return; }
    this.savingEdit.set(true);
    this.experienceService.update(id, this.editForm.value as Partial<Experience>).subscribe({
      next: (res) => {
        this.savingEdit.set(false);
        if (res.success) {
          this.items.update(list => list.map(x => x._id === id ? { ...x, ...this.editForm!.value } : x));
          this.cancelEdit();
          this.flash('Experience updated!', 'success');
        } else {
          this.error.set(res.message || 'Failed to update.');
        }
      },
      error: (err) => { this.savingEdit.set(false); this.error.set(err?.error?.message || 'Error.'); },
    });
  }

  remove(e: Experience) {
    if (!confirm(`Delete "${e.organization} - ${e.position}"?`)) return;
    this.experienceService.remove(e._id!).subscribe({
      next: () => {
        this.items.update(list => list.filter(x => x._id !== e._id));
        this.flash('Deleted.', 'success');
      },
      error: (err) => this.error.set(err?.error?.message || 'Failed to delete.'),
    });
  }

  typeBadge(t?: string): string {
    return t === 'Work' ? 'badge-success' : t === 'Education' ? 'badge-info' : t === 'Internship' ? 'badge-warning' : 'badge-muted';
  }

  private flash(msg: string, type: 'success' | 'error') {
    if (type === 'success') {
      this.success.set(msg);
      setTimeout(() => this.success.set(''), 3000);
    } else {
      this.error.set(msg);
      setTimeout(() => this.error.set(''), 4000);
    }
  }
}
