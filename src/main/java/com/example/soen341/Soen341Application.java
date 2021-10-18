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

	// Entering hardcoded data to the database

	@Bean
	CommandLineRunner runner(UserRepository repository){
		return args ->{
			User user = new User("Youngest Oldman","ahmed_hani_dawoud@hotmail.com","123456789");
		//	repository.insert(user);
		};
		}


	// Entering hardcoded data to the database
	Question question = new Question("Youngest Oldman", "Can we have more than one document type in a collection?", "As written in the title above");

	@Bean
	CommandLineRunner runner2(QuestionRepository repository){
		return args ->{
			//question.setAnswered(true);
			repository.insert(question);
			System.out.println(repository.findByTitleContaining("collection").size());

		};
	}
	// Entering hardcoded data to the database
	Answer answer;

	@Bean
	CommandLineRunner runner3(AnswerRepository repository){
		return args ->{

			answer = new Answer(question.getId(), "Youngest Oldman", "Google it bro");
			repository.insert(answer);
           // repository.findAnswerByQuestionId(question.getId()).ifPresentOrElse(answer1 -> {System.out.println(answer1 + " Already exist"); }, () -> {});
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
