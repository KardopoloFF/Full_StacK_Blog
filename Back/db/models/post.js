const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			this.belongsTo(models.User, {
				foreignKey: 'user_id',
			});
			this.hasMany(models.Comment, {
				foreignKey: 'post_id',
			});
		}
	}
	Post.init({
		title: DataTypes.STRING,
		text: DataTypes.TEXT,
		tags: DataTypes.ARRAY(DataTypes.STRING),
		imageUrl: DataTypes.TEXT,
		user_id: DataTypes.INTEGER,
		viewCount: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'Post',
	});
	return Post;
};
