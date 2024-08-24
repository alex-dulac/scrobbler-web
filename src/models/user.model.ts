import {LastFmTrack} from "./lastfm-track.model.ts";
import {LastFmAlbum} from "./lastfm-album.model.ts";

export class User {
    constructor(
        public name?: string,
        public url?: string,
        public imageUrl?: string,
        public playcount?: number,
        public recentTracks?: [LastFmTrack, LastFmAlbum][],
        public albumCount?: number,
        public artistCount?: number,
        public country?: string,
        public realname?: string,
        public registered?: string,
        public subscriber?: boolean,
        public trackCount?: string,
    ) {
        this.name = name;
        this.url = url;
        this.imageUrl = imageUrl;
        this.playcount = playcount;
        this.recentTracks = recentTracks;
        this.albumCount = albumCount;
        this.artistCount = artistCount;
        this.country = country;
        this.realname = realname;
        this.registered = registered;
        this.subscriber = subscriber;
        this.trackCount = trackCount;
    }
}