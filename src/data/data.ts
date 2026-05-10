import {
  Code,
  Smartphone,
  Palette,
  BrainCircuit,
  Megaphone,
  Server,
  Shield,
  Globe,
} from "lucide-react";
import React from "react";
import PermissionRequired from "@/pages/Request";

// Production Config - Update these for deployment
export const config = {
  // Placeholder URL for demo projects - replace with actual domain in production
  demoUrl: "/Request",
  // Calendly URL for booking - replace with your actual Calendly link
  calendlyUrl:
    "https://calendly.com/renutkarshbhargav?hide_landing_page_details=1&hide_gdpr_banner=1",
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "High-performance, scalable web applications built with modern frameworks and edge computing.",
    icon: Code,
  },
  {
    id: "app-development",
    title: "App Development",
    description:
      "Native-feeling mobile experiences that run flawlessly across iOS and Android platforms.",
    icon: Smartphone,
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Sleek, futuristic brand identities and interfaces that communicate technical superiority.",
    icon: Palette,
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Infusing your products with cutting-edge machine learning and generative AI capabilities.",
    icon: BrainCircuit,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Data-driven growth strategies to amplify your reach and dominate your target market.",
    icon: Megaphone,
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description:
      "Resilient, distributed server architectures designed for maximum uptime and security.",
    icon: Server,
  },
];

export type Project = {
  id: string;
  title: string;
  category: "Web" | "App" | "Design" | "AI" | "Marketing";
  image: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "nexus-finance",
    title: "Nexus Finance",
    category: "Web",
    image: "/images/project.webp",
    description:
      "A decentralized finance dashboard with real-time trading metrics.",
    problem:
      "Existing platforms were too slow and visually cluttered for high-frequency traders.",
    solution:
      "Built a high-performance React application with WebSockets for real-time data streaming and a dark, minimalist UI.",
    result: "Increased user retention by 45% and reduced latency by 300ms.",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Framer Motion",
    ],
    liveUrl: config.demoUrl,
    githubUrl: "https://github.com",
  },
  {
    id: "pulse-fitness",
    title: "Pulse Fitness Tracker",
    category: "App",
    image: "/images/project.webp",
    description: "An AI-powered fitness app that adjusts workouts dynamically.",
    problem:
      "Users struggled to maintain workout routines without personal trainers.",
    solution:
      "Integrated a custom machine learning model to adapt workout difficulty based on biometric feedback from wearables.",
    result:
      "Achieved over 100k downloads in the first month with a 4.8-star rating.",
    techStack: ["React Native", "Python", "TensorFlow", "GraphQL"],
    liveUrl: config.demoUrl,
  },
  {
    id: "aethos-ai",
    title: "Aethos AI Platform",
    category: "AI",
    image: "/images/project.webp",
    description: "An enterprise AI platform for automated customer service.",
    problem: "Customer support costs were scaling linearly with user growth.",
    solution:
      "Deployed a fine-tuned LLM capable of handling 80% of tier 1 support queries with a human-like tone.",
    result:
      "Reduced support costs by 60% while improving customer satisfaction scores.",
    techStack: ["Next.js", "OpenAI API", "Redis", "PostgreSQL"],
    liveUrl: config.demoUrl,
    githubUrl: "https://github.com",
  },
  {
    id: "nova-commerce",
    title: "Nova E-Commerce",
    category: "Web",
    image: "/images/project.webp",
    description: "A headless e-commerce storefront for a luxury tech brand.",
    problem: "The client's monolithic CMS was slow and difficult to update.",
    solution:
      "Migrated to a headless architecture using Shopify and a custom front-end.",
    result:
      "Improved page load times by 400% and increased conversion rate by 22%.",
    techStack: [
      "Next.js",
      "Shopify Storefront API",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: config.demoUrl,
  },
  {
    id: "synapse-analytics",
    title: "Synapse Data Analytics",
    category: "Web",
    image: "/images/project.webp",
    description: "A powerful data visualization tool for enterprise teams.",
    problem: "Data analysts spent too much time building custom reports.",
    solution:
      "Created an intuitive drag-and-drop dashboard builder with WebGL-powered charts.",
    result: "Saved analysts an average of 15 hours per week.",
    techStack: ["React", "D3.js", "Express", "MongoDB"],
    liveUrl: config.demoUrl,
    githubUrl: "https://github.com",
  },
  {
    id: "quantum-marketing",
    title: "Quantum SaaS Campaign",
    category: "Marketing",
    image: "/images/project.webp",
    description:
      "A comprehensive digital marketing campaign for a B2B SaaS startup.",
    problem: "The client had a great product but zero market visibility.",
    solution:
      "Designed a multi-channel strategy focusing on SEO, content marketing, and targeted LinkedIn ads.",
    result: "Generated 500+ qualified leads and a 300% ROI on ad spend.",
    techStack: ["SEO", "Google Ads", "LinkedIn Ads", "HubSpot", "Figma"],
    liveUrl: config.demoUrl,
  },
  {
    id: "horizon-branding",
    title: "Horizon Identity",
    category: "Design",
    image: "/images/project.webp",
    description: "A complete rebrand for an aerospace engineering firm.",
    problem:
      "The company's image felt dated and didn't reflect their cutting-edge work.",
    solution:
      "Developed a sleek, modern visual identity, including a new logo, typography, and digital assets.",
    result:
      "Successfully repositioned the brand to attract top-tier talent and clients.",
    techStack: ["Illustrator", "Photoshop", "After Effects", "Figma"],
    liveUrl: config.demoUrl,
  },
  {
    id: "omni-ai",
    title: "Omni Vision AI",
    category: "AI",
    image: "/images/project.webp",
    description:
      "Computer vision system for automated quality control in manufacturing.",
    problem: "Manual inspection was slow and prone to human error.",
    solution:
      "Trained a custom CNN to detect microscopic defects in real-time on the assembly line.",
    result:
      "Achieved 99.9% accuracy, completely eliminating defective product shipments.",
    techStack: ["Python", "PyTorch", "OpenCV", "C++", "React"],
    githubUrl: "https://github.com",
  },
];

import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sakshi Rai",
    role: "Growth Lead",
    company: "USHER",
    content:
      "USHER didn't just build us an app; they engineered a competitive advantage. Their technical prowess is unmatched. \n\nTheir team is deeply committed to delivering excellence, and it shows in every detail. They consistently strive to provide the best experience for users and never compromise on quality.",
    avatar: "/images/growth.webp",
    contentLight: "",
    contentDark: "",
  },
  {
    id: "t2",
    name: "Ebenzer Rao",
    role: "Software Developer",
    company: "USHER",
    content:
      "Working with USHER felt like having an elite strike team embedded in our company. They execute with precision. \n\nWhat stands out most is their promise to always put users first. The team collaborates seamlessly and is driven to build impactful solutions.",
    avatar: "/images/swd.webp",
    contentLight: "",
    contentDark: "",
  },
  {
    id: "t3",
    name: "Harsh Srivastava",
    role: "App Developer",
    company: "USHER",
    content:
      "We perfectly balance engineering power with an incredible eye for design and app development. Our company sets a high standard in development. \n\nWe are committed to continuous improvement and delivering the best possible user experience.",
    avatar: "/images/appdev.webp",
    contentLight: "",
    contentDark: "",
  },
  {
    id: "t4",
    name: "Raunak Kesarwani",
    role: "AI & Data Scientist Enthusiast",
    company: "USHER",
    content:
      "At USHER, we leverage data and AI to create smarter, more efficient solutions. \n\nOur promise is to continuously innovate and use technology responsibly to deliver meaningful value to our users.",
    avatar: "/images/ai-ds.webp",
    contentLight: "",
    contentDark: "",
  },
  {
    id: "t5",
    name: "Manhar",
    role: "Graphics & UI/UX Designer",
    company: "USHER",
    content:
      "Design at USHER is not just about looks—it's about creating seamless and intuitive user experiences. \n\nWe are dedicated to crafting interfaces that are both beautiful and highly functional, ensuring users enjoy every interaction.",
    avatar: "/images/UiUx.webp",
    contentLight: "",
    contentDark: "",
  },
  {
    id: "t6",
    name: "Utkarsh Tiwari",
    role: "Devops Developer",
    company: "USHER",
    content:
      "We build scalable and reliable systems that power great products. \n\nOur team is committed to writing clean, efficient code and delivering solutions that users can trust on every day.",
    contentLight:
      "We build scalable and reliable systems that power great products. \n\nOur team is committed to writing clean, efficient code and delivering solutions that users can rely on every day.",
    contentDark:
      "Kubernetes clusters with auto-scaling, 99.99% uptime. Terraform IaC for reproducible environments.",
    avatar: "/images/devops.webp",
  },
];
