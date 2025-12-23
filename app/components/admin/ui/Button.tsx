"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "@/app/styles/admin/ui/button.module.css";
import { Loader2, LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "warning" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    fullWidth?: boolean;
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className = "",
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            startIcon: StartIcon,
            endIcon: EndIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`
            ${styles.button} 
            ${styles[variant]} 
            ${styles[size]} 
            ${fullWidth ? styles.fullWidth : ""}
            ${className}
        `}
                {...props}
            >
                {isLoading && <Loader2 className={styles.spinner} />}
                {!isLoading && StartIcon && <StartIcon size={size === "sm" ? 16 : 20} />}
                {children}
                {!isLoading && EndIcon && <EndIcon size={size === "sm" ? 16 : 20} />}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
