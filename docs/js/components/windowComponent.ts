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
			<header class="row">
				<div class="2u controls">
					<button class="control close"></button>
					<button class="control minimize"></button>
					<button class="control maximize"></button>
				</div>
				<div class="8u title">Window</div>
			</header>
			<main>
			</main>
		`;

		this.appendChild(template.content);
	}
}
