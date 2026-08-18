import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import type { ContactMessage } from '../../core/models';

type StatusFilter = 'all' | 'new' | 'read' | 'archived';
type MsgStatus = 'new' | 'read' | 'archived';

const STATUS_ORDER: MsgStatus[] = ['new', 'read', 'archived'];

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="manage">
      <div class="page-head">
        <div>
          <h2>Messages</h2>
          <p>Manage contact form submissions.</p>
        </div>
      </div>

      @if (success()) {
        <div class="alert alert-success">{{ success() }}</div>
      }
      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }

      <div class="card tabs-card">
        <nav class="tabs" aria-label="Message status filter">
          @for (tab of TABS; track tab.key) {
            <button
              class="tab"
              [class.active]="filter() === tab.key"
              (click)="setFilter(tab.key)"
            >
              {{ tab.label }}
              <span class="count mono">{{ countFor(tab.key) }}</span>
            </button>
          }
        </nav>
      </div>

      @if (loading()) {
        <div class="card empty-state">Loading messages...</div>
      } @else if (filtered().length === 0) {
        <div class="card empty-state">No {{ filter() !== 'all' ? filter() : '' }} messages.</div>
      } @else {
        <div class="card table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th style="width:40px;"></th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (m of filtered(); track m._id) {
                <tr
                  [class.expanded]="expandedId() === m._id"
                  [class.is-new]="m.status === 'new'"
                >
                  <td>
                    <button
                      class="expand-btn"
                      (click)="toggleExpand(m._id!)"
                      [attr.aria-expanded]="expandedId() === m._id"
                      [attr.aria-label]="expandedId() === m._id ? 'Collapse' : 'Expand'"
                    >
                      <span [class.rotated]="expandedId() === m._id">&#9658;</span>
                    </button>
                  </td>
                  <td>
                    <span class="sender-name">{{ m.name }}</span>
                  </td>
                  <td class="mono small">{{ m.email }}</td>
                  <td>{{ m.subject }}</td>
                  <td>
                    <span class="badge" [ngClass]="statusBadge(m.status)">{{ m.status }}</span>
                  </td>
                  <td class="mono small">{{ m.createdAt | date:'short' }}</td>
                  <td>
                    <div class="actions">
                      <select
                        class="form-control status-select"
                        [value]="m.status"
                        (change)="changeStatus(m, $any($event.target).value)"
                        aria-label="Change status"
                      >
                        @for (s of STATUS_ORDER; track s) {
                          <option [value]="s">{{ s }}</option>
                        }
                      </select>
                      <button class="btn btn-danger btn-sm" (click)="remove(m)">Delete</button>
                    </div>
                  </td>
                </tr>
                @if (expandedId() === m._id) {
                  <tr class="expand-row">
                    <td colspan="7">
                      <div class="msg-detail">
                        <div class="msg-meta">
                          <div><strong>From:</strong> {{ m.name }} &lt;{{ m.email }}&gt;</div>
                          <div><strong>Subject:</strong> {{ m.subject }}</div>
                          <div><strong>Date:</strong> {{ m.createdAt | date:'medium' }}</div>
                        </div>
                        <div class="msg-body">
                          <p>{{ m.message }}</p>
                        </div>
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
    .manage { max-width: 1200px; }
    .page-head { margin-bottom: 1.5rem; }
    .page-head h2 { margin: 0 0 .25rem; }
    .page-head p { margin: 0; color: var(--text-muted); font-size: var(--fs-sm); }

    .empty-state { padding: 3rem; text-align: center; color: var(--text-dim); }

    .tabs-card { padding: .5rem .5rem 0; margin-bottom: 1rem; }
    .tabs { display: flex; gap: .25rem; flex-wrap: wrap; }
    .tab {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      padding: .6rem 1rem;
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: var(--fs-sm);
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--radius) var(--radius) 0 0;
      border-bottom: 2px solid transparent;
      transition: all var(--transition);
    }
    .tab:hover { color: var(--text); background: var(--bg-hover); }
    .tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
      background: var(--gradient-soft);
    }
    .tab .count {
      background: var(--bg-soft);
      color: var(--text-dim);
      padding: 1px 7px;
      border-radius: 999px;
      font-size: 10px;
    }
    .tab.active .count {
      background: rgba(99,102,241,.2);
      color: var(--accent);
    }

    .table-wrap { padding: 0; overflow-x: auto; }

    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td {
      padding: 10px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      font-size: var(--fs-sm);
      vertical-align: middle;
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
    .table tr.is-new td { background: rgba(99,102,241,.04); }
    .table tr.is-new:hover td { background: rgba(99,102,241,.08); }

    .small { font-size: 11px; }
    .sender-name { font-weight: 600; }

    .expand-btn {
      background: none;
      border: 1px solid var(--border);
      border-radius: 6px;
      width: 28px; height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-muted);
      transition: all var(--transition);
    }
    .expand-btn:hover { color: var(--accent); border-color: var(--accent); }
    .expand-btn span {
      display: inline-block;
      font-size: 10px;
      transition: transform var(--transition);
    }
    .expand-btn span.rotated { transform: rotate(90deg); }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-family: var(--font-mono);
      font-weight: 500;
    }

    .actions { display: flex; gap: .35rem; flex-wrap: wrap; align-items: center; }
    .status-select {
      width: 110px;
      padding: 4px 8px;
      font-size: 11px;
    }

    .expand-row td {
      padding: 0;
      background: var(--bg-soft);
    }
    .msg-detail {
      padding: 1.25rem 1.5rem;
      border-left: 3px solid var(--accent);
    }
    .msg-meta {
      background: var(--bg-alt);
      border-radius: var(--radius);
      padding: .75rem 1rem;
      margin-bottom: 1rem;
      font-size: var(--fs-sm);
      display: grid;
      gap: .25rem;
    }
    .msg-meta > div { color: var(--text-muted); }
    .msg-meta strong { color: var(--text); font-weight: 600; }
    .msg-body {
      background: var(--bg-alt);
      border-radius: var(--radius);
      padding: 1rem;
      font-size: var(--fs-sm);
      line-height: 1.7;
      color: var(--text);
      white-space: pre-wrap;
    }
    .msg-body p { margin: 0; }
  `]
})
export class AdminMessagesComponent implements OnInit {
  TABS: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'read', label: 'Read' },
    { key: 'archived', label: 'Archived' },
  ];
  STATUS_ORDER = STATUS_ORDER;

  items = signal<ContactMessage[]>([]);
  loading = signal(true);
  error = signal('');
  success = signal('');
  filter = signal<StatusFilter>('all');
  expandedId = signal<string | null>(null);

  filtered = computed(() => {
    const f = this.filter();
    const list = this.items();
    return f === 'all' ? list : list.filter(m => m.status === f);
  });

  constructor(private contactService: ContactService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.contactService.getAll().subscribe({
      next: (res) => {
        const data = res.data || [];
        data.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        this.items.set(data);
        this.loading.set(false);
      },
      error: (err) => { this.error.set(err?.error?.message || 'Failed to load messages.'); this.loading.set(false); },
    });
  }

  setFilter(f: StatusFilter) {
    this.filter.set(f);
    this.expandedId.set(null);
  }

  countFor(key: StatusFilter): number {
    if (key === 'all') return this.items().length;
    return this.items().filter(m => m.status === key).length;
  }

  toggleExpand(id: string) {
    this.expandedId.update(cur => cur === id ? null : id);
    const msg = this.items().find(m => m._id === id);
    if (msg && msg.status === 'new') {
      this.changeStatus(msg, 'read');
    }
  }

  changeStatus(m: ContactMessage, status: MsgStatus) {
    if (m.status === status) return;
    const oldStatus = m.status;
    this.items.update(list => list.map(x => x._id === m._id ? { ...x, status } : x));
    this.contactService.updateStatus(m._id!, status).subscribe({
      next: () => this.flash(`Status updated to "${status}".`, 'success'),
      error: (err) => {
        this.items.update(list => list.map(x => x._id === m._id ? { ...x, status: oldStatus } : x));
        this.error.set(err?.error?.message || 'Failed to update status.');
      },
    });
  }

  remove(m: ContactMessage) {
    if (!confirm(`Delete message from "${m.name}"?`)) return;
    this.contactService.remove(m._id!).subscribe({
      next: () => {
        this.items.update(list => list.filter(x => x._id !== m._id));
        if (this.expandedId() === m._id) this.expandedId.set(null);
        this.flash('Message deleted.', 'success');
      },
      error: (err) => this.error.set(err?.error?.message || 'Failed to delete.'),
    });
  }

  statusBadge(s?: string): string {
    return s === 'new' ? 'badge-new' : s === 'read' ? 'badge-success' : 'badge-muted';
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
