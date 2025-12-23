"use client";

import React from "react";
import styles from "@/app/styles/admin/ui/loadingOverlay.module.css";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
    isLoading?: boolean;
    fullScreen?: boolean;
    text?: string;
    blur?: boolean;
    className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    isLoading = true,
    fullScreen = false,
    text,
    blur = true,
    className = "",
}) => {
    if (!isLoading) return null;

    return (
        <div
            className={`
        ${styles.overlay} 
        ${fullScreen ? styles.fullScreen : ""} 
        ${blur ? styles.blur : ""}
        ${className}
      `}
        >
            <Loader2 className={styles.spinner} />
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};

export default LoadingOverlay;
