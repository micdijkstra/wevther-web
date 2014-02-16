App.TemperatureView = Ember.View.extend({
  templateName: 'temperature',
  mouseEnter: function(evt) {
    this.set('actual', this.get('temp'));
    this.set('temp', this.get('description'));
  },
  mouseLeave: function(evt) {
    this.set('temp', this.get('actual'));
  }
});
