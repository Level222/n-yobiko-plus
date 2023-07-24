export const getElementAsync = (getTargetElement, parentElement, observerOptions) => new Promise((resolve) => {
  const resolveElement = () => {
    const targetElement = getTargetElement();
    if (!targetElement) {
      return false;
    }

    resolve(targetElement);
    return true;
  };

  const result = resolveElement();
  if (result) {
    return;
  }

  const observer = new MutationObserver(() => {
    const result = resolveElement();
    if (result) {
      observer.disconnect();
    }
  });

  observer.observe(parentElement, observerOptions);
});
