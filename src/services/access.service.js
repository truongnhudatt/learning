const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keytoken.service")
const { createTokenPair } = require("../auth/authUtils")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}
class AccessService{
    static signUp = async ({name, email, password}) => {
        try {
            //step 1: check email exist;
            const holderShop = await shopModel.findOne({ email }).lean()
            if(holderShop){
                return {
                    code: 403,
                    message: 'Email already registered!',
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })
            if(newShop){
                const {privateKey, publicKey} = crypto.generateKeyPairSync("rsa",{
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format:'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format:'pem'
                    }
                })
                console.log({privateKey, publicKey})
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })
                if(!publicKeyString){
                    return {
                        code: 403,
                        message: 'publicKeyString error'
                    }
                }
                console.log(`publicKeyString:: `, publicKeyString)

                const publicKeyObject = crypto.createPublicKey(publicKeyString)
                console.log(`publicKeyObject:: `, publicKeyObject)

                // create token pair
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKeyString, privateKey)
                console.log(`Created token successfully:: `, tokens)
                return {
                    code: 200,
                    metadata:{
                        shop: newShop,
                        tokens
                    }
                }
            }
            return{
                code: 200,
                metadata: null
            }    
        } catch (error) {
            return{
                code: 403,
                message: error.message,
                status: 'false'
            }
        }
    }
}

module.exports = AccessService