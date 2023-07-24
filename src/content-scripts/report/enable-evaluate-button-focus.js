import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";

export const enableEvaluateButtonFocus = () => {
  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (content !== "evaluation-test") {
      return;
    }

    const button = mainContentIframe.contentDocument.getElementById("evaluate-btn");

    const updateTabIndex = () => {
      const buttonClasses = [...button.classList];
      button.tabIndex = buttonClasses.includes("is-disabled")
        ? -1
        : 0;
    };
    updateTabIndex();

    const observer = new MutationObserver(updateTabIndex);

    observer.observe(button, {
      attributes: true,
      attributeFilter: ["class"]
    });

    button.addEventListener("focusin", () => {
      button.style.outline = "2px solid #4f73e3";
    });

    button.addEventListener("focusout", () => {
      button.style.outline = "";
    });

    button.addEventListener("keydown", ({ code }) => {
      if (code === "Enter") {
        button.click();
      }
    });

    button.addEventListener("keyup", ({ code }) => {
      if (code === "Space") {
        button.click();
      }
    });
  });
};
