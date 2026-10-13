#!/bin/bash
# G-Fit 모의고사 로컬 실행: 더블클릭하면 서버를 켜고 브라우저를 엽니다. 종료는 이 창에서 Ctrl+C.
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
# ElevenLabs 키: 환경에 없으면 ~/.zshrc의 export 줄에서 읽음
[ -z "$ELEVENLABS_API_KEY" ] && eval "$(grep -E '^export ELEVENLABS_API_KEY=' ~/.zshrc 2>/dev/null)"
(sleep 1.5; open "http://localhost:5173") &
node server.js
