const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
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
    await page.goto("https://smartstore.naver.com/m3display2/category/ALL?cp=1");
    const content = await page.content()
    const $ = cheerio.load(content)
    var total = Number($("#CategoryProducts > div._3VrqrkLvIc > div > div > ul > li:nth-child(2) > a > span._3-WhDl_6j2 > strong").text())
    console.log(total)
    var json = []
    for(var i = 1; i >= total; i++){
    await page.click("#CategoryProducts > ul > li:nth-child(" + i + ") > a")
    var product_name = $("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.CxNYUPvHfB > h3").text()
    var price =  $("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.WrkQhIlUY0 > div > del > span._1LY7DqCnwR").text()
    var sale_price = $("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.WrkQhIlUY0 > div > strong > span._1LY7DqCnwR").text()
    await page.goBack()
    var temp_json = {
        "product_name":product_name,
        "price":price,
        "sale_price":sale_price
    }
    json.push(temp_json)
    }
  })();