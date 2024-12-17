describe('Challenge QA Automation', () => {
    beforeEach('Visito la pagina saucedemo', () => {
        // Limpio Cookies y el LocalStorage y accedo a la web de saucedemo.
        //cy.clearCookies();
        cy.intercept('POST', 'https://events.backtrace.io/api/summed-events/submit?universe=UNIVERSE&token=TOKEN', { fixtures: 'error401.json' }).as('TokenApi1');
        cy.intercept('POST', 'https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN', { fixtures: 'error401.json' }).as('TokenApi2');
        cy.visit('https://www.saucedemo.com/');

        cy.wait('@TokenApi1').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
        cy.log('Capturo POST Token1 401');

        cy.wait('@TokenApi2').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
        cy.log('Capturo POST Token2 401');
    });


    it('Login Standar_user', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click(), { timeout: 3000 };

    })

    it('Agregando compras al carrito', () => {
        cy.get('[id="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[id="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('[id="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[id="add-to-cart-sauce-labs-fleece-jacket"]').click(), { timeout: 3000 };

        //Agrego 4 elementos distintos al carrito de compra    
    })

    it('Finalizando compra', () => {

        cy.get('[class="shopping_cart_link"]').click(), { timeout: 3000 };
        cy.get('[id="checkout"]').click(), { timeout: 3000 };
        cy.get('[id="first-name"]').type('Eduardo');
        cy.get('[id="last-name"]').type('Carrizo');
        cy.get('[id="postal-code"]').type('1759'), { timeout: 1000 };
        cy.get('[id="finish"]').click(), { timeout: 1000 };
        cy.get('.complete-header').should('have.text', 'Thank you for your order!');
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[id="logout_sidebar_link"]').click(), { timeout: 1000 };

    })


});