# Revival Motorworks

> Classic & Vintage Vehicle Specialists in Surrey, UK

## Brand Identity

### Personality
- **Premium & Professional**: British heritage aesthetic with timeless elegance
- **Trustworthy & Authentic**: Over 10 years of automotive excellence
- **Passionate & Dedicated**: Genuine love for classic vehicles

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Burgundy | `#7D2E2E` | Buttons, accents, links |
| Dark Burgundy | `#5A1F1F` | Hover states |
| Cream | `#E8DCC4` | Secondary backgrounds |
| Cream Light | `#F5F0E8` | Section backgrounds |
| Off-white | `#FAFAF8` | Main background |
| Charcoal | `#2C2C2C` | Body text, footer |
| Grey Medium | `#6B6B6B` | Muted text |

### Fonts
- **Headings**: Playfair Display (serif) - elegant, classic feel
- **Body Text**: Inter (sans-serif) - clean, readable
- **Navigation/Buttons**: Libre Franklin (sans-serif) - professional, uppercase

## Pages

### Homepage (`/`)
The main landing page with all sections:

1. **Navigation** (sticky)
   - Logo with "RM" badge on the left
   - Links: Home, Services, Gallery, Contact
   - Mobile hamburger menu

2. **Hero Section**
   - Full-screen background image with burgundy gradient overlay
   - Main headline: "Classic & Vintage Vehicle Specialists"
   - Subheading about Surrey location
   - Two call-to-action buttons

3. **Location Badge**
   - Floating pill badge below hero
   - Shows proximity to Goodwood Motor Circuit

4. **About Section**
   - Company introduction and values
   - Over 10 years experience highlighted

5. **Services Section** (5 services)
   - Servicing & Repairs
   - Welding & Fabrication
   - Electrical Diagnostics
   - Restorations
   - Motorsport Preparation
   - Interactive cards with hover effects

6. **Gallery Section**
   - 3x3 grid of project images
   - Link to Instagram

7. **Contact Section**
   - Workshop address in Fernhurst, Haslemere
   - Phone: 07886 877194
   - Email: info@revival-motorworks.co.uk
   - Opening hours
   - Embedded Google Map
   - Social media links

8. **Footer**
   - Copyright and tagline

## Components & Features

### Interactive Elements
- **Sticky Navigation**: Changes appearance on scroll
- **Mobile Menu**: Animated hamburger menu
- **Service Cards**: Hover reveals description with burgundy overlay
- **Gallery Images**: Scale and saturation effect on hover
- **Buttons**: Lift effect with shadow on hover
- **Sections**: Fade-in animation on scroll

### Responsive Design
- Fully responsive from mobile to desktop
- Mobile: Single column layouts, hamburger menu
- Tablet: 2-column grids
- Desktop: 3-column grids, full navigation

## Technical Details

### Files
- `app/layout.tsx` - Root layout with fonts and metadata
- `app/page.tsx` - Main landing page
- `app/globals.css` - Brand colors, custom styles, animations

### External Resources
- Google Fonts: Playfair Display, Inter, Libre Franklin
- Placeholder images from Unsplash (to be replaced with actual photos)
- Google Maps embed for location

## How to Customize

### To change the brand colors:
Edit `app/globals.css` and update the CSS variables in the `:root` section.

### To update contact information:
Edit `app/page.tsx` and search for the contact section (around line 345).

### To add your own images:
1. Place images in the `public/` folder
2. Update the image URLs in `app/page.tsx`:
   - Hero background (line 172)
   - Service card images (lines 11-32)
   - Gallery images (lines 36-46)

### To change the map location:
Replace the Google Maps embed URL in `app/page.tsx` (around line 469) with your actual business location.

## Recent Changes

- **February 2026**: Initial site build
  - Created complete single-page landing site
  - Added all 8 sections as specified
  - Implemented interactive service cards with hover effects
  - Added scroll-triggered fade-in animations
  - Set up responsive navigation with mobile menu
  - Configured brand colors and typography
