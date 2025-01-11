import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('store_db', 'root', '', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql'
})

export { sequelize, DataTypes }