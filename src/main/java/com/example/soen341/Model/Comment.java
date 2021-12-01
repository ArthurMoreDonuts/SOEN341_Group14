package com.example.soen341.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Comment {
    @Id
    private String id;
    private String answerId;
    private String author;
    private String response;
    private LocalDateTime created;

    public Comment(String answerId, String author, String response) {
        this.answerId = answerId;
        this.author = author;
        this.response = response;
        this.created = LocalDateTime.now();
    }
}

