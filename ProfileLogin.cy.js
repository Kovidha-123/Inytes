
describe('Login after selecting the Invitation card', () => {

    const username = 'kovidha@codepeers.com';
    const password = 'Inytes12#';
    const title = 'Satyanarayana Pooja';
    const phoneNo = '9988776655';
    const venue = 'Home';
    const location = 'Sri sai nilayam';
    const mesg = 'Please welcome';
    const regionalmesg = 'Weclome';
    const occasions = 'Pooja';
    const guestemails = 'kovidha@codepeers.com, lakshmi@inytes.com'

    beforeEach(() => {
      // Disable CAPTCHA for the duration of the test

      cy.intercept('POST', 'https://www.google.com/recaptcha/enterprise.js?render=6LfoaxwpAAAAAFLYxAbsxYM_t1ZnoM2qrv3KSTU2', {
        statusCode: 200,
        body: {
          success: true
        }
      }).as('recaptcha');

      cy.wait(4000)

      cy.intercept('POST', 'https://dev.inytes.com/ajax_file/g-captcha.php', {
        statusCode: 200,
        body: { success: true}
      }).as('captchaBackend');
      // cy.mockRecaptcha();
      // cy.intercept('POST', '/ajax_file/g-captcha.php', (req) => {
      //   req.reply({ captchaPassed: true });
      // }).as('captcha');

      
      cy.visit('https://dev.inytes.com/')

      cy.wait(2000)

      cy.get('[title=Login]').click()

      // cy.xpath("//a[text()='Login']", { timeout: 10000 }).should('be.visible').click();

      // cy.url().should('include', '/login/')

      
    
      // Mock ReCAPTCHA before each test
       // Call the mock before each test
    });
    // <ReCAPTCHA
    //    sitekey={
    //     typeof window !== 'undefined' && window?.Cypress
    //   ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    //   : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
    // //    }
    //   />

    
    it('Create Invitation', () => {

      // cy.intercept('POST', '**/g-captcha.php', {
      //   statusCode: 200,
      //   body: { success: true }
      // }).as('captcha');
      

      // cy.xpath("//button[@id='email-login']", { timeout: 15000 }).debug().should('be.visible').click({ force: true });
      cy.get('[id=user_login]').type(username)

      cy.get('[id=user_password]').type(password)

      cy.wait(2000)

      cy.get('#email-login').debug().should('be.visible').click({force:true})

      

      // cy.wait('@captchaBackend');
      // cy.wait('@recaptcha', { timeout: 20000 });
      cy.wait(5000)

      cy.contains('Create Invitation').click()

      cy.url().should('include', '/invitations')

      // cy.get('.cd-filter-wrap').contains("Pooja").click()

      // cy.xpath("//div[@class='cd-filter-wrap']//div[2]//ul//li[13]").click()
      cy.contains('a', 'Pooja').click({force:true});

      // cy.xpath('//a[@data-cat="occasions" and text()=Occasions]').click();
      cy.wait(4000)
      cy.get('.cd-items li').eq(2).find('a.cd-trigger').click();
      // cy.xpath('//ul[@id=mix-up-list]/li[2]').click()
      // cy.xpath('//img[@class="thumb-image" and @alt="Gateway to Vishnuloka"]').click()

      cy.wait(5000)

      cy.xpath("//a[text()='Personalize']").should('exist').click()

      cy.get('[id=nextDetails]').click()
      cy.wait(10000)
      cy.xpath("//input[@id='vTitle' and @name='vTitle' and @type='text']", { timeout: 15000 }).should('be.visible').type(title)
      cy.get('[id=vPhone]').type(phoneNo)
      cy.get('[id=vLocationName]').type(venue)
      cy.get('[id=vFA]').type(location).wait(4000)
      cy.get('.pac-item').first().click(); // Click the first suggestion

    //   cy.xpath("//ul[@class='suggestions']/li[text()='Option 2']").click()

      cy.get('[id=nextSettings]').click()

      cy.get('[id=addMessage]').click({ force: true })

      cy.get('[id=tMessageieditor]').type(mesg)
      
      cy.get('[id=addLangMessage]').click({ force: true })

      cy.get('[id=tOtherMessage]').type(regionalmesg).type('{enter}')

      cy.get("[id='create-preview-card']").click()

      cy.get('[id=addGuests]').scrollIntoView()

      cy.wait(2000)

      cy.get('[id=addGuests]').click()

    // Check if the popup is present before interacting with it
      cy.get('body').then(($body) => {
         if ($body.find('.popup-class').length > 0) {
          // Step 2: Ensure the popup is visible
          cy.get('.small-12-columns').should('be.visible');

          // Step 3: Locate and click the close symbol
          cy.get('#upgrade-section-close').click();  // Adjust the selector as needed
          }
     // Add Guests

     cy.get("[id='tManualEmail']").type(guestemails)
     cy.get("[id='add_guests']").click()
     cy.get("[id='send']").click()
     cy.wait(4000)

     //Navigate to Track tab
     cy.get("[id='track-tab-link']").click()




});


    

     
  
  
    })
  })