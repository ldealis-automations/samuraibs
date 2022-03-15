import { el } from './elements'
import toast from '../../components/toast'
import profile from '../../components/profile'
class LoginPage {
    constructor() {
        this.toast = toast
        this.profile = profile
    }
    go() {
        cy.visit('/')
    }
    loginForm(user) {
        cy.get(el.email)
            .type(user.email)
        cy.get(el.password)
            .type(user.password)
    }
    submit() {
        cy.contains(el.loginButton)
            .click()
    }
    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }
}
export default new LoginPage()