import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";

import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { useScrollRestore } from "@/hooks/useScrollRestore";

const DynamicChatbot = lazy(() =>
  import("@/components/features/DynamicChatbot").then((module) => ({
    default: module.DynamicChatbot,
  }))
);

const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center text-sm text-muted-foreground">
            Loading page...
          </div>
        }
      >
        <Switch key={location}>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/portfolio/:id" component={ProjectDetails} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  // Enable scroll-to-top behavior on page refresh/load/navigation
  useScrollRestore();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <TooltipProvider>
        <div className="flex flex-col min-h-screen relative selection:bg-primary/30 selection:text-primary-foreground">
          <Navbar />
          <main className="flex-1 w-full overflow-x-hidden">
            <Router />
          </main>
          <Footer />
          <Suspense fallback={null}>
            <DynamicChatbot />
          </Suspense>
        </div>
        <Toaster position="bottom-right" theme="system" />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
