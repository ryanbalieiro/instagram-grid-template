/**
 * Created by Ryan Balieiro on 5/1/16.
 */

/**
 * @class - manages the photo grid.
 * @constructor
 */
function InstaGrid() {

    /**
     * An Array containing the direct URLs to all of the available images.
     * @type {String[]}
     * @property
     */
    this.images = [
        "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg",
        "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg"
    ];

    /**
     * An Array that keeps track of which of the slots have been drawn in the randomizing process in order to avoid that the same image changes too many times within a short interval.
     * @type {number[]}
     */
    this.randHistory = [];

    /**
     * @const - total of available slots inside the grid.
     * @type {number}
     * @property
     */
    this.GRID_SIZE = 9;

    /**
     * Initialises the grid.
     * @private
     * @function
     */
    this.init = function() {
        for(var i = 0 ; i < this.GRID_SIZE ; i++) {
            this.displayNextImage(i, false);
        }

        setInterval(function() {
            instaGrid.changeRandomImage();
        }, 2000);
    };

    /**
     * Shuffles this.images[] in place.
     * @private
     * @function
     */
    this.shuffle = function() {
        var j, x, i;
        for (i = this.images.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = this.images[i - 1];
            this.images[i - 1] = this.images[j];
            this.images[j] = x;
        }
    };

    /**
     * Unqueues an URL from this.images[] and displays it.
     * @param targetSlot {number} - the container's (div) index.
     * @param shouldAnimate {boolean=true} - indicates whether the container should perform a fade transition while changing its source.
     * @private
     * @function
     */
    this.displayNextImage = function(targetSlot, shouldAnimate) {
        const img = $(".img-grid").eq(targetSlot);

        const targetSource = this.images.shift();
        if(shouldAnimate != false) {
            img.fadeTo(300, 0, function () {
                img.attr('src', "img/gallery/" + targetSource);
            }).fadeTo(1000, 1);
        }
        else {
            img.attr('src', "img/gallery/" + targetSource);
        }

        if(img.attr('currentImage')) {
            this.images.push(img.attr('currentImage'));
        }

        img.attr('currentImage', targetSource);
    };

    /**
     * Picks a random slot inside the grid and changes its image source.
     * @public
     * @function
     */
    this.changeRandomImage = function() {
        do {
            var rand = Math.floor(Math.random()*(this.GRID_SIZE));
        } while(this.randHistory.lastIndexOf(rand) != -1);

        if(this.randHistory.length >= 5) // clears up the oldest element in the history, making it available again.
            this.randHistory.shift();

        this.randHistory.push(rand);
        this.displayNextImage(rand);
    };

    this.shuffle();
    this.init();
}

/**
 * The grid's singleton global instance.
 * @type {InstaGrid}
 * @const
 */
const instaGrid = new InstaGrid();