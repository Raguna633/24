---
design-system:
  name: "Reminiscence"
  version: "1.2.0"
  core_tokens:
    colors:
      primary:
        - name: "Vintage Beige"
          hex: "#f5f0ea"
          rgb: [245, 240, 234]
          usage: "Main background, page containers"
      accent:
        - name: "Deep Indigo"
          hex: "#2a358f"
          rgb: [42, 53, 143]
          usage: "Headings, primary buttons, interactive emphasis"
      secondary:
        - name: "Midnight Blue"
          hex: "#3b507d"
          rgb: [59, 80, 125]
          usage: "Muted text, subheaders, decorative elements"
      neutral:
        - name: "Soft Gray"
          hex: "#9ca3af"
          rgb: [156, 163, 175]
          usage: "Secondary text, counts, metadata"
    typography:
      families:
        heading: ["Poppins", "Orbitron", "qontra"]
        body: ["Inter"]
        mono: ["JetBrains Mono"]
        script: ["Handwriting", "Typewriter"]
      scales: 
        - name: "Giant"
          size: "clamp(2.5rem, 10vw, 12rem)"
          usage: "Hero splash titles"
        - name: "Hero"
          size: "clamp(1.5rem, 6vw, 4rem)"
          usage: "Section headers"
        - name: "Display"
          size: "5xl - 7xl"
          usage: "Page section titles"
    radii:
      card: "8px"
      image: "16px"
      hero-image: "40px"
    shadows:
      card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      hover: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    motion:
      easings:
        emphasized: "power4.out"
        standard: "power2.out"
        expressive: "back.out(1.5)"
      durations:
        slow: "1.8s"
        standard: "0.6s"
        fast: "0.3s"
  theme_variants:
    smk:
      tech-retro:
        name: "Tech/Retro (A PPLG)"
        visuals: ["Windows XP simulation", "Pixelated icons", "Code-rain overlays"]
      cyber-lab:
        name: "Cyber-Lab (B APL)"
        visuals: ["Digital dashboard", "Duotone filters", "Scanning crosshairs"]
      botanica:
        name: "Organic Botanica (C APL)"
        visuals: ["Floating botanical illustrations", "Radial soft-gradients", "Asymmetric layouts"]
    mplb:
      vintage-office:
        name: "Vintage Office / Aesthetic Journal"
        visuals: ["Scrapbook journal", "Paper/Grid textures", "Sticky notes", "Staple graphics"]
    ipa:
      cosmic:
        name: "Cosmic / Constellation"
        visuals: ["Starry night sky", "Constellation lines", "Planet illustrations"]
      vintage-science:
        name: "Vintage Anatomy / Flora"
        visuals: ["Encyclopedia collage", "Vintage floral vectors", "Parchment paper"]
    ips:
      hypebeast:
        name: "Streetwear / Hypebeast Magazine"
        visuals: ["Fashion magazine style", "Torn paper", "Grunge stickers", "Blok highlighter"]
      y2k-polaroid:
        name: "Polaroid Wall / Y2K Aesthetic"
        visuals: ["Scattered polaroids", "Clothespin strings", "Y2K sparkles", "Cassette icons"]
---

# Design Narrative: Reminiscence & Thematic Chapters

The "Reminiscence" design system is a multi-layered framework. It provides a formal, premium baseline while allowing for "Thematic Chapters" that reflect the unique identity of each major and classroom.

## Design Intent: The Baseline

Every page shares a common **Reminiscence Baseline**:
1. **Nostalgic Paper**: "Vintage Beige" creates a tactile, physical feel.
2. **Standard Storytelling Flow**: Hook (Hero) -> Content (Memories) -> Tail (CTA).
3. **Immersive Motion**: GSAP-driven entrance sequences that prioritize smoothness and "Wow" factor.

## Thematic Chapters (Variants)

Variants are organized by Major (*Jurusan*) to maintain a cohesive narrative across related classes.

### 1. SMK (Sains, Matematika, Kejuruan)
- **Tech/Retro**: Software engineering focus. Merges modern tech icons with a Windows XP simulation.
- **Cyber-Lab**: Laboratory analysis focus. High-contrast, dark mode, and scanning line overlays.
- **Organic Botanica**: Artistic lab focus. Organic shapes, radial gradients, and floating molecules.

### 2. MPLB (Manajemen Perkantoran dan Layanan Bisnis)
- **Vintage Office / Aesthetic Journal**: A tactile scrapbook feel. Elements like washi tape, coffee stains, and paper clips anchor the "Office" identity in a nostalgic, aesthetic way. Uses typewriter fonts for quotes.

### 3. IPA (Science)
- **Cosmic / Constellation**: Explores the vastness of space. Dark backgrounds with floating planet illustrations and glowing lines connecting the "stars" (students).
- **Vintage Anatomy / Flora**: A classical science approach. Uses floral vectors and parchment paper textures to evoke the feel of a 19th-century encyclopedia.

### 4. IPS (Social)
- **Streetwear / Hypebeast Magazine**: Bold, loud, and dynamic. Uses torn paper transitions, grunge textures, and highlighter-style accents to capture pop culture energy.
- **Polaroid Wall / Y2K Aesthetic**: Playful and intimate. Scattered polaroid frames with clothespins, sparkly icons, and handwriting fonts for a "shared memory" look.

## Universal Components

- **The Island Cards**: Student photos are treated as "islands" of memory, using lift-on-hover and lift shadows. Transitions vary by theme (e.g., Polaroid frames vs. Digital borders).
- **The Story Reveal**: Text elements that emerge from hidden containers, emphasizing the "unveiling" of historical moments.
- **Cross-Section Gradients**: The `FadeOverlay` component ensures that even as themes change, the transition between them feels like turning a page in a well-crafted book.
