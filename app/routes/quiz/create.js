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
						fromDateTime:[validatePresence(true)],
						toDateTime:[validatePresence(true)],
						selectedGroups:[validatePresence(true)],
						selectedques:[validatePresence(true)]
				};
				model.set('fromDateTime',new Date());
				model.set('toDateTime',new Date());
				let changeset = new Changeset(model, lookupValidator(validators), validators);
				controller.set('changeset',changeset);
				 controller.set('tableSchema', this.tableSchema);
		 		  let quizs = this.store.findAll('quiz');
		 			controller.set('rows',quizs);
	},
	
	validate: task(function * () {
		yield this.get('changeset').validate();
	  }),
	
	  canSubmit: computed('changeset.isValid', function () {
		return this.get('changeset.isValid');
	  }).readOnly(),
	
	  //isValid: computed.and('changeset.isValid'),
	
	  save: task(function * () {
	
		let programLruTypeChangeset = this.get('programLruTypeChangeset');
		if (programLruTypeChangeset.get('isDirty')) {
		  yield this.get('saveChangeset').perform(programLruTypeChangeset, this.get('customerProgramLruType'));
		}
	  }),

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
			submit() {
				this.get('changeset').validate();
				if (this.get('changeset.isValid')) {
				  this.get('save').perform()
					.then(() => {
					  this._onSaveSuccess();
					})
					.catch((e) => {
					  this._onSaveFail(e);
					});
				}

				 console.log(quiz.toJSON());

					for(var i =0 ;i < selGrp.length ;i++){
						quiz.get("groups").pushObject(selGrp[i].id);
					}
					for(var i =0 ;i < selQue.length ;i++){
						quiz.get("questions").pushObject({"id":selQue[i].id});
					}
 				this.get('quizService').saveQuiz(quiz).then((result)=>{
							if(result.code == 0){
						//		this.get('notifications').setDefaultAutoClear(true);
						//	 this.get('notifications').success('Quiz saved successfully.');
									this.transitionTo('quiz.grid');
						}else{
						//	this.get('notifications').setDefaultAutoClear(true);
						// this.get('notifications').success('Oop some error ! Please contact to admin .');

						}
					});
			}
		}

});
