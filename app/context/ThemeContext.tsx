"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeMode>("light");
    const [primaryColor, setPrimaryColor] = useState<string>("#fab12f"); // Default Primary

    // Initialize from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as ThemeMode;
        const savedColor = localStorage.getItem("primaryColor");

        if (savedTheme) setTheme(savedTheme);
        if (savedColor) setPrimaryColor(savedColor);
    }, []);

    // Filter valid hex color
    const isValidHex = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

    // Apply Theme
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "auto") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Apply Primary Color
    useEffect(() => {
        if (!isValidHex(primaryColor)) return;

        const root = window.document.documentElement;

        // Set CSS Variable
        root.style.setProperty("--primary-color", primaryColor);

        // Convert Hex to RGB for tailwind opacity support if needed
        // Assuming hex is #RRGGBB
        let r = 0, g = 0, b = 0;
        if (primaryColor.length === 4) {
            r = parseInt(primaryColor[1] + primaryColor[1], 16);
            g = parseInt(primaryColor[2] + primaryColor[2], 16);
            b = parseInt(primaryColor[3] + primaryColor[3], 16);
        } else if (primaryColor.length === 7) {
            r = parseInt(primaryColor.slice(1, 3), 16);
            g = parseInt(primaryColor.slice(3, 5), 16);
            b = parseInt(primaryColor.slice(5, 7), 16);
        }
        root.style.setProperty("--primary-rgb", `${r}, ${g}, ${b}`); // Note: Tailwind 3 expects space separated? Or comma? 
        // Usually Tailwind color / opacity uses: rgb(var(--color) / <alpha-value>) if defined as R G B
        // But here user global css uses: color: rgb(250 177 47 / var(--tw-text-opacity)); -> Space separated
        // So let's try space separated for compatibility with modern CSS color functions.
        // However, existing globals.css might create conflict if I don't match exactly.
        // The existing text-primary class: color: rgb(250 177 47 / var(--tw-text-opacity));
        // So I should set --primary-rgb to "250 177 47"

        // Let's verify existing globals usage in next step, but for now safe bet is space separated.
        // Actually, let's keep it safe.

        root.style.setProperty("--primary-rgb", `${r} ${g} ${b}`);

        // Calculate and set Hover Color (Darken by ~10-15%)
        const darkenAmount = 20;
        const hR = Math.max(0, r - darkenAmount);
        const hG = Math.max(0, g - darkenAmount);
        const hB = Math.max(0, b - darkenAmount);

        const hoverColor = `#${((1 << 24) + (hR << 16) + (hG << 8) + hB).toString(16).slice(1)}`;
        root.style.setProperty("--primary-hover", hoverColor);

        // Also update Swiper theme color for consistency
        root.style.setProperty("--swiper-theme-color", primaryColor);

        localStorage.setItem("primaryColor", primaryColor);
    }, [primaryColor]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, primaryColor, setPrimaryColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
