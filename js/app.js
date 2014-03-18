App = Ember.Application.create();

// Save default settings
if ($.cookie('temperature_type') == undefined) { $.cookie('temperature_type', 'c') }
if ($.cookie('location_id') == undefined) { $.cookie('location_id', 'USNY0996') }
if ($.cookie('location_name') == undefined) { $.cookie('location_name', 'New York City, United States of America') }
if ($.cookie('gender_type') == undefined) { $.cookie('gender_type', 'all') }

App.Router.map(function() {
  this.resource('forecast', { path: '/' });
  this.resource('information', { path: '/information' });
});

App.ForecastRoute = Ember.Route.extend({
  activate: function() {
    $(document).attr('title', 'Wevther');
    setupBlocks();
  },
  model: function() {
    temperature_type = $.cookie('temperature_type');
    location_id = $.cookie('location_id');
    return App.Forecast.findAll(temperature_type, location_id);
  },
  products: function() {
    return [];
  }
});

App.InformationRoute = Ember.Route.extend({
  activate: function() {
    $(document).attr('title', 'About Wevther');
  }
});
