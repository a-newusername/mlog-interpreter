const fs = require('fs');
const src = fs.readFileSync("./src.mlog", "utf8").split("\n");
let end = false;
let strict = false;

let vars = new Map();
vars.set("print", "")

for (let line = 0;line<=999999;line++) {
	if (line >= src.length) {
		console.log("[SYSTEM] Reached the end of the script");
		break;
	}
	
	let args = src[line].split(" ");
	switch (args[0]) {
		case "end":
			end = true;
			break;

		case "#strict":
			console.log("[SYSTEM] Strict mode activated")
			strict = true;
			break;

		case "print":
			if (vars.has(args[1])) {
				vars.set("print", vars.get(args[1]));
				break;
			}
			vars.set("print", args.slice(1).join(" "))
			break;

		case "jump":
			if (args[2] == "always") {
				line = --args[1]
			}
			break;

		case "printflush":
			console.log(vars.get("print"))
			vars.set("print", "")
			break;

		case "set":
			if (vars.has(args[2])) {
				vars.set(args[1], vars.get(args[2]));
				break;
			}
			vars.set(args[1], args.slice(2).join(" "))
			break;

		case "op":
			const [_, op, target, name1, name2] = args;
			const var1 = vars.get(name1) ?? (name1 ?? 0);
			const var2 = vars.get(name2) ?? (name2 ?? 0);
			vars.set(target, eval(`${var1} ${op} ${var2}`));
			break;
			
		default:
			console.log("[SYSTEM] lmao you suck at coding wtf command is this???? are you dumb lmfao (line " + line + ")")
			if (strict) end = true;
			break;
	}

	if (end) {
		console.log("[SYSTEM] Script ended")
		break;
	}
}