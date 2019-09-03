/// <reference types="Cypress" />

context("Click!", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080");
	});

	it("Take screenshot", () => {
		cy.get("#main > table > tbody > tr > td:first-child").each((element, index) => {
			let [{ id }] = element;

			id = id.substring(0, id.length - "Container".length);

			cy.get(element).screenshot(id);
		});
	});
});
