module.exports = (sequelize, DataTypes) => {
	return sequelize.define('manga', {
		manga_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        source_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		chapter_url:
		{
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		timestamps: false,
		tableName: 'manga',
		freezeTableName: true,
	});
};