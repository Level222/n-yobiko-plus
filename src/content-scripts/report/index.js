import { showVideoTime } from "./show-video-time";
import { enableWordCounting } from "./enable-word-counting";
import { setShortcuts } from "./set-shortcuts";
import { enableEvaluateButtonFocus } from "./enable-evaluate-button-focus";
import { enableRadioFocus } from "./enable-radio-focus";
import { enableAutoFocus } from "./enable-auto-focus";
import { disableMathJaxFocus } from "./disable-math-jax-focus";
import { enableFocusStyle } from "./enable-focus-style";

const isSchoolReportPage = () => !!document.getElementById("lesson-modal");

if (isSchoolReportPage()) {
  showVideoTime();
  enableWordCounting();
  setShortcuts();
  enableEvaluateButtonFocus();
  enableRadioFocus();
  enableAutoFocus();
  disableMathJaxFocus();
  enableFocusStyle();
}
