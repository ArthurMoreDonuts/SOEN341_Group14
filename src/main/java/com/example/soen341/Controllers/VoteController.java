package com.example.soen341.Controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.soen341.Model.Answer;
import com.example.soen341.Model.Question;
import com.example.soen341.Model.User;
import com.example.soen341.Model.Vote;
import com.example.soen341.Repository.AnswerRepository;
import com.example.soen341.Repository.UserRepository;
import com.example.soen341.Repository.VoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8081"})
@RestController
@RequestMapping("/api")


public class VoteController {
    @Autowired
    VoteRepository vRepo;

    @Autowired
    UserRepository uRepo;

    @Autowired
    AnswerRepository aRepo;

    /**
     * 
     * @param vote the new vote object Assumes if the vote is toggled the vote counter
     * is updated accordingly. the stored state should toggle.
     * @return the new stored vote or error
     */
    @PutMapping("/Answers/Vote")
    public ResponseEntity<Vote> createVote(@RequestBody Vote vote){
        try {
            Vote vote_ = vRepo.findByAnswerId(vote.getAnswerId());
            User usr = uRepo.findByUsername(vote.getUsers());
            Optional<Answer> ansr = aRepo.findById(vote.getAnswerId());

            if (vote_ == null){
                int count = vote.getCount();
                vote_ = new Vote(vote.getAnswerId(), count, vote.getUsers());

                if (count>0){
                    List<String> newUsers;
                    newUsers = vote_.getUsersList();
                    newUsers.add(usr.getUsername());
                    vote_.setUsersList(newUsers);

                    ArrayList<Vote> votes = usr.getUpVotes();
                    votes.add(vote_);
                    usr.setUpVotes(votes);



                }
                else{
                    List<String> newUsers;
                    newUsers = vote_.getUsersList();
                    newUsers.remove(usr.getUsername());
                    vote_.setUsersList(newUsers);

                    ArrayList<Vote> votes = usr.getDownVotes();
                    votes.add(vote_);
                    usr.setDownVotes(votes);
                }
                uRepo.save(usr);

                //ANSWER STUFF
                Optional<Answer> AbyID = aRepo.findById(vote.getAnswerId());
                Answer answer;
                if (AbyID.isPresent())
                    answer= AbyID.get();
                else
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                answer.setVoteObject(vote_);
                aRepo.save(answer);

                //END ANSWER STUFF


                return new ResponseEntity<>(vRepo.save(vote_),HttpStatus.OK);
            }
            else{
                int count = vote.getCount();
                int oldCount = vote_.getCount();

                if (count>0){
                    List<String> newUsers;
                    newUsers = vote_.getUsersList();
                    newUsers.add(usr.getUsername());
                    vote_.setUsersList(newUsers);

                    ArrayList<Vote> votes = usr.getUpVotes();
                    votes.add(vote_);
                    votes = usr.getDownVotes();
                    oldCount++;
                    if (votes.contains(vote_)){
                        votes.remove(vote_);
                        usr.setDownVotes(votes);
                        oldCount++;
                    }
                    vote_.setCount(oldCount);
                }
                else{
                    List<String> newUsers;
                    newUsers = vote_.getUsersList();
                    newUsers.remove(usr.getUsername());
                    vote_.setUsersList(newUsers);

                    ArrayList<Vote> votes = usr.getDownVotes();
                    votes.add(vote_);
                    votes = usr.getUpVotes();
                    oldCount --;
                    if (votes.contains(vote_)){
                        votes.remove(vote_);
                        usr.setUpVotes(votes);
                        oldCount--;
                    }
                    vote_.setCount(oldCount);
                }
               // vote_.setCount(count);
                vote_.setUsers(vote.getUsers());
                uRepo.save(usr);

                //ANSWER STUFF
                Optional<Answer> AbyID = aRepo.findById(vote.getAnswerId());
                Answer answer;
                if (AbyID.isPresent())
                    answer= AbyID.get();
                else
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                answer.setVoteObject(vote_);
                aRepo.save(answer);

                //END ANSWER STUFF
                return new ResponseEntity<>(vRepo.save(vote_),HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     *
     * @param vote the current vote status of the answer 
     * @return if the user has either upvoted downvoted or not voted or server error.
     */
    @PostMapping("/Answers/Vote")
    public ResponseEntity<String> UpOrDown(@RequestBody Vote vote){
        try{
            String username = vote.getUsers();
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
