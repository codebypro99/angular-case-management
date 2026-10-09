import { CaseAssignee, CaseRecord } from '@features/cases/models/case.models';

export const mockAssignees: CaseAssignee[] = [
  { id: 'usr-1', name: 'Maya Chen', role: 'Coordinator' },
  { id: 'usr-2', name: 'Nora Wilson', role: 'Reviewer' },
  { id: 'usr-3', name: 'Leo Martin', role: 'Operations Lead' },
];

export const mockCases: CaseRecord[] = [
  {
    id: 'case-1001',
    title: 'Review intake documentation',
    requester: 'Jordan Smith',
    status: 'new',
    priority: 'high',
    assigneeId: 'usr-1',
    dueDate: '2026-10-15',
    updatedAt: '2026-10-08T09:25:00.000Z',
    summary: 'Validate received files, request missing signatures, and prepare a clean approval packet.',
  },
  {
    id: 'case-1002',
    title: 'Schedule quality follow-up',
    requester: 'Taylor Brooks',
    status: 'in-review',
    priority: 'medium',
    assigneeId: 'usr-2',
    dueDate: '2026-10-18',
    updatedAt: '2026-10-07T16:40:00.000Z',
    summary: 'Coordinate internal review and document the final recommendation.',
  },
  {
    id: 'case-1003',
    title: 'Resolve billing exception',
    requester: 'Alex Rivera',
    status: 'approved',
    priority: 'low',
    assigneeId: 'usr-3',
    dueDate: '2026-10-22',
    updatedAt: '2026-10-06T12:15:00.000Z',
    summary: 'Confirm account notes and close the exception once the audit trail is complete.',
  },
  {
    id: 'case-1004',
    title: 'Prepare onboarding checklist',
    requester: 'Morgan Lee',
    status: 'rejected',
    priority: 'medium',
    assigneeId: null,
    dueDate: '2026-10-12',
    updatedAt: '2026-10-05T10:10:00.000Z',
    summary: 'Returned for additional source details before review can continue.',
  },
];
