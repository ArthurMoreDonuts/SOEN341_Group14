package com.example.soen341.Repository;


import com.example.soen341.Model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository
        extends MongoRepository<Question, String> {

    List<Question> findByAuthor(String author);
    List<Question> findByTitleContaining(String phrase);
    List<Question> findByAnswered(boolean answered);
}

