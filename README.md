# mindmesh-waste-insights

# MINDMESH — Campus Waste Segregation Behaviour Analysis & Intervention Platform

**MINDMESH** is a complete, polished web prototype created for **IDEAForge 2026**. It helps campus sustainability teams understand **WHY** students struggle with waste segregation, identify recurring behavioral and physical barriers, recommend evidence-based interventions, and track measurable behavioral change over time.

---

## 🌟 Key Features

1. **Student Behaviour Survey**
   - 5-step interactive, anonymized survey measuring disposal frequency, bin accessibility, label clarity, category understanding, habit/inertia, and personal values.
   - Provides instant personalized feedback on the user's primary barrier upon submission.

2. **AI-Powered Behaviour Analysis Layer**
   - Simulated NLP engine processing open-ended feedback into core themes: *Bin accessibility*, *Confusing labels*, *Habit*, *Lack of awareness*, and *Lack of motivation*.
   - Groups similar student responses and provides confidence scores, classification reasoning, and actionable AI recommendations.
   - Transparent priority scoring based on barrier frequency, reported severity, and affected locations.

3. **Campus Insights & Executive Dashboard**
   - Interactive charts built with **Recharts**: Barrier frequency, location compliance rates, segregation habit distributions, and multi-dimensional radar metrics.
   - AI Quick Insights surfacing the top campus-wide barrier and immediate recommended actions.

4. **Evidence-Based Intervention Management**
   - 12 pre-mapped intervention cards linked directly to specific barriers.
   - Interactive status lifecycle management (*Planned* → *Running* → *Completed*).
   - In-app progress logging for sustainability managers.

5. **Impact Measurement & Verification**
   - Before-and-After outcome tracking comparing baseline metrics (e.g. *54% → 71% segregation rate*, *2.6 → 4.0/5 bin clarity rating*).
   - Visual outcome comparisons verifying real-world behavior change.

6. **IDEAForge 2026 Judge Demo Mode**
   - Pre-loaded with 40 realistic, anonymized student survey responses across 5 campus locations.
   - Guided flow for quick 3–5 minute judge demonstrations.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, JavaScript (ES6+)
* **Build Tool:** Vite 6
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
* **Data Visualization:** Recharts
* **Icons:** Lucide React
* **Routing:** React Router v7

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/krsneha11052002-dot/mindmesh-waste-insights.git
   cd mindmesh-waste-insights
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License

This project was built for the IDEAForge 2026 Hackathon prototype demonstration.
