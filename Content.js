(function () {
  if (window.__HMW_ACTIVE__) {
    return;
  }

  window.__HMW_ACTIVE__ = true;

  var MODE_HIDE = 1;
  var MODE_BLUR = 2;
  var MODE_HIGHLIGHT = 3;
  var mode = MODE_HIDE;
  var originalTitle = document.title;
  var historyStack = [];
  var redoStack = [];
  var trackedElements = [];

  var targetSelector = "div, p, h1, h2, h3, h4, h5, h6, img, button, a";
  var toolbarSelector = ".hmw-toolbar";
  var helpPanelSelector = ".hmw-help-panel";
  var colorInputId = "hmw-color-input";

  document.documentElement.style.cursor = "crosshair";

  if (!document.getElementById("hmw-boxicons")) {
    var cdn = $('<link id="hmw-boxicons" rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />');
    $("head").append(cdn);
  }

  var toolbar = $(
    '<div class="hmw-toolbar" role="toolbar" aria-label="Hide My Web tools">' +
      '<button class="hmw-button" id="hmw-undo" title="Undo"><i class="bx bx-undo"></i></button>' +
      '<button class="hmw-button" id="hmw-redo" title="Redo"><i class="bx bx-redo"></i></button>' +
      '<button class="hmw-button" id="hmw-reset" title="Reset all"><i class="bx bx-refresh"></i></button>' +
      '<button class="hmw-button" id="hmw-hide" title="Hide"><i class="bx bxs-pencil"></i></button>' +
      '<button class="hmw-button" id="hmw-blur" title="Blur"><i class="bx bxs-eyedropper"></i></button>' +
      '<div id="hmw-colorpicker"><input id="' + colorInputId + '" type="color" value="#f7e36d" title="Highlight color" /></div>' +
      '<button class="hmw-button" id="hmw-highlight" title="Highlight"><i class="bx bx-highlight"></i></button>' +
      '<button class="hmw-button" id="hmw-hidetitle" title="Hide title"><i class="bx bxs-eraser"></i></button>' +
      '<button class="hmw-button" id="hmw-help" title="Help"><i class="bx bx-help-circle"></i></button>' +
      '<button class="hmw-button" id="hmw-done" title="Done"><i class="bx bx-check"></i></button>' +
    "</div>"
  );

  var helpPanel = $(
    '<div class="hmw-help-panel" id="hmw-help-panel" aria-hidden="true">' +
      '<div class="hmw-help-title">Toolbar Help</div>' +
      '<div class="hmw-help-row"><i class="bx bx-undo"></i><span>Undo last action</span></div>' +
      '<div class="hmw-help-row"><i class="bx bx-redo"></i><span>Redo last undo</span></div>' +
      '<div class="hmw-help-row"><i class="bx bx-refresh"></i><span>Reset all changes</span></div>' +
      '<div class="hmw-help-row"><i class="bx bxs-pencil"></i><span>Hide clicked element</span></div>' +
      '<div class="hmw-help-row"><i class="bx bxs-eyedropper"></i><span>Blur clicked element</span></div>' +
      '<div class="hmw-help-row"><i class="bx bx-highlight"></i><span>Highlight with selected color</span></div>' +
      '<div class="hmw-help-row"><i class="bx bxs-eraser"></i><span>Hide page title</span></div>' +
      '<div class="hmw-help-row"><i class="bx bx-check"></i><span>Exit toolbar</span></div>' +
    "</div>"
  );

  $("body").append(toolbar);
  $("body").append(helpPanel);

  function toggleHelpPanel() {
    var panel = $("#hmw-help-panel");
    var isVisible = panel.hasClass("hmw-help-visible");

    panel.toggleClass("hmw-help-visible", !isVisible);
    panel.attr("aria-hidden", isVisible ? "true" : "false");
  }

  function updateHistoryButtons() {
    var canUndo = historyStack.length > 0;
    var canRedo = redoStack.length > 0;

    $("#hmw-undo").prop("disabled", !canUndo);
    $("#hmw-redo").prop("disabled", !canRedo);
  }

  function pushHistory(action) {
    historyStack.push(action);
    redoStack = [];
    updateHistoryButtons();
  }

  function undo() {
    if (historyStack.length === 0) {
      return;
    }

    var action = historyStack.pop();
    action.undo();
    redoStack.push(action);
    updateHistoryButtons();
  }

  function redo() {
    if (redoStack.length === 0) {
      return;
    }

    var action = redoStack.pop();
    action.redo();
    historyStack.push(action);
    updateHistoryButtons();
  }

  function trackElement(el) {
    if (trackedElements.indexOf(el) === -1) {
      trackedElements.push(el);
    }
  }

  function snapshotElement(el) {
    return {
      display: el.style.display,
      className: el.className,
      backgroundColor: el.style.backgroundColor,
      highlighted: el.getAttribute("data-hmw-highlighted"),
    };
  }

  function applyElementSnapshot(el, snapshot) {
    if (!el) {
      return;
    }

    el.style.display = snapshot.display;
    el.className = snapshot.className;
    el.style.backgroundColor = snapshot.backgroundColor;

    if (snapshot.highlighted === null) {
      el.removeAttribute("data-hmw-highlighted");
    } else {
      el.setAttribute("data-hmw-highlighted", snapshot.highlighted);
    }
  }

  function hasStateChanged(beforeState, afterState) {
    return (
      beforeState.display !== afterState.display ||
      beforeState.className !== afterState.className ||
      beforeState.backgroundColor !== afterState.backgroundColor ||
      beforeState.highlighted !== afterState.highlighted
    );
  }

  function recordElementMutation(el, mutateFn) {
    trackElement(el);
    var beforeState = snapshotElement(el);

    mutateFn();

    var afterState = snapshotElement(el);
    if (!hasStateChanged(beforeState, afterState)) {
      return;
    }

    pushHistory({
      undo: function () {
        applyElementSnapshot(el, beforeState);
      },
      redo: function () {
        applyElementSnapshot(el, afterState);
      },
    });
  }

  function captureTrackedStates() {
    var states = [];

    for (var i = 0; i < trackedElements.length; i++) {
      var el = trackedElements[i];
      if (!el || !document.contains(el)) {
        continue;
      }

      states.push({
        element: el,
        state: snapshotElement(el),
      });
    }

    return states;
  }

  function applyTrackedStates(states) {
    for (var i = 0; i < states.length; i++) {
      var entry = states[i];

      if (!entry.element || !document.contains(entry.element)) {
        continue;
      }

      applyElementSnapshot(entry.element, entry.state);
    }
  }

  function resetAll() {
    var beforeStates = captureTrackedStates();
    var beforeTitle = document.title;

    for (var i = 0; i < trackedElements.length; i++) {
      var el = trackedElements[i];
      if (!el || !document.contains(el)) {
        continue;
      }

      el.style.display = "";
      el.classList.remove("hmwb");
      el.style.backgroundColor = "";
      el.removeAttribute("data-hmw-highlighted");
      el.classList.remove("hmwc");
    }

    document.title = originalTitle;

    var afterStates = captureTrackedStates();
    var afterTitle = document.title;

    var hasVisualChanges = false;
    for (var j = 0; j < beforeStates.length; j++) {
      var state = beforeStates[j].state;
      if (
        state.display !== "" ||
        state.backgroundColor !== "" ||
        state.highlighted === "1" ||
        state.className.indexOf("hmwb") !== -1
      ) {
        hasVisualChanges = true;
        break;
      }
    }

    var didAnythingChange = beforeTitle !== afterTitle || hasVisualChanges;
    if (!didAnythingChange) {
      return;
    }

    pushHistory({
      undo: function () {
        applyTrackedStates(beforeStates);
        document.title = beforeTitle;
      },
      redo: function () {
        applyTrackedStates(afterStates);
        document.title = afterTitle;
      },
    });
  }

  updateHistoryButtons();

  function isToolbarElement(node) {
    return $(node).closest(toolbarSelector + ", " + helpPanelSelector).length > 0;
  }

  function cleanup() {
    $(document).off("mouseover.hmw mouseout.hmw click.hmw", targetSelector);
    $("#hmw-undo, #hmw-redo, #hmw-reset, #hmw-hide, #hmw-blur, #hmw-highlight, #hmw-hidetitle, #hmw-help, #hmw-done").off("click.hmw");
    $(".hmwc").removeClass("hmwc");
    $(toolbarSelector).remove();
    $(helpPanelSelector).remove();
    document.documentElement.style.cursor = "default";
    window.__HMW_ACTIVE__ = false;
    mode = null;
  }

  $(document).on("mouseover.hmw", targetSelector, function (e) {
    if (mode === null || isToolbarElement(this)) {
      return;
    }
    e.stopPropagation();
    $(".hmwc").removeClass("hmwc");
    $(this).addClass("hmwc");
  });

  $(document).on("mouseout.hmw", targetSelector, function (e) {
    if (mode === null || isToolbarElement(this)) {
      return;
    }
    e.stopPropagation();
    $(this).removeClass("hmwc");
  });

  $(document).on("click.hmw", targetSelector, function (e) {
    if (mode === null || isToolbarElement(this)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (mode === MODE_HIDE) {
      recordElementMutation(this, function () {
        $(this).hide();
      }.bind(this));
      return;
    }

    if (mode === MODE_BLUR) {
      recordElementMutation(this, function () {
        $(this).toggleClass("hmwb");
      }.bind(this));
      return;
    }

    if (mode === MODE_HIGHLIGHT) {
      recordElementMutation(this, function () {
        var color = document.getElementById(colorInputId).value;
        var isActive = $(this).attr("data-hmw-highlighted") === "1";

        if (isActive) {
          $(this).removeAttr("data-hmw-highlighted");
          $(this).css("background-color", "");
        } else {
          $(this).attr("data-hmw-highlighted", "1");
          $(this).css("background-color", color);
        }
      }.bind(this));
    }
  });

  $("#hmw-undo").on("click.hmw", function () {
    undo();
  });

  $("#hmw-redo").on("click.hmw", function () {
    redo();
  });

  $("#hmw-reset").on("click.hmw", function () {
    resetAll();
  });

  $("#hmw-hide").on("click.hmw", function () {
    mode = MODE_HIDE;
  });

  $("#hmw-blur").on("click.hmw", function () {
    mode = MODE_BLUR;
  });

  $("#hmw-highlight").on("click.hmw", function () {
    mode = MODE_HIGHLIGHT;
  });

  $("#hmw-hidetitle").on("click.hmw", function () {
    var previousTitle = document.title;
    var nextTitle = "-";

    if (previousTitle === nextTitle) {
      return;
    }

    document.title = nextTitle;

    pushHistory({
      undo: function () {
        document.title = previousTitle;
      },
      redo: function () {
        document.title = nextTitle;
      },
    });
  });

  $("#hmw-help").on("click.hmw", function () {
    toggleHelpPanel();
  });

  $("#hmw-done").on("click.hmw", function () {
    cleanup();
  });
})();