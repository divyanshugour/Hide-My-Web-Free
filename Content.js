document.querySelector("html").cursor = "pointer";
var mode = 1;

// adding elements to the page

// let toolbar = document.createElement(`<div class="icon-bar">
// <a class="active" href="#"><i class="fa fa-home"></i></a>
// <a href="#"><i class="fa fa-search"></i></a>
// <a href="#"><i class="fa fa-envelope"></i></a>
// <a href="#"><i class="fa fa-globe"></i></a>
// <a href="#"><i class="fa fa-trash"></i></a>
// </div>`);
// document.append(toolbar);
// var first_button = $(
//   '<abbr title="Hide Mode"><svg id="btn1" data-tooltip="Hide Mode" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" class="svg-inline--fa fa-eye-slash fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>'
// );
// $("body").append(first_button);
// var second_button = $(
//   '<abbr title="Blur Mode"><svg id="btn2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-dropper" class="svg-inline--fa fa-eye-dropper fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M50.75 333.25c-12 12-18.75 28.28-18.75 45.26V424L0 480l32 32 56-32h45.49c16.97 0 33.25-6.74 45.25-18.74l126.64-126.62-128-128L50.75 333.25zM483.88 28.12c-37.47-37.5-98.28-37.5-135.75 0l-77.09 77.09-13.1-13.1c-9.44-9.44-24.65-9.31-33.94 0l-40.97 40.97c-9.37 9.37-9.37 24.57 0 33.94l161.94 161.94c9.44 9.44 24.65 9.31 33.94 0L419.88 288c9.37-9.37 9.37-24.57 0-33.94l-13.1-13.1 77.09-77.09c37.51-37.48 37.51-98.26.01-135.75z"></path></svg>'
// );
// $("body").append(second_button);
// var third_button = $(
//   '<abbr title="Highlight Mode"><svg id="btn3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="highlighter" class="svg-inline--fa fa-highlighter fa-w-17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path fill="currentColor" d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"></path></svg>'
// );
// $("body").append(third_button);
// var color_picker = $('<input type="color" id="colorpicker" >');
// $("body").append(color_picker);
// var forth_button = $(
//   '<abbr title="Clear Title"><svg id="btn4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="broom" class="svg-inline--fa fa-broom fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M256.47 216.77l86.73 109.18s-16.6 102.36-76.57 150.12C206.66 523.85 0 510.19 0 510.19s3.8-23.14 11-55.43l94.62-112.17c3.97-4.7-.87-11.62-6.65-9.5l-60.4 22.09c14.44-41.66 32.72-80.04 54.6-97.47 59.97-47.76 163.3-40.94 163.3-40.94zM636.53 31.03l-19.86-25c-5.49-6.9-15.52-8.05-22.41-2.56l-232.48 177.8-34.14-42.97c-5.09-6.41-15.14-5.21-18.59 2.21l-25.33 54.55 86.73 109.18 58.8-12.45c8-1.69 11.42-11.2 6.34-17.6l-34.09-42.92 232.48-177.8c6.89-5.48 8.04-15.53 2.55-22.44z"></path></svg>'
// );
// $("body").append(forth_button);
// var fifth_button = $(
//   '<abbr title="Done"><svg id="btn5" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>'
// );
// $("body").append(fifth_button);


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

document.getElementById("btn1").addEventListener("click", function () {
  mode = 1;
});
document.getElementById("btn2").addEventListener("click", function () {
  mode = 2;
});
document.getElementById("btn3").addEventListener("click", function () {
  mode = 3;
});
document.getElementById("btn4").addEventListener("click", function () {
  document.title = "-";
});
document.getElementById("btn5").addEventListener("click", function () {
  var tb = document.getElementById("customToolbar1234");
  var hm = document.getElementById("btn1");
  var bm = document.getElementById("btn2");
  var cp = document.getElementById("colorpicker");
  var hlm = document.getElementById("btn3");
  var ht = document.getElementById("btn4");
  var d = document.getElementById("btn5");
  $(tb).remove();
  $(hm).remove();
  $(bm).remove();
  $(cp).remove();
  $(hlm).remove();
  $(ht).remove();
  $(d).remove();
  document.querySelector("html").cursor = "default";
  var tbd = document.getElementById("customToolbar1234");
  if (tbd == null) {
    mode = null;
  }
});
