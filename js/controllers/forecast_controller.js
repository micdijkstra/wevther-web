App.ForecastController = Ember.ObjectController.extend({
  products: [],
  temperature_type: $.cookie('temperature_type'),
  gender_type: $.cookie('gender_type'),
  location_id: $.cookie('location_id'),
  location_name: $.cookie('location_name'),
  isToday: true,
  isTomorrow: false,
  isUpdated: false,

  loadForecast: function() {
    temperature_type = $.cookie('temperature_type');
    location_id = $.cookie('location_id');
    that = this;
    Ember.$.getJSON('https://wevther-api.herokuapp.com/api/v1/forecast.json?unit=' + temperature_type + '&location_id=' + location_id + '&access_token=e0ijbv02834hv9824hbvn9u4n9482n2&callback=?').then(function(data) {
      that.set('model', data);
    });
  },

  reloadForecast: function() {
    this.loadForecast();
  }.observes('temperature_type', 'location_id', 'location_name'),


  showForecast: function() {
    $('.forecastPage, .productPage').fadeIn()
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
      now = '—';
      low = current_forecast.tomorrow.low;
      high = current_forecast.tomorrow.high;
      icon_url = current_forecast.tomorrow.icon_url;
    }

    this.set('forecast_now', now);
    this.set('forecast_low', low);
    this.set('forecast_high', high);
    this.set('forecast_icon_url', icon_url);
    this.set('forecast_city', city);
    this.set('forecast_code', code);

    this.loadProducts();
  }.observes('isToday', 'model'),

  loadProducts: function() {
    $('.modProducts').hide();
    that = this;
    return Ember.$.getJSON('https://wevther-api.herokuapp.com/api/v1/products.json?weather_code=' + this.get('forecast_code') + '&gender=' + this.get('gender_type') + '&low=' + this.convertToF(this.get('forecast_low')) + '&high=' + this.convertToF(this.get('forecast_high')) + '&access_token=e0ijbv02834hv9824hbvn9u4n9482n2&callback=?').then(function(data) {
      that.set('products', data.products);
      that.showProducts();
    });
  }.observes('gender_type'),

  showProducts: function() {
    $('.productPage').imagesLoaded( function() {
      setTimeout(function() {
        $('.modProducts').fadeIn();
        setupBlocks();
     }, 500);
    });
  },

  formatTemp: function(temp) {
    if (temp == 0) {
      return '00';
    } else if (temp <= -1 || temp > 10) {
      return temp;
    } else {
      return '0' + temp;
    }
  },

  convertToF: function(temp) {
    if (this.get('unit') == 'f') {
      return temp;
    } else {
      var f = temp * 9 / 5 + 32;
      return Math.round(f);
    }
  },

  actions: {
    updateSetting: function (setting, value) {
      $.cookie(setting, value);
      this.set(setting, value);
    },
    today: function () {
      this.set('isToday', true);
      this.set('isTomorrow', false);
    },
    tomorrow: function () {
      this.set('isToday', false);
      this.set('isTomorrow', true);
    }
  }
});
