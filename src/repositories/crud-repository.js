const { ApiError } = require("../utils/apiError");
const { ServerErrorCodes } = require("../utils/errorCodes");

class CrudRepository {
    constructor(Model) {
        this.model = Model

    }
    async create(data) {
        try {
            console.log(data, this.model);
            const response = this.model.create(data)
            // console.log(response);
            return response
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, {}, false, error)
        }
    }
    async find(data) {
        try {

            const response = await this.model.findOne(data)
            return response
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, {}, false, error)
        }
    }
    async update(id, data) {
        try {

            const response = await this.model.findByIdAndUpdate(id, data)

            return response
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, {}, false, error)
        }
    }
    async delete(data) {
        try {
            console.log(this.model, data)
            const response = await this.model.deleteOne(data)
            console.log(response);
            return response
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, {}, false, error)
        }
    }
    async commentById(commentId, newCommentId) {
        try {
            let updateObject = {};
            updateObject["comment"] = newCommentId;
            const response = await this.model.findByIdAndUpdate(
                { _id: commentId },
                { $addToSet: updateObject }
            )
            return response
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, {}, false, error)
        }
    }
}
module.exports = CrudRepository