Cypress.Commands.add('loginUser', (type) =>{

    cy.fixture('login').then((data) => {

        const user = data[type];

        if (user) {

            cy.get('#user-name')
                .clear()
                .type(user.username);
            cy.get('#password')
                .clear()
                .type(user.password);
            cy.get('#login-button')
                .click();
        } else {

            cy.log('Usuario no válido')

        }
    })
})

Cypress.Commands.add('addToCart', () => {

    cy.get('button[id*="add"]').each(btn =>{
        btn.click()
    })
    
    cy.get('button[id*="remove"]')
        .should('be.visible')    

    cy.get('button[id*="remove"]').each(btn =>{
        expect(btn).to.have.class('btn_secondary')
        expect(btn).to.contain('Remove')
        expect(btn).to.have.css('color', 'rgb(226, 35, 26)')               
    })

    cy.get('button[id*="add"]')
        .should('not.exist');

});

Cypress.Commands.add('removeProduct', () => {

    cy.get('button[id*="remove"]').each(btn =>{
        btn.click()
    })

    cy.get('button[id*="add"]')
        .should('be.visible')     

    cy.get('button[id*="add"]').each(btn =>{
        expect(btn).to.have.class('btn_primary')
        expect(btn).to.contain('Add to cart')
        expect(btn).to.have.css('color', 'rgb(19, 35, 34)')               
    })

    cy.get('button[id*="remove"]')
        .should('not.exist');
    
});

Cypress.Commands.add('dataUser', (type) =>{

    cy.fixture('info').then((data) => {

        const user = data[type];

        if (user) {

            cy.get('#first-name')
                .clear()
                .type(user.firstName);
            cy.get('#last-name')
                .clear()
                .type(user.lastName);
            cy.get('#postal-code')
                .clear()
                .type(user.postalCode);
            cy.get('#continue')
                .click();
        } else {

            cy.log('Usuario no válido')

        }
    })
})

Cypress.Commands.add('checkPrice', () => {

    let productPrices = [];
    
    cy.get('[data-test="inventory-item-price"]').each((price) => {
      
      const itemPrice = parseFloat(price.text().replace('$', '').trim())

      productPrices.push(itemPrice)}).then(() => {
      
        const totalExpected = productPrices.reduce((sum, itemPrice) => sum + itemPrice, 0);
        
        cy.get('[data-test="subtotal-label"]').then((subtotal) => {

            const subtotalText = subtotal.text();
            const pageSubtotal = parseFloat(subtotalText.replace('Item total: $', '').trim());
            
            expect(pageSubtotal).to.eq(totalExpected);
      });
    });
})