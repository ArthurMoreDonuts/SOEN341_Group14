package com.example.soen341;



import org.junit.jupiter.api.Test;
import com.example.soen341.Model.Question;
import com.example.soen341.Model.User;
import com.example.soen341.Model.Vote;


import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ContextConfiguration
public class Tests {
    @LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void PostQuestionExists() throws Exception {
		// testing that someone can post questions exist.
		assertThat(this.restTemplate.postForEntity("http://localhost:" + port + "/"
        +"api/Questions", new Question("test", "test", "test"), String.class)).isNotNull();
	}


	@Test
	public void QuestionExists() throws Exception {
		// testing that some questions exist.
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/"
        +"api/Questions",
				String.class)).isNotNull();
	}

	@Test
	public void UnasweredQuestionExists() throws Exception {
		// testing that unaswered questions are stored.
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/"
        +"api/Unanswered",
				String.class)).isNotNull();
	}

	@Test
	public void answersFromQuestionExists() throws Exception {
		// testing non existing answers don't exist
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/"
        +"api/Questions/alpha/Answers",
				String.class)).isNull();
	}


	@Test
	public void testUniqueUserName() throws Exception{
		// testing known username
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/"
        +"api/New_User/Uname?username=Youngest%20Oldman",
				String.class)).contains("true");
	}

	@Test
	public void createUser() throws Exception{
		assertThat(this.restTemplate.postForEntity("http://localhost:" + port + "/"
        +"api/New_User", new User("test", "test", "test"), String.class)).isNotNull();
	}

	@Test
	public void upVote() throws Exception{
		// should return error;
		ResponseEntity check = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		assertThat(this.restTemplate.postForEntity("http://localhost:" + port + "/"
        +"api/Answers/Vote", new Vote("", 3, null), String.class)== check) ;
	}

	@Test
	public void loginCheck() throws Exception{
		// should fail because earlier check
		ResponseEntity check = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		assertThat(this.restTemplate.postForEntity("http://localhost:" + port + "/"
        +"api/login", new User("hello", "world", "nothing"), String.class)== check) ;
	}

	@Test
	public void FindbyFakeAuthor() throws Exception{
		//should return nothing because no author
		ResponseEntity check = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		assertThat(this.restTemplate.getForEntity("http://localhost:" + port + "/"
        +"/Answers/auth/FakeAuthor", String.class) == check);
	}

}
