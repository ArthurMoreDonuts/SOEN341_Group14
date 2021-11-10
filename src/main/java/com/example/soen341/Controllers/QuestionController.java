/**
 * code based off of https://www.bezkoder.com/spring-boot-mongodb-crud/
 * @author Zachary Levine
 */

package com.example.soen341.Controllers;


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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;



// insert whatever port your test server loads.
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8080"})
@RestController
@RequestMapping("/api")



/*
need to define custom urls
using /api/Questions for all questions
using /api/Questions/{id} for this specific question page
using /api/
*/
class QuestionController{
    @Autowired 
    QuestionRepository qRepo;

    @Autowired
    AnswerRepository aRepo;
    /**
     * 
     * @param title the search title of the question to be searched
     * if not present return the entire list of all questions
     * @return either the search list, the entire list or errors. 
     */
    @GetMapping("/Questions")
    public ResponseEntity <List <Question>> getAllQuestions(@RequestParam(required = false) String title){
        try{
            List<Question> qList = title==null ? qRepo.findAll():qRepo.findByTitleContaining(title);
            if (qList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else
                return new ResponseEntity<>(qList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     * @param id the id of the question from uri
     * @return either the question or error
     */
    @GetMapping("/Questions/{id}")
    public ResponseEntity <Question> getQuestionById(@PathVariable String id){
       // try{
            Optional<Question> rQuestion = qRepo.findById(id);
            if (rQuestion.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{
                return new ResponseEntity<>(rQuestion.get(),HttpStatus.OK);
            }
        /*
        } catch (Exception e){
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }*/

       
    }

    /**
     * 
     * @param author the author of all the questions to be returned
     * @return either the list of all the questions or error
     */
    @GetMapping("/Questions/auth/{author}")
    public ResponseEntity<List<Question>> getQuestionByAuthor(@PathVariable String author){
        try{
            List<Question> qList = qRepo.findByAuthor(author);
            if (qList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else
                return new ResponseEntity<>(qList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * 
     * @return returns all unanswered questions
     */
    @GetMapping("/Unanswered")
    public ResponseEntity<List<Question>> getUnansweredQuestions(){
        try {
            List<Question> allQuestions = qRepo.findByAnswered(false);
            if (allQuestions.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else{
                return new ResponseEntity<>(allQuestions,HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/Questions")
    public ResponseEntity<Question> postQuestion(@RequestBody Question question){
        try{
            Question question_ = qRepo.save(new Question(
                question.getAuthor(),
                question.getTitle(),
                question.getDescription()
               ));
            return new ResponseEntity<>(question_,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     * @param id the id of the question that is being edited from uri
     * @param question a new question object sent from the front end
     * @return
     */
    @PutMapping("/Questions/{id}")
    public ResponseEntity<Question> editQuestion(@PathVariable String id,@RequestBody Question question){

        Optional<Question> rQuestion = qRepo.findById(id);
        if (rQuestion.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            Question question_ = rQuestion.get();
            question_.setTitle(question.getTitle());
            question_.setDescription(question.getDescription());
            question_.setCreated(question.getCreated());
            return new ResponseEntity<>(qRepo.save(question_),HttpStatus.OK);
        }
    }


    /**
     * 
     * @param id the id of the question to be deleted
     * @return nothing or server error
     */
    @DeleteMapping("/Questions/{id}")
    public ResponseEntity<HttpStatus> deleteQuestionById(@PathVariable String id){
        try {
            qRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }


    /**
     *
     * @param qid the id of the question that is being edited from uri
     * @param aid the id of the answer that is being sent from uri
     * @return
     */
    @PostMapping("/Questions/{id}")
    public ResponseEntity<Question> selectedAnswerOfQuestion(@PathVariable String qid, @PathVariable String aid){

        Optional<Question> QbyId = qRepo.findById(qid);
        Question q;
        if (QbyId.isPresent())
            q= QbyId.get();
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        q.setAnswerSelected(true);
        q.setSelectedAnswerID(aid);
        qRepo.save(q);
        return new ResponseEntity<>(HttpStatus.OK);
        }




}
