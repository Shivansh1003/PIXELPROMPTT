import { createFileRoute } from "@tanstack/react-router";

import { SnapIn } from "@/components/minecraft/SnapIn";
import { PixelClouds } from "@/components/minecraft/PixelClouds";
import { FallingBlocks } from "@/components/minecraft/FallingBlocks";
import { Hotbar } from "@/components/minecraft/Hotbar";
import { Torch } from "@/components/minecraft/Torch";
import { MobEncounters } from "@/components/minecraft/MobEncounters";
import { BreakableBlock } from "@/components/minecraft/BreakableBlock";
import { PunchableSteve } from "@/components/minecraft/PunchableSteve";

import heroCastle from "@/assets/hero-castle.jpg";
import buildBastion from "@/assets/build-bastion.jpg";
import buildCabin from "@/assets/build-cabin.jpg";
import buildLibrary from "@/assets/build-library.jpg";
import caveMine from "@/assets/cave-mine.jpg";
import steveImg from "@/assets/steve.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steve — Builder, Miner, Survivor | Overworld Portfolio" },
      {
        name: "description",
        content:
          "The portfolio of Steve: 1.2M blocks placed, 27 builds finished, and a full log of mining expeditions and mob encounters across the Overworld.",
      },
      { property: "og:title", content: "Steve — Builder, Miner, Survivor" },
      {
        property: "og:description",
        content:
          "Greatest builds, deep-cavern hauls, and mob encounters from the Overworld's most stubborn block-placer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BUILDS = [
  {
    img: buildBastion,
    tag: "SURVIVAL",
    tagTone: "bg-nether/25 text-nether",
    blocks: "12,400 BLOCKS",
    title: "The Obsidian Bastion",
    body: "A lava-tempered fortress guarding the Nether portal vault, reinforced with 900 obsidian blocks after the third creeper incident.",
  },
  {
    img: buildCabin,
    tag: "CREATIVE",
    tagTone: "bg-grass/25 text-grass",
    blocks: "6,800 BLOCKS",
    title: "Birch Hollow Cabin",
    body: "A snow-wrapped hideaway with a working redstone furnace, lantern-lit dock, and a hidden storage crawlspace beneath the floor.",
  },
  {
    img: buildLibrary,
    tag: "SURVIVAL",
    tagTone: "bg-diamond/20 text-diamond",
    blocks: "21,300 BLOCKS",
    title: "The End Library",
    body: "A grand archive of every enchantment, lit by 400 sea lanterns and powered by a beacon core buried four floors down.",
  },
];

const HAULS = [
  { tone: "bg-diamond", name: "Diamond Rich Vein", meta: "Y-58 · 42 FOUND" },
  { tone: "bg-gold", name: "Netherite Scrap", meta: "Y-20 · 11 FORGED" },
  { tone: "bg-dirt", name: "Ancient Debris", meta: "Y-12 · 9 CLAIMED" },
  { tone: "bg-destructive", name: "Redstone Pocket", meta: "Y-44 · 318 MINED" },
];

const SKILLS = [
  { name: "Mining", filled: 9, tone: "bg-diamond" },
  { name: "Crafting", filled: 9, tone: "bg-dirt" },
  { name: "Redstone", filled: 7, tone: "bg-destructive" },
  { name: "Combat", filled: 6, tone: "bg-stone" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b-4 border-dirt-dark bg-deep/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-8 place-items-center bg-grass pixel-block">
              <span className="font-pixel text-[8px] text-deep">S</span>
            </span>
            <span className="font-pixel text-[10px] text-foreground">STEVE.exe</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
            <a href="#builds" className="transition-colors hover:text-gold">
              Builds
            </a>
            <a href="#mining" className="transition-colors hover:text-gold">
              Expeditions
            </a>
            <a href="#skills" className="transition-colors hover:text-gold">
              Skills
            </a>
            <a href="#mobs" className="transition-colors hover:text-gold">
              Mobs
            </a>
          </nav>
          <a
            href="#contact"
            className="bg-gold px-4 py-3 font-pixel text-[8px] text-deep pixel-block lift-block"
          >
            HIRE STEVE
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-sky-deep">
        <div className="absolute inset-0 bg-gradient-to-b from-sky to-sky-deep" aria-hidden />
        <PixelClouds />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 bg-deep/60 px-3 py-2">
              <span className="size-2 animate-flicker bg-gold pixel-block-sm" aria-hidden />
              <span className="font-pixel text-[8px] text-foreground/80">
                SURVIVAL MODE · DAY 1,204
              </span>
            </div>
            <h1 className="font-pixel text-2xl leading-[1.6] text-gold pixel-shadow sm:text-3xl">
              BLOCK BY BLOCK,
              <br />
              STEVE BUILT
              <br />
              THE WORLD
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/85">
              Builder. Miner. Adventurer with a diamond pickaxe. From a one-night dirt hut to a
              floating sky-castle — these are the structures, the deep-cavern hauls, and the mobs
              that got in the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#builds"
                className="bg-grass px-6 py-4 font-pixel text-[10px] text-deep pixel-block lift-block"
              >
                VIEW GREATEST BUILDS
              </a>
              <a
                href="#contact"
                className="border-4 border-foreground/40 px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Open the crafting table →
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                ["1.2M", "Blocks placed"],
                ["340K", "Blocks mined"],
                ["27", "Builds finished"],
                ["3", "Bases standing"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-pixel text-sm text-gold pixel-shadow-sm">{value}</dt>
                  <dd className="mt-2 text-xs text-foreground/60">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative bg-deep/50 p-4 pixel-frame">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-pixel text-[9px] text-foreground/60">NOW BUILDING</span>
                <span className="size-2 animate-flicker bg-grass pixel-block-sm" aria-hidden />
              </div>
              <BreakableBlock
                src={heroCastle}
                alt="A blocky cobblestone castle with golden roof spires on a green hill"
                width={1024}
                height={1024}
                hitsRequired={5}
                tone="bg-stone"
                achievementTitle="ACHIEVEMENT GET!"
                achievementSubtitle="Block Broken"
              />
              <PunchableSteve src={steveImg} width={672} height={992} />
              <div className="mt-4">
                <p className="text-sm font-semibold text-foreground">Sky-Castle, Phase 3</p>
                <div className="mt-2 h-3 w-full bg-deep pixel-block-sm">
                  <div className="h-full w-[68%] bg-gold" />
                </div>
                <p className="mt-2 font-pixel text-[8px] text-foreground/50">68% COMPLETE</p>
              </div>
              <div className="mt-5">
                <Hotbar />
              </div>
            </div>
          </div>
        </div>
        {/* Grass-and-dirt ground strip */}
        <div aria-hidden className="relative h-10">
          <div className="absolute inset-x-0 top-0 h-3 bg-grass" />
          <div className="absolute inset-x-0 top-3 bottom-0 bg-dirt" />
        </div>
      </section>

      {/* Builds */}
      <section id="builds" className="bg-cave py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SnapIn className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-pixel text-[8px] text-gold">SECTION 01</span>
              <h2 className="mt-3 font-pixel text-base text-foreground pixel-shadow sm:text-lg">
                GREATEST BUILDS
              </h2>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">27 total builds</span>
          </SnapIn>

          <div className="grid gap-6 md:grid-cols-3">
            {BUILDS.map((build, i) => (
              <SnapIn key={build.title} delay={i * 110}>
                <article className="h-full border-4 border-stone-dark bg-card lift-block hover:border-gold">
                  <img
                    src={build.img}
                    alt={build.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover crisp"
                  />
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-1 font-pixel text-[7px] ${build.tagTone}`}>
                        {build.tag}
                      </span>
                      <span className="font-pixel text-[7px] text-muted-foreground">
                        {build.blocks}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{build.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{build.body}</p>
                  </div>
                </article>
              </SnapIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mining */}
      <section
        id="mining"
        className="relative overflow-hidden border-t-4 border-dirt-dark bg-deep py-20"
      >
        <FallingBlocks />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <SnapIn>
            <div className="flex items-center gap-4">
              <Torch />
              <div>
                <span className="font-pixel text-[8px] text-gold">SECTION 02</span>
                <h2 className="mt-3 font-pixel text-base text-foreground pixel-shadow sm:text-lg">
                  MINING EXPEDITIONS
                </h2>
              </div>
            </div>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Deep below the surface at Y-58, where the diamonds and netherite hide. Every haul is
              logged with depth and yield — including run 47, which one creeper nearly ended.
            </p>
            <ul className="mt-7 space-y-3">
              {HAULS.map((haul) => (
                <li
                  key={haul.name}
                  className="flex items-center justify-between gap-4 border-4 border-stone-dark bg-cave px-4 py-3 lift-block hover:border-gold"
                >
                  <span className="flex items-center gap-3">
                    <span className={`size-7 ${haul.tone} pixel-block-sm`} aria-hidden />
                    <span className="font-semibold text-foreground">{haul.name}</span>
                  </span>
                  <span className="font-pixel text-[8px] text-gold">{haul.meta}</span>
                </li>
              ))}
            </ul>
          </SnapIn>

          <SnapIn delay={120}>
            <img
              src={caveMine}
              alt="A stone cave tunnel lit by a torch, with glowing diamond ore in the walls"
              width={1024}
              height={768}
              loading="lazy"
              className="w-full crisp pixel-frame"
            />
          </SnapIn>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-cave py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12">
          <SnapIn className="lg:col-span-4">
            <span className="font-pixel text-[8px] text-gold">SECTION 03</span>
            <h2 className="mt-3 font-pixel text-base text-foreground pixel-shadow sm:text-lg">
              SKILL LEVELS
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Measured in blocks, not percentages. Each square is earned in the field and never
              rounded up.
            </p>
          </SnapIn>

          <div className="grid gap-7 sm:grid-cols-2 lg:col-span-8">
            {SKILLS.map((skill, i) => (
              <SnapIn key={skill.name} delay={i * 80}>
                <div className="flex items-baseline justify-between">
                  <span className="font-pixel text-[9px] text-foreground">{skill.name}</span>
                  <span className="font-pixel text-[8px] text-muted-foreground">
                    {skill.filled}0 / 100
                  </span>
                </div>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 10 }).map((_, b) => (
                    <span
                      key={b}
                      className={`h-6 flex-1 pixel-block-sm ${
                        b < skill.filled ? skill.tone : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
              </SnapIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mobs */}
      <MobEncounters />

      {/* Contact */}
      <section id="contact" className="border-t-4 border-dirt-dark bg-deep py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <SnapIn>
            <span className="font-pixel text-[8px] text-gold">SECTION 05</span>
            <h2 className="mt-3 font-pixel text-base text-foreground pixel-shadow sm:text-lg">
              COMMISSION A BUILD
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Taking on one large-scale build each season. Redstone contraptions, terrain shaping,
              and Nether routing are the specialties. Replies come before the next night cycle.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              {[
                ["Server", "overworld.net"],
                ["Status", "Accepting one build"],
                ["Response", "Under 1 night"],
                ["Based", "Any biome"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b-2 border-stone-dark pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </SnapIn>

          <SnapIn delay={110}>
            <form
              className="space-y-4 bg-cave p-6 pixel-frame"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="block">
                <span className="font-pixel text-[8px] text-muted-foreground">YOUR NAME</span>
                <input
                  className="mt-2 w-full bg-input px-3 py-3 text-foreground outline-none pixel-block-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-gold"
                  placeholder="Alex the Archer"
                />
              </label>
              <label className="block">
                <span className="font-pixel text-[8px] text-muted-foreground">THE BUILD</span>
                <textarea
                  rows={4}
                  className="mt-2 w-full resize-none bg-input px-3 py-3 text-foreground outline-none pixel-block-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-gold"
                  placeholder="An automated melon farm, roughly 2,048 blocks…"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-gold px-6 py-4 font-pixel text-[10px] text-deep pixel-block lift-block"
              >
                SEND THE MINECART
              </button>
            </form>
          </SnapIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-dirt-dark bg-cave py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center bg-grass pixel-block">
              <span className="font-pixel text-[8px] text-deep">S</span>
            </span>
            <span className="font-pixel text-[10px] text-foreground">STEVE.exe</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Day 1,204 · Crafted block by block. A fictional portfolio, no mobs harmed.
          </p>
        </div>
      </footer>
    </div>
  );
}
