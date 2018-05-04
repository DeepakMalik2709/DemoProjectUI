import Ember from 'ember';

export default Ember.Route.extend({

	quizService: Ember.inject.service('quiz'),
	model() {
        return this.store.createRecord('quiz');
    },
		init() {
 		 this._super(...arguments);
 	 },
	setupController: function(controller, model) {
        this._super(controller, model);
    },
    actions: {
			saveQuiz(quiz) {
				 console.log(quiz.toJSON());
				this.get('quizService').saveQuiz(quiz).then((result)=>{
							if(result.code == 0){
			//						this.get('notifications').setDefaultAutoClear(true);
			//				 this.get('notifications').info('Quiz saved successfully.');
									this.transitionTo('quiz.grid');
						}else{
				//			this.get('notifications').setDefaultAutoClear(true);
					//	 this.get('notifications').info('Oop some error ! Please contact to admin .');

						}
					});
			}
		}

});
