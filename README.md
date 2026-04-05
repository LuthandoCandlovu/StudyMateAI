<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=StudyMate%20AI&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Your%20Intelligent%20Study%20Companion&descAlignY=60&descSize=22" width="100%"/>

<!-- Animated Logo / GIF -->
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJhd2VucGdzejFranJlOGQ5dmxsNXpkc3lwMXI5cXpwdG13a2hrcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L1R1tvI9svkIWwpVYr/giphy.gif" width="120" alt="AI Robot studying"/>

<br/>

<!-- Typing Animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=800&color=6C63FF&center=true&vCenter=true&multiline=true&width=650&height=80&lines=Track+your+study+hours+%F0%9F%93%9A;Build+unstoppable+streaks+%F0%9F%94%A5;Get+AI-powered+predictions+%F0%9F%A4%96" alt="Typing SVG"/>
</a>

<br/><br/>

<!-- Badges -->
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

[![Stars](https://img.shields.io/github/stars/LuthandoCandlovu/StudyMateAI?style=social)](https://github.com/LuthandoCandlovu/StudyMateAI)
[![Forks](https://img.shields.io/github/forks/LuthandoCandlovu/StudyMateAI?style=social)](https://github.com/LuthandoCandlovu/StudyMateAI)
[![Issues](https://img.shields.io/github/issues/LuthandoCandlovu/StudyMateAI?color=red)](https://github.com/LuthandoCandlovu/StudyMateAI/issues)

</div>

---

## 🌟 What is StudyMate AI?

> **StudyMate AI** is a smart, beautifully designed mobile app built for students who want to take their academics seriously — and actually *see* results.

Most students struggle not because they're not smart, but because they lack **structure**, **visibility**, and **motivation**. StudyMate AI solves all three:

- 📌 **Structure** — Set target study hours per subject and log your daily progress
- 📊 **Visibility** — Visualise your performance with real-time charts and streak tracking
- 🤖 **Motivation** — Receive AI-generated predictions and personalised advice based on your last 7 days of study data

Whether you're cramming for finals or building long-term learning habits, StudyMate AI keeps you on track — one session at a time.

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjlkNzNkMzRhMGU4YzJmOGY3YTJiZGM0ZTg3NzM3YmIyYTE3ZDEyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qgQUggAC3Pfv687qPC/giphy.gif" width="400" alt="Coding GIF"/>
</div>

---

## ✨ Features at a Glance

<div align="center">

| Feature | Description |
|--------|-------------|
| 🔐 **Authentication** | Secure email/password login via Firebase Auth |
| 📚 **Subject Management** | Add subjects with personalised target study hours |
| ⏱️ **Study Logging** | Record daily study hours per subject |
| 📊 **Progress Charts** | Bar charts comparing completed vs target hours |
| 🔥 **Study Streaks** | Track consecutive days of study activity |
| 🤖 **AI Predictions** | FastAPI + scikit-learn predicts future performance |
| 💡 **Smart Advice** | Personalised tips based on your progress patterns |
| 🔔 **Reminders** | Push notifications when you're falling behind |

</div>

---

## 🏗️ Architecture

```mermaid
graph TD
    A["📱 React Native App\nExpo + TypeScript"] -->|REST API Calls| B["🐍 FastAPI Backend\nPython + scikit-learn"]
    A -->|Login / Register| C["🔐 Firebase Auth"]
    A -->|Read / Write Data| D["🗄️ Cloud Firestore"]
    B -->|Generates Prediction| E["📈 Linear Regression Model"]
    A -->|Optional Alerts| F["🔔 Expo Notifications"]

    style A fill:#61DAFB,stroke:#20232A,color:#000
    style B fill:#009688,stroke:#004D40,color:#fff
    style C fill:#FFCA28,stroke:#F57F17,color:#000
    style D fill:#FF6F00,stroke:#E65100,color:#fff
    style E fill:#7C4DFF,stroke:#4527A0,color:#fff
    style F fill:#37474F,stroke:#263238,color:#fff
```

### 🔄 Data Flow

```
1. 🔐  User logs in          →  Firebase Auth validates credentials
2. 📚  Adds subject          →  Data stored in Firestore (per-user collection)
3. ⏱️  Logs study hours      →  Firestore updated with daily session
4. 🏠  Opens Home screen     →  App fetches progress & streak data
5. 🤖  AI prediction         →  Last 7 days sent to FastAPI → model returns score + advice
6. 🔔  Falls behind          →  Local notification triggered if progress < 50%
```

---

## 📱 Screenshots

<div align="center">

| Login | Home | Add Subject | Log Hours | AI Prediction |
|-------|------|-------------|-----------|---------------|
| <img src="https://github.com/user-attachments/assets/f9ed9b39-9729-4af9-b305-5bf45b223633" width="160"/> | <img src="https://github.com/user-attachments/assets/4cf0c27f-fc1b-4f61-8093-398a024ee252" width="160"/> | <img src="https://github.com/user-attachments/assets/1e95dae7-bd08-4524-a3e6-7ba172152110" width="160"/> | <img src="https://github.com/user-attachments/assets/fa09a692-5621-4b2b-8fec-ddd0fab4447f" width="160"/> | <img src="https://github.com/user-attachments/assets/1395ae16-0016-4dcc-beeb-ff287c8b7e19" width="160"/> |

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React Native (Expo), TypeScript, React Navigation, Axios |
| **Backend** | Python, FastAPI, Uvicorn, scikit-learn, Pandas, NumPy |
| **Database** | Cloud Firestore (NoSQL) |
| **Auth** | Firebase Authentication (Email/Password) |
| **Charts** | react-native-chart-kit, react-native-svg |
| **Notifications** | Expo Notifications (optional) |

</div>

---

## 🚀 Getting Started

<details>
<summary><b>📋 Prerequisites</b></summary>

<br/>

- ✅ Node.js (v18+)
- ✅ npm or yarn
- ✅ Expo CLI → `npm install -g expo-cli`
- ✅ Python 3.9+ (for the backend)
- ✅ A Firebase project (free tier is fine)

</details>

<details>
<summary><b>⚙️ Installation</b></summary>

<br/>

**1. Clone the repository**

```bash
git clone https://github.com/LuthandoCandlovu/StudyMateAI.git
cd StudyMateAI
```

**2. Install frontend dependencies**

```bash
npm install
# or
yarn install
```

**3. Configure Firebase**

- Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Enable **Email/Password** authentication
- Create a **Firestore** database in test mode
- Replace `firebaseConfig` in `src/config/firebase.ts` with your credentials

**4. Run the mobile app**

```bash
npx expo start --clear
```

> Scan the QR code with **Expo Go** or launch on an emulator.

**5. Start the AI backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install fastapi uvicorn scikit-learn pandas numpy
uvicorn main:app --reload --port 8000
```

**6. Start studying! 🎉**

- Register → Add a subject → Log your hours → See your AI prediction

</details>

---

## 📂 Project Structure

```
StudyMateAI/
├── 📁 src/
│   ├── 📁 config/          # Firebase configuration
│   ├── 📁 screens/         # Login, Register, Home, AddSubject, AddStudyHours
│   ├── 📁 components/      # ProgressChart component
│   ├── 📁 navigation/      # Stack navigator setup
│   ├── 📁 services/        # Firestore CRUD + streak logic
│   └── 📁 types/           # TypeScript interfaces
├── 📁 backend/
│   └── main.py             # FastAPI prediction endpoint
├── 📁 assets/              # Icons and splash screen
├── App.tsx
├── package.json
└── README.md
```

---

## 🔮 Roadmap

<div align="center">

| Status | Feature |
|--------|---------|
| ✅ Done | Study streak tracking |
| ✅ Done | AI performance prediction (linear regression) |
| ⏳ Planned | Advanced ML with subject difficulty + past scores |
| ⏳ Planned | Social leaderboards — compete with friends |
| ⏳ Planned | Voice logging — add hours via speech |
| ⏳ Planned | Dark mode toggle |
| ⏳ Planned | Export progress report as PDF |

</div>

---

## 🤝 Contributing

Contributions are warmly welcome! 🙌

```bash
# Fork → Create branch → Commit → Push → Open PR
git checkout -b feature/your-feature-name
git commit -m "feat: add amazing feature"
git push origin feature/your-feature-name
```

Please open an [issue](https://github.com/LuthandoCandlovu/StudyMateAI/issues) first for major changes.

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React Native](https://reactnative.dev/) — Mobile framework
- [Expo](https://expo.dev/) — Build toolchain
- [Firebase](https://firebase.google.com/) — Auth & database
- [FastAPI](https://fastapi.tiangolo.com/) — Backend framework
- [scikit-learn](https://scikit-learn.org/) — ML model

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

**Built with ❤️ by [Luthando Candlovu](https://github.com/LuthandoCandlovu)**

*If this project helped you, consider giving it a ⭐ — it means a lot!*

[![GitHub followers](https://img.shields.io/github/followers/LuthandoCandlovu?style=social)](https://github.com/LuthandoCandlovu)

</div>
