# 📊 Data Quality Monitoring Dashboard

A responsive web-based dashboard to visualize data quality validation results using **Great Expectations**, orchestrated by **Airflow**, and integrated with **Slack Alerts**.

![Preview](./screenshot.png) <!-- Replace with your actual screenshot if available -->

---

## 🚀 Features

- 📈 **Success rate visualization** for each dataset
- ✅ Displays Great Expectations validation results
- 🔄 Tracks daily DAG run history from Apache Airflow
- 🔔 Real-time Slack alert simulations (Critical/Warning/Success)
- 🧪 View failed expectations and validation types
- 📊 Charts powered by `recharts`
- 🌈 Beautiful UI styled using `Tailwind CSS`

---

## 🛠️ Tech Stack

| Tool/Library      | Purpose                                  |
|------------------|------------------------------------------|
| **React**         | UI Library                               |
| **Vite**          | Fast build tool                          |
| **Tailwind CSS**  | Utility-first CSS framework              |
| **Recharts**      | Data visualization (charts)              |
| **Lucide-react**  | Icons                                    |
| **Airflow (Mock)**| DAG run simulation                       |
| **Great Expectations (Mock)** | Validation simulation        |
| **Slack (Mock)**  | Alert simulation                         |

---

## 📂 Folder Structure

src/
├── components/
│ └── DataQualityMonitoringSystem.jsx
├── App.jsx
├── main.jsx
├── index.css
└── ...

yaml
Copy
Edit

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/data-quality-monitoring-dashboard.git
cd data-quality-monitoring-dashboard
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the development server
bash
Copy
Edit
npm run dev
Visit http://localhost:5173 in your browser.

📸 Screenshots
Overview Tab	DAG History	Slack Alerts

(Replace with your own screenshots if available)

⚙️ Customization
Edit mock data in DataQualityMonitoringSystem.jsx

You can integrate actual backend APIs (Airflow, GE, Slack) if needed

🧪 Future Enhancements
Live backend integration (Airflow API, GE checkpoints, Slack webhook)

Authentication and role-based access

Real-time validation trigger from UI

📄 License
MIT License — Feel free to use, share, and modify!

🙋‍♂️ Author
Made with ❤️ by Your Name

markdown
Copy
Edit

---

### ✅ To Use:
- Rename file to `README.md`
- Place in root of your project
- Add screenshots as `preview1.png`, `preview2.png`, etc.
- Update `your-username` and links accordingly

Let me know if you'd like me to help with:
- Creating preview images
- Deploying the project to Vercel or GitHub Pages
- Integrating live APIs (Airflow, Slack, GE)
