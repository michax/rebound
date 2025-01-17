import process from '/lib/process';

const cooldowns = new Set();
let time = 0;

const msToSec = ms => ms / 1000;
const secToMs = sec => sec * 1000;

export default function cooldown() {
  const map = new Map();
  cooldowns.add(map);

  function has(name) {
    if (!map.has(name)) {
      return false;
    }
    const { value, created } = map.get(name);
    return time - created < value;
  }

  function set(name, value) {
    map.set(name, {
      value: secToMs(value),
      created: time,
    });
  }

  function hasSet(name, value) {
    if (has(name)) {
      return true;
    } else {
      set(name, value);
      return false;
    }
  }

  return {
    has,
    set,
    hasSet,
  };
}

process(dt => {
  time = Date.now();
});
