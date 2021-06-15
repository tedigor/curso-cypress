import {Given, Then} from "cypress-cucumber-preprocessor/steps";

const url = 'https://www.google.com.br';

Given('que eu acessei a página do google', () => {
    cy.visit(url);
});

Then('eu visualizo {string} no título', (tittle) => {
    // cy.get('#SIvCob').should('contain', 'Disponibilizado pelo Google em:  ');
    cy.title().should('contain', tittle);
});
