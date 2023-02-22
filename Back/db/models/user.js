const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			this.hasMany(models.Post, {
				foreignKey: 'user_id',
			});
			this.hasMany(models.Comment, {
				foreignKey: 'user_id',
			});
		}
	}
	User.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.TEXT,
		avatar: DataTypes.TEXT,
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};
