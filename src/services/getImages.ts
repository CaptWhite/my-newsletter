import puppeteer from 'puppeteer';

export async function getUrlImageDrive(url) {
  let imgElement
  try {
      const browser = await puppeteer.launch({headless: true})
      const page = await browser.newPage()
      await page.goto(url)
      await page.setViewport({width: 1912, height: 1024});
      await page.waitForSelector('img')
      const source = await page.content();
      await browser.close();
      imgElement = /.*<img src="(.*)" class.*/.exec(source)
  } catch (err) {
    console.error(err)
  }
  return imgElement[1]
}
 