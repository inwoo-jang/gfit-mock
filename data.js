/* G-Fit mock — scenario, template and pattern data */
/* ---------------- DATA ---------------- */
const TASKS = [
{
  id:"T1", short:"자기소개 이메일", sub:"사전점검 재현",
  persona:{name:"Clair",role:"Team Lead",init:"C"},
  title:"Introductory Email",
  scenario:[
    ["You have joined SK AX as of today.","당신은 오늘부로 SK AX에 입사했습니다."],
    ["Please write a short introductory email to your new team members to introduce yourself and share your aspirations for working together.","새 팀원들에게 자신을 소개하고 함께 일하는 포부를 공유하는 짧은 소개 이메일을 작성하세요."],
    ["Two or three sentences are enough.","두세 문장이면 충분합니다."]
  ],
  reqs:["자기소개 + 포부","2~3문장 (사전점검 기준. 본시험은 더 긴 보고서형 예상)","수신: My New Team"],
  table:null,
  head:"To: My New Team · Subject: Hello from your new teammate",
  output:[
    ["Hello team, my name is Gildong Hong, and I'm excited to join SK AX as a new member of the team.","안녕하세요 팀원 여러분, 저는 홍길동이고 SK AX의 새 팀원으로 합류하게 되어 기쁩니다."],
    ["Before joining, I worked as a backend developer, building APIs and data pipelines for web services.","입사 전에는 백엔드 개발자로 웹 서비스의 API와 데이터 파이프라인을 만들었습니다. (본인 경력으로 바꾸세요)"],
    ["I look forward to learning from all of you and contributing to projects that help our clients get real value from AI.","여러분께 많이 배우고, 고객이 AI로 실질적 가치를 얻도록 돕는 프로젝트에 기여하고 싶습니다."],
    ["Please feel free to reach out anytime. I'd love to grab a coffee and hear about what you're working on.","언제든 편하게 연락 주세요. 커피 한잔하며 하고 계신 일에 대해 듣고 싶습니다."]
  ],
  prompts:[
    ["KO","SK AX 신입으로 팀에 보낼 자기소개 이메일을 3문장으로 써줘. 톤은 친근하지만 전문적으로."],
    ["EN","Make this email sound more natural and concise. Keep it under 60 words."]
  ],
  memo:["AI 초안의 [Your Name] placeholder를 실명으로 교체","요구사항 2~3문장 → 길이 확인 후 1문장 삭제","‘best’ 같은 과장 표현 제거, 사실 기반 경력만 사용"],
  qs:[
    {q:"Thanks for your email. Could you introduce yourself a little more and tell us what you'd like to focus on here?",
     a:[["Sure. My name is Gildong Hong, and I've just joined SK AX.","네. 저는 홍길동이고 SK AX에 막 합류했습니다."],
        ["Before joining, I worked as a backend developer, so I'm used to breaking down problems and building reliable solutions step by step.","입사 전 백엔드 개발자로 일해서, 문제를 쪼개고 안정적인 해결책을 단계적으로 만드는 데 익숙합니다."],
        ["Here, I'd like to focus on understanding how our clients actually use AI, and where it creates real value for them.","여기서는 고객이 AI를 실제로 어떻게 쓰는지, 어디서 진짜 가치가 생기는지 이해하는 데 집중하고 싶습니다."],
        ["In my first few months, my goal is to learn our processes quickly and take ownership of at least one small project.","처음 몇 달은 업무 프로세스를 빠르게 익히고 작은 프로젝트 하나는 직접 책임지는 것이 목표입니다."],
        ["I'd say the best way to do that is to work closely with all of you, so please feel free to give me feedback anytime.","그러려면 여러분과 긴밀히 일하는 게 최선이라 생각하니, 언제든 피드백 주세요."]]},
    {q:"In your email, you mentioned building strong collaboration. What does good collaboration look like to you?",
     a:[["To me, good collaboration means three things: clear goals, shared information, and honest feedback.","제게 좋은 협업은 세 가지입니다. 명확한 목표, 정보 공유, 솔직한 피드백."],
        ["First, everyone should know what we're trying to achieve and who owns each task.","첫째, 모두가 목표와 각 업무 담당자를 알아야 합니다."],
        ["Second, it's essential that we keep everyone informed, especially when plans change.","둘째, 특히 계획이 바뀔 때 모두에게 상황을 공유하는 것이 필수입니다."],
        ["And third, people should feel comfortable raising concerns early, not at the last minute.","셋째, 마지막 순간이 아니라 일찍 우려를 말할 수 있어야 합니다."],
        ["Going forward, I'll share weekly updates on my work so the team always knows where I am.","앞으로 제 업무를 매주 공유해서 팀이 진행 상황을 늘 알 수 있게 하겠습니다."]]},
    {q:"Tell me about a time you disagreed with a teammate. How did you handle it?",
     a:[["In a previous project, a teammate and I disagreed on which feature to launch first.","이전 프로젝트에서 팀원과 어떤 기능을 먼저 출시할지 의견이 달랐습니다. (본인 경험으로 교체)"],
        ["Instead of arguing about opinions, I suggested we look at the customer data together.","의견으로 다투는 대신 고객 데이터를 함께 보자고 제안했습니다."],
        ["The data showed that most complaints were about the sign-up process, so we agreed to fix that first.","데이터상 불만 대부분이 가입 과정이라, 그것부터 고치기로 합의했습니다."],
        ["As a result, we reduced drop-offs during sign-up and kept a good working relationship.","결과적으로 가입 이탈을 줄였고 좋은 관계도 유지했습니다."],
        ["What I learned is that data helps turn a disagreement into a shared decision.","데이터가 의견 충돌을 공동의 결정으로 바꿔 준다는 걸 배웠습니다."]]}
  ]
},
{
  id:"T2", short:"벤더 선정 추천", sub:"예산·일정 제약",
  persona:{name:"Clair",role:"Team Lead",init:"C"},
  title:"Chatbot Vendor Recommendation",
  scenario:[
    ["You are a junior consultant at SK AX.","당신은 SK AX의 주니어 컨설턴트입니다."],
    ["Your client, BrightMart, a mid-sized electronics retailer, wants to launch an AI chatbot for customer service before the holiday season, which starts in three months.","고객사 BrightMart(중견 전자제품 유통사)는 3개월 뒤 시작되는 연말 시즌 전에 고객상담 AI 챗봇을 출시하려 합니다."],
    ["The annual budget for this project is capped at one hundred fifty thousand dollars.","이 프로젝트의 연간 예산 상한은 15만 달러입니다."],
    ["Review the three options below and write an email to your team lead, Clair, recommending one option with clear reasons and risks.","아래 세 옵션을 검토해 팀장 Clair에게 이유와 리스크를 담아 하나를 추천하는 이메일을 쓰세요."]
  ],
  reqs:["추천 옵션 1개 (첫 문장에)","선택 이유 + 탈락 옵션 이유","리스크와 대응책","다음 단계"],
  table:{h:["Option","Accuracy (pilot)","Annual cost","Time to launch","Notes"],r:[
    ["A · Global LLM platform","92%","$180,000","4 months","Strong multilingual support"],
    ["B · Local AI startup","85%","$90,000","2 months","Easy CRM integration; 2-year track record"],
    ["C · In-house build","Unknown","$250,000 (yr 1)","8 months","Full control of data"]]},
  head:"To: Clair · Subject: Recommendation for BrightMart's Customer Service Chatbot",
  output:[
    ["Hi Clair, I recommend Vendor B for BrightMart's chatbot project.","Clair님, BrightMart 챗봇 프로젝트에 Vendor B를 추천합니다."],
    ["It is the only option that meets both of the client's key constraints.","고객사의 두 핵심 제약을 모두 충족하는 유일한 옵션입니다."],
    ["It can launch in two months, before the holiday season, and its annual cost of ninety thousand dollars is well within the budget.","2개월 내, 즉 연말 시즌 전에 출시 가능하고 연 9만 달러로 예산 내에 충분히 들어옵니다."],
    ["Vendor A has the highest accuracy at 92 percent, but it exceeds the budget by thirty thousand dollars and would launch one month too late.","Vendor A는 정확도 92%로 가장 높지만 예산을 3만 달러 초과하고 출시가 한 달 늦습니다."],
    ["The in-house option is not realistic, as it would take eight months and cost two hundred fifty thousand dollars in the first year.","자체 구축은 8개월, 첫해 25만 달러로 현실적이지 않습니다."],
    ["The main risk with Vendor B is its lower accuracy of 85 percent.","Vendor B의 주요 리스크는 85%라는 낮은 정확도입니다."],
    ["To manage this, I suggest routing complex questions to human agents and reviewing the chat logs every week.","이를 위해 복잡한 문의는 상담원에게 넘기고 매주 대화 로그를 검토할 것을 제안합니다."],
    ["The remaining sixty thousand dollars could fund extra human support during the peak season.","남는 6만 달러로 성수기 상담 인력을 보강할 수 있습니다."],
    ["As a next step, I'd like to set up a call with Vendor B this week to confirm the integration timeline.","다음 단계로 이번 주 Vendor B와 통화해 연동 일정을 확정하고 싶습니다."],
    ["Please let me know your thoughts. Best regards, Gildong.","의견 주세요. 감사합니다, 길동 드림."]
  ],
  prompts:[
    ["KO","예산 15만 달러, 3개월 내 출시 조건으로 세 옵션을 비교표로 정리해줘. 조건 충족 여부 열을 추가해줘."],
    ["KO","Vendor B를 선택했을 때 리스크 3가지와 각각의 대응책을 제안해줘."],
    ["EN","Review my email. Is the recommendation clear in the first sentence? Make it more concise without changing the numbers."]
  ],
  memo:["AI가 처음엔 정확도 기준으로 A 추천 → 예산·일정 제약 누락 확인 후 직접 B로 판단","모든 수치는 시나리오 표에서만 인용 (AI가 만든 수치 미사용)","‘88% 기준선’은 내 가정임을 명시할 것"],
  qs:[
    {q:"Why didn't you choose Vendor A? It has the highest accuracy.",
     a:[["That's a fair question.","합리적인 질문입니다."],
        ["Vendor A is clearly the strongest in accuracy, but it doesn't meet the client's two hard constraints.","A가 정확도는 가장 좋지만, 고객사의 두 가지 필수 제약을 충족하지 못합니다."],
        ["It costs one hundred eighty thousand dollars a year, which is thirty thousand over budget, and it would take four months to launch, so we would miss the holiday season.","연 18만 달러로 예산을 3만 달러 넘고, 출시에 4개월이 걸려 연말 시즌을 놓칩니다."],
        ["For BrightMart, launching on time matters more than a seven-point gap in accuracy.","BrightMart에게는 정확도 7%p 차이보다 제때 출시가 더 중요합니다."],
        ["That said, if the budget and timeline change next year, I'd say Vendor A is worth reconsidering.","다만 내년에 예산과 일정이 바뀌면 A는 다시 검토할 가치가 있다고 봅니다."]]},
    {q:"The client is worried that 85 percent accuracy will frustrate customers. How would you respond?",
     a:[["I understand the concern, and I think it's a valid one.","그 우려는 이해하고, 타당하다고 생각합니다."],
        ["About fifteen percent of questions may not be answered correctly, so the chatbot shouldn't handle everything alone.","약 15%는 정확히 답하지 못할 수 있으니 챗봇 혼자 다 처리하게 두면 안 됩니다."],
        ["My plan is to send complex or sensitive questions directly to human agents, so customers don't get stuck.","복잡하거나 민감한 문의는 바로 상담원에게 넘겨 고객이 막히지 않게 하겠습니다."],
        ["We'll also review the chat logs every week and update the answers, so accuracy should improve over time.","매주 로그를 검토해 답변을 개선하니 정확도는 점점 올라갈 것입니다."],
        ["If it helps, I can put this plan in writing and share it with the client before the kick-off.","필요하시면 이 계획을 문서로 정리해 킥오프 전에 고객사와 공유하겠습니다."]]},
    {q:"What's the biggest risk in your plan, and how will you manage it?",
     a:[["I'd say the biggest risk is Vendor B's limited track record.","가장 큰 리스크는 Vendor B의 짧은 업력이라고 봅니다."],
        ["They've only been in business for two years, so there's some uncertainty about their stability and support.","설립 2년이라 안정성과 지원에 불확실성이 있습니다."],
        ["To manage this, I'd add a performance clause to the contract, with a review point at three months.","이를 위해 계약에 성과 조항을 넣고 3개월 시점에 검토하겠습니다."],
        ["We'd also keep our data in a standard format, so we can switch vendors if we need to.","데이터도 표준 형식으로 보관해 필요하면 벤더를 바꿀 수 있게 하겠습니다."],
        ["This way, we get a fast launch without being locked in.","이렇게 하면 종속되지 않으면서 빠르게 출시할 수 있습니다."]]},
    {q:"If the client increased the budget by 30 percent, would you change your recommendation?",
     a:[["Good question. Let me think about that for a moment.","좋은 질문입니다. 잠시 생각해 보겠습니다."],
        ["With a 30 percent increase, the budget would be one hundred ninety-five thousand dollars, so Vendor A would become affordable.","30% 늘면 예산이 19만 5천 달러가 되어 A도 감당 가능합니다."],
        ["However, the timeline problem would still be there, since Vendor A needs four months.","하지만 A는 4개월이 필요해 일정 문제는 그대로입니다."],
        ["So for this holiday season, I would still recommend Vendor B.","그래서 이번 연말 시즌에는 여전히 B를 추천합니다."],
        ["But I'd suggest using the extra budget to run a pilot with Vendor A next year and compare the results.","대신 추가 예산으로 내년에 A를 파일럿해 결과를 비교하자고 제안하겠습니다."]]}
  ]
},
{
  id:"T3", short:"프로젝트 지연 보고", sub:"고객사 커뮤니케이션",
  persona:{name:"Mr. Weber",role:"Operations Director · Client",init:"W"},
  title:"Project Delay Update",
  scenario:[
    ["You are a project manager at SK AX.","당신은 SK AX의 프로젝트 매니저입니다."],
    ["Your team is building a smart factory data platform for Weber Industries, a German manufacturing client.","팀은 독일 제조 고객사 Weber Industries의 스마트팩토리 데이터 플랫폼을 구축 중입니다."],
    ["The go-live date was June 30, but testing showed that 30 percent of the sensor data from the older production lines is incomplete.","오픈일은 6월 30일이었지만, 테스트 결과 노후 라인 센서 데이터의 30%가 불완전했습니다."],
    ["Cleaning the data will delay go-live by three weeks. The client has not been informed yet.","데이터 정제로 오픈이 3주 늦어집니다. 고객사는 아직 모릅니다."],
    ["Write an email to the operations director explaining the situation, the impact, and your recovery plan.","운영 총괄에게 상황, 영향, 회복 계획을 설명하는 이메일을 쓰세요."]
  ],
  reqs:["상황(원인) → 영향(새 일정) → 대응책 → 고객 요청사항","사과는 1회, 짧게","회의 일정 제안으로 마무리"],
  table:{h:["Item","Detail"],r:[
    ["Original go-live","June 30"],["New full go-live","July 21 (+3 weeks)"],
    ["Cause","30% incomplete sensor data, lines 3–5 (legacy equipment)"],
    ["Option","Partial go-live for lines 1–2 on June 30"],
    ["Needed from client","2 days of line engineer support next week"]]},
  head:"To: Mr. Weber · Subject: Update on Platform Go-Live Schedule and Recovery Plan",
  output:[
    ["Dear Mr. Weber, I'm writing to update you on an issue we found during testing, and to share our plan to address it.","Weber님, 테스트 중 발견된 이슈와 대응 계획을 말씀드리고자 메일 드립니다."],
    ["About 30 percent of the sensor data from production lines 3 to 5 is incomplete, mainly because of the older equipment on those lines.","3~5번 라인 센서 데이터의 약 30%가 불완전하며, 주로 해당 라인의 노후 설비 때문입니다."],
    ["If we go live with this data, the platform's reports would not be reliable, so we need about three more weeks to clean it.","이 데이터로 오픈하면 리포트를 신뢰할 수 없어, 정제에 약 3주가 더 필요합니다."],
    ["This would move the full go-live date from June 30 to July 21.","이에 따라 전체 오픈일이 6월 30일에서 7월 21일로 변경됩니다."],
    ["To reduce the impact, we propose a partial go-live for lines 1 and 2 on the original date, since their data is complete.","영향을 줄이기 위해, 데이터가 온전한 1·2번 라인은 원래 날짜에 부분 오픈할 것을 제안합니다."],
    ["To stay on this schedule, we would need two days of support from your line engineers next week.","이 일정을 지키려면 다음 주 라인 엔지니어분들의 이틀 지원이 필요합니다."],
    ["I apologize for the inconvenience, and I'd like to discuss this with you in a short call.","불편을 드려 죄송하며, 짧게 통화로 논의드리고 싶습니다."],
    ["Does Wednesday at 10 a.m. work for you? Best regards, Gildong Hong.","수요일 오전 10시 괜찮으신가요? 홍길동 드림."]
  ],
  prompts:[
    ["KO","고객사에 일정 지연을 알리는 이메일 구조를 잡아줘. 원인-영향-대응-요청 순서로, 방어적이지 않은 톤으로."],
    ["EN","Rewrite this sentence to sound less defensive: ‘The delay is because your old sensors are bad.’"]
  ],
  memo:["AI 초안이 사과를 3번 반복 → 1회로 축소, 대신 해결책 강조","‘guarantee’ 표현 삭제 (확약 불가 사항)","고객 요청사항은 구체적 숫자(2일)로 명시"],
  qs:[
    {q:"Why are we only hearing about this now?",
     a:[["I completely understand your frustration, and I'm sorry we didn't flag this earlier.","답답하신 마음 충분히 이해하고, 더 일찍 알려드리지 못해 죄송합니다."],
        ["The issue only became clear during full-scale testing last week, when we connected all production lines for the first time.","지난주 전 라인을 처음 연결한 전체 테스트에서야 문제가 분명해졌습니다."],
        ["Once we confirmed the cause, we wanted to come to you with a clear plan, not just a problem.","원인을 확인한 뒤, 문제만이 아니라 명확한 계획과 함께 말씀드리고 싶었습니다."],
        ["Going forward, we'll share a short status update every week, including any risks we're watching, so there are no surprises.","앞으로는 주시 중인 리스크를 포함해 매주 간단한 현황을 공유해 갑작스러운 일이 없게 하겠습니다."]]},
    {q:"Can you guarantee the new date of July 21?",
     a:[["I'd like to be honest with you.","솔직하게 말씀드리겠습니다."],
        ["I can't give a hundred percent guarantee, because part of the schedule depends on how quickly we can fix the data from the older lines.","노후 라인 데이터를 얼마나 빨리 고치느냐에 일정 일부가 달려 있어 100% 보장은 어렵습니다."],
        ["But I'm confident in the date if we get two days of support from your engineers next week.","하지만 다음 주 엔지니어분들의 이틀 지원이 있으면 이 날짜는 자신 있습니다."],
        ["We've also built in a few days of buffer.","며칠의 여유 기간도 반영해 두었습니다."],
        ["If anything changes, you'll hear from me immediately, and I'll put the updated plan in writing.","변동이 생기면 즉시 연락드리고 수정 계획을 서면으로 드리겠습니다."]]},
    {q:"Can't you just add more people to keep the original deadline?",
     a:[["I see why that seems like a quick solution.","빠른 해결책처럼 보이는 이유는 이해합니다."],
        ["Unfortunately, the bottleneck isn't the number of people. It's understanding how the old sensors record data, and that knowledge sits with your engineers.","아쉽게도 병목은 인원이 아니라 노후 센서의 기록 방식을 이해하는 것이고, 그 지식은 귀사 엔지니어에게 있습니다."],
        ["Adding more people from our side wouldn't speed that up much, and it would increase the cost.","저희 인력을 늘려도 속도는 크게 안 나고 비용만 늘어납니다."],
        ["That's why I'd suggest the partial go-live instead, so you can start using the platform for lines 1 and 2 on June 30.","그래서 대신 부분 오픈을 제안드립니다. 6월 30일부터 1·2번 라인은 사용하실 수 있습니다."]]},
    {q:"What exactly do you need from our side?",
     a:[["Thank you for asking. We need two things.","물어봐 주셔서 감사합니다. 두 가지가 필요합니다."],
        ["First, two days of time from the engineers who know lines 3 to 5, ideally next Tuesday and Wednesday.","첫째, 3~5번 라인을 잘 아는 엔지니어의 이틀, 가능하면 다음 주 화·수요일입니다."],
        ["Second, access to the maintenance logs for those lines, so we can match missing data with equipment downtime.","둘째, 해당 라인 정비 로그 접근 권한입니다. 누락 데이터를 설비 중단 시간과 대조하려 합니다."],
        ["If you can confirm the names by Friday, I'll send a detailed agenda first thing Monday morning.","금요일까지 담당자를 확정해 주시면 월요일 아침 가장 먼저 상세 안건을 보내드리겠습니다."]]}
  ]
},
{
  id:"T4", short:"해외 시장 진출", sub:"데이터 비교 분석",
  persona:{name:"David",role:"Strategy Director",init:"D"},
  title:"Market Entry Recommendation",
  scenario:[
    ["SK AX plans to launch DocuMate, an AI service that automates document processing such as invoices and contracts, in Southeast Asia.","SK AX는 송장·계약서 등 문서 처리를 자동화하는 AI 서비스 DocuMate를 동남아에 출시하려 합니다."],
    ["Leadership wants to start with one country.","경영진은 한 국가부터 시작하길 원합니다."],
    ["Compare Vietnam and Indonesia using the data below, and write a one-page recommendation for the strategy team.","아래 데이터로 베트남과 인도네시아를 비교해 전략팀에 1페이지 추천안을 쓰세요."]
  ],
  reqs:["추천 국가 + 근거 3개","리스크와 대응","1년차 KPI","다음 단계"],
  table:{h:["Factor","Vietnam","Indonesia"],r:[
    ["Market size (2026 est.)","$120M","$310M"],["Annual growth","24%","15%"],
    ["Strong local competitors","1","4"],
    ["Data regulation","Moderate (local storage in some sectors)","Strict (all data stored in-country)"],
    ["Local partner","SK partner network available","None yet"]]},
  head:"To: Strategy Team · Recommendation: Launch DocuMate in Vietnam First",
  output:[
    ["I recommend launching DocuMate in Vietnam first, and considering Indonesia as a second-phase market.","DocuMate는 베트남에 먼저 출시하고, 인도네시아는 2단계 시장으로 검토할 것을 추천합니다."],
    ["First, Vietnam's market is smaller, at 120 million dollars, but it is growing faster, at 24 percent a year compared to 15 percent in Indonesia.","첫째, 베트남 시장은 1.2억 달러로 작지만 연 24% 성장으로 인도네시아(15%)보다 빠릅니다."],
    ["Second, competition is lower, with only one strong local player compared to four in Indonesia.","둘째, 강한 현지 경쟁사가 1곳으로 인도네시아(4곳)보다 경쟁이 약합니다."],
    ["Third, we already have access to SK's partner network in Vietnam, which can shorten our sales cycle.","셋째, 베트남에는 SK 파트너 네트워크가 있어 영업 기간을 줄일 수 있습니다."],
    ["The main risk is that some sectors in Vietnam require local data storage.","주요 리스크는 베트남 일부 업종의 데이터 현지 저장 의무입니다."],
    ["To manage this, we will start with sectors that have fewer restrictions, such as logistics and retail.","이를 위해 물류·유통처럼 규제가 적은 업종부터 시작하겠습니다."],
    ["Our first-year targets are 20 paying customers, a 70 percent retention rate, and one partnership with a local system integrator.","1년차 목표는 유료 고객 20곳, 유지율 70%, 현지 SI 파트너십 1건입니다."],
    ["As a next step, I suggest a three-month pilot with two Vietnamese partners before a full launch.","다음 단계로 본 출시 전 베트남 파트너 2곳과 3개월 파일럿을 제안합니다."]
  ],
  prompts:[
    ["KO","표의 다섯 가지 요인으로 베트남과 인도네시아를 1~5점 가중치 평가해줘. 가중치 근거도 같이."],
    ["KO","내 추천(베트남)에 대해 반대 측 논리를 3개 만들어줘. 미팅 대비용이야."],
    ["EN","Suggest three measurable first-year KPIs for a B2B SaaS launch in a new market."]
  ],
  memo:["AI 첫 답변은 시장 규모만 보고 인도네시아 추천 → 성장률·경쟁·규제·파트너까지 재평가","반대 논리 생성 기능으로 미팅 예상 질문 준비","KPI 수치는 내 가정 (시나리오에 없음) → 미팅에서 ‘target’으로 표현"],
  qs:[
    {q:"Indonesia's market is more than twice as big. Why would we start with Vietnam?",
     a:[["You're right, Indonesia is the bigger market today.","맞습니다, 현재는 인도네시아가 더 큰 시장입니다."],
        ["But I'd say size alone doesn't make it the best place to start.","하지만 규모만으로 최적의 시작점이 되는 건 아니라고 봅니다."],
        ["Vietnam is growing faster, at 24 percent a year, and has only one strong competitor, compared to four in Indonesia.","베트남은 연 24%로 더 빨리 성장하고, 강한 경쟁사도 1곳뿐입니다(인도네시아 4곳)."],
        ["We also have SK's partner network there, which means we can win our first customers faster.","SK 파트너 네트워크도 있어 첫 고객을 더 빨리 확보할 수 있습니다."],
        ["Once we've proven the model in Vietnam, we can enter Indonesia with real case studies and a stronger position.","베트남에서 모델을 검증하면 실제 사례를 갖고 더 유리하게 인도네시아에 진입할 수 있습니다."]]},
    {q:"How would you measure success in the first year?",
     a:[["I'd look at three numbers.","세 가지 숫자를 보겠습니다."],
        ["First, 20 paying customers, to show there is real demand.","첫째, 실제 수요를 보여 줄 유료 고객 20곳."],
        ["Second, a retention rate of at least 70 percent, to show that customers keep using the product.","둘째, 고객이 계속 쓴다는 걸 보여 줄 유지율 70% 이상."],
        ["And third, at least one partnership with a local system integrator, to support our growth.","셋째, 성장을 뒷받침할 현지 SI 파트너십 최소 1건."],
        ["If we hit these targets, I'd say we're ready to discuss the Indonesia launch.","이 목표를 달성하면 인도네시아 출시를 논의할 준비가 됐다고 봅니다."]]},
    {q:"What would make you change your recommendation?",
     a:[["Good question.","좋은 질문입니다."],
        ["If Indonesia relaxed its data storage rules, or if we found a strong local partner there, the picture would change.","인도네시아가 데이터 저장 규제를 완화하거나 강한 현지 파트너를 찾으면 판단이 달라집니다."],
        ["Also, if our pilot in Vietnam showed low retention, we would need to rethink the product before expanding anywhere.","또 베트남 파일럿 유지율이 낮다면, 확장 전에 제품부터 재검토해야 합니다."],
        ["So I'd suggest we review this decision after the three-month pilot, based on actual data.","그래서 3개월 파일럿 후 실제 데이터로 이 결정을 재검토하길 제안합니다."]]},
    {q:"How did you use the AI agent for this task, and how did you check its output?",
     a:[["I used the AI agent mainly for two things: structuring the comparison and checking my writing.","AI는 주로 비교 구조화와 글 검토, 두 가지에 썼습니다."],
        ["First, I asked it to organize the data into a comparison table, which saved me time.","먼저 데이터를 비교표로 정리하게 해 시간을 아꼈습니다."],
        ["However, it suggested Indonesia at first, because it focused only on market size.","하지만 처음엔 시장 규모만 보고 인도네시아를 추천했습니다."],
        ["So I checked its reasoning against the other factors, like competition and regulation, and made my own decision.","그래서 경쟁·규제 등 다른 요인으로 논리를 검증해 제가 직접 결정했습니다."],
        ["I also made sure that every number in my report came directly from the scenario, not from the AI.","보고서의 모든 숫자는 AI가 아니라 시나리오에서 직접 가져왔는지도 확인했습니다."]]}
  ]
},
{
  id:"T5", short:"AI 업무 자동화 제안", sub:"내부 설득·우려 대응",
  persona:{name:"Clair",role:"Team Lead",init:"C"},
  title:"AI Agent Automation Proposal",
  scenario:[
    ["Your team spends about 12 hours every week creating a weekly sales report by copying data from three systems into slides.","팀은 세 시스템의 데이터를 슬라이드로 옮기며 주간 매출 보고서에 매주 약 12시간을 씁니다."],
    ["Your team lead asked you to propose how an AI agent could automate this work.","팀장이 AI 에이전트로 이 일을 자동화하는 방안을 제안하라고 했습니다."],
    ["Some team members are worried about data security and about losing their roles.","일부 팀원은 데이터 보안과 역할 상실을 걱정합니다."],
    ["Write a short proposal email that includes the expected benefits, a pilot plan, and how you will address these concerns.","기대 효과, 파일럿 계획, 우려 대응 방안을 포함한 짧은 제안 이메일을 쓰세요."]
  ],
  reqs:["기대 효과 (숫자)","파일럿 계획 (기간·범위·측정지표)","보안 우려 대응","직무 우려 대응"],
  table:{h:["Item","Now","With AI agent (est.)"],r:[
    ["Weekly hours","12 h","~3 h (review only)"],["Data sources","3 systems, manual copy","Automatic pull"],["Error check","Manual","Agent draft + human approval"]]},
  head:"To: Clair · Subject: Proposal: Automating the Weekly Sales Report with an AI Agent",
  output:[
    ["Hi Clair, I'd like to propose a four-week pilot to automate our weekly sales report with an AI agent.","Clair님, AI 에이전트로 주간 매출 보고서를 자동화하는 4주 파일럿을 제안드립니다."],
    ["Right now, the team spends about 12 hours every week copying data from three systems into slides.","현재 팀은 세 시스템의 데이터를 슬라이드로 옮기는 데 매주 약 12시간을 씁니다."],
    ["With an AI agent, we could pull the data automatically and generate a first draft, cutting this time to around three hours.","AI 에이전트가 데이터를 자동으로 가져와 초안을 만들면 약 3시간으로 줄일 수 있습니다."],
    ["The time we save could go into analyzing the numbers and preparing insights for our clients.","절약한 시간은 숫자 분석과 고객용 인사이트 준비에 쓸 수 있습니다."],
    ["To address security concerns, the agent would run only within our internal environment, and no customer data would be sent outside.","보안 우려에 대해서는, 에이전트를 내부 환경에서만 운영하고 고객 데이터는 외부로 보내지 않겠습니다."],
    ["To address concerns about roles, team members would review and approve every report, so the final decision stays with people.","역할 우려에 대해서는, 팀원이 모든 보고서를 검토·승인해 최종 결정은 사람이 합니다."],
    ["For the pilot, I suggest one region's report for four weeks, measuring time saved and error rate.","파일럿은 한 지역 보고서로 4주간, 절감 시간과 오류율을 측정하겠습니다."],
    ["Could I have 15 minutes at our next team meeting to walk everyone through the plan? Best regards, Gildong.","다음 팀 회의에서 15분 정도 계획을 설명할 수 있을까요? 길동 드림."]
  ],
  prompts:[
    ["KO","주간 보고서 자동화 파일럿 계획을 기간·범위·성공지표·중단기준으로 나눠서 짜줘."],
    ["KO","AI 도입에 대한 팀원 우려(일자리, 보안)에 공감하면서 설득하는 문장을 영어로 3개 써줘."]
  ],
  memo:["AI가 ‘90% 절감’ 제시 → 근거 없음, 시나리오 기준 12h→3h(75%)로 보수적 수정","우려 2가지를 각각 별도 문장으로 대응 (요구사항 체크)","파일럿 중단 기준(절감 50% 미만) 추가"],
  qs:[
    {q:"Some team members are worried that AI will replace their jobs. How would you address that?",
     a:[["I think that's a very natural concern, and we should take it seriously.","매우 자연스러운 우려이고, 진지하게 다뤄야 한다고 생각합니다."],
        ["The goal of this project isn't to replace people. It's to remove the repetitive copy-and-paste work.","이 프로젝트의 목적은 사람을 대체하는 게 아니라 반복적인 복사·붙여넣기 작업을 없애는 것입니다."],
        ["Every report will still be reviewed and approved by a team member.","모든 보고서는 여전히 팀원이 검토하고 승인합니다."],
        ["And the nine hours we save each week can go into analysis and client work, which is where our team adds the most value.","매주 아낀 9시간은 우리 팀이 가장 가치를 내는 분석과 고객 업무에 쓸 수 있습니다."],
        ["I'd also suggest involving a few team members in designing the pilot, so they feel ownership of the change.","파일럿 설계에 팀원 몇 명을 참여시켜 변화에 주인의식을 갖게 하자고도 제안합니다."]]},
    {q:"How can we be sure that confidential data won't leak?",
     a:[["That's an essential point.","정말 중요한 부분입니다."],
        ["First, the agent will run only inside our internal environment, so no data leaves the company.","첫째, 에이전트는 내부 환경에서만 돌아가 데이터가 회사 밖으로 나가지 않습니다."],
        ["Second, it will only have read access to the three sales systems, nothing else.","둘째, 세 매출 시스템에 대한 읽기 권한만 갖습니다."],
        ["Third, we'll ask the security team to review the setup before the pilot starts.","셋째, 파일럿 시작 전에 보안팀 검토를 받겠습니다."],
        ["I'd be happy to put these rules in writing so everyone is clear about what the agent can and can't do.","에이전트가 할 수 있는 일과 없는 일을 모두가 알도록 이 규칙을 문서로 정리하겠습니다."]]},
    {q:"What results can we realistically expect from the pilot?",
     a:[["Based on the current process, I'd say we can reduce the reporting time from about 12 hours to around three hours a week.","현재 프로세스 기준으로 주 12시간에서 약 3시간으로 줄일 수 있다고 봅니다."],
        ["But I don't want to over-promise, so the pilot is designed to test that number.","하지만 과하게 약속하고 싶진 않아서, 파일럿으로 그 수치를 검증하려는 것입니다."],
        ["We'll measure two things: the hours saved and the number of errors compared to the manual report.","절감 시간과 수작업 대비 오류 수, 두 가지를 측정하겠습니다."],
        ["If we save less than half the time, we'll review whether the tool is worth expanding.","절감이 절반 미만이면 확대할 가치가 있는지 재검토하겠습니다."]]},
    {q:"Before we wrap up, do you have anything you'd like to ask me?",
     a:[["Yes, thank you.","네, 감사합니다."],
        ["Could you share what success would look like from your point of view?","팀장님 관점에서 성공이 어떤 모습인지 말씀해 주실 수 있을까요?"],
        ["And are there any stakeholders outside our team I should speak to before the pilot, such as the security or IT team?","그리고 파일럿 전에 보안팀이나 IT팀처럼 팀 밖에서 이야기해야 할 이해관계자가 있을까요?"],
        ["That would help me make sure the plan works for everyone.","그래야 모두에게 맞는 계획인지 확인할 수 있을 것 같습니다."]]}
  ]
}
];

const TEMPLATES = [
 {cat:"미팅 시작", items:[
  ["Thank you for having me. I'm happy to walk you through my proposal.","시간 내주셔서 감사합니다. 제 제안을 설명드리겠습니다."],
  ["Let me start with the bottom line, and then I'll explain why.","결론부터 말씀드리고 이유를 설명드리겠습니다.","★"],
  ["We're short on time, so I'll be brief.","시간이 부족하니 간단히 말씀드리겠습니다."],
  ["Before I begin, could I check what you'd most like to hear about?","시작 전에 가장 궁금하신 부분을 확인해도 될까요?"],
  ["Thanks for making the time. I'll keep this to about five minutes.", "시간 내주셔서 감사합니다. 5분 정도로 짧게 하겠습니다."],
  ["I'd like to cover three things today: the options, my recommendation, and the next steps.", "오늘은 옵션, 제 추천안, 다음 단계 세 가지를 말씀드리겠습니다.","★"],
  ["Let me give you a quick overview first.", "먼저 간단히 개요를 말씀드리겠습니다."]]},
 {cat:"결론·추천", items:[
  ["My recommendation is to go with Vendor B.","제 추천은 Vendor B입니다.","★"],
  ["I'd say this is the best option for now.","제 생각엔 지금은 이게 최선입니다."],
  ["In short, it's the only option that meets both the budget and the timeline.","요약하면 예산과 일정을 모두 맞추는 유일한 옵션입니다.","★"],
  ["The key point is that launching on time matters more than a small gap in accuracy.","핵심은 작은 정확도 차이보다 제때 출시가 더 중요하다는 점입니다."],
  ["Based on the numbers, I'd lean toward a phased rollout.", "수치로 보면 저는 단계적 도입 쪽으로 기웁니다."],
  ["If I had to choose one, I'd go with Option A.", "하나만 고르라면 A안으로 가겠습니다."],
  ["On balance, the benefits clearly outweigh the risks.", "종합하면 이점이 리스크보다 분명히 큽니다."]]},
 {cat:"근거·데이터", items:[
  ["There are three reasons for this.","이유는 세 가지입니다.","★"],
  ["First, it's within budget. Second, it can launch in two months. Finally, it integrates easily with the client's system.","첫째 예산 내, 둘째 2개월 내 출시, 마지막으로 고객 시스템과 연동이 쉽습니다."],
  ["According to the data, Vietnam is growing at 24 percent a year.","데이터에 따르면 베트남은 연 24% 성장 중입니다.","★"],
  ["This is about thirty thousand dollars over budget.","이는 예산을 약 3만 달러 초과합니다."],
  ["Compared to Indonesia, Vietnam has far fewer competitors.","인도네시아에 비해 베트남은 경쟁사가 훨씬 적습니다."],
  ["This would cut the reporting time by about 75 percent.","보고 시간이 약 75% 줄어듭니다."],
  ["This is backed up by last quarter's results.", "이는 지난 분기 결과로 뒷받침됩니다."],
  ["To put that in perspective, that's roughly two months of support costs.", "감을 잡아보면, 그건 대략 두 달 치 지원 비용입니다."],
  ["The main reason is that most errors come from outdated documents.", "주된 이유는 대부분의 오류가 오래된 문서에서 나오기 때문입니다.","★"]]},
 {cat:"반대·압박 대응", items:[
  ["That's a fair question.","합리적인 질문입니다.","★"],
  ["I see your point, and I agree that accuracy matters.","말씀하신 점 이해하고, 정확도가 중요하다는 데 동의합니다."],
  ["I understand the concern. Let me explain how we'd handle that.","우려 이해합니다. 어떻게 대응할지 설명드리겠습니다.","★"],
  ["That's true, but if we look at the timeline, Vendor A would miss the holiday season.","맞습니다. 하지만 일정을 보면 A는 연말 시즌을 놓칩니다."],
  ["I'd respectfully disagree, and here's why.","조심스럽지만 생각이 다릅니다. 이유는 이렇습니다."],
  ["You're right that Indonesia is bigger today. However, size alone isn't the whole picture.","오늘 기준 인도네시아가 더 큰 건 맞습니다. 하지만 규모가 전부는 아닙니다."],
  ["That's a valid concern, and it's something we've already looked into.", "타당한 우려이고, 이미 검토해 본 부분입니다."],
  ["I can see why it might look that way. Let me add some context.", "그렇게 보일 수 있다는 거 이해합니다. 배경을 조금 덧붙이겠습니다."],
  ["I take your point, but I still think the risk is manageable.", "말씀 잘 알겠습니다. 그래도 리스크는 관리 가능하다고 봅니다.","★"],
  ["Let's look at it from the client's perspective.", "고객사 입장에서 한번 보겠습니다."]]},
 {cat:"리스크·대응", items:[
  ["The biggest risk is the vendor's limited track record.","가장 큰 리스크는 벤더의 짧은 업력입니다.","★"],
  ["To manage this risk, we'll add a performance clause to the contract.","이 리스크 관리를 위해 계약에 성과 조항을 넣겠습니다.","★"],
  ["If that happens, our backup plan is to switch to Vendor A next year.","그런 일이 생기면 대안은 내년에 A로 전환하는 것입니다."],
  ["We may have to adjust the timeline.","일정을 조정해야 할 수도 있습니다."],
  ["It's essential that we keep everyone informed.","모두에게 상황을 공유하는 것이 필수입니다."],
  ["One thing we need to watch out for is data quality.", "우리가 주의해야 할 한 가지는 데이터 품질입니다."],
  ["We can reduce that risk by testing with a small group first.", "먼저 소규모 그룹으로 테스트해서 그 리스크를 줄일 수 있습니다."],
  ["In the worst case, the launch would be delayed by about two weeks.", "최악의 경우 출시가 약 2주 늦어집니다."]]},
 {cat:"협상·대안 제시", items:[
  ["What if we started with a smaller pilot?","더 작은 파일럿으로 시작하면 어떨까요?","★"],
  ["Would you be open to a phased approach?","단계적 접근도 괜찮으실까요?","★"],
  ["How does a partial go-live on June 30 sound?","6월 30일 부분 오픈은 어떠세요?"],
  ["I'd be happy to put that in writing.","그 내용을 서면으로 정리해 드리겠습니다."],
  ["Let me give it some thought and get back to you by Friday.","생각해 보고 금요일까지 다시 말씀드리겠습니다."],
  ["Would it help if we split the work into two phases?", "작업을 두 단계로 나누면 도움이 될까요?"],
  ["Maybe we could meet halfway on the timeline.", "일정은 중간 지점에서 맞춰보면 어떨까요."],
  ["I'm afraid that's outside our current scope, but we could add it as a change request.", "죄송하지만 현재 범위 밖이라, 변경 요청으로 추가할 수는 있습니다."]]},
 {cat:"질문 확인·시간 벌기", items:[
  ["Could you clarify what you mean by success?","성공이 어떤 의미인지 좀 더 설명해 주시겠어요?"],
  ["If I understood correctly, you're asking whether we can keep the original deadline.","제가 제대로 이해했다면, 원래 마감을 지킬 수 있는지 물으신 거죠.","★"],
  ["Sorry, could you repeat the last part of your question?","죄송하지만 질문 마지막 부분을 다시 말씀해 주시겠어요?"],
  ["That's a good question. Let me think about that for a moment.","좋은 질문입니다. 잠시 생각해 보겠습니다.","★"],
  ["I'm not one hundred percent sure, but my best estimate is about three weeks.","100% 확신은 없지만 제 최선의 추정은 약 3주입니다."],
  ["I would have to check the details and get back to you on that.","세부 내용 확인 후 다시 말씀드려야 할 것 같습니다.","★"],
  ["Just to make sure we're on the same page, are you mainly concerned about cost?", "같은 이해인지 확인하고 싶은데, 주로 비용이 걱정되시는 거죠?"],
  ["So what you're saying is that the deadline can't move. Is that right?", "그러니까 마감은 못 바꾼다는 말씀이시죠, 맞나요?"],
  ["Do you mean the total cost or just the first year?", "총비용을 말씀하시는 건가요, 첫해 비용만인가요?"]]},
 {cat:"진행 상황 공유", items:[
  ["Could you update us on the project?","프로젝트 진행 상황을 알려주시겠어요?"],
  ["How's the integration coming along?","연동 작업은 어떻게 진행되고 있나요?"],
  ["We're still in the process of cleaning the data.","아직 데이터 정제 중입니다.","★"],
  ["I haven't heard back from the client yet.","고객사에서 아직 회신을 못 받았습니다."],
  ["Did you get a chance to review the proposal?","제안서 검토해 보셨나요?"],
  ["Does Wednesday at 10 a.m. work for you?","수요일 오전 10시 괜찮으세요?"],
  ["We're on track to finish testing by Friday.", "금요일까지 테스트를 마칠 수 있게 순조롭게 진행 중입니다.","★"],
  ["We're slightly behind schedule because of a delay on the client side.", "고객사 쪽 지연 때문에 일정이 약간 밀렸습니다."],
  ["The first version is about 80 percent complete.", "첫 버전은 약 80% 완료됐습니다."]]},
 {cat:"마무리·다음 단계", items:[
  ["To sum up, I recommend Vendor B, with a weekly review of chatbot performance.","정리하면, 챗봇 성과를 매주 검토하는 조건으로 Vendor B를 추천합니다.","★"],
  ["As a next step, I'll set up a call with the vendor this week.","다음 단계로 이번 주 벤더와 통화를 잡겠습니다.","★"],
  ["Going forward, I'll share a short update every Monday.","앞으로 매주 월요일 간단히 업데이트하겠습니다."],
  ["Do you have anything to add?","덧붙이실 말씀 있으세요?"],
  ["Thank you for your time. I look forward to your feedback.","시간 내주셔서 감사합니다. 피드백 기다리겠습니다."],
  ["Let me quickly recap what we've agreed on.", "합의한 내용을 빠르게 정리하겠습니다."],
  ["I'll send a summary email right after this meeting.", "회의 끝나고 바로 요약 메일 보내드리겠습니다."],
  ["Who should I follow up with on the budget?", "예산 건은 누구와 후속 논의하면 될까요?"]]},
 {cat:"의견 묻기·참여 유도", items:[
  ["I'd really value your input on this.", "이 부분은 의견을 꼭 듣고 싶습니다."],
  ["How do you see it from the client's side?", "고객사 입장에서는 어떻게 보세요?"],
  ["Does that make sense so far?", "여기까지 이해되셨나요?"],
  ["Is there anything I've missed?", "제가 놓친 부분이 있을까요?","★"],
  ["What would you need to see to feel comfortable with this?", "이 안에 확신을 가지시려면 무엇이 필요할까요?"]]},
 {cat:"동의·부분 동의", items:[
  ["I couldn't agree more.", "전적으로 동의합니다."],
  ["That's a good point. I hadn't thought of it that way.", "좋은 지적입니다. 그렇게는 생각 못 했네요."],
  ["I agree up to a point, but we also need to consider the cost.", "어느 정도는 동의하지만, 비용도 고려해야 합니다.","★"],
  ["I see where you're coming from.", "어떤 취지인지 이해합니다."],
  ["That makes sense to me.", "저도 납득이 됩니다."]]},
 {cat:"추이·숫자 설명", items:[
  ["Sales rose sharply in the second quarter.", "2분기에 매출이 급격히 올랐습니다."],
  ["The error rate dropped from 12 percent to 4 percent.", "오류율이 12%에서 4%로 떨어졌습니다.","★"],
  ["Costs have stayed flat over the past six months.", "지난 6개월간 비용은 제자리였습니다."],
  ["That's roughly double what we spent last year.", "작년 지출의 대략 두 배입니다."],
  ["Complaints peaked in March and have been declining since.", "불만은 3월에 정점을 찍고 이후 줄고 있습니다."],
  ["Nearly two-thirds of the tickets were about password resets.", "티켓의 거의 3분의 2가 비밀번호 재설정 건이었습니다."]]},
 {cat:"우선순위·트레이드오프", items:[
  ["Our top priority should be data security.", "최우선은 데이터 보안이어야 합니다."],
  ["If we have to choose, I'd prioritize speed over extra features.", "골라야 한다면 추가 기능보다 속도를 우선하겠습니다.","★"],
  ["The trade-off is a slightly higher cost in exchange for a faster launch.", "대가는 비용이 약간 늘어나는 대신 출시가 빨라진다는 점입니다."],
  ["Let's focus on the quick wins first.", "빠르게 성과 낼 수 있는 것부터 집중하죠."],
  ["This can wait until phase two.", "이건 2단계로 미뤄도 됩니다."]]},
 {cat:"문제 인정·사과", items:[
  ["You're right. That was our mistake, and I apologize.", "맞습니다. 저희 실수였고 사과드립니다."],
  ["I take full responsibility for the delay.", "지연에 대한 책임은 전적으로 제게 있습니다."],
  ["Here's what we're doing to make sure it doesn't happen again.", "재발하지 않도록 이렇게 조치하고 있습니다.","★"],
  ["Thank you for bringing this to our attention.", "알려주셔서 감사합니다."]]},
 {cat:"정중한 요청", items:[
  ["Would you mind sharing the latest data?", "최신 데이터를 공유해 주실 수 있을까요?","★"],
  ["Could I ask you to review this by Wednesday?", "수요일까지 검토 부탁드려도 될까요?"],
  ["It would be great if we could get the client's approval this week.", "이번 주에 고객사 승인을 받을 수 있으면 좋겠습니다."],
  ["I was wondering if we could extend the deadline by a few days.", "마감을 며칠 연장할 수 있을지 여쭤봐도 될까요."]]},
 {cat:"이메일 필수 문장 (Task Output)", items:[
  ["I'm writing to update you on the project schedule.","프로젝트 일정 관련 업데이트드리고자 메일 드립니다.","★"],
  ["I'd like to propose a four-week pilot.","4주 파일럿을 제안드리고자 합니다."],
  ["Please find the details below.","자세한 내용은 아래와 같습니다.","★"],
  ["I apologize for any inconvenience this may cause.","불편을 드려 죄송합니다."],
  ["Please let me know if you have any questions.","궁금한 점 있으면 말씀 주세요.","★"],
  ["I look forward to hearing from you.","회신 기다리겠습니다."],
  ["Thank you for your quick reply.", "빠른 회신 감사합니다."],
  ["As discussed in today's meeting, I've summarized the key points below.", "오늘 회의에서 논의한 대로 핵심 내용을 아래에 정리했습니다."],
  ["I've attached the revised proposal for your review.", "검토하실 수 있도록 수정 제안서를 첨부했습니다."],
  ["Could you confirm by Thursday?", "목요일까지 확인 부탁드려도 될까요?"],
  ["Please let me know if there's anything else I can do.", "제가 더 도와드릴 일이 있으면 말씀해 주세요."]]}
];

const PATTERNS = [
 {p:"Thank you for taking the time ~",m:"시간 내주셔서 감사합니다 (미팅·발표 시작)",ex:[["Thank you for taking the time out of your busy schedule.", "바쁘신 와중에 시간 내주셔서 감사합니다."], ["Thank you for taking the time to meet with us today.", "오늘 저희와 만나는 시간 내주셔서 감사합니다."], ["Thanks for taking the time to review the proposal.", "제안서 검토에 시간 내주셔서 감사합니다."]]},
 {p:"For those of you who ~",m:"~하신 분들을 위해 말씀드리면",ex:[["For those of you who don't know me, I'm Gildong Hong from the AI/Data team.", "저를 잘 모르시는 분들을 위해 말씀드리면, AI/Data팀 홍길동입니다."], ["For those of you who weren't at the last meeting, here's a quick summary.", "지난 회의에 안 계셨던 분들을 위해 간단히 요약해 드리겠습니다."]]},
 {p:"(It's) a pleasure to ~",m:"~하게 되어 기쁩니다",ex:[["It's a pleasure to be here.", "이 자리에 함께하게 되어 기쁩니다."], ["It's a pleasure to finally meet you in person.", "드디어 직접 뵙게 되어 기쁩니다."], ["It was a pleasure working with you on this project.", "이 프로젝트를 함께해서 즐거웠습니다."]]},
 {p:"But enough about me.",m:"제 이야기는 이쯤 하고요 (본론 전환)",ex:[["But enough about me. Let's talk about your project.", "제 이야기는 이쯤 하고, 프로젝트 얘기를 해보죠."], ["But enough about me. Let's get started.", "제 소개는 이쯤 하고 시작하겠습니다."]]},
 {p:"My presentation is on ~",m:"제 발표 주제는 ~입니다",ex:[["My presentation is on the results of our chatbot pilot.", "제 발표 주제는 챗봇 파일럿 결과입니다."], ["Today, I'd like to talk about our cloud migration plan.", "오늘은 클라우드 전환 계획에 대해 말씀드리겠습니다."]],note:"on + 주제. Today, I'd like to talk about ~도 같은 용도"},
 {p:"Let me walk you through ~",m:"~을 차근차근 설명드리겠습니다",ex:[["Let me walk you through it.", "차근차근 설명드리겠습니다."], ["Let me walk you through the main findings.", "주요 결과를 하나씩 설명드리겠습니다."], ["Could you walk me through the timeline?", "일정을 차근차근 설명해 주시겠어요?"]]},
 {p:"Did you get a chance to + 동사?",m:"~할 기회가 있었나요? (진행 확인)",ex:[["Did you get a chance to send the files?","파일 보내실 시간 있으셨나요?"],["Did you get a chance to review it?","검토해 보셨나요?"]]},
 {p:"Could you update us on ~?",m:"~ 진행 상황을 알려주시겠어요?",ex:[["Could you update us on the project?","프로젝트 진행 상황을 알려주시겠어요?"],["Do you have any updates on the negotiation?","협상 관련 새 소식 있나요?"],["Any updates on the research?","조사 진행 상황에 변동 있나요?"],["Could you update us on the timeline?","일정 변경 사항을 공유해 주시겠어요?"]]},
 {p:"Could you clarify ~?",m:"명확히 설명해 주시겠어요?",ex:[["Could you clarify that?","그 부분 좀 더 설명해 주시겠어요?"],["I'm not sure I fully understand your question. Could you clarify a little?","질문을 완전히 이해했는지 모르겠는데, 조금 더 설명해 주시겠어요?"],["Could you clarify the last part of your question?","질문의 마지막 부분을 설명해 주시겠어요?"],["I'm sorry. Let me clarify.","죄송합니다. 명확히 말씀드릴게요."]]},
 {p:"What are your thoughts on ~?",m:"~에 대해 어떻게 생각하세요?",ex:[["What are your thoughts on our plan?","저희 계획 어떻게 생각하세요?"],["Do you have any thoughts?","의견 있으신가요?"],["Any thoughts on this idea?","이 아이디어에 의견 있으신가요?"],["Any questions or thoughts?","질문이나 의견 있으신가요?"]]},
 {p:"be in the process of -ing",m:"~하는 중이다",ex:[["We're still in the process of negotiating.","아직 협상 중입니다."],["We're in the process of developing a new chatbot.","새 챗봇을 개발하는 중입니다."],["We're in the process of testing the new system.", "새 시스템을 테스트하는 과정에 있습니다."]]},
 {p:"would have to + 동사",m:"~해야 할 것 같습니다 (정중)",ex:[["You would have to speak to him about that.","그 부분은 그분과 이야기하셔야 할 것 같습니다."],["I would have to get back to you on that.","확인 후 다시 말씀드려야 할 것 같습니다."]]},
 {p:"I'd say ~",m:"제 생각에는 ~ (부드러운 의견·추정)",ex:[["I would say about a week or two.","1~2주 정도일 것 같습니다."],["I'd say he's right.","그분 말이 맞는 것 같습니다."],["I'd say this is the best option.","이게 최선의 선택인 것 같습니다."],["I would say we need one more week.", "제 생각엔 일주일이 더 필요합니다."]]},
 {p:"be short on time",m:"시간이 부족하다",ex:[["We're short on time, so let's get started.","시간이 부족하니 시작하죠."],["We're short on time, so I'll be brief.","시간이 부족하니 간단히 말씀드리겠습니다."],["We're running a little short on time, so let's move on to our next item.","시간이 조금 부족하니 다음 안건으로 넘어가죠."]]},
 {p:"give ~ some thought",m:"~을 생각해 보다",ex:[["Have you given my offer some thought?","제 제안 생각해 보셨나요?"],["I'll give it some thought.","한번 생각해 보겠습니다."],["Give it some thought and get back to me.","생각해 보시고 다시 연락 주세요."]]},
 {p:"put / have ~ in writing",m:"서면으로 남기다",ex:[["It has to be in writing.","반드시 서면으로 남겨야 합니다."],["Put it in writing.","서면으로 작성해 주세요."],["Could you put that in writing?","서면으로 남겨주시겠어요?"]]},
 {p:"It's essential that ~ (동사원형)",m:"~하는 것이 필수적이다",ex:[["It's essential that we get this done by this week.","이번 주까지 끝내는 게 필수입니다."],["It's essential that we keep everyone informed.","모두에게 상황 공유가 필수입니다."],["It's essential that we test it before launch.", "출시 전에 반드시 테스트해야 합니다."]],note:"essential that 뒤 동사원형 (get, keep)"},
 {p:"may have to + 동사",m:"~해야 할지도 모른다",ex:[["We may have to call off the seminar.","세미나를 취소해야 할지도 모릅니다."],["We may have to call it off.","취소해야 할지도 모릅니다."],["We may have to delay the launch.", "출시를 미뤄야 할지도 모릅니다."]]},
 {p:"get back to + 사람",m:"~에게 다시 연락하다",ex:[["I'll get back to you on that.","확인 후 말씀드릴게요."],["Give it some thought and get back to me.","생각해 보시고 다시 연락 주세요."]]},
 {p:"Does [시간] work for you?",m:"그때 괜찮으세요? (가능 여부)",ex:[["Does Wednesday work for you?","수요일 괜찮으세요?"],["I don't think it works for me.","그때는 어려울 것 같아요."],["Does 3 p.m. work for you?","오후 3시 괜찮으세요?"],["Thursday works better for me.","저는 목요일이 더 좋아요."],["That works for me.","저는 그때 괜찮습니다."]]},
 {p:"How does ~ sound?",m:"~은 어떠세요? (제안 반응)",ex:[["How does Wednesday sound?","수요일은 어떠세요?"],["How does a quick call tomorrow sound?","내일 짧게 통화하는 건 어떠세요?"],["That sounds good to me.","저는 좋습니다."]],note:"work = 가능 여부, sound = 제안에 대한 반응"},
 {p:"first thing in the morning",m:"아침에 가장 먼저",ex:[["I'll send you the file first thing in the morning.","아침에 제일 먼저 파일 보내드릴게요."],["Let's discuss it first thing tomorrow morning.","내일 아침 가장 먼저 논의하죠."]]},
 {p:"hear from / hear back from",m:"연락·회신을 받다",ex:[["Have you heard from the client?","고객사에서 연락 왔나요?"],["Have you heard back from the client?","고객사 답변 왔나요?"],["I haven't heard back from them yet.","아직 회신 못 받았습니다."],["I'll let you know as soon as I hear back.","회신 받는 대로 알려드릴게요."]]},
 {p:"come along",m:"진행되다 / 함께 오다",ex:[["How's the project coming along?","프로젝트 어떻게 진행되고 있나요?"],["The new feature is coming along nicely.","신규 기능이 순조롭게 진행 중입니다."],["Would you like to come along?","같이 가시겠어요?"]]},
 {p:"Do you have anything to add?",m:"추가하실 말씀 있으세요?",ex:[["Do you have anything to add?","추가로 하실 말씀 있으세요?"],["Does anyone have anything to add before we wrap up?","마무리 전에 추가 의견 있으신 분?"],["Nothing to add from my side.","제 쪽에선 추가할 내용 없습니다."]]},
 {p:"I hate to ~ / Sorry to interrupt, but",m:"~하고 싶진 않지만",ex:[["I hate to interrupt, but we're running short on time.","말씀 중 죄송하지만 시간이 부족해지고 있습니다."],["I hate to bring this up, but we need to review the budget.","꺼내기 조심스럽지만 예산을 검토해야 합니다."],["Sorry to interrupt, but could I add one point?","말씀 중 죄송하지만 한 가지 덧붙여도 될까요?"]]},
 {p:"Going forward, ~",m:"앞으로는",ex:[["Going forward, we'll share weekly updates.","앞으로 매주 진행 상황을 공유하겠습니다."],["Going forward, let's document key decisions.","앞으로 주요 결정은 문서로 남깁시다."]]},
 {p:"I was wondering if ~",m:"~해 주실 수 있을까요? (가장 정중한 요청)",ex:[["I was wondering if you could send me the report.", "보고서를 보내주실 수 있을까 해서요."], ["I was wondering if we could move the meeting to Friday.", "회의를 금요일로 옮길 수 있을까 해서요."], ["I was wondering if you had a moment to talk.", "잠깐 얘기 나눌 시간 있으신가 해서요."]],note:"과거형이지만 현재 요청. Could you보다 한 단계 더 정중"},
 {p:"Would you mind + -ing?",m:"~해 주시겠어요?",ex:[["Would you mind sharing your screen?", "화면 공유해 주시겠어요?"], ["Would you mind sending that again?", "그거 다시 보내주시겠어요?"], ["Not at all. I'll send it now.", "물론이죠. 지금 보낼게요."]],note:"수락할 때는 Not at all (꺼리지 않는다)"},
 {p:"in terms of ~",m:"~ 측면에서",ex:[["In terms of cost, Option A is cheaper.", "비용 측면에서는 A안이 더 저렴합니다."], ["In terms of timing, Option B is safer.", "일정 측면에서는 B안이 더 안전합니다."], ["How does it compare in terms of quality?", "품질 면에서는 어떻게 비교되나요?"]]},
 {p:"The main reason is that ~",m:"주된 이유는 ~입니다",ex:[["The main reason is that it fits our budget.", "주된 이유는 예산에 맞기 때문입니다."], ["The main reason is that the client needs it before the holidays.", "주된 이유는 고객사가 연말 전에 필요로 하기 때문입니다."], ["Another reason is that the vendor already knows our system.", "또 다른 이유는 벤더가 이미 우리 시스템을 안다는 점입니다."]]},
 {p:"outweigh",m:"~보다 크다 (장단점 비교)",ex:[["The benefits outweigh the costs.", "이점이 비용보다 큽니다."], ["I think the risks outweigh the benefits at this stage.", "지금 단계에서는 리스크가 이점보다 크다고 봅니다."], ["On balance, the pros outweigh the cons.", "종합하면 장점이 단점보다 큽니다."]]},
 {p:"on track / behind / ahead of schedule",m:"순조롭다 / 밀렸다 / 앞서 있다",ex:[["We're on track to launch in May.", "5월 출시를 향해 순조롭게 가고 있습니다."], ["We're about a week behind schedule.", "일정보다 약 일주일 늦었습니다."], ["We're actually ahead of schedule.", "오히려 일정보다 앞서 있습니다."], ["What do we need to get back on track?", "다시 정상 궤도로 돌리려면 뭐가 필요할까요?"]]},
 {p:"on the same page",m:"같은 이해·생각이다",ex:[["Just to make sure we're on the same page, the deadline is June 30.", "같은 이해인지 확인하자면, 마감은 6월 30일입니다."], ["I think we're all on the same page now.", "이제 모두 같은 생각인 것 같네요."], ["Let's get on the same page before we talk to the client.", "고객사와 얘기하기 전에 우리 생각부터 맞추죠."]]},
 {p:"I see where you're coming from, but ~",m:"취지는 이해하지만 ~ (부드러운 반대)",ex:[["I see where you're coming from, but the data tells a different story.", "취지는 이해하지만 데이터는 다르게 말하고 있습니다."], ["I see where you're coming from, but we can't afford to wait.", "무슨 말씀인지 알지만 기다릴 여유가 없습니다."]]},
 {p:"It depends on ~",m:"~에 달려 있다",ex:[["It depends on how much data we have.", "데이터가 얼마나 있느냐에 달려 있습니다."], ["That depends on the client's budget.", "그건 고객사 예산에 달려 있습니다."], ["It depends. Could you tell me a bit more about the use case?", "경우에 따라 다릅니다. 활용 사례를 조금 더 알려주시겠어요?"]]},
 {p:"As far as I know, ~",m:"제가 알기로는",ex:[["As far as I know, the budget hasn't changed.", "제가 알기로는 예산은 변동이 없습니다."], ["Not as far as I know.", "제가 알기로는 아닙니다."], ["As far as I know, the client is happy with the pilot.", "제가 알기로는 고객사가 파일럿에 만족하고 있습니다."]]},
 {p:"follow up on / with",m:"후속 조치하다 / 다시 연락하다",ex:[["I'm following up on my email from last week.", "지난주 보낸 메일 관련해서 다시 연락드립니다."], ["I'll follow up with the client tomorrow.", "내일 고객사에 후속 연락하겠습니다."], ["Let's follow up on this at next week's meeting.", "이 건은 다음 주 회의에서 이어서 다루죠."]],note:"on + 일·건, with + 사람"},
 {p:"keep ~ in the loop / loop in",m:"계속 공유하다 / 대화에 포함시키다",ex:[["Please keep me in the loop.", "저한테도 계속 공유해 주세요."], ["I'll keep you in the loop.", "진행 상황 계속 공유드리겠습니다."], ["Could you loop in the design team?", "디자인팀도 포함시켜 주시겠어요?"]]},
 {p:"touch base",m:"잠깐 연락·확인하다",ex:[["Let's touch base next week.", "다음 주에 한번 확인하죠."], ["I just wanted to touch base about the timeline.", "일정 관련해서 잠깐 확인하고 싶었어요."]]},
 {p:"rather than ~",m:"~보다는 (대안 강조)",ex:[["I'd focus on retention rather than new users.", "신규 유저보다는 리텐션에 집중하겠습니다."], ["Rather than delaying the launch, let's reduce the scope.", "출시를 미루기보다는 범위를 줄이죠."]]},
 {p:"If we ~, we'll be able to ~",m:"~하면 ~할 수 있습니다 (이점 제시)",ex:[["If we launch in May, we'll be able to catch the holiday season.", "5월에 출시하면 연말 시즌을 잡을 수 있습니다."], ["If we fix the data first, we'll be able to raise accuracy without changing the model.", "데이터를 먼저 고치면 모델을 바꾸지 않고도 정확도를 올릴 수 있습니다."]]},
 {p:"come up with ~",m:"(해결책·아이디어를) 생각해 내다",ex:[["We need to come up with a solution.", "해결책을 찾아내야 합니다."], ["We need to come up with a backup plan by Friday.", "금요일까지 대안을 마련해야 합니다."], ["Let's come up with a few options before the client meeting.", "고객 미팅 전에 몇 가지 옵션을 생각해 보죠."]]},
 {p:"iron out ~",m:"(문제·세부 사항을) 조율해 해결하다",ex:[["Let's iron out the details.", "세부 사항을 하나씩 조율해 보죠."], ["We still need to iron out a few issues with the vendor.", "벤더와 아직 몇 가지 문제를 조율해야 합니다."], ["Once we iron out the details, I'll send the final plan.", "세부 사항이 정리되면 최종안을 보내드리겠습니다."]]},
 {p:"The next item on the agenda is ~",m:"다음 안건은 ~입니다",ex:[["The next item on the agenda is the budget.", "다음 안건은 예산입니다."], ["Let's move on to the next item on the agenda.", "다음 안건으로 넘어가죠."], ["Is there anything else on the agenda?", "다른 안건 있으신가요?"]]},
 {p:"To wrap things up, ~",m:"정리하자면 / 마무리하자면",ex:[["To wrap things up, let me summarize the key points.", "마무리하며 핵심을 정리하겠습니다."], ["Let's wrap things up here.", "여기서 마무리하죠."], ["Before we wrap up, does anyone have anything to add?", "마치기 전에 덧붙이실 분 있으신가요?"]]},
 {p:"Do you have any questions?",m:"질문 있으신가요?",ex:[["Do you have any questions?", "질문 있으신가요?"], ["Are there any questions so far?", "여기까지 질문 있으신가요?"], ["If you have any questions, feel free to ask.", "질문 있으시면 편하게 물어보세요."]]}
];

const DIALOGUE = [
 ["Does Wednesday work for you?","수요일 괜찮으세요?","A"],
 ["I don't think it works for me. How does Thursday sound?","수요일은 어려울 것 같아요. 목요일은 어떠세요?","B"],
 ["That works for me. Did you get a chance to review the proposal?","좋습니다. 제안서는 검토해 보셨나요?","A"],
 ["Yes, but could you clarify the last part?","네, 그런데 마지막 부분을 좀 더 설명해 주시겠어요?","B"],
 ["Sure. What are your thoughts on the timeline?","물론이죠. 일정에 대해서는 어떻게 생각하세요?","A"],
 ["I'd say we may have to adjust it. Let me give that some thought and get back to you.","일정을 조정해야 할 수도 있겠어요. 검토 후 다시 말씀드릴게요.","B"],
 ["Great. Going forward, let's keep everyone informed.","좋습니다. 앞으로 모두에게 진행 상황을 공유합시다.","A"]
];


/* ---------- AX · 고객사 프로젝트(외주) 시나리오 — 모집분야별 ---------- */
TASKS.push(
{
  id:"T6", short:"범위 변경 요청 대응", sub:"SW Engineering · 고정가 계약", track:"SW Engineering",
  persona:{name:"Sarah",role:"Product Owner · NovaTel (Client)",init:"S"},
  brief:"Sarah, the client's product owner, wants the new feature in the current release without extra cost. Explain your change request and protect the launch.",
  title:"Scope Change Request on a Fixed-Price Project",
  scenario:[
    ["SK AX is building a new mobile self-service platform for NovaTel, a telecom client, under a fixed-price contract.","SK AX는 통신 고객사 NovaTel의 모바일 셀프서비스 플랫폼을 고정가 계약으로 구축 중입니다."],
    ["Launch is scheduled in ten weeks, and the platform must handle peak traffic from five million users.","출시는 10주 뒤이고, 500만 사용자의 피크 트래픽을 처리해야 합니다."],
    ["The client has now asked to add real-time push notifications to this release, at no extra cost and with no change to the launch date.","고객사가 이번 릴리스에 실시간 푸시 알림을 추가로 요청했으며, 추가 비용과 출시일 변경은 없길 원합니다."],
    ["Your team estimates the feature at six weeks of work. Write an email to the client's product owner explaining the impact and proposing options.","팀은 이 기능을 6주 작업으로 추정합니다. 고객사 PO에게 영향을 설명하고 대안을 제시하는 이메일을 쓰세요."]
  ],
  reqs:["범위 밖(out of scope)임을 정중하게 명시","비용·일정·품질 영향","대안 2~3개 + 추천","합의는 서면(change request)으로"],
  table:{h:["Option","Extra cost","Launch date","Risk"],r:[
    ["A · Add to current release","$120,000","+4 weeks","Load testing time cut in half"],
    ["B · Phase 2 (after launch)","$95,000","No change","Feature arrives 6 weeks later"],
    ["C · Swap with ‘dark mode’ (low priority, same effort)","$0","No change","Dark mode moves to phase 2"]]},
  head:"To: Sarah (NovaTel) · Subject: Push Notification Request – Impact and Options",
  output:[
    ["Hi Sarah, thank you for the request. Real-time push notifications would add clear value for your customers.","Sarah님, 요청 감사합니다. 실시간 푸시 알림은 고객에게 분명한 가치가 될 것입니다."],
    ["However, this feature is not part of the current contract scope, and our team estimates it at six weeks of work.","다만 이 기능은 현재 계약 범위에 포함되어 있지 않고, 팀 추정으로 6주 분량입니다."],
    ["If we add it to this release, the launch would move by four weeks and cost an extra one hundred twenty thousand dollars.","이번 릴리스에 넣으면 출시가 4주 밀리고 12만 달러가 추가됩니다."],
    ["More importantly, we would have to cut our load testing time in half, which is risky for a platform serving five million users.","더 중요한 것은 부하 테스트 기간을 절반으로 줄여야 해서, 500만 사용자 플랫폼에는 위험하다는 점입니다."],
    ["We see two better options.","더 나은 대안이 두 가지 있습니다."],
    ["Option B delivers push notifications in phase two, six weeks after launch, for ninety-five thousand dollars.","B안은 출시 6주 후 2단계로 푸시 알림을 제공하며 비용은 9만 5천 달러입니다."],
    ["Option C swaps it with dark mode, which has the same effort and lower priority, so there is no extra cost or delay.","C안은 작업량이 같고 우선순위가 낮은 다크모드와 교체해 추가 비용·지연이 없습니다."],
    ["I recommend Option C, as it protects both the launch date and the budget.","출시일과 예산을 모두 지키는 C안을 추천드립니다."],
    ["Once you decide, I'll prepare a formal change request so that both sides can sign off in writing.","결정해 주시면 양측이 서면으로 승인할 수 있도록 정식 변경요청서를 준비하겠습니다."],
    ["Does Thursday at 2 p.m. work for a short call? Best regards, Gildong.","목요일 오후 2시에 짧게 통화 가능하실까요? 길동 드림."]
  ],
  prompts:[
    ["KO","고정가 계약에서 범위 외 요청을 거절하지 않고 대안으로 협상하는 이메일 구조를 잡아줘."],
    ["KO","세 옵션을 고객 관점(비용·일정·리스크)에서 비교해주고, 고객이 가장 반발할 포인트를 알려줘."],
    ["EN","Make this paragraph sound firm but friendly: ‘This is not in the contract so we can't do it for free.’"]
  ],
  memo:["AI 초안이 ‘We cannot do this’로 시작 → 고객 관계 고려해 가치 인정 후 영향 설명으로 순서 변경","부하 테스트 축소 리스크를 핵심 근거로 추가 (500만 사용자 조건)","합의는 반드시 change request 서면화 — 외주 프로젝트 기본 원칙"],
  qs:[
    {q:"It's just one feature. Why can't you add it within the current contract?",
     a:[["I understand why it looks like a small addition.","작은 추가처럼 보이는 이유는 이해합니다."],
        ["But real-time push for five million users needs new servers, a messaging queue, and its own testing, which is about six weeks of work.","하지만 500만 사용자 실시간 푸시는 새 서버, 메시지 큐, 별도 테스트가 필요해 약 6주 분량입니다."],
        ["If we squeeze that into the current scope, the first thing we'd lose is load testing time, and that's the biggest risk for your launch.","현재 범위에 억지로 넣으면 가장 먼저 부하 테스트 시간이 줄어드는데, 그게 출시의 가장 큰 리스크입니다."],
        ["That's why I'd suggest swapping it with dark mode instead. You get push notifications on day one, with no extra cost and no delay.","그래서 다크모드와 교체하는 걸 제안드립니다. 추가 비용·지연 없이 첫날부터 푸시 알림을 쓰실 수 있습니다."]]},
    {q:"We're already paying a lot for this project. Can't SK AX absorb the cost as a partner?",
     a:[["I appreciate the partnership, and we want this launch to succeed as much as you do.","파트너십에 감사드리고, 저희도 성공적인 출시를 똑같이 원합니다."],
        ["If we absorb the cost without changing the scope, the real issue is still time, not money. The testing period would be cut.","범위 변경 없이 비용만 떠안아도 진짜 문제는 돈이 아니라 시간입니다. 테스트 기간이 줄어듭니다."],
        ["So I'd rather offer a solution that protects quality: the swap with dark mode costs nothing for both sides.","그래서 품질을 지키는 방안을 드리고 싶습니다. 다크모드 교체는 양측 모두 비용이 들지 않습니다."],
        ["If you'd still like both features, I can check with my manager whether we can offer a discount on phase two.","두 기능 모두 원하시면 2단계 비용 할인이 가능한지 매니저와 확인해 보겠습니다."]]},
    {q:"What if our CEO insists on having everything by the original launch date?",
     a:[["Then I'd want to be very transparent about the trade-off.","그렇다면 트레이드오프를 아주 투명하게 말씀드리고 싶습니다."],
        ["We could add more developers, but load testing can't be compressed safely, and a failure on launch day would hurt your brand much more than a later feature.","개발자를 늘릴 순 있지만 부하 테스트는 안전하게 줄일 수 없고, 출시 당일 장애는 기능이 늦는 것보다 브랜드에 훨씬 큰 타격입니다."],
        ["I'd be happy to join a meeting with your CEO and walk through the options with data.","CEO분과의 미팅에 참석해 데이터로 옵션을 설명드리겠습니다."],
        ["Whatever we decide, let's put it in writing so both teams are aligned.","어떤 결정이든 양 팀이 맞춰지도록 서면으로 남기시죠."]]},
    {q:"How will you prevent this kind of situation in the next phase?",
     a:[["Good question. I think we need a clearer change control process.","좋은 질문입니다. 더 명확한 변경 관리 절차가 필요하다고 봅니다."],
        ["Going forward, every new request will go through a short impact review covering cost, schedule, and quality, within three working days.","앞으로 모든 신규 요청은 3영업일 안에 비용·일정·품질 영향 검토를 거치도록 하겠습니다."],
        ["We'll also hold a joint backlog review every two weeks, so priorities are agreed before work starts.","2주마다 공동 백로그 리뷰를 해서 작업 전에 우선순위를 합의하겠습니다."],
        ["This way, there are no surprises on either side.","이렇게 하면 양측 모두 갑작스러운 일이 없습니다."]]}
  ]
},
{
  id:"T7", short:"협력사 지연·MES 오픈", sub:"Factory SW · 하도급 관리", track:"Factory SW Engineering",
  persona:{name:"Mr. Tan",role:"Plant IT Manager · Client Fab",init:"T"},
  brief:"Mr. Tan, the client's plant IT manager, is worried that the subcontractor delay will put the fab's production at risk.",
  title:"Subcontractor Delay in an MES Rollout",
  scenario:[
    ["SK AX is the prime contractor for a new MES rollout at a semiconductor client's overseas fab.","SK AX는 반도체 고객사 해외 팹의 신규 MES 구축 주사업자입니다."],
    ["A local subcontractor is building the equipment interface module that connects 120 machines to the MES.","현지 협력사가 장비 120대를 MES에 연결하는 장비 인터페이스 모듈을 개발 중입니다."],
    ["The module is two weeks late, and in the first test, 18 percent of machine signals were not received correctly.","모듈은 2주 지연됐고, 1차 테스트에서 장비 신호의 18%가 제대로 수신되지 않았습니다."],
    ["Cutover must happen during the fab's planned maintenance window in five weeks, and unplanned downtime costs about two hundred thousand dollars per hour.","전환은 5주 뒤 팹 정기보수 기간에 해야 하며, 비계획 정지는 시간당 약 20만 달러 손실입니다."],
    ["Write a recovery plan email to the client's plant IT manager.","고객사 공장 IT 매니저에게 회복 계획 이메일을 쓰세요."]
  ],
  reqs:["주사업자로서 책임 인정 (협력사 탓 X)","현황 숫자 + 원인","회복안 비교 → 추천","정지(downtime) 리스크 대응"],
  table:{h:["Option","Schedule","Cost to SK AX","Risk"],r:[
    ["A · Keep subcontractor + 3 SK AX engineers on site","Meets maintenance window","$60,000","Depends on vendor fixing defects"],
    ["B · Replace subcontractor","+6 weeks (misses window)","$150,000","Next window is 4 months later"],
    ["C · Phased cutover: 80 stable machines first, 40 later","Meets window for 80 machines","$40,000","Two systems run in parallel for 3 weeks"]]},
  head:"To: Mr. Tan · Subject: Equipment Interface Delay – Recovery Plan",
  output:[
    ["Dear Mr. Tan, I'm writing to update you on the equipment interface module and our recovery plan.","Tan님, 장비 인터페이스 모듈 현황과 회복 계획을 말씀드리고자 메일 드립니다."],
    ["The module from our subcontractor is two weeks behind schedule, and in the first test, 18 percent of machine signals were not received correctly.","협력사 모듈이 일정보다 2주 늦고, 1차 테스트에서 장비 신호의 18%가 정상 수신되지 않았습니다."],
    ["As the prime contractor, SK AX takes full responsibility for this delivery.","주사업자로서 SK AX가 이 납품에 전적인 책임을 집니다."],
    ["Our main goal is to protect the maintenance window in five weeks, because unplanned downtime would cost about two hundred thousand dollars per hour.","정지 손실이 시간당 약 20만 달러이므로, 5주 뒤 정기보수 기간을 지키는 것이 최우선입니다."],
    ["We recommend a phased cutover: we connect the 80 machines that are already stable during the maintenance window, and the remaining 40 three weeks later.","단계적 전환을 추천합니다. 이미 안정적인 80대는 정기보수 때 연결하고, 나머지 40대는 3주 후 연결합니다."],
    ["At the same time, we'll send three of our engineers to the site to fix the signal errors with the subcontractor.","동시에 저희 엔지니어 3명을 현장에 보내 협력사와 함께 신호 오류를 해결하겠습니다."],
    ["Replacing the subcontractor would add six weeks and miss the window, so we don't recommend it at this stage.","협력사 교체는 6주가 더 걸려 보수 기간을 놓치므로 현 단계에선 권하지 않습니다."],
    ["All additional costs will be covered by SK AX, and I'll share a daily status report until cutover.","추가 비용은 모두 SK AX가 부담하며, 전환까지 매일 현황을 공유하겠습니다."],
    ["Could we review this plan together on Monday morning? Best regards, Gildong Hong.","월요일 오전에 함께 검토할 수 있을까요? 홍길동 드림."]
  ],
  prompts:[
    ["KO","주사업자로서 협력사 지연을 고객에게 알릴 때 책임 회피처럼 보이지 않는 표현을 알려줘."],
    ["KO","세 옵션을 생산 정지 리스크 기준으로 비교해줘. 정지 손실 시간당 20만 달러 조건이야."],
    ["EN","Rewrite: ‘The delay is the subcontractor's fault, not ours.’ — make it professional and accountable."]
  ],
  memo:["AI 초안이 협력사 책임을 강조 → 고객 계약 상대는 SK AX이므로 ‘full responsibility’로 수정","판단 기준을 ‘정지 손실(시간당 20만 달러)’로 고정 → C안 선택","추가 비용 SK AX 부담 여부는 가정 — 미팅에서 ‘subject to internal approval’ 가능성 언급"],
  qs:[
    {q:"Why should we keep working with a subcontractor that is already late?",
     a:[["That's a fair concern.","타당한 우려입니다."],
        ["Replacing them now would add six weeks, which means we'd miss the maintenance window and wait four more months.","지금 교체하면 6주가 더 걸려 보수 기간을 놓치고 4개월을 더 기다려야 합니다."],
        ["So for this phase, keeping them, but with three of our engineers on site, is the fastest and safest path.","그래서 이번 단계는 유지하되 저희 엔지니어 3명을 현장에 두는 게 가장 빠르고 안전합니다."],
        ["We'll also set a clear checkpoint: if the signal error rate isn't below two percent in two weeks, we'll start the replacement process.","명확한 기준도 두겠습니다. 2주 안에 신호 오류율이 2% 아래로 안 떨어지면 교체 절차를 시작하겠습니다."]]},
    {q:"Who is accountable if something goes wrong: you or the subcontractor?",
     a:[["SK AX is accountable. Our contract is with you, so the responsibility is ours.","SK AX가 책임집니다. 계약 상대가 저희이니 책임도 저희에게 있습니다."],
        ["We manage the subcontractor directly, and any issue on their side is our issue to solve.","협력사는 저희가 직접 관리하고, 그쪽 문제는 저희가 해결할 문제입니다."],
        ["That's also why we're covering the extra cost and sending our own engineers.","그래서 추가 비용을 부담하고 저희 엔지니어를 보내는 것입니다."],
        ["You'll have one point of contact, which is me, for every update.","모든 업데이트의 단일 창구는 저입니다."]]},
    {q:"Running two systems in parallel sounds risky for our operators. How will you handle that?",
     a:[["You're right, parallel operation needs careful planning.","맞습니다, 병행 운영은 세심한 계획이 필요합니다."],
        ["First, we'll split the lines clearly, so each operator only uses one system during those three weeks.","첫째, 라인을 명확히 나눠 3주간 각 작업자는 한 시스템만 쓰게 하겠습니다."],
        ["Second, our engineers will be on every shift for the first week to support operators on the floor.","둘째, 첫 주는 모든 교대 근무에 저희 엔지니어가 상주해 현장을 지원합니다."],
        ["And we'll run a short training session for each shift before cutover.","그리고 전환 전 교대조별로 짧은 교육을 진행하겠습니다."]]}
  ]
},
{
  id:"T8", short:"RAG AI Agent PoC 결과", sub:"AI/Data · Go/No-Go 권고", track:"AI/Data Engineering",
  persona:{name:"Laura",role:"Head of Digital · Meridian Bank (Client)",init:"L"},
  brief:"Laura, the bank's head of digital, must decide whether to fund a full rollout. She is concerned about accuracy and regulatory risk.",
  title:"RAG AI Agent PoC: Go or No-Go?",
  scenario:[
    ["SK AX ran an eight-week proof of concept for Meridian Bank: a RAG-based AI agent that answers employees' questions about internal policies and products.","SK AX는 Meridian 은행을 위해 직원의 내부 규정·상품 질문에 답하는 RAG 기반 AI 에이전트 PoC를 8주간 진행했습니다."],
    ["The results are mixed. Answer accuracy reached 78 percent against a target of 85, but average search time for employees dropped from six minutes to forty seconds.","결과는 엇갈립니다. 정답률은 목표 85% 대비 78%였지만, 직원 평균 검색 시간은 6분에서 40초로 줄었습니다."],
    ["Most wrong answers came from outdated documents in the knowledge base.","오답 대부분은 지식베이스의 오래된 문서에서 나왔습니다."],
    ["Write a recommendation to the client on whether to move to a full rollout, and under what conditions.","전면 도입 여부와 조건에 대한 권고안을 고객사에 쓰세요."]
  ],
  reqs:["결론: Go / No-Go / 조건부 Go","PoC 수치 근거","정답률 미달 원인과 개선안","규제·리스크 통제(human-in-the-loop)","고객사 역할(데이터 정비)"],
  table:{h:["Metric","Target","PoC result"],r:[
    ["Answer accuracy","85%","78%"],["Avg. search time per question","< 2 min","40 sec (was 6 min)"],
    ["Answers citing a source document","100%","96%"],["Wrong answers caused by outdated documents","—","64% of errors"],
    ["Cost per 1,000 questions","< $15","$9"]]},
  head:"To: Laura (Meridian Bank) · Subject: PoC Results and Recommendation for the AI Policy Agent",
  output:[
    ["Dear Laura, I recommend a conditional go: a limited rollout to internal staff, not to customers, with three conditions.","Laura님, 조건부 진행을 권고드립니다. 고객이 아닌 내부 직원 대상의 제한적 도입이며, 세 가지 조건이 있습니다."],
    ["The PoC showed strong business value: the average time to find an answer dropped from six minutes to forty seconds, at nine dollars per thousand questions.","PoC는 큰 가치를 보였습니다. 답을 찾는 평균 시간이 6분에서 40초로 줄었고, 비용은 질문 1,000건당 9달러였습니다."],
    ["However, accuracy reached 78 percent, below the 85 percent target.","다만 정답률은 78%로 목표 85%에 못 미쳤습니다."],
    ["Our analysis shows that 64 percent of the errors came from outdated documents, not from the model itself.","분석 결과 오류의 64%는 모델이 아니라 오래된 문서 때문이었습니다."],
    ["First, we propose a four-week data clean-up with your policy team to remove or update old documents.","첫째, 귀사 규정팀과 4주간 데이터를 정비해 오래된 문서를 삭제·갱신할 것을 제안합니다."],
    ["Second, every answer will show its source document, so employees can verify it before acting.","둘째, 모든 답변에 출처 문서를 표시해 직원이 실행 전 검증할 수 있게 합니다."],
    ["Third, we'll start with one department and expand only when accuracy stays above 85 percent for four weeks.","셋째, 한 부서부터 시작해 정답률이 4주 연속 85%를 넘을 때만 확대합니다."],
    ["This approach captures the time savings now, while keeping regulatory risk under control.","이 방식으로 시간 절감 효과는 지금 얻고 규제 리스크는 통제할 수 있습니다."],
    ["I'd be happy to present the detailed results to your risk team next week. Best regards, Gildong Hong.","다음 주 리스크팀에 상세 결과를 발표드리겠습니다. 홍길동 드림."]
  ],
  prompts:[
    ["KO","PoC 결과표를 보고 Go/No-Go/조건부 Go 각각의 논리를 정리해줘. 금융권 규제 관점 포함."],
    ["KO","RAG 정답률이 낮을 때 원인 유형(데이터, 검색, 프롬프트, 모델)별 개선책을 짧게 알려줘."],
    ["EN","Explain RAG in two simple sentences for a non-technical bank executive."]
  ],
  memo:["AI가 ‘모델 교체’ 제안 → 데이터상 오류 64%가 문서 문제라 데이터 정비를 1순위로","‘고객 대상’ 아닌 ‘내부 직원 대상’으로 범위 축소 — 금융 규제 리스크 고려한 내 판단","확대 기준(4주 연속 85%)은 내 제안 기준임을 명시"],
  qs:[
    {q:"Seventy-eight percent is not good enough for a bank. Why should we move forward?",
     a:[["I agree that 78 percent is not good enough for customer-facing use. That's why I'm not recommending that.","고객 대상으로 78%는 부족하다는 데 동의합니다. 그래서 그걸 권하지 않는 것입니다."],
        ["For internal staff, the agent already saves more than five minutes per question, and every answer shows its source, so employees can check it.","내부 직원에게는 이미 질문당 5분 넘게 절약되고, 모든 답에 출처가 있어 직원이 확인할 수 있습니다."],
        ["And most errors come from outdated documents, which is a fixable data problem, not a model problem.","그리고 오류 대부분은 오래된 문서 때문이라, 모델이 아닌 고칠 수 있는 데이터 문제입니다."],
        ["So I'd say a limited rollout with a clear accuracy gate is the right balance.","그래서 명확한 정답률 기준을 둔 제한적 도입이 적절한 균형이라고 봅니다."]]},
    {q:"What happens if the agent gives a wrong answer about a regulation and an employee acts on it?",
     a:[["That's the most important risk, and we've designed for it.","가장 중요한 리스크이고, 대비해 설계했습니다."],
        ["First, the agent always shows the source document, and employees are trained to check it for any regulatory decision.","첫째, 항상 출처 문서를 보여 주고, 규제 관련 결정에는 이를 확인하도록 교육합니다."],
        ["Second, if the agent's confidence is low, it will say so and suggest contacting the compliance team.","둘째, 신뢰도가 낮으면 그렇다고 알리고 준법팀 문의를 안내합니다."],
        ["Third, we log every question and answer, so your risk team can audit them at any time.","셋째, 모든 질의응답을 기록해 리스크팀이 언제든 감사할 수 있습니다."]]},
    {q:"What do you need from our side to make this work?",
     a:[["Thank you for asking. The most important thing is your policy team's time.","감사합니다. 가장 중요한 건 규정팀의 시간입니다."],
        ["We need two people from the policy team for about four weeks to confirm which documents are current.","어떤 문서가 최신인지 확인해 줄 규정팀 2명이 약 4주간 필요합니다."],
        ["We'll also need a clear owner on your side to keep the knowledge base up to date after launch.","출시 후 지식베이스를 최신으로 유지할 귀사 측 담당자도 필요합니다."],
        ["Without that, accuracy will drop again over time, no matter how good the model is.","그게 없으면 모델이 아무리 좋아도 정답률은 다시 떨어집니다."]]},
    {q:"How will we measure the return on investment?",
     a:[["I'd track three numbers.","세 가지 숫자를 보겠습니다."],
        ["First, time saved: about five minutes per question, multiplied by the number of questions each month.","첫째, 절감 시간: 질문당 약 5분 × 월 질문 수."],
        ["Second, accuracy, measured every week on a fixed test set of real questions.","둘째, 실제 질문으로 만든 고정 테스트셋으로 매주 측정한 정답률."],
        ["And third, the operating cost, which is currently nine dollars per thousand questions.","셋째, 현재 1,000건당 9달러인 운영 비용."],
        ["I'll share these in a monthly report, so you can decide on expansion based on data.","월간 리포트로 공유해 데이터로 확대를 결정하실 수 있게 하겠습니다."]]}
  ]
},
{
  id:"T9", short:"클라우드 전환 제안", sub:"Cloud/Infra · MSP·SLA", track:"Cloud/Infra Engineering",
  persona:{name:"James",role:"CIO · Client Retailer",init:"J"},
  brief:"James, the client's CIO, is reviewing your migration proposal. He wants speed, but he cannot afford downtime during peak season.",
  title:"Legacy-to-Cloud Migration Proposal",
  scenario:[
    ["A retail client runs 40 legacy applications in its own data center, and the data center contract ends in six months.","유통 고객사는 자체 데이터센터에서 레거시 애플리케이션 40개를 운영 중이며, 데이터센터 계약이 6개월 뒤 끝납니다."],
    ["The holiday peak season starts in five months, and the client cannot accept any downtime during that period.","연말 성수기는 5개월 뒤 시작되며, 그 기간엔 어떤 장애도 허용되지 않습니다."],
    ["SK AX has been asked to propose a migration approach, and to operate the new environment as a managed service provider.","SK AX는 전환 방식을 제안하고, 새 환경을 MSP로 운영해 달라는 요청을 받았습니다."],
    ["Write a proposal email to the client's CIO.","고객사 CIO에게 제안 이메일을 쓰세요."]
  ],
  reqs:["전환 방식 추천 + 이유","성수기 무중단 전략","비용 관점 (단기 vs 장기)","운영 SLA"],
  table:{h:["Approach","Time","One-time cost","Yearly run cost","Notes"],r:[
    ["A · Lift-and-shift all 40 apps","4 months","$0.8M","$1.9M","Fast, little optimization"],
    ["B · Re-platform all 40 apps","9 months","$2.1M","$1.2M","Misses data center deadline"],
    ["C · Hybrid: lift-and-shift 30 now, re-platform 10 core apps after peak","5 months + 4 months","$1.3M","$1.4M","Core apps optimized next year"]]},
  head:"To: James · Subject: Cloud Migration Proposal and Managed Service Plan",
  output:[
    ["Dear James, I recommend a hybrid migration approach, which meets the data center deadline and protects the peak season.","James님, 데이터센터 기한을 맞추고 성수기를 보호하는 하이브리드 전환 방식을 추천드립니다."],
    ["In the first five months, we would move 30 applications as they are, so everything is out of the data center before the contract ends.","첫 5개월 동안 30개 애플리케이션을 그대로 옮겨, 계약 종료 전에 데이터센터를 모두 비웁니다."],
    ["The 10 core applications, such as ordering and payment, would be moved and re-platformed after the holiday season.","주문·결제 같은 핵심 10개는 연말 시즌 이후에 이전하며 리플랫폼합니다."],
    ["A full re-platform would take nine months and miss the deadline, and a simple lift-and-shift would leave the yearly run cost at 1.9 million dollars.","전체 리플랫폼은 9개월이 걸려 기한을 놓치고, 단순 이전은 연 운영비가 190만 달러로 남습니다."],
    ["The hybrid plan brings the run cost down to about 1.4 million dollars a year once the core apps are optimized.","하이브리드안은 핵심 앱 최적화 후 연 운영비를 약 140만 달러로 낮춥니다."],
    ["To protect the peak season, we will freeze all migration work for six weeks during the holidays.","성수기 보호를 위해 연말 6주간 모든 전환 작업을 동결합니다."],
    ["As your managed service provider, we will guarantee 99.9 percent availability, with 24-hour monitoring and service credits if we fall short.","MSP로서 99.9% 가용성을 보장하고, 24시간 모니터링과 미달 시 서비스 크레딧을 제공합니다."],
    ["I'd like to schedule a workshop with your team next week to confirm the application list. Best regards, Gildong Hong.","다음 주 귀사 팀과 워크숍을 열어 애플리케이션 목록을 확정하고 싶습니다. 홍길동 드림."]
  ],
  prompts:[
    ["KO","레거시 클라우드 전환 방식(리프트앤시프트, 리플랫폼, 하이브리드)의 장단점을 CIO 관점에서 정리해줘."],
    ["KO","3년 총비용(TCO)으로 A, B, C를 비교해줘. 표 숫자만 써."],
    ["EN","Explain 99.9 percent availability in hours of downtime per year, in one sentence."]
  ],
  memo:["AI에 3년 TCO 계산 요청 → A $6.5M / B $5.7M(기한 미충족) / C $5.5M 수준 — 직접 재계산해 확인","성수기 동결(freeze) 기간 6주는 내 가정","SLA 99.9% = 연 약 8.8시간 다운타임 — 미팅 대비 메모"],
  qs:[
    {q:"Why not just move everything at once and finish faster?",
     a:[["Moving everything as is would be faster, about four months.","전부 그대로 옮기면 약 4개월로 더 빠르긴 합니다."],
        ["But it would keep the yearly run cost at 1.9 million dollars, because the old architecture isn't optimized for the cloud.","하지만 기존 구조가 클라우드에 최적화되어 있지 않아 연 운영비가 190만 달러로 유지됩니다."],
        ["With the hybrid plan, we meet the same deadline, and we save about half a million dollars a year once the core apps are re-platformed.","하이브리드안은 같은 기한을 맞추면서, 핵심 앱 리플랫폼 후 연 약 50만 달러를 절감합니다."],
        ["Over three years, that's the lowest total cost of the three options.","3년 기준으로 세 옵션 중 총비용이 가장 낮습니다."]]},
    {q:"How can you guarantee there will be no downtime during the peak season?",
     a:[["We'll reduce the risk in three ways.","세 가지로 리스크를 줄이겠습니다."],
        ["First, the core ordering and payment systems won't be touched until after the holidays.","첫째, 핵심 주문·결제 시스템은 연말 이후까지 건드리지 않습니다."],
        ["Second, we'll freeze all migration work for six weeks during the peak.","둘째, 성수기 6주간 모든 전환 작업을 동결합니다."],
        ["Third, every migrated application will run in parallel with the old one for two weeks, so we can roll back immediately if needed.","셋째, 이전된 앱은 2주간 기존과 병행 운영해 필요하면 즉시 되돌릴 수 있습니다."],
        ["No one can promise zero risk, but this plan keeps your most critical systems out of the danger zone.","위험이 0이라고 약속할 순 없지만, 가장 중요한 시스템을 위험 구간 밖에 둡니다."]]},
    {q:"What happens if you don't meet the 99.9 percent SLA?",
     a:[["Then we compensate you with service credits, as defined in the contract.","그러면 계약에 정한 대로 서비스 크레딧으로 보상합니다."],
        ["For example, if availability falls below 99.9 percent in a month, a percentage of that month's fee is credited back.","예를 들어 월 가용성이 99.9% 미만이면 그 달 요금의 일정 비율을 돌려드립니다."],
        ["More importantly, we'll share a root cause report within five working days and a plan to prevent it from happening again.","더 중요하게는 5영업일 안에 원인 보고서와 재발 방지 계획을 공유합니다."],
        ["Our goal isn't to pay credits. It's to make sure they're never needed.","목표는 크레딧 지급이 아니라, 그럴 일이 없게 하는 것입니다."]]}
  ]
},
{
  id:"T10", short:"SAP 표준화 vs 커스터마이징", sub:"Solution Development · ERP", track:"Solution Development",
  persona:{name:"Elena",role:"CFO · Client Manufacturer",init:"E"},
  brief:"Elena, the client's CFO, sponsors the ERP project. Her finance team wants the new system to look like the old one.",
  title:"SAP S/4HANA: Fit-to-Standard or Customize?",
  scenario:[
    ["SK AX is implementing SAP S/4HANA for a mid-sized manufacturer, covering finance, accounting, and supply chain.","SK AX는 중견 제조사에 재무·회계·SCM을 포괄하는 SAP S/4HANA를 구축 중입니다."],
    ["The client's finance team has asked to rebuild 35 screens and reports exactly as they look in the old system.","고객사 재무팀은 기존 시스템의 화면·리포트 35개를 똑같이 재구현해 달라고 요청했습니다."],
    ["This customization would add four months and about nine hundred thousand dollars, and would make future SAP upgrades harder.","이 커스터마이징은 4개월과 약 90만 달러가 추가되고, 향후 SAP 업그레이드를 어렵게 만듭니다."],
    ["Write a recommendation to the client's CFO.","고객사 CFO에게 권고안을 쓰세요."]
  ],
  reqs:["추천안 (fit-to-standard + 최소 확장)","비용·일정·업그레이드 영향","현업 저항(변화관리) 대응","CFO 관점 효익 (결산 기간 등)"],
  table:{h:["Approach","Extra time","Extra cost","Upgrade impact"],r:[
    ["A · Rebuild all 35 screens and reports","+4 months","$900,000","Every upgrade needs retesting of custom code"],
    ["B · Fit-to-standard + 5 critical reports built as cloud extensions","+3 weeks","$120,000","Core stays clean, easy upgrades"],
    ["Expected benefit of standard process","—","—","Month-end close: 8 days → 5 days"]]},
  head:"To: Elena · Subject: Recommendation on Customization for the S/4HANA Project",
  output:[
    ["Dear Elena, I recommend a fit-to-standard approach, with only the five most critical reports built as cloud extensions.","Elena님, 표준 프로세스 적용(fit-to-standard)에 가장 중요한 리포트 5개만 클라우드 확장으로 구현하는 방식을 추천합니다."],
    ["Rebuilding all 35 screens would add four months and about nine hundred thousand dollars to the project.","35개 화면을 전부 재구현하면 4개월과 약 90만 달러가 추가됩니다."],
    ["It would also lock us into custom code that must be retested with every SAP upgrade, which raises long-term costs.","또한 SAP 업그레이드마다 재테스트해야 하는 커스텀 코드에 묶여 장기 비용이 늘어납니다."],
    ["The recommended approach adds only three weeks and one hundred twenty thousand dollars.","추천안은 3주와 12만 달러만 추가됩니다."],
    ["More importantly, adopting the standard process is expected to shorten your month-end close from eight days to five.","더 중요하게는 표준 프로세스 도입으로 월 결산이 8일에서 5일로 단축될 것으로 예상됩니다."],
    ["We understand that your finance team is used to the old screens, so we will run hands-on training and assign key users to help their colleagues.","재무팀이 기존 화면에 익숙한 점을 이해하기에, 실습 교육을 하고 키유저를 지정해 동료들을 돕도록 하겠습니다."],
    ["I'd like to hold a short workshop with your finance team to agree on the five critical reports.","재무팀과 짧은 워크숍을 열어 핵심 리포트 5개를 합의하고 싶습니다."],
    ["Please let me know a time that works for you. Best regards, Gildong Hong.","편하신 시간을 알려 주세요. 홍길동 드림."]
  ],
  prompts:[
    ["KO","SAP fit-to-standard 방식을 CFO에게 설득할 때 쓸 논리 3개를 비용·리스크·효익으로 정리해줘."],
    ["KO","35개 화면 중 ‘필수 리포트 5개’를 고르는 기준을 제안해줘."],
    ["EN","Rewrite this to sound empathetic: ‘Your team has to get used to the new screens.’"]
  ],
  memo:["AI가 ‘커스터마이징 전면 거부’ 톤 → 현업 감정 고려해 ‘최소 확장 5개’ 절충안으로","결산 8일→5일은 시나리오 수치 사용, 그 외 효익은 가정으로 표시","CFO 관점 = 비용·결산·리스크 → 기술 용어(BTP 등) 최소화"],
  qs:[
    {q:"My team is used to the old screens. Isn't customization what we're paying you for?",
     a:[["I completely understand. Your team has used those screens for years, and change is never easy.","충분히 이해합니다. 수년간 쓰던 화면이고, 변화는 늘 쉽지 않습니다."],
        ["But what you're really paying for is a faster and more reliable finance process, not the old screens.","하지만 실제로 투자하시는 건 예전 화면이 아니라 더 빠르고 신뢰할 수 있는 재무 프로세스입니다."],
        ["The standard process can shorten your month-end close from eight days to five, and it saves about nine hundred thousand dollars compared to rebuilding everything.","표준 프로세스는 월 결산을 8일에서 5일로 줄이고, 전부 재구현하는 것보다 약 90만 달러를 아낍니다."],
        ["And for the five reports your team truly can't work without, we'll build them as extensions.","그리고 정말 없으면 안 되는 리포트 5개는 확장 기능으로 만들어 드립니다."]]},
    {q:"How will you make sure my team actually accepts the new system?",
     a:[["Change management is as important as the system itself.","변화 관리는 시스템만큼 중요합니다."],
        ["First, we'll involve key users from your finance team in the design workshops, so they shape the new process.","첫째, 재무팀 키유저를 설계 워크숍에 참여시켜 새 프로세스를 직접 만들게 하겠습니다."],
        ["Second, we'll run hands-on training using your own data, not generic examples.","둘째, 일반 예시가 아니라 귀사 데이터로 실습 교육을 합니다."],
        ["Third, for the first two closing cycles, our consultants will sit with your team to support them.","셋째, 처음 두 번의 결산 동안 저희 컨설턴트가 팀 옆에서 지원합니다."]]},
    {q:"What's the biggest risk of going with the standard approach?",
     a:[["I'd say the biggest risk is user resistance in the first few months.","가장 큰 리스크는 초기 몇 달간의 사용자 저항이라고 봅니다."],
        ["If people feel the new system slows them down, they may go back to Excel.","새 시스템이 느리다고 느끼면 다시 엑셀로 돌아갈 수 있습니다."],
        ["To prevent that, we'll track adoption every week, for example how many journal entries are made in SAP versus outside it.","이를 막기 위해 SAP 안팎의 전표 건수처럼 사용률을 매주 추적하겠습니다."],
        ["If adoption drops, we'll fix the cause quickly, whether it's training or a missing report.","사용률이 떨어지면 교육이든 누락 리포트든 원인을 빠르게 고치겠습니다."]]}
  ]
}
);

/* ---------- 고객사·외주 프로젝트 표현 ---------- */
TEMPLATES.splice(TEMPLATES.length - 1, 0, {cat:"고객사·외주 프로젝트 (AX 수행사 관점)", items:[
  ["This request is outside the current scope, so we'd need to handle it as a change request.","이 요청은 현재 범위 밖이라 변경 요청으로 처리해야 합니다.","★"],
  ["Let me walk you through the impact on cost, schedule, and quality.","비용·일정·품질에 미치는 영향을 설명드리겠습니다.","★"],
  ["As the prime contractor, we take full responsibility for our subcontractor's delivery.","주사업자로서 협력사 납품에 전적인 책임을 지겠습니다."],
  ["Let's define clear acceptance criteria, so both sides agree on what done means.","완료 기준을 명확히 정해 양측이 같은 기준으로 판단하도록 하죠."],
  ["Our SLA guarantees 99.9 percent availability, with service credits if we fall short.","SLA로 99.9% 가용성을 보장하며 미달 시 서비스 크레딧을 드립니다."],
  ["To protect the go-live date, we can move this feature to phase two.","오픈일을 지키기 위해 이 기능은 2단계로 옮길 수 있습니다."],
  ["I'd suggest we document this decision and get sign-off from both sides.","이 결정을 문서화하고 양측 승인을 받는 것을 제안합니다."],
  ["We'll need a clear owner on your side for the data.","데이터는 귀사 측 담당자가 명확히 필요합니다."],
  ["Let's start with a pilot in one department and scale up based on the results.","한 부서 파일럿으로 시작해 결과에 따라 확대하시죠."]]});

/* ---------- 모집분야별 자기소개 ---------- */
const INTRO_GENERAL = [
  "4문장 구조: ① 이름 + 이 직무에서 되고 싶은 모습 → ② 관련 경험 1개(숫자 포함) → ③ 직무 소개 문구의 키워드 1~2개와 연결 → ④ 첫 6개월 목표",
  "SK AX는 고객사 프로젝트를 수행하는 회사입니다. client, requirements, deliver, stakeholders 같은 단어로 ‘고객 관점’을 보여 주세요.",
  "30~45초가 적당합니다. 미팅에서 자기소개 질문이 나오면 방금 쓴 Task 내용과 한 문장 연결하면 메시지가 선명해집니다.",
  "직접 해 보지 않은 기술은 말하지 마세요. 페르소나가 바로 꼬리질문을 할 수 있습니다. ‘관심 있다 / 배우고 있다’로 정직하게.",
  "예문 속 경험·숫자(예시)는 반드시 본인 경험으로 바꿔서 연습하세요."
];
const INTRO_TRACKS = [
  {track:"SW Engineering", keys:["client requirements","scalable architecture","high traffic","cloud native","AI-enabled services"],
   tips:["고객 요구사항을 아키텍처로 바꾸는 과정을 강조","트래픽·성능·안정성 숫자 1개","통신·커머스·금융 도메인 관심 한 줄"],
   intro:[["Hello, I'm Gildong Hong, and I'd like to grow as a software engineer who builds reliable systems for our clients.","안녕하세요, 홍길동입니다. 고객을 위해 신뢰할 수 있는 시스템을 만드는 SW 엔지니어로 성장하고 싶습니다."],
     ["What I enjoy most is turning a client's business requirements into a clear and stable architecture.","가장 즐거운 일은 고객의 비즈니스 요구사항을 명확하고 안정적인 아키텍처로 바꾸는 것입니다."],
     ["In a recent project, I designed the API for an order system and cut the average response time by about 40 percent with caching.","최근 프로젝트에서 주문 시스템 API를 설계하고 캐싱으로 평균 응답 시간을 약 40% 줄였습니다. (예시)"],
     ["At SK AX, I want to apply AI and cloud-native technology to large-scale services in telecom, commerce, and finance.","SK AX에서 통신·커머스·금융의 대규모 서비스에 AI와 클라우드 네이티브 기술을 적용하고 싶습니다."],
     ["In my first six months, my goal is to learn our delivery process and own one feature from design to release.","첫 6개월 목표는 수행 프로세스를 익히고 기능 하나를 설계부터 배포까지 책임지는 것입니다."]],
   why:[["I chose SW Engineering because good software is where a client's strategy actually becomes real.","고객의 전략이 실제로 구현되는 곳이 좋은 소프트웨어이기 때문에 SW Engineering을 선택했습니다."],
     ["I want to build systems that keep working even when traffic suddenly grows.","트래픽이 갑자기 늘어도 계속 동작하는 시스템을 만들고 싶습니다."]]},
  {track:"Factory SW Engineering", keys:["MES","equipment automation","productivity","downtime","smart factory","on-site"],
   tips:["‘현장(Field)’과 ‘안정성’ 키워드: 정지 1시간의 비용을 이해한다는 메시지","데이터 수집·대시보드·자동화 경험을 생산성 숫자로","현장 근무·엔지니어와 협업 의지"],
   intro:[["Hello, I'm Gildong Hong. I'm applying for Factory SW Engineering because I want to see software make a real difference on the production floor.","안녕하세요, 홍길동입니다. 소프트웨어가 생산 현장에 실제 변화를 만드는 걸 보고 싶어 Factory SW Engineering에 지원했습니다."],
     ["I understand that in a fab, even one hour of downtime can be very costly, so stability always comes first.","팹에서는 1시간 정지도 큰 비용이라, 안정성이 항상 우선이라는 걸 이해하고 있습니다."],
     ["In a previous project, I built a dashboard that collected equipment data and helped the team find errors 30 percent faster.","이전 프로젝트에서 장비 데이터를 수집하는 대시보드를 만들어 오류 발견을 30% 빠르게 했습니다. (예시)"],
     ["At SK AX, I want to help clients raise productivity through MES and automation systems, step by step toward a smart factory.","SK AX에서 MES와 자동화 시스템으로 고객의 생산성을 높이고, 단계적으로 스마트팩토리를 구현하고 싶습니다."],
     ["I'm also ready to work on site, because the best solutions come from understanding the field.","최고의 해법은 현장 이해에서 나오기에 현장 근무도 준비되어 있습니다."]],
   why:[["I chose this track because manufacturing is where AI and data can show results in clear numbers, like yield and uptime.","수율·가동률처럼 AI와 데이터의 성과가 숫자로 분명히 드러나는 곳이 제조라서 이 직무를 선택했습니다."]]},
  {track:"AI/Data Engineering", keys:["data pipeline","RAG","LLM","AI agent","MLOps","PoC to production"],
   tips:["‘모델’보다 ‘데이터 품질·평가·운영’을 말하면 실무감이 생김","PoC → 실서비스 전환 관점 (정확도, 비용, 리스크)","RAG/Agent 경험이 있으면 정답률·속도 숫자로"],
   intro:[["Hello, I'm Gildong Hong, and I want to help clients turn their data into real business value with AI.","안녕하세요, 홍길동입니다. 고객이 AI로 데이터를 실제 비즈니스 가치로 바꾸도록 돕고 싶습니다."],
     ["I'm especially interested in data pipelines and RAG-based AI agents that work reliably in an enterprise environment.","특히 기업 환경에서 안정적으로 동작하는 데이터 파이프라인과 RAG 기반 AI 에이전트에 관심이 많습니다."],
     ["In a recent project, I built a RAG chatbot on internal documents and raised answer accuracy from 65 to 82 percent by cleaning the source data.","최근 프로젝트에서 사내 문서 RAG 챗봇을 만들고 원천 데이터를 정비해 정답률을 65%에서 82%로 올렸습니다. (예시)"],
     ["What I learned is that data quality and evaluation matter as much as the model itself.","데이터 품질과 평가가 모델만큼 중요하다는 걸 배웠습니다."],
     ["At SK AX, I'd like to take AI from proof of concept to a stable service through MLOps.","SK AX에서 MLOps로 AI를 PoC에서 안정적인 서비스까지 끌어올리고 싶습니다."]],
   why:[["I chose AI/Data Engineering because many AI projects stop at the PoC stage, and I want to be the engineer who makes them work in production.","많은 AI 프로젝트가 PoC에서 멈추는데, 그걸 실서비스로 만드는 엔지니어가 되고 싶어 선택했습니다."]]},
  {track:"Cloud/Infra Engineering", keys:["cloud migration","legacy modernization","network","security","availability","SLA"],
   tips:["‘보이지 않는 기반’ 메시지: 안 멈추는 인프라","자격증·실습(오토스케일링, 모니터링, IaC)을 구체적으로","레거시 전환 시 무중단·보안 관점"],
   intro:[["Hello, I'm Gildong Hong. I want to build the foundation that lets clients move fast: secure and flexible cloud infrastructure.","안녕하세요, 홍길동입니다. 고객이 빠르게 움직일 수 있는 기반, 즉 안전하고 유연한 클라우드 인프라를 만들고 싶습니다."],
     ["I'm interested in helping companies move legacy systems to the cloud without disrupting their business.","기업이 비즈니스 중단 없이 레거시를 클라우드로 옮기도록 돕는 일에 관심이 있습니다."],
     ["Recently, I earned a cloud certification and set up a small service with auto-scaling and monitoring.","최근 클라우드 자격증을 취득하고 오토스케일링과 모니터링을 갖춘 소규모 서비스를 구성했습니다. (예시)"],
     ["I believe good infrastructure work is invisible to users. It simply never goes down.","좋은 인프라는 사용자에게 보이지 않는다고 생각합니다. 그냥 멈추지 않는 것이죠."],
     ["At SK AX, I want to grow into an engineer who can design cloud, network, and security as one architecture.","SK AX에서 클라우드·네트워크·보안을 하나의 아키텍처로 설계하는 엔지니어로 성장하고 싶습니다."]],
   why:[["I chose Cloud and Infra because every AX project, whether it's AI or ERP, depends on a stable foundation.","AI든 ERP든 모든 AX 프로젝트는 안정적인 기반 위에 서기 때문에 Cloud/Infra를 선택했습니다."]]},
  {track:"Solution Development", keys:["ERP","SAP S/4HANA","finance and accounting","SCM","fit-to-standard","process innovation"],
   tips:["업무(재무·회계·SCM) 이해 + 시스템 이해를 함께 강조","회계·세무·구매 등 업무 경험이 있으면 가장 큰 무기","CFO·현업 관점 효익(결산 단축, 데이터 정확성)으로 말하기"],
   intro:[["Hello, I'm Gildong Hong, and I'd like to help clients improve their core business processes through ERP.","안녕하세요, 홍길동입니다. ERP로 고객의 핵심 경영 프로세스를 고도화하는 일을 하고 싶습니다."],
     ["What attracts me to SAP is that it connects finance, accounting, and the supply chain into one flow of data.","SAP의 매력은 재무·회계·공급망을 하나의 데이터 흐름으로 연결한다는 점입니다."],
     ["From a finance system project I worked on, I understand why accurate closing and reporting matter so much to a finance team.","재무 시스템 프로젝트 경험을 통해 재무팀에게 정확한 결산과 보고가 왜 중요한지 이해합니다. (본인 경험으로 교체)"],
     ["At SK AX, I want to learn SAP S/4HANA in depth and connect it with cloud-based extensions.","SK AX에서 SAP S/4HANA를 깊이 배우고 클라우드 기반 확장과 연결하고 싶습니다."],
     ["My goal is to become a consultant who speaks both the language of business and the language of systems.","비즈니스의 언어와 시스템의 언어를 모두 말하는 컨설턴트가 되는 것이 목표입니다."]],
   why:[["I chose Solution Development because ERP is where a company's management decisions meet its data.","ERP는 기업의 경영 의사결정과 데이터가 만나는 곳이라 Solution Development를 선택했습니다."]]}
];

/* ---------- AI Agent 추천 프롬프트 (한국어) ---------- */
const PROMPT_GUIDE = {
  formula: "역할·대상 + 목표 + 제약조건 + 출력 형식",
  principles: [
    "첫 질문에 역할과 상황(과제 원문 복붙 또는 핵심 정리)을 직접 준다. 판단 기준(예산·일정·리스크 등)과 우선순위도 내가 정해서 적는다.",
    "출력 형식을 지정한다: 표 / 3줄 / O·X / 영어 이메일 200단어 등.",
    "결론은 내가 내리고 AI는 검증에 쓴다. ‘내 판단은 B안, 약점은?’처럼 물으면 Memo에 남길 근거가 생긴다.",
    "‘숫자는 시나리오에 있는 것만 써줘’를 붙인다. AI가 만든 수치는 감점 요인이다.",
    "한 번에 한 가지만 요청한다. 20분이라 짧고 구체적인 질문이 가장 빠르다.",
    "영어 초안을 요청할 때는 수신자·톤·길이를 함께 지정한다."
  ],
  avoid: [
    ["“이메일 써줘”", "조건이 없어 일반론이 나오고, 시나리오 수치를 틀리기 쉽다."],
    ["AI 초안을 그대로 붙여넣기", "[Your Name] 같은 placeholder가 남고, AI 활용 판단 근거도 남지 않는다."],
    ["질문 여러 개를 한 번에", "답이 길어져 시간이 오래 걸리고 핵심이 흐려진다."]
  ],
  stages: [
    {name:"① 시나리오 파악", time:"0–3분", items:[
      ["나는 ___(역할)이고 ___에게 보낼 ___을 영어로 써야 해. 아래가 과제 내용이야.\n\n(과제 원문 또는 정리본 붙여넣기)", "역할·상황 먼저 주기"],
      ["이 시나리오의 핵심 과제를 한 문장으로 요약하고, 결과물에 꼭 들어가야 할 요구사항을 체크리스트로 뽑아줘.", "요구사항 누락 방지"],
      ["이 결과물을 받는 사람(팀장/고객사)이 가장 신경 쓸 포인트 3가지가 뭐야?", "독자 관점 파악"],
      ["시나리오에 나온 숫자와 제약조건(예산, 일정, 목표치)만 표로 정리해줘.", "근거 데이터 확보"]]},
    {name:"② 분석·판단", time:"3–8분", items:[
      ["옵션들을 예산·일정·리스크 기준으로 비교표로 만들고, 각 조건 충족 여부를 O/X로 표시해줘. 숫자는 시나리오에 있는 것만 써줘.", "조건 기준 비교"],
      ["내 판단은 ___안이야. 이유는 ___. 이 판단의 약점이나 내가 놓친 부분이 뭐야?", "AI를 검증자로 쓰기"],
      ["___안을 선택했을 때 리스크 3가지와 각각 현실적인 대응책을 한 줄씩 알려줘.", "리스크·대응 확보"],
      ["이 상황에서 내가 고려하지 못한 이해관계자나 변수가 있을까?", "시야 넓히기"]]},
    {name:"③ 구조·초안", time:"8–12분", items:[
      ["___에게 보낼 이메일 개요만 잡아줘. 순서: 결론 → 근거 2개 → 리스크·대응 → 다음 단계. 문장은 쓰지 말고 항목만.", "구조 먼저"],
      ["아래 한국어 메모를 비즈니스 영어 이메일로 바꿔줘. 200단어 이내, 정중하지만 단호한 톤, 숫자는 그대로.\n\n(메모 붙여넣기)", "내 생각 → 영어"],
      ["첫 문장에 결론이 바로 보이도록 오프닝 문장을 영어로 3가지 버전 써줘.", "결론 먼저 쓰기"]]},
    {name:"④ 검증·보완", time:"12–16분", items:[
      ["내 초안이 요구사항을 모두 충족하는지 확인하고, 빠진 항목만 알려줘.", "요구사항 체크"],
      ["내 초안의 숫자가 시나리오 데이터와 일치하는지 하나씩 확인해줘.", "수치 검증"],
      ["이 초안을 받은 ___ 입장에서 가장 먼저 나올 반론 3가지는?", "반론 대비"]]},
    {name:"⑤ 다듬기", time:"16–19분", items:[
      ["의미는 바꾸지 말고 문법 오류와 어색한 표현만 고쳐줘. 고친 부분만 원문 → 수정 형태로 보여줘.", "최소 수정"],
      ["단어 수를 ___단어 이내로 줄여줘. 결론과 숫자는 유지해.", "분량 조절"],
      ["방어적으로 들리는 문장이 있으면 더 자신감 있고 정중하게 바꿔줘.", "톤 조정"]]},
    {name:"⑥ Memo·미팅 대비", time:"제출 직전", items:[
      ["이 대화에서 내가 AI 제안을 그대로 쓰지 않고 수정하거나 직접 판단한 부분을 Memo용으로 3줄 정리해줘.", "AI 활용 근거 기록"],
      ["이 결과물로 미팅을 하면 나올 압박 질문 3개와, 각각 영어로 답할 핵심 문장 1개씩 알려줘.", "Meeting 예열"],
      ["내 추천안을 영어 두 문장으로 요약해줘. 미팅 첫 답변으로 쓸 거야.", "첫 답변 준비"]]}
  ]
};


/* ---------- 회의 필수 표현 100 (단계별) ---------- */
const MEETING100 = [
 {part:"Part 1 · 회의 시작과 아이스브레이킹", items:[
  ["Let's get started, shall we?", "시작할까요?"],
  ["Thanks everyone for joining the meeting today.", "오늘 회의에 참석해 주셔서 감사합니다."],
  ["Before we begin, let me briefly go over the agenda.", "시작 전에 안건을 간단히 살펴보겠습니다."],
  ["Can everyone see my screen?", "화면 보이시나요?"],
  ["Is everyone able to hear me clearly?", "제 목소리 잘 들리시나요?"],
  ["Let's do a quick round of introductions.", "간단히 돌아가며 자기소개하죠."],
  ["We're still waiting for a few people to join.", "아직 몇 분 더 기다리고 있습니다."],
  ["While we wait, feel free to grab a coffee or stretch.", "기다리는 동안 커피를 드시거나 스트레칭하세요."],
  ["Let's start with a quick update from each team.", "팀별로 간단한 업데이트부터 하죠."],
  ["Let's keep things short and to the point today.", "오늘은 짧고 핵심만 진행합시다."],
  ["The purpose of today's meeting is to decide on the vendor.", "오늘 회의의 목적은 벤더를 결정하는 것입니다."],
  ["We have a tight schedule, so let's dive right in.", "일정이 빠듯하니 바로 시작하죠."],
  ["Just to confirm, is everyone here from the invite list?", "확인차 여쭙니다. 초대 명단에 있는 분들 다 오셨나요?"],
  ["Let me kick things off by welcoming everyone.", "환영 인사로 회의를 시작하겠습니다."],
  ["Can someone please take notes for today's meeting?", "오늘 회의록 작성해 주실 분 계신가요?"],
  ["I'll be moderating today's meeting.", "오늘 회의 진행은 제가 맡겠습니다."],
  ["Let's quickly review what we discussed last time.", "지난번 논의 내용을 빠르게 짚어보죠."],
  ["If there are no objections, let's proceed.", "이의 없으시면 진행하겠습니다."],
  ["Please mute your mic when you're not speaking.", "발언하지 않을 때는 마이크를 꺼 주세요."],
  ["We'll make sure to wrap up on time.", "정시에 마치도록 하겠습니다."]]},
 {part:"Part 2 · 안건 제시와 주제 전환", items:[
  ["Let's move on to the next item, shall we?", "다음 안건으로 넘어갈까요?"],
  ["The first item on the agenda is the project timeline.", "첫 번째 안건은 프로젝트 일정입니다."],
  ["I'd like to introduce our next topic.", "다음 주제를 소개하겠습니다."],
  ["Let's shift the discussion to the next point.", "다음 논점으로 넘어가죠."],
  ["Shall we take a look at the next issue?", "다음 문제를 살펴볼까요?"],
  ["Before we move on, are there any questions?", "넘어가기 전에 질문 있으신가요?"],
  ["Let's take a quick look at the updated timeline.", "업데이트된 일정을 잠깐 보죠."],
  ["As we mentioned, the next item is very time-sensitive.", "말씀드렸듯 다음 안건은 시간이 촉박합니다."],
  ["I think we've covered this topic enough.", "이 주제는 충분히 다룬 것 같습니다."],
  ["We'll now move on to the next point.", "이제 다음 포인트로 넘어가겠습니다."],
  ["Just to recap, here's where we are on the agenda.", "정리하자면, 안건은 여기까지 진행됐습니다."],
  ["We need to manage our time and move on.", "시간 관리를 위해 넘어가야 합니다."],
  ["Let's circle back to that later.", "그건 나중에 다시 얘기하죠."],
  ["Let's not get stuck on this point.", "이 부분에서 너무 오래 머물지 맙시다."],
  ["Can we table this topic for now?", "이 주제는 일단 보류할까요?"],
  ["That brings us to the next item.", "그럼 다음 안건으로 넘어가겠습니다."],
  ["Let's make a quick note of this.", "이건 간단히 메모해 두죠."],
  ["Moving forward, let's look at the final proposal.", "이어서 최종 제안을 보겠습니다."],
  ["Let's park this topic and move on.", "이 주제는 잠시 미뤄두고 넘어가죠."],
  ["We'll come back to this if time allows.", "시간이 되면 다시 다루겠습니다."]]},
 {part:"Part 3 · 의견 제시와 반론", items:[
  ["I'd like to share my thoughts on this matter.", "이 문제에 대한 제 생각을 말씀드리고 싶습니다."],
  ["From my point of view, it seems that we're moving too quickly.", "제가 보기엔 너무 빠르게 진행하는 것 같습니다."],
  ["If I may add, I have a different opinion on this approach.", "덧붙이자면, 이 접근법에는 다른 의견이 있습니다."],
  ["One thing we might consider is adding a customer feedback session.", "고객 피드백 세션을 추가하는 것도 고려해 볼 만합니다."],
  ["I see your point, but I'm not sure I agree with the timing.", "말씀은 이해하지만, 시점에는 동의하기 어렵습니다."],
  ["That's a valid point. But here's another angle we might take.", "타당한 지적입니다. 하지만 다른 각도에서 볼 수도 있습니다."],
  ["Could you clarify what you meant by alternative strategy?", "대안 전략이 무슨 뜻인지 설명해 주시겠어요?"],
  ["Just to be clear, are you suggesting that we postpone the launch?", "분명히 하자면, 출시를 미루자는 말씀이신가요?"],
  ["I'm afraid I have to disagree with that conclusion.", "죄송하지만 그 결론에는 동의하기 어렵습니다."],
  ["That's an interesting idea, but I'd like to propose an alternative solution.", "흥미로운 아이디어지만, 대안을 제안하고 싶습니다."],
  ["Let me play devil's advocate for a moment and ask what if the plan fails.", "일부러 반대 입장에서 여쭤보면, 계획이 실패하면 어떻게 하죠?"],
  ["Can I just point out something here regarding the budget estimate?", "예산 추정치와 관련해 한 가지 짚어도 될까요?"],
  ["It might be worth noting that we've already tried a similar method last year.", "작년에 비슷한 방법을 이미 시도했다는 점도 짚어둘 만합니다."],
  ["We should also take into account that our competitors are moving fast.", "경쟁사가 빠르게 움직이고 있다는 점도 고려해야 합니다."],
  ["My only concern is that it might delay the process significantly.", "제 유일한 걱정은 과정이 크게 지연될 수 있다는 점입니다."],
  ["I'd recommend taking a different approach to onboarding.", "온보딩은 다른 방식으로 접근하길 권합니다."],
  ["I'm not sure that will work in this case due to limited resources.", "자원이 부족해서 이번에는 잘 안 될 것 같습니다."],
  ["Perhaps we could look at it from a different perspective.", "다른 관점에서 보면 어떨까요."],
  ["To build on what you said, I'd add that timing is also critical.", "말씀하신 데 덧붙이면, 타이밍도 매우 중요합니다."],
  ["Let's agree to disagree on this one and revisit it next week.", "이건 서로 의견이 다르다는 걸 인정하고 다음 주에 다시 보죠."]]},
 {part:"Part 4 · 합의 도출과 마무리", items:[
  ["I think we can all agree on this proposal.", "이 제안에는 모두 동의하실 것 같습니다."],
  ["Let's finalize the action items before we wrap up.", "마치기 전에 실행 항목을 확정하죠."],
  ["We have reached a consensus on the main points.", "주요 사항에 대해 합의했습니다."],
  ["Let's schedule a follow-up meeting for next week.", "다음 주에 후속 회의를 잡죠."],
  ["Does everyone agree with the timeline we discussed?", "논의한 일정에 모두 동의하시나요?"],
  ["We will document today's decisions and share them.", "오늘 결정 사항을 문서로 정리해 공유하겠습니다."],
  ["Let's make sure everyone is clear on their responsibilities.", "각자 맡은 일이 명확한지 확인하죠."],
  ["I'd like to thank everyone for their contributions.", "모두의 기여에 감사드립니다."],
  ["Let's wrap up here and continue next time.", "여기서 마치고 다음에 이어가죠."],
  ["We'll send out the meeting minutes by tomorrow.", "내일까지 회의록을 보내드리겠습니다."],
  ["Before we close, does anyone have any final comments?", "마치기 전에 마지막으로 하실 말씀 있으신가요?"],
  ["I'm glad we could come to an agreement today.", "오늘 합의에 이르러 기쁩니다."],
  ["Thank you for your time and valuable input.", "시간 내주시고 좋은 의견 주셔서 감사합니다."],
  ["Let's confirm our next meeting date.", "다음 회의 날짜를 확정하죠."],
  ["We have achieved our objectives for today.", "오늘 목표를 달성했습니다."],
  ["I'll follow up with an email summary.", "요약 메일로 후속 공유드리겠습니다."],
  ["Great work, everyone.", "모두 수고하셨습니다."],
  ["Let's ensure we meet the agreed deadlines.", "합의한 마감일을 꼭 지킵시다."],
  ["I'll send a calendar invite for the next meeting.", "다음 회의 캘린더 초대를 보내겠습니다."],
  ["Thank you all, and see you at the next meeting.", "감사합니다. 다음 회의 때 뵙겠습니다."]]},
 {part:"Part 5 · 화상·대면 상황별", items:[
  ["Please turn on your camera if possible.", "가능하시면 카메라를 켜 주세요."],
  ["You're on mute right now.", "지금 음소거 상태세요."],
  ["Can you hear me clearly?", "제 목소리 잘 들리세요?"],
  ["Let's wait until everyone has joined.", "모두 들어오실 때까지 기다리죠."],
  ["Please share the link in the chat.", "채팅창에 링크 공유해 주세요."],
  ["Could you adjust your microphone?", "마이크 좀 조정해 주시겠어요?"],
  ["Please speak a little louder.", "조금만 더 크게 말씀해 주세요."],
  ["Let's take a short break.", "잠깐 쉬었다 하죠."],
  ["We'll resume in five minutes.", "5분 뒤에 다시 시작하겠습니다."],
  ["Please make sure your phone is on silent.", "휴대폰은 무음으로 해 주세요."],
  ["Let's gather around the table.", "테이블로 모여 주세요."],
  ["Can you move closer to the microphone?", "마이크 쪽으로 조금 더 가까이 와 주시겠어요?"],
  ["Let's make sure everyone has a copy of the document.", "모두 문서 사본을 받으셨는지 확인하죠."],
  ["Please sign the attendance sheet.", "출석부에 서명해 주세요."],
  ["Let's keep the discussion focused.", "논의가 핵심에서 벗어나지 않게 하죠."],
  ["Can we lower our voices, please?", "목소리를 조금 낮춰 주시겠어요?"],
  ["Thank you for attending in person.", "직접 참석해 주셔서 감사합니다."],
  ["Let's end the meeting on a positive note.", "좋은 분위기로 회의를 마무리하죠."]]}
];

/* ---------- 개인 맞춤 (data.local.js에서 사용) ----------
   data.local.js는 git에 올라가지 않는 개인 파일입니다. 사용법은 data.local.example.js 참고. */
const LOCAL = (() => {
  const roots = () => [TASKS, TEMPLATES, PATTERNS, DIALOGUE, INTRO_TRACKS, MEETING100];
  function walk(o, onStr, onLine) {
    if (Array.isArray(o)) {
      if (onLine && typeof o[0] === "string" && typeof o[1] === "string") onLine(o);
      o.forEach((v, i) => { if (typeof v === "string") { if (onStr) o[i] = onStr(v); } else walk(v, onStr, onLine); });
    } else if (o && typeof o === "object") {
      for (const k of Object.keys(o)) { const v = o[k]; if (typeof v === "string") { if (onStr) o[k] = onStr(v); } else walk(v, onStr, onLine); }
    }
  }
  return {
    // 모든 문장에서 글자 바꾸기 (예: 이름)
    rename(from, to) { roots().forEach(r => walk(r, s => s.split(from).join(to))); },
    // 영어 원문이 정확히 같은 문장을 [영어, 한국어]로 교체
    replace(en, line) {
      let n = 0;
      roots().forEach(r => walk(r, null, l => { if (l[0] === en) { l[0] = line[0]; if (line[1] != null) l[1] = line[1]; n++; } }));
      if (!n) console.warn("[data.local.js] 못 찾은 문장:", en);
    }
  };
})();
