import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SkillService } from '../../services/skill.service';
import type { Skill } from '../../core/models';

const SKILL_CATEGORIES: Skill['category'][] = ['Frontend', 'Backend', 'Tools', 'Exploring', 'Other'];
const PROFICIENCIES: NonNullable<Skill['proficiency']>[] = ['Known', 'Learning', 'Exploring'];

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="manage">
      <div class="page-head">
        <div>
          <h2>Skills</h2>
          <p>Manage your technical skills and proficiencies.</p>
        </div>
      </div>

      @if (success()) {
        <div class="alert alert-success">{{ success() }}</div>
      }
      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }

      <div class="card create-form">
        <h3 class="form-title">Add Skill</h3>
        <form [formGroup]="createForm" (ngSubmit)="create()" class="create-grid">
          <div class="form-field">
            <label>Name <span class="req">*</span></label>
            <input type="text" class="form-control" formControlName="name" placeholder="e.g. Angular" />
          </div>
          <div class="form-field">
            <label>Category <span class="req">*</span></label>
            <select class="form-control" formControlName="category">
              @for (c of SKILL_CATEGORIES; track c) {
                <option [value]="c">{{ c }}</option>
              }
            </select>
          </div>
          <div class="form-field">
            <label>Proficiency</label>
            <select class="form-control" formControlName="proficiency">
              @for (p of PROFICIENCIES; track p) {
                <option [value]="p">{{ p }}</option>
              }
            </select>
          </div>
          <div class="form-field">
            <label>Order</label>
            <input type="number" class="form-control" formControlName="order" min="0" />
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
        <div class="card empty-state">No skills yet. Add one above!</div>
      } @else {
        <div class="card table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Proficiency</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (s of items(); track s._id) {
                @if (editingId() === s._id) {
                  <tr class="edit-row">
                    <td colspan="5">
                      <form [formGroup]="editForm!" (ngSubmit)="saveEdit(s._id!)" class="edit-grid">
                        <div class="form-field">
                          <label>Name</label>
                          <input type="text" class="form-control" formControlName="name" />
                        </div>
                        <div class="form-field">
                          <label>Category</label>
                          <select class="form-control" formControlName="category">
                            @for (c of SKILL_CATEGORIES; track c) {
                              <option [value]="c">{{ c }}</option>
                            }
                          </select>
                        </div>
                        <div class="form-field">
                          <label>Proficiency</label>
                          <select class="form-control" formControlName="proficiency">
                            <option [ngValue]="null">None</option>
                            @for (p of PROFICIENCIES; track p) {
                              <option [value]="p">{{ p }}</option>
                            }
                          </select>
                        </div>
                        <div class="form-field">
                          <label>Order</label>
                          <input type="number" class="form-control" formControlName="order" min="0" />
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
                    <td class="skill-name">{{ s.name }}</td>
                    <td><span class="tag">{{ s.category }}</span></td>
                    <td><span class="badge" [ngClass]="profBadge(s.proficiency)">{{ s.proficiency || '&mdash;' }}</span></td>
                    <td class="mono">{{ s.order ?? 0 }}</td>
                    <td>
                      <div class="actions">
                        <button class="btn btn-ghost btn-sm" (click)="startEdit(s)">Edit</button>
                        <button class="btn btn-danger btn-sm" (click)="remove(s)">Delete</button>
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
      grid-template-columns: 2fr 1.5fr 1.5fr 1fr auto;
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

    .skill-name { font-weight: 600; }

    .tag {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      background: var(--bg-soft);
      font-size: 11px;
      font-family: var(--font-mono);
      border: 1px solid var(--border);
    }

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
      grid-template-columns: 2fr 1.5fr 1.5fr 1fr auto;
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
export class AdminSkillsComponent implements OnInit {
  SKILL_CATEGORIES = SKILL_CATEGORIES;
  PROFICIENCIES = PROFICIENCIES;

  items = signal<Skill[]>([]);
  loading = signal(true);
  error = signal('');
  success = signal('');
  creating = signal(false);
  editingId = signal<string | null>(null);
  savingEdit = signal(false);
  editForm: FormGroup | null = null;

  createForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ['Frontend' as Skill['category'], [Validators.required]],
    proficiency: ['Known' as Skill['proficiency']],
    order: [0],
  });

  constructor(
    private skillService: SkillService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.skillService.getAll().subscribe({
      next: (res) => {
        const data = res.data || [];
        data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        this.items.set(data);
        this.loading.set(false);
      },
      error: (err) => { this.error.set(err?.error?.message || 'Failed to load.'); this.loading.set(false); },
    });
  }

  create() {
    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }
    this.creating.set(true);
    this.error.set(''); this.success.set('');
    this.skillService.create(this.createForm.value as Partial<Skill>).subscribe({
      next: (res) => {
        this.creating.set(false);
        if (res.success && res.data) {
          this.items.update(list => {
            const newList = [...list, res.data!];
            newList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            return newList;
          });
          this.createForm.reset({ name: '', category: 'Frontend', proficiency: 'Known', order: 0 });
          this.flash('Skill added!', 'success');
        } else {
          this.error.set(res.message || 'Failed to add.');
        }
      },
      error: (err) => { this.creating.set(false); this.error.set(err?.error?.message || 'Error.'); },
    });
  }

  startEdit(s: Skill) {
    this.editingId.set(s._id!);
    this.editForm = this.fb.group({
      name: [s.name, [Validators.required]],
      category: [s.category, [Validators.required]],
      proficiency: [s.proficiency ?? null],
      order: [s.order ?? 0],
    });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editForm = null;
  }

  saveEdit(id: string) {
    if (!this.editForm || this.editForm.invalid) { this.editForm?.markAllAsTouched(); return; }
    this.savingEdit.set(true);
    const val = { ...this.editForm.value };
    if (val.proficiency === null) delete val.proficiency;
    this.skillService.update(id, val as Partial<Skill>).subscribe({
      next: (res) => {
        this.savingEdit.set(false);
        if (res.success) {
          this.items.update(list => {
            const newList = list.map(x => x._id === id ? { ...x, ...val } : x);
            newList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            return newList;
          });
          this.cancelEdit();
          this.flash('Skill updated!', 'success');
        } else {
          this.error.set(res.message || 'Failed to update.');
        }
      },
      error: (err) => { this.savingEdit.set(false); this.error.set(err?.error?.message || 'Error.'); },
    });
  }

  remove(s: Skill) {
    if (!confirm(`Delete skill "${s.name}"?`)) return;
    this.skillService.remove(s._id!).subscribe({
      next: () => {
        this.items.update(list => list.filter(x => x._id !== s._id));
        this.flash('Deleted.', 'success');
      },
      error: (err) => this.error.set(err?.error?.message || 'Failed to delete.'),
    });
  }

  profBadge(p?: string): string {
    return p === 'Known' ? 'badge-success' : p === 'Learning' ? 'badge-info' : p === 'Exploring' ? 'badge-warning' : 'badge-muted';
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
