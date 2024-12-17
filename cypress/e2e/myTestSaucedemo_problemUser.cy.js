describe('Problem User test', {testIsolation :false },() => {

    before(() => {

        cy.visit('https://www.saucedemo.com')
      
      })

    
    it('TC 01 | Login | Validar login con usuario correcto', () => {

        cy.loginUser('problemUser')
        cy.url()
            .should('include', '/inventory')        

    });

    it('TC 02 | Productos | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Products')

    })

    it('TC 03 | Productos | Validar nombre del producto', () => {

        cy.get('[data-test="inventory-item-name"]').each((name) => {

            cy.wrap(name).should('be.visible');
            cy.wrap(name).should('not.contain', 'allTheThings()')
        });

    })

    it('TC 04 | Productos | Validar descripción del producto', () => {

        cy.get('[data-test="inventory-item-desc"]').each((desc) => {

            cy.wrap(desc).should('be.visible');
            cy.wrap(desc).should('not.contain', 'allTheThings()')
        });

    })

    it('TC 05 | Productos | Validar precio del producto', () => {

        cy.get('[data-test="inventory-item-price"]').each((price) => {

            cy.wrap(price).should('contain', '$'); 
        });

    })

    it('TC 06 | Productos | Validar imagen del producto', () => {

        cy.get('img.inventory_item_img').each((img) => {

            cy.wrap(img)
                .invoke('attr', 'src')
                .should('not.contain', '404');
        });

    })

    it('TC 07 | Productos | Validar filtrar productos por nombre', () => {

        cy.get('.product_sort_container').as('filter')
            .should('have.value', 'az')
            .select('Name (Z to A)')
            .then(() => {
                cy.get('@filter')
                    .should('have.value', 'za');
            })       
            
    })

    it('TC 08 | Productos | Validar filtrar productos por precio', () => {

        cy.get('.product_sort_container').as('filter')
            .should('have.value', 'za')
            .select('Price (high to low)')
            .then(() => {
                cy.get('@filter')
                    .should('have.value', 'hilo');
        })
    })

    it('TC 09 | Productos | Validar funcionamiento a la página del producto (Item)', () => {

        cy.get('[data-test="inventory-item-name"]')
            .first()            
            .click()
        
        cy.url()
            .should('include', '/inventory-item')

    })

    it('TC 10 | Productos | Item | Validar nombre del producto', () => {

        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')

    })

    it('TC 11 | Productos | Item | Validar descripción del producto', () => {

        cy.get('[data-test="inventory-item-desc"]')
            .should('be.visible')

    })

    it('TC 12 | Productos | Item | Validar precio del producto', () => {

        cy.get('[data-test="inventory-item-price"]')
            .should('be.visible')

    })

    it('TC 13 | Productos | Item | Validar funcionamiento del botón "Add to cart"', () => {

        cy.addToCart()
        cy.wait(500)

    })

    it('TC 14 | Productos | Item | Validar funcionamiento del botón "Remove"', () => {

        cy.removeProduct()        
        cy.wait(500)

    })

    it('TC 15 | Productos | Item | Validar funcionamiento del botón "Back to products"', () => {

        cy.get('[data-test="back-to-products"]')
            .click()
        cy.url()
            .should('include', '/inventory')

    })

    it('TC 16 | Productos | Validar funcionamiento de todos los botones de "Add to cart"', () => {

        cy.addToCart()
        cy.get('#shopping_cart_container .shopping_cart_badge')
            .should('have.text', '6')

    })

    it('TC 17 | Productos | Validar funcionamiento de todos los botones de "Remove"', () => {

        cy.removeProduct()
        cy.get('#shopping_cart_container .shopping_cart_badge')
            .should('not.exist')   

    })

    it('TC 18 | Productos | Validar funcionamiento del botón del carrito', () => {

        cy.get('[data-test="shopping-cart-link"]')
            .click()            
        cy.url()
            .should('include', '/cart')

    })

    it('TC 19 | Carrito | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Your Cart')

    })       

    it('TC 20 | Carrito | Validar que el nombre del producto esté visible', () => {

        cy.get('[data-test="inventory-item-name"]').each((name) => {

            cy.wrap(name).should('be.visible');
        });

    })

    it('TC 21 | Carrito | Validar que la descripción del producto esté visible', () => {

        cy.get('[data-test="inventory-item-desc"]').each((desc) => {

            cy.wrap(desc).should('be.visible')
        });

    })

    it('TC 22 | Carrito | Validar que el precio del producto esté visible', () => {

        cy.get('[data-test="inventory-item-price"]').each((price) => {

            cy.wrap(price).should('contain', '$'); 
        });

    })

    it('TC 23 | Carrito | Validar funcionamiento del botón "Remove" de 1 producto', () => {

        cy.get('.btn.btn_secondary.btn_small.cart_button')            
            .first()
            .click()      

    })

    it('TC 24 | Carrito | Validar funcionamiento del botón "Continue Shopping"', () => {

        cy.get('#continue-shopping')
            .click()                
        cy.url()
           .should('include', '/inventory')
        // Una vez comprobado su funcionamiento se regresa a la página del carrito
        cy.log('Se regresa a la página del carrito para continuar con el test')        
        cy.go('back')

    })

    it('TC 25 | Carrito | Validar funcionamiento del botón "Checkout"', () => {

        cy.get('[data-test="checkout"]')
            .click()
        cy.url()
            .should('include', '/checkout-step-one')

    })

    it('TC 26 | Checkout | Información | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Your Information')

    })

    it('TC 27 | Checkout | Información | Validar funcionamiento del botón "Cancel"', () => {

        cy.get('#cancel')
            .click()                
        cy.url()
           .should('include', '/cart')
        // Una vez comprobado su funcionamiento se regresa a la página de la información personal
        cy.log('Se regresa a la página de la información personal para continuar con el test')        
        cy.go('back')

    })    

    it('TC 28 | Checkout | Información | Validar funcionamiento del botón "Continue" cuando se agregan datos válidos', () => {

        cy.fixture('info').then((data) => {
            
            cy.get('[data-test="firstName"]').type(data.validUser.firstName)
            cy.get('[data-test="lastName"]')
                .then((input) => {
                    input.val(data.validUser.lastName);
                    input.trigger('input')
                    input.trigger('change')                    
                })
            cy.get('[data-test="postalCode"]').type(data.validUser.postalCode)

            cy.get('#continue')
                .click()

            cy.get('[data-test="firstName"]')
                .should('have.value', data.validUser.firstName)
            cy.get('[data-test="lastName"]')
                .should('have.value', data.validUser.lastName)
            cy.get('[data-test="postalCode"]')
                .should('have.value', data.validUser.postalCode)
        })                

    })

    it('TC 29 | Checkout | Detalles | Validar título de la página', () => {

        cy.log('***** Se fuerza el cambio de página *****')
        cy.visit('https://www.saucedemo.com/checkout-step-two.html', {failOnStatusCode: false}); 
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Overview')

    })

    it('TC 30 | Checkout | Detalles | Validar que el nombre del producto esté visible', () => {

        cy.get('[data-test="inventory-item-name"]').each((name) => {

            cy.wrap(name).should('be.visible');
        });

    })

    it('TC 31 | Checkout | Detalles | Validar que la descripción del producto esté visible', () => {

        cy.get('[data-test="inventory-item-desc"]').each((desc) => {

            cy.wrap(desc).should('be.visible')
        });

    })

    it('TC 32 | Checkout | Detalles | Validar que el precio del producto esté visible', () => {

        cy.get('[data-test="inventory-item-price"]').each((price) => {

            cy.wrap(price).should('contain', '$'); 
        });

    })

    it('TC 33 | Checkout | Detalles | Validar que la información del pago esté visible', () => {

        cy.get('[data-test="payment-info-label"]')
            .should('be.visible')

    })

    it('TC 34 | Checkout | Detalles | Validar que la información de envio esté visible', () => {

        cy.get('[data-test="shipping-info-label"]')
            .should('be.visible')

    })

    it('TC 35 | Checkout | Detalles | Validar que el precio total esté visible', () => {

        cy.get('[data-test="total-info-label"]')
            .should('be.visible')

    })

    it('TC 36 | Checkout | Detalles | Validar que la suma del total de precios sea correcta', () => {

        cy.checkPrice()

    })

    it('TC 37 | Checkout | Detalles | Validar funcionamiento del botón "Cancel"', () => {

        cy.get('#cancel')
            .click()                
        cy.url()
           .should('include', '/inventory')
        // Una vez comprobado su funcionamiento se regresa a la página del detalle de compra
        cy.log('Se regresa a la página del detalle de compra para continuar con el test')        
        cy.go('back')

    })

    it('TC 38 | Checkout | Detalles | Validar funcionamiento del botón "Finish"', () => {

        cy.get('#finish')
            .click()                
        cy.url()
           .should('include', '/checkout-complete')        
    })    

    it('TC 39 | Checkout | Fin | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Complete!')

    })

    it('TC 40 | Checkout | Fin | Validar mensaje de fin de compra', () => {

        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!')
        
        cy.get('[data-test="complete-text"]')
            .should('be.visible')
            .and('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')

    })
    
    it('TC 41 | Checkout | Fin | Validar funcionamiento del botón "Back Home"', () => {

        cy.get('[data-test="back-to-products"]')
            .click()        
           
        cy.url()
           .should('include', '/inventory')

    })

    it('TC 42 | Productos | Validar logout', () => {

        cy.get('#react-burger-menu-btn')
            .click()

        cy.get('#reset_sidebar_link')
            .click()

        cy.get('#logout_sidebar_link')
            .click()    

    })

})