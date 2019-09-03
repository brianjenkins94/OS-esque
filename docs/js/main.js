/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

class ExtendedHTMLElement extends HTMLElement {
    // Initialization
    constructor() {
        super();
        this.events = {};
    }
    // Events
    emit(name, detail) {
        globalThis.dispatchEvent(new CustomEvent(name, Object.assign({}, detail)));
        globalThis.dispatchEvent(new CustomEvent("*", Object.assign({}, detail)));
    }
    on(type, listener) {
        globalThis.addEventListener(type, listener);
        this.events["type"] = listener;
    }
    off(type) {
        globalThis.removeEventListener(type, this.events[type]);
    }
}
//# sourceMappingURL=extendedHTMLElement.js.map

function CustomElement() {
    return function (target) {
        const tagName = target.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        customElements.define(tagName, target);
        return customElements.get(tagName);
    };
}
//# sourceMappingURL=index.js.map

let WindowComponent = class WindowComponent extends ExtendedHTMLElement {
    // Initialization
    constructor(options) {
        super();
    }
    // Lifecycle callbacks
    connectedCallback() {
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
};
WindowComponent = __decorate([
    CustomElement()
], WindowComponent);

function primeCanvas(width, height, canvas) {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = (width / window.devicePixelRatio) + "px";
    canvas.style.height = (height / window.devicePixelRatio) + "px";
    const context = canvas.getContext("2d");
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    return context;
}
document.addEventListener("DOMContentLoaded", function (event) {
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
					<canvas id="${componentName}DiffCanvas"></canvas>
				</td>
			</tr>
		`;
        // componentContainer
        const componentContainer = document.getElementById(componentName + "Container");
        componentContainer.appendChild(new ComponentConstructor());
        const width = componentContainer.offsetWidth * window.devicePixelRatio;
        const height = componentContainer.offsetHeight * window.devicePixelRatio;
        // componentCanvas
        const componentCanvas = document.createElement("canvas");
        const componentContext = primeCanvas(width, height, componentCanvas);
        const componentImage = new Image();
        componentImage.addEventListener("load", function () {
            console.log("wrote!");
            componentContext.drawImage(componentImage, 0, 0);
            isComponentImageLoaded = true;
            if (isReferenceImageLoaded === true) {
                pixelMatch();
            }
        });
        componentImage.setAttribute("src", "images/" + componentName + ".png");
        // referenceCanvas
        const referenceCanvas = document.getElementById(componentName + "ReferenceCanvas");
        const referenceContext = primeCanvas(width, height, referenceCanvas);
        const referenceImage = new Image();
        referenceImage.addEventListener("load", function () {
            referenceContext.drawImage(referenceImage, 0, 0);
            isReferenceImageLoaded = true;
            if (isComponentImageLoaded === true) {
                pixelMatch();
            }
        });
        referenceImage.setAttribute("src", "images/" + componentName + "Reference.png");
        // diffCanvas
        const diffCanvas = document.getElementById(componentName + "DiffCanvas");
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
//# sourceMappingURL=main.js.map
