var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
        // userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"),
        // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) Chrome/50.0.2661.102',
        // userAgent: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1',
        // userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
        // userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        clientScripts: ['jquery.js', 'tesseract.js'],
        remoteScripts: ['https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js'],
    },
    waitTimeout: 10000, verbose: true,
});
var utils = require('utils');
var f = utils.format;

// casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

casper.viewport = { width: 1366, height: 768 };

var x = require('casper').selectXPath;

casper.start('http://mbasic.facebook.com', function () {

    casper.capture('a1.png');

    this.fillSelectors('form[id="login_form"]', {
        "input[name='email']": "MY_EMAIL",
        "input[name='pass']": "MY_PASS"
    }, true);

    // casper.waitForSelector('input#email',
    //     function () {
    //         this.evaluate(function () {
    //             document.getElementById("ap_password").value = "123456";
    //             document.getElementById("signInSubmit").click();
    //         });
    //     }, 15000);


});

casper.wait(5000, function () {

    casper.thenOpen("https://mbasic.facebook.com/MY_USERNAME", function () {

        // this.echo(this.getTitle());
        casper.then(function () {
            casper.capture('profile.png');
        });
    });

});



casper.then(function () {
    if (this.getTitle() == "Bunny Maheshwari") {

        casper.waitForSelector('form#mbasic-composer-form',
            function () {
                this.evaluate(function () {
                    document.getElementsByName("xc_message")[0].innerText = "testing";
                    document.getElementsByName("view_post")[0].click();
                });
            }, 15000);
    }
})





casper.then(function () {
    casper.wait(5000, function () {
        casper.capture('postcreated.png');
    });
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





