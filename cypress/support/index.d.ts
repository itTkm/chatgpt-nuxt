/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get ChatSideBar element
     * @example
     * cy.chatSideBar()
     */
    chatSideBar(): Chainable<any>;

    /**
     * Get LogoBar element
     * @example
     * cy.logoBar()
     */
    logoBar(): Chainable<any>;

    /**
     * Get ChatList element
     * @example
     * cy.chatList()
     */
    chatList(): Chainable<any>;

    /**
     * Get ChatList elements
     * @example
     * cy.chatListItems()
     */
    chatListItems(): Chainable<any>;

    /**
     * Get FuncBar element
     * @example
     * cy.funcBar()
     */
    funcBar(): Chainable<any>;

    /**
     * Test: should exist
     * @example
     * cy.get('element').shouldExist()
     */
    shouldExist(): Chainable<any>;

    /**
     * Test: should not exist
     * @example
     * cy.get('element').shouldNotExist()
     */
    shouldNotExist(): Chainable<any>;

    /**
     * Test: should be visible
     * @example
     * cy.get('element').shouldBeVisible()
     */
    shouldBeVisible(): Chainable<any>;

    /**
     * Test: should not be visible
     * @example
     * cy.get('element').shouldNotBeVisible()
     */
    shouldNotBeVisible(): Chainable<any>;

    /**
     * Test: should have length
     * @example
     * cy.get('element').shouldHaveLength(3)
     */
    shouldHaveLength(length: number): Chainable<any>;

    /**
     * Test: should have text
     * @example
     * cy.get('element').shouldHaveText('text')
     */
    shouldHaveText(text: string): Chainable<any>;

    /**
     * Test: should include text
     * @example
     * cy.get('element').shouldIncludeText('text')
     */
    shouldIncludeText(text: string): Chainable<any>;

    /**
     * Test: should not include text
     * @example
     * cy.get('element').shouldNotIncludeText('text')
     */
    shouldNotIncludeText(text: string): Chainable<any>;

    /**
     * Test: find icon
     * @example
     * cy.get('element').findIcon('i-icon-robot')
     */
    findIcon(iconClass: string): Chainable<any>;
  }
}
