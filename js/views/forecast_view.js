App.ForecastView = Ember.View.extend({
  templateName: 'forecast',
  didInsertElement: function() {
    if ((navigator.userAgent.match(/iPhone/i))) {
      this.controller.loadiPhonePromo();
    } else {
      this.controller.loadForecast();
    }
  }
});
