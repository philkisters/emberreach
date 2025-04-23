# **Idle Co-op Settlement – Design Document**

## **1. Overview**
A web-based cooperative game for 4–6 players who build and expand a shared settlement. Through active tasks, crafting, and role specialization, the group gradually develops the village over days and weeks. The goal is collaborative progress, coordination, and responding to dynamic events.

---

## **2. Core Principles**
- Small, trust-based groups
- Shared resources and goals
- No passive resource generation – everything must be actively initiated
- Communication and coordination are key game mechanics

---

## **3. Game Systems**

### 3.1 Settlement
- Up to 6 players per settlement
- Shared progression and storage
- Buildings enable or enhance actions
- Storage is limited and must be expanded through crafted containers

### 3.2 Players
- Can do various actions (forage, mine, smith, cook, etc.)
- Level up through repeated action
- Can propose or receive tasks from others

### 3.3 Actions
- Must be manually started
- Run on timers (e.g., foraging takes 20 seconds to find either 2 wood or 10 sticks)
- Can loop until interrupted

### 3.4 Crafting & Buildings
- Buildings unlock new recipes and actions
- Crafting requires resources and time
- Example buildings: Hunting Cabin, Workshop, Storage, Kitchen

### 3.5 Task Management
- Pinboard to show current group goals (e.g., "Need 20 wood for Storage Hut")
- Tasks can be assigned to other players
- Tasks are auto-accepted after 24h of player inactivity

### 3.6 Communication
- Persistent chat for each settlement
- Pinboard for current goals and suggestions
- Event notifications (e.g., “Merchant arrives in 2 days”)

---

## **4. Resources & Items**

### 4.1 Example Resources
- Wood
- Meat
- Stone
- Rope
- Tools

### 4.2 Example Craftables
- Bow (boosts hunting yield)
- Chest (expands inventory)
- Axe (faster wood gathering)

---

## **5. Progression & Balance**

### 5.1 Skill System
- Characters improve through repetition
- Perks include:
  - Reduced action time
  - Gain access to new areas for other ressources
  - Higher yields
  - Unlock new blueprints

### 5.2 Settlement Tiers
- Settlements can level up
- Unlocks new buildings, more storage, access to events

---

## **6. Events & World Dynamics**

### 6.1 Sample Events
- Traveling Merchant (buys/sells rare goods)
- Entertainer Troupe (grants temporary buffs)
- Animal Migration (hunting bonus)
- Future: Seasonal events (spring harvests, winter scarcity)

### 6.2 World Time (Future Feature)
- Seasons affect availability of certain tasks or resources
- Weather might influence productivity

---

## **7. Technical Notes (MVP Scope)**

### 7.1 Frontend
- Vue.js with Nuxt
- Minimalist UI with text-first layout and simple icons/graphics

### 7.2 Backend
- Java with Spring Boot (REST API + socket support)
- Firebase Auth (or custom auth via Spring Security)
- Realtime: Socket.IO for chat, task updates, event alerts

### 7.3 Database
- Firestore or PostgreSQL (depending on scale/modeling needs)
- Optional Redis for timers/cache

---

## **8. MVP Scope**
- Authentication + settlement creation
- Role selection and initial tasks (e.g., hunt, gather)
- Shared inventory + basic crafting (Workbench)
- Pinboard + persistent chat
- 1–2 rotating events

---

## **9. Monetization & Future**
- Optional NPC helpers (via currency)
- Cosmetic upgrades (skins, visual packs)
- Larger community hubs or public settlements
- Mobile version

---

## **10. Open Questions**
- How to handle inactive players in the long term?
- Will there be inter-player conflicts (e.g., hoarding)?
- Any PvE or PvP systems planned?
- Skill reset or prestige/rebirth system?

