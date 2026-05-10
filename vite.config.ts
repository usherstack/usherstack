import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      host: true,
      port: Number(process.env.PORT) || 5173,
      open: isDev,
      cors: true,
    },

    build: {
      outDir: "dist",
      sourcemap: isDev,
      minify: "terser",
      target: "es2020",
      cssCodeSplit: true,
      emptyOutDir: true,
       chunkSizeWarningLimit: 1000,

      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: true,
          passes: 2,
        },
        format: {
          comments: false,
        },
        mangle: {
          toplevel: true,
        },
      },

      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-ui": [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-tooltip",
              "class-variance-authority",
              "tailwind-merge",
            ],
            "vendor-animation": ["framer-motion"],
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            const extType = name?.split(".").pop();
            if (/css/i.test(extType || "")) return "assets/css/[name]-[hash][extname]";
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || ""))
              return "assets/images/[name]-[hash][extname]";
            return "assets/[ext]/[name]-[hash][extname]";
          },
        },
      },
    },

    preview: {
      host: true,
      port: Number(process.env.PORT) || 4173,
    },
  };
});