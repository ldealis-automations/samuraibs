import { el } from './elements'
import toast from '../../components/toast'
class LoginPage {
    constructor() {
        this.toast = toast
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
}
export default new LoginPage()