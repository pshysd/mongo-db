/**
 * ! windows의 경우 service에 mongoDB 등록하지않으면 서버 실행할 때 마다 일일히 켜줘야 됨
 */

const express = require("express"); // 익스프레스
const path = require("path"); // 경로설정할때 쓰는거
const nunjucks = require("nunjucks"); // 템플릿엔진(리액트 할거니까 몰라도댐)
const morgan = require("morgan"); // 터미널에 로그기록해주는애

const connect = require("./schemas"); // 몽구스(몽고디비 드라이버라고 볼수있음)

// 라우팅
const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

// 여기부터 시작
const app = express();
app.set("port", process.env.PORT || 3002); // port라는 이름으로 환경변수에 저장된 PORT나 없으면 3002번 사용
app.set("view engine", "html"); // 익스프레스에서 .html 파일을 뷰 엔진으로 사용하겠다는 뜻 => 당연 / 리액트 쓰면 안해도댐
nunjucks.configure("views", {
  // 넌적스 설정
  express: app,
  watch: true,
});

connect(); // 일단 몽고디비 연결부터

app.use(morgan("dev")); // 모건 사용
app.use(express.static(path.join(__dirname, "public"))); // 정적파일 제공
app.use(express.json()); // json 데이터 파싱할 필요없이 body.~~ 로 가져올 수 있음
app.use(express.urlencoded({ extended: false })); // POST 요청 처리해주는애

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'),() => {
  console.log(`Running on PORT: ${app.get('port')}`);
})