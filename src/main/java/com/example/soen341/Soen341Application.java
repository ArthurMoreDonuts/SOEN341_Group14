package com.example.soen341;

import com.example.soen341.Model.Answer;
import com.example.soen341.Model.Question;
import com.example.soen341.Model.User;
import com.example.soen341.Model.Vote;
import com.example.soen341.Repository.AnswerRepository;
import com.example.soen341.Repository.QuestionRepository;
import com.example.soen341.Repository.UserRepository;
import com.example.soen341.Repository.VoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class Soen341Application {

	public static void main(String[] args) {
		SpringApplication.run(Soen341Application.class, args);
	}

}
