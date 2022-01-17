## What this app is for

This is a mercari scraper which runs on Github Actions every 5 minutes and sends an email notificatin once it finds products matching given conditions.

## How to use

In order to use this app,

1, edit setting.js and input values in the following format

```
const data = [
  {
    keyword: [name of the product you want to scrape],
    maxPrice: [maximum price of the product you want to get notification for],
    minPrice: [minimum price of the product you want to get notification for, or put 0],
    emailTo: [email address you want to get notification at]
  },
  ...
]
```

You can enter as many products as you want here, and the app scrapes through every product.

2, clone this app, and create a repo in your own github account. This is necessary because this app uses github actions to run according to schedule.
