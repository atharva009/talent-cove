package com.talentcove.service;

import com.talentcove.dto.TalentDTO;
import com.talentcove.dto.TalentProfileDTO;
import com.talentcove.dto.TalentSearchRequest;
import com.talentcove.model.Certification;
import com.talentcove.model.Experience;
import com.talentcove.model.Talent;
import com.talentcove.model.User;
import com.talentcove.repository.TalentRepository;
import com.talentcove.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TalentService {

    @Autowired
    private TalentRepository talentRepository;

    @Autowired
    private SecurityUtil securityUtil;

    public List<TalentDTO> getAllTalents() {
        return talentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TalentDTO getTalentById(Long id) {
        Talent talent = talentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talent not found with id: " + id));
        return convertToDTO(talent);
    }

    public TalentProfileDTO getTalentProfileById(Long id) {
        Talent talent = talentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talent not found with id: " + id));
        return convertToProfileDTO(talent);
    }

    public TalentDTO createTalent(Talent talent) {
        Talent savedTalent = talentRepository.save(talent);
        return convertToDTO(savedTalent);
    }

    public TalentDTO updateTalent(Long id, Talent talentDetails) {
        Talent talent = talentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talent not found with id: " + id));
        
        talent.setName(talentDetails.getName());
        talent.setRole(talentDetails.getRole());
        talent.setCompany(talentDetails.getCompany());
        talent.setAbout(talentDetails.getAbout());
        talent.setTopSkills(talentDetails.getTopSkills());
        talent.setExpectedSalaryMin(talentDetails.getExpectedSalaryMin());
        talent.setExpectedSalaryMax(talentDetails.getExpectedSalaryMax());
        talent.setLocation(talentDetails.getLocation());
        talent.setImageUrl(talentDetails.getImageUrl());
        talent.setEmail(talentDetails.getEmail());
        
        Talent updatedTalent = talentRepository.save(talent);
        return convertToDTO(updatedTalent);
    }

    public void deleteTalent(Long id) {
        Talent talent = talentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talent not found with id: " + id));
        talentRepository.delete(talent);
    }

    public List<TalentDTO> searchTalents(TalentSearchRequest searchRequest) {
        List<Talent> talents;
        
        // If skill is specified, search by skill
        if (searchRequest.getSkill() != null && !searchRequest.getSkill().isEmpty()) {
            talents = talentRepository.findBySkills(searchRequest.getSkill());
        } else {
            talents = talentRepository.searchTalents(
                    searchRequest.getName(),
                    searchRequest.getLocation(),
                    searchRequest.getMinSalary(),
                    searchRequest.getMaxSalary()
            );
        }

        // Apply sorting if needed
        // Note: For now, we'll keep the default order. Can be enhanced later.

        return talents.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Current user profile methods
    public TalentProfileDTO getCurrentUserProfile() {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found. Please create your profile first."));
        return convertToProfileDTO(talent);
    }

    public TalentProfileDTO createOrUpdateCurrentUserProfile(Talent talentDetails) {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseGet(() -> {
                    Talent newTalent = new Talent();
                    newTalent.setUser(currentUser);
                    newTalent.setEmail(currentUser.getEmail());
                    newTalent.setName(currentUser.getName());
                    return newTalent;
                });

        // Update basic info
        if (talentDetails.getName() != null) talent.setName(talentDetails.getName());
        if (talentDetails.getRole() != null) talent.setRole(talentDetails.getRole());
        if (talentDetails.getCompany() != null) talent.setCompany(talentDetails.getCompany());
        if (talentDetails.getLocation() != null) talent.setLocation(talentDetails.getLocation());
        if (talentDetails.getAbout() != null) talent.setAbout(talentDetails.getAbout());
        if (talentDetails.getTopSkills() != null) talent.setTopSkills(talentDetails.getTopSkills());
        if (talentDetails.getExpectedSalaryMin() != null) talent.setExpectedSalaryMin(talentDetails.getExpectedSalaryMin());
        if (talentDetails.getExpectedSalaryMax() != null) talent.setExpectedSalaryMax(talentDetails.getExpectedSalaryMax());
        if (talentDetails.getImageUrl() != null) talent.setImageUrl(talentDetails.getImageUrl());

        Talent savedTalent = talentRepository.save(talent);
        return convertToProfileDTO(savedTalent);
    }

    public Experience addExperienceToCurrentUser(Experience experience) {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found. Please create your profile first."));
        
        experience.setTalent(talent);
        talent.getExperiences().add(experience);
        talentRepository.save(talent);
        return experience;
    }

    public Experience updateExperience(Long experienceId, Experience experienceDetails) {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found."));
        
        Experience experience = talent.getExperiences().stream()
                .filter(e -> e.getId().equals(experienceId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Experience not found."));

        if (experienceDetails.getTitle() != null) experience.setTitle(experienceDetails.getTitle());
        if (experienceDetails.getCompany() != null) experience.setCompany(experienceDetails.getCompany());
        if (experienceDetails.getLocation() != null) experience.setLocation(experienceDetails.getLocation());
        if (experienceDetails.getStartDate() != null) experience.setStartDate(experienceDetails.getStartDate());
        if (experienceDetails.getEndDate() != null) experience.setEndDate(experienceDetails.getEndDate());
        if (experienceDetails.getDescription() != null) experience.setDescription(experienceDetails.getDescription());

        talentRepository.save(talent);
        return experience;
    }

    public void deleteExperience(Long experienceId) {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found."));
        
        boolean removed = talent.getExperiences().removeIf(e -> e.getId().equals(experienceId));
        if (!removed) {
            throw new RuntimeException("Experience not found.");
        }
        talentRepository.save(talent);
    }

    public Certification addCertificationToCurrentUser(Certification certification) {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found. Please create your profile first."));
        
        certification.setTalent(talent);
        talent.getCertifications().add(certification);
        talentRepository.save(talent);
        return certification;
    }

    public Certification updateCertification(Long certificationId, Certification certificationDetails) {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found."));
        
        Certification certification = talent.getCertifications().stream()
                .filter(c -> c.getId().equals(certificationId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Certification not found."));

        if (certificationDetails.getTitle() != null) certification.setTitle(certificationDetails.getTitle());
        if (certificationDetails.getIssuer() != null) certification.setIssuer(certificationDetails.getIssuer());
        if (certificationDetails.getIssueDate() != null) certification.setIssueDate(certificationDetails.getIssueDate());
        if (certificationDetails.getCredentialId() != null) certification.setCredentialId(certificationDetails.getCredentialId());

        talentRepository.save(talent);
        return certification;
    }

    public void deleteCertification(Long certificationId) {
        User currentUser = securityUtil.getCurrentUser();
        Talent talent = talentRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found."));
        
        boolean removed = talent.getCertifications().removeIf(c -> c.getId().equals(certificationId));
        if (!removed) {
            throw new RuntimeException("Certification not found.");
        }
        talentRepository.save(talent);
    }

    private TalentDTO convertToDTO(Talent talent) {
        TalentDTO dto = new TalentDTO();
        dto.setId(talent.getId());
        dto.setName(talent.getName());
        dto.setRole(talent.getRole());
        dto.setCompany(talent.getCompany());
        dto.setAbout(talent.getAbout());
        dto.setTopSkills(talent.getTopSkills());
        dto.setExpectedSalaryMin(talent.getExpectedSalaryMin());
        dto.setExpectedSalaryMax(talent.getExpectedSalaryMax());
        dto.setLocation(talent.getLocation());
        dto.setImageUrl(talent.getImageUrl());
        dto.setEmail(talent.getEmail());
        
        // Format expected salary string
        if (talent.getExpectedSalaryMin() != null && talent.getExpectedSalaryMax() != null) {
            dto.setExpectedSalary(String.format("$%s - $%s",
                    formatSalary(talent.getExpectedSalaryMin()),
                    formatSalary(talent.getExpectedSalaryMax())));
        }
        
        return dto;
    }

    private String formatSalary(Integer salary) {
        if (salary >= 1000) {
            return String.format("%d,%03d", salary / 1000, salary % 1000);
        }
        return salary.toString();
    }

    private TalentProfileDTO convertToProfileDTO(Talent talent) {
        TalentProfileDTO dto = new TalentProfileDTO();
        dto.setId(talent.getId());
        dto.setName(talent.getName());
        dto.setRole(talent.getRole());
        dto.setCompany(talent.getCompany());
        dto.setLocation(talent.getLocation());
        dto.setAbout(talent.getAbout());
        dto.setSkills(talent.getTopSkills());

        // Convert experiences
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM yyyy");
        List<TalentProfileDTO.ExperienceDTO> experiences = talent.getExperiences().stream()
                .map(exp -> {
                    TalentProfileDTO.ExperienceDTO expDTO = new TalentProfileDTO.ExperienceDTO();
                    expDTO.setId(exp.getId());
                    expDTO.setTitle(exp.getTitle());
                    expDTO.setCompany(exp.getCompany());
                    expDTO.setLocation(exp.getLocation());
                    expDTO.setStartDate(exp.getStartDate().format(dateFormatter));
                    expDTO.setEndDate(exp.getIsCurrent() ? "Present" : 
                            (exp.getEndDate() != null ? exp.getEndDate().format(dateFormatter) : "Present"));
                    expDTO.setDescription(exp.getDescription());
                    return expDTO;
                })
                .collect(Collectors.toList());
        dto.setExperience(experiences);

        // Convert certifications
        List<TalentProfileDTO.CertificationDTO> certifications = talent.getCertifications().stream()
                .map(cert -> {
                    TalentProfileDTO.CertificationDTO certDTO = new TalentProfileDTO.CertificationDTO();
                    certDTO.setId(cert.getId());
                    certDTO.setTitle(cert.getTitle());
                    certDTO.setIssuer(cert.getIssuer());
                    certDTO.setIssueDate(cert.getIssueDate().format(dateFormatter));
                    certDTO.setCredentialID(cert.getCredentialId());
                    return certDTO;
                })
                .collect(Collectors.toList());
        dto.setCertifications(certifications);

        return dto;
    }
}
