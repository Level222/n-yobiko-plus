export class OriginalEvent {
  #handlers = new Set();
  #init;
  #initCalled = false;

  constructor(init) {
    this.#init = init;
  }

  addListener(handler) {
    if (!this.#initCalled) {
      this.#init(this.#dispatch);
      this.#initCalled = true;
    }

    this.#handlers.add(handler);
  }

  #dispatch = (...args) => {
    for (const handler of this.#handlers) {
      handler(...args);
    }
  };
}
