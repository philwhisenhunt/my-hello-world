const Apify = require('apify');

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url: 'https://www.visitrichmondva.com/event/rva-on-ice/17800/' });
    const pseudoUrls = [new Apify.PseudoUrl('https://www.visitrichmondva.com/event/rva-on-ice/17800/')];

    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        handlePageFunction: async ({ request, page }) => {
            const title = await page.title();
            console.log(`Title of ${request.url}: ${title}`);
            await Apify.utils.puppeteer.enqueueLinks(page, 'a', pseudoUrls, requestQueue);
        },
        maxRequestsPerCrawl: 5,
        maxConcurrency: 5,
    });

    await crawler.run();
});