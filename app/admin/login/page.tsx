"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/admin/pages/login.module.css";
import { ROUTES } from "@/app/lib/constants";
import { api } from "@/app/lib/api/api";
import {
  isMaintenanceMode,
  isAccountLocked,
  handleFailedLoginAttempt,
  resetFailedLoginAttempts,
  getRemainingLoginAttempts
} from "@/app/lib/authUtils";

// Components
import Input from "@/app/components/admin/ui/Input";
import Button from "@/app/components/admin/ui/Button";
import { Mail, Lock, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface LoginResponse {
  data: {
    token: string;
    loginDetails: any;
  };
  message: string;
  status: number;
}

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      // Create FormData properly for x-www-form-urlencoded
      const payload = new URLSearchParams();
      payload.append('email', formData.email);
      payload.append('password', formData.password);
      payload.append('role', 'Admin');

      const data = await api.post<LoginResponse>('admin/auth/login', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (data.status === 200 && data.data?.token) {
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

        toast.success("Login Successful!");
        // Redirect to dashboard
        router.push(ROUTES.ADMIN_ROUTES.dashboard);
      } else {
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle failed login attempt
      const attemptResult = handleFailedLoginAttempt();

      let errorMessage = error.message || "Network error. Please try again.";

      if (attemptResult.isLocked) {
        setLockoutInfo({ locked: true, remainingTime: 15 });
        errorMessage = "Account has been locked due to multiple failed login attempts. Please try again in 15 minutes.";
      } else {
        setRemainingAttempts(attemptResult.remainingAttempts);
        if (attemptResult.remainingAttempts > 0) {
          errorMessage += ` ${attemptResult.remainingAttempts} attempts remaining.`;
        }
      }

      setError(errorMessage);
      toast.error(errorMessage);
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
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={lockoutInfo.locked || isLoading}
            icon={Mail}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={lockoutInfo.locked || isLoading}
            icon={Lock}
          />

          {/* Show remaining attempts if not locked */}
          {!lockoutInfo.locked && remainingAttempts < 5 && (
            <div className={styles.attemptWarning}>
              <AlertTriangle className={styles.warningIcon} size={16} />
              Warning: {remainingAttempts} login attempts remaining
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <AlertTriangle className={styles.errorIcon} size={16} />
              {error}
            </div>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={lockoutInfo.locked}
            fullWidth
            size="lg"
          >
            {lockoutInfo.locked ? `Locked (${lockoutInfo.remainingTime}m remaining)` : "Sign In"}
          </Button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Demo Credentials:
            <br />
            Email: nofal+admin@techuz.com
            <br />
            Password: Admin@123
          </p>
        </div>
      </div>
    </div>
  );
}