describe('Cypress', () => {   
    it('is working', () => {     
        expect(true).to.equal(true)   
    }) 
    
    it('opens the app', () => {   
        cy.visit('https://master.d3izcz1kjo83i.amplifyapp.com/') 
    })
})