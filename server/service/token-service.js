const jwt = require("jsonwebtoken")
const {secret, secretRefresh} = require("../secretKey");
const tokenModel = require("../models/token-model")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, secret, {expiresIn: "3h"})
        const refreshToken = jwt.sign(payload, secretRefresh, {expiresIn: "24d"})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, secret)
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, secretRefresh)
            return userData;
        } catch(e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user:userId, refreshToken})
        return token

    }

    async removeToken(refreshToken) {
        const token = await tokenModel.deleteOne({refreshToken})
        return token
    }

    async findToken(refreshToken) {
        const token = await tokenModel.findOne({refreshToken})
        return token
    }



}

module.exports = new TokenService()