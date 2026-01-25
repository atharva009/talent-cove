package com.talentcove.controller;

import com.talentcove.dto.JobDTO;
import com.talentcove.dto.JobSearchRequest;
import com.talentcove.model.Job;
import com.talentcove.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<JobDTO> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        try {
            JobDTO job = jobService.getJobById(id);
            return ResponseEntity.ok(job);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<JobDTO> createJob(@Valid @RequestBody Job job) {
        JobDTO createdJob = jobService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long id, @Valid @RequestBody Job jobDetails) {
        try {
            JobDTO updatedJob = jobService.updateJob(id, jobDetails);
            return ResponseEntity.ok(updatedJob);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        try {
            jobService.deleteJob(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/search")
    public ResponseEntity<List<JobDTO>> searchJobs(@RequestBody JobSearchRequest searchRequest) {
        List<JobDTO> jobs = jobService.searchJobs(searchRequest);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<JobDTO>> searchJobsByParams(
            @RequestParam(required = false) String jobTitle,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String experience,
            @RequestParam(required = false) String employmentType,
            @RequestParam(required = false) Integer minSalary,
            @RequestParam(required = false) Integer maxSalary,
            @RequestParam(required = false) String sortBy) {
        
        JobSearchRequest searchRequest = new JobSearchRequest();
        searchRequest.setJobTitle(jobTitle);
        searchRequest.setLocation(location);
        searchRequest.setExperience(experience);
        searchRequest.setEmploymentType(employmentType);
        searchRequest.setMinSalary(minSalary);
        searchRequest.setMaxSalary(maxSalary);
        searchRequest.setSortBy(sortBy);
        
        List<JobDTO> jobs = jobService.searchJobs(searchRequest);
        return ResponseEntity.ok(jobs);
    }
}
