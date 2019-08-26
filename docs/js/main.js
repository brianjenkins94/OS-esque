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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
			<label>fewfewfewfewfew</label>
		`;
        this.appendChild(template.content);
    }
};
WindowComponent = __decorate([
    CustomElement()
], WindowComponent);
//# sourceMappingURL=windowComponent.js.map

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener("DOMContentLoaded", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const { width, height } = yield html2canvas(document.getElementById(componentName + "Container"));
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
            componentContext.drawImage(yield html2canvas(document.getElementById(componentName + "Container")), 0, 0);
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
});
