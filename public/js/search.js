class Clip {
    constructor(vid) {
        this.vid = vid
    }
    bang() {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    }
    play() {
    }
}

function playClip(vid, startTime) {
    console.log(vid);
    vid.currentTime = startTime;
    let playPromise = vid.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Automatic playback started! Show playing UI. We can now safely pause video...
            video.pause();
        })
        .catch(error => {
            // Auto-play was prevented. Show paused UI.
        });
    }
}