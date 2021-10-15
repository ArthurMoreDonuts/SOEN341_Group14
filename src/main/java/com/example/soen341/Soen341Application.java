package com.example.soen341;

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

	// Entering hardcoded data to the database

	@Bean
	CommandLineRunner runner(UserRepository repository){
		return args ->{
			User user = new User("Youngest Oldman","ahmed_hani_dawoud@hotmail.com","123456789", LocalDateTime.now());
			repository.insert(user);
		};
		}


	// Entering hardcoded data to the database
	Question question = new Question("Youngest Oldman", "Can we have more than one document type in a collection?", "As written in the title above", LocalDateTime.now());

	@Bean
	CommandLineRunner runner2(QuestionRepository repository){
		return args ->{
			repository.insert(question);

		};
	}
	// Entering hardcoded data to the database
	Answer answer;
	@Bean
	CommandLineRunner runner3(AnswerRepository repository){
		return args ->{
			answer= new Answer(question.getId(), "Youngest Oldman", "Google it bro", LocalDateTime.now());
			repository.insert(answer);

		};
	}

	// Entering hardcoded data to the database
	@Bean
	CommandLineRunner runner4(VoteRepository repository){
		return args ->{
			Vote vote = new Vote(answer.getId(), 0,"");
			repository.insert(vote);

		};
	}
}
