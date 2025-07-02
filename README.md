# Bishal Shrestha - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, featuring stunning animations, interactive components, and a clean design system.

## 🚀 Features

- **Modern Design**: Clean, professional interface with a red-themed color scheme
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Animations**: Smooth transitions and hover effects using Framer Motion
- **Contact Form**: Integrated contact functionality
- **CV Download**: Professional CV download feature
- **Game Zone**: Interactive games and entertainment section
- **Certificate Showcase**: Expandable certificate gallery with zoom functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Fonts**: Inter, Geist Sans

## 📁 Project Structure

```
bishal-portfolio/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── contact/        # Contact page
│   │   ├── creative/       # Creative projects
│   │   └── games/          # Game zone
│   ├── components/         # Reusable React components
│   ├── lib/               # Utility functions and configurations
│   └── models/            # Database models
├── public/                # Static assets
└── styles/                # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary Red**: `#c1121f` (Dark mode)
- **Light Red**: `#780000` (Light mode)
- **Gradient Accents**: Various red-based gradients
- **Background**: Dynamic gradient backgrounds

### Typography
- **Primary Font**: Inter
- **Secondary Font**: Geist Sans
- **Font Weights**: 300, 400, 500, 600, 700


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bishal-portfolio.git
   cd bishal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bishal-portfolio
   ADMIN_PASSWORD=your-admin-password
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎮 Features Overview

### Main Portfolio Sections

1. **Bio Card**: Personal introduction with availability status
2. **Experience Card**: Professional experience with expandable tech stacks
3. **Certificates Card**: Educational achievements with zoom functionality
4. **Contact Card**: Contact information with interactive elements
5. **CV Card**: Comprehensive CV with download feature
6. **Creative Card**: Creative projects showcase
7. **Game Card**: Interactive games and entertainment
   
### Technical Features

- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Fast loading and smooth animations
- **Type Safe**: Full TypeScript implementation
- **Modern Architecture**: Next.js 14 App Router

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Bishal Shrestha**
- Email: bs426808@gmail.com
- LinkedIn: [Bishal Shrestha](https://linkedin.com/in/bishal-shrestha)
- GitHub: [bishal-shrestha](https://github.com/bishal-shrestha)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- Vercel for seamless deployment

---

Built by Bishal Shrestha
