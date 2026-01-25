package com.talentcove.service;

import com.talentcove.dto.JobDTO;
import com.talentcove.dto.JobSearchRequest;
import com.talentcove.model.Job;
import com.talentcove.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public JobDTO getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        return convertToDTO(job);
    }

    public JobDTO createJob(Job job) {
        Job savedJob = jobRepository.save(job);
        return convertToDTO(savedJob);
    }

    public JobDTO updateJob(Long id, Job jobDetails) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        
        job.setJobTitle(jobDetails.getJobTitle());
        job.setCompany(jobDetails.getCompany());
        job.setLocation(jobDetails.getLocation());
        job.setExperience(jobDetails.getExperience());
        job.setEmploymentType(jobDetails.getEmploymentType());
        job.setSalary(jobDetails.getSalary());
        job.setDescription(jobDetails.getDescription());
        
        Job updatedJob = jobRepository.save(job);
        return convertToDTO(updatedJob);
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        jobRepository.delete(job);
    }

    public List<JobDTO> searchJobs(JobSearchRequest searchRequest) {
        List<Job> jobs = jobRepository.searchJobs(
                searchRequest.getJobTitle(),
                searchRequest.getLocation(),
                searchRequest.getExperience(),
                searchRequest.getEmploymentType(),
                searchRequest.getMinSalary(),
                searchRequest.getMaxSalary()
        );

        // Apply sorting
        if (searchRequest.getSortBy() != null) {
            switch (searchRequest.getSortBy().toLowerCase()) {
                case "salary_asc":
                    jobs.sort((a, b) -> a.getSalary().compareTo(b.getSalary()));
                    break;
                case "salary_desc":
                    jobs.sort((a, b) -> b.getSalary().compareTo(a.getSalary()));
                    break;
                case "recent":
                    jobs.sort((a, b) -> b.getPostedDate().compareTo(a.getPostedDate()));
                    break;
                default:
                    // relevance - keep as is
                    break;
            }
        }

        return jobs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private JobDTO convertToDTO(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setJobTitle(job.getJobTitle());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setExperience(job.getExperience());
        dto.setEmploymentType(job.getEmploymentType());
        dto.setSalary(job.getSalary());
        dto.setDescription(job.getDescription());
        dto.setApplicantsCount(job.getApplicantsCount());
        dto.setPostedDate(job.getPostedDate());
        
        // Calculate days ago
        if (job.getPostedDate() != null) {
            long daysAgo = Duration.between(job.getPostedDate(), LocalDateTime.now()).toDays();
            dto.setPostedDaysAgo(daysAgo);
        }
        
        return dto;
    }
}
