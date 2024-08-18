export class Song {
    constructor(
        public id: number,
        public index: number,
        public name: string,
        public persistent_id: string,
        public time: string,
        public duration: number,
        public artist: string,
        public album_artist: string,
        public composer: string,
        public album: string,
        public genre: string,
        public track_number: number,
        public disc_number: number,
        public year: number,
        public release_date: string,
        public loved: boolean,
        public disliked: boolean,
        public album_loved: boolean,
        public album_disliked: boolean,
        public playing: boolean,
        public scrobbled: boolean,
        public artwork_data: string,
    ) {
        this.id = id;
        this.index = index;
        this.name = name;
        this.persistent_id = persistent_id;
        this.time = time;
        this.duration = duration;
        this.artist = artist;
        this.album_artist = album_artist;
        this.composer = composer;
        this.album = album;
        this.genre = genre;
        this.track_number = track_number;
        this.disc_number = disc_number;
        this.year = year;
        this.release_date = release_date;
        this.loved = loved;
        this.disliked = disliked;
        this.album_loved = album_loved;
        this.album_disliked = album_disliked;
        this.playing = playing;
        this.scrobbled = scrobbled;
        this.artwork_data = artwork_data;
    }
}