import { VideoTime } from "../utils/video-time/video-time";

export const showVideoTimeChapters = async () => {
  const anchors = document.querySelectorAll(
    "a[href^='\/courses\/'][href*='\/chapters\/']:has( > div > [aria-label=理解度・進捗度のプログレスバー])"
  );

  for (const anchor of anchors) {
    const titleWrapper = anchor.firstElementChild.firstElementChild;
    Object.assign(titleWrapper.style, {
      justifyContent: "space-between",
      alignItems: "center"
    });

    const titleElement = titleWrapper.lastElementChild.firstElementChild;

    Object.assign(titleElement.style, {
      position: "static",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "4px"
    });

    const videoTimeElement = document.createElement("div");
    videoTimeElement.style.color = "#555";
    titleElement.prepend(videoTimeElement);

    const [, course, chapter] = anchor.pathname.match(/^\/courses\/(\d+)\/chapters\/(\d+)/);

    new VideoTime(course, chapter, videoTimeElement);
  }
};
