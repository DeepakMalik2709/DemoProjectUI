import DS from 'ember-data';

export default DS.Model.extend({
	dbFields : ["id","description","title", "tag" , "marks", "type", "number", "options"],

	questionDescription: DS.attr('string'),
	createdByEmail: DS.attr('string'),
  marks: DS.attr('string'),
  type: DS.attr('string'),
  number: DS.attr('number'),
	options:  DS.attr( {
			defaultValue() { return []; }
		})


});
