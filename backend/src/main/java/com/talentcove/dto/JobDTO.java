package com.talentcove.dto;

import java.time.LocalDateTime;

public class JobDTO {
    private Long id;
    private String jobTitle;
    private String company;
    private String location;
    private String experience;
    private String employmentType;
    private Integer salary;
    private String description;
    private Integer applicantsCount;
    private LocalDateTime postedDate;
    private Long postedDaysAgo;

    // Constructors
    public JobDTO() {
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

    public Long getPostedDaysAgo() {
        return postedDaysAgo;
    }

    public void setPostedDaysAgo(Long postedDaysAgo) {
        this.postedDaysAgo = postedDaysAgo;
    }
}
