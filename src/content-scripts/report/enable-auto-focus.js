import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";
import { getElementAsync } from "../utils/get-element-async";

const getVideo = (mainContentIframeDoc) => getElementAsync(
  () => mainContentIframeDoc.getElementById("video-player"),
  mainContentIframeDoc.getElementById("root"),
  { childList: true, subtree: true }
);

export const enableAutoFocus = () => {
  onMainContentIframeMutated.addListener(async ({ content, mainContentIframe }) => {
    if (!mainContentIframe) {
      return;
    }

    mainContentIframe.contentWindow.focus();

    const mainContentIframeDoc = mainContentIframe.contentDocument;

    if (["evaluation-test", "evaluation-report", "essay-report"].includes(content)) {
      const firstQuestionContainer = mainContentIframeDoc.querySelectorAll(".exercise-item")[0];
      const firstQuestionContent = firstQuestionContainer.querySelector("[data-type=perfect], input, textarea");
      firstQuestionContent?.focus();
    } else if (content === "video") {
      const video = await getVideo(mainContentIframeDoc);
      video.focus();
    }
  });
};
