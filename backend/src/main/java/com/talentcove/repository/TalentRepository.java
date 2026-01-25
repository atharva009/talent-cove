package com.talentcove.repository;

import com.talentcove.model.Talent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {
    
    // Find by email
    Optional<Talent> findByEmail(String email);
    
    // Search by name
    List<Talent> findByNameContainingIgnoreCase(String name);
    
    // Search by role
    List<Talent> findByRoleContainingIgnoreCase(String role);
    
    // Search by location
    List<Talent> findByLocationContainingIgnoreCase(String location);
    
    // Search by skill (using native query for array search)
    @Query("SELECT DISTINCT t FROM Talent t JOIN t.topSkills s WHERE LOWER(s) LIKE LOWER(CONCAT('%', :skill, '%'))")
    List<Talent> findBySkill(@Param("skill") String skill);
    
    // Complex search query
    @Query("SELECT DISTINCT t FROM Talent t WHERE " +
           "(:name IS NULL OR LOWER(t.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:location IS NULL OR LOWER(t.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:minSalary IS NULL OR t.expectedSalaryMin >= :minSalary OR t.expectedSalaryMax >= :minSalary) AND " +
           "(:maxSalary IS NULL OR t.expectedSalaryMax <= :maxSalary OR t.expectedSalaryMin <= :maxSalary)")
    List<Talent> searchTalents(@Param("name") String name,
                              @Param("location") String location,
                              @Param("minSalary") Integer minSalary,
                              @Param("maxSalary") Integer maxSalary);
    
    // Search by skills (multiple)
    @Query("SELECT DISTINCT t FROM Talent t JOIN t.topSkills s WHERE " +
           "(:skill IS NULL OR LOWER(s) LIKE LOWER(CONCAT('%', :skill, '%')))")
    List<Talent> findBySkills(@Param("skill") String skill);
}
