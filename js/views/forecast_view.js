App.ForecastView = Ember.View.extend({
  templateName: 'forecast',
  products: [],

  didInsertElement: function() {
    setupBlocks();
  },

  forecastChange: function() {
    $('.modProducts').hide();

    this.set('unit', this.get('controller.unit'));
    this.set('location', this.get('controller.forecast_city'));
    this.set('now', this.formatTemp(this.get('controller.forecast_now')));
    this.set('low', this.formatTemp(this.get('controller.forecast_low')));
    this.set('high', this.formatTemp(this.get('controller.forecast_high')));
    this.set('icon_url', this.get('controller.forecast_icon_url'));

    this.set('products', App.Product.findAll(this.get('controller.code'), this.get('controller.gender_type'), this.convertToF(this.get('controller.low')), this.convertToF(this.get('controller.high'))).products);

    if (this.get('controller.isUpdated') == true) {
      setTimeout(function() {
        $('.modProducts').fadeIn();
        setupBlocks();
     }, 500);
    };
  }.observes('controller.isUpdated', 'controller.gender_type'),

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
    if (this.unit == 'f') {
      return temp;
    } else {
      var f = temp * 9 / 5 + 32;
      return Math.round(f);
    }
  }
});
