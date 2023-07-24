import styles from "./video-time.css";

styles.use();

class DescriptionListItem {
  #dt;
  #dd;

  constructor(desc, initialContent) {
    this.#dt = Object.assign(document.createElement("dt"), {
      textContent: desc
    });
    this.#dd = document.createElement("dd");
    this.updateContent(initialContent);
  }

  updateContent(content) {
    this.#dd.replaceChildren(content);
  }

  getCurrent() {
    return [this.#dt, this.#dd];
  }
}

export class VideoTime {
  #course;
  #chapter;
  #triggerElement;
  #popover;
  #popoverListItems;

  constructor(course, chapter, parentElement) {
    this.#course = course;
    this.#chapter = chapter;
    this.#init(parentElement);
    this.update();
  }

  async update() {
    const sections = await this.#fetchSections();
    const videoSections = sections.filter(({ resource_type }) => resource_type === "movie");
    const mainVideoSections = videoSections.filter(({ material_type }) => material_type === "main");
    const supplementVideoSections = videoSections.filter(({ material_type }) => material_type === "supplement");

    const allVideoSectionsTime = this.#createVideoTimeInfo(videoSections);
    const mainVideoSectionsTime = this.#createVideoTimeInfo(mainVideoSections);
    const supplementVideoSectionsTime = this.#createVideoTimeInfo(supplementVideoSections);

    this.#triggerElement.textContent = mainVideoSectionsTime;

    this.#popoverListItems.all.updateContent(allVideoSectionsTime);
    this.#popoverListItems.main.updateContent(mainVideoSectionsTime);
    this.#popoverListItems.supplement.updateContent(supplementVideoSectionsTime);

    this.#updatePopoverPosition();
  }

  #init(parentElement) {
    this.#triggerElement = Object.assign(document.createElement("div"), {
      className: "__n-yobiko-plus_video-time__trigger",
      textContent: "Loading..."
    });

    this.#popover = Object.assign(document.createElement("dl"), {
      className: "__n-yobiko-plus_video-time__popover"
    });

    this.#popoverListItems = Object.fromEntries([
      ["all", "全動画"],
      ["main", "メイン"],
      ["supplement", "Nプラス"]
    ].map(([key, desc]) => [key, new DescriptionListItem(desc, "Loading...")]));

    this.#popover.append(
      ...Object.entries(this.#popoverListItems).flatMap(([_key, listItem]) => listItem.getCurrent())
    );

    this.#triggerElement.addEventListener("pointerover", () => {
      this.#popover.style.opacity = 1;
    });

    this.#triggerElement.addEventListener("pointerleave", () => {
      this.#popover.style.opacity = 0;
    });

    parentElement.replaceChildren(this.#triggerElement, this.#popover);

    document.addEventListener("scroll", () => {
      this.#updatePopoverPosition();
    });
    this.#updatePopoverPosition();
  }

  #updatePopoverPosition() {
    const triggerElementRect = this.#triggerElement.getBoundingClientRect();
    Object.assign(this.#popover.style, {
      top: `${triggerElementRect.top + triggerElementRect.height + 5}px`,
      left: `${triggerElementRect.left + triggerElementRect.width / 2}px`
    });
  }

  async #fetchSections() {
    const apiUrl = `https://api.nnn.ed.nico/v2/material/courses/${this.#course}/chapters/${this.#chapter}`;
    const response = await fetch(apiUrl, {

      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json.chapter.sections;
  }

  #getTotalTime(sections) {
    return sections.reduce((totalLength, { length }) => totalLength + length, 0);
  }

  #formatTime(sourceSec) {
    const hourNum = Math.floor(sourceSec / 3600);
    const minNum = Math.floor(sourceSec / 60) % 60;
    const hourStr = hourNum ? `${hourNum}:` : "";
    const minStr = `${hourNum ? String(minNum).padStart(2, "0") : minNum}:`;
    const secStr = String(sourceSec % 60).padStart(2, "0");
    return `${hourStr}${minStr}${secStr}`;
  }

  #createVideoTimeInfo(sections) {
    const seenSections = sections.filter(({ passed }) => passed);
    return `${this.#formatTime(this.#getTotalTime(seenSections))} / ${this.#formatTime(this.#getTotalTime(sections))}`;
  }
}
