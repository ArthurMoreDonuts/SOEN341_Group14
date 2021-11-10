package com.example.soen341.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;




@Data
@Document
public class Session {
    
    @Id
    private String id; 
    private User usr;
    
    public Session(User usr){
        this.usr = usr;
    }


}
