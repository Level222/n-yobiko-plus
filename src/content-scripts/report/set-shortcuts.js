import { onKeyDown } from "./on-key-down";

const testModifierKey = (keyboardEvent, modifierKeys) => {
  const keyPatterns = ["altKey", "ctrlKey", "metaKey", "shiftKey"];
  return keyPatterns.every((key) => (
    modifierKeys.includes(key)
      ? keyboardEvent[key]
      : !keyboardEvent[key]
  ));
};

class ContentsList {
  #listItems = [...document.querySelectorAll(".u-list > li")];

  getCurrentIndex() {
    return this.#listItems.findIndex((li) => li.querySelector("a.is-selected"));
  }

  selectIndex(index) {
    const targetIndex = Math.max(Math.min(index, this.#listItems.length - 1), 0);
    const target = this.#listItems[targetIndex];
    target.firstElementChild.click();
  }

  selectNext() {
    this.selectIndex(this.getCurrentIndex() + 1);
  }

  selectPrev() {
    this.selectIndex(this.getCurrentIndex() - 1);
  }
}

const togglePictureInPicture = (video) => {
  const { ownerDocument } = video;
  if (ownerDocument.pictureInPictureElement === video) {
    ownerDocument.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
};

export const setShortcuts = () => {
  const contentsList = new ContentsList();

  onKeyDown.addListener((e) => {
    const { code } = e;

    if (["ArrowRight", "ArrowDown"].includes(code) && testModifierKey(e, ["shiftKey"])) {
      contentsList.selectNext();
      return;
    }

    if (["ArrowLeft", "ArrowUp"].includes(code) && testModifierKey(e, ["shiftKey"])) {
      contentsList.selectPrev();
      return;
    }

    const mainContentIframe = document.getElementById("modal-inner-iframe");

    if (!mainContentIframe) {
      return;
    }

    const mainContentIframeDoc = mainContentIframe.contentDocument;
    const video = mainContentIframeDoc.getElementById("video-player");

    if (video && code === "KeyP" && testModifierKey(e, [])) {
      togglePictureInPicture(video);
    }
  });
};
