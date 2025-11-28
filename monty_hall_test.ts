import { expect } from "@std/expect";
import * as MontyHall from "./monty_hall.ts";

Deno.test("MontyHall - play() with negative times throws error", () => {
  expect(() => MontyHall.play(-1)).toThrow(Error);
});

Deno.test("MontyHall - play() with negative times throws correct error message", () => {
  try {
    MontyHall.play(-5);
    expect(false).toBe(true); // Should not reach here
  } catch (error: unknown) {
    expect((error as Error).message).toBe("cannot play a negative number of times");
  }
});

Deno.test("MontyHall - play() runs without error for positive times", () => {
  // Suppress console output during test
  const originalLog = console.log;
  console.log = () => {};
  try {
    expect(() => MontyHall.play(10)).not.toThrow();
  } finally {
    console.log = originalLog;
  }
});

Deno.test("MontyHall - play() with 1 iteration completes successfully", () => {
  const originalLog = console.log;
  console.log = () => {};
  try {
    expect(() => MontyHall.play(1)).not.toThrow();
  } finally {
    console.log = originalLog;
  }
});

Deno.test("MontyHall - play() with large number of iterations completes successfully", () => {
  const originalLog = console.log;
  console.log = () => {};
  try {
    expect(() => MontyHall.play(1000)).not.toThrow();
  } finally {
    console.log = originalLog;
  }
});
