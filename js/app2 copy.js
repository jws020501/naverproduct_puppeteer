const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const db = require("./db")
(async() => {
    const browser = await puppeteer.launch({
      headless: false,
    //   devtools : true
    });

    var url = "https://smartstore.naver.com/m3display2"
  
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1366,
      height: 768
    });
    await page.goto(url+"/category/ALL?cp=1");
    const content = await page.content()
    const $ = cheerio.load(content)
    var total = Number($("#CategoryProducts > div._3VrqrkLvIc > div > div > ul > li:nth-child(2) > a > span._3-WhDl_6j2 > strong").text())
  
    console.log(total)
    var json = []
    for(var i = 1; i >= total; i++){
    await page.click("#CategoryProducts > ul > li:nth-child(" + i + ") > a")
    await page.waitForSelector("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.CxNYUPvHfB > h3")
      var product_name = $("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.CxNYUPvHfB > h3").text()
      var price =  $("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.WrkQhIlUY0 > div > del > span._1LY7DqCnwR").text()
      var sale_price = $("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div._1ziwSSdAv8 > div.WrkQhIlUY0 > div > strong > span._1LY7DqCnwR").text()
      var naver_product_id = $("#INTRODUCE > div > div.attribute_wrapper > div > div._2E4i2Scsp4._copyable > table > tbody > tr:nth-child(1) > td:nth-child(2) > b").text()
      var product_status = $("#INTRODUCE > div > div.attribute_wrapper > div > div._2E4i2Scsp4._copyable > table > tbody > tr:nth-child(1) > td:nth-child(4)").text()
      var produce_company = $("#INTRODUCE > div > div.attribute_wrapper > div > div._2E4i2Scsp4._copyable > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()
      var brand = $("#INTRODUCE > div > div.attribute_wrapper > div > div._2E4i2Scsp4._copyable > table > tbody > tr:nth-child(2) > td:nth-child(4)").text()
      var model_nm = $("#INTRODUCE > div > div.attribute_wrapper > div > div._2E4i2Scsp4._copyable > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()
      var origin = $("#INTRODUCE > div > div.attribute_wrapper > div > div._2E4i2Scsp4._copyable > table > tbody > tr:nth-child(3) > td:nth-child(4)").text()
      var effective_data = $("#INTRODUCE > div > div.attribute_wrapper > div > div._2E4i2Scsp4._copyable > table > tbody > tr:nth-child(4) > td").text()
      var main_img = $("#content > div > div._2-I30XS1lA > div._25tOXGEYJa._2v2w48lRc_ > div._38rEjARje3 > div._23RpOU6xpc > img").attr("src")
      var opts = $("#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y").html()
      var notice = $("#INTRODUCE > div > div.product_info_notice > div > table > tbody").html()
      var detail = $("#INTRODUCE > div > div:nth-child(4)").html()
    await page.goBack()
    var temp_json = {
        "product_name":product_name,
        "price":price,
        "sale_price":sale_price,
        "naver_product_id":naver_product_id,
        "product_status":product_status,
        "produce_company":produce_company,
        "brand":brand,
        "model_nm":model_nm,
        "origin":origin,
        "effective_data":effective_data,
        "main_img":main_img
        
    }
    db.query("INSERT INTO naver_product()values()",[])

  }

  })();