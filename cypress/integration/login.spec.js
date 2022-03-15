///<reference types="Cypress" />
import loginPage from '../support/pages/login'

describe('validar página de login', ()=>{
    context('quando inserir usuário com email e senha válidos', ()=>{
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
    context('quando inserir usuário com email correto e senha incorreta', ()=>{
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
        it('não deve fazer e login e a mensagem de erro deve ser exibida', ()=>{
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
    context('quando inserir usuário com email inválido', ()=>{
        const user = {
            name: "Luiz Class",
            email: "luizclasssamuraibs.com",
            password: "123456",
            is_provider: true
        }
        it('não deve logar e deve exibir a mensagem de alerta', ()=>{
            loginPage.go()
            loginPage.loginForm(user)
            loginPage.submit()
            loginPage.alertHaveText('Informe um email válido')
        })
    })
    context('quando não preencher campos email e senha', ()=>{
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]
        before(()=>{
            loginPage.go()
            loginPage.submit()
        })
        alertMessages.forEach((alert)=>{
            it('deve exibir ' + alert.toLowerCase(), ()=>{
                loginPage.alertHaveText(alert)
            })
        })
    })
})