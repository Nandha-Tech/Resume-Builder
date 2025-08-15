
# Resume Builder (React + Vite + MUI + Tailwind)

A clean, modern resume builder with image upload and one-click PDF export.

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Features
- Elegant MUI UI with Tailwind utilities
- Add/remove sections: Skills, Experience, Education, Projects
- Upload a profile photo (kept in memory)
- Live Preview page
- Export to PDF (html2canvas + jsPDF)

## Notes
- Data persists in memory for the session (no backend). You can wire it to your own API later.
