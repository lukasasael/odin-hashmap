class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashMap {
  constructor(loadFactor) {
    this.buckets = new Array(16);
    this.size = 0;
    this.loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 7;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    this.checkIfItsOver();
    const index = this.hash(key);
    this.checkIfItsOut(index);
    let newNode = new Node(key, value);
    if (this.buckets[index]) {
      let duplicate = false;
      for (let i = 0; i < this.buckets[index].length; i++) {
        console.log(this.buckets[index][i].key, key);
        if (this.buckets[index][i].key === key) {
          duplicate = true;
          this.buckets[index][i].key = key;
          this.buckets[index][i].value = value;
        }
      }
      if (!duplicate) {
        this.buckets[index].push(newNode);
        this.size++;
      }
    } else {
      this.buckets[index] = [newNode];
      this.size++;
    }
    return "inserted at index " + index;
  }

  get(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          return this.buckets[index][i].value;
        }
      }
    } else {
      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          this.buckets[index][i] = "";
          this.size--;
          return true;
        }
      }
    } else {
      return false;
    }
  }

  length() {
    return this.size;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = "";
    }
    this.size = 0;
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != null && this.buckets[i] != "") {
        for (let j = 0; j < this.buckets[i].length; j++) {
          keys.push(this.buckets[i][j].key);
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != null && this.buckets[i] != "") {
        for (let j = 0; j < this.buckets[i].length; j++) {
          values.push(this.buckets[i][j].value);
        }
      }
    }
    return values;
  }

  entries() {
    let output = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != null && this.buckets[i] != "") {
        for (let j = 0; j < this.buckets[i].length; j++) {
          output.push(this.buckets[i][j]);
        }
      }
    }
    return output;
  }

  checkIfItsOut(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  checkIfItsOver() {
    if (this.buckets.length * this.loadFactor < this.size + 1) {
      this.resizeHashMap();
    }
  }

  resizeHashMap() {
    this.buckets.length = this.buckets.length * 2;
    let oldNodes = this.entries();
    this.clear();
    for (let i = 0; i < oldNodes.length; i++) {
      this.set(oldNodes[i].key, oldNodes[i].value);
    }
  }
}

const test = new HashMap(0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("jacket", "star");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("jacket", "dark");
test.set("moon", "silver");

console.log(test.buckets);
console.log("-------------------------------------------");
console.log(test.has("moon"));
console.log(test.length());
test.remove("lion");
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
console.log(test.entries());
