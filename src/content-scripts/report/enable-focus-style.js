import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";
import styles from "./focus.css";

export const enableFocusStyle = () => {
  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (["evaluation-test", "evaluation-report", "essay-report"].includes(content)) {
      styles.use({ document: mainContentIframe.contentDocument });
    }
  });
};
