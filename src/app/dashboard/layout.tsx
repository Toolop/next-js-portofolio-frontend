"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  History,
  Database,
  Archive,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  FolderKanban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/services/auth";

const navItems = [
  { name: "DASHBOARD", href: "/dashboard", icon: LayoutDashboard },
  { name: "PROJECT", href: "/dashboard/project", icon: FolderKanban },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative font-body">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop (Persistent) & Mobile (Slide-in) */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 260 : 80,
          x:
            typeof window !== "undefined" && window.innerWidth < 768
              ? isMobileMenuOpen
                ? 0
                : -280
              : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`bg-surface border-r border-white/5 h-full fixed md:relative z-50 flex flex-col ${
          !isSidebarOpen ? "md:w-20" : "md:w-[280px]"
        }`}
      >
        {/* Sidebar Collapse Toggle (Floating Middle) - Desktop only */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full items-center justify-center text-black shadow-lg z-50 hover:scale-110 transition-transform"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center font-black text-black">
              EP
            </div>
            {(isSidebarOpen ||
              (typeof window !== "undefined" && window.innerWidth < 768)) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display font-black tracking-tighter"
              >
                <div className="text-primary text-sm leading-none">
                  EL PORTO
                </div>
                <div className="text-[10px] text-neutral-500 leading-none mt-1">
                  V1.0.0
                </div>
              </motion.div>
            )}
          </Link>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-neutral-500 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 p-3 rounded-sm transition-all group relative ${
                  isActive
                    ? "bg-surface-container-high text-primary"
                    : "text-neutral-500 hover:text-white hover:bg-surface-container-low"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary transition-colors"}`}
                />
                {(isSidebarOpen ||
                  (typeof window !== "undefined" &&
                    window.innerWidth < 768)) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] font-black tracking-widest whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-2/3 bg-primary rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer - Informational only */}
        <div className="p-6 border-t border-white/5 opacity-50">
          {(isSidebarOpen ||
            (typeof window !== "undefined" && window.innerWidth < 768)) && (
            <div className="text-[8px] font-bold text-neutral-600 tracking-[0.3em] uppercase">
              ENGINE_STATUS: OPTIMAL
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0e14]">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-surface/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Hamburger for Mobile */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-neutral-400 hover:text-primary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-primary text-[10px] md:text-xs font-black tracking-widest uppercase truncate max-w-[150px] md:max-w-none">
              {navItems.find((n) => n.href === pathname)?.name || "DASHBOARD"}
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar - Hidden on Mobile */}
            <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within/input:text-primary transition-colors" />
              <input
                type="text"
                placeholder="QUERY_SYSTEM..."
                className="bg-black/40 border-b-2 border-transparent focus:border-primary focus:outline-none transition-all py-2 pl-10 pr-4 text-[10px] font-bold text-neutral-300 min-w-[200px]"
              />
            </div>

            <div className="flex items-center gap-3 md:gap-4 relative">
              <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              </button>

              {/* User Profile with Logout click */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-surface-container-high border border-white/10 flex items-center justify-center text-primary group cursor-pointer overflow-hidden transition-all hover:border-primary/50"
                >
                  <User className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-surface-container-high border border-white/10 rounded-sm shadow-2xl p-2 z-50 backdrop-blur-md"
                    >
                      <div className="px-4 py-2 border-b border-white/5 mb-2">
                        <div className="text-[10px] font-black text-white truncate uppercase">
                          ADMIN_USER
                        </div>
                        <div className="text-[8px] text-neutral-500 font-bold uppercase">
                          System Operator
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left text-[10px] font-black text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-sm"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        LOGOUT_SYSTEM
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar scroll-smooth">
          {children}
        </div>
      </main>

      {/* Global Click Handler to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </div>
  );
}
