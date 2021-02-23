console.log("二叉树");

// 创建完美二叉树

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.pre = [];
        this.mid = [];
        this.aft = [];
    }

    createTree(list) {
        if (!Array.isArray(list)) return null;
        for (const value of nodes) {
            this.setNode(value);
        }
        return this.root;
    }

    setNode(value) {
        if (!this.root) {
            this.root = new TreeNode(value);
        } else {
            this.buildTree(this.root, value);
        }
    }

    buildTree(node, value) {
        if (node.value > value) {
            if (!node.left) {
                node.left = new TreeNode(value);
            } else {
                this.buildTree(node.left, value)
            }
        } else {
            if (!node.right) {
                node.right = new TreeNode(value);
            } else {
                this.buildTree(node.right, value)
            }
        }
    }

    // 前序遍历
    prologueTraverse(node) {
        this.pre.push(`${node.value}`);
        if (node.left) {
            this.prologueTraverse(node.left);
        }
        if (node.right) {
            this.prologueTraverse(node.right);
        }
        return this.pre;
    }

    // 中序遍历
    middleTraverse(node) {
        if (node.left) {
            this.middleTraverse(node.left);
        }
        this.mid.push(`${node.value}`);
        if (node.right) {
            this.middleTraverse(node.right);
        }
        return this.mid;
    }

    // 后序遍历
    afterTraverse(node) {
        if (node.left) {
            this.afterTraverse(node.left);
        }
        if (node.right) {
            this.afterTraverse(node.right);
        }
        this.aft.push(`${node.value}`);
        return this.aft;
    }

    // 前序遍历 + 中序遍历 = 构建出树
    createTreeByPreAndMid(pre = [], mid = []) {
        const preLength = pre.length;
        const midLength = mid.length;

        const hashMap = new Map();
        for (let i = 0; i < midLength; i ++) {
            hashMap.set(mid[i], i);
        }
        return this.buildTreeByPreAndMid(pre, 0, preLength - 1, hashMap, 0, midLength - 1);
    }

    buildTreeByPreAndMid(pre, preLeft, preRight, hashMap, midLeft, midRight) {
        if (preLeft > preRight || midLeft > midRight) return null;
        
        const rootValue = pre[preLeft];
        const root = new TreeNode(rootValue);
        const pIndex = hashMap.get(rootValue);

        root.left = this.buildTreeByPreAndMid(pre, preLeft + 1, pIndex - midLeft + preLeft, hashMap, midLeft, pIndex - 1);
        root.right = this.buildTreeByPreAndMid(pre, pIndex - midLeft + preLeft + 1, preRight, hashMap, pIndex + 1, midRight);

        return root;
    }

    // 后序遍历 + 中序遍历 = 构建出树
    createTreeByAftAndMid(aft = [], mid = []) {
        const aftLength = aft.length;
        const midLength = mid.length;

        const hashMap = new Map();
        for (let i = 0; i < midLength; i ++) {
            hashMap.set(mid[i], i);
        }
        return this.buildTreeByAftAndMid(aft, 0, aftLength - 1, hashMap, 0, midLength - 1);
    }

    buildTreeByAftAndMid(aft, aftLeft, aftRight, hashMap, midLeft, midRight) {
        if (aftLeft > aftRight || midLeft > midRight) return null;
        
        const rootValue = aft[aftRight];
        const root = new TreeNode(rootValue);
        const pIndex = hashMap.get(rootValue);

        root.left = this.buildTreeByAftAndMid(aft, aftLeft, pIndex - 1 - midLeft + aftLeft, hashMap, midLeft, pIndex - 1);
        root.right = this.buildTreeByAftAndMid(aft, pIndex - midLeft + aftLeft, aftRight - 1, hashMap, pIndex + 1, midRight);

        return root;
    }

}

const nodes = [8, 1, 3, 6, 7, 4, 10, 14, 13];
const treeConstructor = new BinaryTree();
const tree = treeConstructor.createTree(nodes);
console.log(tree);

// 前序遍历(先序遍历)
const pre = treeConstructor.prologueTraverse(tree);
console.log('前序遍历', pre);

// 中序遍历
const mid = treeConstructor.middleTraverse(tree);
console.log('中序遍历', mid);

// 后序遍历
const aft = treeConstructor.afterTraverse(tree);
console.log('后序遍历', aft);

// 前序遍历 + 中序遍历 = 构建出树
/**
 *  y - (preLeft + 1) = pIndex - 1 - midLeft
 *  y = pIndex - midLeft + preLeft
 * 
 * 重点：分而治之思想
 * 
 * 前序遍历:
 *   [      根      ][                  左节点                  ][                  右节点                  ]
 *   ↑               ↑                                        ↑ ↑                                         ↑
 *   preLeft         preLeft + 1     pIndex - midLeft + preLeft pIndex - midLeft + preLeft + 1            preRight
 * 中序遍历:
 *   [                  左节点                  ][      根      ][                  右节点                  ]
 *   ↑                                         ↑ ↑              ↑                                         ↑
 *   midLeft                          pIndex - 1 pIndex         pIndex + 1                                midRight
 */

const combinPreMidRoot = treeConstructor.createTreeByPreAndMid(pre, mid);
console.log(combinPreMidRoot);

// 后序遍历 + 中序遍历 = 构建出树
/**
 *  y - aftLeft = pIndex - 1 - midLeft
 *  y = pIndex - 1 - midLeft + aftLeft
 * 
 * 重点：分而治之思想
 * 
 * 前序遍历:
 *   [                  左节点                  ][                  右节点                  ][      根      ]
 *   ↑                                         ↑ ↑                                        ↑               ↑
 *   aftLeft      pIndex - 1 - midLeft + aftLeft pIndex - midLeft + aftLeft    aftRight - 1               aftRight
 * 中序遍历:
 *   [                  左节点                  ][      根      ][                  右节点                  ]
 *   ↑                                         ↑ ↑              ↑                                         ↑
 *   midLeft                          pIndex - 1 pIndex         pIndex + 1                                midRight
 */

const combinAftMidRoot = treeConstructor.createTreeByAftAndMid(aft, mid);
console.log(combinAftMidRoot);