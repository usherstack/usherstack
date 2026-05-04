export const chatbotManual = {
  general: {
    introduction:
      "Hello! I'm the USHER Professional assistant. I can provide information about our services, team, projects, and technical details about this website. How can I help you?",
    greeting:
      "Hello! Welcome to USHER Professional. Ask me anything about our work.",
  },
  navigation: {
    home: "You can return to the homepage by clicking the USHER logo in the navigation bar.",
    about: "Learn more about our company on the About Us page.",
    services: "Explore our wide range of services on the Services page.",
    portfolio: "Check out our latest work in the Portfolio section.",
    contact: "You can get in touch with us through the Contact page.",
  },
  services: {
    overview:
      "We offer a comprehensive suite of digital services, including UI/UX Design, AI & Data Science, Custom App Development, DevOps, Growth Marketing, and general Software Development. What service are you interested in?",
    uiux: "We create intuitive and beautiful user interfaces. Our design process focuses on user experience to ensure your product is a delight to use.",
    ai: "Our AI and Data Science team can help you unlock the power of your data, build intelligent systems, and create predictive models.",
    appdev:
      "We build high-quality, scalable web and mobile applications tailored to your business needs using modern technologies.",
    devops:
      "Our DevOps experts can streamline your development and deployment processes, ensuring faster delivery and more reliable infrastructure.",
    growth:
      "We help you grow your business with data-driven marketing strategies and optimization techniques.",
    swd: "Our core is software development. We can build anything from a simple website to a complex enterprise system.",
  },
  technical: {
    stack:
      "This website is built with a modern tech stack. The frontend is a React application developed with TypeScript and Vite, styled with Tailwind CSS, and animated with Framer Motion.",
    repo: "You can find the source code for this project on our GitHub.",
  },
  issues: {
    "mobile issue":
      "Some animations, especially in the Team section, can be resource-intensive on mobile browsers. If you experience lag, please try updating your browser or viewing on a desktop for the full experience.",
    "team not loading":
      "The Team section may not load correctly on older mobile devices due to complex animations. We recommend viewing it on a modern smartphone or a desktop computer.",
    "build error":
      "If you're facing build errors, first try running `npm install` to refresh all dependencies. If the problem persists, delete the `node_modules` directory and the `package-lock.json` file, then run `npm install` again. Also, ensure you are using Node.js v18.20.0 or a compatible version.",
    "deployment error":
      "Deployment for this project is configured for Render via the `render.yaml` file. For a deployment to succeed, ensure all your latest changes are committed and pushed to your git repository. Check the build logs on your Render dashboard for specific error details.",
    "dependency issue":
      "Dependency conflicts can occur. The safest way to resolve them is to delete your `node_modules` folder and `package-lock.json` file, then execute `npm install` to get a fresh installation of all required packages.",
    "node npm pnpm":
      "This project is set up to use `npm` as the package manager. While `pnpm` or `yarn` might work, we recommend sticking with `npm` and Node.js v18.20.0 for the best compatibility and to avoid unexpected issues.",
    fallback:
      "I can help with technical issues. Please describe the problem. For example, you can ask about 'build error', 'mobile issue', or 'dependency issue'.",
  },
  contact: {
    info: "You can reach us via email at contact@usher.pro or find more options on our Contact page.",
    booking:
      "To schedule a meeting or consultation, please use our Calendly booking page. It's the quickest way to get on our calendar.",
  },
  portfolio: {
    info: "Our portfolio showcases a variety of projects across different industries. You can view them on the Portfolio page. We have experience building everything from marketing websites to complex data dashboards.",
  },
  team: {
    info: "Our team is a group of passionate designers, developers, and strategists. You can meet them on our About page.",
  },
  fallback:
    "I'm here to help with USHER. Ask about our team, services, projects, contact info, booking a meeting, or technical issues you might be having with this site.",
};
