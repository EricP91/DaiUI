export const pageRoutes = {
  main: '/',
  dashboard: '/dashboard',
  evidenceManagement: {
    root: '/evidence-management',
    addItem: '/evidence-management/add-item',
    bulkUpdate: '/evidence-management/bulk-update',
    move: '/evidence-management/move',
    checkout: '/evidence-management/checkout',
    undoCheckout: '/evidence-management/undo-checkout',
  },
  audit: {
    groupPermissions: '/audit/group-permission',
    startNew: '/audit/start-new',
    viewExisting: '/audit/view-existing',
  },
  admin: '/admin',
  reports: '/reports',
  print: '/print',
  receiveSubmission: {
    root: '/receive',
    viewPendingAndReceive: '/receive/view-pending',
    scanEvidence: '/receive/scan',
    reviewAndEdit: '/receive/review-and-edit',
  },
};
