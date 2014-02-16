App.ForecastController = Ember.ObjectController.extend({
  temperature_type: $.cookie('temperature_type'),
  gender_type: $.cookie('gender_type'),
  location_id: $.cookie('location_id'),
  location_name: $.cookie('location_name'),
  isToday: true,

  loadForecast: function() {
    this.set('isUpdated', false);

    var forecast = null;
    var unit = null;
    var code = null;
    var now = null;
    var low = null;
    var high = null;
    var icon_url = null;
    var city = null;

    current_forecast = this.get('model');
    city = current_forecast.location.city;
    unit = current_forecast.unit;

    if (this.get('isToday')) {
      icon_url = current_forecast.now.icon_url;
      code = current_forecast.now.code;
      now = current_forecast.now.temp;
      low = current_forecast.today.low;
      high = current_forecast.today.high;
    } else {
      code = current_forecast.tomorrow.code;
      now = '';
      low = current_forecast.tomorrow.low;
      high = current_forecast.tomorrow.high;
      icon_url = current_forecast.tomorrow.icon_url;
    }

    this.set('forecast_code', code);
    this.set('forecast_now', now);
    this.set('forecast_low', low);
    this.set('forecast_high', high);
    this.set('forecast_icon_url', icon_url);
    this.set('forecast_city', city);

    this.set('isUpdated', true);

  }.observes('model', 'isToday'),

  actions: {
    updateSetting: function (setting, value) {
      $.cookie(setting, value)
      this.set(setting, value);
    },
    today: function () {
      this.set('isToday', true);
      this.set('isTomorrow', false);
    },
    tomorrow: function () {
      this.set('isToday', false);
      this.set('isTomorrow', true);
    },
    showLo: function() {
      var temp = $('#forecastLow').txt();
      $('#forecastLow').txt('Lo&deg;');
      setTimeout(function() { $('#forecastLow').txt(temp); }, 500);
    }
  }
});
