/**
 * code based off of https://www.bezkoder.com/spring-boot-mongodb-crud/
 * @author Zachary Levine
 */

package com.example.soen341.Controllers;

import com.example.soen341.Model.User;
import com.example.soen341.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;






// insert whatever port your test server loads.
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8081"})
@RestController
@RequestMapping("/api")




class UserController{
    @Autowired 
    UserRepository uRepo;

    @PostMapping("/New_User")
    public ResponseEntity<User> createUser(@RequestBody User user){
        try{
            User newUser = uRepo.save(new User(user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getCreated()));
            return new ResponseEntity<>(newUser,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/New_User")
    public ResponseEntity<Boolean> checkUniqueUsername(@RequestParam String username) {
        try {
            User usersByname = uRepo.findByUsername(username);
            if (usersByname == null){
                return new ResponseEntity<>(true,HttpStatus.OK);
            }
            else{
                //i'm not sure what to put for repeated usernames;
                return new ResponseEntity<>(false,HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/New_User")
    public ResponseEntity<Boolean> checkUniqueEmail(@RequestParam String email) {
        try {
            User usersByname = uRepo.findByEmail(email);
            if (usersByname == null){
                return new ResponseEntity<>(true,HttpStatus.OK);
            }
            else{
                //i'm not sure what to put for repeated usernames;
                return new ResponseEntity<>(false,HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/login")
    public ResponseEntity<String> getPassword(String usr_eml){
        try {
            User user = usr_eml.contains("@") ? uRepo.findByEmail(usr_eml):uRepo.findByUsername(usr_eml);
            if (user == null){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{
                return new ResponseEntity<>(user.getPassword(),HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
