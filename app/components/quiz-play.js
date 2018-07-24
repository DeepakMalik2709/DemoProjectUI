import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({

  questionsList :[],
  selectedQuestion:{},
  isPrevDisabled:false,
  questions:[],
  sortDefinition:['id:asc'],
  sortedQuestions: Ember.computed.sort('questions', 'sortDefinition'),
  answeredQuesStore: Ember.inject.service('answered-question'),
  answeredQuesList:[],
  init(){
	    this._super(...arguments);
      this.set('quizId',this.quizId);
      this.set('questions',this.items);
     
      this.setUpRecord();
  },
  setupOptions: task(function* (reload = false) {
    let querySelected =yield this.get('answeredQuesStore').queryAnsQues({quizId:this.quizId});  
      this.set('answeredQuesList',querySelected);

    let selectedQuestion=this.get('questions')[0];
    let selectedAnsQuestion = this.set('answeredQuesList').findBy('questionId',selectedQuestion.id);
    let selectedOption = selectedQuestion.get('options').findBy('id',selectedAnsQuestion.get('optionId'));
    if(selectedOption != null){
          selectedOption.set('selected',true);
    }
  }).restartable(),
  actions:{
    saveOption(question,option){

        let answeredQ = {
          questionTO:{'id':question.id},
          optionTO:{'id':option.id},
          quizTO:{'id':  this.get('quizId')}
        };
      //    this.sendAction('saveAnsweredQuestion', answeredQ);
        Ember.set(option,'selected', !option.selected);

    },
    setCurrentQuestion(question){
                 this.set('selectedQuestion',question);
    },
    previousQuestion(selectedQuestion){
        var selectedIndex=   this.get('questions').indexOf(selectedQuestion);
        var newIndex  = (selectedIndex+1)%this.get('questions').length;
        console.log(newIndex);
        this.set('selectedQuestion',this.get('questions')[newIndex]);
        setSelectedOption(this.get('selectedQuestion'));
    },
    nextQuestion(selectedQuestion){
      var selectedIndex=   this.get('questions').indexOf(selectedQuestion);
      var newIndex  = (selectedIndex-1+this.get('questions').length)%this.get('questions').length;
      console.log(newIndex);
      this.set('selectedQuestion',this.get('questions')[newIndex]);
      setSelectedOption(this.get('selectedQuestion'));
    },
  }
});
