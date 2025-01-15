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

type JobCategory = {
  title: string;
  imageSrc: string;
  description: string;
  jobCount: string;
};

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
