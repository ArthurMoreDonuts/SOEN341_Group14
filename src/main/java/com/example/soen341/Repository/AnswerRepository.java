package com.example.soen341.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import com.example.soen341.Model.Answer;
public interface AnswerRepository
        extends MongoRepository<Answer, String> {

    List<Answer> findByAuthor(String author);
    List<Answer> findByQuestionId(String questionId);
    long deleteByQuestionId(String questionId);


}