package com.talentcove.dto;

import java.util.List;

public class TalentDTO {
    private Long id;
    private String name;
    private String role;
    private String company;
    private String about;
    private List<String> topSkills;
    private Integer expectedSalaryMin;
    private Integer expectedSalaryMax;
    private String expectedSalary; // Formatted string like "$60,000 - $85,000"
    private String location;
    private String imageUrl;
    private String email;

    // Constructors
    public TalentDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public List<String> getTopSkills() {
        return topSkills;
    }

    public void setTopSkills(List<String> topSkills) {
        this.topSkills = topSkills;
    }

    public Integer getExpectedSalaryMin() {
        return expectedSalaryMin;
    }

    public void setExpectedSalaryMin(Integer expectedSalaryMin) {
        this.expectedSalaryMin = expectedSalaryMin;
    }

    public Integer getExpectedSalaryMax() {
        return expectedSalaryMax;
    }

    public void setExpectedSalaryMax(Integer expectedSalaryMax) {
        this.expectedSalaryMax = expectedSalaryMax;
    }

    public String getExpectedSalary() {
        return expectedSalary;
    }

    public void setExpectedSalary(String expectedSalary) {
        this.expectedSalary = expectedSalary;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
