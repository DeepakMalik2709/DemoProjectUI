import DS from 'ember-data';

export default DS.Model.extend({

  quizId:DS.attr('number'),
  studentId :DS.attr('string'),
  questionId:DS.attr('number'),
  optionId:DS.attr('number'),
  status:DS.attr('string')
});
