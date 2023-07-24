import { onMainContentIframeMutated } from "./on-main-content-iframe-mutated";

export const enableWordCounting = () => {
  const segmenter = new Intl.Segmenter("ja-JP", { granularity: 'word' });

  onMainContentIframeMutated.addListener(({ content, mainContentIframe }) => {
    if (!["evaluation-test", "evaluation-report", "essay-report"].includes(content)) {
      return;
    }

    const mainContentDoc = mainContentIframe.contentDocument;
    const inputElements = mainContentDoc.querySelectorAll(":is(input, textarea).answers");
    for (const inputElement of inputElements) {
      const wordCountElement = document.createElement("span");
      const countParent = inputElement.nextElementSibling.querySelector(".counter");
      countParent.style.gap = "4px";
      countParent.append(wordCountElement);

      const updateWordCount = () => {
        const segments = [...segmenter.segment(inputElement.value)];
        const wordCount = segments.filter(({ isWordLike }) => isWordLike).length;
        wordCountElement.textContent = `${wordCount}単語`;
      };

      updateWordCount();
      inputElement.addEventListener("input", updateWordCount);
    }
  });
};
