
describe("Tickets", () => {

    const baseUrl = "https://bit.ly/2XSuwCW";
    const firstName = "Ted";
    const lastName = "Medeiros";
    const email = "ted@testes.com";
    const invalidEmail = "ted-testes.com";
    const fullName = `${firstName} ${lastName}`;
    const request = 'Arroz de leite';
    beforeEach(() => cy.visit(baseUrl));

    /**
     * Get and fill inputs elements
     */
    it("fills all the text input fields", () => {
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type(email);
        cy.get("#requests").type(request);
        cy.get("#signature").type(fullName);
    });

    /**
     * Get and check selects element
     */
    it("Select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    /**
     * Get and check radio-buttons elements
     */
    it("Select 'Vip' ticket type", () => {
        cy.get('#vip').check();
    });

    /**
     * Get and check checkbox elements
     */
    it("Select 'social media' checkbox", () => {
        cy.get('#social-media').check();
    });

    /**
     * Check and uncheck checkbox elements
     */
    it("Select 'friend', and 'publication', then uncheck 'friend'", () => {
        cy.get('#friend').check();
        cy.get('#publication').check();
        cy.get('#friend').uncheck();


    });

    /**
     * Performing assertions check
     */
    it("Has 'TICKETBOX' header's heading", () => {
        cy.get('header h1').should('contain', 'TICKETBOX');
        cy.get('.form-field label[for="first-name"]').should('contain', 'First Name');
    });

    /**
     * Performing assertions check: invalid field
     */
    it("Alerts on invalid email", () => {

        cy.get('#email')
            .as('email')
            .type(invalidEmail);

        cy.get('#email.invalid').should('exist');

        cy.get('@email').clear().type(email);

        cy.get('#email.invalid').should('not.exist');
    });

    /**
     * Performing a e2e test
     */
    it("fill and reset the form", () => {

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type(email);
        cy.get("#ticket-quantity").select("2");
        cy.get('#vip').check();
        cy.get('#friend').check();
        cy.get("#requests").type(request);

        cy.get('.agreement p').should('contain',
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get('#agree').check();
        cy.get("#signature").type(fullName);

        cy.get('button[type="submit"]').as('submitButton').should('not.be.disabled');
        cy.get('button[type="reset"]').click();

        cy.get('@submitButton').should('be.disabled');
    });

    /**
    * Using customer Cypress command to perform actions
    */
    it("fill mandatory fields using support command", () => {
        const customer = {
            firstName: 'Ted',
            lastName: 'Medeiros',
            email: 'ted@test.com'
        }
        
        cy.fillMandatoryFields(customer);
        cy.get('button[type="submit"]').as('submitButton').should('not.be.disabled');

        cy.get('#agree').uncheck();

        cy.get('@submitButton').should('be.disabled');
    });

});