# ExpenseTracker

A fullstack personal finance management app built with Next.js 16, TypeScript, and PostgreSQL.

🔗 **Live Demo:** [Add link after deploy]

---

## Features

- 🔐 Authentication — email/password and Google OAuth
- 💰 Track income and expenses — add, edit, delete transactions
- 📊 Auto-updating charts by month and category
- ✈️ Trips — plan trips and track budgets separately
- 📧 Email financial reports via Resend
- 🌍 Currency settings
- 📱 Responsive design

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Auth.js (NextAuth)
- **UI:** Material UI (MUI)
- **Charts:** Recharts
- **Email:** Resend
- **Deployment:** Vercel + Supabase

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Al1k04/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in the root directory:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="your-secret"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
RESEND_API_KEY="your-resend-api-key"
```

4. Run database migrations:

```bash
npx prisma migrate deploy
```

5. (Optional) Seed the database:

```bash
npx prisma db seed
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Author

Built by **Alik Avetikov** — fullstack developer in training.

GitHub: [@Al1k04](https://github.com/Al1k04)
