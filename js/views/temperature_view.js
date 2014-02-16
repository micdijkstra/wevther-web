App.TemperatureView = Ember.View.extend({
  templateName: 'temperature',
  mouseEnter: function(evt) {
    if(this.get('description') != null) {
      this.set('actual', this.get('temp'));
      this.set('temp', this.get('description'));
    }
  },
  mouseLeave: function(evt) {
    if(this.get('description') != null) {
      this.set('temp', this.get('actual'));
    }
  }
});
