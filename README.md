# Command Survival

![logo-title](https://github.com/tokkissi/Command-Survival/assets/53216523/23818d75-b87b-4c53-b9e8-28648b029bfd)


> Command Survival은 텍스트와 음성인식을 통한 선택지 생존 게임입니다.  
> 배포 URL: [https://command-survival.vercel.app](https://command-survival.vercel.app)

---

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [시연 영상](#시연-영상)
4. [기능 설명](#기능-설명)
5. [프로젝트 설치 방법](#프로젝트-설치-방법)
6. [PWA 설치 방법](#PWA-설치-방법)
7. [사용 방법](#사용-방법)
8. [개발자 정보](#개발자-정보)

---

## 프로젝트 소개

Command Survival은 텍스트 입력과 음성인식을 통해 유저가 진행하는 텍스트 기반의 생존 및 탐험 선택지 게임입니다.  
AI가 매번 새로운 배경과 상황을 제시하며, 유저는 그에 따라 선택지를 선택하거나 창의적인 답변으로 스토리를 진행합니다.  
체력바와 상태 아이콘을 통해 게임 내 능력치를 확인할 수 있습니다.  
게임 내의 대부분의 이미지들은 AI 를 통해서 직접 제작하였습니다.  
PWA를 지원하여 설치 후 실행 시 앱처럼 이용이 가능합니다.

---

## 기술 스택

- Next.js 13
- TypeScript
- Next Auth
- Chat GPT API
- DALL·E API
- React query
- MongoDB
- SpeechRecognition API
- PWA

---

## 시연 영상

- 소셜 로그인
![로그인](https://github.com/tokkissi/Command-Survival/assets/53216523/82360d53-cc67-47d1-836d-68e534f17c6e)

- 게임 실행 및 이벤트의 상태 아이콘 연동
![게임 실행 및 이벤트의 상태 아이콘 연동](https://github.com/tokkissi/Command-Survival/assets/53216523/91ce79e2-78a6-4ede-848f-ecdc12655fa2)

- 답변 입력을 통한 게임 진행
![답변 입력을 통한 게임 진행](https://github.com/tokkissi/Command-Survival/assets/53216523/af0a56fc-8852-4d00-8b29-7961c738142d)

- 음성인식을 통한 입력
![음성인식을 통한 입력](https://github.com/tokkissi/Command-Survival/assets/53216523/ac7a9f37-5725-4560-b914-974f7754bb04)

- 일반 전투 이벤트와 체력 변화 반영
![일반 전투 이벤트와 체력 변화 반영](https://github.com/tokkissi/Command-Survival/assets/53216523/22e0c0be-f7f1-433b-9b7d-67497ef6ab13)

- 보스 전투 이벤트와 체력 변화 및 새 게임하기
![보스 전투 이벤트와 체력 변화 및 새 게임 하기](https://github.com/tokkissi/Command-Survival/assets/53216523/f6a3825d-0908-4e2e-bc7f-78d716ca113c)

- 이어서 하기
![이어서 하기](https://github.com/tokkissi/Command-Survival/assets/53216523/bd0225b5-7830-4017-85e5-59b541cfe4e2)

- 이미지 생성
![이미지 생성](https://github.com/tokkissi/Command-Survival/assets/53216523/b8135227-9b0c-423c-af87-5970130a4336)

- 반응형 UI - 이미지 생성 페이지
![반응형 UI - 이미지 생성 페이지](https://github.com/tokkissi/Command-Survival/assets/53216523/c5fce70a-0058-4080-8edd-c1b76969bffe)

- 반응형 UI - 게임 플레이 페이지
![반응형 UI - 게임 플레이 페이지](https://github.com/tokkissi/Command-Survival/assets/53216523/7527a2ad-6da4-4d2f-8bcb-5ca24d57f664)

- PWA 설치 및 앱 실행
![command-survival_PWA](https://github.com/tokkissi/Command-Survival/assets/53216523/3a2d7771-7d2d-4ae4-9ee2-e32a690f4af9)


---

## 기능 설명

- **다양한 선택지와 상황**: AI가 제시하는 다양한 배경과 상황
- **능력치와 아이템**: 체력바와 상태 아이콘을 통한 능력치 확인
- **전투 이벤트**: 5턴과 10턴에 등장하는 전투 이벤트
- **보스 전투와 리워드**: 10턴 후 자동으로 발생하는 보스 전투와 AI 이미지 생성 쿠폰 리워드
- **이어하기 기능**: 이전에 진행하던 게임을 로드해서 계속할 수 있음
- **소셜 로그인**: Google과 GitHub로 로그인 가능
- **반응형 UI**: 화면 사이즈에 따라 PC와 모바일 버전이 자동으로 전환
- **PWA 지원**: 이 애플리케이션은 PWA로 제공되어, 웹사이트를 브라우저에 설치하여 앱처럼 사용할 수 있습니다. 

---

## 프로젝트 설치 방법

이 프로젝트를 로컬 환경에서 실행하기 위한 단계는 다음과 같습니다:


```bash
# 프로젝트를 클론합니다.
git clone https://github.com/tokkissi/command-survival.git

# 프로젝트 폴더로 이동합니다.
cd command-survival

# 의존성을 설치합니다.
yarn install

# 환경 변수를 설정합니다.(.env, .env.local 파일을 모두 생성해야합니다)
# .env 파일을 프로젝트 루트에 생성합니다. 다음은 기본 설정 예시입니다.
# .env 파일의 각 변수의 값은 타입만 일치한다면 수정해서 사용할 수 있습니다.

NEXT_PUBLIC_DEFAULT_ATK=3
NEXT_PUBLIC_DEFAULT_DEF=1
NEXT_PUBLIC_DEFAULT_MAXHP=12
NEXT_PUBLIC_DEFAULT_ITEMS="저주받은 반지"
NEXT_PUBLIC_DEFAULT_MAX_FLOOR=10
NEXT_PUBLIC_DEFAULT_START_FLOOR=1
NEXT_PUBLIC_DEFAULT_ENEMY_ATK=2
NEXT_PUBLIC_DEFAULT_ENEMY_DEF=0
NEXT_PUBLIC_DEFAULT_ENEMY_HP=10
NEXT_PUBLIC_BOSS_ATK=3
NEXT_PUBLIC_BOSS_DEF=0
NEXT_PUBLIC_BOSS_HP=13


# .env.local 파일에는 개인 또는 민감한 정보가 포함됩니다.
# 이 파일도 프로젝트 루트에 생성하고, 다음과 같은 형식으로 필요한 정보를 채워 넣습니다.
# 실제 값을 your_... 부분에 채워 넣으세요.

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
NEXTAUTH_SECRET=your_nextauth_secret
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_uri

```

---

## PWA 설치 방법

이 애플리케이션은 PWA로 제공되어, 웹사이트를 브라우저에 설치하여 앱처럼 사용할 수 있습니다. 설치 방법은 다음과 같습니다:

- **웹사이트 접속** : 브라우저를 사용하여 애플리케이션 주소로 이동합니다.  
- **설치 팝업** : 사이트를 방문하면 홈 화면에 추가 또는 앱 설치를 권하는 팝업이 나타날 수 있습니다. 이 팝업의 지시를 따라 설치를 진행합니다.  
- **수동 설치** : 팝업이 나타나지 않는 경우, 브라우저 주소 표시줄 오른쪽에 있는 설치 아이콘(+)을 클릭하여 설치를 진행합니다.

<br />

---

## 사용 방법

1. [https://command-survival.vercel.app](https://command-survival.vercel.app)에 접속합니다. PWA를 설치하면 웹앱처럼 사용 가능합니다.
2. Google이나 GitHub로 로그인합니다.
3. 게임을 시작하거나 이어하기를 선택합니다.

---

## 개발자 정보

- 개발자: tokkissi
- 이메일: alal4674@gmail.com
- GitHub: https://github.com/tokkissi
---

이 프로젝트는 Vercel을 통해 빌드 및 배포되었습니다.
