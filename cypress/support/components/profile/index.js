import { el } from './elements'
class Profile {
    shouldHaveName(expectedName){
        cy.get('.sc-fzqBZW')
            .should('be.visible')
            .should('have.text', `Bem-vindo,${expectedName}`)
    }    
}
export default new Profile()