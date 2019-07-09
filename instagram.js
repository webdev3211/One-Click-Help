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

casper.viewport = { width: 411, height: 731 };

var x = require('casper').selectXPath;

casper.start('https://www.instagram.com/login', function () {

    casper.capture('a1.png');

    this.fillSelectors('form[class="HmktE"]', {
        "input[name='session[username]']": "codingbuddiesforever@gmail.com",
        "input[name='session[password]']": "idontknow1234"
    }, true);



});



casper.then(function () {
    casper.wait(5000, function () {
        casper.capture('instagram.png');
    });

});


casper.thenOpen("https://www.instagram.com/direct/inbox/", function () {

    casper.waitForSelector('div#f5ffdbb39947c4',
        function () {
            this.evaluate(function () {
                document.getElementById("f5ffdbb39947c4").click();
            });
        }, 15000);

});


casper.then(function () {
    casper.waitForSelector('span#react-root',
        function () {
            this.evaluate(function () {
                document.getElementsByTagName("textarea")[0].innerHTML = "Help me out, I m in danger, her's my location";
                document.getElementsByTagName("button")[3].click();
            });
        }, 15000);


});



casper.then(function () {
    casper.wait(5000, function () {
        casper.capture('mesagesent.png');
    });

});


casper.thenOpen("https://www.instagram.com/codingbuddies/", function () {
    casper.waitForSelector('button.Q46SR',
        function () {
            this.evaluate(function () {
                document.getElementsByClassName("Q46SR")[0].click(); //all options
                document.getElementsByClassName("xIOKA")[10].click(); //logout
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






