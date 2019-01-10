const Apify = require('apify');

Apify.main(async () => {
    // Get the queue and start with the first one
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest(new Apify.Request({url: 'https://www.visitrichmondva.com/event/rva-on-ice/17800/'}));

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
            event.url = request.url;
        }
    })


}

