import React from "react";
import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function FilterBar({
  categories,
  activeCategory,
  onSelect,
}: FilterBarProps) {
  return (
    <div className="space-y-6">
      {/* Main Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-wrap gap-2 md:gap-4 mb-8 justify-center"
      >
        {categories.map((category, idx) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
            onClick={() => {
              onSelect(category);
            }}
            className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
              activeCategory === category
                ? "text-primary-foreground"
                : "text-foreground hover:text-primary"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="flex items-center gap-2">
              <span>{category}</span>
              {activeCategory === category && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary-foreground/20"
                >
                  ✓
                </motion.span>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
