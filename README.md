# 💸 Evenly – AI-Powered Expense Splitting App

Evenly is a **smart expense-splitting web app** that helps friends and groups manage shared expenses effortlessly.  
It automates debt settlements, provides **AI-driven spending insights**, and sends **payment reminders**, ensuring a seamless and transparent experience for everyone.

Live Demo - https://evenly-app-6oh6.vercel.app/


## 🚀 Key Features

### 💰 Smart Settlements
- Automatically calculates the **most efficient way to settle debts**.
- Minimizes the number of transactions between users and groups.

### 📊 AI-Powered Expense Analytics
- Uses **Gemini AI** to generate monthly insights on spending habits.
- Detects unusual spending patterns and suggests saving opportunities.

### 🔔 Automated Payment Reminders
- Sends **email reminders** for pending payments using **Resend**.
- Keeps everyone informed about outstanding balances.

### ⚡ Real-Time Updates
- Built on **Convex**, ensuring **instant data sync** across all users.
- All expenses, settlements, and balances update live.

### 🧮 Flexible Split Options
- Supports **equal splits**, **percentage-based splits**, and **custom exact amounts**.
- Perfect for both small and large groups.

### 👥 User & Group Management
- Manage friends, create groups, and track balances.
- View detailed settlement history and record payments easily.


## 🧭 App Walkthrough

### 🏠 Landing Page
- Modern UI with a hero section, app demo, testimonials, and a call-to-action button.

### 📈 Dashboard
- Displays summaries of total balance, owed amounts, and expense breakdowns.
- Includes AI insights and monthly analytics.

### 👥 Contacts & Groups
- View all contacts and groups.
- Shows who owes whom and allows easy creation of new groups.

### ➕ Adding Expenses
- Add individual or group expenses with description, amount, category, and date.
- Choose flexible split options (equal, percentage, custom).

### 💵 Settlements
- Record payments instantly; balances auto-update in real time.

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js, Tailwind CSS, Shadcn UI |
| **Backend/Database** | Convex (real-time database) |
| **Authentication** | Clerk |
| **AI Integration** | Gemini AI |
| **Email Service** | Resend |
| **Background Workflows** | Ingest |
| **Form Handling** | React Hook Form + Zod |

---

## ⚙️ Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Laxmi-Verma-21/Evenly.git
   cd Evenly

2. **Install dependencies**

npm install
# or
yarn install


3. **Setup environment variables**
Create a .env.local file in the root folder with:

NEXT_PUBLIC_CONVEX_URL=your_convex_url
CLERK_PUBLISHABLE_KEY=your_clerk_key
GEMINI_API_KEY=your_gemini_key
RESEND_API_KEY=your_resend_key


4. **Run the development server**

npm run dev
# or
yarn dev


5. **Open your browser and navigate**

http://localhost:3000

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



🛠️ ## Future Enhancements

📱 Mobile app version (e.g., React Native)

💳 Payment gateway integration (Stripe, Razorpay)

🧾 Export expense reports to PDF or CSV

🌐 Multi-language/localization support

🔐 Advanced security: 2FA, encryption at rest

📊 More advanced analytics: trend prediction, peer benchmarking

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
