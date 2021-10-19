import http from "../http-common";

class DataService {
  getAllQuestions() {
    return http.get("/Questions");
  }

  getQuestion(id) {
    return http.get(`/Questions/{id}`);
  }

  getQuestionByAuthor(author) {
    return http.get(`/Questions/auth/{author}`);
  }

  getQuestionUnanswered() {
    return http.get("/Unanswered");
  }
  
  createQuestion(question) {
    return http.post("/Questions", question);
  }


  deleteQuestion(id) {
    return http.delete(`/Questions/${id}`);
  }

  
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new DataService();
