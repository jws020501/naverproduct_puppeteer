const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
(async() => {
    var id = "jws020501"
    var pw = "dnjstjr0501"
    const browser = await puppeteer.launch({
      headless: false,
    });
  
    const page = await browser.newPage();
  
    await page.setViewport({
      width: 1366,
      height: 768
    });
    await page.goto('https://sell.smartstore.naver.com/#/products/origin-list');
    const content = await page.content()
    const $ = cheerio.load(content)
    await page.waitForSelector("body > ui-view.wrap > div.seller-join-wrap > div > div > div > form > div.panel.panel-seller > ul > li:nth-child(2) > a")
    await page.click("body > ui-view.wrap > div.seller-join-wrap > div > div > div > form > div.panel.panel-seller > ul > li:nth-child(2) > a")
        await page.type("#id",id)
        await page.type("#pw",pw)
        await page.click(".btn_login")
    await page.waitForSelector("#seller-content > ui-view > div > ui-view:nth-child(2) > div.panel.panel-seller > div.panel-body")
    var a = $("#seller-content > ui-view > div > ui-view:nth-child(2) > div.panel.panel-seller > div.panel-body").text().replace(["\n\t"]/g, '')
    
    console.log(a)
})();