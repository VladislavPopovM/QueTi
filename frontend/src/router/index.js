import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import AnswerEditor from "../views/AnswerEditor.vue"
import PageNotFound from "../views/NotFound.vue"
import Question from "../views/Question.vue";
import QuestionEditor from "../views/QuestionEditor.vue"

Vue.use(Router);

export default new Router(
  {
    mode: "history",
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/question/:slug",
        name: "Question",
        component: Question,
        props: true
      },
      {
        path: "/ask/:slug?",
        name: "QuestionEditor",
        component: QuestionEditor,
        props: true
      },
      {
        path: "/answer/:id",
        name: "AnswerEditor",
        component: AnswerEditor,
        props: true
      },
      {
        path: "*",
        name: "PageNotFound",
        component: PageNotFound,
        props: true
      },
    ]
  }
);
