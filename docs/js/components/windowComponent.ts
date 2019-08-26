import { ExtendedHTMLElement } from "./abstract/extendedHTMLElement";
import { CustomElement } from "../decorators";

@CustomElement()
export class WindowComponent extends ExtendedHTMLElement {

	// Initialization

	public constructor(options?) {
		super();
	}

	// Lifecycle callbacks

	public connectedCallback() {
		const template = document.createElement("template");

		template.innerHTML = `
			<label>fewfewfewfewfew</label>
		`;

		this.appendChild(template.content);
	}
}
