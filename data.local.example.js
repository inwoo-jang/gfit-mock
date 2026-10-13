/* 개인 모범답안 맞춤 파일 예시
   1) 이 파일을 data.local.js 로 복사:  cp data.local.example.js data.local.js
   2) 아래를 본인 내용으로 고치고 브라우저 새로고침
   data.local.js 는 .gitignore에 있어 git에 올라가지 않습니다. git pull 해도 그대로 유지됩니다. */

// 이름 바꾸기 — 모든 모범답안·자기소개·이메일 서명에 적용
LOCAL.rename("Gildong Hong", "Your Name");
LOCAL.rename("홍길동", "본인이름");
LOCAL.rename("Gildong", "YourFirstName");
LOCAL.rename("길동", "이름");

// 문장 통째로 바꾸기 — 학습 모드에 보이는 영어 문장을 그대로 복사해 첫 인자로
LOCAL.replace("Before joining, I worked as a backend developer, building APIs and data pipelines for web services.",
  ["Before joining, I worked as a data analyst, turning sales data into weekly dashboards.",
   "입사 전에는 데이터 분석가로 매출 데이터를 주간 대시보드로 만들었습니다."]);

// 그 밖에 자유롭게 수정 가능 (data.js 다음에 실행되는 일반 JS)
// 예: TEMPLATES.push({cat:"내 표현", items:[["My own sentence.", "내 문장"]]});
