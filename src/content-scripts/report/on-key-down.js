import { OriginalEvent } from "./original-event";
import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";
import { getElementAsync } from "../utils/get-element-async";

const loadIframe = (iframe) => new Promise((resolve) => {
  iframe.addEventListener("load", () => {
    resolve();
  });
});

const getReferenceIframe = async (mainContentIframeDoc) => {
  const referenceIframe = await getElementAsync(
    () => mainContentIframeDoc.querySelector("article > iframe"),
    mainContentIframeDoc.getElementById("root"),
    { childList: true, subtree: true }
  );

  if (referenceIframe.contentWindow.location.href === "about:blank") {
    await loadIframe(referenceIframe);
  }

  return referenceIframe;
};

export const onKeyDown = new OriginalEvent((dispatch) => {
  document.addEventListener("keydown", (e) => dispatch(e));

  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (!content) {
      return;
    }

    const mainContentIframeDoc = mainContentIframe.contentDocument;
    mainContentIframeDoc.addEventListener("keydown", (e) => {
      dispatch(e);
    });

    if (content === "video") {
      getReferenceIframe(mainContentIframeDoc).then((referenceIframe) => {
        referenceIframe.contentDocument.addEventListener("keydown", (e) => {
          dispatch(e);
        });
      });
    }
  });
});
