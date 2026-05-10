import React from "react";
import { Link } from "wouter";
import { Mail, ArrowRight, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Company contact information
  const contactInfo = {
    email: "info.usherstack@gmail.com",
    phone: "+91 8948552234",
    address: "Lucknow, Uttar Pradesh, India",
    youtube: "https://youtube.com/@usherinc-h5p",
    instagram: "https://www.instagram.com/usher.tech",
    facebook: "https://www.facebook.com/share/1c3UAy4gjt/",
    twitter: "https://twitter.com",
    linkedin: "https://www.linkedin.com/company/usr-pixelwork/",
    github: "#",
  };

  const socialLinks = [
    // lucide-react exports don't include GitHub/Twitter/Youtube in this version; use generic icons
    { icon: Mail, href: contactInfo.github, label: "GitHub" },
    { icon: Mail, href: contactInfo.twitter, label: "Twitter" },
    { icon: Mail, href: contactInfo.youtube, label: "YouTube" },
  ];

  return (
    <footer
      className="bg-background border-t border-border/50 pt-20 pb-10 min-h-[300px]"
      role="contentinfo"
    >
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-5 flex flex-col">
              <Link href="/">
                <div className="cursor-pointer flex items-center gap-2 mb-6">
                  <img
                    src="/usher-logo-72.webp"
                    srcSet="/usher-logo-48.webp 48w, /usher-logo-72.webp 72w, /usher-logo-96.webp 96w"
                    sizes="(max-width: 768px) 48px, 72px"
                    width={72}
                    height={48}
                    alt="USHER — IT Services & Consulting"
                    className="h-12 w-auto rounded-md object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Link>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Unified Solutions for High-performance Engineering & Research.
                We build tomorrow's digital infrastructure today.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors duration-200"
                    aria-label={`Visit us on ${social.label}`}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                ))}
                {/* LinkedIn - using text link since icon not available in lucide-react */}
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors duration-200 text-sm font-medium text-muted-foreground hover:text-primary"
                  aria-label="Visit us on LinkedIn"
                >
                  in
                </a>
                {/* Instagram - using text link since icon not available in lucide-react */}
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors duration-200 text-sm font-medium text-muted-foreground hover:text-primary"
                  aria-label="Visit us on Instagram"
                >
                  IG
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-foreground font-semibold mb-6">Services</h4>
              <ul className="space-y-4" role="list">
                <li>
                  <Link href="/services">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      Web Development
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      App Development
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      Graphic Design
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      AI Integration
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      Digital Marketing
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-foreground font-semibold mb-6">Company</h4>
              <ul className="space-y-4" role="list">
                <li>
                  <Link href="/about">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      Portfolio
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      Contact
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-foreground font-semibold mb-6">
                Ready to start?
              </h4>
              <p className="text-muted-foreground mb-4">
                Let's discuss your next big project.
              </p>
              <Link href="/contact">
                <Button className="w-full bg-foreground hover:bg-primary text-background hover:text-white transition-colors group flex justify-between items-center px-6">
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="mt-6 flex flex-col gap-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-foreground transition-colors truncate"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="hover:text-foreground transition-colors">
                    {contactInfo.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} USHER Agency. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
