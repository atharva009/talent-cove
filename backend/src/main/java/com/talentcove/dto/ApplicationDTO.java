package com.talentcove.dto;

import com.talentcove.model.Application;
import java.time.LocalDateTime;

public class ApplicationDTO {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private String location;
    private Integer salary;
    private LocalDateTime applicationDate;
    private Application.ApplicationStatus status;

    // Constructors
    public ApplicationDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
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

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public LocalDateTime getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDateTime applicationDate) {
        this.applicationDate = applicationDate;
    }

    public Application.ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(Application.ApplicationStatus status) {
        this.status = status;
    }
}
