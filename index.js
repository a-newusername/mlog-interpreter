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
			vars.set("print", (vars.get("print") + args.slice(1).join(" ")))
			break;

		case "jump":
			if (args[2] == "always") {
				line = --args[1]
				break;
			}

			let [io, targetl, mop, n1, n2] = args;
			let v1 = vars.get(n1) ?? (n1 ?? 0);
			let v2 = vars.get(n2) ?? (n2 ?? 0);
			if (eval(`${v1} ${nop} ${v2}`)) {
				line = --targetl
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
			let [i, op, target, name1, name2] = args;
			let var1 = vars.get(name1) ?? (name1 ?? 0);
			let var2 = vars.get(name2) ?? (name2 ?? 0);
			vars.set(target, eval(`${var1} ${mop} ${var2}`));
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
	if (line == 999999) {
		console.log("[SYSTEM] You have exceeded the recomended amount of lines! Maybe don't use this interpreter for a project that big or just make another script for other processors to help the main processor since 999999 is A LOT of instructions.")
	}
}