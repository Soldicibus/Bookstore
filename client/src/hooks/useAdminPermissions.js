import { getCurrentUser } from "../utils/auth";

export function useAdminPermissions() {
  const user = getCurrentUser();
  const role = user?.role_name || user?.role;
  const isSAdmin = role === 'sadmin';
  const isAdmin = role === 'admin';

  // Default: SAdmin can do everything.
  // Admin has restrictions on user, student, teacher and parent management.
  
  const permissions = {
    users: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
      resetPassword: isSAdmin || isAdmin,
    },
    teachers: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
    },
    parents: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
    },
    students: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
    },
    auditLogs: {
      view: isSAdmin,
      delete: isSAdmin,
      edit: false,
      create: false,
    },
    others: {
      create: isSAdmin || isAdmin,
      edit: isSAdmin || isAdmin,
      delete: isSAdmin || isAdmin,
    }
  };

  return { isSAdmin, isAdmin, permissions };
}
