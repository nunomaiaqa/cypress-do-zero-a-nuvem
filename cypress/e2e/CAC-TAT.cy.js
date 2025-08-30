describe('Central de Atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

    it('verifica o titulo da aplicação',()=> {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatoriose envia o formulario',()=>{
      cy.clock()
      const longText = Cypress._.repeat('abcdefghijklmnopqrstvuxz',10)
      cy.get('#firstName').type('Nuno Miguel')
      cy.get('#lastName').type('Maia')
      cy.get('#email').type('nunomaiaqatester@gmail.com')
      cy.get('#phone').type('933711421')
      cy.get('#open-text-area').type(longText, {delay :10})
      cy.contains('button','Enviar').click()

      cy.get('.success').should('be.visible')

      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
     })
     it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=>{    
      cy.get('#firstName').type('Nuno Miguel')
      cy.get('#lastName').type('Maia')
      cy.get('#email').type('nunomaiaqatester@gmail,com')
      cy.get('#phone').type('933711421')
      cy.get('#open-text-area').type("teste")
      cy.contains('button','Enviar').click()
      cy.get('.error').should('be.visible') //mensagem de erro exibida
     })

     it('Campo telefone continua vazio quando preenchido com um valor não numerico',()=>{
      cy.get('#phone')
        .type('abcde')
        .should('have.value','')
     })

     it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido',()=>{
      cy.get('#firstName').type('Nuno Miguel')
      cy.get('#lastName').type('Maia')
      cy.get('#email').type('nunomaiaqatester@gmail,com') //campo com formato errado
      cy.get('#phone').type('933711421')
      cy.get('#open-text-area').type('Teste')
      cy.get('#phone-checkbox').check()
      cy.contains('button','Enviar').click()

      cy.get('.error').should('be.visible') //visivel a mensagem de erro 
     })

     it('preenche e limpa os campos nome, sobrenome , email e telefone',(  )=> {
      cy.get('#firstName')
        .type('Nuno')
        .should('have.value','Nuno')
        .clear()
        .should('have.value','')
      cy.get('#lastName')
        .type('Maia')
        .should('have.value','Maia')
        .clear()
        .should('have.value','')
      cy.get('#email')
        .type('nunomaiaqatester@gmail.com')
        .should('have.value','nunomaiaqatester@gmail.com')
        .clear()
        .should('have.value','')
      cy.get('#phone')
        .type('933711421')
        .should('have.value','933711421')
        .clear()
        .should('have.value','')
      })

      it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios',()=> {
        
         cy.get('button[type="submit"]').click()
         cy.get('.error').should('be.visible') //visivel a mensagem de erro  
      })

      it('envia o formulário com sucesso usando um comando automatizado', () => {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.error').should('be.visible')

      })

      it('seleciona um produto Youtube por seu texto',() =>{
        cy.get('#product')
          .select('YouTube')
          .should('have.value','youtube')
        })

        it('selecionar um produto Mentoria por seu valor value',()=>{
          cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
        })
        it('selecionar um produto blog pelo seu indice',()=>{
          cy.get('#product')
            .select(1)
            .should('have.value','blog')
        })


        it('selct radio button',()=>{
          cy.get('input[type="radio"][value="elogio"]')
          .check()
          .should('be.checked')
        })

        it('selct radio button', ()=> {
          cy.get('input[type="radio"]')
            .each(typeOfService => {
              cy.wrap(typeOfService)
               .check()
               .should('be.checked')

        })
      })

        it('marcar os checkboxes e desmarcar o ultimo', ()=> {
          cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })
         
        it('seleciona um arquivo da pasta fixtures',() => {
          cy.get('#file-upload')                   //selecionar o elemento do upload
            .selectFile('cypress/fixtures/example.json')//selecionar o ficheiro
            .should( input => {                     //validar o ficheiro selecionado
              expect(input[0].files[0].name).to.equal('example.json') // validação pelo console.log do input[0] do file [0] com o nome example.json


            })
        })

        it('seleciona um arquivo simulando um drag-and-drop', () =>{
           cy.get('#file-upload')                   //selecionar o elemento do upload
            .selectFile('cypress/fixtures/example.json',{ action :'drag-drop'})   //selecionar o ficheiro pelo objecto com a propriedade drag-drop
            .should( input => {                     //validar o ficheiro selecionado
              expect(input[0].files[0].name).to.equal('example.json') // validação pelo console.log do input[0] do file [0] com o nome example.json
            })
        })
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
          cy.fixture('example.json').as('sampleFile') // criando um alias para o ficheiro que esta dentro da fixtures
          cy.get('#file-upload')                   //selecionar o elemento do upload
            .selectFile('@sampleFile')   //selecionar o ficheiro pelo alias criado
            .should( input => {                     //validar o ficheiro selecionado
              expect(input[0].files[0].name).to.equal('example.json')
              })
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
          cy.contains('a','Política de Privacidade') // selecionar pelo elemento <a> com o texto "Politica..."
            .should('have.attr','href','privacy.html') // tem o atributo "href = privacy.html" 
            .and('have.attr', 'target','_blank')// e te que ter o atributo "target =_blank"

        })
        it('acessa a página da política de privacidade removendo o target e então clicando no link',() => {
           cy.contains('a','Política de Privacidade')
           .invoke('removeAttr','target')//remove o atriburo e qual o atributo a remover
           .click()

           cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')

        })
        
        it('preenche o campo da área de texto usando o comando invoke',()=>{
          cy.get('#open-text-area')
            .invoke('val','um texto qualquer')
            .should('have.value','um texto qualquer')
        })
        it('faz uma requisição http', ()=>{
          cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
            .as('getRequest')
            .its('status')
            .should('be.equal',200)
          cy.get('@getRequest')
          .its('statusText')
          .should('be.equal','OK')
          cy.get('@getRequest')
          .its('body')
          .should('include','CAC TAT') // tambem funciona com contains
        })

        it('mostrar o gato',()=>{
          cy.get('#cat')
          .invoke('show')
          .should('be.visible')
          cy.get('#title')
          .invoke('text','CAT TAT')


        })
 })

  