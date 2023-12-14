import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { pick, pipe, pipeline } from "../mod.ts";

const upper = (s: string) => s.toUpperCase();
const split = (sep: string) => (s: string) => s.split(sep);
const reverse = (ss: string[]) => ss.reverse();
const join = (ss: string[]) => ss.join('');

Deno.test(function pipeTest() {
  const doit = pipe(
    upper,
    split(''),
    reverse,
    join
  );

  assertEquals(doit('food'), 'DOOF');
});


Deno.test(function pipelineTest() {
  const doit = pipeline(upper)
    .map(split(''))
    .map(reverse)
    .map(join).fn;

  assertEquals(doit('food'), 'DOOF');
});

Deno.test(function pickTests() {
  const obj = { foo: 'bar', baz: 1 };
  assertEquals(pick('foo', obj), 'bar');
});

Deno.test(function nestedPickTests() {
  const obj = { foo: { bar: 'baz', qux: 1 } };
  const foobar = pipe(pick<typeof obj, 'foo'>('foo'), pick('bar'));
  assertEquals(foobar(obj), 'baz');
})
