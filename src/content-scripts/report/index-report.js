import { showVideoTimeReport } from "./show-video-time-report";
import { enableWordCounting } from "./enable-word-counting";
import { setShortcuts } from "./set-shortcuts";
import { enableEvaluateButtonFocus } from "./enable-evaluate-button-focus";
import { enableRadioFocus } from "./enable-radio-focus";
import { enableAutoFocus } from "./enable-auto-focus";
import { disableMathJaxFocus } from "./disable-math-jax-focus";
import { enableFocusStyle } from "./enable-focus-style";

export const indexReport = () => {
  const isSchoolReportPage = () => !!document.getElementById("lesson-modal");

  if (isSchoolReportPage()) {
    showVideoTimeReport();
    enableWordCounting();
    setShortcuts();
    enableEvaluateButtonFocus();
    enableRadioFocus();
    enableAutoFocus();
    disableMathJaxFocus();
    enableFocusStyle();
  }
};
