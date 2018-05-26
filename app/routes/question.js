import Ember from 'ember';

export default Ember.Route.extend({

  quesService: Ember.inject.service('question'),


  model() {
    return {
      "id":123,
      "questionDescription":'Trees And Graphs',
      "options":[{"optionValue":"101","isCorrectAnswer":true},
      {"optionValue":"101","isCorrectAnswer":false},
      {"optionValue":"101","isCorrectAnswer":false},
      {"optionValue":"101","isCorrectAnswer":false}]
    }
    //return this.store.createRecord('question');
  },
	init() {
 		 this._super(...arguments);
 	},


  actions: {
			  addOption(){

        },
	}

});
