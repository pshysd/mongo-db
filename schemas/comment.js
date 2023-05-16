const mongoose = require('mongoose');

const { Schema } = mongoose; // 객체 구조분해 할당으로 가져옴 (== mongoose.Schema)
const {
	Types: { ObjectId },
} = Schema; // Schema.Types.ObjectId <- 이거 가져온거임

const commentSchema = new Schema({
	commenter: {
		type: ObjectId,
		required: true,
		ref: 'User', // User에 있는 ObjectId를 참조하겠다는 뜻 (~= fk같은 느낌)
	},

	comment: {
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Comment', commentSchema);

/* 
  type: 자료형
  require: 필수여부
  default: 기본값
  unique: 고유여부
  ref: 
 */
