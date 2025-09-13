'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/styles/admin/pages/settings.module.css";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  is_email_verified: number;
  is_phone_verified: number;
  status: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  systemAlerts: boolean;
}

interface SystemSettings {
  maintenanceMode: boolean;
  autoLogout: number;
  sessionTimeout: number;
  maxLoginAttempts: number;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordExpiry: number;
  allowMultipleSessions: boolean;
  ipWhitelist: string[];
}

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    id: 11,
    first_name: "Admin",
    last_name: "User",
    email: "nofal+admin@techuz.com",
    phone_number: "1234567890",
    role: "Admin",
    is_email_verified: 1,
    is_phone_verified: 1,
    status: 1,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    systemAlerts: true,
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenanceMode: false,
    autoLogout: 30,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    passwordExpiry: 90,
    allowMultipleSessions: false,
    ipWhitelist: [],
  });

  const [newIpAddress, setNewIpAddress] = useState<string>('');
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'system', label: 'System', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${section} settings...`);
      alert(`${section} settings saved successfully!`);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserDataChange = (field: keyof UserData, value: string | number) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSystemChange = (field: keyof SystemSettings, value: boolean | number) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field: keyof SecuritySettings, value: boolean | number) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addIpAddress = () => {
    if (newIpAddress && !securitySettings.ipWhitelist.includes(newIpAddress)) {
      setSecuritySettings(prev => ({
        ...prev,
        ipWhitelist: [...prev.ipWhitelist, newIpAddress]
      }));
      setNewIpAddress('');
    }
  };

  const removeIpAddress = (ip: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter(address => address !== ip)
    }));
  };

  const renderProfileTab = () => (
    <div className={styles.tabContent}>
      <h2 className={styles.sectionTitle}>Profile Information</h2>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            className={styles.input}
            value={userData.first_name}
            onChange={(e) => handleUserDataChange('first_name', e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            className={styles.input}
            value={userData.last_name}
            onChange={(e) => handleUserDataChange('last_name', e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            className={styles.input}
            value={userData.email}
            onChange={(e) => handleUserDataChange('email', e.target.value)}
          />
          <span className={styles.verificationBadge}>
            {userData.is_email_verified ? '✅ Verified' : '❌ Not Verified'}
          </span>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            className={styles.input}
            value={userData.phone_number}
            onChange={(e) => handleUserDataChange('phone_number', e.target.value)}
          />
          <span className={styles.verificationBadge}>
            {userData.is_phone_verified ? '✅ Verified' : '❌ Not Verified'}
          </span>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Role</label>
          <input
            type="text"
            className={styles.input}
            value={userData.role}
            disabled
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Account Status</label>
          <select
            className={styles.select}
            value={userData.status}
            onChange={(e) => handleUserDataChange('status', parseInt(e.target.value))}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
      </div>

      <h3 className={styles.subsectionTitle}>Change Password</h3>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Current Password</label>
          <input
            type="password"
            className={styles.input}
            value={passwords.currentPassword}
            onChange={(e) => setPasswords(prev => ({...prev, currentPassword: e.target.value}))}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>New Password</label>
          <input
            type="password"
            className={styles.input}
            value={passwords.newPassword}
            onChange={(e) => setPasswords(prev => ({...prev, newPassword: e.target.value}))}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Confirm New Password</label>
          <input
            type="password"
            className={styles.input}
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords(prev => ({...prev, confirmPassword: e.target.value}))}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={() => handleSave('profile')}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className={styles.tabContent}>
      <h2 className={styles.sectionTitle}>Notification Preferences</h2>
      <div className={styles.toggleGroup}>
        <div className={styles.toggleItem}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={notificationSettings.emailNotifications}
              onChange={() => handleNotificationChange('emailNotifications')}
              className={styles.checkbox}
            />
            <span className={styles.toggleText}>Email Notifications</span>
          </label>
          <p className={styles.toggleDescription}>Receive notifications via email</p>
        </div>
        <div className={styles.toggleItem}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={notificationSettings.smsNotifications}
              onChange={() => handleNotificationChange('smsNotifications')}
              className={styles.checkbox}
            />
            <span className={styles.toggleText}>SMS Notifications</span>
          </label>
          <p className={styles.toggleDescription}>Receive notifications via SMS</p>
        </div>
        <div className={styles.toggleItem}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={notificationSettings.pushNotifications}
              onChange={() => handleNotificationChange('pushNotifications')}
              className={styles.checkbox}
            />
            <span className={styles.toggleText}>Push Notifications</span>
          </label>
          <p className={styles.toggleDescription}>Receive browser push notifications</p>
        </div>
        <div className={styles.toggleItem}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={notificationSettings.systemAlerts}
              onChange={() => handleNotificationChange('systemAlerts')}
              className={styles.checkbox}
            />
            <span className={styles.toggleText}>System Alerts</span>
          </label>
          <p className={styles.toggleDescription}>Receive critical system alerts</p>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={() => handleSave('notifications')}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Notifications'}
        </button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className={styles.tabContent}>
      <h2 className={styles.sectionTitle}>Security Settings</h2>
      <div className={styles.toggleGroup}>
        <div className={styles.toggleItem}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={securitySettings.twoFactorAuth}
              onChange={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
              className={styles.checkbox}
            />
            <span className={styles.toggleText}>Two-Factor Authentication</span>
          </label>
          <p className={styles.toggleDescription}>Add an extra layer of security</p>
        </div>
        <div className={styles.toggleItem}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={securitySettings.allowMultipleSessions}
              onChange={() => handleSecurityChange('allowMultipleSessions', !securitySettings.allowMultipleSessions)}
              className={styles.checkbox}
            />
            <span className={styles.toggleText}>Allow Multiple Sessions</span>
          </label>
          <p className={styles.toggleDescription}>Allow login from multiple devices</p>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password Expiry (days)</label>
          <input
            type="number"
            className={styles.input}
            value={securitySettings.passwordExpiry}
            onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
            min="1"
            max="365"
          />
        </div>
      </div>

      <h3 className={styles.subsectionTitle}>IP Whitelist</h3>
      <div className={styles.ipWhitelist}>
        <div className={styles.addIpGroup}>
          <input
            type="text"
            placeholder="Enter IP address (e.g., 192.168.1.1)"
            className={styles.input}
            value={newIpAddress}
            onChange={(e) => setNewIpAddress(e.target.value)}
          />
          <button 
            className={styles.secondaryButton}
            onClick={addIpAddress}
            type="button"
          >
            Add IP
          </button>
        </div>
        <div className={styles.ipList}>
          {securitySettings.ipWhitelist.map((ip, index) => (
            <div key={index} className={styles.ipItem}>
              <span>{ip}</span>
              <button 
                className={styles.removeButton}
                onClick={() => removeIpAddress(ip)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={() => handleSave('security')}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Security'}
        </button>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className={styles.tabContent}>
      <h2 className={styles.sectionTitle}>System Settings</h2>
      <div className={styles.toggleGroup}>
        <div className={styles.toggleItem}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={systemSettings.maintenanceMode}
              onChange={() => handleSystemChange('maintenanceMode', !systemSettings.maintenanceMode)}
              className={styles.checkbox}
            />
            <span className={styles.toggleText}>Maintenance Mode</span>
          </label>
          <p className={styles.toggleDescription}>Put the system in maintenance mode</p>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Auto Logout (minutes)</label>
          <input
            type="number"
            className={styles.input}
            value={systemSettings.autoLogout}
            onChange={(e) => handleSystemChange('autoLogout', parseInt(e.target.value))}
            min="5"
            max="120"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Session Timeout (minutes)</label>
          <input
            type="number"
            className={styles.input}
            value={systemSettings.sessionTimeout}
            onChange={(e) => handleSystemChange('sessionTimeout', parseInt(e.target.value))}
            min="15"
            max="480"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Max Login Attempts</label>
          <input
            type="number"
            className={styles.input}
            value={systemSettings.maxLoginAttempts}
            onChange={(e) => handleSystemChange('maxLoginAttempts', parseInt(e.target.value))}
            min="3"
            max="10"
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={() => handleSave('system')}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save System'}
        </button>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className={styles.tabContent}>
      <h2 className={styles.sectionTitle}>Appearance Settings</h2>
      <div className={styles.appearanceOptions}>
        <div className={styles.themeOption}>
          <h3>Theme</h3>
          <div className={styles.themeButtons}>
            <button className={`${styles.themeButton} ${styles.active}`}>Light</button>
            <button className={styles.themeButton}>Dark</button>
            <button className={styles.themeButton}>Auto</button>
          </div>
        </div>
        <div className={styles.colorOption}>
          <h3>Primary Color</h3>
          <div className={styles.colorPreview}>
            <div 
              className={styles.colorSwatch} 
              style={{ backgroundColor: '#fab12f' }}
            ></div>
            <span>#fab12f</span>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={() => handleSave('appearance')}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Appearance'}
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'system':
        return renderSystemTab();
      case 'appearance':
        return renderAppearanceTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your account and system preferences</p>
      </div>

      <div className={styles.settingsLayout}>
        <div className={styles.settingsSidebar}>
          <nav className={styles.settingsNav}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.navIcon}>{tab.icon}</span>
                <span className={styles.navLabel}>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.settingsMain}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;