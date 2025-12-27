"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type TabType = 'history' | 'dashboard' | 'files' | 'goals' | 'starred';

interface SidebarContextType {
    isOpen: boolean;
    toggle: () => void;
    setOpen: (value: boolean) => void;
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggle = () => setIsOpen((prev) => !prev);
    const setOpen = (value: boolean) => setIsOpen(value);

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const setMobileMenuOpen = (value: boolean) => setIsMobileMenuOpen(value);

    return (
        <SidebarContext.Provider value={{
            isOpen,
            toggle,
            setOpen,
            activeTab,
            setActiveTab,
            isMobileMenuOpen,
            toggleMobileMenu,
            setMobileMenuOpen
        }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
