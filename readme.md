## What is it?
It's a demo of an API that can generate fixed amount payment within Alipay checkout qrcode, without charging any fee, having any business licenses or signing any contracts.

## Why?
Alipay requires you have business license and sign a contract to use their fixed checkout code generating API(and with a fee). It's hard and risky(privacy leak) for average Chinese citizens to apply for a business license from gov. So Alipay API is not friendly to indiviuals who just want to set up their own shopping site. If you're building a shopping site in China, your site have to autoly generate a fixed amount charge order according to customers' orders by the API. If not, customers can pay any amount for your stuff and orders become hard to manage, which is bad.

## How?
Qrcode is actually just some encoded text. In checkout qrcode case, it's just a url with custom app scheming. I found that you can query your custom url inside this scheming. After you scan this url(qrcode) with alipay app, it will jump to your custom url html page. Then magic happens, alipay will inject an object called `AlipayJSBridge` in global scope, which is where all the 'forbidden' api lives! So checkout alipay's doc for how to call those apis!

## Disclaimer
This demo is only used for research purpose. If you're using it for things other than studying coding, I have no responsiblity with any of your doing.