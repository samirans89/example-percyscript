const PercyScript = require('@percy/script');
const httpServer = require('http-server');

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;
const PAGE = `/page_with_shadow.html`

const options = {headless: true};
PercyScript.run(async (page, percySnapshot) => {

  await page.goto('https://login.porsche.com/login/ch/en_GB')
  await page.waitFor('#username');
  //await page.waitFor(5000);

/*
  await page.evaluateHandle(() => {
  // (document.getElementsByTagName("body")[0]).appendChild((document.getElementsByTagName('layout-component')[0]));
  // (document.getElementsByTagName("layout-component")[0]).removeChild((document.getElementsByTagName("layout-component")[0]).childNodes[0]);
});*/

 await percySnapshot('Porshe Login page', { enableJavaScript: true });

  let server = httpServer.createServer();
  server.listen(PORT);
  console.log(`Server started at ${TEST_URL}`);

  await page.goto(TEST_URL + PAGE)
  await page.waitFor(5000);
  await percySnapshot('Test Shadow page', { enableJavaScript: true });
  server.close();
}, options);
