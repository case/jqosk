(function() {

var modifiers = {
  shift: false,
  altGr: false,
  capsLock: false
};

var keyIDs = {};

var currentLayoutURL = "";

window.jQOSK = {
  getModifiers: function() {
    return modifiers;
  },
  
  activateKey: function(id) {
    keyIDs[id].activate();
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
  },
  
///// Methods called by keys //////

  shift: function() {
    modifiers.shift = !modifiers.shift;
    jQuery("#jqosk").toggleClass("shift");
    for (var id in keyIDs) {
      keyIDs[id].modify(modifiers);
    }
    return modifiers.shift;
  },
  
  altgr: function() {
    modifiers.altGr = !modifiers.altGr;
    jQuery("#jqosk").toggleClass("altGr");
    for (var id in keyIDs) {
      keyIDs[id].modify(modifiers);
    }
    return modifiers.altGr;
  },
  
  capslock: function() {
    modifiers.capsLock = !modifiers.capsLock;
    jQuery("#jqosk").toggleClass("capsLock");
    for (var id in keyIDs) {
      keyIDs[id].modify(modifiers);
    }
    return modifiers.capsLock;
  },
  
  typelabel: function(key) {
    alert(jQuery("#" + key.id).text());
    if (modifiers.shift) {
      this.shift();
    }
    if (modifiers.altGr) {
      this.altgr();
    }
  }
};
})();