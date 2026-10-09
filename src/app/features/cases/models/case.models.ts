export type CaseStatus = 'new' | 'in-review' | 'approved' | 'rejected';
export type CasePriority = 'low' | 'medium' | 'high';

export interface CaseAssignee {
  id: string;
  name: string;
  role: string;
}

export interface CaseRecord {
  id: string;
  title: string;
  requester: string;
  status: CaseStatus;
  priority: CasePriority;
  assigneeId: string | null;
  dueDate: string;
  updatedAt: string;
  summary: string;
}

export interface CaseFilters {
  search: string;
  status: CaseStatus | 'all';
  priority: CasePriority | 'all';
  page: number;
  perPage: number;
}

export interface CaseDraftPayload {
  title: string;
  requester: string;
  priority: CasePriority;
  assigneeId: string | null;
  dueDate: string;
  summary: string;
}

export interface CaseFormErrors {
  title?: string;
  requester?: string;
  dueDate?: string;
  summary?: string;
}

export const defaultCaseFilters: CaseFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  page: 1,
  perPage: 8,
};

export const statusLabels: Record<CaseStatus, string> = {
  new: 'New',
  'in-review': 'In review',
  approved: 'Approved',
  rejected: 'Rejected',
};

export const priorityLabels: Record<CasePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
