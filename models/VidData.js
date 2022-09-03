

class VidData {
    constructor(csvPath, vidPath, vidTitle) {
        this.csvPath = csvPath;
        this.vidPath = vidPath;
        this.vidTitle =  vidTitle;
        // this.getVidPath = title;
    }
    // getTitle() {
    //     return this.vidTitle != null ?  this.vidTitle : this.vidPath.split('/')?.slice(-1)[0]?.replace('.mp4', '');
    // }
}  

module.exports = VidData;