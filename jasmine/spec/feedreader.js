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
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('a feed should contain a valid url', function(){
            allFeeds.forEach(function(feed) {
                // contains a url property
                expect(feed.hasOwnProperty('url')).toBe(true);
                // url not empty
                expect(feed.url).not.toBe(null);
            });
         });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('a feed should contain a valid name', function(){
            allFeeds.forEach(function(feed) {
                // contains a url property
                expect(feed.hasOwnProperty('name')).toBe(true);
                // url not empty
                expect(feed.name).not.toBe(null);
            });
         });
    });


    /* test suite named "The menu" 
     * that describes the visibility or not of the menu navbar
     */
    describe('The menu', function() {
        it('menu element should be hidden by default', function() {
            //navbar hidden by default
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
        it('toggle menu element', function() {
            // click on menu to display navbar
            $('.menu-icon-link:first').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            // click on menu to hide navbar
            $('.menu-icon-link:first').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });


    /* test suite named "Initial Entries" that ensures
     * that when loadFeed has completed, there is at least one element
     * .entry in .feed container
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('container should contain one element', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* test suite named "New Feed Selection" that ensures that when
    *  when a new feed is loaded, its content has changed
    */
    describe('New Feed Selection', function() {
        var oldContent;
        var newContent;

        beforeEach(function(done) {
          loadFeed(0, function() {
            // feed 0 done loading
            oldContent = $('.entry').text();
            loadFeed(1, function(){
              // feed 1 done loading
              newContent = $('.entry').text();
              done();
            });
          });
        });

        it('loadFeed should change content', function(done) {
            //new content different from old content
            expect(newContent).not.toEqual(oldContent);
            done();
        });
    });
}());
