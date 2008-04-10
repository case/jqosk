function Key(keyObj) {
  jQuery.extend(this, keyObj);
  this.sLabel = this.sLabel || this.label.toUpperCase();
  this.func = this.func || "typelabel";
  this.sFunc = this.sFunc || this.func;
}

Key.prototype.draw = function() {
  return jQuery("<button id='" + this.id + "'>" + this.label + "</button>").click(function(){
    jQOSK.activateKey(this.id);});
};

Key.prototype.shift = function(shifted) {
  if (shifted) {
    $("#" + this.id).text(this.sLabel);
  } else {
    $("#" + this.id).text(this.label);
  }
};

Key.prototype.activate = function() {
  if (jQOSK.getModifiers().shift) {
    jQOSK[this.sFunc](this);
  } else {
    jQOSK[this.func](this);
  }
};
