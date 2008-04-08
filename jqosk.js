(function() {

function getJSONData(url) {
  var retVal;


}

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
};

OSK.prototype.loadLayout(layoutURL, forceReload) {
  forceReload = forceReload || false;
  if (forceReload || !this.layout) {
    this.layout = getJSONData(layoutURL);
    if (this.layout) {
      return true;
    } else {
      return false;
    }
  }
}

window.jQOSK = new OSK;

})();