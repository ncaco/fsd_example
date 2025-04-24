package com.fsd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.fsd")
@EntityScan("com.fsd.model")
@EnableJpaRepositories(basePackages = {"com.fsd.common.oauth.repository"})
public class FsdApplication {

	public static void main(String[] args) {
		SpringApplication.run(FsdApplication.class, args);
	}

}
