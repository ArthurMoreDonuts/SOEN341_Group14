package com.example.soen341;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnswerRepository
        extends MongoRepository<Answer, String> {
}