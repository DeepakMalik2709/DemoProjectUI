import Ember from 'ember';

export default Ember.Route.extend({

	answeredQuesStore:Ember.inject.service('answered-question'),
	

	model(params) {


		 return    this.store.find('quiz',params.quizId);
   },
	actions:{
		saveAnsweredQuestion(answeredQ){
			answeredQ.quiz={'id':this.get('model.id')};
			this.get('answeredQuesStore').saveAnsweredQuestion(answeredQ);
		}

	}
});
