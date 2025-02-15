import { IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields = [
  {
    title: "Job Title",
    icon: IconSearch,
    options: [
      "Designer",
      "Developer",
      "Product Manager",
      "Marketing Specialist",
      "Data Analyst",
      "Sales Executive",
      "Content Writer",
      "Customer Support",
    ],
  },
  {
    title: "Location",
    icon: IconMapPin,
    options: [
      "Delhi",
      "New York",
      "San Francisco",
      "London",
      "Berlin",
      "Tokyo",
      "Sydney",
      "Toronto",
    ],
  },
  {
    title: "Skills",
    icon: IconRecharging,
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Angular",
      "Node.js",
      "Python",
      "Java",
      "Ruby",
      "PHP",
      "SQL",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "API Development",
      "Testing and Debugging",
      "Agile Methodologies",
      "DevOps",
      "AWS",
      "Azure",
      "Google Cloud",
    ],
  },
];

const talents = [
  {
    name: "Bob Smith",
    role: "Backend Developer",
    company: "Amazon",
    topSkills: ["Node.js", "Express", "MySQL"],
    about:
      "As a Backend Developer at Amazon, I specialize in server-side development and database management. My skills in Node.js and Express allow me to build robust and scalable APIs, while my experience with MySQL ensures efficient data handling and storage. I am passionate about optimizing backend processes to support high-traffic applications and improve system performance. My approach to development emphasizes reliability, security, and the ability to adapt to evolving technological demands.",
    expectedSalary: "$60,000 - $85,000",
    location: "Seattle, USA",
    image: "avatar.png",
  },
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    company: "Google",
    topSkills: ["React", "JavaScript", "CSS"],
    about:
      "As a Frontend Developer at Google, I craft user-friendly interfaces and ensure seamless user experiences. My expertise in React and JavaScript allows me to build highly interactive web applications, while my deep understanding of CSS ensures pixel-perfect designs.",
    expectedSalary: "$50,000 - $75,000",
    location: "New York, USA",
    image: "avatar1.png",
  },
  {
    name: "David Lee",
    role: "Data Scientist",
    company: "Facebook",
    topSkills: ["Python", "Machine Learning", "TensorFlow"],
    about:
      "As a Data Scientist at Facebook, I analyze vast amounts of data to derive meaningful insights and improve user engagement. My skills in Python and TensorFlow enable me to build powerful machine learning models for predictive analytics.",
    expectedSalary: "$80,000 - $100,000",
    location: "San Francisco, USA",
    image: "avatar.png",
  },
  {
    name: "Sophia Martinez",
    role: "Cloud Engineer",
    company: "Microsoft",
    topSkills: ["AWS", "Azure", "Kubernetes"],
    about:
      "As a Cloud Engineer at Microsoft, I specialize in cloud infrastructure and DevOps methodologies. My expertise in AWS, Azure, and Kubernetes helps businesses scale efficiently while maintaining security and reliability.",
    expectedSalary: "$70,000 - $95,000",
    location: "Austin, USA",
    image: "avatar1.png",
  },
  {
    name: "Michael Brown",
    role: "Cybersecurity Analyst",
    company: "IBM",
    topSkills: ["Network Security", "Ethical Hacking", "SIEM"],
    about:
      "As a Cybersecurity Analyst at IBM, I focus on protecting sensitive data and networks from cyber threats. My expertise in ethical hacking and SIEM tools allows me to proactively secure digital assets.",
    expectedSalary: "$55,000 - $80,000",
    location: "Toronto, Canada",
    image: "avatar.png",
  },
];

const profile = {
  name: "John Doe",
  role: "Software Engineer III",
  company: "Google",
  location: "New York, United States",
  about: "Experienced Software Engineer specializing in designing, developing, and maintaining scalable software solutions. Passionate about technology, innovation, and improving user experience through robust applications and cutting-edge technologies.",
  skills: ["React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS"],
  experience: [
      {
          title: "Software Engineer III",
          company: "Google",
          location: "New York, United States",
          startDate: "Apr 2022",
          endDate: "Present",
          description: "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process."
      },
      {
          title: "Software Engineer",
          company: "Microsoft",
          location: "Seattle, United States",
          startDate: "Jun 2018",
          endDate: "Present",
          description: "As a Software Engineer at Microsoft, I am responsible for building and optimizing cloud-based solutions that drive efficiency and innovation. I work closely with teams across various disciplines to ensure seamless deployment of scalable applications. My expertise lies in backend architecture, API development, and cloud integration, helping businesses thrive in a digital-first world."
      }
  ],
  certifications: [
      {
          title: "AWS Certified Solutions Architect - Associate",
          issuer: "Amazon Web Services",
          issueDate: "Mar 2022",
          credentialID: "AWS-ASA-12345"
      },
      {
          title: "Certified Scrum Master",
          issuer: "Scrum Alliance",
          issueDate: "Jan 2022",
          credentialID: "SCM-98765"
      }
  ],
};

export { searchFields, talents, profile };
