import { WindowComponent } from "./components/windowComponent";

function primeCanvas(width, height, canvas) {
	canvas.width = width;
	canvas.height = height;
	canvas.style.width = width + "px";
	canvas.style.height = height + "px";

	const context = canvas.getContext("2d");

	//context.scale(window.devicePixelRatio, window.devicePixelRatio);

	return context;
}

document.addEventListener("DOMContentLoaded", function(event) {
	const components = {
		"windowComponent": WindowComponent
	};

	for (const [componentName, ComponentConstructor] of Object.entries(components)) {
		let isComponentImageLoaded = false;
		let isReferenceImageLoaded = false;

		document.querySelector("#main > table > tbody").innerHTML += `
			<tr>
				<td id="${componentName}Container"></td>
				<td>
					<canvas id="${componentName}ReferenceCanvas"></canvas>
				</td>
				<td>
					<canvas id="${componentName}Diff"></canvas>
				</td>
			</tr>
		`;

		// componentContainer
		const componentContainer = document.getElementById(componentName + "Container");

		componentContainer.appendChild(new ComponentConstructor());

		const width = componentContainer.clientWidth; // * window.devicePixelRatio;
		const height = componentContainer.clientHeight; // * window.devicePixelRatio;

		// componentCanvas
		const componentCanvas = document.createElement("canvas");

		const componentContext = primeCanvas(width, height, componentCanvas);

		const componentImage = new Image();

		componentImage.addEventListener("load", function() {
			componentContext.drawImage(componentImage, 0, 0);

			isComponentImageLoaded = true;

			if (isReferenceImageLoaded === true) {
				pixelMatch();
			}
		});

		componentImage.setAttribute("src", "images/" + componentName + "Reference.png");

		// referenceCanvas
		const referenceCanvas = document.getElementById(componentName + "ReferenceCanvas");

		const referenceContext = primeCanvas(width, height, referenceCanvas);

		const referenceImage = new Image();

		referenceImage.addEventListener("load", function() {
			referenceContext.drawImage(referenceImage, 0, 0);

			isReferenceImageLoaded = true;

			if (isComponentImageLoaded === true) {
				pixelMatch();
			}
		});

		referenceImage.setAttribute("src", "images/" + componentName + "Reference.png");

		// diffCanvas
		const diffCanvas = document.getElementById(componentName + "Diff");

		const diffContext = primeCanvas(width, height, diffCanvas);

		const diff = diffContext.createImageData(width, height);

		// pixelMatch()
		function pixelMatch() {
			const originalCanvasImageData = componentContext.getImageData(0, 0, width, height).data;
			const referenceCanvasImageData = referenceContext.getImageData(0, 0, width, height).data;
			const diffCanvasImageData = diff.data;

			pixelmatch(originalCanvasImageData, referenceCanvasImageData, diffCanvasImageData, width, height);

			diffContext.putImageData(diff, 0, 0);
		}
	}
});
