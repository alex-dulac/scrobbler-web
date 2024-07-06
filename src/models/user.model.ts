import {UserStats} from "./user-stats.model.ts";

export class UserModel {
    constructor(
        public name?: string,
        public lastFmUrl?: string,
        public imageUrl?: string,
        public stats?: UserStats,
    ) {
        this.name = name;
        this.lastFmUrl = lastFmUrl;
        this.imageUrl = imageUrl;
        this.stats = stats;
    }
}