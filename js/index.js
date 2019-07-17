import { get } from "http";
var counter = 0;
var max = 0;
var ids = [];
function updateCounter(score) {
  if (counter > max) max = counter;
  $("#score").html("Max : " + max + " Current : " + counter);
}
function random() {
  ids.sort(() => Math.floor(Math.random() * 3 - 1));
  var items = document.querySelector("#items");
  ids.forEach((k, v) => items.appendChild(items.children[k]));
}

function extractIds() {
  $("#items")
    .children()
    .each((k, v) => ids.push(v.id));
}
//pre loading all images
function loadImages() {
  var fs = require("fs");
  fs.readdir("/images/", (err, files) => {
    files.forEach((k, v) => {
      var img = new Image();
      img.src = "/images/" + k;
    });
  });
}

function playRoar() {
  $("#roar")[0].play();
}
function playPenguin() {
  $("#p_sound")[0].play();
}
function createClass(currentElement) {
  var currentId = currentElement.id;
  return "p" + currentId.slice(7, currentId.length);
}
$(document).ready(function() {
  //This code will run after your page loads
  loadImages();
  extractIds();
  random();
  updateCounter();
  var penguins = $("[id^=penguin]");
  var yeti = $("#yeti");

  //penguin click
  penguins.mousedown(function() {
    // only play event if multiple clicks
    playPenguin();
    //to avoid multiple clicks for counter
    if (this.classList == "") {
      this.classList.add(createClass(this));
      counter++;
      updateCounter();
    }
  });
  //yeti click
  yeti.mousedown(function() {
    playRoar();
    this.classList.add("y");
    setTimeout(() => {
      alert("Game Over");
      yeti.removeClass("y");
      penguins.each((k, v) => (v.classList = ""));
      counter = 0;
      updateCounter();
      random();
    }, 100);
  });
});
