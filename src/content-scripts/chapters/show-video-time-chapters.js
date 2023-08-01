import { VideoTime } from "../utils/video-time/video-time";

export const showVideoTimeChapters = async () => {
  const anchors = document.querySelectorAll(
    "a[href^='\/courses\/'][href*='\/chapters\/']:has( > div > div > ul > li > div[role=progressbar])"
  );

  for (const anchor of anchors) {
    const titleElement = anchor.firstElementChild;

    Object.assign(titleElement.style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    });

    const videoTimeElement = document.createElement("div");
    videoTimeElement.style.color = "#555";
    titleElement.append(videoTimeElement);

    const [, course, chapter] = anchor.pathname.match(/^\/courses\/(\d+)\/chapters\/(\d+)/);

    new VideoTime(course, chapter, videoTimeElement);
  }
};
