<template>
    <div class="single-answer">
        <p class="text-muted">
            <strong>{{answer.author}}</strong> &#8901; {{answer.created_at}}
        </p>
        <p>{{answer.body}}</p>
        <div v-if = "isAnswerAuthor">
            <router-link
            :to="{name: 'AnswerEditor', params: {id: answer.id}}"
            class="btn btn-sm btn-outline-secondary mr-1"
            > Edit </router-link>
            <button
            class="btn btn-sm btn-outline-danger"
            @click="triggerDeleteAnswer"
            >Delete
            </button>
        </div>
        <div v-else>
            
            <button
            class="btn btn-sm"
            @click="toggleLike"
            :class="{
                'btn-danger':userLikedAnswer,
                'btn-outline-danger': !userLikedAnswer,
            }"
            >
                <strong>Like {{ this.likesCounter }} </strong>
            </button>
        </div>
        <hr>
    </div>
</template>


<script>
import { apiService } from '@/common/api.service';

export default {
  name: "AnswerComponent",
  props: {
      answer: {
          type: Object,
          required: true,
      },
      requestUser:{
          type: String,
          required: true,
      }
  },
  data (){
      return {
          userLikeAnswer: this.answer.user_has_voted,
          likesCounter: this.answer.likes_count
      }
  },
  computed: {
      isAnswerAuthor() {
          return this.answer.author === this.requestUser;
      }
  },
  methods: {
      toggleLike(){
          this.userLikeAnswer === false
          ? this.LikeAnswer()
          : this.unLikeAnswer()
      }, 
      LikeAnswer (){
          this.userLikeAnswer = true
          this.likesCounter += 1
          let endpoint = `/api/answers/${ this.answer.id }/like/`
          apiService(endpoint,"POST")
      },   
      unLikeAnswer (){
        this.userLikeAnswer = false
        this.likesCounter -= 1
        let endpoint = `/api/answers/${ this.answer.id }/like/`
        apiService(endpoint,"DELETE")
      },
      triggerDeleteAnswer (){
          this.$emit("delete-answer", this.answer)
      }
  }
};
</script>
