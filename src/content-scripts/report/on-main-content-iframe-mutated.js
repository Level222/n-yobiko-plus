import { OriginalEvent } from "./original-event";

const MAIN_CONTENT_TYPES = [
  {
    content: "evaluation-test",
    regex: /^\/contents\/courses\/\d+\/chapters\/\d+\/evaluation_tests\/\d+\/?$/
  },
  {
    content: "evaluation-test-result",
    regex: /^\/contents\/courses\/\d+\/chapters\/\d+\/evaluation_tests\/\d+\/result\/?$/
  },
  {
    content: "video",
    regex: /^\/contents\/courses\/\d+\/chapters\/\d+\/movies\/\d+\/?$/
  },
  {
    content: "evaluation-report",
    regex: /^\/contents\/courses\/\d+\/chapters\/\d+\/evaluation_reports\/\d+\/?$/
  },
  {
    content: "evaluation-report-result",
    regex: /^\/contents\/courses\/\d+\/chapters\/\d+\/evaluation_reports\/\d+\/result\/?$/
  },
  {
    content: "essay-report",
    regex: /^\/contents\/courses\/\d+\/chapters\/\d+\/essay_reports\/\d+\/?$/
  },
  {
    content: "essay-report-result",
    regex: /^\/contents\/courses\/\d+\/chapters\/\d+\/essay_reports\/\d+\/result\/?$/
  }
];

export const onMainContentIframeMutated = new OriginalEvent((dispatch) => {
  const mainContentIframeWrapper = document.querySelector("[data-react-class=App\\.Modal]");

  let mainContentIframeObserver;

  const wrapperObserver = new MutationObserver(() => {
    const mainContentIframe = document.getElementById("modal-inner-iframe");

    mainContentIframeObserver?.disconnect();

    if (mainContentIframe) {
      mainContentIframe.addEventListener("load", () => {
        const path = mainContentIframe.contentWindow.location.pathname;
        const type = [...MAIN_CONTENT_TYPES].find(({ regex }) => regex.test(path));
        console.log(`content: ${type ? type.content : "other"}`);
        dispatch({
          content: type ? type.content : "other",
          mainContentIframe
        });
      });
    } else {
      mainContentIframeObserver = null;
      console.log("content: null");
      dispatch({
        content: null,
        mainContentIframe: null
      });
    }
  });

  wrapperObserver.observe(mainContentIframeWrapper, { childList: true });
});
