import Ember from 'ember';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { warn, assert } from '@ember/debug';
import { computed } from '@ember/object';

export default Ember.Component.extend({

  quesService: service('question'),
  groupService: service('group'),
  quizService: service('quiz'),
  notifications: service('notification-messages'),
  shareWithSet:true,
  shareWithOptions:['PRIVATE','PUBLIC','GROUP','OTHER'],
  willInsertElement() {
    this.get('setupOptions').perform();
  },

  didReceiveAttrs() {

   assert('quiz/quiz-form: Must pass isAdd parameter', this.get('isAdd') === true || this.get('isAdd') === false);
 },
 setupOptions: task(function* (reload = false) {
   // let changeset = this.get('changeset');   
   let request = this.get('groupService').fetchMyGroups();
      request.then((response) => {
        var adminGroups =(false)? response.filterBy("isAdmin", true) : response;

        if(adminGroups.length){
          this.set("groupOptions" ,adminGroups );
        }else{
          alert("You can quiz to groups where you are admin");
        }
      });

      let quesRequest = this.get('quesService').fetchmyQuestions();
      quesRequest.then((response) => {
          this.set("questionOptions",response);
      });
    }).restartable(),

  validate: task(function * () {
    yield this.get('changeset').validate();
    }),
  
  canSubmit: computed('changeset.isValid', function () {
    return this.get('changeset.isValid');
  }).readOnly(),
  
    //isValid: computed.and('changeset.isValid'),
  
  save: task(function * (quiz) {
    this.get('quizService').saveQuiz(quiz).then((result)=>{
      if(result.code != 0){
        let e = new Error("Message");
        this._onSaveFail(e);
       }else{
        this._onSaveSuccess();
        this.transitionTo('quiz.grid');
       }
    });
  }),
  _onSaveSuccess() {
    let lru = this.get('lru');
    this.get('notifications').success(' Quiz saved successfully.', {
        autoClear: true,
        clearDuration: 5000
      });       
  },

  _onSaveFail(e) {
    this.get('notifications').error('Error in save quiz.', {
        autoClear: true,
        clearDuration: 2500
    });
    throw e;
  },
  actions:{
    submit() {
      let changeset = this.get('changeset');
      changeset.validate();
      if (this.get('changeset.isValid')) {
        this.get('save').perform(changeset.get('quiz'));       
      }     
    }
  }
});
