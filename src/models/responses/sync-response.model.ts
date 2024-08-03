import {Song} from "../song.model.ts";

export class SyncStateResponse {
    constructor(
        public current_song: Song,
        public lastfm_album: any,
        public active_integration: string,
        public is_scrobbling: boolean,
        public user: any,
    ) {}
}