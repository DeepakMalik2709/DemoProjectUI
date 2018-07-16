import Ember from 'ember';

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
      let querySelected = this.get('answeredQuesStore').queryAnsQues({quizId:params.quizId});
      querySelected.then((res)=>{
        this.set('answeredQuesList',res);
      });
      this.setUpRecord();
  },
  setUpRecord:function(){
    this.set('selectedQuestion',this.get('questions')[0]);
    this.setSelectedOption(this.get('selectedQuestion'));
  },
  setSelectedOption:function(selectedQuestion){
    let selectedAnsQuestion = this.set('answeredQuesList').findBy('questionId',selectedQuestion.id);
    let selectedOption = selectedQuestion.get('options').findBy('id',selectedAnsQuestion.get('optionId'));
    if(selectedOption != null){
          selectedOption.set('selected',true);
    }
  },
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
