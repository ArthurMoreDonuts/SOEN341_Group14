package com.example.soen341.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Vote {
    @Id
    private String id;
    private String answerId;
    private int count;
    private String users;
    private List<String> usersList;

    public Vote(String answerId, int count, String users) {
        this.answerId = answerId;
        this.count = count;
        this.users = users;
        this.usersList = new ArrayList<>();
    }
}
