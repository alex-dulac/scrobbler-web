export class Song {
    constructor(
        public id: number,
        public index: number,
        public name: string,
        public persistentId: string,
        public time: string,
        public duration: number,
        public artist: string,
        public albumArtist: string,
        public composer: string,
        public album: string,
        public genre: string,
        public trackNumber: number,
        public discNumber: number,
        public year: number,
        public releaseDate: string,
        public loved: boolean,
        public disliked: boolean,
        public albumLoved: boolean,
        public albumDisliked: boolean,
        public playing: boolean,
        public scrobbled: boolean,
        public artworkData: string,
    ) {
        this.id = id;
        this.index = index;
        this.name = name;
        this.persistentId = persistentId;
        this.time = time;
        this.duration = duration;
        this.artist = artist;
        this.albumArtist = albumArtist;
        this.composer = composer;
        this.album = album;
        this.genre = genre;
        this.trackNumber = trackNumber;
        this.discNumber = discNumber;
        this.year = year;
        this.releaseDate = releaseDate;
        this.loved = loved;
        this.disliked = disliked;
        this.albumLoved = albumLoved;
        this.albumDisliked = albumDisliked;
        this.playing = playing;
        this.scrobbled = scrobbled;
        this.artworkData = artworkData;
    }
}