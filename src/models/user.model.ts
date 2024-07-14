import {LastFmTrack} from "./lastfm-track.model.ts";

export class UserModel {
    constructor(
        public name?: string,
        public lastFmUrl?: string,
        public imageUrl?: string,
        public playcount?: number,
        public recentTracks?: LastFmTrack[]
    ) {
        this.name = name;
        this.lastFmUrl = lastFmUrl;
        this.imageUrl = imageUrl;
        this.playcount = playcount;
        this.recentTracks = recentTracks;
    }
}