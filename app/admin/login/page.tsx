"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/admin/pages/login.module.css";
import { API_ENDPOINTS, ROUTES } from "@/app/lib/constants";
import { 
  isMaintenanceMode, 
  isAccountLocked, 
  handleFailedLoginAttempt, 
  resetFailedLoginAttempts,
  getRemainingLoginAttempts 
} from "@/app/lib/authUtils";

const port = process.env.NEXT_PUBLIC_APP_URL;

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lockoutInfo, setLockoutInfo] = useState({ locked: false, remainingTime: 0 });
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const router = useRouter();

  // Check system status and authentication
  useEffect(() => {
    // Check maintenance mode
    if (isMaintenanceMode()) {
      setError("System is currently under maintenance. Please try again later.");
      return;
    }

    // Check if account is locked
    const lockStatus = isAccountLocked();
    if (lockStatus.locked) {
      setLockoutInfo({ locked: true, remainingTime: lockStatus.remainingTime || 0 });
      setError(`Account is locked due to multiple failed login attempts. Please try again in ${lockStatus.remainingTime} minutes.`);
      return;
    }

    // Update remaining attempts
    setRemainingAttempts(getRemainingLoginAttempts());

    // Check if already logged in
    const token = localStorage.getItem("adminToken");
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (token && isLoggedIn === "true") {
      router.push(ROUTES.ADMIN_ROUTES.dashboard);
    }
  }, [router]);

  // Countdown timer for account lockout
  useEffect(() => {
    if (lockoutInfo.locked && lockoutInfo.remainingTime > 0) {
      const timer = setInterval(() => {
        setLockoutInfo(prev => {
          const newTime = prev.remainingTime - 1;
          if (newTime <= 0) {
            setError("");
            setLockoutInfo({ locked: false, remainingTime: 0 });
            setRemainingAttempts(getRemainingLoginAttempts());
            return { locked: false, remainingTime: 0 };
          }
          setError(`Account is locked. Please try again in ${newTime} minutes.`);
          return { ...prev, remainingTime: newTime };
        });
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [lockoutInfo.locked, lockoutInfo.remainingTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Check maintenance mode before submission
    if (isMaintenanceMode()) {
      setError("System is currently under maintenance. Please try again later.");
      setIsLoading(false);
      return;
    }

    // Check if account is locked
    const lockStatus = isAccountLocked();
    if (lockStatus.locked) {
      setError(`Account is locked. Please try again in ${lockStatus.remainingTime} minutes.`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${port}/${API_ENDPOINTS.adminLogin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: "Admin"
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 200) {
        // Reset failed login attempts on successful login
        resetFailedLoginAttempts();
        
        // Store authentication data
        localStorage.setItem("adminToken", data.data.token);
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            ...data.data.loginDetails,
            loginTime: new Date().toISOString(),
          })
        );

        // Redirect to dashboard
        router.push(ROUTES.ADMIN_ROUTES.dashboard);
      } else {
        // Handle failed login attempt
        const attemptResult = handleFailedLoginAttempt();
        
        if (attemptResult.isLocked) {
          setLockoutInfo({ locked: true, remainingTime: 15 });
          setError("Account has been locked due to multiple failed login attempts. Please try again in 15 minutes.");
        } else {
          setRemainingAttempts(attemptResult.remainingAttempts);
          setError(
            `${data.message || "Invalid email or password"}. ${
              attemptResult.remainingAttempts > 0 
                ? `${attemptResult.remainingAttempts} attempts remaining.`
                : ""
            }`
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Show maintenance message if system is in maintenance mode
  if (isMaintenanceMode()) {
    return (
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <h1 className={styles.logoText}>Gadiyo</h1>
              <p className={styles.logoSubtext}>Admin Portal</p>
            </div>
          </div>
          <div className={styles.maintenanceMessage}>
            <h2>System Under Maintenance</h2>
            <p>The admin portal is currently under maintenance. Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <h1 className={styles.logoText}>Gadiyo</h1>
            <p className={styles.logoSubtext}>Admin Portal</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email"
              required
              disabled={lockoutInfo.locked}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.passwordInput}
                placeholder="Enter your password"
                required
                disabled={lockoutInfo.locked}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggle}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={lockoutInfo.locked}
              >
                {showPassword ? (
                  <svg
                    className={styles.toggleIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className={styles.toggleIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Show remaining attempts if not locked */}
          {!lockoutInfo.locked && remainingAttempts < 5 && (
            <div className={styles.attemptWarning}>
              <svg
                className={styles.warningIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Warning: {remainingAttempts} login attempts remaining
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <svg
                className={styles.errorIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || lockoutInfo.locked}
            className={`${styles.submitButton} ${
              isLoading ? styles.loading : ""
            } ${lockoutInfo.locked ? styles.disabled : ""}`}
          >
            {isLoading ? (
              <>
                <svg className={styles.spinner} viewBox="0 0 24 24">
                  <circle
                    className={styles.spinnerCircle}
                    cx="12"
                    cy="12"
                    r="10"
                  />
                </svg>
                Signing in...
              </>
            ) : lockoutInfo.locked ? (
              `Locked (${lockoutInfo.remainingTime}m remaining)`
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Demo Credentials:
            <br />
            Email: nofal+admin@techuz.com
            <br />
            Password: [Contact admin for password]
          </p>
        </div>
      </div>
    </div>
  );
}