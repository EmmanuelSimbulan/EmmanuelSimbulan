"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  const navItems = [
    { label: "About", href: "#about", icon: "👤" },
    { label: "Journey", href: "#journey", icon: "🛤️" },
    { label: "Experience", href: "#experience", icon: "💼" },
    { label: "Skills", href: "#skills", icon: "🎯" },
    { label: "Projects", href: "#projects", icon: "🚀" },
    { label: "Blog", href: "#blog", icon: "✍️" },
    { label: "Contact", href: "#contact", icon: "📬" },
  ];

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    setQuery("");
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 glass-strong rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        aria-label="Open command palette"
      >
        <Command className="w-4 h-4 text-text-secondary group-hover:text-apple-blue transition-colors" />
        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors hidden sm:inline">
          Command
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary bg-surface-secondary rounded">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/20 dark:bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-[20%] left-1/2 z-[80] w-full max-w-lg -translate-x-1/2 mx-4"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="w-5 h-5 text-text-tertiary" />
                  <input
                    type="text"
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-tertiary"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-surface-secondary transition-colors"
                  >
                    <X className="w-4 h-4 text-text-tertiary" />
                  </button>
                </div>
                <div className="py-2 max-h-80 overflow-y-auto">
                  {filteredItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigate(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition-colors text-left group"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-text-primary group-hover:text-apple-blue transition-colors">
                        {item.label}
                      </span>
                      <span className="ml-auto text-xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                        ↵
                      </span>
                    </button>
                  ))}
                  {filteredItems.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                      No results found
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-text-tertiary">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
