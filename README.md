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
    emailTo: [email address you want to be notified]
  },
  ...
]
```

You can enter as many products as you want here, and the app scrapes through every product.

2, clone this app, and create a repo in your own github account. This is necessary because this app uses github actions to run according to schedule.

3, go to the repository above, go to setting > secrets, click 'New repository secret' and set email address to get notification from and password of that account with keys EMAIL and PASSWORD (yes, this part is redundant and should be automated but I was too lazy to do that).
