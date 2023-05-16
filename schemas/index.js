const mongoose = require('mongoose');

const connect = () => {
	if (process.env.NODE_ENV !== 'production') {
		mongoose.set('debug', true);
	}

	mongoose
		.connect('mongodb://root:root@localhost:27017/admin', {
			dbName: 'nodejs',
			useNewUrlParser: true,
			// useCreateIndex: true, 6버전부터는 에러남
		})
		.then(() => {
			console.log('mongoDB 연결 성공');
		})
		.catch((error) => {
			console.log('mongoDB 연결 에러', error);
		});
};

mongoose.connection.on('error', (error) => {
	console.error('mongoDB 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
	console.error('mongoDB 연결이 끊어졌습니다. 연결을 재시도합니다.');
	connect();
});

module.exports = connect;
