chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "off",
  });
  chrome.action.setBadgeTextColor({ color: "#333" });
  chrome.action.setBadgeBackgroundColor({ color: "#f50057" });


});



chrome.action.onClicked.addListener(async (tab) => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'on' ? 'off' : 'on'

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "on") {
    // Insert the CSS file when the user turns the extension on
    await chrome.scripting.insertCSS({
      files: ["styles/injected.css"],
      target: { tabId: tab.id },
    });
    // Run bossIsComing
    chrome.scripting.executeScript(
      {func : ()=>bossIsComing(), target: { tabId: tab.id }}
    )
  } else if (nextState === "off") {
    // Run bossIsAway
    chrome.scripting.executeScript(
      {func : ()=>bossIsAway(), target: { tabId: tab.id }}
    )

    // Remove the CSS file when the user turns the extension off
    await chrome.scripting.removeCSS({
      files: ["styles/injected.css"],
      target: { tabId: tab.id },
    });
  }
});
