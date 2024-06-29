export class Song {
    constructor(
        public name: string,
        public artist: string,
        public album: string,
        public playing: boolean,
        public scrobbled: boolean,
    ) {
        this.name = name;
        this.artist = artist;
        this.album = album;
        this.playing = playing;
        this.scrobbled = scrobbled;
    }
}