// adminModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admin = db.define('admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Admin;

(async () => {
    await db.sync();
})();
