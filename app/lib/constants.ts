export const ROUTES = {
  ADMIN_ROUTES: {
    base: '/admin',
    dashboard: '/admin',
    contacts: '/admin/contacts',
    blogs: '/admin/blogs',
    settings: '/admin/settings',
  },
  CLIENT_ROUTES: {
    userlanding: '/',
    adminlogin: "/admin/login"
  },
} as const;

export const API_ENDPOINTS = {
  sendContact: "common/user-contact",
  getAllContacts: "admin/contact",
  adminLogin: 'admin/auth/login',
  contactList: 'admin/contact',
  updateContactStatus: 'admin/contact/change-status',
  viewContactDetails: 'admin/contact',
  deleteContact: 'admin/contact'
}