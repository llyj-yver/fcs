"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  title: string;
  description: string;
  visual: string;
  tip: string;
}

interface DressingType {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  accent: string;
  bg: string;
  steps: Step[];
}

const dressingData: DressingType[] = [
  {
    id: "oil-vinegar",
    name: "Oil & Vinegar Dressing",
    emoji: "🫒",
    tagline: "The Classic Foundation",
    color: "#4caf72",
    accent: "#1a4a2e",
    bg: "#f0faf4",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need good quality olive oil, vinegar (red wine, white, or balsamic), and a pinch of salt. The ratio is always 3 parts oil to 1 part vinegar.",
        visual: "🫒 🍶 🧂",
        tip: "Quality matters — use extra virgin olive oil for the best flavor.",
      },
      {
        title: "Measure Your Oil",
        description: "Pour 3 tablespoons of olive oil into a small bowl or jar. Olive oil forms the smooth, rich base of the dressing.",
        visual: "🥄 → 🥣",
        tip: "Use a clear jar so you can see the layers before mixing.",
      },
      {
        title: "Add the Vinegar",
        description: "Add 1 tablespoon of vinegar. The acidity of the vinegar balances the richness of the oil and brightens all the flavors.",
        visual: "🍶 → 🥣",
        tip: "Balsamic gives sweetness; red wine vinegar gives sharpness.",
      },
      {
        title: "Season with Salt",
        description: "Add a generous pinch of salt. Salt is essential — it draws out the flavors and ties the dressing together.",
        visual: "🧂 ✨",
        tip: "Taste as you go — seasoning is personal!",
      },
      {
        title: "Shake or Stir",
        description: "If using a jar, seal and shake vigorously for 10 seconds. If using a bowl, whisk quickly. The mixture will briefly combine but will separate — that's normal!",
        visual: "🫙 ↔️ 🫙",
        tip: "This is a temporary emulsion — shake again right before serving.",
      },
      {
        title: "Ready to Serve!",
        description: "Drizzle immediately over your salad. Oil and vinegar dressing works best on hearty greens like Italian salad, Greek salad, or a simple house salad.",
        visual: "🥗 ✅",
        tip: "Dress the salad just before serving so greens don't wilt.",
      },
    ],
  },
  {
    id: "emulsified",
    name: "Emulsified Dressing",
    emoji: "🥫",
    tagline: "Creamy & Stable",
    color: "#7bc67e",
    accent: "#2d6a4f",
    bg: "#f4fbf6",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need egg yolk (the emulsifier), oil, and lemon juice. The egg yolk is the secret — it contains lecithin which permanently bonds oil and water.",
        visual: "🥚 🫒 🍋",
        tip: "Use room temperature eggs for smoother emulsification.",
      },
      {
        title: "Start with the Egg Yolk",
        description: "Place one egg yolk in a bowl. This is your emulsifier — it will act as the bridge between the oil and the lemon juice.",
        visual: "🥚 → 🥣",
        tip: "Separate yolk carefully — no egg white should get in.",
      },
      {
        title: "Add Lemon Juice",
        description: "Add a tablespoon of fresh lemon juice to the yolk and whisk together. This starts building the base of the dressing.",
        visual: "🍋 + 🥚 → 🌀",
        tip: "Fresh lemon is much better than bottled here.",
      },
      {
        title: "Drizzle in Oil — Slowly!",
        description: "This is the critical step. Add oil ONE DROP AT A TIME while whisking constantly. Going too fast breaks the emulsion. Slowly increase to a thin stream.",
        visual: "🫒 💧💧💧 → 🌀",
        tip: "Patience is everything — rushing this step will cause it to break.",
      },
      {
        title: "Watch it Thicken",
        description: "As you keep whisking and adding oil, the dressing will suddenly thicken and turn creamy and pale. This is emulsification happening in real time!",
        visual: "💛 → 🍦",
        tip: "If it breaks (goes oily), add another yolk and whisk again slowly.",
      },
      {
        title: "Ready to Serve!",
        description: "Your emulsified dressing is stable — it won't separate! Use it for Caesar salad, Thousand Island, or Honey Mustard dressings.",
        visual: "🥬 ✅",
        tip: "Refrigerate and use within 2 days since it contains raw egg.",
      },
    ],
  },
  {
    id: "other",
    name: "Other Dressings",
    emoji: "🌿",
    tagline: "Unique & Creative",
    color: "#52b788",
    accent: "#1b4332",
    bg: "#edf7f1",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "For yogurt-based dressings, you'll need plain yogurt, fresh herbs, and lemon juice. These dressings are lighter, tangy, and incredibly fresh.",
        visual: "🥛 🌿 🍋",
        tip: "Greek yogurt makes a thicker, creamier dressing.",
      },
      {
        title: "Spoon the Yogurt",
        description: "Add 3–4 tablespoons of plain yogurt to a bowl. Yogurt replaces oil as the base, making this a lighter alternative to traditional dressings.",
        visual: "🥛 → 🥣",
        tip: "Full-fat yogurt gives the best texture and flavor.",
      },
      {
        title: "Chop Fresh Herbs",
        description: "Finely chop your herbs — parsley, mint, dill, or cilantro all work beautifully. Fresh herbs are what makes this dressing vibrant and alive.",
        visual: "🌿 🔪 ✨",
        tip: "Add herbs at the end to preserve their bright green color.",
      },
      {
        title: "Add Lemon Juice",
        description: "Squeeze in fresh lemon juice. The acidity brightens the yogurt and brings all the flavors together — this is what makes it taste fresh, not flat.",
        visual: "🍋 → 🥣",
        tip: "Start with half a lemon and taste before adding more.",
      },
      {
        title: "Mix & Season",
        description: "Stir everything together gently. Season with salt and pepper. Unlike oil-based dressings, this stays naturally combined — no shaking needed!",
        visual: "🥄 🌀 🧂",
        tip: "Let it sit for 5 minutes before serving so flavors meld.",
      },
      {
        title: "Ready to Serve!",
        description: "Perfect for Tahini salad, Yogurt Herb, or Avocado Lime dressings. These pair beautifully with Mediterranean and Middle Eastern style salads.",
        visual: "🥙 ✅",
        tip: "Also works as a dip for pita or vegetables!",
      },
    ],
  },
  {
    id: "temporary",
    name: "Temporary Emulsion",
    emoji: "🥗",
    tagline: "Shake Before Use",
    color: "#74c69d",
    accent: "#1b4332",
    bg: "#f0faf5",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need oil, vinegar, and mustard. Mustard acts as a partial emulsifier — it helps the dressing stay mixed longer than plain oil and vinegar, but it will still eventually separate.",
        visual: "🫒 🍶 🌭",
        tip: "Dijon mustard works best for a smoother, more stable mix.",
      },
      {
        title: "Add Mustard First",
        description: "Place a teaspoon of Dijon mustard in a jar. The mustard's lecithin will help temporarily bind the oil and vinegar together.",
        visual: "🌭 → 🫙",
        tip: "Mustard is the key — don't skip it for a proper vinaigrette.",
      },
      {
        title: "Add Vinegar",
        description: "Pour in 1 tablespoon of vinegar. Red wine vinegar is classic for a French vinaigrette, giving it a bright, sharp character.",
        visual: "🍶 → 🫙",
        tip: "Champagne vinegar gives a lighter, more elegant result.",
      },
      {
        title: "Add Oil",
        description: "Pour in 3 tablespoons of oil. Unlike an emulsified dressing, you can add it all at once — we're not building a permanent bond here.",
        visual: "🫒 → 🫙",
        tip: "A neutral oil like sunflower lets the vinegar flavor shine.",
      },
      {
        title: "Shake Vigorously",
        description: "Seal the jar and shake hard for 15–20 seconds. Watch it combine into a cloudy, unified dressing. If you leave it, it will slowly separate back.",
        visual: "🫙 ↔️↔️↔️ 🫙",
        tip: "The cloudiness means the emulsion is working!",
      },
      {
        title: "Ready to Serve — Use Immediately!",
        description: "Pour straight away over your salad. This is perfect for Vinaigrette, French Dressing, or Citrus Vinaigrette. Shake again if it separates.",
        visual: "🥗 ⚡ ✅",
        tip: "Make it fresh each time for the best flavor.",
      },
    ],
  },
  {
    id: "permanent",
    name: "Permanent Dressing",
    emoji: "🧈",
    tagline: "Set It & Forget It",
    color: "#40916c",
    accent: "#1b4332",
    bg: "#eaf6f0",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need egg yolk, oil, and vinegar. Like emulsified dressing, egg yolk is the hero here — but the technique creates an even more stable, permanent texture.",
        visual: "🥚 🫒 🍶",
        tip: "This is the base technique for making mayonnaise!",
      },
      {
        title: "Whisk the Egg Yolk",
        description: "Start with just the egg yolk in a large bowl. Whisk it alone for 30 seconds until it lightens in color slightly.",
        visual: "🥚 🌀 → 💛",
        tip: "A wider bowl gives you more control during whisking.",
      },
      {
        title: "Add Vinegar",
        description: "Add a teaspoon of vinegar and whisk into the yolk. This helps stabilize the emulsion from the start.",
        visual: "🍶 + 💛 → 🌀",
        tip: "White wine vinegar is classic for mayonnaise-style dressings.",
      },
      {
        title: "Add Oil — Drop by Drop",
        description: "Very slowly drizzle in oil while whisking constantly. This is even more critical than emulsified — go one drop at a time at first. The mixture must absorb each drop before you add more.",
        visual: "💧💧💧 🌀 → 🍦",
        tip: "Use a squeeze bottle for perfect control over the oil flow.",
      },
      {
        title: "It Becomes Thick & Stable",
        description: "The dressing becomes very thick — almost like a cream. Unlike temporary emulsion, this will NOT separate even when left to sit. The bond is permanent.",
        visual: "🍦 ≠ 💧",
        tip: "If it gets too thick, whisk in a few drops of warm water.",
      },
      {
        title: "Ready to Store & Serve!",
        description: "This dressing keeps in the fridge for up to a week without separating. Use it as the base for Ranch, Blue Cheese, or Green Goddess dressings.",
        visual: "🧀 🌿 ✅",
        tip: "Add herbs, garlic, or cheese to customize the flavor.",
      },
    ],
  },
  {
    id: "cooked",
    name: "Cooked Salad Dressing",
    emoji: "🍳",
    tagline: "Heat-Thickened & Sweet",
    color: "#95d5b2",
    accent: "#1b4332",
    bg: "#f2fbf6",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need flour, eggs, sugar, and vinegar. Unlike other dressings, this one is cooked on a stove — the heat activates the starch and eggs to create a smooth, pudding-like texture.",
        visual: "🌾 🥚 🍬 🍶",
        tip: "This is the only dressing that needs a pot and heat!",
      },
      {
        title: "Mix Dry Ingredients",
        description: "Whisk together flour and sugar in a small saucepan. The flour is your thickener — it will absorb moisture and swell when heated.",
        visual: "🌾 + 🍬 → 🥣",
        tip: "Sift the flour first to avoid lumps in your dressing.",
      },
      {
        title: "Add Eggs & Vinegar",
        description: "Beat the eggs and add them to the pan along with the vinegar. Stir everything together into a smooth, liquid mixture before turning on the heat.",
        visual: "🥚 🍶 → 🌀",
        tip: "Mix cold so the eggs don't scramble before cooking.",
      },
      {
        title: "Cook Over Medium Heat",
        description: "Place the pan on medium heat and stir constantly with a wooden spoon or whisk. Never stop stirring — the bottom can scorch quickly.",
        visual: "🔥 🥄 🌀",
        tip: "Low and slow wins — high heat will curdle the eggs.",
      },
      {
        title: "Watch it Thicken",
        description: "After 5–7 minutes of stirring, the mixture will suddenly thicken into a smooth, glossy, pudding-like consistency. Remove from heat immediately.",
        visual: "🌡️ → 🍮",
        tip: "It thickens fast at the end — don't walk away!",
      },
      {
        title: "Cool & Serve!",
        description: "Let the dressing cool slightly before using. It's perfect for Fruit Salad, Waldorf, Ambrosia, or Boiled Dressing — sweet salads that need a gentle, warm flavor.",
        visual: "🍇 🍎 ✅",
        tip: "Refrigerate leftovers — it keeps for up to 3 days.",
      },
    ],
  },
];

export default function DressingFlipbook() {
  const [selectedDressing, setSelectedDressing] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const dressing = dressingData[selectedDressing];
  const step = dressing.steps[currentStep];
  const totalSteps = dressing.steps.length;

  const goToStep = (next: number) => {
    setDirection(next > currentStep ? 1 : -1);
    setCurrentStep(next);
    if (next === totalSteps - 1) {
      setCompleted((prev: Set<string>) => new Set([...prev, dressing.id]));
    }
  };

  const selectDressing = (idx: number) => {
    setSelectedDressing(idx);
    setCurrentStep(0);
    setDirection(1);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f6", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#1b4332", color: "#d8f3dc", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#95d5b2", marginBottom: 4 }}>Culinary Tutorial</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>How to Make Salad Dressings</div>
        </div>
        <div style={{ fontSize: 13, color: "#74c69d", letterSpacing: 1 }}>
          {completed.size} / {dressingData.length} completed
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: "#2d6a4f", padding: "24px 0", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", flexShrink: 0 }}>
          {dressingData.map((d: DressingType, i: number) => (
            <button
              key={d.id}
              onClick={() => selectDressing(i)}
              style={{
                background: selectedDressing === i ? d.color + "33" : "transparent",
                border: "none",
                borderLeft: selectedDressing === i ? `3px solid ${d.color}` : "3px solid transparent",
                color: selectedDressing === i ? "#d8f3dc" : "#95d5b2",
                padding: "12px 20px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                fontFamily: "Georgia, serif",
              }}
            >
              <span style={{ fontSize: 18 }}>{d.emoji}</span>
              <div>
                <div style={{ fontWeight: selectedDressing === i ? 700 : 400, lineHeight: 1.3 }}>{d.name}</div>
                {completed.has(d.id) && (
                  <div style={{ fontSize: 10, color: d.color, letterSpacing: 1, marginTop: 2 }}>✓ DONE</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: dressing.bg, transition: "background 0.5s" }}>
          {/* Dressing Header */}
          <div style={{ padding: "28px 40px 20px", borderBottom: `2px solid ${dressing.color}40` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 48 }}>{dressing.emoji}</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: dressing.accent, marginBottom: 4 }}>{dressing.tagline}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: dressing.accent, letterSpacing: -0.5 }}>{dressing.name}</div>
              </div>
            </div>

            {/* Step Progress */}
            <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
              {dressing.steps.map((_: Step, i: number) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    border: "none",
                    cursor: "pointer",
                    background: i <= currentStep ? dressing.color : dressing.color + "33",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 12, color: dressing.accent + "99", marginTop: 8, letterSpacing: 1 }}>
              Step {currentStep + 1} of {totalSteps}
            </div>
          </div>

          {/* Step Card */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px", overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${dressing.id}-${currentStep}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ maxWidth: 680 }}
              >
                {/* Visual */}
                <div style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "32px",
                  marginBottom: 28,
                  textAlign: "center",
                  border: `1px solid ${dressing.color}44`,
                  boxShadow: `0 4px 32px ${dressing.color}22`,
                }}>
                  <div style={{ fontSize: 52, letterSpacing: 8, marginBottom: 12 }}>{step.visual}</div>
                  <div style={{
                    display: "inline-block",
                    background: dressing.color + "22",
                    color: dressing.accent,
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    padding: "4px 14px",
                    borderRadius: 20,
                    fontFamily: "Georgia, serif",
                  }}>
                    Step {currentStep + 1}
                  </div>
                </div>

                {/* Text */}
                <div style={{ marginBottom: 20 }}>
                  <h2 style={{ fontSize: 28, fontWeight: 700, color: dressing.accent, marginBottom: 12, letterSpacing: -0.5 }}>
                    {step.title}
                  </h2>
                  <p style={{ fontSize: 17, lineHeight: 1.75, color: "#444", marginBottom: 0 }}>
                    {step.description}
                  </p>
                </div>

                {/* Tip */}
                <div style={{
                  background: dressing.color + "22",
                  border: `1px solid ${dressing.color}66`,
                  borderRadius: 12,
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}>
                  <span style={{ fontSize: 16 }}>💡</span>
                  <div>
                    <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: dressing.accent, fontWeight: 700 }}>Chef&apos;s Tip: </span>
                    <span style={{ fontSize: 14, color: dressing.accent + "cc", lineHeight: 1.6 }}>{step.tip}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div style={{ padding: "20px 40px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${dressing.color}33` }}>
            <button
              onClick={() => goToStep(currentStep - 1)}
              disabled={currentStep === 0}
              style={{
                background: currentStep === 0 ? "transparent" : "white",
                border: `2px solid ${currentStep === 0 ? dressing.color + "33" : dressing.color}`,
                color: currentStep === 0 ? dressing.color + "44" : dressing.accent,
                padding: "12px 28px",
                borderRadius: 10,
                fontSize: 14,
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
                letterSpacing: 0.5,
                transition: "all 0.2s",
              }}
            >
              ← Previous
            </button>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 8 }}>
              {dressing.steps.map((_: Step, i: number) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  style={{
                    width: i === currentStep ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === currentStep ? dressing.color : dressing.color + "44",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={() => goToStep(currentStep + 1)}
                style={{
                  background: dressing.color,
                  border: "none",
                  color: dressing.accent,
                  padding: "12px 28px",
                  borderRadius: 10,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  transition: "all 0.2s",
                  boxShadow: `0 4px 16px ${dressing.color}66`,
                }}
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={() => {
                  setCompleted((prev: Set<string>) => new Set([...prev, dressing.id]));
                  const next = (selectedDressing + 1) % dressingData.length;
                  selectDressing(next);
                }}
                style={{
                  background: "#1b4332",
                  border: "none",
                  color: "#d8f3dc",
                  padding: "12px 28px",
                  borderRadius: 10,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  boxShadow: "0 4px 16px #0004",
                }}
              >
                Next Dressing →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}