<template>
  <div class="container mt-2">
      <h1>Ask a Question</h1>
      <form @submit.prevent="onSubmit">
          <textarea 
           v-model="question_body"
           rows="3" 
           class="form-control"
           placeholder="What do u want to ask?"
           >
           
           </textarea>
           <br>
           <button
            type="submit"
            class="btn btn-success"
           > Add
           </button>
      </form> 
      <p v-if="error" class="muted mt-2">
          {{ error }}
      </p>
  </div>
</template>

<script>
import { apiService } from '../common/api.service';
export default {
  name: "QuestionEditor",
  props: {
    slug: {
      type: String,
      required: false
    }
  },
  data(){
      return{
          question_body: null,
          error: null
      }
  },
  methods:{
    onSubmit(){
        if(!this.question_body){
            this.error = "You can't send an empty question!";
        }else if(this.question_body.length >240){
            this.error = "A lot sybmols";
        }else{
            let endpoint = "/api/questions/";
            let method = "POST";
            apiService(endpoint, method, { content: this.question_body })
                .then(question_data => {
                    this.$router.push({ 
                      name: 'Question', 
                      params: { slug: question_data.slug }
            })          
          })
        }
    }
  },
  created(){
      document.title = 'Editor - Queti'
  }
};
</script>