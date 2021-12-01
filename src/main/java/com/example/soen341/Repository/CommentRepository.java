package com.example.soen341.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import com.example.soen341.Model.Comment;
public interface CommentRepository
        extends MongoRepository<Comment, String> {

    List<Comment> findByAuthor(String author);
    List<Comment> findByAnswerId(String answerId);
    long deleteByAnswerId(String answerId);


}