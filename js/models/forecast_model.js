App.Forecast = Ember.Object.extend({});
App.Forecast.reopenClass({
  findAll: function(temperature_type, location_id) {
    return Ember.$.getJSON('https://wevther-api.herokuapp.com/api/v1/forecast.json?unit=' + temperature_type + '&location_id=' + location_id + '&access_token=e0ijbv02834hv9824hbvn9u4n9482n2&callback=?').then(function(data) {
      return data;
    });
  }
});
