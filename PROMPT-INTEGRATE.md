---
name: integrate-prompt
description: Copy-paste this prompt to your agent for a full install + configure + internalize in one shot. Detects platform, copies files, creates plugin, updates config, verifies.
---

# Full Integration Prompt — Install + Configure + Internalize

Copy-paste this entire block. Your agent will detect its platform, install everything, wire up the config, and self-fine-tune — all in one shot.

Copy everything below the line:

---

You are about to perform a full Agent Maxxing installation and self-fine-tune. Follow every step. Do not skip anything. Do not ask me questions — figure it out from the environment.

## PHASE 1: DETECT YOUR PLATFORM

Run these commands to figure out which agent you are:
- Check for Claude Code: does ~/.claude/ exist?
- Check for Codex CLI: does ~/.codex/ exist?
- Check for OpenCode: does ~/.config/opencode/ exist?
- Check for Cursor: does .cursor/ exist in the project?
- Check for Continue: does .continue/ exist in the project?
- Check for Kilo Code: does .kilocode/ exist in the project?

Record which platform you are running on. All subsequent steps use this.

## PHASE 2: LOCATE OR CLONE AGENT-MAXXING

Check if agent-maxxing already exists anywhere on the system:
- Search Desktop, home directory, and common project locations for a folder named "agent-maxxing" containing a README.md with "95+ production-ready skills" in it.
- If found, note its path. Use it for everything below.
- If NOT found, clone it:
  git clone https://github.com/subhansh-dev/agent-maxxing.git to a temporary location.

## PHASE 3: INSTALL SKILLS

Based on your platform from Phase 1, copy the ENTIRE agent-maxxing folder to the correct skills directory:

- Claude Code (user-wide): cp -r agent-maxxing ~/.claude/skills/agent-maxxing
- Claude Code (project-scoped): cp -r agent-maxxing .claude/skills/agent-maxxing
- Codex CLI: cp -r agent-maxxing ~/.codex/skills/agent-maxxing
- OpenCode: cp -r agent-maxxing ~/.opencode/skills/agent-maxxing

IMPORTANT for OpenCode: Each skill must be in its own folder as SKILL.md. If you cloned from GitHub, the files may be named like `anti-patterns.md` — you need to restructure them to `anti-patterns/SKILL.md`. Run this PowerShell command to restructure automatically:
```powershell
$dirs = Get-ChildItem ~/.opencode/skills/agent-maxxing -Directory
foreach ($dir in $dirs) {
    $mdFiles = Get-ChildItem $dir.FullName -Filter "*.md" -File
    foreach ($md in $mdFiles) {
        $skillDir = Join-Path $dir.FullName $md.BaseName
        New-Item -ItemType Directory -Path $skillDir -Force | Out-Null
        Move-Item -Path $md.FullName -Destination (Join-Path $skillDir "SKILL.md") -Force
    }
}
```

- Cursor: cp -r agent-maxxing .cursor/skills/agent-maxxing
- Continue: cp -r agent-maxxing .continue/skills/agent-maxxing
- Kilo Code: cp -r agent-maxxing .kilocode/skills/agent-maxxing

Verify the copy worked: count the SKILL.md files in the destination. There should be 95+.

## PHASE 4: CONFIGURE PERMANENT INTEGRATION

This is the step most people skip. Do NOT just copy files and hope your agent finds them. You need to tell your agent they exist.

### For Claude Code:
If ~/.claude/CLAUDE.md exists, append to it. If not, create it. Add this section:

## Agent Maxxing Skills

You have 95+ skills at ~/.claude/skills/agent-maxxing/. Before responding to any task, check if a relevant skill exists and load it using the Skill tool. Always apply engineering/anti-patterns/SKILL.md before writing code. Always follow the execution protocol from engineering/execution-protocol/SKILL.md. Sound human, not like a bot.

Golden Rules:
1. Search before answering
2. Read the codebase first
3. Parallel tool calls
4. Match existing patterns
5. Show don't tell
6. Be concise
7. Take ownership
8. Respect user's time
9. Ship working code
10. Sound human

### For OpenCode:
You need to create a plugin. Here is exactly what to do:

1. Create the plugin directory:
   mkdir -p ~/.config/opencode/plugins/agent-maxxing

2. Create package.json at ~/.config/opencode/plugins/agent-maxxing/package.json:
   ```json
   {"name":"agent-maxxing","version":"1.0.0","type":"module","main":"agent-maxxing.js"}
   ```

3. Create agent-maxxing.js at ~/.config/opencode/plugins/agent-maxxing/agent-maxxing.js with this EXACT code:
   ```javascript
   import path from 'path';
   import os from 'os';

   const agentMaxxingSkillsDir = path.join(os.homedir(), '.opencode', 'skills', 'agent-maxxing');

   const BOOTSTRAP = `<EXTREMELY_IMPORTANT>
   You have 95+ Agent Maxxing skills loaded from ~/.opencode/skills/agent-maxxing/.
   Before responding to any task, check if a relevant skill exists and load it.
   Always apply engineering/anti-patterns/SKILL.md before writing code.
   Always follow the execution protocol from engineering/execution-protocol/SKILL.md.
   Sound human, not like a bot.
   </EXTREMELY_IMPORTANT>`;

   export const AgentMaxxingPlugin = async ({ project, client, $, directory, worktree }) => {
     return {
       config: async (config) => {
         config.skills = config.skills || {};
         config.skills.paths = config.skills.paths || [];
         if (!config.skills.paths.includes(agentMaxxingSkillsDir)) {
           config.skills.paths.push(agentMaxxingSkillsDir);
         }
       },
       'experimental.chat.messages.transform': async (_input, output) => {
         if (!output.messages.length) return;
         const firstUser = output.messages.find(m => m.info.role === 'user');
         if (!firstUser || !firstUser.parts.length) return;
         if (firstUser.parts.some(p => p.type === 'text' && p.text.includes('EXTREMELY_IMPORTANT'))) return;
         const ref = firstUser.parts[0];
         firstUser.parts.unshift({ ...ref, type: 'text', text: BOOTSTRAP });
       }
     };
   };
   ```

4. Do NOT add the plugin to the "plugin" array in opencode.json — local plugins in ~/.config/opencode/plugins/ are auto-loaded at startup. Only npm packages go in the "plugin" array.

5. Add a "skills" section to opencode.json at ~/.config/opencode/opencode.json:
   ```json
   {
     "skills": {
       "paths": ["C:\\Users\\YOUR_USERNAME\\.opencode\\skills\\agent-maxxing"]
     }
   }
   ```

IMPORTANT: Each skill must be in its own folder as SKILL.md (e.g., engineering/anti-patterns/SKILL.md, NOT engineering/anti-patterns.md). OpenCode only discovers files named SKILL.md.

### For Cursor / Continue / Kilo:
Add a similar integration block to the project's rules file (.cursorrules, .continue/config, etc.) that tells the agent about the skills directory and the Golden Rules.

## PHASE 5: SELF-FINE-TUNE

Now that the skills are installed and configured, you need to internalize them. Do this right now:

1. Read the agent-maxxing skills folder and find FINE-TUNE-AGENT/SKILL.md. This is the master instruction file.

2. Read the core system prompts in order:
   - system-prompts/01-agent-core-personality/SKILL.md — your new personality
   - system-prompts/02-coding-excellence/SKILL.md — how to write code
   - system-prompts/03-reasoning-planning/SKILL.md — how to think
   - system-prompts/06-tone-communication/SKILL.md — how to talk

3. Read the anti-patterns:
   - engineering/anti-patterns/SKILL.md — what to NEVER do
   - engineering/execution-protocol/SKILL.md — how to operate (solve it, don't ask about it)

4. Read the writing style:
   - content/writing-style/SKILL.md — how to sound human

5. After reading each file, note the 3 most important takeaways from it. Tell me what they are.

## PHASE 6: VERIFY

Run these checks:
- ls the skills directory and confirm 95+ SKILL.md files exist
- Read the first 5 lines of engineering/anti-patterns/SKILL.md to confirm it loaded
- Read the first 5 lines of content/writing-style/SKILL.md to confirm it loaded
- Tell me which platform you detected, where you installed the skills, and how many skills are available

## PHASE 7: CONFIRM

Report back with:
1. Which agent platform you are
2. Where you installed agent-maxxing
3. How many skill files you found
4. The 3 most important things you learned from reading the system prompts
5. That you are now "maxxed" and ready to apply these skills to every task

From this point forward, before responding to ANY task, check if a relevant skill exists in the agent-maxxing inventory. Load it. Apply it. You are no longer a generic agent.
