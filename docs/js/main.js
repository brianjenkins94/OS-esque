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
        this.events[type] = listener;
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
};
WindowComponent = __decorate([
    CustomElement()
], WindowComponent);
//# sourceMappingURL=windowComponent.js.map

let MenuBarComponent = class MenuBarComponent extends ExtendedHTMLElement {
    // Initialization
    constructor(options) {
        super();
    }
    // Lifecycle callbacks
    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = `
			<ul>
				<li>Finder</li>
			</ul>
		`;
        this.appendChild(template.content);
    }
};
MenuBarComponent = __decorate([
    CustomElement()
], MenuBarComponent);
//# sourceMappingURL=menuBarComponent.js.map

document.addEventListener("DOMContentLoaded", function (event) {
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
