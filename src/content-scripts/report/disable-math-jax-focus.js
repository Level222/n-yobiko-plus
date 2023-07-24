import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";
import { injectScript } from "./inject-script";

export const disableMathJaxFocus = () => {
  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (!["evaluation-test", "evaluation-test-result"].includes(content)) {
      return;
    }

    injectScript("./disable-math-jax-focus.bundle.js", mainContentIframe.contentDocument.body);
  });
};
