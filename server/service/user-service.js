const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/user-dtos")
const ApiError = require("../exceptions/api-error")

class UserService {
    async registration(email, password, name) {
        console.log(email, password, name)
        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw ApiError.BedRequest("Пользователь с таким Email уже есть")
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, name, activationLink})
        await mailService.sendActivationMail(email, `http://localhost:5006/auth/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens,user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BedRequest("Юзера с таким activationLink нет")
        }
        user.isActivate = true
        await user.save()

    }

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BedRequest("Пользователя с таким Email не найдено");
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BedRequest("Неверный пароль");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens,user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken)
        console.log(userData, "userData")
        console.log(!tokenFromDb, "tokenFromDb")
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens,user: userDto}
    }

    async getAllUsers() {
        return UserModel.find()

    }
}

module.exports = new UserService()