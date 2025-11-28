export function play(times: number) {
  if (times < 0) {
    throw new Error("cannot play a negative number of times");
  }
  let wonSticking = 0;
  let wonChanging = 0;
  for (let i = 0; i < times; i++) {
    // first, prepare the game
    const doorsWithPrice = prepareDoors();

    // second, let the player make his guess
    const playerGuess = getPlayerGuess();

    // third, pick a loosing door to be eliminated from the choices

    const loosingDoor = showLoosingDoor(doorsWithPrice, playerGuess);

    // fourth, count wins by 1) sticking to the initial choice, and 2) changing the initial choice
    if (checkIfStickingWinns(doorsWithPrice, playerGuess)) {
      wonSticking++;
    }
    if (checkIfChangingWinns(doorsWithPrice, playerGuess, loosingDoor)) {
      wonChanging++;
    }
  }

  // finally, print the statistics
  printResults(times, wonSticking, wonChanging);
}

function prepareDoors() {
  const preparedDoors: Map<number, boolean> = new Map([
    [1, false],
    [2, false],
    [3, false],
  ]);

  const winningDoor = Math.ceil(Math.random() * 3);
  preparedDoors.set(winningDoor, true);
  return preparedDoors;
}

function getPlayerGuess() {
  return Math.ceil(Math.random() * 3);
}

function showLoosingDoor(doors: Map<number, boolean>, guess: number) {
  let winningDoor: number | null = null;

  for (const [door, isWinning] of doors.entries()) {
    if (isWinning) winningDoor = door;
  }
  const losingDoor = [...doors.keys()].find(
    (d) => d !== guess && d !== winningDoor
  );
  if (losingDoor === undefined) {
    throw new Error("No losing door found — logic error");
  }

  return losingDoor;
}

function checkIfStickingWinns(doors: Map<number, boolean>, guess: number) {
  return doors.get(guess);
}

function checkIfChangingWinns(
  doors: Map<number, boolean>,
  guess: number,
  loosingDoor: number
) {
  const switchedDoor = [...doors.keys()].find(
    (d) => d !== guess && d !== loosingDoor
  );
  if (switchedDoor === undefined) {
    throw new Error("No switching door found — logic error");
  }
  return doors.get(switchedDoor);
}

function printResults(times: number, wonSticking: number, wonChanging: number) {
  console.log(`played ${times} times`);
  console.log(`won ${wonSticking} times by sticking to the initial choice`);
  console.log(`won ${wonChanging} times by changing the initial choice`);
  const f = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  console.log(
    `sticking wins ${f.format((wonSticking / times) * 100)}% of games`
  );
  console.log(
    `changing wins ${f.format((wonChanging / times) * 100)}% of games`
  );
}
