/**
 * code based off of https://www.bezkoder.com/spring-boot-mongodb-crud/
 * @author Zachary Levine
 */

package com.example.soen341.Controllers;

import com.example.soen341.Model.Answer;
import com.example.soen341.Model.Question;
import com.example.soen341.Repository.AnswerRepository;
import com.example.soen341.Repository.QuestionRepository;

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


import java.util.List;
import java.util.Optional;



// insert whatever port your test server loads.
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8081"})
@RestController
@RequestMapping("/api")




class AnswerController{
    @Autowired 
    AnswerRepository answerRepo;

    @Autowired
    QuestionRepository qRepo;

    /**
     * 
     * @param qId Uri question id
     * @return Http request list of answers or errors
     */
    @GetMapping("/Questions/{id}/Answers")
    public ResponseEntity <List<Answer>> getAnswersByQuestionId(@PathVariable("id") String qId){
        try{
            List<Answer> rAnswer = answerRepo.findByQuestionId(qId);
            if (rAnswer.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{
                return new ResponseEntity<>(rAnswer,HttpStatus.OK);
            }
        } catch (Exception e){
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       
    }

    /**
     * 
     * @param aId the Id of the specific answer
     * @return the specific answer requested or erros
     */
    @GetMapping("/Answers/{ansId}")
    public ResponseEntity <Answer> getAnswersById(@PathVariable("ansId") String aId){
        try{
            Optional<Answer> rAnswer = answerRepo.findById(aId);
            if (rAnswer.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{
                return new ResponseEntity<>(rAnswer.get(),HttpStatus.OK);
            }
        } catch (Exception e){
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       
    }

    /**
     * 
     * @param user all answers from the specific author
     * @return
     */
    @GetMapping("/Answers/auth/{author}")
    public ResponseEntity<List<Answer>> getAnswersByAuthor(@PathVariable String user){
        try{
            List<Answer> aList = answerRepo.findByAuthor(user);
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
     * @param answer the answer sent in by the front end
     * @return either the answer is created or the server had errors.
     */
    @PostMapping("/Questions/{id}/Answers")
    public ResponseEntity<Answer> postAnswer(@RequestBody Answer answer){
        try{
            Answer answeredQuestion = answerRepo.save(new Answer(answer.getQuestionId(),
                answer.getAuthor(),
                answer.getResponse()
               ));
            
            Optional<Question> QbyId = qRepo.findById(answeredQuestion.getQuestionId());
            //TODO Warning:(181, 32) 'Optional.get()' without 'isPresent()' check
            Question q = QbyId.get();
            q.setAnswered(true);
            qRepo.save(q);
            return new ResponseEntity<>(answeredQuestion,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     * @param ansId the id of the answer form the uri
     * @param answer the edited answer from the front end
     * @return either the updated answer or an error.
     */
    @PutMapping("/Answers/{ansId}")
    public ResponseEntity<Answer> editAnswer(@PathVariable("ansId") String ansId,@RequestBody Answer answer){

        Optional<Answer> rAnswer = answerRepo.findById(answer.getId());
        if (rAnswer.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            Answer answer_ = rAnswer.get();
            answer_.setResponse(answer.getResponse());
            answer_.setCreated(answer.getCreated());
            return new ResponseEntity<>(answerRepo.save(answer_),HttpStatus.OK);
        }
    }

    /**
     * 
     * @param aId the id of the answer from the uri
     * @return nothing or error
     */
    @DeleteMapping("/Answers/{ansId}")
    public ResponseEntity<HttpStatus> deleteAnswerById(@PathVariable("ansId") String aId){
        try {
            answerRepo.deleteById(aId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    /**
     * 
     * @param qId the id of the question 
     * @return nothing or server error
     */
    @DeleteMapping("/Questions/{id}/Answers")
    public ResponseEntity<HttpStatus> deleteAnswerByQuestion(@PathVariable String qId){
        try {
            answerRepo.deleteByQuestionId(qId);
            Optional<Question> QbyId = qRepo.findById(qId);
            // TODO Warning:(181, 32) 'Optional.get()' without 'isPresent()' check
            Question q = QbyId.get();
            q.setAnswered(false);
            qRepo.save(q);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

}
