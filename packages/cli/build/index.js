#!/usr/bin/env node
// @bun
import { Command as ye } from "commander";
import B from "inquirer";
import D from "path";
import n from "zod/v4";
var T = n
		.array(n.object({ path: n.string(), target: n.string().optional() }))
		.min(1)
		.refine((e) => new Set(e.map((t) => t.path)).size === e.length, {
			error: "duplicate file",
		}),
	R = n.object({
		name: n.string(),
		regDeps: n.array(n.string()).optional(),
		pkgDeps: n.array(n.string()).optional(),
		files: T,
	}),
	j = n.object({
		name: n.string(),
		url: n.url(),
		items: n
			.array(R)
			.refine((e) => new Set(e.map((t) => t.name)).size === e.length, {
				error: "duplicate name",
			}),
	}),
	u = n.array(n.object({ path: n.string(), content: n.string() })),
	m = n.object({
		name: n.string(),
		regDeps: n.array(n.string()).optional(),
		pkgDeps: n.array(n.string()).optional(),
		files: u,
	});
import S from "fs";
import { exec as M } from "child_process";
import { promisify as N } from "util";
import _ from "path";
var A = {
		bun: "bun.lock",
		pnpm: "pnpm-lock.yaml",
		yarn: "yarn.lock",
		npm: "package-lock.json",
	},
	O = () => Object.entries(A).find(([e, t]) => S.existsSync(t))?.[0] ?? "npm",
	J = N(M),
	U = (e) => {
		let t = process.cwd(),
			s = _.join(t, "package.json");
		if (!S.existsSync(s)) return !1;
		let r = JSON.parse(S.readFileSync(s, "utf8"));
		return Boolean(
			r.dependencies?.[e] || r.devDependencies?.[e] || r.peerDependencies?.[e],
		);
	},
	v = async (e, t) => {
		let s = O(),
			r = {
				bun: `bun add ${t ? "-D " : ""}${e.join(" ")}`,
				pnpm: `pnpm add ${t ? "-D " : ""}${e.join(" ")}`,
				yarn: `yarn add ${t ? "-D " : ""}${e.join(" ")}`,
				npm: `npm install ${t ? "-D " : ""}${e.join(" ")}`,
			}[s];
		if ((console.log(`\uD83D\uDCE6 Installing ${e.join(", ")} using ${s}...`), r))
			await J(r);
	},
	p = async (e, t) => {
		let s = e.filter((r) => !U(r));
		if (s.length === 0) {
			console.log(
				`\u2714 All ${t ? "dev " : ""}deps already installed: ${e.join(", ")}`,
			);
			return;
		}
		console.log(`\uD83D\uDCE6 Installing ${s.join(", ")}`);
		try {
			await v(s, t);
		} catch (r) {
			console.error("\u274C Install error:", r);
		}
	};
import { existsSync as q, mkdirSync as G, writeFileSync as H } from "fs";
import V from "zod/v4";
var W = "https://smoothed.vercel.app/registry";
var Y = async (e) => {
	let s = await (await fetch(e)).json();
	return m.parse(s);
};
var x = async (e, t = new Set()) => {
		let s = e.split(/(.+\/).+.json$/)[1];
		if (!s) throw new Error(`Invalid URL ${e}`);
		if (t.has(e)) return [];
		t.add(e);
		let r = [],
			i = await Y(e);
		if (i.regDeps?.length)
			for (let o of i.regDeps) {
				let c = await x(`${s}${o}.json`, t);
				r.push(...c);
			}
		return [...r, i];
	},
	K = (e, t) => {
		let s = u.safeParse(e);
		if (!s.success) throw new Error("Invalid object structure");
		for (let r of s.data) {
			if (q(r.path)) continue;
			let i = r.path.split(/^(.+)\/.+$/)[1];
			if (i) G(D.join(t, i), { recursive: !0 }), H(D.join(t, r.path), r.content);
		}
	},
	Q = async (e, t) => {
		let s = [
			...new Set(
				e.reduce((i, o) => {
					if (o.pkgDeps?.length) i.push(...o.pkgDeps);
					return i;
				}, []),
			),
		];
		p(s);
		let r = [...new Set(e.reduce((i, o) => (i.push(...o.files), i), []))];
		K(r, t);
	},
	X = V.url(),
	g = async (e) => {
		if (!e) {
			let { component: o } = await B.prompt([
				{ type: "input", name: "component", message: "Component name:" },
			]);
			e = o;
		}
		let t = e.trim().toLowerCase(),
			s = X.safeParse(t),
			r = s.success ? s.data : `${W}/${t}.json`,
			i = await x(r);
		await Q(i, process.cwd());
	};
import { readFile as ie } from "fs/promises";
import y from "path";
import { readFileSync as oe, writeFileSync as ae } from "fs";
import { readdirSync as Z, statSync as ee } from "fs";
import te from "path";
var F = (e, t) => {
	let s = Z(e);
	for (let r of s) {
		let i = te.join(e, r);
		if (ee(i).isDirectory()) {
			let c = F(i, t);
			if (c) return c;
		} else if (r === t) return i;
	}
	return null;
};
var re = (e) =>
		e.replace(
			/\r\n/g,
			`
`,
		),
	se = (e) => e.replace(/[ \t]+$/gm, ""),
	ne = (e) =>
		e.replace(
			/\n?$/,
			`
`,
		),
	I = (e) => re(se(ne(e)));
var $ = (e) => {
	try {
		return { right: JSON.parse(e), left: null };
	} catch (t) {
		return { right: null, left: t };
	}
};
var ce = "public",
	pe = "https://smoothed.vercel.app/item-schema.json",
	b = process.cwd(),
	le = y.join(b, ce),
	k = async () => {
		let e = F(le, "registry.json");
		if (!e)
			throw new Error(
				"'registry.json' was not found in '/public' of your work directory",
			);
		let t = y.dirname(e),
			s = oe(e, "utf-8"),
			r = $(s);
		if (r.left) throw r.left;
		let i = r.right,
			o = j.safeParse(i);
		if (!o.success) throw o.error;
		let c = o.data;
		for (let a of c.items) {
			let w = [];
			for (let l of a.files) {
				let C = y.join(b, l.path);
				try {
					let L = await ie(C, { encoding: "utf-8" });
					w.push({ content: I(L), path: l.target ?? l.path });
				} catch {
					throw new Error(`Failed to read source file ${l.path}`);
				}
			}
			let h = { files: w, name: a.name };
			if (a.regDeps) h.regDeps = a.regDeps;
			if (a.pkgDeps) h.pkgDeps = a.pkgDeps;
			let d = m.safeParse(h);
			if (!d.success) throw d.error;
			let E = { ...d.data, $schema: pe },
				z = y.join(t, `${a.name}.json`);
			ae(z, JSON.stringify(E, null, 2), "utf-8");
		}
	};
var me = ["unocss", "@unocss/postcss", "@unocss/preset-wind4", "colorizr"],
	ge = ["@base-ui/react"],
	P = async () => {
		await p(ge), await p(me, !0), await g("default-theme-config");
	};
var f = new ye();
f.command("init").description("Add dependencies to project").action(P);
f.command("add [name]").description("Add component to your project").action(g);
f.command("build").description("Build registry").action(k);
try {
	f.parse();
} catch (e) {
	console.error(e), process.exit(1);
}
