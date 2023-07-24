import { indexReport } from "./report/index-report";
import { indexChapters } from "./chapters/index-chapters";
import { indexMonthlyReports } from "./monthly-reports/index-monthly-reports";
import { indexReportResult } from "./report-result/index-report-result";

if (location.hostname === "www.nnn.ed.nico") {
  if (/^\/courses\/\d+\/chapters\/\d+/.test(location.pathname)) {
    indexReport();
  } else if (/^\/study_plans\/month\/\d+\/\d+/.test(location.pathname)) {
    indexMonthlyReports();
  } else if (/^\/courses\/\d+/.test(location.pathname)) {
    indexChapters();
  }
} else if (location.href === "https://s-secure.nnn.ed.jp/mypage/result/pc/list/index") {
  indexReportResult();
}
