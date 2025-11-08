#!/usr/bin/env node

import {Command} from "commander";

const c = new Command();

c.command("add [name]")
  .description("Add a component to your project")
  .action(async (name) => {
    if (!name) {
      const { component } = await inquirer.prompt([
        { type: "input", name: "component", message: "Component name:" }
      ]);
      name = component;
    }
    const src = path.join(__dirname, "../templates", name);
    const dest = path.join(process.cwd(), "src", "components", name);
    await fs.copy(src, dest);
    console.log(`✅ Added ${name}`);
  });

program.parse();