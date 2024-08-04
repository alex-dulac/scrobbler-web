import {LastFmTrack} from "./lastfm-track.model.ts";
import {LastFmAlbum} from "./lastfm-album.model.ts";

export class User {
    constructor(
        public name?: string,
        public lastFmUrl?: string,
        public imageUrl?: string,
        public playcount?: number,
        public recentTracks?: [LastFmTrack, LastFmAlbum][]
    ) {
        this.name = name;
        this.lastFmUrl = lastFmUrl;
        this.imageUrl = imageUrl;
        this.playcount = playcount;
        this.recentTracks = recentTracks;
    }
}