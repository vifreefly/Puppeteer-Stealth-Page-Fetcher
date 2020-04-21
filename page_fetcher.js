// === Basic setup === //

function getArg(name) {
  if (process.argv.indexOf(name) === -1) {
    return null
  } else {
    const result = process.argv[process.argv.indexOf(name) + 1]
    return result || true // for args without values, as --take-screenshot
  }
}

const url = getArg('--url')

const userAgent = getArg('--user-agent')

const proxyServer = getArg('--proxy-server')
const proxyLogin = getArg('--proxy-login')
const proxyPassword = getArg('--proxy-password')

let customDelay = getArg('--custom-delay')
customDelay = customDelay ? parseInt(customDelay) : null
const delay = (Math.random() + 1) * (customDelay || 5000)

const isTakeScreenshot = getArg('--take-screenshot') ? true : false


// === Puppeteer setup === //
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// browser launch arguments
const launchOptions = { headless: true, args: [] }
if (proxyServer) {
  launchOptions.args.push(`--proxy-server=${proxyServer}`)
}


// === Run browser === //
puppeteer.launch(launchOptions).then(async browser => {
  const page = await browser.newPage()

  await page.setRequestInterception(true)
  page.on('request', request => (request.resourceType() === 'image') ? request.abort() : request.continue())

  await page.setViewport({width: 1366, height: 768})
  if (userAgent) {
    await page.setUserAgent(userAgent)
  }
  if (proxyLogin && proxyPassword) {
    await page.authenticate({'username': proxyLogin, 'password': proxyPassword})
  }

  await page.goto(url, { waitUntil: 'load' })
  await page.waitFor(delay)

  if (isTakeScreenshot) {
    // for debug
    await page.screenshot({ path: 'tmp/result.png', fullPage: true })
    console.log('Screenshot saved to tmp/result.png')
  } else {
    // See https://github.com/puppeteer/puppeteer/issues/331
    // const bodyHTML = await page.content()
    const bodyHTML = await page.evaluate(() => document.documentElement.outerHTML)
    console.log(bodyHTML)
  }

  await browser.close()
})
