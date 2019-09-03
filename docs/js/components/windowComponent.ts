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
			<style>
				window-component {
					border: 1px solid black;
					display: block;
				}
				window-component > header {
					height: 22px;
				}
				window-component > header > ul {
					margin: 0;
					padding: 0;
					list-style-type: none;
				}
				window-component > header > ul > li {
					float: left;
				}
				window-component > main {
					min-width: 100%;
					min-height: 94px;
				}
			</style>

			<header>
				<ul>
					<li><i class="fa fa-circle"></i></li>
					<li><i class="fa fa-circle"></i></li>
					<li><i class="fa fa-circle"></i></li>
				</ul>
				<span>Window</span>
			</header>
			<main>
			</main>
		`;

		this.appendChild(template.content);
	}
}
