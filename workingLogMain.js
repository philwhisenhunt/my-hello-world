const Apify = require('apify');

Apify.main(async () => {
    // Get the queue and start with the first one
    const requestQueue = await Apify.openRequestQueue();
    //Puts RVA link in the queue
    await requestQueue.addRequest(new Apify.Request({url: 'https://www.visitrichmondva.com/event/'}));

    //makes a new PuppeteerCrawler Object
    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,

        handlePageFunction: async ({ page, request }) => {
            let event = {
                url: null,
                name: null,
                address: null,
                dates: null,
                reccurence: null,
                venue: null,
                phone: null,
                time: null,
                price: null,
                website: null,
            }
            //
            event.url = request.url;
            event.name = await page.$eval('div.detailInfo div.inner h1', h1 => h1.innerText);
            event.address = await page.$eval('div.detailInfo div.inner ul.info-list li[data-name="address"]', li =>li.innerText);
            event.dates = await page.$eval('div.detailInfo div.inner ul.info-list li[data-name="dates"]', li =>li.innerText);
            event.reccurence = await page.$eval('div.detailInfo div.inner ul.info-list li[data-name="recur"]', li =>li.innerText);


            //target the li with the data-name:address
            
            //add more selectors here
            console.log(event);
        },

        //If fail 4 times, then execute this:
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed 4 times`);
        },
    });

    //Run crawler.
    await crawler.run();


});

