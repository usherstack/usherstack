import React from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function PermissionRequired() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
              🔒 Access Required
            </h1>

            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              You need permission to view these projects.
              <br />
              This section is private and accessible only to authorized users.
            </p>

            <div className="mb-8">
              <p className="text-muted-foreground">
                Contact me to request access:
              </p>

              <p className="text-lg font-semibold mt-2">
                📧 info.usherstack@gmail.com
              </p>
              <p className="text-lg font-semibold">
                📱 +91 98765 43210 (Update with your number)
              </p>
            </div>

            <Link href="/">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </motion.a>
            </Link>

            <a
              href="mailto:info.usherstack@gmail.com?subject=Access Request"
              className="text-primary underline"
            >
              Request Access →
            </a>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
