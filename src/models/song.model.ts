export class Song {
    constructor(
        public track: string,
        public artist: string,
        public album: string,
    ) {
        this.track = track;
        this.artist = artist;
        this.album = album;
    }
}