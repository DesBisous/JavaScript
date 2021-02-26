// 题目来源：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

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
        this.pre.push(node.value);
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
        this.mid.push(node.value);
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
        this.aft.push(node.value);
        return this.aft;
    }

    // 深度优先遍历（利用栈 - 先进后出）
    depthFirstTraversal(node) {
        const depth = [];
        const stack = [];
        stack.push(node);
        function traversal(stack) {
            if (!Array.isArray(stack) || stack.length <= 0) return;
            const _node = stack.pop();
            depth.push(_node.value);
            if (_node.right) stack.push(_node.right);
            if (_node.left) stack.push(_node.left);
            traversal(stack); // 递归
        }
        traversal(stack);
        return depth;
    }

    // 广度优先遍历（利用队列 - 先进先出）
    breadthFirstTraversal(node) {
        const breadth = [];
        const queue = [];
        queue.push(node)
        function traversal(queue) {
            if (!Array.isArray(queue) || queue.length <= 0) return;
            const _node = queue.shift();
            breadth.push(_node.value);
            if (_node.left) queue.push(_node.left);
            if (_node.right) queue.push(_node.right);
            traversal(queue); // 递归
        }
        traversal(queue);
        return breadth;
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

        // 分而治之的思想，将左右子树看做一个完整的前序遍历结果，重新放入
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

        // 分而治之的思想，将左右子树看做一个完整的后续遍历结果，重新放入
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

// 深度优先遍历
const depth = treeConstructor.depthFirstTraversal(tree);
console.log('深度优先遍历', depth);

// 广度优先遍历
const breadth = treeConstructor.breadthFirstTraversal(tree);
console.log('广度优先遍历', breadth);

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

const aa = "{   \"results\" : [      {         \"address_components\" : [            {               \"long_name\" : \"Shenzhen\",               \"short_name\" : \"Shenzhen\",               \"types\" : [ \"locality\", \"political\" ]            },            {               \"long_name\" : \"Guangdong Province\",               \"short_name\" : \"Guangdong Province\",               \"types\" : [ \"administrative_area_level_1\", \"political\" ]            },            {               \"long_name\" : \"China\",               \"short_name\" : \"CN\",               \"types\" : [ \"country\", \"political\" ]            }         ],         \"formatted_address\" : \"Shenzhen, Guangdong Province, China\",         \"geometry\" : {            \"bounds\" : {               \"northeast\" : {                  \"lat\" : 22.8617483,                  \"lng\" : 114.6284666               },               \"southwest\" : {                  \"lat\" : 22.3963441,                  \"lng\" : 113.7514535               }            },            \"location\" : {               \"lat\" : 22.543096,               \"lng\" : 114.057865            },            \"location_type\" : \"APPROXIMATE\",            \"viewport\" : {               \"northeast\" : {                  \"lat\" : 22.7809313,                  \"lng\" : 114.3553162               },               \"southwest\" : {                  \"lat\" : 22.3293893,                  \"lng\" : 113.7524414               }            }         },         \"place_id\" : \"ChIJkVLh0Aj0AzQRyYCStw1V7v0\",         \"types\" : [ \"locality\", \"political\" ]      }   ],   \"status\" : \"OK\"}";
console.log(JSON.parse(aa));