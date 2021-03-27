<template>
  <div class="home">
    <div class="container">
      <div v-for="question in questions" :key="question.pk">
        <p>Posted by: <span class="question-author">{{question.author}}</span></p>
        <h2>
          <router-link
            :to="{ name: 'Question', params: { slug: question.slug } }"
            class="question-link"
            >{{ question.content }}
          </router-link>
        </h2>
        <p>Answers: {{question.answers_count}}</p>
        <hr>
      </div>
      <div class="my-4">
          <p v-show="loadingQue">...loading...</p>
          <button 
          v-show="next" 
          @click="getQuestions" 
          class="btn btn-sm btn-outline-success"
          >Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
import {apiService} from "../common/api.service"
export default {
  name: "Home",
  data(){
    return{
      questions: [],
      next: null,
      loadingQue: false,
    }
  },
  methods:{
    getQuestions(){
      let endpoint = '/api/questions/';
      if(this.next){
        endpoint = this.next
      }
      this.loadingQue = true
      apiService(endpoint)
        .then(data => {
          this.questions.push(...data.results)
          this.loadingQue = false
          if(data.next){
            this.next = data.next
          }else {
            this.next = null
          }
        })
    }
  },
  created() {

      this.getQuestions()
      console.log(this.questions)
      document.title = 'Queti'
  }
};
</script>

<style scoped>
  .question-author{
    font-weight: bold;
    color: red;
  }
  
  .question-link{
    font-weight: bold;
    color: black;
  }

  .question-link:hover{
    color: rgb(83, 83, 83);

    text-decoration: none;
  }
</style>