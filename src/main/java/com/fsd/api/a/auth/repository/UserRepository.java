package com.fsd.api.a.auth.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fsd.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEml(String eml);

    @Query("SELECT u FROM User u WHERE u.eml = :eml")
    User findFirstByEml(@Param("eml") String eml);
} 