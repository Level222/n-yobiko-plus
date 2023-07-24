import { showVideoTimeChapters } from "./show-video-time-chapters";

const isSchoolReportPage = () => !!document.querySelector("[aria-label^=レポート提出済み]");

export const indexChapters = () => {
  if (isSchoolReportPage()) {
    showVideoTimeChapters();
  }
};
