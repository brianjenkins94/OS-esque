export abstract class ExtendedHTMLElement extends HTMLElement {
	private readonly events = {};

	// Initialization

	public constructor() {
		super();
	}

	// Events

	public emit(name, detail?) {
		globalThis.dispatchEvent(new CustomEvent(name, { ...detail }));
		globalThis.dispatchEvent(new CustomEvent("*", { ...detail }));
	}

	public on(type, listener) {
		globalThis.addEventListener(type, listener);

		this.events["type"] = listener;
	}

	public off(type) {
		globalThis.removeEventListener(type, this.events[type]);
	}
}
