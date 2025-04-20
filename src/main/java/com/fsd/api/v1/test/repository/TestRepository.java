package com.fsd.api.v1.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsd.model.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공됨
} 