(function() {

var modifiers = {
  shift: false,
  altGr: false
};

var keyIDs = {};

var currentLayoutURL = "";

window.jQOSK = {
  shift: function() {
    modifiers.shift = !modifiers.shift;
    for (var i = 0; i < this.keys.length; i++) {
      var row = this.keys[i];
      for (var j = 0; j < row.length; j++) {
        row[j].shift(modifiers.shift);
      }
    }
    return modifiers.shift;;
  },
  
  getModifiers: function() {
    return modifiers;
  },
  
  activateKey: function(id) {
    keyIDs[id].activate();
  },
  
  altgr: function() {
    modifiers.altGr = !modifiers.altGr;
    for (var i = 0; i < this.keys.length; i++) {
      var row = this.keys[i];
      for (var j = 0; j < row.length; j++) {
        row[j].altgr(modifiers.altGr);
      }
    }
    return modifiers.altGr;
  },
  
  typelabel: function(key) {
    if (modifiers.shift) {
      alert(key.sLabel);
      this.shift();
    } else {
      alert(key.label);
    }
  },

  loadLayout: function(layoutURL, forceReload) {
    forceReload = forceReload || false;
    if (forceReload || layoutURL != currentLayoutURL) {
      currentLayoutURL = layoutURL;
      jQuery.getJSON(layoutURL, function(layout) {
        jQOSK.addKeys(layout);
        jQOSK.draw();
      });
    }
  },
  
  addKeys: function(layout) {
    this.keys = [];
    
    for (var i = 0; i < layout.length; i++) {
      var row = [];
      for (var j = 0; j < layout[i].length; j++) {
        row[j] = new Key(layout[i][j]);
        keyIDs[row[j].id] = row[j];
      }
      this.keys[i] = row;
    }
  },
  
  draw: function() {
    var keyboard = jQuery("#jqosk");
    keyboard = keyboard.length ? keyboard : jQuery("<div id='jqosk'></div>");
    keyboard.empty();
    
    for (var i = 0; i < this.keys.length; i++) {
      var row = jQuery("<div></div>");
      for (var j = 0; j < this.keys[i].length; j++) {
        row.append(this.keys[i][j].draw());
      }
      keyboard.append(row);
    }
    jQuery("body").append(keyboard);
  }
};
})();