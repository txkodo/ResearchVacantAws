import { Command } from 'commander';

const cmd = new Command().argument('<url>').requiredOption('-i, --id <ID>').requiredOption('-t, --text <TEXT>').showHelpAfterError();

async function main() {
  cmd.parse();
  const [url] = cmd.args;
  const { id, text } = cmd.opts();

  const a = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, text }),
  });
  console.log(await a.json());
}
main();
