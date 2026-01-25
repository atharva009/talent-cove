package com.talentcove.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "talents")
public class Talent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Role is required")
    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String company;

    @Column(columnDefinition = "TEXT")
    private String about;

    @ElementCollection
    @CollectionTable(name = "talent_skills", joinColumns = @JoinColumn(name = "talent_id"))
    @Column(name = "skill")
    private List<String> topSkills = new ArrayList<>();

    @Column(name = "expected_salary_min")
    private Integer expectedSalaryMin;

    @Column(name = "expected_salary_max")
    private Integer expectedSalaryMax;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @Column(name = "image_url")
    private String imageUrl;

    @Email(message = "Email should be valid")
    @Column(unique = true)
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "talent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experiences = new ArrayList<>();

    @OneToMany(mappedBy = "talent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certification> certifications = new ArrayList<>();

    @OneToMany(mappedBy = "talent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();

    // Constructors
    public Talent() {
    }

    public Talent(String name, String role, String company, String about, 
                  String location, String email) {
        this.name = name;
        this.role = role;
        this.company = company;
        this.about = about;
        this.location = location;
        this.email = email;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<Certification> certifications) {
        this.certifications = certifications;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }
}
