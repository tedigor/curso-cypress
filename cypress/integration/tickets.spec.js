
const baseUrl = "https://bit.ly/2XSuwCW";
const firstName = "Ted";
const lastName = "Medeiros";
const email = "ted@testes.com"


describe("Tickets", () => {
    beforeEach(() =>  cy.visit(baseUrl));
    it.only("fills all the text input fields", () => {
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type(email);
        cy.get("#requests").type("Arroz de leite");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });
    
    it("has 'TICKETBOX' header's heading", ()=> {});
});