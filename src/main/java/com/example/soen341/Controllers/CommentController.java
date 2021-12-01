/**
 * code based off of https://www.bezkoder.com/spring-boot-mongodb-crud/
 * @author Zachary Levine
 */

package com.example.soen341.Controllers;

import com.example.soen341.Model.Comment;
import com.example.soen341.Model.Answer;
import com.example.soen341.Repository.CommentRepository;
import com.example.soen341.Repository.AnswerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.joran.conditional.ElseAction;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;



// insert whatever port your test server loads.
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8081"})
@RestController
@RequestMapping("/api")




class CommentController{
    @Autowired 
    CommentRepository CommentRepo;

    @Autowired
    AnswerRepository answerRepo;

    /**
     * 
     * @param qId Uri Answer id
     * @return Http request list of Comments or errors
     */
    @GetMapping("/Answers/{id}/Comments")
    public ResponseEntity <List<Comment>> getCommentsByAnswerId(@PathVariable("id") String qId){
        try{
            List<Comment> rComment = CommentRepo.findByAnswerId(qId);
            if (rComment.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{
                return new ResponseEntity<>(rComment,HttpStatus.OK);
            }
        } catch (Exception e){
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       
    }

    /**
     * 
     * @param cId the Id of the specific Comment
     * @return the specific Comment requested or erros
     */
    @GetMapping("/Comments/{comId}")
    public ResponseEntity <Comment> getCommentsById(@PathVariable("comId") String cId){
        try{
            Optional<Comment> rComment = CommentRepo.findById(cId);
            if (rComment.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{
                return new ResponseEntity<>(rComment.get(),HttpStatus.OK);
            }
        } catch (Exception e){
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       
    }

    /**
     * 
     * @param author all Comments from the specific author
     * don't think this is necessary but its here
     * @return
     */
    @GetMapping("/Comments/auth/{author}")
    public ResponseEntity<List<Comment>> getCommentsByAuthor(@PathVariable String author){
        try{
            List<Comment> aList = CommentRepo.findByAuthor(author);
            if (aList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else
                return new ResponseEntity<>(aList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * 
     * @param Comment the Comment sent in by the front end
     * @return either the Comment is created or the server had errors.
     */
    @PostMapping("/Answers/Comments")
    public ResponseEntity<Comment> postComment(@RequestBody Comment Comment){
        try{
            Comment CommentedAnswer = CommentRepo.save(new Comment(Comment.getAnswerId(),
                Comment.getAuthor(),
                Comment.getResponse()
               ));
            System.out.println("Post Comment");
            
            Optional<Answer> aById = answerRepo.findById(CommentedAnswer.getAnswerId());
            
            Answer a;
            if (aById.isPresent())
                 a= aById.get();
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            a.setComments(a.getComments()+ 1);
            List<Comment> Comments = a.getCommentsList();
            if (Comments == null){
                Comments = new ArrayList<Comment>(); 
            }
            Comments.add(CommentedAnswer);
            a.setCommentsList(Comments);
            answerRepo.save(a);
            return new ResponseEntity<>(CommentedAnswer,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     * @param comId the id of the Comment form the uri
     * @param Comment the edited Comment from the front end
     * @return either the updated Comment or an error.
     */
    @PutMapping("/Comments/{comId}")
    public ResponseEntity<Comment> editComment(@PathVariable("comId") String comId,@RequestBody Comment Comment){

        Optional<Comment> rComment = CommentRepo.findById(Comment.getId());
        if (rComment.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            Comment Comment_ = rComment.get();
            Comment_.setResponse(Comment.getResponse());
            Comment_.setCreated(Comment.getCreated());
            return new ResponseEntity<>(CommentRepo.save(Comment_),HttpStatus.OK);
        }
    }

    /**
     * 
     * @param cId the id of the Comment from the uri
     * @return nothing or error
     */
    @DeleteMapping("/Comments/{comId}")
    public ResponseEntity<HttpStatus> deleteCommentById(@PathVariable("comId") String cId){
        try {
            Optional<Comment> cById = CommentRepo.findById(cId);
            if (cById.isPresent()){
                Comment comt = cById.get();
                Optional<Answer> abyId = answerRepo.findById(comt.getAnswerId());
                Answer a;
                if (abyId.isPresent()){
                     a= abyId.get();
                     a.setComments(a.getComments()-1);
                     answerRepo.save(a);
                    }
                else {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            CommentRepo.deleteById(cId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    /**
     * 
     * @param id the id of the Answer 
     * @return nothing or server error
     */
    @DeleteMapping("/Answers/{id}/Comments")
    public ResponseEntity<HttpStatus> deleteCommentByAnswer(@PathVariable String id){
        try {
            CommentRepo.deleteByAnswerId(id);
            Optional<Answer> QbyId = answerRepo.findById(id);
            Answer q;
            if (QbyId.isPresent())
                 q= QbyId.get();
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            q.setComments(0);
            answerRepo.save(q);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

}
