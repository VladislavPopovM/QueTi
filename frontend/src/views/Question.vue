<template>
  <div class="single-question mt-2">
    <div v-if="question" class="container">
     <h1> {{ question.content }} </h1>
     <p>Posted by: <span class="question-author">{{ question.author }}</span></p>
     <p> {{ question.created_at }} </p>
     <hr>
     <div v-if="userHasAnswered">
       <p class="answer-added"> You've written an answer! </p>
     </div>
     <div v-else-if="showForm">
       <form class="card" @submit.prevent="onSubmit">
         <div class="card-header px-3"> Answer the Que</div>
         <div class="card-block">
           <textarea 
           v-model="newAnswerBody" 
           rows="5"
           cols="50"
           placeholder="Share"
           ></textarea>
           <div class="card-footer px-3">
             <button type="submit" class="btn btn-sm btn-success"> Submit </button>
           </div>
         </div>
       </form>
       <p v-if="error"> {{ error }}}</p>
     </div>
     <div v-else>
       <button class="btn btn-sm btn-success" @click="showForm = true" >Answer the Que</button>
     </div>
     <hr>
    </div>
    <div v-else>
      <h1 id="notfound">Question Not Found</h1>
    </div>
    <div v-if="question" class="container">
      <AnswerComponent 
      v-for="answer in answers"
      :answer="answer"
      :requestUser = "requestUser"
      :key="answer.id"
      @delete-answer = "deleteAnswer"
      />
    <div class="my-4">
          <p v-show="loadingAns">...loading...</p>
          <button 
          v-show="next" 
          @click="getQuestionAnswers" 
          class="btn btn-sm btn-outline-success"
          >Load More</button>
      </div>
      </div>
  </div>
</template>

<script>
import { apiService } from '@/common/api.service';
import AnswerComponent from "@/components/Answer.vue";
export default {
  name: "Question",
  props: {
    slug: {
        type: String,
        required: true,
    }
  },
  components:{
    AnswerComponent
  },
  data(){
      return{
          question: {},
          answers: [],
          newAnswerBody: null,
          error: null,
          userHasAnswered: false,
          showForm: false,
          next: null,
          loadingAns: false,
          requestUser: null,
      }
  },
  methods:{
    setPageTitile(title){
      document.title = title
    },
    setRequestUser(){
      this.requestUser = window.localStorage.getItem('username')
    },
    getQuestionData(){
      let endpoint = `/api/questions/${this.slug}/`;
      apiService(endpoint)
          .then(data => {
            if(data) {
              this.question = data;
              this.userHasAnswered = data.user_has_answered;
              this.setPageTitile(data.content);
            } else {
              this.question = null;
              this.setPageTitile("404 - Page Not Found")
            }
          })
    },
  getQuestionAnswers(){
    let endpoint = `/api/questions/${this.slug}/answers/`;
    if(this.next){
      endpoint = this.next
    }
    this.loadingAns = true
      apiService(endpoint)
          .then(data => {
              this.answers.push(...data.results);
              this.loadingAns = false
              if(data.next){
                this.next = data.next
              }else {
                this.next = null
              }
          })
    },
    onSubmit(){
      if(this.newAnswerBody){
        let endpoint = `/api/questions/${this.slug}/answer/`;
        apiService(endpoint, "POST", {body: this.newAnswerBody})
          .then(data => {
            this.answers.unshift(data)
          })
          this.newAnswerBody = null
          this.showForm = false
          this.userHasAnswered = true
          if(this.error){
            this.error = null
          }
      }else{
        this.error = "You cant send an empty answer"
      }
    },

    async deleteAnswer (answer){
      let endpoint = `/api/answers/${answer.id}/`;
      try {
        await apiService(endpoint, "DELETE")
        this.$delete(this.answers, this.answers.indexOf(answer))
        this.userHasAnswered = false;
      }
      catch (err) {
        console.log(err)
      }
    }
  },
  created() {
      this.getQuestionData()
      this.getQuestionAnswers()
      this.setRequestUser()
  }
};
</script>

<style scoped>
  .question-author{
    font-weight: bold;
    color: red;
  }

  .answer-added{
    font-weight: bold;
    color:rgb(22, 182, 22);
  }

  #notfound{
    color: red;
    text-align: center;
  }
</style>