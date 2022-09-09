window.addEventListener('load', e => {
    let clipsContainer = document.querySelectorAll(".searchResults_clips");
    console.log('loaded', clipsContainer)
    for (let i=0; i<clipsContainer.length; i++) {
        console.log('clipsContainer[i]', clipsContainer[i])
        setUpScroll(clipsContainer[i])
    }
})

const setUpScrollAux = (clipsContainer) => {
    // console.log("clipsContainer.clientHeight", clipsContainer.clientHeight)
    // console.log("clipsContainer.scrollHeight", clipsContainer.scrollHeight)
    // console.log("at bottom?",  Math.abs(clipsContainer.scrollHeight - clipsContainer.clientHeight - clipsContainer.scrollTop) < 40)
    if (document.readyState == "complete" && Math.abs(clipsContainer.scrollHeight - clipsContainer.clientHeight - clipsContainer.scrollTop) < 50)  { 
        let moreIcon = clipsContainer.querySelector('.bottom_icon');
        if ( moreIcon) { moreIcon.style.display = "none"; }
    }
    return true
}

function setUpScroll(clipsContainer) {
    console.log('setting up on', clipsContainer)
    // let clipsContainer = e.target;
    // clipsContainer.scrollHeight //total possible distance
    // clipsContainer.scrollTop // current distance (0 at top)
    // clipsContainer.clientHeight // visible content on screen 

    setUpScrollAux(clipsContainer);
    clipsContainer.addEventListener('scroll', e => {
        setUpScrollAux(clipsContainer);
    })
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
    // console.log("clipsContainer.clientHeight", clipsContainer.clientHeight)
    // console.log("clipsContainer.scrollHeight", clipsContainer.scrollHeight)
    // console.log("at bottom?",  Math.abs(clipsContainer.scrollHeight - clipsContainer.clientHeight - clipsContainer.scrollTop) < 50)
    if (document.readyState == "complete" && Math.abs(clipsContainer.scrollHeight - clipsContainer.clientHeight - clipsContainer.scrollTop) < 50)  { 
        let moreIcon = e.target.querySelector('.bottom_icon');
        console.log(moreIcon);
        if ( moreIcon) {
            moreIcon.style.display = "none";

        }
    }
    return true
}




const options = {
    threshold: 0,
    rootMargin: "-250px 0px -250px 0px"
  }
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        // console.log(video.isIntersecting)
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    }, options);

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});