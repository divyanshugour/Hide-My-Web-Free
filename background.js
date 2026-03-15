chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || typeof tab.id !== "number") {
    return;
  }

  try {
    await chrome.scripting.insertCSS({
      target: {
        tabId: tab.id,
      },
      files: ["Content.css"],
    });

    await chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      files: ["jquery.js"],
    });

    await chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      files: ["Content.js"],
    });
  } catch (err) {
    console.error("Hide My Web injection failed", err);
  }
});
