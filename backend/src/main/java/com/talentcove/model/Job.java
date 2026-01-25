package com.talentcove.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Job title is required")
    @Column(nullable = false)
    private String jobTitle;

    @NotBlank(message = "Company name is required")
    @Column(nullable = false)
    private String company;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotBlank(message = "Experience level is required")
    @Column(nullable = false)
    private String experience;

    @NotBlank(message = "Employment type is required")
    @Column(nullable = false)
    private String employmentType;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be positive")
    @Column(nullable = false)
    private Integer salary;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "applicants_count", nullable = false)
    private Integer applicantsCount = 0;

    @Column(name = "posted_date", nullable = false)
    private LocalDateTime postedDate;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        postedDate = LocalDateTime.now();
    }

    // Constructors
    public Job() {
    }

    public Job(String jobTitle, String company, String location, String experience, 
               String employmentType, Integer salary, String description) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.experience = experience;
        this.employmentType = employmentType;
        this.salary = salary;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getApplicantsCount() {
        return applicantsCount;
    }

    public void setApplicantsCount(Integer applicantsCount) {
        this.applicantsCount = applicantsCount;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }
}
