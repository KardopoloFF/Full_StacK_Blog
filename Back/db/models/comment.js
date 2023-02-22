const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			this.belongsTo(models.Post, {
				foreignKey: 'post_id',
			});
			this.belongsTo(models.User, {
				foreignKey: 'user_id',
			});
		}
	}
	Comment.init({
		text: DataTypes.TEXT,
		user_id: DataTypes.INTEGER,
		post_id: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'Comment',
	});
	return Comment;
};
