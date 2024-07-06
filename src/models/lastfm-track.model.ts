export class LastFmTrack {
    constructor(
        public name: string,
        public artist: string,
        public album: string,
        public scrobbledAt: string,
    ) {
        this.name = name;
        this.artist = artist;
        this.album = album;
        this.scrobbledAt = scrobbledAt;
    }
}