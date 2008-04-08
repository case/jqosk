(function() {


function OSK() {  
  var shift = false;
  this.shift = function(setting) {
    if (arguments.length) {
      return shift = !!setting;
    } else {
      return shift;
    }
  };
  
  var altGr = false;
  this.altGr = function(setting) {
    if (arguments.length) {
      return shift = !!setting;
    } else {
      return shift;
    }
  };   
}

OSK.prototype.loadLayout = function(layoutURL, forceReload) {
  forceReload = forceReload || false;
  if (forceReload || !this.layout) {
    jQuery.getJSON(layoutURL, function(data) {
      jQOSK.layout = data;
      jQOSK.layoutLoaded();
    });
  }
}

OSK.prototype.layoutLoaded = function() {
};

window.jQOSK = new OSK;

})();