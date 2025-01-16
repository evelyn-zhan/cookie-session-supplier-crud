import { sequelize, DataTypes } from './model.js'

const User = sequelize.define('user',
    {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.TINYINT,
        username: DataTypes.STRING
    }
    // , {
    //     timestamps: false
    // }
)

export default User
