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
  }
});

App.InformationRoute = Ember.Route.extend({
  activate: function() {
    $(document).attr('title', 'About Wevther');
  }
});
