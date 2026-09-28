class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }

        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }

        current = current.right;
      }
    }
  }

  insertRecursively(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    function insertNode(node) {
      if (val < node.val) {
        if (!node.left) {
          node.left = newNode;
          return;
        }

        insertNode(node.left);
      } else {
        if (!node.right) {
          node.right = newNode;
          return;
        }

        insertNode(node.right);
      }
    }

    insertNode(this.root);

    return this;
  }

  find(val) {
    let current = this.root;

    while (current) {
      if (current.val === val) {
        return current;
      }

      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;
  }

  findRecursively(val) {
    function findNode(node) {
      if (!node) return undefined;

      if (node.val === val) {
        return node;
      }

      if (val < node.val) {
        return findNode(node.left);
      }

      return findNode(node.right);
    }

    return findNode(this.root);
  }

  dfsPreOrder() {
    const values = [];

    function traverse(node) {
      if (!node) return;

      values.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);

    return values;
  }

  dfsInOrder() {
    const values = [];

    function traverse(node) {
      if (!node) return;

      traverse(node.left);
      values.push(node.val);
      traverse(node.right);
    }

    traverse(this.root);

    return values;
  }

  dfsPostOrder() {
    const values = [];

    function traverse(node) {
      if (!node) return;

      traverse(node.left);
      traverse(node.right);
      values.push(node.val);
    }

    traverse(this.root);

    return values;
  }

  bfs() {
    if (!this.root) return [];

    const values = [];
    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();

      values.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return values;
  }

remove(val) {
  let current = this.root;
  let parent = null;

  // Find the node to remove and its parent
  while (current && current.val !== val) {
    parent = current;

    if (val < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  if (!current) return undefined;

  const removedNode = current;

  // Case 1: node has no children
  if (!current.left && !current.right) {
    if (!parent) {
      this.root = null;
    } else if (parent.left === current) {
      parent.left = null;
    } else {
      parent.right = null;
    }

    return removedNode;
  }

  // Case 2: node has only one child
  if (!current.left || !current.right) {
    const child = current.left || current.right;

    if (!parent) {
      this.root = child;
    } else if (parent.left === current) {
      parent.left = child;
    } else {
      parent.right = child;
    }

    return removedNode;
  }

  // Case 3: node has two children
  // Find the smallest node in the right subtree.
  let successorParent = current;
  let successor = current.right;

  while (successor.left) {
    successorParent = successor;
    successor = successor.left;
  }

  // Copy successor's value into current node
  current.val = successor.val;

  // Remove successor from its old position
  if (successorParent.left === successor) {
    successorParent.left = successor.right;
  } else {
    successorParent.right = successor.right;
  }

  return removedNode;
}

isBalanced() {
  function getHeight(node) {
    if (!node) return 0;

    const leftHeight = getHeight(node.left);

    if (leftHeight === -1) return -1;

    const rightHeight = getHeight(node.right);

    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return getHeight(this.root) !== -1;
}

findSecondHighest() {
  if (!this.root) return undefined;

  if (!this.root.left && !this.root.right) {
    return undefined;
  }

  let current = this.root;
  let parent = null;

  // Find largest node
  while (current.right) {
    parent = current;
    current = current.right;
  }

  // If largest node has a left subtree,
  // second highest is the largest value in that subtree.
  if (current.left) {
    current = current.left;

    while (current.right) {
      current = current.right;
    }

    return current.val;
  }

  // Otherwise parent of largest is second highest.
  return parent.val;
}
}

module.exports = BinarySearchTree;