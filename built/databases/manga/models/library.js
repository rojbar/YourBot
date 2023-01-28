"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('library', {
        manga_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        last_chapter_read: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
        tableName: 'library',
        freezeTableName: true,
    });
};
