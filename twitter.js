var casper = require('casper').create({
    pageSettings: {
        // loadImages: true,//The script is much faster when this field is set to false
        loadPlugins: false,
        // userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
        // userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"),
        // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) Chrome/50.0.2661.102',
        // userAgent: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1',
        // userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        clientScripts: ['jquery.js', 'tesseract.js'],
        remoteScripts: ['https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js'],
    },
    waitTimeout: 10000, verbose: true,
});
var utils = require('utils');
var f = utils.format;



// Print out all the messages in the headless browser context
casper.on('remote.message', function (msg) {
    this.echo('remote message cought: ' + msg);
});

casper.on("url.changed", function () {
    this.then(function () {
        this.echo(this.getTitle());
    });

});

// Print out all the sessages in the headless browser context
casper.on('page.error', function (msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

// casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

// casper.viewport = { width: 1366, height: 768 };

var x = require('casper').selectXPath;

casper.start('https://twitter.com/login', function () {

    casper.capture('a1.png');

    this.fillSelectors('form[class="t1-form clearfix signin js-signin"]', {
        "input[name='session[username_or_email]']": "tushar.baheti28@gmail.com",
        "input[name='session[password]']": "654ram321"
    }, true);



});



casper.then(function () {
    casper.wait(5000, function () {
        casper.capture('twiiter.png');
    });

});



casper.thenOpen("https://www.twitter.com", function () {
    casper.page.injectJs('jquery.js');
    casper.waitForSelector("div#dashboard-profile-prompt",
        function () {
            this.echo("I entered into function");
            this.evaluate(function () {

                // document.getElementsByClassName("HeartAnimation")[0].nextElementSibling.click();

                document.getElementsByClassName("RichEditor RichEditor--emojiPicker")[0].classList.add("is-fakeFocus");

                document.getElementById("tweet-box-home-timeline").firstChild.innerText = "data";

                document.getElementsByClassName("tweet-action")[0].removeAttribute("disabled");

                // setTimeout(function () {
                document.getElementsByClassName("tweet-action")[0].click();


            });
        }, 15000);

});


casper.then(function () {
    casper.wait(5000, function () {
        casper.capture('postcreated.png');
    });

});


casper.then(function () {
    casper.waitForSelector('div#tweet-box-home-timeline',
        function () {
            this.evaluate(function () {
                setTimeout(function () {
                    document.getElementsByClassName("js-logout-button")[0].click();
                }, 2000)

            });
        }, 15000);

});





casper.then(function () {

    casper.wait(5000, function () {
        this.clearCache();
        this.clearMemoryCache();
        phantom.clearCookies();
    });

});

casper.run(function () {
    this.echo('So the whole suite ended.');
    this.exit(); // <--- don't forget me!
});






