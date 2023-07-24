import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";
import { injectScript } from "./inject-script";

export const disableMathJaxFocus = () => {
  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (!["evaluation-test", "evaluation-test-result"].includes(content)) {
      return;
    }

    const mainContentIframeDoc = mainContentIframe.contentDocument;

    const mathJaxElements = mainContentIframeDoc.querySelectorAll(".MathJax_CHTML");
    for (const element of mathJaxElements) {
      element.tabIndex = -1;
    }

    injectScript("./disable-math-jax-focus-config.bundle.js", mainContentIframeDoc.body);
  });
};
