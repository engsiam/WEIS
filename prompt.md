## Mission

Transform the existing immigration web application into a **premium, award-winning digital experience** through advanced scrolling, motion design, micro-interactions, and cinematic storytelling.

**Important:** The website is already built. Do **not** redesign the entire application or replace the existing branding, content structure, routes, functionality, forms, or business logic.

Your job is to **upgrade the visual experience and interaction design** while preserving the existing application.

The final result should feel like a combination of:

* Awwwards-quality web experience
* Premium global immigration consultancy
* Modern SaaS product
* Luxury editorial design
* Cinematic storytelling
* High-end digital agency website

The user should immediately feel:

> “This is not a normal immigration website.”

---

# Core Design Principle

Use animation as a storytelling mechanism, not decoration.

Every section should reveal itself with intention.

The experience should feel:

* Smooth
* Premium
* Intelligent
* International
* Trustworthy
* Sophisticated
* Cinematic
* Fast
* Purposeful

Avoid excessive animation, random floating elements, unnecessary bouncing, or cheap template-style effects.

The motion system should feel refined and deliberate.

---

# 1. Implement a Premium Smooth Scrolling System

Create a buttery smooth scrolling experience.

Requirements:

* Smooth inertial scrolling
* Subtle momentum
* Premium easing curves
* Scroll-linked animation
* Proper accessibility fallback
* Mobile-friendly performance
* No scroll lag

If appropriate for the existing stack, use:

* Lenis for smooth scrolling
* GSAP ScrollTrigger for advanced scroll interactions
* Framer Motion for React component transitions

Do not add multiple competing animation systems unnecessarily.

Maintain excellent performance.

---

# 2. Hero Section — Cinematic Entrance

Upgrade the existing hero section into a high-impact cinematic experience.

On initial page load:

1. Background elements gradually reveal.
2. Main headline animates using a sophisticated text reveal.
3. Words or lines should enter with staggered timing.
4. Supporting content fades upward subtly.
5. CTA buttons enter last.
6. Decorative graphics or country visuals move with subtle parallax.

Use techniques such as:

* Masked text reveal
* Clip-path reveal
* Split text animation
* Stagger animation
* Blur-to-focus transition
* Subtle scale transformation

Avoid:

* Basic fade-in only
* Excessive bouncing
* Fast or aggressive movement

The hero should feel calm, powerful, and expensive.

---

# 3. Scroll Storytelling

Convert the page into a visual journey.

As the user scrolls:

* Content should progressively reveal itself.
* Important sections should feel like chapters in a story.
* Headings should animate independently from supporting text.
* Cards should enter with staggered sequencing.
* Background layers can shift subtly.
* Large typography can move at a different speed from foreground content.

Use scroll progress intentionally.

Example concept:

### Chapter 01

**Choose Your Destination**

Scroll interaction reveals destination options.

### Chapter 02

**Understand Your Eligibility**

Requirements and process appear progressively.

### Chapter 03

**Build Your Immigration Path**

A visual journey or timeline becomes active.

### Chapter 04

**Start Your Application**

CTA section becomes visually prominent.

The website should feel like the user is moving through an immigration journey.

---

# 4. Create Scroll-Triggered Section Reveals

Every major section should have its own reveal behavior.

Use a combination of:

### Text

* Fade up
* Mask reveal
* Line-by-line reveal
* Word stagger
* Blur to focus

### Images

* Scale from 1.08 to 1
* Reveal using clip-path
* Subtle parallax
* Mask expansion

### Cards

* Staggered entrance
* Slight vertical movement
* Soft opacity transition
* Very subtle rotation where appropriate

### Statistics

Animate numbers only when the section enters the viewport.

Example:

`0 → 50,000+`

`0 → 98%`

`0 → 25+ Countries`

Animations must trigger only once or intelligently reset depending on the design.

---

# 5. Horizontal Scroll Experience

Identify one suitable section, such as:

* Immigration destinations
* Countries
* Visa types
* Immigration services
* Step-by-step process

Convert it into a premium horizontal scrolling experience.

Example:

As the user scrolls vertically, the section becomes pinned.

The content then moves horizontally.

Each destination should feel like a cinematic panel.

Structure example:

**Japan → Canada → Australia → USA → Europe → Other Countries**

Each panel can include:

* Country name
* Flag
* Short description
* Visa opportunities
* Success information
* Subtle animated background

Use GSAP ScrollTrigger pinning if technically appropriate.

Ensure:

* Mobile fallback
* Touch-friendly interaction
* No broken scroll behavior

---

# 6. Destination Cards — Premium Hover Interactions

Upgrade existing destination/service cards.

On hover:

* Card slightly lifts
* Background image subtly scales
* Gradient overlay changes
* Arrow moves smoothly
* Border or glow subtly activates
* Supporting information reveals progressively

Use restrained motion.

Avoid obvious or generic “hover: scale(1.05)” effects.

Create layered interactions instead.

Example sequence:

1. Pointer enters.
2. Image slowly zooms.
3. Gradient becomes more visible.
4. Title shifts slightly.
5. Arrow animates forward.
6. Supporting metadata appears.

The effect should feel premium and intentional.

---

# 7. Immigration Journey Section

Create or enhance a visually impressive immigration journey.

Possible flow:

**Discover → Check Eligibility → Prepare Documents → Apply → Approval → New Beginning**

As the user scrolls:

* The timeline progresses.
* The active step becomes highlighted.
* A progress line fills dynamically.
* Previous steps become completed.
* The current step receives emphasis.
* Relevant visuals transition smoothly.

Use scroll progress to drive the animation.

Desktop experience can use:

* Sticky content
* Vertical timeline
* Animated progress line

Mobile should use a simplified vertical interaction.

---

# 8. Country Flag and Global Motion System

Because this is an immigration platform, introduce subtle global visual elements.

Possible elements:

* Animated country flags
* Globe-inspired patterns
* Latitude/longitude lines
* Passport stamp effects
* Travel routes
* Connection lines between countries

These must remain subtle and elegant.

Do not turn the interface into a game or travel cartoon.

Use these visuals mainly as background storytelling layers.

Create depth using:

* Slow parallax
* Opacity variation
* Layered movement
* Mouse movement interaction on desktop

---

# 9. Premium Typography Animation

Typography should become part of the experience.

Implement:

* Large editorial headings
* Scroll-based text reveal
* Highlighted keywords
* Animated underline effects
* Masked typography
* Character or word-level animation only where meaningful

For major statements, use cinematic transitions.

Example:

> Your Future
> Should Not
> Have Borders.

Reveal each line with intentional timing.

Keep readability as the highest priority.

---

# 10. Add Magnetic Micro-Interactions

Apply subtle magnetic effects to selected elements only:

* Primary CTA buttons
* Important navigation actions
* Large interactive cards

The element should slightly respond to cursor movement.

Do not apply magnetic behavior everywhere.

The movement must remain subtle and premium.

---

# 11. Cursor Interaction — Desktop Only

If appropriate, add a custom cursor experience.

Possible states:

* Default
* Explore
* View Country
* Discover
* Drag

For example:

When hovering over destination cards:

`EXPLORE →`

When hovering over a horizontal scrolling section:

`DRAG →`

The cursor should not interfere with usability.

Disable or simplify on:

* Mobile
* Touch devices
* Accessibility-focused environments

---

# 12. Navigation Animation

Upgrade the header and navigation.

Scrolling down:

* Header gradually becomes compact.
* Background gains subtle blur.
* Border or shadow appears softly.

Scrolling up:

* Navigation becomes more prominent.

Navigation interactions:

* Animated active indicator
* Smooth underline movement
* Dropdown reveal
* Staggered menu animation for mobile

The navigation should feel stable and premium.

---

# 13. Page Transition System

If the application has multiple routes/pages, implement elegant page transitions.

Examples:

* Fade + vertical movement
* Mask transition
* Subtle blur transition
* Content reveal

Do not use distracting loading animations between every page.

Transitions should be fast, approximately 300–700ms depending on context.

---

# 14. Loading Experience

Create a refined loading experience.

Avoid generic spinners.

Possible concept:

A minimal immigration-inspired loader:

* Brand logo
* Animated route/path
* Subtle progress indicator
* Short loading transition

The loader should disappear smoothly into the hero experience.

Do not artificially delay the application.

Prioritize real loading performance.

---

# 15. CTA Sections

Make important CTA sections visually memorable.

As the user approaches:

* Background transforms.
* Typography scales subtly.
* Supporting graphics enter.
* CTA receives emphasis.
* A subtle glow or gradient movement activates.

The final CTA should feel like the conclusion of the entire scrolling journey.

Possible message:

**Your Next Country Is Waiting.**

The animation should create emotional momentum without becoming distracting.

---

# 16. Background Motion

Add subtle ambient motion across the website.

Possible effects:

* Slow moving gradients
* Noise texture
* Floating blurred shapes
* Grid movement
* Global connection patterns
* Very slow parallax

Rules:

* Extremely subtle
* Low CPU/GPU cost
* Never distract from content
* Respect reduced-motion preferences

---

# 17. Motion Design System

Create a consistent animation system.

Use a limited set of easing curves.

Recommended motion characteristics:

### Fast UI Interaction

200–300ms

### Standard Component Reveal

400–700ms

### Cinematic Section Animation

800–1500ms

### Background Ambient Motion

5–20 seconds

Use consistent easing similar to:

* ease-out
* cubic-bezier curves
* smooth spring physics where appropriate

Avoid linear animation unless intentionally used.

---

# 18. Performance Requirements

This is critical.

The website must remain production-ready.

Requirements:

* No animation-related memory leaks.
* Clean up GSAP ScrollTrigger instances.
* Avoid unnecessary re-renders.
* Use transform and opacity where possible.
* Avoid expensive layout recalculations.
* Lazy load heavy visual assets.
* Disable heavy effects on low-performance devices if necessary.
* Respect prefers-reduced-motion.
* Maintain smooth mobile performance.
* Prevent cumulative layout shift.

Target:

* Smooth 60 FPS experience where hardware allows.
* No major Lighthouse regression.
* Excellent responsiveness.

---

# 19. Responsive Design

The animation experience must be responsive.

Desktop:

* Full cinematic experience
* Parallax
* Cursor interactions
* Horizontal scrolling
* Pinned sections

Tablet:

* Simplified interactions where necessary

Mobile:

* Preserve storytelling
* Remove unnecessary pinned behavior
* Replace horizontal scroll with swipe or vertical cards
* Disable expensive effects
* Maintain smooth performance

Do not simply shrink desktop animations onto mobile.

Create responsive animation behavior.

---

# 20. Accessibility

All animations must respect:

`prefers-reduced-motion`

When enabled:

* Disable smooth scrolling if necessary.
* Remove large parallax movement.
* Simplify transitions.
* Preserve all functionality.

Animations should enhance the experience, never block access to content.

---

# 21. Code Architecture

Do not create one massive animation file.

Organize the implementation cleanly.

Suggested architecture:

```text
components/
  animations/
    HeroAnimation
    TextReveal
    ScrollReveal
    MagneticButton
    HorizontalScroll
    TimelineAnimation
    PageTransition

hooks/
  useScrollAnimation
  useReducedMotion
  useMagneticEffect

lib/
  animationConfig
```

Reuse animation utilities.

Avoid duplicated animation logic.

---

# 22. Implementation Workflow

Follow this process:

### Step 1 — Audit

Analyze the existing application structure.

Identify:

* Framework
* Existing animation libraries
* Components
* Page structure
* Existing styles
* Performance bottlenecks

Do not rewrite working functionality.

### Step 2 — Animation Strategy

Before implementing, identify:

1. Hero animation
2. Scroll storytelling sections
3. Horizontal scrolling opportunity
4. Timeline/process interaction
5. Card hover interactions
6. Navigation behavior
7. Final CTA experience

### Step 3 — Implementation

Implement the experience incrementally.

Do not break the existing application.

### Step 4 — Optimization

Test:

* Desktop
* Tablet
* Mobile
* Slow devices
* Reduced motion mode

### Step 5 — Final Polish

Review the entire page while scrolling from top to bottom.

Look for:

* Animation timing conflicts
* Scroll jank
* Sudden layout shifts
* Over-animation
* Inconsistent easing
* Broken mobile interactions

Refine until the entire experience feels like one unified motion system.

---

# Critical Constraints

DO NOT:

* Redesign the existing brand unnecessarily.
* Replace working business logic.
* Break existing forms.
* Remove existing content.
* Use excessive animations.
* Add random effects just for visual noise.
* Use cheap template-style animations.
* Sacrifice performance for visual effects.
* Make every element animate.

DO:

* Preserve the existing application.
* Enhance what already exists.
* Make animation meaningful.
* Create a premium storytelling experience.
* Prioritize performance.
* Maintain accessibility.
* Keep the UI professional and trustworthy.

---

# Final Goal

The final website should feel like a **world-class digital immigration platform**, not a typical agency template.

The scrolling experience should create the feeling of moving through a journey:

**Dream → Destination → Eligibility → Process → Opportunity → Application → New Future**

Every animation should support this narrative.

The final result should be visually impressive enough to feel inspired by **Awwwards-level interactive websites**, while remaining practical, professional, fast, and conversion-focused.

First, analyze the existing codebase and current UI.

Then implement the animation system carefully without breaking existing functionality.

Do not ask for unnecessary confirmation.

Start with the highest-impact improvements first and progressively enhance the experience.
