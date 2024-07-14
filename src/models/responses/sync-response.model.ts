import {Song} from "../song.model.ts";

export class SyncStateResponse {
    constructor(
        public current_song: Song,
        public is_scrobbling: boolean,
        public user: any,
    ) {}
}