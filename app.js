const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
(async() => {
    var isselerID = false
    var id = "jws020501"
    var pw = "a2726650"

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
    if(!isselerID){
        await page.click("body > ui-view.wrap > div.seller-join-wrap > div > div > div > form > div.panel.panel-seller > ul > li:nth-child(2) > a")
        await page.type("#id",id)
        await page.type("#pw",pw)
        await page.click(".btn_login")
    }else{
        await page.type("#loginId",id)
        await page.type("#loginPassword",pw)
        await page.click("#loginButton")
    }
    await page.waitForSelector("#seller-content > ui-view > div > ui-view:nth-child(1) > div.form-section.seller-status > ul > li:nth-child(1) > a")
    await page.click("#seller-content > ui-view > div > ui-view:nth-child(1) > div.form-section.seller-status > ul > li:nth-child(1) > a")
    await page.waitForSelector("#seller-content > ui-view > div > ui-view:nth-child(2) > div.panel.panel-seller > div.panel-heading > div.pull-right > div > div:nth-child(2) > button")
    await page.click("#seller-content > ui-view > div > ui-view:nth-child(2) > div.panel.panel-seller > div.panel-heading > div.pull-right > div > div:nth-child(2) > button")
  })();