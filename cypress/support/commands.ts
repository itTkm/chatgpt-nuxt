// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Get component commands
 */

Cypress.Commands.add("chatSideBar", () => {
  return cy.get("#sidebar");
});

Cypress.Commands.add("logoBar", () => {
  return cy.chatSideBar().children("div").eq(0);
});

Cypress.Commands.add("chatList", () => {
  return cy.chatSideBar().children("div").eq(1);
});

Cypress.Commands.add("chatListItems", () => {
  return cy.chatList().find(".group");
});

Cypress.Commands.add("funcBar", () => {
  return cy.chatSideBar().children("div").eq(2);
});

/**
 * Test commands
 */

Cypress.Commands.add("shouldExist", { prevSubject: "element" }, (subject) => {
  return cy.wrap(subject).should("exist");
});

Cypress.Commands.add(
  "shouldNotExist",
  { prevSubject: "element" },
  (subject) => {
    return cy.wrap(subject).should("not.exist");
  }
);

Cypress.Commands.add(
  "shouldBeVisible",
  { prevSubject: "element" },
  (subject) => {
    return cy.wrap(subject).should("be.visible");
  }
);

Cypress.Commands.add(
  "shouldNotBeVisible",
  { prevSubject: "element" },
  (subject) => {
    return cy.wrap(subject).should("not.be.visible");
  }
);

Cypress.Commands.add(
  "shouldHaveLength",
  { prevSubject: "element" },
  (subject, length: number) => {
    return cy.wrap(subject).should("have.length", length);
  }
);

Cypress.Commands.add(
  "shouldHaveText",
  { prevSubject: "element" },
  (subject, text: string) => {
    return cy.wrap(subject).should("have.text", text);
  }
);

Cypress.Commands.add(
  "shouldIncludeText",
  { prevSubject: "element" },
  (subject, text: string) => {
    return cy.wrap(subject).should("include.text", text);
  }
);

Cypress.Commands.add(
  "shouldNotIncludeText",
  { prevSubject: "element" },
  (subject, text: string) => {
    return cy.wrap(subject).should("not.include.text", text);
  }
);

Cypress.Commands.add(
  "findIcon",
  { prevSubject: "element" },
  (subject, iconClass: string) => {
    return cy.wrap(subject).find(`span.i-icon.${iconClass}`);
  }
);
