package com.example.soen341.Controllers;

import java.util.ArrayList;

import com.example.soen341.Model.User;
import com.example.soen341.Model.Vote;
import com.example.soen341.Repository.UserRepository;
import com.example.soen341.Repository.VoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8081"})
@RestController
@RequestMapping("/api")


public class VoteController {
    @Autowired
    VoteRepository vRepo;
    UserRepository uRepo;

    /**
     * 
     * @param vote the new vote object Assumes if the vote is toggled the vote counter
     * is updated accordingly. the stored state should toggle.
     * @return the new stored vote or error
     */
    @PutMapping("/Questions/{id}")
    public ResponseEntity<Vote> createVote(@RequestBody Vote vote){
        try {
            Vote vote_ = vRepo.findByAnswerId(vote.getAnswerId());
            User usr = uRepo.findByUsername(vote.getUsers());
            if (vote_ == null){
                int count = vote.getCount();
                vote_ = new Vote(vote.getAnswerId(), count, vote.getUsers());
                if (count>0){
                    ArrayList<Vote> votes = usr.getUpVotes();
                    votes.add(vote_);
                    usr.setUpVotes(votes);
                    votes = usr.getDownVotes();
                    if (votes.contains(vote_)){
                        votes.remove(vote_);
                        usr.setDownVotes(votes);
                    }
                }
                else{
                    ArrayList<Vote> votes = usr.getDownVotes();
                    votes.add(vote_);
                    usr.setDownVotes(votes);
                    votes = usr.getUpVotes();
                    if (votes.contains(vote_)){
                        votes.remove(vote_);
                        usr.setUpVotes(votes);
                    }
                }
                return new ResponseEntity<>(vRepo.save(vote_),HttpStatus.OK);
            }
            else{
                int count = vote.getCount();
                int oldCount = vote_.getCount();
                if (oldCount>count){
                    ArrayList<Vote> votes = usr.getUpVotes();
                    votes.add(vote_);
                }
                else{
                    ArrayList<Vote> votes = usr.getDownVotes();
                    votes.add(vote_);
                }
                vote_.setCount(count);
                vote_.setUsers(vote.getUsers());
                return new ResponseEntity<>(vRepo.save(vote_),HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     * @param username the user who is viewing the answer 
     * @param vote the current vote status of the answer 
     * @return if the user has either upvoted downvoted or not voted or server error.
     */
    @GetMapping("/Questions/{id}")
    public ResponseEntity<String> UpOrDown(String username,@RequestBody Vote vote){
        try{
            User usr = uRepo.findByUsername(username);
            ArrayList<Vote> upvotes = usr.getUpVotes();
            ArrayList<Vote> downvotes = usr.getDownVotes();

            if (upvotes.contains(vote)){
                return new ResponseEntity<>("Up",HttpStatus.OK);
            }
            else if (downvotes.contains(vote)){
                return new ResponseEntity<>("Down",HttpStatus.OK);
            }
            return new ResponseEntity<>("None",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
