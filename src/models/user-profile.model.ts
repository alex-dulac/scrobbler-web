export class UserProfileModel {
    constructor(
        public name: string,
        public image_url: string,
    ) {
        this.name = name;
        this.image_url = image_url;
    }
}