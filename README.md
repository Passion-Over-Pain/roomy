<img width="1917" height="916" alt="image" src="https://github.com/user-attachments/assets/9151c7ae-5f76-418c-818c-bd0341e519bb" />


---

## Table of Contents

- [Project Overview](#project-overview)
- [Current Features](#current-features)
- [Planned Features Roadmap](#planned-features-roadmap)
- [Technology Stack](#technology-stack)
- [Design System](#design-system)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [AI Integration](#ai-integration)
- [Routes](#routes)
- [Vision and Direction](#vision-and-direction)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Roomy is an AI-powered architectural visualization platform that transforms the way designers, architects, and studios communicate spatial ideas. At its core, Roomy converts 2D floor plan images into photorealistic 3D architectural renders using Google Gemini's vision model - removing the technical friction that sits between a sketch and a high-fidelity client presentation.

The project is currently in active alpha development, built as a learning platform that experiments with modern frontend architecture, AI vision models, and cloud-native storage through Puter.js. The goal is to make professional-grade visualization accessible, iterative, and fast.

Roomy is not trying to replace CAD tools. It is trying to sit between a flat plan and a finished presentation - closing that gap with intelligence.

---

## Current Features

| Feature | Description |
|---|---|
| 2D to 3D Floorplan Conversion | Upload a 2D floor plan and receive a photorealistic top-down 3D architectural render |
| AI-Powered Visualization | Powered by Google Gemini 2.5 Flash vision model with specialized prompt engineering |
| Project Management | Create, save, and manage multiple design projects |
| Visual Comparison | Side-by-side before/after slider to validate spatial accuracy |
| User Authentication | Secure sign-in and session management via Puter.js |
| Download and Export | Save rendered visualizations as high-resolution image files |

---

## Planned Features Roadmap

The following features are planned or in early development. The roadmap is intentionally flexible as the project evolves through experimentation.

| Feature | Status | Description |
|---|---|---|
| Room Editing | Planned | Modify layouts, dimensions, and architectural elements post-render |
| Material Inspection | Planned | Explore and apply different floor, wall, and furniture materials |
| Design Variants | Planned | Generate multiple rendering styles and design options from a single plan |
| Enhanced Sharing | In Development | Share projects publicly; infrastructure is partially in place |
| Advanced Customization | Planned | Fine-grained control over rendering parameters and aesthetic presets |
| Multi-Project Dashboard | Planned | Unified dashboard for managing and comparing multiple room designs |

---

## Technology Stack

| Category | Technology | Version |
|---|---|---|
| Framework | React Router (SSR) | 7.15 |
| UI Library | React | 19 |
| Language | TypeScript | - |
| Styling | TailwindCSS | 4.2 |
| Component Primitives | Radix UI | Latest |
| Icons | Lucide React | Latest |
| Auth, Storage, Hosting | Puter.js | Latest |
| AI Engine | Google Gemini 2.5 Flash | Vision Preview |
| Image Comparison | React Compare Slider | Latest |
| Notifications | Sonner | Latest |
| Build Tool | Vite | 8.0 |

---

## Design System

Roomy's design language is built around architectural minimalism - where whitespace is functional, typography carries weight, and color is restrained to amplify content.

### Typography

| Role | Font | Rationale |
|---|---|---|
| Headings | Cormorant Garamond | Elegant, editorial, and architecturally-inspired |
| Body | Inter | Modern, highly legible, enterprise-grade readability |

The type scale creates a clear hierarchy from display headings down to body copy, ensuring that structure is communicated visually before a user reads a single word.

### Color Palette

| Name | Hex / Value | Usage |
|---|---|---|
| Primary Dark | `#050505` | Buttons, strong emphasis, overlays |
| Soft Surface | `#F4F3F0` | Backgrounds, containers, cards |
| Background | `#FFFFFF` | Main canvas |
| Borders | `#E8E8E8` | Subtle visual divisions |
| Accent | `#6E6E6E` | Secondary text, supporting highlights |
| Overlay | `rgba(0, 0, 0, 0.45)` | Modal and image overlays |

### Design Philosophy

Roomy draws aesthetic direction from three reference points: architectural portfolio sites, luxury design studios, and modern B2B AI products. The result is an interface that feels premium without being decorative - clean, purposeful, and built to stay out of the way of the work.

Key principles:
- Whitespace is used as a design element, not an absence of content
- Every visual decision earns its place through functional clarity
- The product should feel like a tool a serious practitioner would trust

---

## How It Works

Roomy's core rendering pipeline is straightforward by design:

1. **Upload** - The user uploads a 2D floor plan image (JPG, PNG, or WebP)
2. **Encode** - The system converts the image to base64 and sends it to Puter.js for secure handling
3. **Process** - The Gemini 2.5 Flash vision model receives the image alongside a specialized architectural prompt
4. **Render** - The AI applies strict requirements: geometry preservation, text removal, material inference, and photorealistic top-down orthographic rendering
5. **Deliver** - The 3D render is returned to the interface, where the user can compare, download, or iterate

The prompt engineering layer is central to output quality. It instructs the model to match the source geometry precisely, infer furniture and room context, remove all annotation text, and render in a clean top-down architectural view.

---

## Project Structure

```
roomy/
- app/                  # Routes and page components
- components/           # Reusable React UI components
- lib/                  # Core logic: AI integration, Puter services, utilities
- private/              # Design documentation, planning notes, internal references
- public/               # Static assets (images, fonts, icons)
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Passion-Over-Pain/roomy.git
cd roomy
npm install
```

### Environment Variables

Create a `.env` file in the project root. The following variable is required:

```bash
GEMINI_API_KEY=your_google_gemini_api_key
```

Additional environment variables may be documented in `.env.example` as the project evolves.

### Development

Start the local development server:

```bash
npm run dev
```

### Build

Compile the project for production:

```bash
npm run build
```

### Production

Run the production server after building:

```bash
npm run start
```

---

## AI Integration

Roomy's rendering engine is built on Google Gemini's vision capabilities, accessed through the Puter.js cloud layer.

| Detail | Value |
|---|---|
| Provider | Google Gemini |
| Model | `gemini-2.5-flash-image-preview` |
| Input | Base64-encoded floor plan image |
| Output | Photorealistic top-down orthographic render |

The prompt engineering layer enforces the following requirements on every generation:

- **Geometry precision** - The rendered layout must match the source floor plan structurally
- **Text removal** - All annotation text, labels, and dimensions are stripped from the output
- **Realism** - Materials, lighting, and shadows are rendered with photorealistic fidelity
- **Orthographic view** - Output is always a clean top-down architectural perspective
- **Room inference** - The model infers furniture placement and room-specific materials from spatial context

---

## Routes

| Route | Description |
|---|---|
| `/` | Home page with marketing sections and user onboarding |
| `/visualizer/:id` | Main workspace for 2D to 3D conversion |
| `/studio/floor-to-3d` | Design studio interface (in development) |
| `/coming-soon` | Placeholder for upcoming features |
| `/*` | 404 not found handler |

---

## Vision and Direction

Roomy started as a deliberate learning project with a clear set of technical goals:

- **Puter.js exploration** - Real-world usage of Puter for authentication, file hosting, and cloud storage without a traditional backend
- **React Router 7** - Server-side rendering with the latest React Router ecosystem and React 19
- **AI vision tooling** - Practical application of vision models for domain-specific image transformation
- **Flexible architecture** - The codebase is structured to support pivoting, experimentation, and rapid feature addition

The project is honest about its stage. It is alpha software, built iteratively, with a growing feature set shaped by what proves interesting and useful in practice. The vision is ambitious but the execution is pragmatic - ship, learn, and improve.

---

## Contributing

Roomy is currently a personal side project. Contribution guidelines may be introduced as the project matures and the direction stabilizes. In the meantime, feel free to open issues or share feedback through GitHub.

---

## License

This project is licensed under the [MIT License](LICENSE).
