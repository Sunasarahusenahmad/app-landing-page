// /app/lib/authUtils.ts

export interface SystemSettings {
  maintenanceMode: boolean;
  autoLogout: number;
  sessionTimeout: number;
  maxLoginAttempts: number;
}

export const getSystemSettings = (): SystemSettings => {
  if (typeof window === 'undefined') {
    return {
      maintenanceMode: false,
      autoLogout: 30,
      sessionTimeout: 60,
      maxLoginAttempts: 5,
    };
  }

  const savedSettings = localStorage.getItem("adminSystemSettings");
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (error) {
      console.error('Error parsing system settings:', error);
    }
  }
  
  return {
    maintenanceMode: false,
    autoLogout: 30,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
  };
};

export const isMaintenanceMode = (): boolean => {
  const settings = getSystemSettings();
  return settings.maintenanceMode;
};

export const handleFailedLoginAttempt = (): { isLocked: boolean; remainingAttempts: number; lockoutTime?: string } => {
  const settings = getSystemSettings();
  const attempts = parseInt(localStorage.getItem("failedLoginAttempts") || "0");
  const newAttempts = attempts + 1;
  
  localStorage.setItem("failedLoginAttempts", newAttempts.toString());
  localStorage.setItem("lastFailedAttempt", new Date().toISOString());
  
  if (newAttempts >= settings.maxLoginAttempts) {
    const lockoutTime = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes lockout
    localStorage.setItem("accountLockedUntil", lockoutTime);
    
    return {
      isLocked: true,
      remainingAttempts: 0,
      lockoutTime: lockoutTime
    };
  }
  
  return {
    isLocked: false,
    remainingAttempts: settings.maxLoginAttempts - newAttempts
  };
};

export const resetFailedLoginAttempts = (): void => {
  localStorage.removeItem("failedLoginAttempts");
  localStorage.removeItem("lastFailedAttempt");
  localStorage.removeItem("accountLockedUntil");
};

export const isAccountLocked = (): { locked: boolean; remainingTime?: number } => {
  const lockoutTime = localStorage.getItem("accountLockedUntil");
  if (lockoutTime) {
    const lockoutTimestamp = new Date(lockoutTime).getTime();
    const currentTime = new Date().getTime();
    
    if (currentTime < lockoutTimestamp) {
      const remainingTime = Math.ceil((lockoutTimestamp - currentTime) / (1000 * 60)); // in minutes
      return { locked: true, remainingTime };
    } else {
      // Lockout period expired, clear the lockout
      resetFailedLoginAttempts();
      return { locked: false };
    }
  }
  return { locked: false };
};

export const getFailedLoginAttempts = (): number => {
  return parseInt(localStorage.getItem("failedLoginAttempts") || "0");
};

export const getRemainingLoginAttempts = (): number => {
  const settings = getSystemSettings();
  const attempts = getFailedLoginAttempts();
  return Math.max(0, settings.maxLoginAttempts - attempts);
};