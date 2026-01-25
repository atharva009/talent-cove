package com.talentcove.repository;

import com.talentcove.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    // Search by job title
    List<Job> findByJobTitleContainingIgnoreCase(String jobTitle);
    
    // Search by company
    List<Job> findByCompanyContainingIgnoreCase(String company);
    
    // Search by location
    List<Job> findByLocationContainingIgnoreCase(String location);
    
    // Search by experience level
    List<Job> findByExperience(String experience);
    
    // Search by employment type
    List<Job> findByEmploymentType(String employmentType);
    
    // Search by salary range
    @Query("SELECT j FROM Job j WHERE j.salary BETWEEN :minSalary AND :maxSalary")
    List<Job> findBySalaryRange(@Param("minSalary") Integer minSalary, @Param("maxSalary") Integer maxSalary);
    
    // Complex search query
    @Query("SELECT j FROM Job j WHERE " +
           "(:jobTitle IS NULL OR LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :jobTitle, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:experience IS NULL OR j.experience = :experience) AND " +
           "(:employmentType IS NULL OR j.employmentType = :employmentType) AND " +
           "(:minSalary IS NULL OR j.salary >= :minSalary) AND " +
           "(:maxSalary IS NULL OR j.salary <= :maxSalary)")
    List<Job> searchJobs(@Param("jobTitle") String jobTitle,
                        @Param("location") String location,
                        @Param("experience") String experience,
                        @Param("employmentType") String employmentType,
                        @Param("minSalary") Integer minSalary,
                        @Param("maxSalary") Integer maxSalary);
    
    // Order by salary ascending
    List<Job> findAllByOrderBySalaryAsc();
    
    // Order by salary descending
    List<Job> findAllByOrderBySalaryDesc();
    
    // Order by posted date (most recent first)
    List<Job> findAllByOrderByPostedDateDesc();
}
