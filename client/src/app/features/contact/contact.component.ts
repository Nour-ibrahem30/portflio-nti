import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { LoadingComponent } from '../../shared/loading.component';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeaderComponent, LoadingComponent],
  template: `
    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <app-section-header label="Contact" title="Get in Touch" num="01" lead="Have a project, an idea, or just want to say hi? Drop a message below — I read everything that comes through.">
          <span label>Contact</span>
        </app-section-header>

        <div class="contact-grid">
          <div class="form-col">
            <div class="card">
              @if (success()) {
                <div class="alert alert-success">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m-2 15-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8z"/></svg>
                  <div>
                    <strong>Message sent!</strong>
                    <p>Thanks for reaching out — I'll get back to you as soon as I can.</p>
                  </div>
                </div>
              }

              @if (error()) {
                <div class="alert alert-error">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"/></svg>
                  <div>
                    <strong>Something went wrong</strong>
                    <p>{{ error() }}</p>
                  </div>
                </div>
              }

              <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!success()" class="contact-form">
                <div class="row">
                  <div class="field">
                    <label class="mono">Name</label>
                    <input
                      type="text"
                      formControlName="name"
                      [class.invalid]="isInvalid('name')"
                      placeholder="Your name"
                    />
                    <span class="error mono" *ngIf="showError('name') && form.get('name')?.hasError('required')">Name is required</span>
                    <span class="error mono" *ngIf="showError('name') && form.get('name')?.hasError('minlength')">Must be at least 2 characters</span>
                  </div>
                  <div class="field">
                    <label class="mono">Email</label>
                    <input
                      type="email"
                      formControlName="email"
                      [class.invalid]="isInvalid('email')"
                      placeholder="you@example.com"
                    />
                    <span class="error mono" *ngIf="showError('email') && form.get('email')?.hasError('required')">Email is required</span>
                    <span class="error mono" *ngIf="showError('email') && form.get('email')?.hasError('email')">Please enter a valid email</span>
                  </div>
                </div>

                <div class="field">
                  <label class="mono">Subject</label>
                  <input
                    type="text"
                    formControlName="subject"
                    [class.invalid]="isInvalid('subject')"
                    placeholder="What's this about?"
                  />
                  <span class="error mono" *ngIf="showError('subject') && form.get('subject')?.hasError('required')">Subject is required</span>
                  <span class="error mono" *ngIf="showError('subject') && form.get('subject')?.hasError('minlength')">Must be at least 3 characters</span>
                </div>

                <div class="field">
                  <label class="mono">Message</label>
                  <textarea
                    rows="6"
                    formControlName="message"
                    [class.invalid]="isInvalid('message')"
                    placeholder="Tell me about your project, idea, or just say hi..."
                  ></textarea>
                  <span class="error mono" *ngIf="showError('message') && form.get('message')?.hasError('required')">Message is required</span>
                  <span class="error mono" *ngIf="showError('message') && form.get('message')?.hasError('minlength')">Must be at least 10 characters</span>
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="submitting()">
                  @if (submitting()) {
                    <span class="mini-spinner"></span>
                    Sending...
                  } @else {
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M2 21 23 12 2 3v7l15 2-15 2z"/></svg>
                    Send Message
                  }
                </button>
              </form>

              @if (success()) {
                <button class="btn btn-secondary btn-block" (click)="resetForm()">Send another message</button>
              }
            </div>
          </div>

          <aside class="info-col">
            <div class="card info-card">
              <div class="info-head mono">Contact Info</div>
              <ul class="info-list">
                <li>
                  <div class="info-ic">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>
                  </div>
                  <div>
                    <div class="label mono">Email</div>
                    <a href="mailto:your@email.com" class="value">your@email.com</a>
                  </div>
                </li>
                <li>
                  <div class="info-ic">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1z"/></svg>
                  </div>
                  <div>
                    <div class="label mono">Location</div>
                    <div class="value">Remote / Egypt</div>
                  </div>
                </li>
                <li>
                  <div class="info-ic">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 5a3 3 0 1 1-3 3 3 3 0 0 1 3-3m0 13a7 7 0 0 1-5.9-3c0-2 4-3.1 5.9-3.1S17.9 15 17.9 17A7 7 0 0 1 12 20z"/></svg>
                  </div>
                  <div>
                    <div class="label mono">Availability</div>
                    <div class="value">Open for opportunities</div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="card info-card">
              <div class="info-head mono">Find me online</div>
              <div class="socials">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-11 4H6v11h2zM7 8.5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 7 8.5M18 17v-6.5c0-2.5-3-2.8-3.5-1.4v-.1h-2V17h2v-5.7c0-.8.6-1.3 1.5-1.3s1.5.5 1.5 1.3V17z"/></svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M22.5 7.5a.5.5 0 0 0-.5-.5h-4l1.6-2a.5.5 0 0 0-.7-.7L17 6.3l-2-2h-2.7L15 7H8.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4L11 16H7l3.4 4.2.5.6L16 17.7l2 2h2.7L19 17h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-4l1.6-2z"/></svg>
                  <span>X / Twitter</span>
                </a>
                <a href="mailto:your@email.com" class="social-link" aria-label="Email">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 7 8-5H4z"/></svg>
                  <span>Email</span>
                </a>
              </div>
            </div>

            <div class="card info-card note-card">
              <div class="note-ic">⏱️</div>
              <div>
                <div class="label mono">Response Time</div>
                <div class="value">
                  Usually within <strong>24–48 hours</strong> on weekdays. A bit slower on weekends — I'm probably building something.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 1.5rem;
      margin-top: 3rem;
      align-items: start;
    }
    @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }

    .contact-form { display: grid; gap: 1.1rem; }
    .contact-form .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 640px) { .contact-form .row { grid-template-columns: 1fr; } }

    .field { display: grid; gap: .4rem; }
    .field label {
      font-size: var(--fs-xxs);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .08em;
    }
    .field input,
    .field textarea {
      width: 100%;
      padding: .75rem 1rem;
      background: var(--bg-soft);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      font-size: var(--fs-sm);
      font-family: inherit;
      transition: all var(--transition);
      resize: vertical;
    }
    .field input:focus,
    .field textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(99,102,241,.12);
    }
    .field input.invalid,
    .field textarea.invalid {
      border-color: var(--danger);
    }
    .error {
      font-size: 10px;
      color: var(--danger);
      text-transform: uppercase;
      letter-spacing: .05em;
    }

    .mini-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin .8s linear infinite;
      margin-right: .5rem;
      vertical-align: -2px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .alert {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      padding: 1rem 1.25rem;
      border-radius: var(--radius);
      margin-bottom: 1.25rem;
      border: 1px solid;
    }
    .alert svg { flex-shrink: 0; margin-top: 1px; }
    .alert strong { display: block; margin-bottom: .25rem; }
    .alert p { margin: 0; font-size: var(--fs-sm); color: var(--text-muted); }
    .alert-success {
      background: rgba(16,185,129,.08);
      border-color: rgba(16,185,129,.25);
      color: var(--success);
    }
    .alert-error {
      background: rgba(239,68,68,.08);
      border-color: rgba(239,68,68,.25);
      color: var(--danger);
    }

    .info-col { display: grid; gap: 1.25rem; position: sticky; top: 90px; }
    @media (max-width: 900px) { .info-col { position: static; } }
    .info-card { padding: 1.5rem; }
    .info-head {
      font-size: var(--fs-xxs);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .1em;
      margin-bottom: 1.25rem;
      padding-bottom: .75rem;
      border-bottom: 1px dashed var(--border);
    }
    .info-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
    .info-list li {
      display: flex;
      gap: .85rem;
      align-items: flex-start;
    }
    .info-ic {
      width: 38px; height: 38px;
      flex-shrink: 0;
      border-radius: var(--radius);
      background: var(--gradient-soft);
      color: var(--accent);
      display: inline-flex; align-items: center; justify-content: center;
    }
    .info-list .label {
      font-size: 10px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .08em;
      margin-bottom: .15rem;
    }
    .info-list .value {
      font-size: var(--fs-sm);
      color: var(--text);
      font-weight: 500;
    }
    .info-list a.value { text-decoration: none; color: var(--accent); }
    .info-list a.value:hover { text-decoration: underline; }

    .socials { display: grid; gap: .5rem; }
    .social-link {
      display: inline-flex;
      align-items: center;
      gap: .75rem;
      padding: .7rem 1rem;
      border-radius: var(--radius);
      background: var(--bg-soft);
      border: 1px solid var(--border);
      color: var(--text-muted);
      text-decoration: none;
      font-size: var(--fs-sm);
      font-weight: 500;
      transition: all var(--transition);
    }
    .social-link:hover {
      color: var(--accent);
      border-color: var(--accent);
      transform: translateX(3px);
    }

    .note-card {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      background: var(--gradient-soft);
      border-color: var(--border-strong);
    }
    .note-ic {
      font-size: 24px;
      flex-shrink: 0;
      margin-top: -2px;
    }
    .note-card .label {
      font-size: 10px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: .08em;
      margin-bottom: .25rem;
    }
    .note-card .value {
      font-size: var(--fs-sm);
      color: var(--text-muted);
      line-height: 1.5;
    }
    .note-card strong { color: var(--accent); }
  `]
})
export class ContactComponent {
  form: FormGroup;
  submitting = signal(false);
  success = signal(false);
  error = signal('');

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  showError(field: string) {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitting());
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.error.set('');

    this.contactService.send(this.form.value).subscribe({
      next: () => {
        this.submitting.set(false);
        this.success.set(true);
        this.form.reset();
      },
      error: (err) => {
        this.submitting.set(false);
        this.error.set(err?.error?.message || 'Please try again later or email me directly.');
      }
    });
  }

  resetForm() {
    this.success.set(false);
    this.error.set('');
    this.form.reset();
  }
}
