import { showVideoTime } from "./show-video-time";

const isSchoolReportPage = () => !!document.querySelector("[aria-label^=レポート提出済み]");

if (isSchoolReportPage()) {
  showVideoTime();
}
