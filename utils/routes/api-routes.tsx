export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiRoutes = {
  auth: {
    getUserInfo: `${apiBaseUrl}/user`,
  },
  dashboard: {
    overview: `${apiBaseUrl}/dashboard-overview`,
    assignments: `${apiBaseUrl}/load-dashboard-assignments-table`,
    items: `${apiBaseUrl}/load-dashboard-items-table`,
    sectionItems: `${apiBaseUrl}/section-items`,
    customFields: `${apiBaseUrl}/get-custom-fields`,
    report: `${apiBaseUrl}/reports`,
  },
  receive: {
    root: `${apiBaseUrl}/receive`,
    pending: `${apiBaseUrl}/receive/pending`,
    receiptEmails: `${apiBaseUrl}/receive/receipt-emails`,
  },
};
