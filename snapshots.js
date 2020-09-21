const PercyScript = require('@percy/script');
const httpServer = require('http-server');

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;
const PAGE = `/page_with_shadow.html`

const options = {headless: false};
PercyScript.run(async (page, percySnapshot) => {

  await page.setViewport({
  width: 1440,
  height: 800
});

  await page.goto('https://preview-profile.porsche.com/myprofile/de/de_DE/personal-data')
  await page.waitFor('#username');
  //await page.waitFor(5000);

/*
  await page.evaluateHandle(() => {
  // (document.getElementsByTagName("body")[0]).appendChild((document.getElementsByTagName('layout-component')[0]));
  // (document.getElementsByTagName("layout-component")[0]).removeChild((document.getElementsByTagName("layout-component")[0]).childNodes[0]);
});*/

 await percySnapshot('Porshe Login page', { enableJavaScript: true });

 await page.type('#username','<APP_USER>');
 await page.click('p-button[data-protractor-id="enter-password-btn"]');
 await page.waitFor(2000);
 await page.type('#current-password','<APP_PASS>');

 await page.click('p-button[type="submit"]');
 await page.waitFor(8000);

 await percySnapshot('Personal data page', { enableJavaScript: true });

 await page.waitFor(8000);

 await page.waitFor("a.navigation-items__item[href='https://preview-login.porsche.com/auth/de/de_DE/login-and-security']")
 await page.click("a.navigation-items__item[href='https://preview-login.porsche.com/auth/de/de_DE/login-and-security']")
 await page.waitFor(8000);
 await percySnapshot('Login and Sec page', { enableJavaScript: true });

 await page.waitFor("a.navigation-items__item[href='https://preview-profile.porsche.com/myprofile/de/de_DE/paymentmethods']")
 await page.click("a.navigation-items__item[href='https://preview-profile.porsche.com/myprofile/de/de_DE/paymentmethods']")
 await page.waitFor(8000);
 await percySnapshot('paymentmethods page', { enableJavaScript: true });


 await page.waitFor("a.navigation-items__item[href='https://preview-profile.porsche.com/myprofile/de/de_DE/dataprivacy']")
 await page.click("a.navigation-items__item[href='https://preview-profile.porsche.com/myprofile/de/de_DE/dataprivacy']")
 await page.waitFor(8000);
 await percySnapshot('dataprivacy page', { enableJavaScript: true });

 //await page.waitFor('myprofile-address-list');
 //await page.waitFor(5000);
 //await percySnapshot('porsche personal data page', { enableJavaScript: true });

  let server = httpServer.createServer();
  server.listen(PORT);
  console.log(`Server started at ${TEST_URL}`);

  await page.goto(TEST_URL + PAGE)
  await page.waitFor(5000);
  await percySnapshot('Test Shadow page', { enableJavaScript: true });
  server.close();
}, options);
