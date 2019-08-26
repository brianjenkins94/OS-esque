export function CustomElement() {
	return function(target) {
		const tagName = target.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

		customElements.define(tagName, target);

		return customElements.get(tagName);
	};
}
