package com.talentcove.controller;

import com.talentcove.dto.TalentDTO;
import com.talentcove.dto.TalentProfileDTO;
import com.talentcove.dto.TalentSearchRequest;
import com.talentcove.model.Certification;
import com.talentcove.model.Experience;
import com.talentcove.model.Talent;
import com.talentcove.service.TalentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/talents")
@CrossOrigin(origins = "*")
public class TalentController {

    @Autowired
    private TalentService talentService;

    @GetMapping
    public ResponseEntity<List<TalentDTO>> getAllTalents() {
        List<TalentDTO> talents = talentService.getAllTalents();
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TalentDTO> getTalentById(@PathVariable Long id) {
        try {
            TalentDTO talent = talentService.getTalentById(id);
            return ResponseEntity.ok(talent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<TalentProfileDTO> getTalentProfileById(@PathVariable Long id) {
        try {
            TalentProfileDTO profile = talentService.getTalentProfileById(id);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TalentDTO> createTalent(@Valid @RequestBody Talent talent) {
        TalentDTO createdTalent = talentService.createTalent(talent);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTalent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TalentDTO> updateTalent(@PathVariable Long id, @Valid @RequestBody Talent talentDetails) {
        try {
            TalentDTO updatedTalent = talentService.updateTalent(id, talentDetails);
            return ResponseEntity.ok(updatedTalent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTalent(@PathVariable Long id) {
        try {
            talentService.deleteTalent(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/search")
    public ResponseEntity<List<TalentDTO>> searchTalents(@RequestBody TalentSearchRequest searchRequest) {
        List<TalentDTO> talents = talentService.searchTalents(searchRequest);
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TalentDTO>> searchTalentsByParams(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) Integer minSalary,
            @RequestParam(required = false) Integer maxSalary,
            @RequestParam(required = false) String sortBy) {
        
        TalentSearchRequest searchRequest = new TalentSearchRequest();
        searchRequest.setName(name);
        searchRequest.setLocation(location);
        searchRequest.setSkill(skill);
        searchRequest.setMinSalary(minSalary);
        searchRequest.setMaxSalary(maxSalary);
        searchRequest.setSortBy(sortBy);
        
        List<TalentDTO> talents = talentService.searchTalents(searchRequest);
        return ResponseEntity.ok(talents);
    }

    // Current user profile endpoints
    @GetMapping("/my-profile")
    public ResponseEntity<TalentProfileDTO> getMyProfile() {
        try {
            TalentProfileDTO profile = talentService.getCurrentUserProfile();
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/my-profile")
    public ResponseEntity<TalentProfileDTO> updateMyProfile(@Valid @RequestBody Talent talentDetails) {
        try {
            TalentProfileDTO profile = talentService.createOrUpdateCurrentUserProfile(talentDetails);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Experience management
    @PostMapping("/my-profile/experiences")
    public ResponseEntity<Experience> addExperience(@Valid @RequestBody Experience experience) {
        try {
            Experience savedExperience = talentService.addExperienceToCurrentUser(experience);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedExperience);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/my-profile/experiences/{id}")
    public ResponseEntity<Experience> updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody Experience experienceDetails) {
        try {
            Experience experience = talentService.updateExperience(id, experienceDetails);
            return ResponseEntity.ok(experience);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/my-profile/experiences/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        try {
            talentService.deleteExperience(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Certification management
    @PostMapping("/my-profile/certifications")
    public ResponseEntity<Certification> addCertification(@Valid @RequestBody Certification certification) {
        try {
            Certification savedCertification = talentService.addCertificationToCurrentUser(certification);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCertification);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/my-profile/certifications/{id}")
    public ResponseEntity<Certification> updateCertification(
            @PathVariable Long id,
            @Valid @RequestBody Certification certificationDetails) {
        try {
            Certification certification = talentService.updateCertification(id, certificationDetails);
            return ResponseEntity.ok(certification);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/my-profile/certifications/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        try {
            talentService.deleteCertification(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
