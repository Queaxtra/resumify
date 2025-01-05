# 📄 Resumify

A modern and user-friendly CV creation platform.

## 🚀 Features

- **Modern Design**: Modern and responsive interface built with Tailwind CSS
- **Easy to Use**: Simple and intuitive form structure without drag-and-drop
- **Multiple Download Options**: Download CV in PDF, PNG, and JPG formats
- **Comprehensive Sections**:
  - Personal Information
  - Education History
  - Work Experience
  - Skills
  - Certificates
  - Language Skills
  - Hobbies
  - References
  - Social Media Links
  - Projects
  - Publications
  - Awards
  - Volunteer Work

## 🛠️ Technologies Used

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Remix Icons](https://remixicon.com/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Image Processing**: [html2canvas](https://html2canvas.hertzen.com/)

## 📦 Project Structure

```
src/
├── components/
│   ├── Banner.svelte      # Homepage banner component
│   ├── Features.svelte    # Features section
│   ├── Footer.svelte      # Footer component
│   ├── HowItWorks.svelte  # How it works section
│   ├── Navbar.svelte      # Navigation component
│   └── Why.svelte         # Why Resumify section
│
└── routes/
    └── create/
        └── +page.svelte   # CV creation page
```

## 🌟 Detailed Features

### 📝 CV Creation
- Comprehensive form structure
- Real-time preview
- Photo upload support
- Dynamic section adding/removing

### 💾 Download Options
- Download as PDF
- Download as PNG
- Download as JPG

### 🎨 Design Features
- Responsive design
- Modern and clean interface
- User-friendly form elements
- Customized components

## 🚀 Installation

1. Clone the project:
```bash
git clone https://github.com/queaxtra/resumify.git
```

2. Navigate to project directory:
```bash
cd resumify
```

3. Install dependencies:
```bash
npm install
```

4. Start development server:
```bash
npm run dev
```

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.