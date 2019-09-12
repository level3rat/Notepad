var numNotes = 0;
var numNotesPlus = 0;

document.getElementById("addContainer").addEventListener("click", createNote);

function createNote() {
  numNotes++;
  var posX = Math.round(Math.random() * 81);
  var posY = Math.round(Math.random() * 81);

  var div = document.createElement("div");
  div.style.width = "200px";
  div.style.height = "160px";
  div.style.background = "#FCF8C8";
  div.style.color = "black";
  div.className = "note";
  div.id = "note";

  div.style.position = "absolute";
  div.style.left = posX + "%";
  div.style.top = posY + "%";

  div.style.resize = "both";
  div.style.boxShadow = "0px 0px 10px #000";
  div.style.overflow = "hidden";

  var textbox = document.createElement("textarea");
  textbox.style.width = "99%";
  textbox.style.position = "absolute";
  textbox.style.top = "28px";
  textbox.style.bottom = "20px";
  textbox.inputMode = "text";
  div.appendChild(textbox);

  var dragbar = document.createElement("p");
  dragbar.style.width = "100%";
  dragbar.style.height = "28px";
  dragbar.style.position = "absolute";
  dragbar.style.top = "0px";
  dragbar.style.backgroundColor = "lightblue";
  dragbar.style.color = "black";
  //dragbar.innerHTML = posX + ", " + posY; //used for testing spawning positions of notes
  div.appendChild(dragbar);

  var closeable = document.createElement("span");
  closeable.id = "closeable";
  closeable.innerHTML = "<p>&times;</p>";
  closeable.style.paddingRight = "5px";
  dragbar.appendChild(closeable);

  numNotesPlus = 999 + numNotes; //first number is to insure it never goes behind #board
  div.style.zIndex = numNotesPlus;

  document.getElementById("board").appendChild(div);

  // Make the box closeable from https://gist.github.com/rogerbraun/1836610

  closeable.onclick = function() {
    numNotes--;
    div.parentNode.removeChild(div);
  };

  // Make the box draggable from https://gist.github.com/rogerbraun/1836610

  var startMousePos = { x: 0, y: 0 };
  var startDivPos = { x: 0, y: 0 };
  var dragging = false;

  dragbar.onmousedown = function(event) {
    startMousePos.x = event.clientX;
    startMousePos.y = event.clientY;

    startDivPos.x = div.offsetLeft;
    startDivPos.y = div.offsetTop;

    zIndexLower();

    div.style.zIndex = numNotesPlus;

    dragging = true;
  };

  dragbar.onmousemove = function(event) {
    if (dragging) {
      deltaX = event.clientX - startMousePos.x;
      deltaY = event.clientY - startMousePos.y;

      div.style.left = deltaX + startDivPos.x + "px";
      div.style.top = deltaY + startDivPos.y + "px";
    }
  };

  dragbar.onmouseup = function(event) {
    dragging = false;
  };
}

function zIndexLower() {
  var note = document.getElementsByClassName("note");
  for (i = 0; i < numNotes; i++) {
    note[i].style.zIndex--;
  }
}
