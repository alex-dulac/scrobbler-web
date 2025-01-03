import {Song} from "../models/song.model.ts";
import {LastFmAlbum} from "../models/lastfm-album.model.ts";
import {User} from "../models/user.model.ts";

export interface syncDetails {
	activeIntegration: number;
	currentSong: Song;
	isScrobbling: boolean;
	lastFmAlbum: LastFmAlbum; // no tracks
	user: User;
}

export interface currentSong {
	artistImage: string;
	currentSong: Song;
	lastFmAlbum: LastFmAlbum; // no tracks
}
