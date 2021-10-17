package com.example.soen341.Repository;

import com.example.soen341.Model.Vote;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VoteRepository
        extends MongoRepository<Vote, String> {
    Vote findByAnswerId(String answerId);
    Vote findByUsersContaining(String user);
}