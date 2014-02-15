App = Ember.Application.create();

App.Router.map(function() {
  this.resource('forecast', { path: '/' });
});

App.ForecastRoute = Ember.Route.extend({
  activate: function() {
    $(document).attr('title', 'Wevther');
  },
  model: function() {
    return ['1', '2', '3', '4', '5', '6', '7', '8'];
  }
});
