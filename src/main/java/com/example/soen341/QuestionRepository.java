package com.example.soen341;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository
        extends MongoRepository<Question, String> {
}

