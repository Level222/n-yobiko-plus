export const injectScript = (path, parent = document.body) => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(path);
  parent.append(script);
};
