type JobCategory = {
  title: string;
  imageSrc: string;
  description: string;
  jobCount: string;
};

type UserTestimonial = {
  name: string;
  avatar: string;
  rating: number;
  testimonial: string;
};

type FooterLinkSection = {
  title: string;
  links: { name: string; url?: string }[];
};

export const companies = [
  "Google",
  "Amazon",
  "Figma",
  "Netflix",
  "Meta",
  "Microsoft",
  "Pinterest",
  "Slack",
  "Spotify",
  "Oracle",
  "Walmart",
];

export const jobCategories: JobCategory[] = [
  {
    title: "Digital Marketing",
    imageSrc: "/Category/Digital Marketing.png",
    description: "Promote brands online with marketing strategies",
    jobCount: "1k+ new job posted",
  },
  {
    title: "Web Developer",
    imageSrc: "/Category/Web Developer.png",
    description: "Build and maintain websites for clients",
    jobCount: "2k+ new job posted",
  },
  {
    title: "Arts & Design",
    imageSrc: "/Category/Arts & Design.png",
    description: "Create visual content for branding and media",
    jobCount: "500+ new job posted",
  },
  {
    title: "UI-UX Designer",
    imageSrc: "/Category/UI-UX Designer.png",
    description: "Design user interfaces and enhance user experience",
    jobCount: "800+ new job posted",
  },
  {
    title: "Content Writing",
    imageSrc: "/Category/Content Writing.png",
    description: "Write and edit content for various platforms",
    jobCount: "1.5k+ new job posted",
  },
  {
    title: "Data Entry",
    imageSrc: "/Category/Data Entry.png",
    description: "Input data into systems accurately and efficiently",
    jobCount: "1k+ new job posted",
  },
  {
    title: "Customer Support",
    imageSrc: "/Category/Customer Support.png",
    description: "Assist customers with inquiries and issues",
    jobCount: "1.2k+ new job posted",
  },
  {
    title: "Sales",
    imageSrc: "/Category/Sales.png",
    description: "Sell products and services to customers",
    jobCount: "900+ new job posted",
  },
  {
    title: "Finance",
    imageSrc: "/Category/Finance.png",
    description: "Manage financial records and transactions",
    jobCount: "700+ new job posted",
  },
  {
    title: "Human Resource",
    imageSrc: "/Category/Human Resource.png",
    description: "Recruit, manage, and support company employees",
    jobCount: "600+ new job posted",
  },
];

export const testimonials: UserTestimonial[] = [
  {
    name: "James Anderson",
    avatar: "avatar.png",
    rating: 5,
    testimonial: "This job portal made job search easy and quick. Recommended to all job seekers!",
  },
  {
    name: "Dale Steyn",
    avatar: "avatar.png",
    rating: 5,
    testimonial: "Found my dream job within a week! The application process was smooth.",
  },
  {
    name: "Pat Cummins",
    avatar: "avatar.png",
    rating: 5,
    testimonial: "I secured a job offer within days of applying. Exceptional user experience and support.",
  },
  {
    name: "Brett Lee",
    avatar: "avatar.png",
    rating: 5,
    testimonial: "Highly efficient job portal with excellent resources. Helped me land a great position.",
  },
];

export const footerLinks: FooterLinkSection[] = [
  {
    title: "Product",
    links: [
      { name: "Find Job" },
      { name: "Find Company" },
      { name: "Find Employee" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us" },
      { name: "Contact Us" },
      { name: "Privacy Policy" },
      { name: "Terms & Conditions" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help & Support" },
      { name: "Feedback" },
      { name: "FAQs" },
    ],
  }
];
