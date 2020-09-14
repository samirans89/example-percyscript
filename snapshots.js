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

 await page.type('#username','<APPLICATION_USERNAME>');
 await page.click('p-button[data-protractor-id="enter-password-btn"]');

 await page.type('#current-password','<APPLICATION_PASSWORD>');

 await page.click('p-button[type="submit"]');

 await page.waitFor('myprofile-address-list');
 await page.waitFor(5000);
 await percySnapshot('porsche personal data page');

  let server = httpServer.createServer();
  server.listen(PORT);
  console.log(`Server started at ${TEST_URL}`);

  await page.goto(TEST_URL + PAGE)
  await page.waitFor(5000);
  await percySnapshot('Test Shadow page', { enableJavaScript: true });
  server.close();
}, options);
