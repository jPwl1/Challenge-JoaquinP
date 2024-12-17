describe('Standard User test', {testIsolation :false },() => {

    before(() => {

        cy.visit('https://www.saucedemo.com')
      
      })

    it('TC 01 | Login | Validar login con user vacío', () => {

        cy.get('#login-button')
                .click()

        cy.get('.error-message-container')
                .contains('Epic sadface: Username is required')
                .should('be.visible')

    });

    it('TC 02 | Login | Validar login con usuario inválido', () => {

        cy.loginUser('invalidUser')

        cy.fixture('login').then((data) => {                       

            cy.get('.error-message-container')
                .contains(data.errorMessages.invalidUser)
                .should('be.visible')
        })
    });

    it('TC 03 | Login | Validar login con usuario correcto', () => {

        cy.loginUser('standardUser')
        cy.url()
            .should('include', '/inventory')        

    });

    it('TC 04 | Productos | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Products')

    })

    it('TC 05 | Productos | Validar nombre del producto', () => {

        cy.get('[data-test="inventory-item-name"]').each((name) => {

            cy.wrap(name).should('be.visible');
            cy.wrap(name).should('not.contain', 'allTheThings()')
        });

    })

    it('TC 06 | Productos | Validar descripción del producto', () => {

        cy.get('[data-test="inventory-item-desc"]').each((desc) => {

            cy.wrap(desc).should('be.visible');
            cy.wrap(desc).should('not.contain', 'allTheThings()')
        });

    })

    it('TC 07 | Productos | Validar precio del producto', () => {

        cy.get('[data-test="inventory-item-price"]').each((price) => {

            cy.wrap(price).should('contain', '$'); 
        });

    })

    it('TC 08 | Productos | Validar imagen del producto', () => {

        cy.get('img.inventory_item_img').each((img) => {

            cy.wrap(img)
                .invoke('attr', 'src')
                .should('not.contain', '404');
        });

    })

    it('TC 09 | Productos | Validar filtrar productos por nombre', () => {

        cy.get('.product_sort_container').as('filter')
            .should('have.value', 'az')
            .select('Name (Z to A)')
            .then(() => {
                cy.get('@filter')
                    .should('have.value', 'za');
            })       
            
    })

    it('TC 10 | Productos | Validar filtrar productos por precio', () => {

        cy.get('.product_sort_container').as('filter')
            .should('have.value', 'za')
            .select('Price (high to low)')
            .then(() => {
                cy.get('@filter')
                    .should('have.value', 'hilo');
        })
    })

    it('TC 11 | Productos | Validar funcionamiento a la página del producto (Item)', () => {

        cy.get('[data-test="inventory-item-name"]')
            .first()            
            .click()
        
        cy.url()
            .should('include', '/inventory-item')

    })

    it('TC 12 | Productos | Item | Validar nombre del producto', () => {

        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')

    })

    it('TC 13 | Productos | Item | Validar descripción del producto', () => {

        cy.get('[data-test="inventory-item-desc"]')
            .should('be.visible')

    })

    it('TC 14 | Productos | Item | Validar precio del producto', () => {

        cy.get('[data-test="inventory-item-price"]')
            .should('be.visible')

    })

    it('TC 15 | Productos | Item | Validar funcionamiento del botón "Add to cart"', () => {

        cy.addToCart()
        cy.get('#shopping_cart_container .shopping_cart_badge')
            .should('have.text', '1')
        cy.wait(500)

    })

    it('TC 16 | Productos | Item | Validar funcionamiento del botón "Remove"', () => {

        cy.removeProduct()
        cy.get('#shopping_cart_container .shopping_cart_badge')
            .should('not.exist')
        cy.wait(500)

    })

    it('TC 17 | Productos | Item | Validar funcionamiento del botón "Back to products"', () => {

        cy.get('[data-test="back-to-products"]')
            .click()
        cy.url()
            .should('include', '/inventory')

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

    it('TC 20 | Carrito | Validar funcionamiento del botón "Checkout" cuando NO hay productos agregados', () => {

        cy.get('#checkout')
            .click()

        cy.url()
            .should('not.include', '/checkout-step-one')
            
        cy.get('.error-message-container')
            .should('be.visible')
        
    })

    it('TC 21 | Checkout | Información | Validar funcionamiento del botón "Continue" cuando NO se agregan datos válidos', () => {

        cy.dataUser('invalidUser')

        cy.url()
            .should('not.include', '/checkout-step-two')

        cy.get('.error-message-container')                
           .should('be.visible')

    })

    it('TC 22 | Checkout | Detalles | Validar funcionamiento del botón "Finish" cuando NO hay productos', () => {

        cy.get('[data-test="finish"]')
            .click()
        
        cy.url()
            .should('not.include', '/checkout-complete')

        cy.get('.error-message-container')
            .should('be.visible')        

    })

    it('TC 23 | Checkout | Fin | Validar funcionamiento del botón "Back Home"', () => {

        cy.get('[data-test="back-to-products"]')
            .click()        
           
        cy.url()
           .should('include', '/inventory')

    })

    it('TC 24 | Productos | Validar funcionamiento de todos los botones de "Add to cart"', () => {

        cy.addToCart()
        cy.get('#shopping_cart_container .shopping_cart_badge')
            .should('have.text', '6')
        cy.wait(500)

    })

    it('TC 25 | Productos | Validar funcionamiento de todos los botones de "Remove"', () => {

        cy.removeProduct()
        cy.get('#shopping_cart_container .shopping_cart_badge')
            .should('not.exist')
        cy.wait(1000)

        cy.log('***** Se agregan nuevamente los productos y se accede al carrito en este TC para poder continuar con el test')

        cy.addToCart()
        cy.get('[data-test="shopping-cart-link"]')
            .click()            
        cy.url()
            .should('include', '/cart')

    })

    it('TC 26 | Carrito | Validar que el nombre del producto esté visible', () => {

        cy.get('[data-test="inventory-item-name"]').each((name) => {

            cy.wrap(name).should('be.visible');
        });

    })

    it('TC 27 | Carrito | Validar que la descripción del producto esté visible', () => {

        cy.get('[data-test="inventory-item-desc"]').each((desc) => {

            cy.wrap(desc).should('be.visible')
        });

    })

    it('TC 28 | Carrito | Validar que el precio del producto esté visible', () => {

        cy.get('[data-test="inventory-item-price"]').each((price) => {

            cy.wrap(price).should('contain', '$'); 
        });

    })

    it('TC 29 | Carrito | Validar funcionamiento del botón "Remove" de 1 producto', () => {

        cy.get('.btn.btn_secondary.btn_small.cart_button')            
            .first()
            .click()

        cy.get('#shopping_cart_container .shopping_cart_badge')
            .should('have.text', '5')        

    })

    it('TC 30 | Carrito | Validar funcionamiento del botón "Continue Shopping"', () => {

        cy.get('#continue-shopping')
            .click()                
        cy.url()
           .should('include', '/inventory')
        // Una vez comprobado su funcionamiento se regresa a la página del carrito
        cy.log('Se regresa a la página del carrito para continuar con el test')        
        cy.go('back')

    })

    it('TC 31 | Carrito | Validar funcionamiento del botón "Checkout"', () => {

        cy.get('[data-test="checkout"]')
            .click()
        cy.url()
            .should('include', '/checkout-step-one')

    })

    it('TC 32 | Checkout | Información | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Your Information')

    })

    it('TC 33 | Checkout | Información | Validar funcionamiento del botón "Cancel"', () => {

        cy.get('#cancel')
            .click()                
        cy.url()
           .should('include', '/cart')
        // Una vez comprobado su funcionamiento se regresa a la página de la información personal
        cy.log('Se regresa a la página de la información personal para continuar con el test')        
        cy.go('back')

    })

    it('TC 34 | Checkout | Información | Validar funcionamiento del botón "Continue" cuando NO se agregan datos', () => {

        cy.get('#continue')

        cy.get('.error-message-container')
                .should('be.visible')

        cy.url()
           .should('not.include', '/checkout-step-two')

    })

    it('TC 35 | Checkout | Información | Validar funcionamiento del botón "Continue" cuando se agregan datos válidos', () => {

        cy.dataUser('validUser')
                   
        cy.url()
           .should('include', '/checkout-step-two')

    })

    it('TC 36 | Checkout | Detalles | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Overview')

    })

    it('TC 37 | Checkout | Detalles | Validar que el nombre del producto esté visible', () => {

        cy.get('[data-test="inventory-item-name"]').each((name) => {

            cy.wrap(name).should('be.visible');
        });

    })

    it('TC 38 | Checkout | Detalles | Validar que la descripción del producto esté visible', () => {

        cy.get('[data-test="inventory-item-desc"]').each((desc) => {

            cy.wrap(desc).should('be.visible')
        });

    })

    it('TC 39 | Checkout | Detalles | Validar que el precio del producto esté visible', () => {

        cy.get('[data-test="inventory-item-price"]').each((price) => {

            cy.wrap(price).should('contain', '$'); 
        });

    })

    it('TC 40 | Checkout | Detalles | Validar que la información del pago esté visible', () => {

        cy.get('[data-test="payment-info-label"]')
            .should('be.visible')

    })

    it('TC 41 | Checkout | Detalles | Validar que la información de envio esté visible', () => {

        cy.get('[data-test="shipping-info-label"]')
            .should('be.visible')

    })

    it('TC 42 | Checkout | Detalles | Validar que el precio total esté visible', () => {

        cy.get('[data-test="total-info-label"]')
            .should('be.visible')

    })

    it('TC 43 | Checkout | Detalles | Validar que la suma del total de precios sea correcta', () => {

        cy.checkPrice()

    })

    it('TC 44 | Checkout | Detalles | Validar funcionamiento del botón "Cancel"', () => {

        cy.get('#cancel')
            .click()                
        cy.url()
           .should('include', '/inventory')
        // Una vez comprobado su funcionamiento se regresa a la página del detalle de compra
        cy.log('Se regresa a la página del detalle de compra para continuar con el test')        
        cy.go('back')

    })

    it('TC 45 | Checkout | Detalles | Validar funcionamiento del botón "Finish"', () => {

        cy.get('#finish')
            .click()                
        cy.url()
           .should('include', '/checkout-complete')        
    })    

    it('TC 46 | Checkout | Fin | Validar título de la página', () => {

        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Complete!')

    })

    it('TC 47 | Checkout | Fin | Validar mensaje de fin de compra', () => {

        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!')
        
        cy.get('[data-test="complete-text"]')
            .should('be.visible')
            .and('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')

    })    

    it('TC 48 | Checkout | Fin | Validar logout', () => {

        cy.get('#react-burger-menu-btn')
            .click()

        cy.get('#reset_sidebar_link')
            .click()

        cy.get('#logout_sidebar_link')
            .click()    

    })

})