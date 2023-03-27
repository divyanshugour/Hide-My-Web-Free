var mode = 1;

document.querySelector("html").cursor = "pointer";

var cdn = $(`<link
href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
rel="stylesheet"
></link>`)
$("head").append(cdn);

// adding elements to the page

var toolbar = $(`<div class="toolbar">
    <div class="button" id="hide">
      <i class="bx bxs-pencil"></i>
    </div>

    <div class="button" id="blur">
      <i class="bx bxs-eyedropper"></i>
    </div>

    <div id="colorpicker">
      <input type="color" />
    </div>

    <div class="button" id="highlight">
      <i class="bx bx-highlight"></i>
    </div>

    <div class="button" id="hidetitle">
      <i class="bx bxs-eraser"></i>
    </div>

    <div class="button" id="done">
      <i class="bx bx-check"></i>
    </div>
  </div>

`);

$("body").append(toolbar);

$("div, p, h1, h2, h3, h4, h5, h6, img, button, a").on({
  mouseover: function (e) {
    if (mode != null) {
      $(this).addClass("hmwc");
    }
    return false;
  },
  mouseout: function (e) {
    if (mode != null) {
      $(this).removeClass("hmwc");
    }
    return false;
  },
});

$("div, p, h1, h2, h3, h4, h5, h6, img, button, a").on("click", function (e) {
  if (mode == 1) {
    e.preventDefault();
    $(this).hide();
  }
  if (mode == 2) {
    if ($(this).attr("data-click-state") == 0) {
      e.preventDefault();
      $(this).attr("data-click-state", 1);
      $(this).removeClass("hmwb");
    } else {
      e.preventDefault();
      $(this).attr("data-click-state", 0);
      $(this).addClass("hmwb");
    }
  }
  if (mode == 3) {
    var color = document.getElementById("colorpicker").value;
    if ($(this).attr("data-click-state") == 0) {
      e.preventDefault();
      $(this).attr("data-click-state", 1);
      $(this).css("background-color", "transparent");
    } else {
      e.preventDefault();
      $(this).attr("data-click-state", 0);
      $(this).css("background-color", color);
    }
  }
  event.stopPropagation();
});

document.getElementById("hide").addEventListener("click", function () {
  mode = 1;
});
document.getElementById("blur").addEventListener("click", function () {
  mode = 2;
});
document.getElementById("highlight").addEventListener("click", function () {
  mode = 3;
});
document.getElementById("hidetitle").addEventListener("click", function () {
  document.title = "-";
});
document.getElementById("done").addEventListener("click", function () {
  document.querySelector("html").cursor = "default";
  document
    .getElementsByTagName("body")
    .removeChild(document.getElementsByClassName("toolbar")[0]);
  mode = null;
});




/* Issues:

1. color picker not working
2. rdone button not working

*/