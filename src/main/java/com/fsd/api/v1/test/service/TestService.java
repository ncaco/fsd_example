package com.fsd.api.v1.test.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.api.v1.test.repository.TestRepository;
import com.fsd.model.Test;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;
    
    // 모든 테스트 항목 조회
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }
    
    // ID로 테스트 항목 조회
    public Optional<Test> getTestById(Long id) {
        return testRepository.findById(id);
    }
    
    // 테스트 항목 생성
    public Test createTest(Test test) {
        return testRepository.save(test);
    }
    
    // 테스트 항목 수정
    public Test updateTest(Long id, Test testDetails) {
        Optional<Test> test = testRepository.findById(id);
        if (test.isPresent()) {
            Test existingTest = test.get();
            existingTest.setName(testDetails.getName());
            existingTest.setDescription(testDetails.getDescription());
            return testRepository.save(existingTest);
        }
        return null;
    }
    
    // 테스트 항목 삭제
    public void deleteTest(Long id) {
        testRepository.deleteById(id);
    }
} 