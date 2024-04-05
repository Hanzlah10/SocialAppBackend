const { User } = require("../models");
const CrudRepository = require("./crud-repository");

class UserRepostiory extends CrudRepository {
    constructor() {
        super(User)
    }

}
module.exports = UserRepostiory  