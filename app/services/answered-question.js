import Ember from 'ember';
import DS from 'ember-data';
import ajaxMixin from '../mixins/ajax';

export default DS.Store.extend(ajaxMixin,{
  languages : [{id :  "ENGLISH", label : "English"} ,{id: "HINDI", label : "Hindi" }],
 items : [],
 init() {
    this._super(...arguments);
       this.set('items', []);
   },
   saveAnsweredQuestion:function(json){
 		return  new Ember.RSVP.Promise((resolve, reject) =>{
 			 var url = "/rest/anweredQuestion/upsert";
 			 this.doPost(url , json ).then((data ) =>{
 					 resolve(data);
 					 });
 		});
 	},
});
