chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.insertCSS({
    target: {
      tabId: tab.id,
    },
    files: ["Content.css"],
  });
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    files: ["jquery.js"],
  });
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    files: ["Content.js"],
  });
});
