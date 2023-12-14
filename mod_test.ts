import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { pipe } from "./mod.ts";

const upper = (s: string) => s.toUpperCase();
const split = (sep: string) => (s: string) => s.split(sep);
const reverse = (ss: string[]) => ss.reverse();
const join = (ss: string[]) => ss.join('');

Deno.test(function deployTest() {
  const doit = pipe(
    upper,
    split(''),
    reverse,
    join
  );

  assertEquals(doit('food'), 'DOOF');
});
