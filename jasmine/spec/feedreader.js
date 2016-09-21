/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        // make sure RSS feeds are defined and not zero.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        // make sure each feed has an non-empty url defined
        it('each feed has a non-empty url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        // make sure each feed has an non-empty name defined
        it('each feed has a non-empty name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    // test menu
    describe('The menu', function() {
        // ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // ensure menu changes visibility upon menu icon clicked.
        it('is shown/hidden by clicking menu icon', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // test for entries
    describe('Initial Entries', function() {
        /* ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least a single .entry element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // test for when a new feed is selected
    describe('New Feed Selection', function() {
        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('text changes when new feed is selected', function(done) {
            var a, b;
            loadFeed(0, function() {
                a = $('.feed').text();
                loadFeed(1, function() {
                    b = $('.feed').text();
                    expect(a).not.toEqual(b);
                    done();
                });
            });
        });
    });
}());
