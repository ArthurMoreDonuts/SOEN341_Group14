package com.example.soen341;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Answer {
    @Id
    private String id;
    private String questionId;
    private String author;
    private String response;
    private LocalDateTime created;

    public Answer(String questionId, String author, String response, LocalDateTime created) {
        this.questionId = questionId;
        this.author = author;
        this.response = response;
        this.created = created;
    }
}
