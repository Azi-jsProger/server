module.exports = class UserDto {
    email;
    id;
    isActivate;
    name;

    constructor(model) {
        this.name = model.name;
        this.email = model.email;
        this.id = model._id;
        this.isActivate = model.isActivate;
    }
}