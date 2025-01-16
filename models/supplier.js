import { sequelize, DataTypes } from './model.js'

const Supplier = sequelize.define('supplier',
    {
        company_name: DataTypes.STRING,
        contact_name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        active: DataTypes.TINYINT,
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING
    }
)

export default Supplier
