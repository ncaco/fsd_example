package com.fsd.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.fsd.api.v1.test.repository.TestRepository;
import com.fsd.model.Test;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private TestRepository testRepository;

    @Override
    public void run(String... args) throws Exception {
        // 초기 데이터 생성
        if (testRepository.count() == 0) {
            // 테스트 데이터 추가
            Test test1 = new Test("테스트1", "첫 번째 테스트 항목입니다.");
            Test test2 = new Test("테스트2", "두 번째 테스트 항목입니다.");
            Test test3 = new Test("테스트3", "세 번째 테스트 항목입니다.");
            
            testRepository.save(test1);
            testRepository.save(test2);
            testRepository.save(test3);
            
            System.out.println("초기 데이터가 생성되었습니다.");
        }
    }
} 