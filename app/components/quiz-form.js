import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({

	groupService: Ember.inject.service('group'),

	quesService: Ember.inject.service('question'),
myQuestions:[],
selectedGroups:[],
myShareWith:['PRIVATE','PUBLIC','GROUP','OTHER'],
quiz:[],
shareWithGroup:false,
  init() {
		 this._super(...arguments);
    this.quiz = this.item;
      this.quiz.shareWith='PUBLIC';

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
  },
    actions: {
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
