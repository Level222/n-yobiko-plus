import { VideoTime } from "../utils/video-time/video-time";
import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";

export const showVideoTimeReport = () => {
  const listHeader = document.querySelector(".u-list-header");
  Object.assign(listHeader.style, {
    display: "flex",
    justifyContent: "space-between"
  });

  const videoTimeElement = document.createElement("div");
  listHeader.append(videoTimeElement);

  const [, course, chapter] = location.pathname.match(/^\/courses\/(\d+)\/chapters\/(\d+)/);
  const videoTime = new VideoTime(course, chapter, videoTimeElement);

  onMainContentIframeMutated.addListener(() => {
    videoTime.update();
  });
};
