"use client";

import React, { useRef } from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { ServiceCard } from "@/components/features/ServiceCard";
import { services } from "@/data/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BouncingBalls } from "@/components/animations/BouncingBalls";

const COLORS = ["#7c3aed", "#3b82f6", "#f59e0b", "#f97316", "#22c55e"];
const GLOW_COLORS = [
  "rgba(124, 58, 237, 0.15)",
  "rgba(59, 130, 246, 0.15)",
  "rgba(245, 158, 11, 0.12)",
  "rgba(249, 115, 22, 0.12)",
  "rgba(34, 197, 94, 0.12)",
];

export default function Services() {
  const processSteps = [
    {
      title: "Discovery",
      desc: "Deep technical analysis and requirement mapping.",
    },
    {
      title: "Architecture",
      desc: "System design, technology selection, and prototyping.",
    },
    {
      title: "Engineering",
      desc: "Agile development with rigorous quality control.",
    },
    { title: "Deployment", desc: "Seamless launch with CI/CD pipelines." },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <PageTransition>
      {/* Hero Section with Bouncing Balls Background */}
      <div className="pt-32 pb-20 relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Bouncing Balls Background */}
        <BouncingBalls />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-transparent" />

        {/* Content */}
        <motion.div
          ref={containerRef}
          style={{ y, opacity }}
          className="container mx-auto px-4 md:px-8 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
              Our Expertise.
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive technical and creative services designed to elevate
              your digital presence and optimize your operations.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Services Grid Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <BouncingBalls />
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.06] blur-[160px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.06] blur-[160px]" />
          <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-yellow-500/[0.04] blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge solutions powered by innovation and technical
              excellence.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Engineering Process Section */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-br from-purple-500/[0.03] via-blue-500/[0.03] to-transparent rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              Our Engineering Process
            </h2>
            <p className="text-lg text-muted-foreground">
              A methodical approach to delivering flawless digital products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {/* Number badge */}
                <div className="text-5xl font-bold text-primary/10 absolute -top-4 -left-4 z-[-1] transition-all duration-300 group-hover:text-primary/20">
                  0{i + 1}
                </div>

                {/* Card with 3D glass effect */}
                <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  {/* 3D tilt effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full blur-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground relative z-10">
                    {step.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute -bottom-px left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-border/50 to-transparent -translate-x-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background text-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-accent/[0.02] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-br from-purple-500/[0.06] to-blue-500/[0.06] blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary/80">
              Need a custom solution?
            </h2>
            <Link href="/contact">
              <Button
                size="lg"
                className="rounded-full px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact our architects
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
