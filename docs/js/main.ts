import { WindowComponent } from "./components/windowComponent";

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener("DOMContentLoaded", async function(event) {
	const components = {
		"windowComponent": WindowComponent
	};

	for (const [componentName, ComponentConstructor] of Object.entries(components)) {
		document.querySelector("#main > table > tbody").innerHTML += `
			<tr>
				<td id="${componentName}Container"></td>
				<td>
					<img id="${componentName}Source" class="display-none" src="images/${componentName}.png" />
					<canvas id="${componentName}Image"></canvas>
				</td>
				<td>
					<canvas id="${componentName}Diff"></canvas>
				</td>
			</tr>
		`;

		document.getElementById(componentName + "Container").appendChild(new ComponentConstructor());

		const scaleFactor = window.devicePixelRatio;

		// Get dimensions from resultant canvas
		const { width, height } = await html2canvas(document.getElementById(componentName + "Container"));

		// referenceCanvas
		const referenceCanvas = document.getElementById(componentName + "Image");

		referenceCanvas.width = (width / scaleFactor);
		referenceCanvas.height = (height / scaleFactor);
		referenceCanvas.style.width = (width / scaleFactor) + "px";
		referenceCanvas.style.height = (height / scaleFactor) + "px";

		const referenceContext = referenceCanvas.getContext("2d");

		referenceContext.scale(1 / scaleFactor, 1 / scaleFactor);

		referenceContext.drawImage(document.getElementById(componentName + "Source"), 0, 0);

		// componentCanvas
		const componentCanvas = document.createElement("canvas");

		componentCanvas.width = (width / scaleFactor);
		componentCanvas.height = (height / scaleFactor);
		componentCanvas.style.width = (width / scaleFactor) + "px";
		componentCanvas.style.height = (height / scaleFactor) + "px";

		const componentContext = componentCanvas.getContext("2d");

		componentContext.scale(1 / scaleFactor, 1 / scaleFactor);

		componentContext.drawImage(await html2canvas(document.getElementById(componentName + "Container")), 0, 0);

		const originalCanvasImageData = componentContext.getImageData(0, 0, width, height).data;
		const referenceCanvasImageData = referenceContext.getImageData(0, 0, width, height).data;

		// diffCanvas
		const diffCanvas = document.getElementById(componentName + "Diff");

		diffCanvas.width = (width / scaleFactor);
		diffCanvas.height = (height / scaleFactor);
		diffCanvas.style.width = (width / scaleFactor) + "px";
		diffCanvas.style.height = (height / scaleFactor) + "px";

		const diffContext = diffCanvas.getContext("2d");

		diffContext.scale(1 / scaleFactor, 1 / scaleFactor);

		const diff = diffContext.createImageData(width, height);

		pixelmatch(originalCanvasImageData, referenceCanvasImageData, diff.data, width, height);

		diffContext.putImageData(diff, 0, 0);
	}
});
