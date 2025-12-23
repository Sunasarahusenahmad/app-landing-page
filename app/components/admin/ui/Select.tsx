"use client";

import React, { SelectHTMLAttributes } from "react";
import styles from "@/app/styles/admin/ui/select.module.css";
import { ChevronDown } from "lucide-react";

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: Option[];
    placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = "", label, error, options, placeholder, required, value, ...props }, ref) => {
        const isPlaceholderSelected = value === "" || value === undefined;

        return (
            <div className={`${styles.container} ${className}`}>
                {label && (
                    <label className={styles.label}>
                        {label}
                        {required && <span className={styles.required}>*</span>}
                    </label>
                )}

                <div className={styles.selectWrapper}>
                    <select
                        ref={ref}
                        className={`
              ${styles.select} 
              ${error ? styles.selectError : ""}
              ${isPlaceholderSelected ? styles.placeholder : ""}
            `}
                        value={value}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className={styles.chevron} />
                </div>

                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
