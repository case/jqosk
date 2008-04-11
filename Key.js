function Key(keyObj) {
  jQuery.extend(this, keyObj);
  this.sLabel = this.sLabel || this.label.toUpperCase();
  this.altLabel = this.altLabel || this.label;
  this.sAltLabel = this.sAltLabel || this.altLabel.toUpperCase();
  this.func = this.func || "typelabel";
  this.sFunc = this.sFunc || this.func;
  this.isLetter = this.label.toUpperCase() != this.label.toLowerCase();
  this.altIsLetter = this.altLabel.toUpperCase() != this.altLabel.toLowerCase();
}

Key.prototype.draw = function() {
  return jQuery("<button id='" + this.id + "'>" + this.label + "</button>").click(function(){
    jQOSK.activateKey(this.id);});
};

Key.prototype.modify = function(modifiers) {
  var modsVal = (modifiers.shift?1:0) + (modifiers.altGr?2:0) + (modifiers.capsLock?4:0);
  var text;
  switch (modsVal) {
  case 0:
    text = this.label;
    break;
  case 1:
    text = this.sLabel;
    break;
  case 2:
    text = this.altLabel;
    break;
  case 3:
    text = this.sAltLabel;
    break;
  case 4:
    if (this.isLetter) {
      text = this.sLabel;
    } else {
      text = this.label;
    }
    break;
  case 5:
    if (this.isLetter) {
      text = this.label;
    } else {
      text = this.sLabel;
    }
    break;
  case 6:
    if (this.altIsLetter) {
      text = this.sAltLabel;
    } else {
      text = this.altLabel;
    }
    break;
  case 7:
    if (this.altIsLetter) {
      text = this.altLabel;
    } else {
      text = this.sAltLabel;
    }
    break;
  }
  
  jQuery("#" + this.id).text(text);
};

Key.prototype.activate = function() {
  if (jQOSK.getModifiers().shift) {
    jQOSK[this.sFunc](this);
  } else {
    jQOSK[this.func](this);
  }
};
