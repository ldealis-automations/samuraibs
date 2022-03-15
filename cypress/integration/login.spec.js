///<reference types="Cypress" />
import loginPage from '../support/pages/login'

describe('validar página de login', ()=>{
    context('quando possui usuário com email e senha válidos', ()=>{
        const user = {
            name: "Luiz Class",
            email: "luizclass@samuraibs.com",
            password: "123456",
            is_provider: true
        }
        before(()=>{
            cy.task('removeUser', user.email)
                .then((result)=>{
                    console.log(result)
                })
            cy.request('POST', 'http://localhost:3333/users', user)
                .then((response)=>{
                    expect(response.status).to.eq(200)
                })
        })
        it('deve efetuar login e acessar o dashboard', ()=>{
            loginPage.go()
            loginPage.loginForm(user)
            loginPage.submit()
            cy.get('.sc-fzqBZW')
                .should('have.text', `Bem-vindo,${user.name}`)
        })
    })
    context.only('quando possui usuário com email correto e senha incorreta', ()=>{
        const user = {
            name: "Luiz Class",
            email: "luizclass@samuraibs.com",
            password: "123456",
            is_provider: true
        }
        before(()=>{
            cy.task('removeUser', user.email)
                .then((result)=>{
                    console.log(result)
                })
            cy.request('POST', 'http://localhost:3333/users', user)
                .then((response)=>{
                    expect(response.status).to.eq(200)
                })
        })
        it('deve efetuar login e acessar o dashboard', ()=>{
            const userInvalidPassword = {
                email: user.email,
                password: "abc123"
            }
            loginPage.go()
            loginPage.loginForm(userInvalidPassword)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })
})