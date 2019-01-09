const Apify = require('apify');

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url: 'https://www.visitrichmondva.com/event/rva-on-ice/17800/' });
    
    const handlePageFunction = async ({ request, $ }) => {
        const headline = $('.inner h1').text();
    
        console.log(`The headline of "${request.url}" is: ${headline}.`);

        const price = $('.info-list li:eq(6) span').text();

        console.log(`The price is ${price}`);
    }
    
    // Set up the crawler, passing a single options object as an argument.
    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        handlePageFunction
    });
    
    await crawler.run();
});