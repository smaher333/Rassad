# Smart Reversal Window - Design Brainstorm

## Design Approach: Modern Security-First Interface

### Design Movement
**Minimalist Security UI** — inspired by financial dashboards and critical system interfaces. Emphasizes clarity, trust, and intentional action with a focus on user control and transparency.

### Core Principles
1. **Clarity Over Decoration** — Every visual element serves a functional purpose; no gratuitous ornamentation
2. **Progressive Disclosure** — Information and actions revealed based on context; complex details hidden until needed
3. **Intentional Friction** — Subtle visual cues that encourage deliberate action, preventing accidental confirmations
4. **Trust Through Transparency** — Clear communication of risk levels, timers, and action consequences

### Color Philosophy
- **Primary: Deep Teal/Blue** (`oklch(0.5 0.15 250)`) — Conveys security, stability, and professionalism
- **Warning/Alert: Warm Amber** (`oklch(0.7 0.15 60)`) — Draws attention to reversible actions without alarming
- **Success: Soft Green** (`oklch(0.65 0.12 150)`) — Confirms safe completion
- **Destructive: Muted Red** (`oklch(0.55 0.15 30)`) — Used sparingly for permanent actions
- **Neutral Background: Off-white** (`oklch(0.98 0.001 0)`) — Reduces eye strain; professional appearance
- **Text: Charcoal** (`oklch(0.25 0.01 250)`) — High contrast for accessibility

### Layout Paradigm
**Vertical Flow with Asymmetric Emphasis** — The main action card occupies the center with generous whitespace. A sidebar or secondary panel displays risk scoring and action history. The timer is prominently positioned above the action buttons, creating a visual hierarchy that emphasizes the time-sensitive nature.

### Signature Elements
1. **Animated Countdown Ring** — A circular progress indicator that visually represents remaining undo time; fills/depletes smoothly
2. **Risk Score Badge** — A small, color-coded indicator (Low/Medium/High) that updates based on simulated risk factors
3. **Action State Cards** — Distinct visual states (Pending, Confirmed, Reversed) with smooth transitions between states

### Interaction Philosophy
- **Deliberate Confirmations** — Buttons require a brief hover or focus state before becoming fully interactive
- **Smooth Transitions** — State changes animate smoothly (fade, slide, scale) to reinforce action consequences
- **Real-Time Feedback** — The timer updates visibly; risk scores recalculate based on simulated conditions

### Animation Guidelines
- **Countdown Ring**: Smooth linear animation; depletes at constant rate
- **State Transitions**: 300ms ease-out for state changes (pending → confirmed, pending → reversed)
- **Hover Effects**: Subtle scale (1.02) and shadow lift on interactive elements
- **Entrance**: Cards fade in and slide up slightly on mount (200ms)

### Typography System
- **Display Font**: `Sora` (bold, geometric) — for headings and risk badges
- **Body Font**: `Inter` (clean, neutral) — for descriptions and timer text
- **Hierarchy**:
  - H1: `Sora 32px bold` — Page title
  - H2: `Sora 24px semi-bold` — Action title
  - Body: `Inter 16px regular` — Descriptions
  - Small: `Inter 14px regular` — Secondary info, timer

---

## Selected Design: Modern Security-First Interface

This approach balances **professional credibility** with **user-friendly clarity**. The design emphasizes the critical nature of the undo window without creating unnecessary anxiety. The animated countdown ring and risk badge provide immediate visual feedback, while the clean layout ensures users understand their options at a glance.

**Why this works for the MVP:**
- Judges will recognize it as a serious, production-ready concept
- The visual hierarchy clearly communicates the undo window concept
- Animation and micro-interactions demonstrate polish and intentionality
- The risk scoring logic is visually represented, making the "smart" aspect obvious
