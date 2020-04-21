# README

## Puppeteer Stealth Page Fetcher

Read the description here: <https://victorafanasev.info/tech/puppeteer-stealth-page-fetcher-info>

## Installation

You will need NodeJS, and NPM or Yarn package manager installed.

Navigate into project folder and run `$ npm install` (or `$ yarn install` if you use yarn instead).


## Usage

Examples:

**Basic run** (without custom user agent and without proxy)

```
$ node page_fetcher.js --url "https://www.google.com/"
```

**Provide a custom user agent:**

```
$ node page_fetcher.js --url "https://www.google.com/" --user-agent "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"
```

**Provide a proxy:**

```
$ node page_fetcher.js --url "https://www.google.com/" --proxy-server "au.proxymesh.com:31280"
```

**Provide a proxy with login and password:**

```
$ node page_fetcher.js --url "https://www.google.com/" --proxy-server "some-proxy-server.com:31280" --proxy-login "username" --proxy-password "password"
```

**Run with both proxy and custom user agent:**

```
$ node page_fetcher.js --url "https://www.google.com/" --user-agent "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36" --proxy-server "au.proxymesh.com:31280"
```

**For debug: there is a custom option --take-screenshot**, if you'll add it, then browser will take a screenshot of loaded page, and will skip HTML source printing to the console, example: check the user agent and save the screenshot (and do not print the HTML source)

```
$ node page_fetcher.js --url "https://www.whatismybrowser.com/detect/what-is-my-user-agent" --user-agent "Mozilla/5.0 (X11; Linux x86_64)" --take-screenshot
```

## Notes

Images are disabled for more fast page loading.

Currently there's a custom delay set around 5 secods after page has been loaded and before html content DOM will be printed to the console. It is useful for some websites which are having a protection for listings, and it's required to wait some time to get full and corrent html of the page. Howewer, maybe 5 seconds delay could be too much (it depends on proxies and how fast is your internet connection) so you could adjust it with cli argument `--custom-delay`, example:

Provide a delay in milliseconds (example 2500ms equal to 2.5 seconds):

```
$ node page_fetcher.js --url "https://www.google.com/" --custom-delay 2500
```

Then you could check how your page loaded by taking a screenshot of the page.
