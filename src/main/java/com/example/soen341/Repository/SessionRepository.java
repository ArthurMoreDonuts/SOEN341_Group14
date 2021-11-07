package com.example.soen341.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import com.example.soen341.Model.Session;
import com.example.soen341.Model.User;

public interface SessionRepository
        extends MongoRepository<Session, String> {
    List<Session> findByUser(User usr);


}
