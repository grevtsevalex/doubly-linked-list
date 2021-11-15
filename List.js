class List {
  first = null;
  last  = null;

  [Symbol.iterator]() {
    let current = this.first;
    return {
      next: () => {
        if (current === null) {
          return {done: true};
        }
        const value = current.value;
        current     = current.next;

        return {value, done: false}
      }
    };
  }

  push(value) {
    const node = {
      value,
      previous: this.last,
      next: null,
    };

    if (null === this.first) {
      this.first = node;
      this.last  = node;

      return;
    }

    this.last.next = node;
    this.last      = node;
  }

  pop() {
    if (null === this.last) return;
    if (this.first === this.last) {
      const value = this.first.value;
      this.first  = this.last = null;

      return console.log(value);
    }

    const value    = this.last.value;
    this.last      = this.last.previous;
    this.last.next = null;

    console.log(value);
  }

  insert(index, data) {
    let insertBeforeItem = this.getByIndex(index);

    const node = {
      value: data,
      next: insertBeforeItem,
      previous: insertBeforeItem.previous,
    };

    insertBeforeItem.previous.next = node;
    insertBeforeItem.previous      = node;
  }

  prepend(data) {
    const node = {
      value: data,
      previous: null,
      next: null,
    };

    if (null === this.first) {
      this.first = node;
      this.last  = node;

      return;
    }

    this.first.previous = node;
    node.next = this.first;
    this.first = node;
  }

  getByIndex(index) {
    let counter = 0;
    let current = this.first;
    while (counter < index && null !== current.next) {
      current = current.next;
      counter++;
    }

    return current;
  }

  delete(index, count = 1) {
    let itemToDelete     = this.getByIndex(index);
    let lastItemToDelete = this.getByIndex(index + count - 1);

    if (this.first === itemToDelete && this.last === lastItemToDelete) {
      this.first = null;
      this.last = null;

      return;
    }

    if (this.first === itemToDelete) {
      lastItemToDelete.next.previous = null;
      this.first = lastItemToDelete.next;

      return;
    }

    if (this.last === lastItemToDelete) {
      itemToDelete.previous.next = null;
      this.last = itemToDelete.previous;

      return;
    }

    itemToDelete.previous.next     = lastItemToDelete.next;
    lastItemToDelete.next.previous = itemToDelete.previous;
  }
}

const list = new List();
list.push('one');
list.push('two');
list.push('three');
list.insert(4, 'one withhalf')
// console.log(list.getByIndex(6));
list.delete(1,1);
list.prepend('qwerewr');
console.log([...list]);
list.pop();
list.pop();
list.pop();
list.pop();