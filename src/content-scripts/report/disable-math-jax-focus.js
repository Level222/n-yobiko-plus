import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";
import { injectScript } from "../utils/inject-script";

const targetIframeContents = [
  "evaluation-test",
  "evaluation-test-result",
  "evaluation-report",
  "evaluation-report-result",
  "essay-report",
  "essay-report-result"
];

export const disableMathJaxFocus = () => {
  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (!targetIframeContents.includes(content)) {
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
