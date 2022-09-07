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

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
// https://medium.com/@jbbpatel94/difference-between-offsetheight-clientheight-and-scrollheight-cfea5c196937
function isAtBottom(e) {
    // console.log(e)
    let clipsContainer = e.target;
    clipsContainer.scrollHeight //total possible distance
    clipsContainer.scrollTop // current distance (0 at top)
    clipsContainer.clientHeight // visible content on screen 
    console.log("window load", document.readyState)
    console.log("at bottom?",  Math.abs(clipsContainer.scrollHeight - clipsContainer.clientHeight - clipsContainer.scrollTop) < 50)
    if (document.readyState == "complete" && Math.abs(clipsContainer.scrollHeight - clipsContainer.clientHeight - clipsContainer.scrollTop) < 50)  { 
        let moreIcon = e.target.querySelector('.bottom_icon');
        console.log(moreIcon);
        if ( moreIcon) {
            moreIcon.style.display = "none";

        }
    }
    return true
}