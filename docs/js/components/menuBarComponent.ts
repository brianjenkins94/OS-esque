import { ExtendedHTMLElement } from "./abstract/extendedHTMLElement";
import { CustomElement } from "../decorators";

@CustomElement()
export class MenuBarComponent extends ExtendedHTMLElement {

	// Initialization

	public constructor(options?) {
		super();
	}

	// Lifecycle callbacks

	public connectedCallback() {
		const template = document.createElement("template");

		template.innerHTML = `
			<ul>
				<li>Finder</li>
			</ul>
		`;

		this.appendChild(template.content);
	}
}
