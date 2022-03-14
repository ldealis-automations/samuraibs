import { el } from './elements'

class Toast {
    shouldHaveTest(expectedText) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectedText)
    }
}
export default new Toast()