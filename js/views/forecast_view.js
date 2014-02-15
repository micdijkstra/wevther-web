App.ForecastView = Ember.View.extend({
  templateName: 'forecast',
  products: [],

  forecastChange: function() {
    var forecast = this.get('controller.model');

    code = forecast.today.code
    low = forecast.today.low;
    high = forecast.today.high;
    temperature_type = forecast.unit;

    this.set('location', forecast.location.city);
    this.set('now', forecast.now.temp);
    this.set('low', low);
    this.set('high', high);
    this.set('icon_url', forecast.now.icon_url);

    gender_type = $.cookie('gender_type');

    this.set('products', App.Product.findAll(code, gender_type, low, high, temperature_type).products);
  }.observes('controller.model'),
});
