
# AI Web Solutions — Landing Page

## Overview
A dark, high-tech landing page for AI Web Solutions with a NASA/aerospace-inspired UI. Deep black/navy backgrounds, electric blue accent lighting, and a 3D neural network visualization as the hero centerpiece. The design will feel like a mission control interface — precise, futuristic, and premium.

## Design System
- **Background**: Deep navy-black (#0a0e1a) with subtle grid/data overlays
- **Primary accent**: Electric blue (#0066ff → #00a8ff gradient)
- **Text**: Crisp white and cool gray hierarchy
- **Typography**: Inter (clean tech sans-serif) with monospace accents for data/stats
- **Visual language**: Thin glowing borders, subtle scan-line textures, hex grid patterns, glassmorphism panels

## 3D Hero — Neural Network Visualization
Interactive React Three Fiber scene using `@react-three/fiber@^8.18` and `@react-three/drei@^9.122.0`:
- Animated neural network with glowing nodes and pulsing connection lines in electric blue
- Nodes slowly orbit and reorganize, connections light up showing "data flow"
- Subtle mouse-follow parallax effect
- Floating behind/around the hero text for depth

## Page Sections

### 1. Navigation
- Sleek fixed header with transparent-to-dark scroll effect
- "AI Web Solutions" logo/wordmark left, nav links right
- Subtle blue glow underline on active/hover states

### 2. Hero Section
- 3D neural network animation as background
- Bold headline: "We Build the Future of Your Business"
- Subtext about AI-powered web development
- Two CTAs: "Start Your Project" + "See Our Work"
- Animated stats ticker (projects delivered, satisfaction rate, etc.)

### 3. Services Breakdown
- Three service cards with glassmorphism styling and blue glow borders
- **AI Website Creation** — from concept to launch
- **Website Enhancement** — upgrading existing sites with AI
- **Custom Software** — bespoke AI-powered applications
- Each card has an icon, description, and subtle hover animation

### 4. Portfolio Showcase
- Interactive showcase of 4 completed projects:
  - **RugbyConnect** — rugby recruitment platform
  - **Growing Futures Cornwall** — education services
  - **Sensory Cove** — sensory space for ASD/SEMH
  - **Serenity Hypnotherapy** — hypnotherapy app
- Each project displayed as a tilting card with screenshot, description, and link
- Category tags and tech indicators

### 5. Pricing Tiers
- Three tiers styled as mission-control panels:
  - **Launch** — basic website package for startups
  - **Orbit** — full website + enhancements for growing businesses
  - **Mission Control** — custom software + ongoing AI optimization
- Each tier with feature list, price, and CTA
- "Most Popular" highlight on middle tier with blue glow emphasis

### 6. Contact / CTA Section
- "Ready to Launch?" headline
- Clean contact form (name, email, business type, project details)
- Alternative: email and phone quick-contact
- Background: subtle neural network particles continuing from hero

### 7. Footer
- Company info, quick links, social links
- "Built with AI" tagline
- Minimal, dark, clean

## Animations & Interactions
- Scroll-triggered fade-in animations for each section
- Parallax depth on portfolio cards
- Glowing pulse effects on CTAs
- Smooth scroll navigation
- 3D scene responds subtly to scroll position
