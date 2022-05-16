const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = "https://smartstore.naver.com/m3display2/category/ALL?cp=1"
(async() => {
    const browser = await puppeteer.launch({
      headless: false,
    //   devtools : true
    });
  
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1366,
      height: 768
    });
    await page.goto(url);
    const content = await page.content()
    const $ = cheerio.load(content)
    var total = ""
    for(var i = 1; i < total; i++){
    await page.click("#CategoryProducts > ul > li:nth-child(" + i + ") > a")

    await page.goBack()
    }
  })();