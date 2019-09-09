import { WindowComponent } from "./components/windowComponent";
import { MenuBarComponent } from "./components/menuBarComponent";

document.addEventListener("DOMContentLoaded", function(event) {
	const components = {
		"windowComponent": WindowComponent,
		"menuBarComponent": MenuBarComponent
	};

	for (const [componentName, ComponentConstructor] of Object.entries(components)) {
		const template = document.createElement("template");

		template.innerHTML = `
			<tr>
				<td id="${componentName}Container" style="background: url('images/${componentName}Reference.png') no-repeat 1px 1px;"></td>
			</tr>
		`;

		document.querySelector("#main > table > tbody").appendChild(template.content);

		// componentContainer
		const componentContainer = document.getElementById(componentName + "Container");

		componentContainer.appendChild(new ComponentConstructor());
	}
});
