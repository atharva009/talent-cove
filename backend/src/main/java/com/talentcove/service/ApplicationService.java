package com.talentcove.service;

import com.talentcove.dto.ApplicationDTO;
import com.talentcove.model.Application;
import com.talentcove.model.Job;
import com.talentcove.model.Talent;
import com.talentcove.model.User;
import com.talentcove.repository.ApplicationRepository;
import com.talentcove.repository.JobRepository;
import com.talentcove.repository.TalentRepository;
import com.talentcove.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private TalentRepository talentRepository;

    @Autowired
    private SecurityUtil securityUtil;

    public Application createApplication(Long jobId) {
        User currentUser = securityUtil.getCurrentUser();
        
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));
        
        // Get or create talent profile for user
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseGet(() -> {
                    // Create a basic talent profile if it doesn't exist
                    Talent newTalent = new Talent();
                    newTalent.setName(currentUser.getName());
                    newTalent.setEmail(currentUser.getEmail());
                    newTalent.setUser(currentUser);
                    newTalent.setLocation("Not specified");
                    newTalent.setCompany("Not specified");
                    newTalent.setRole("Not specified");
                    return talentRepository.save(newTalent);
                });

        // Check if application already exists
        applicationRepository.findByJobAndTalent(job, talent)
                .ifPresent(app -> {
                    throw new RuntimeException("You have already applied for this job");
                });

        Application application = new Application(job, talent);
        Application savedApplication = applicationRepository.save(application);

        // Update job applicants count
        job.setApplicantsCount(job.getApplicantsCount() + 1);
        jobRepository.save(job);

        return savedApplication;
    }

    public List<Application> getApplicationsByJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));
        return applicationRepository.findByJob(job);
    }

    public List<Application> getApplicationsByTalent(Long talentId) {
        Talent talent = talentRepository.findById(talentId)
                .orElseThrow(() -> new RuntimeException("Talent not found with id: " + talentId));
        return applicationRepository.findByTalent(talent);
    }

    public List<ApplicationDTO> getCurrentUserApplications() {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Talent profile not found"));
        
        List<Application> applications = applicationRepository.findByTalent(talent);
        
        return applications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public boolean hasUserApplied(Long jobId) {
        try {
            User currentUser = securityUtil.getCurrentUser();
            Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                    .orElse(null);
            
            if (talent == null) {
                return false;
            }
            
            Job job = jobRepository.findById(jobId)
                    .orElse(null);
            
            if (job == null) {
                return false;
            }
            
            return applicationRepository.findByJobAndTalent(job, talent).isPresent();
        } catch (Exception e) {
            return false;
        }
    }

    private ApplicationDTO convertToDTO(Application application) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(application.getId());
        dto.setJobId(application.getJob().getId());
        dto.setJobTitle(application.getJob().getJobTitle());
        dto.setCompany(application.getJob().getCompany());
        dto.setLocation(application.getJob().getLocation());
        dto.setSalary(application.getJob().getSalary());
        dto.setApplicationDate(application.getApplicationDate());
        dto.setStatus(application.getStatus());
        return dto;
    }

    public Application updateApplicationStatus(Long applicationId, Application.ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));
        application.setStatus(status);
        return applicationRepository.save(application);
    }

    public void deleteApplication(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));
        
        // Decrease job applicants count
        Job job = application.getJob();
        job.setApplicantsCount(Math.max(0, job.getApplicantsCount() - 1));
        jobRepository.save(job);
        
        applicationRepository.delete(application);
    }
}
