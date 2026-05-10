export {};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  contentLight: string;
  contentDark: string;
  avatar: string;
  content: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  link?: string;
};

declare global {
  namespace React {
    interface CSSProperties {
      "--tw-content"?: string;
    }
  }
}
