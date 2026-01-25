package com.talentcove.repository;

import com.talentcove.model.Application;
import com.talentcove.model.Job;
import com.talentcove.model.Talent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    // Find applications by job
    List<Application> findByJob(Job job);
    
    // Find applications by talent
    List<Application> findByTalent(Talent talent);
    
    // Check if talent already applied to job
    Optional<Application> findByJobAndTalent(Job job, Talent talent);
    
    // Count applications for a job
    long countByJob(Job job);
}
