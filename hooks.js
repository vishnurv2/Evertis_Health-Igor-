module.exports = {

    afterEach : function() {
        var world = this;

        driver.takeScreenshot().then(function (buffer) {
            return world.attach(buffer, 'image/png');
        })
    }
    }