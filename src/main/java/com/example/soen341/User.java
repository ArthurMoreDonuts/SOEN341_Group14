package com.example.soen341;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class User {

    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private LocalDateTime created;

    public User(String username, String email, String password, LocalDateTime created) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.created = created;
    }
}
