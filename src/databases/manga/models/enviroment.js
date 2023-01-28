module.exports = (sequelize, DataTypes) => {
	return sequelize.define('enviroment', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		default_source: {
			type: DataTypes.INTEGER,
			allowNull: false,
        },
	}, {
		timestamps: false,
		tableName: 'enviroment',
		freezeTableName: true,
	});
};