package com.example.soen341.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
public class Answer {
    @Id
    private String id;
    private String questionId;
    private String author;
    private String response;
    private LocalDateTime created;
    private Vote voteObject;
    private List<Comment> commentsList;
    private int comments; 

    public Answer(String questionId, String author, String response) {
        this.questionId = questionId;
        this.author = author;
        this.response = response;
        this.created = LocalDateTime.now();
        this.voteObject = new Vote(questionId,0,"");


    }
}
