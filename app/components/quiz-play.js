import Ember from 'ember';

export default Ember.Component.extend({

  questionsList :[],
  selectedQuestion:{},
  isPrevDisabled:false,
  questions:[],
  sortDefinition:['id:asc'],
  sortedQuestions: Ember.computed.sort('questions', 'sortDefinition'),

  init(){
	    this._super(...arguments);

      this.set('questions',this.items);
      this.set('selectedQuestion',this.get('questions')[0]);
  },
  actions:{
    saveOption(question,option){
        let answeredQ = {
          question:{'id':question.id},
          option:{'id':option.id}
        };
          this.sendAction('saveAnsweredQuestion', answeredQ);
    },
    setCurrentQuestion(question){
                 this.set('selectedQuestion',question);
    },
    previousQuestion(selectedQuestion){
        var selectedIndex=   this.get('questions').indexOf(selectedQuestion);
        var newIndex  = (selectedIndex+1)%this.get('questions').length;
        console.log(newIndex);
        this.set('selectedQuestion',this.get('questions')[newIndex]);
    },
    nextQuestion(selectedQuestion){
      var selectedIndex=   this.get('questions').indexOf(selectedQuestion);
      var newIndex  = (selectedIndex-1+this.get('questions').length)%this.get('questions').length;
      console.log(newIndex);
      this.set('selectedQuestion',this.get('questions')[newIndex]);
    },
  }
});
