/**
 * code based off of https://www.bezkoder.com/spring-boot-mongodb-crud/
 * @author Zachary Levine
 */

package com.example.soen341.Controllers;

import com.example.soen341.Model.User;
import com.example.soen341.Model.Session;
import com.example.soen341.Repository.SessionRepository;
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



import java.util.List;
import java.util.ArrayList;
import java.util.Optional;


// insert whatever port your test server loads.
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8081"})
@RestController
@RequestMapping("/api")




class UserController{
    @Autowired 
    UserRepository uRepo;
    SessionRepository sRepo; 

    @PostMapping("/New_User")
    public ResponseEntity<User> createUser(@RequestBody User user){
        try{
            User newUser = uRepo.save(new User(user.getUsername(),
                user.getEmail(),
                user.getPassword()
               ));
            return new ResponseEntity<>(newUser,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/New_User/Uname")
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

    @GetMapping("/New_User/Email")
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

    @PostMapping("/login")
    public ResponseEntity<List<String>> getUser(@RequestBody User usr){
        try {
            String usr_eml = usr.getUsername();

            User user = usr_eml.contains("@") ? uRepo.findByEmail(usr_eml):uRepo.findByUsername(usr_eml);

            if (user == null){
                System.out.println("user is null");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (user.getPassword().equals(usr.getPassword())){ //fixed the comparison for passwords

                ArrayList<String> retObj = new ArrayList<String>(); 
              //  Session sesh = new Session(user);
              //  sRepo.insert(sesh);
                retObj.add(user.getUsername());
                retObj.add(user.getEmail());
                retObj.add(user.getId());

                return new ResponseEntity<>(retObj,HttpStatus.ACCEPTED);

            }
            else{

                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping ("/Session")
    public ResponseEntity<List<String>> getUserBySessionId(@RequestParam String seshId){
        try {
            Optional<Session> currentSession = sRepo.findById(seshId);
            if (currentSession.isPresent()){
                Session sesh = currentSession.get();
                User usr = sesh.getUsr(); 
                ArrayList<String> retObj = new ArrayList<String>();
                retObj.add(usr.getUsername());
                retObj.add(usr.getEmail());
                retObj.add(sesh.getId());
                return new ResponseEntity<>(retObj,HttpStatus.OK); 
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
