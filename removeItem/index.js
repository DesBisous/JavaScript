// 题目来源：https://leetcode-cn.com/problems/remove-element/

const list1 = [3, 2, 2, 3];
const list2 = [0, 1, 2, 2, 3, 0, 4, 2];

function removeElement(nums, val) {
    let ans = 0;
    for (const num of nums) {
        if (num != val) {
            nums[ans] = num;
            ans++;
        }
    }
    return ans;
};

function removeElement2(nums, val) {
    let ans = nums.length;
    for (let i = 0; i < ans;) {
        if (nums[i] !== val) {
            i += 1;
        } else {
            nums[i] = nums[ans - 1];
            ans -= 1;
        }
    }
    return ans;
}

// console.log(removeElement(list2, 3), list2);
console.log(removeElement2(list2, 2), list2);