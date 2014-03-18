App.ForecastView = Ember.View.extend({
  templateName: 'forecast',
  didInsertElement: function() {
    this.controller.loadForecast();
  }
});
