package com.example.soen341.Repository;

import com.example.soen341.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository
        extends MongoRepository<User, String> {
    User findByUsername(String username);
    User findByEmail(String email);
}
