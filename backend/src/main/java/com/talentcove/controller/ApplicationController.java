package com.talentcove.controller;

import com.talentcove.dto.ApplicationDTO;
import com.talentcove.model.Application;
import com.talentcove.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<?> createApplication(@RequestParam Long jobId) {
        try {
            Application application = applicationService.createApplication(jobId);
            return ResponseEntity.status(HttpStatus.CREATED).body(application);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<ApplicationDTO>> getMyApplications() {
        try {
            List<ApplicationDTO> applications = applicationService.getCurrentUserApplications();
            return ResponseEntity.ok(applications);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null);
        }
    }

    @GetMapping("/check/{jobId}")
    public ResponseEntity<Boolean> hasApplied(@PathVariable Long jobId) {
        boolean hasApplied = applicationService.hasUserApplied(jobId);
        return ResponseEntity.ok(hasApplied);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJob(@PathVariable Long jobId) {
        try {
            List<Application> applications = applicationService.getApplicationsByJob(jobId);
            return ResponseEntity.ok(applications);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/talent/{talentId}")
    public ResponseEntity<List<Application>> getApplicationsByTalent(@PathVariable Long talentId) {
        try {
            List<Application> applications = applicationService.getApplicationsByTalent(talentId);
            return ResponseEntity.ok(applications);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam Application.ApplicationStatus status) {
        try {
            Application application = applicationService.updateApplicationStatus(id, status);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        try {
            applicationService.deleteApplication(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Simple error response class
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
