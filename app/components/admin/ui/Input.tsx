"use client";

import React, { InputHTMLAttributes } from "react";
import styles from "@/app/styles/admin/ui/input.module.css";
import { LucideIcon } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, icon: Icon, required, disabled, ...props }, ref) => {
        return (
            <div className={`${styles.container} ${className}`}>
                {label && (
                    <label className={styles.label}>
                        {label}
                        {required && <span className={styles.required}>*</span>}
                    </label>
                )}

                <div className={styles.inputWrapper}>
                    <input
                        ref={ref}
                        className={`
              ${styles.input} 
              ${error ? styles.inputError : ""} 
              ${Icon ? styles.hasIcon : ""}
            `}
                        disabled={disabled}
                        {...props}
                    />
                    {Icon && (
                        <div className={styles.iconWrapper}>
                            <Icon size={20} />
                        </div>
                    )}
                </div>

                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
