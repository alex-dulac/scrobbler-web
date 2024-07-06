import {LastFmTrack} from "./lastfm-track.model.ts";

export class UserStats {
    constructor(
        public playCount: number,
        public recentTracks: LastFmTrack[]
    ) {
        this.playCount = playCount;
        this.recentTracks = recentTracks;
    }
}