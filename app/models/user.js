import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	dbFields : ["firstName", "lastName", "password" , "sendGroupPostEmail" ,
	            "sendGroupPostMentionEmail" , "sendPostCommentedEmail",
	            "sendCommentMentiondEmail" , "sendCommentOnMentiondPostEmail",
	            "sendCommentReplyEmail", "sendCommentOnCommentEmail"],
	lastName: DS.attr('string'),
	firstName: DS.attr('string'),
	dob: DS.attr('string'),
	email: DS.attr('string'),
	homeTown: DS.attr('string'),
	currentCity: DS.attr('string'),
	phoneNumber: DS.attr('number'),
	about: DS.attr('string'),

	userId: DS.attr('number'),

	hasEditAccess: DS.attr('boolean'),

	password: DS.attr('string'),
	password2: DS.attr('string'),
	useGoogleDrive : DS.attr('boolean'),
	sendGroupPostEmail : DS.attr('boolean'),
	sendGroupPostMentionEmail : DS.attr('boolean'),
	sendPostCommentedEmail : DS.attr('boolean'),
	sendCommentMentiondEmail : DS.attr('boolean'),
	sendCommentOnMentiondPostEmail : DS.attr('boolean'),
	sendCommentReplyEmail : DS.attr('boolean'),
	sendCommentOnCommentEmail : DS.attr('boolean'),
	googleDriveMsgDate : DS.attr('number'),
	refreshTokenAccountEmail: DS.attr('string'),
	institutes: DS.attr( {
		    defaultValue() { return []; }
		  }),
	instituteMembers: DS.attr( {
	    defaultValue() { return []; }
	  }),

	  certificates: DS.hasMany('certificate', {inverse: 'user', async: true, polymorphic: true}),

	  isValidFirstName: Ember.computed.notEmpty('firstName'),
	  isValidLastName: Ember.computed.notEmpty('lastName'),
	  isPasswordNotEmpty :  Ember.computed.notEmpty('password'),
	  doPasswordsNotMatch :  Ember.computed('password', 'password2', function() {
		    return (this.get('password') != this.get('password2'));
	  }),
	  
	  isInValidPassword : Ember.computed.and('isPasswordNotEmpty' , 'doPasswordsNotMatch'),
	  isValidPassword : Ember.computed.not('isInValidPassword'),
	  isValid : Ember.computed.and("isValidFirstName","isValidLastName","isValidPassword"),
	  
	  isEmptyFirstName: Ember.computed.empty('firstName'),
	  isEmptyLastName: Ember.computed.empty('lastName'),

	  isDisabled: Ember.computed.or('isEmptyFirstName', 'isEmptyLastName'),
	  
	  save: function(){
	      var data = JSON.stringify(this.getProperties.apply(this, this.dbFields));
	      return Ember.$.when(
					Ember.$.ajax({
					"url" : '/rest/secure/profile',
					method : "POST",
					contentType : "application/json;charset=UTF-8",
					data : data
					})
				);
	    }
});
