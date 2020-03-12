var i =0;
window.onload = function() {
    var video = document.getElementById('video');

    var tracker = new tracking.ObjectTracker(['eye', 'mouth']);
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function(event) {
        event.data.forEach(function(rect) {
            window.plot(rect.x, rect.y, rect.width, rect.height);
            console.log("face found: " + i++);
            PlaySpeech("To talk with me, please tap the red button.  For other functions, press the other icons");
            //navigateTo("mainMenu");
        });

        window.plot = function(x, y, w, h) {
            var rect = document.createElement('div');
            document.querySelector('.container').appendChild(rect);
            rect.classList.add('rect');
            rect.style.width = w + 'px';
            rect.style.height = h + 'px';
            rect.style.left = (video.offsetLeft + x) + 'px';
            rect.style.top = (video.offsetTop + y) + 'px';
        };

    });
};