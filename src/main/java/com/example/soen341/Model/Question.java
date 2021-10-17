package com.example.soen341.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Question {
    @Id
    private String id;
    private String author;
    private String title;
    private String description;
    private LocalDateTime created;

    public Question(String author, String title, String description, LocalDateTime created) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.created = created;
    }

}
