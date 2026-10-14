# AI 실무역량검사(Global) 모의연습

SK 계열 **AI 실무역량검사(Global, G-Fit 형식)**를 연습하는 로컬 웹앱입니다.
시나리오를 읽고 AI Agent와 함께 영어 결과물을 쓴 뒤(Task), 이해관계자 페르소나와 영어로 미팅(Meeting)합니다.
학습 모드에서는 원어민 음성으로 모범답안·회화 패턴을 듣고 쉐도잉할 수 있습니다.

> 개인 연습용 비공식 모의 화면입니다. 실제 시험의 문항과 세부 동작은 다를 수 있습니다.

## 빠른 시작

```bash
git clone https://github.com/inwoo-jang/gfit-mock.git
cd gfit-mock
node server.js
```

브라우저에서 **http://localhost:5173** 을 엽니다. (macOS는 `start.command` 더블클릭으로 서버 실행 + 브라우저 열기까지 한 번에 됩니다.)

설치할 패키지는 없습니다. **Node.js 18 이상**만 있으면 됩니다. (`node -v`로 확인)

업데이트: `git pull` 후 서버를 껐다 켜고(Ctrl+C → 다시 실행) 브라우저를 새로고침하세요.

## AI Agent 연결 (넷 중 하나)

Task의 AI Agent 채팅, 실시간 미팅 질문, AI 피드백·모범답변 생성에 씁니다.

| 방법 | 설정 | 비용 |
|---|---|---|
| **Claude Code 로그인** | [Claude Code](https://claude.com/claude-code) 설치 후 터미널에서 `claude` 실행해 로그인 | 내 Claude 구독 사용량 (Sonnet) |
| **Codex 로그인** | [Codex CLI](https://github.com/openai/codex) 설치 후 `codex` 실행해 로그인 | 내 ChatGPT 구독 사용량 |
| **Anthropic API 키** | `export ANTHROPIC_API_KEY=sk-ant-...` | API 사용료 |
| **OpenAI API 키** | `export OPENAI_API_KEY=sk-...` (모델: `OPENAI_MODEL`, 기본 `gpt-5`) | API 사용료 |

설정 후 서버를 실행하면 자동으로 하나를 고릅니다. 여러 개가 있으면 위 표 순서대로 먼저 되는 것을 씁니다.
직접 고르려면:

```bash
AI_PROVIDER=codex node server.js    # claude | codex | anthropic | openai
```

- Codex는 답변을 한 번에 보여줍니다(글자 단위 스트리밍 없음). 모델은 `CODEX_MODEL`로 바꿀 수 있습니다.
- 아무것도 없으면 AI 기능만 꺼지고 나머지(시나리오, 학습 모드, 음성)는 그대로 됩니다.
- 연결 상태는 화면 상단에 `AI 연결됨 (Claude Code 로그인)`처럼 표시됩니다. 서버를 켠 터미널에도 나옵니다.

> AI Agent는 과제 내용을 미리 주입받지 않습니다. 실전처럼 **첫 질문에 역할과 상황(과제 원문 복붙 또는 정리)을 직접** 주세요. 채팅 상단 `추천 프롬프트`에 단계별 예시가 있습니다.

## 원어민 음성 (ElevenLabs)

앱에 들어 있는 모든 영어 문장(시나리오, 모범답안, 미팅 질문·답변, 템플릿, 패턴, 회의 필수 100)은 **ElevenLabs 음성으로 미리 만들어 `tts-cache/`에 저장**되어 있습니다.
→ **키 없이도 원어민 음성으로 재생됩니다.** 크레딧이 들지 않습니다.

- AI가 새로 만든 문장(AI 모범답변 등)은 저장본이 없어 브라우저 기본 음성으로 나옵니다.
- 이것까지 ElevenLabs로 듣고 싶다면 본인 키를 설정하세요(본인 크레딧 사용):
  ```bash
  export ELEVENLABS_API_KEY=sk_...          # Text to Speech 권한만 있으면 됨
  export ELEVENLABS_VOICE_ID=...            # 선택. 기본값은 저장본과 같은 목소리
  export ELEVENLABS_MODEL=eleven_flash_v2_5 # 선택. 기본 eleven_multilingual_v2 (크레딧 절반)
  ```
- 목소리·모델을 바꾸면 저장본과 달라져 새로 생성됩니다.
- 음성 선택과 속도(0.8×–1.1×)는 화면 우측 상단 ⚙에서 바꿉니다.

## 내 모범답안으로 바꾸기 (개인용, git에 안 올라감)

모범답안·자기소개·이메일 서명은 예시 인물 **홍길동(Gildong Hong)**, 백엔드 개발자 기준으로 들어 있습니다.
본인 이름과 경력으로 바꾸려면:

```bash
cp data.local.example.js data.local.js
```

`data.local.js`를 열어 고치고 브라우저를 새로고침하면 됩니다.

```js
LOCAL.rename("Gildong Hong", "Minji Kim");   // 모든 문장에서 이름 바꾸기
LOCAL.rename("홍길동", "김민지");
LOCAL.replace("바꿀 영어 문장 원문 그대로",       // 학습 모드에 보이는 영어 문장 복사
  ["새 영어 문장", "한국어 해석"]);
```

- `data.local.js`는 `.gitignore`에 있어 **커밋·푸시되지 않고, `git pull` 해도 유지**됩니다.
- 문장을 못 찾으면 브라우저 콘솔에 `[data.local.js] 못 찾은 문장`이 표시됩니다.
- 바꾼 문장의 음성: ElevenLabs 키가 있으면 처음 들을 때 자동 생성되어 `tts-cache-local/`(git 제외)에 저장됩니다. 미리 만들려면 `node prebuild-tts.js --local`. 키가 없으면 브라우저 음성으로 나옵니다.

## 구성

**실전 시뮬레이션**
- 시나리오 10개 — T1–T5 기본 / T6–T10 SK AX 고객사 프로젝트(모집분야별: SW, Factory SW, AI/Data, Cloud/Infra, Solution Development)
- 시간 모드 — 실전(Task 20분 + Meeting) / 연습(제한 없음)
- Task: 시나리오·데이터 표 + 영어 에디터 + AI Agent 채팅 + Memo
- Meeting: 페르소나 질문을 음성으로 듣고 답변 → 결과 화면에서 AI 피드백, 모범답변 쉐도잉

**학습 모드 (리스닝·쉐도잉)**
- 시나리오별 모범답안
- AI 프롬프트 — AI Agent 활용 단계별 예시
- 템플릿 회화 — 상황별 회의 표현 (★ = 자주 쓰는 핵심 표현)
- 핵심 패턴 — 비즈니스 회화 패턴 47개 + 실전 회의 대화
- 회의 필수 100 — 회의 시작부터 마무리, 화상·대면 상황까지 단계별 표현
- 직무별 자기소개 — 모집분야별 30~45초 자기소개·지원동기
- ▶ 한 문장 듣기 · ×3 반복 · 쉐도잉(문장마다 따라 말할 시간 표시)

## 파일

| 파일 | 내용 |
|---|---|
| `server.js` | 로컬 서버. 정적 파일 + `/api/ask`(Claude) + `/api/tts`(ElevenLabs·저장본) |
| `index.html` `style.css` `app.js` | 화면과 동작 |
| `data.js` | 시나리오, 모범답안, 템플릿, 패턴, 추천 프롬프트 |
| `data.local.example.js` | 개인 맞춤 예시 → `data.local.js`로 복사해 사용 (git 제외) |
| `tts-cache/` | 미리 생성한 공용 음성(mp3). 파일명 = 목소리·모델·문장의 해시 |
| `tts-cache-local/` | 개인 문장·AI 생성 문장 음성 (git 제외, 자동 생성) |
| `prebuild-tts.js` | `data.js` 문장을 일괄 음성 생성 (아래 참고) |
| `start.command` | macOS 실행용 |

## 문장 추가·수정 후 음성 만들기

`data.js`를 고친 뒤, ElevenLabs 키를 설정하고 서버를 켠 상태에서:

```bash
node prebuild-tts.js
```

저장본이 없는 문장만 생성합니다. 만들어진 `tts-cache/` 파일을 커밋하면 다른 사람도 키 없이 듣습니다.

## 문제 해결

- **`AI 미연결`** — 터미널에서 `claude` 또는 `codex`가 실행되는지(로그인됐는지) 확인하거나 API 키를 설정하고 서버를 다시 켜세요. 서버 터미널의 `AI 연결:` 줄에서 상태를 볼 수 있습니다. `index.html`을 파일로 직접 열면(file://) AI와 음성이 동작하지 않습니다.
- **포트 사용 중** — `PORT=5174 node server.js` 후 http://localhost:5174
- **소리가 기계음** — ⚙에서 목소리가 `ElevenLabs (원어민)`인지 확인. 서버 없이 열었거나 저장본이 없는 문장이면 브라우저 음성이 나옵니다.
