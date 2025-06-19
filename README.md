# Fitness Tracker App

A web-based fitness tracker that lets users create an account, log workouts, and visualize progress over time.

---

## 📋 Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Development Workflow](#development-workflow)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)

---

## Features

**MVP**

* User authentication (Sign up, log in, password reset)
* Profile management (age, weight, fitness goals)
* Workout logging (exercise name, date, sets, reps, duration)
* Dashboard view (list of recent workouts + progress chart)
* Data persistence via a back-end API and database

**Phase 2 (Nice-to-Have)**

* Social sharing & friend challenges
* Nutrition logging & meal plans
* Email or SMS reminders
* Mobile-responsive design & PWA support

---

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/<your-org>/Capstone.git
   cd Capstone
   ```
2. Install dependencies (frontend & backend):

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables (see `.env.example` files).
4. Run the development servers:

   ```bash
   # In one terminal:
   cd frontend && npm run dev

   # In another terminal:
   cd backend && npm run dev
   ```
5. Open your browser at `http://localhost:3000` (frontend) and `http://localhost:4000` (API).

---

## Usage

* **Sign Up**: Create a new account with email & password.
* **Log In**: Access your dashboard.
* **Profile**: Edit your personal data and fitness goals.
* **Log a Workout**: Add exercises, sets, reps, and duration.
* **View Dashboard**: See a list of your recent workouts and a simple chart showing progress over time.

---

## Project Structure

```
├─ frontend/         # React + Vite client
│   ├─ src/          # components, pages, styles
│   └─ public/       # static assets
├─ backend/          # Node.js + Express API
│   ├─ src/          # routes, controllers, models
│   └─ tests/        # unit & integration tests
├─ .github/          # CI workflows, issue templates
├─ README.md         # this file
└─ LICENSE           # project license
```

---

## Development Workflow

1. **Branching strategy**: use `dev` for integration, feature branches `feat/xxx` for new work.
2. **Pull requests**: Open PRs against `dev`. Require at least one review and passing CI.
3. **Lint & format**: ESLint + Prettier (frontend), ESLint or other linter for backend.
4. **Commit messages**: Use concise, imperative tense (e.g., "Add login endpoint").

---

## Contributing

1. Fork the repo & clone your fork.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Commit changes & push: `git push origin feat/your-feature`.
4. Open a Pull Request against `dev`.
5. Address review feedback, then merge once approved.

Please follow the code style guidelines and write tests for new functionality.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Authors

* **Team Capstone**

  * Afif Hamim (@afif978)
  * Takibur Chowdhury (@Taki127)
  * Jason
  * Kevin Weng (@K-EV1N)

