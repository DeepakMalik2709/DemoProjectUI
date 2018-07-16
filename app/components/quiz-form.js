import Ember from 'ember';
import { task } from 'ember-concurrency';
import { warn, assert } from '@ember/debug';

export default Ember.Component.extend({

  quesService: Ember.inject.service('question'),
  groupService: Ember.inject.service('group'),
  contextService: Ember.inject.service('context'),
  shareWithSet:true,
  myShareWith:['PRIVATE','PUBLIC','GROUP','OTHER'],
  willInsertElement() {
    this.get('setupOptions').perform();
  },

  didReceiveAttrs() {

   assert('quiz/quiz-form: Must pass isAdd parameter', this.get('isAdd') === true || this.get('isAdd') === false);
 },

 setupOptions: task(function* (reload = false) {
   let request = this.get('groupService').fetchMyGroups();
      request.then((response) => {
        var adminGroups =(false)? response.filterBy("isAdmin", true) : response;

        if(adminGroups.length){
          this.set("myGroups" ,adminGroups );
        }else{
          alert("You can quiz to groups where you are admin");
        }
      });

      let quesRequest = this.get('quesService').fetchmyQuestions();
      quesRequest.then((response) => {
          this.set("myQuestions",response);
      });
    }),

    actions:{
      includeTimeLine(){
         this.item.set("withTime",!this.item.get("withTime"));
       },
       shareWithSet(share){
           this.set("shareWithGroup", (share=='GROUP'));
       },
       saveQuiz(quiz,selGrp,selQue) {
           for(var i =0 ;i < selGrp.length ;i++){
             quiz.get("groups").pushObject(selGrp[i].id);
           }
           for(var i =0 ;i < selQue.length ;i++){
             quiz.get("questions").pushObject({"id":selQue[i].id});
           }
           this.sendAction('saveQuiz', quiz);
       }
    }
});
