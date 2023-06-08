import * as console from "console";

describe("Canvas", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.visit("/login");
      cy.get('[name="username"]').type("admin");
      cy.get('[name="password"]').type("admin");
      cy.get('[type="button"][value="Sign in"]').click();
    });
  });
  it("should display all page elements on index page", () => {
    cy.visit("/");
    // Add new Activity menu items
    cy.get(".app-form > p").should("be.visible");
    cy.get('.app-form [type="text"]').should("be.visible");
    cy.get('.app-form [type="button"]').should("be.visible");
    // Initial nodes
    cy.get(".custom-node").should("have.length", 2);
  });
});
