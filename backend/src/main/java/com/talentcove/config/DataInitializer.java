package com.talentcove.config;

import com.talentcove.model.*;
import com.talentcove.repository.JobRepository;
import com.talentcove.repository.TalentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private TalentRepository talentRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (jobRepository.count() == 0 && talentRepository.count() == 0) {
            initializeJobs();
            initializeTalents();
        }
    }

    private void initializeJobs() {
        // Sample jobs matching the frontend data
        Job job1 = new Job("Product Designer", "Google", "San Francisco", "Mid Level", "Full Time", 120000, 
                "Google is looking for a Product Designer to join our team. You will be responsible for designing and developing products that are used by millions of people around the world.");
        job1.setApplicantsCount(20);
        jobRepository.save(job1);

        Job job2 = new Job("Software Engineer", "Microsoft", "Seattle", "Entry Level", "Full Time", 110000,
                "Join Microsoft's team of world-class engineers to develop innovative software solutions that impact millions of users globally.");
        job2.setApplicantsCount(15);
        jobRepository.save(job2);

        Job job3 = new Job("Marketing Specialist", "Apple", "New York", "Mid Level", "Full Time", 95000,
                "Apple is seeking a Marketing Specialist to craft compelling campaigns that resonate with our customer base and drive brand engagement.");
        job3.setApplicantsCount(25);
        jobRepository.save(job3);

        Job job4 = new Job("Data Analyst", "Amazon", "Austin", "Senior Level", "Full Time", 130000,
                "Amazon is hiring a Data Analyst to analyze large datasets and provide actionable insights to enhance operational efficiency.");
        job4.setApplicantsCount(30);
        jobRepository.save(job4);

        Job job5 = new Job("Customer Support", "Zoom", "Boston", "Intern", "Part Time", 40000,
                "Zoom is looking for an enthusiastic Customer Support Representative to assist our growing customer base with their inquiries.");
        job5.setApplicantsCount(10);
        jobRepository.save(job5);

        Job job6 = new Job("Sales Executive", "LinkedIn", "Denver", "Mid Level", "Full Time", 85000,
                "LinkedIn is seeking a dynamic Sales Executive to drive sales and grow our enterprise customer relationships.");
        job6.setApplicantsCount(12);
        jobRepository.save(job6);

        Job job7 = new Job("Content Writer", "Shopify", "Los Angeles", "Entry Level", "Freelance", 60000,
                "Shopify is in need of a creative Content Writer to craft compelling content for blogs, websites, and marketing materials.");
        job7.setApplicantsCount(18);
        jobRepository.save(job7);

        Job job8 = new Job("UI/UX Designer", "Meta", "San Francisco", "Mid Level", "Contract", 105000,
                "Meta is searching for a talented UI/UX Designer to create user-friendly digital experiences for our platform users worldwide.");
        job8.setApplicantsCount(22);
        jobRepository.save(job8);
    }

    private void initializeTalents() {
        // Sample talents matching the frontend data
        Talent talent1 = new Talent("Bob Smith", "Backend Developer", "Amazon", 
                "As a Backend Developer at Amazon, I specialize in server-side development and database management. My skills in Node.js and Express allow me to build robust and scalable APIs, while my experience with MySQL ensures efficient data handling and storage.",
                "Seattle, USA", "bob@example.com");
        talent1.setTopSkills(Arrays.asList("Node.js", "Express", "MySQL"));
        talent1.setExpectedSalaryMin(60000);
        talent1.setExpectedSalaryMax(85000);
        talent1.setImageUrl("/avatar.png");
        talentRepository.save(talent1);

        Talent talent2 = new Talent("Alice Johnson", "Frontend Developer", "Google",
                "As a Frontend Developer at Google, I craft user-friendly interfaces and ensure seamless user experiences. My expertise in React and JavaScript allows me to build highly interactive web applications, while my deep understanding of CSS ensures pixel-perfect designs.",
                "New York, USA", "alice@example.com");
        talent2.setTopSkills(Arrays.asList("React", "JavaScript", "CSS"));
        talent2.setExpectedSalaryMin(50000);
        talent2.setExpectedSalaryMax(75000);
        talent2.setImageUrl("/avatar1.png");
        talentRepository.save(talent2);

        Talent talent3 = new Talent("David Lee", "Data Scientist", "Facebook",
                "As a Data Scientist at Facebook, I analyze vast amounts of data to derive meaningful insights and improve user engagement. My skills in Python and TensorFlow enable me to build powerful machine learning models for predictive analytics.",
                "San Francisco, USA", "david@example.com");
        talent3.setTopSkills(Arrays.asList("Python", "Machine Learning", "TensorFlow"));
        talent3.setExpectedSalaryMin(80000);
        talent3.setExpectedSalaryMax(100000);
        talent3.setImageUrl("/avatar.png");
        talentRepository.save(talent3);

        Talent talent4 = new Talent("Sophia Martinez", "Cloud Engineer", "Microsoft",
                "As a Cloud Engineer at Microsoft, I specialize in cloud infrastructure and DevOps methodologies. My expertise in AWS, Azure, and Kubernetes helps businesses scale efficiently while maintaining security and reliability.",
                "Austin, USA", "sophia@example.com");
        talent4.setTopSkills(Arrays.asList("AWS", "Azure", "Kubernetes"));
        talent4.setExpectedSalaryMin(70000);
        talent4.setExpectedSalaryMax(95000);
        talent4.setImageUrl("/avatar1.png");
        talentRepository.save(talent4);

        Talent talent5 = new Talent("Michael Brown", "Cybersecurity Analyst", "IBM",
                "As a Cybersecurity Analyst at IBM, I focus on protecting sensitive data and networks from cyber threats. My expertise in ethical hacking and SIEM tools allows me to proactively secure digital assets.",
                "Toronto, Canada", "michael@example.com");
        talent5.setTopSkills(Arrays.asList("Network Security", "Ethical Hacking", "SIEM"));
        talent5.setExpectedSalaryMin(55000);
        talent5.setExpectedSalaryMax(80000);
        talent5.setImageUrl("/avatar.png");
        talentRepository.save(talent5);

        // Add John Doe with full profile (matching frontend profile data)
        Talent johnDoe = new Talent("John Doe", "Software Engineer III", "Google",
                "Experienced Software Engineer specializing in designing, developing, and maintaining scalable software solutions. Passionate about technology, innovation, and improving user experience through robust applications and cutting-edge technologies.",
                "New York, United States", "john@example.com");
        johnDoe.setTopSkills(Arrays.asList("React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", 
                "Node.js", "Express", "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS"));
        johnDoe.setImageUrl("/avatar.png");
        talentRepository.save(johnDoe);

        // Add experiences for John Doe
        Experience exp1 = new Experience("Software Engineer III", "Google", "New York, United States",
                LocalDate.of(2022, 4, 1), null,
                "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency.");
        exp1.setTalent(johnDoe);
        johnDoe.getExperiences().add(exp1);

        Experience exp2 = new Experience("Software Engineer", "Microsoft", "Seattle, United States",
                LocalDate.of(2018, 6, 1), LocalDate.of(2022, 3, 31),
                "As a Software Engineer at Microsoft, I am responsible for building and optimizing cloud-based solutions that drive efficiency and innovation.");
        exp2.setTalent(johnDoe);
        johnDoe.getExperiences().add(exp2);

        // Add certifications for John Doe
        Certification cert1 = new Certification("AWS Certified Solutions Architect - Associate", 
                "Amazon Web Services", LocalDate.of(2022, 3, 1), "AWS-ASA-12345");
        cert1.setTalent(johnDoe);
        johnDoe.getCertifications().add(cert1);

        Certification cert2 = new Certification("Certified Scrum Master", 
                "Scrum Alliance", LocalDate.of(2022, 1, 1), "SCM-98765");
        cert2.setTalent(johnDoe);
        johnDoe.getCertifications().add(cert2);

        talentRepository.save(johnDoe);
    }
}
