import { build, emptyDir } from "https://deno.land/x/dnt@0.39.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    // package.json properties
    name: "@kofno/piper",
    version: Deno.args[0],
    description: "Tools for functional composition",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/kofno/piper.git",
    },
    bugs: {
      url: "https://github.com/kofno/piper/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/readme.md");
  },
});
