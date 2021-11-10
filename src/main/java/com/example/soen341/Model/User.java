package com.example.soen341.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@Document
public class User {

    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    @Indexed(unique = true)
    private String email;
    private String password;
    private LocalDateTime created;
    private ArrayList<Vote> upVotes;
    private ArrayList<Vote> downVotes;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;

        this.created = LocalDateTime.now();
        upVotes = new ArrayList<Vote>();
        downVotes = new ArrayList<Vote>();
    }
}
