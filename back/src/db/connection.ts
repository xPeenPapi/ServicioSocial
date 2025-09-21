import { Sequelize } from 'sequelize';

const sequelize = new Sequelize ('activeclassroom', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize