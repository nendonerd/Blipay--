## [Example link](https://blipay.xyz)

## What is it?
It's a demo of an API that can generate fixed amount payment within Alipay checkout qrcode, without charging any fee, having any business licenses or signing any contracts.

## Why?
Alipay requires you have business license and sign a contract to use their fixed checkout code generating API(and with a fee). It's hard and risky(privacy leak) for average Chinese citizens to apply for a business license from gov. So Alipay API is not friendly to indiviuals who just want to set up their own shopping site. If you're building a shopping site in China, your site have to autoly generate a fixed amount charge order according to customers' orders by the API. If not, customers can pay any amount for your stuff and orders become hard to manage, which is bad.

## How?
Qrcode is actually just some encoded text. In checkout qrcode case, it's just a url with custom app scheming. I found that you can query your custom url inside this scheming. After you scan this url(qrcode) with alipay app, it will jump to your custom url html page. Then magic happens, alipay will inject an object called `AlipayJSBridge` in global scope, which is where all the 'forbidden' api lives! So checkout alipay's doc for how to call those apis!

## Disclaimer
This demo is only used for research purpose. If you're using it for things other than studying coding, I have no responsiblity with any of your doing.

## Todos:
- [] It still lacks a notification for successful Client payment. Here're some of my thoughts about implementing this feature.
- [] When Client generating a qrcode, generate a uuid as id-token, pass it to the Qrcode_Server, and then establish a SSE connection to the Qrcode_Server. Then the Qrcode_Server use the id-token as the {memo} part to generate a qrcode link and sent it back to client. And it keeps the id-token in an id-cache.
- [x] On an android phone that logged as alipay receiver, run Tasker to listen for alipay notification event, if the event is catched, tell Bill_Server to check payments in alipay account.
- [x] Bill_Server is a scraper that scrapes alipay payments. When it's activated, it checks if there're new payments. if there are, then it parse the new payment data and get the {amount, memo}, then sent them to Qrcode_Server.
- [x] Additionally, Bill_Server will invoke a Cookie_Server at an interval of 30min to mimic login and refresh cookie.
- [] If Qrcode_Server receive the {amount, memo} from Bill_Server, it use it to compare within the id-cache. if there's id-token matched, find the corresbonding SSE connection, and send Client a success confirmation.
- [] To prevent SSE connections taking over too much resources, set a timeout for them. if exceed timeout, send Client a failure confirmation, and Client will fade the qrcode and provide a refresh option, then it will send close confirm to Qrcode_Server to tell it stop the SSE connection and clear resbonding id-token in cache.
- [] These stuff are a bit complicated to deploy, so it would be wise to write some dockerfile and docker-compose.yml to deploy them.
