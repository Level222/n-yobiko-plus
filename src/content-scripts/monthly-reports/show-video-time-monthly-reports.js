import { VideoTime } from "../utils/video-time/video-time";
import { getElementAsync } from "../utils/get-element-async";

const CHAPTER_ANCHOR_SELECTOR =
  "a[href^='\/courses\/'][href*='\/chapters\/']:has( > div > div > div > ul > li > div[role=progressbar])";

export const showVideoTimeMonthlyReports = async () => {
  await getElementAsync(
    () => document.querySelector(CHAPTER_ANCHOR_SELECTOR),
    document.getElementById("root"),
    { childList: true, subtree: true }
  );

  const anchors = document.querySelectorAll(CHAPTER_ANCHOR_SELECTOR);

  for (const anchor of anchors) {
    const titleElement = anchor.firstElementChild.firstElementChild.nextElementSibling;

    Object.assign(titleElement.style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    });

    const videoTimeElement = document.createElement("div");
    titleElement.append(videoTimeElement);

    const [, course, chapter] = anchor.pathname.match(/^\/courses\/(\d+)\/chapters\/(\d+)/);

    new VideoTime(course, chapter, videoTimeElement);
  }
};
