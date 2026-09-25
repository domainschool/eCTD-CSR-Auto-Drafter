# eCTD CSR Auto-Drafter (ICH E3 Clinical Study Report AI Copilot)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![ICH E3 Standard](https://img.shields.io/badge/Standard-ICH%20E3%20Module%205.3.5.1-emerald)](https://www.ich.org/)
[![21 CFR Part 11](https://img.shields.io/badge/Compliance-FDA%2021%20CFR%20Part%2011-purple)](https://www.fda.gov/)
[![CDISC ADaM](https://img.shields.io/badge/Data%20Model-CDISC%20ADaM-cyan)](https://www.cdisc.org/)

An enterprise-grade, deterministic AI copilot designed for pharmaceutical sponsors, Contract Research Organizations (CROs), and regulatory medical writing teams. Automatically ingests structured **CDISC ADaM** biostatistical analysis datasets and drafts audit-ready **ICH E3 Clinical Study Reports (CSRs)** under **eCTD Module 5** with 100% mathematical traceability and zero floating-point hallucination risk.

---

## 🌟 Live Demo & Preview

- **Live GitHub Pages URL**: [https://domainschool.github.io/eCTD-CSR-Auto-Drafter/](https://domainschool.github.io/eCTD-CSR-Auto-Drafter/)
- **Design System**: Hyper-minimalist, cinematic dark mode (`#0A0A0A` base, aggressive glassmorphism `backdrop-blur-xl bg-white/5`, no solid borders, ambient radial glowing shaders).

---

## 🚀 Key Architectural Capabilities

1. **Deterministic Tool-Augmented Generation (TAG)**:
   - Eliminates standard LLM numerical hallucinations by compiling CDISC ADaM datasets (`ADSL`, `ADEFF`, `ADAE`) into a structured Fact Coordinate Dictionary.
   - Restricts generative models to verified slot-filling (`<cite factId="...">`), rejecting ungrounded figures with strict server-side checksum audits.

2. **Bidirectional Fact Citation & Traceability**:
   - Every statistical claim (means, standard deviations, confidence intervals, $p$-values) in the narrative prose is wrapped in an interactive token.
   - Hovering or clicking a citation highlights the exact table row and cell coordinate in the source dataset viewer.
   - Reverse cell hover illuminates the corresponding paragraph claim in real-time.

3. **FDA 21 CFR Part 11 & EMA Annex 11 Compliance**:
   - Append-only, tamper-evident audit ledger tracking dataset ingestion, AI drafting, citation navigation, manual edits, and sign-offs.
   - Real-time SHA-256 Merkle root verification.
   - Digital Electronic Signature dialog with password re-authentication and study lock freeze.

4. **Interactive Clinical Figures & Visual Analytics**:
   - Recharts-powered **Forest Plot / ANCOVA Trajectory Chart** with 95% Confidence Interval error whiskers.
   - **MedDRA System Organ Class** adverse event incidence distribution charts.
   - 300 DPI high-resolution export utility.

5. **Production eCTD Microsoft Word (`.docx`) Exporter**:
   - Exports regulatory-compliant `.docx` packages formatted with strict ICH E3 numbered headings, Arial/Times typography, 1-inch margins, confidential submission headers, and pagination footers.

6. **Educational Learning Deck & Systems Architecture**:
   - In-app 8-tab interactive curriculum covering the clinical documentation bottleneck, regulatory vocabulary, 4-tier system architecture, stakeholder personas, commercial valuations ($640k–$895k), college/resume strategies, and 1-click prompt copies.

---

## 🛠️ Tech Stack

- **Frontend & Core**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS, Custom Cinematic Dark Glassmorphism, Specular Glows
- **Icons & Visualization**: Lucide React, Recharts
- **Document Engine**: `docx` library, `file-saver`
- **Animation & Interactivity**: `canvas-confetti`, Framer-like CSS animations

---

## ⚡ Quick Start & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/domainschool/eCTD-CSR-Auto-Drafter.git
cd eCTD-CSR-Auto-Drafter

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev

# 4. Open in browser
http://localhost:3000/
```

---

## 📦 Building for Production

```bash
# Build optimized static bundle for GitHub Pages
npm run build

# Preview build locally
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License.
