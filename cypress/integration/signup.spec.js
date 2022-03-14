///<reference types="Cypress" />

import signupPage from '../support/pages/signup'

describe('cadastro', () => {

    context('quando for novo usuário', () => {
        const user = {
            name: 'Luiz',
            email: 'luiz@samuraibs.com',
            password: '123456',
            is_provider: true
        }
        before(() => {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar um novo usuário com sucesso', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            // cy.intercept('POST', '/users', {
            //     statusCode: 200
            // }).as('postUser')    
            // cy.wait('@postUser')
        })

    })
    context('quando o email já estiver cadastrado', () => {
        const user = {
            name: 'Luiz',
            email: 'luiz@samuraibs.com',
            password: '123456',
            is_provider: true
        }
        before(() => {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
            cy.request('POST', 'http://localhost:3333/users', user)
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
        })
        it('não deve cadastrar o usuário', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Email já cadastrado para outro usuário.')
        })
    })
    context('quando o email está em formato incorreto', () => {
        const user = {
            name: 'Luiz',
            email: 'luiz.samuraibs.com',
            password: '123456',
            is_provider: true
        }
        it('deve exixir mensagem de alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })


    })
    context('quando a senha tem 1 caractere', () => {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'abc#5']

        beforeEach(() => {
            signupPage.go()            
        })
        passwords.forEach((pass) => {
            it('não deve cadastrar com a senha ' + pass, () => {
                const user = {
                    name: 'Luiz',
                    email: 'luiz@samuraibs.com',
                    password: pass,
                    is_provider: true
                }
                signupPage.form(user)
                signupPage.submit()
            })
        })
        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })


    })
    context.only('quando não preencho nenhum dos campos', ()=>{
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]
        before(()=>{
            signupPage.go()
            signupPage.submit()
        })
        alertMessages.forEach((alert)=>{
            it('deve exibir ' + alert.toLowerCase(), ()=>{
                signupPage.alertHaveText(alert)
            })
        })
    })
})