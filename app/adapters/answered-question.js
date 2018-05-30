import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  pathForType: function() {
    return '/rest/anweredQuestion';
  },

  createRecord: function(store, type, snapshot) {
    return this.upsert(store, type, snapshot);
  },
   updateRecord: function(store, type, snapshot) {
      return this.upsert(store, type, snapshot);
    },

   upsert :  function(store, type, snapshot) {
       var json = this.serialize(snapshot, { includeId: true });
       return new Ember.RSVP.Promise((resolve, reject) =>{
         var url = '/rest/secure/group/post';
         this.doPost(url , json).then(function(data) {
           Ember.run(null, resolve, data.item);
         }, function(jqXHR) {
           jqXHR.then = null; // tame jQuery's ill mannered promises
           Ember.run(null, reject, jqXHR);
         });
       });
     },
});
