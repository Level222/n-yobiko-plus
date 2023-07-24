import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";

class RadioList {
  #list;

  constructor(list) {
    this.#list = list;
    this.#init();
  }

  getSelected() {
    return this.#list.querySelector(".answers-selected");
  }

  select(target) {
    target.click();
    target.click();
  }

  changeFolded(folded) {
    const selected = this.getSelected();

    if (!selected) {
      return false;
    }

    const parent = this.#list.parentElement;

    if (parent.classList.contains("is-folded") !== folded) {
      selected.click();
    }

    return true;
  }

  #init() {
    this.#list.tabIndex = 0;

    this.#list.addEventListener("focusin", this.#handleFocusIn);
    this.#list.addEventListener("focusout", this.#handleFocusOut);
    this.#list.addEventListener("keydown", this.#handleKeyDown);
  }

  #handleFocusIn = () => {
    this.#list.style.outline = "2.5px solid #4f73e3";
    this.changeFolded(false);
  };

  #handleFocusOut = () => {
    this.#list.style.outline = "";
    this.changeFolded(true);
  };

  #handleKeyDown = (e) => {
    const { code } = e;

    if (!["ArrowDown", "ArrowUp"].includes(code)) {
      return;
    }

    e.preventDefault();

    const selected = this.getSelected();

    const nextSelectTarget =
      !selected
        ? this.#list.firstElementChild
      : code === "ArrowDown"
        ? selected.nextElementSibling
      : code === "ArrowUp"
        ? selected.previousElementSibling
      : null;

    if (!nextSelectTarget) {
      return;
    }

    this.select(nextSelectTarget);
  };
}

export const enableRadioFocus = () => {
  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (!["evaluation-test", "evaluation-report", "essay-report"].includes(content)) {
      return;
    }

    const radioLists = mainContentIframe.contentDocument.querySelectorAll("[data-type=perfect]");
    for (const list of radioLists) {
      new RadioList(list);
    }
  });
};
