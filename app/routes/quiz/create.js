import Ember from 'ember';
import { computed } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { validatePresence } from 'ember-changeset-validations/validators';
import { task } from 'ember-concurrency';

export default Ember.Route.extend({

	//	notifications: Ember.inject.service('notification-messages'),
		quizService: Ember.inject.service('quiz'),
		quiz:null,
		changeset:null,
		tableSchema:[{ label: 'Name',		className:'time', sortable: true,	      valuePath: 'name',	     width: '20%'	    },
								{ label: 'Subject',	className:'time',	  sortable: true,	      valuePath: 'subject',     width: '30%'	    },
								{ label: 'From',	className:'time',	  sortable: true,	      valuePath: 'fromDateTime' , width: '20%'	,format:function(value){ return new Date(value);}},
								 { label: 'To',		className:'time',    sortable: true,	      valuePath: 'toDateTime',	width: '20%'	,format:function(value){  return new Date(value);}   }],

	model() {
        return this.store.createRecord('quiz');
    },
	init() {
 		 this._super(...arguments);

 	 },

	setupController: function(controller, model) {
        this._super(controller, model);
				let validators ={
						name:[validatePresence(true)],
						subject:[validatePresence(true)],
						marks:[validatePresence(true)],
						passingRules:[validatePresence(true)],					
						questions:[validatePresence(true)]
				};
				model.set('fromDateTime',new Date());
				model.set('toDateTime',new Date());
			
				let changeset = new Changeset(model, lookupValidator(validators), validators);
				controller.set('changeset',changeset);
				 controller.set('tableSchema', this.tableSchema);
		 		  let quizs = this.store.findAll('quiz');
		 			controller.set('rows',quizs);
	},

	actions: {
		quizClick(row){
			var user = this.contextService.getLoginUser();
			console.log(user);
			console.log(row.get('createdByEmail'));
			if(user.email ===row.get('createdByEmail')){
				this.transitionTo('quiz.play',row.get('id'));
			}else{
				this.transitionTo('quiz.play',row.get('id'));
			}

		},
		cancelAction(){
				this.transitionTo('quiz.grid');
		},	
	}

});
