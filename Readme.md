# Bishal's Portfolio

This is a [Next.js](https://nextjs.org) portfolio project with admin panel and quiz game functionality.

## Features

- 🎮 Interactive Quiz Game (QuizTime)
- 👨‍💼 Admin Panel for content management
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure authentication system
- 📊 MongoDB integration

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BishalABPS52/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=your_deployment_url
```

4. Run the development server:

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

## Deployment on Vercel

### Quick Deploy
1. Fork this repository
2. Import to Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BishalABPS52/portfolio)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Environment Variables for Vercel
Set these in your Vercel dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: Random secret key
- `NEXTAUTH_URL`: Your deployment URL (e.g., https://yoursite.vercel.app)

## Admin Panel Access
- URL: `/admin/login`
- Username: `Bishaladmin@52abps`
- Password: `admin5pwinport3000`

## Tech Stack
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: Custom JWT
- **Deployment**: Vercel
- **Language**: TypeScript

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
