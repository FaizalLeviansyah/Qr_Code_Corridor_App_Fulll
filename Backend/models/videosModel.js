import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Videos = db.define('video',{
    name: DataTypes.STRING,
    videos: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Videos;

(async()=>{
    await db.sync();
})();
