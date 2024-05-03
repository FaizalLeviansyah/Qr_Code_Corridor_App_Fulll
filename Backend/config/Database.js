import { Sequelize } from "sequelize";

const db = new Sequelize('qr_code_corridor', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;