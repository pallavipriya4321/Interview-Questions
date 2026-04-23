export const midsize = {
  id: "midsize",
  title: "Midsize",
  description: "Zoho, Freshworks, Myntra, Swiggy",
  topics: [
    {
      id: "arrays",
      title: "Arrays",
      icon: "Ar",
      conceptual: [
        { question: "Explain Kadane's Algorithm and when it's used.", answer: "Kadane's Algorithm finds the maximum sum contiguous subarray in O(n) time. It maintains two variables: currentMax (best sum ending at current position) and globalMax (best sum found so far). At each element, currentMax = max(element, currentMax + element) — either extend the previous subarray or start fresh. Then globalMax = max(globalMax, currentMax). It works because a maximum subarray ending at position i is either the element itself or extends the maximum subarray ending at i-1.", difficulty: "medium", type: "concept" },
        { question: "What is the difference between merge-based and swap-based interval algorithms?", answer: "Merge-based algorithms (like Merge Intervals) sort intervals by start time and merge overlapping ones by comparing current end with next start. Swap-based approaches modify intervals in-place. For Merge Intervals, sort + single pass gives O(n log n). For Insert Interval, binary search can find the position in O(log n) but merging still requires O(n) shifts. The key insight is that after sorting by start, two intervals overlap if and only if the first's end >= second's start.", difficulty: "medium", type: "concept" },
        { question: "How does the prefix product technique work for Product of Array Except Self?", answer: "Instead of dividing total product by each element (which fails for zeros), compute prefix products (product of all elements to the left) and suffix products (product of all elements to the right). For each index i, the answer is prefix[i] * suffix[i]. This can be done in O(n) time and O(1) extra space by using the output array for prefix products and a running variable for suffix products. This technique avoids division entirely.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Kadane's Maximum Subarray Sum",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function maxSubArray(nums) {\n  let maxSum = -Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = i; j < nums.length; j++) {\n      sum += nums[j];\n      maxSum = Math.max(maxSum, sum);\n    }\n  }\n  return maxSum;\n}`,
              explanation: "Line 3: Try every starting index.\nLine 5-7: Extend subarray, tracking running sum and global max.\nO(n²) — checks all subarrays."
            },
            {
              name: "Optimal (Kadane's Algorithm)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function maxSubArray(nums) {\n  let currentMax = nums[0];\n  let globalMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    globalMax = Math.max(globalMax, currentMax);\n  }\n  return globalMax;\n}`,
              explanation: "Line 2-3: Initialize both with first element.\nLine 5: Either extend previous subarray or start new one at current element.\nLine 6: Update global maximum.\nLine 8: Return the maximum subarray sum found."
            }
          ]
        },
        {
          question: "Merge Intervals",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force (Compare All Pairs)",
              complexity: { time: "O(n²)", space: "O(n)" },
              code: `function merge(intervals) {\n  if (intervals.length <= 1) return intervals;\n  intervals.sort((a, b) => a[0] - b[0]);\n  const result = [];\n  let changed = true;\n  while (changed) {\n    changed = false;\n    const merged = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n      const last = merged[merged.length - 1];\n      if (intervals[i][0] <= last[1]) {\n        last[1] = Math.max(last[1], intervals[i][1]);\n        changed = true;\n      } else {\n        merged.push(intervals[i]);\n      }\n    }\n    intervals = merged;\n  }\n  return intervals;\n}`,
              explanation: "Sort and repeatedly merge until no changes. Worst case O(n²) if many overlapping intervals require multiple passes."
            },
            {
              name: "Optimal (Sort + Single Pass)",
              complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const result = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = result[result.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      result.push(intervals[i]);\n    }\n  }\n  return result;\n}`,
              explanation: "Line 2: Sort by start time.\nLine 3: Start result with first interval.\nLine 5: Get last merged interval.\nLine 6-7: If overlap (current start <= last end), extend the end.\nLine 9: No overlap — add as new interval.\nLine 12: Return merged intervals."
            }
          ]
        },
        {
          question: "Product of Array Except Self",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(n)" },
              code: `function productExceptSelf(nums) {\n  const result = [];\n  for (let i = 0; i < nums.length; i++) {\n    let product = 1;\n    for (let j = 0; j < nums.length; j++) {\n      if (i !== j) product *= nums[j];\n    }\n    result.push(product);\n  }\n  return result;\n}`,
              explanation: "Line 3-8: For each index, multiply all other elements. O(n²) time."
            },
            {
              name: "Optimal (Prefix & Suffix Products)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function productExceptSelf(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    result[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    result[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return result;\n}`,
              explanation: "Line 3: Initialize result array.\nLine 4-7: Left pass — result[i] = product of all elements to the left.\nLine 9-12: Right pass — multiply by product of all elements to the right.\nLine 14: Each result[i] = leftProduct * rightProduct = product of all except self. O(1) extra space (result array doesn't count)."
            }
          ]
        }
      ]
    },
    {
      id: "strings",
      title: "Strings",
      icon: "St",
      conceptual: [
        { question: "Explain the expand-around-center technique for palindromes.", answer: "For each index i (and each pair i, i+1 for even-length), expand outward while characters match. This checks all possible palindrome centers in O(n²) time total. For each center, expansion takes O(n) worst case but centers that don't expand far are quick. It uses O(1) space unlike the DP approach which uses O(n²). Manacher's algorithm improves this to O(n) but is rarely expected in interviews.", difficulty: "medium", type: "concept" },
        { question: "How does string-to-integer conversion handle edge cases?", answer: "Key edge cases: leading whitespace (skip), optional +/- sign (track), non-digit characters (stop parsing), integer overflow (clamp to INT_MAX/INT_MIN), empty string or only whitespace (return 0). The approach is: trim whitespace, check sign, parse digits while checking for overflow before each multiplication. In JavaScript, use Math.pow(2,31)-1 for INT_MAX and -Math.pow(2,31) for INT_MIN. This is a classic string parsing problem that tests attention to detail.", difficulty: "medium", type: "concept" },
        { question: "What is the longest common prefix problem and its approaches?", answer: "Finding the longest common prefix of an array of strings can be solved several ways. Vertical scanning compares characters column by column across all strings — O(S) where S is sum of all characters. Horizontal scanning reduces prefix pairwise — also O(S). Divide and conquer splits array in half and merges prefixes — O(S) time, O(m log n) space. Binary search on prefix length — O(S log m). Trie approach inserts all words and finds the longest common path — O(S) time, O(S) space.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Longest Palindromic Substring",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n³)", space: "O(1)" },
              code: `function longestPalindrome(s) {\n  let longest = "";\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i; j < s.length; j++) {\n      const sub = s.slice(i, j + 1);\n      if (isPalin(sub) && sub.length > longest.length) {\n        longest = sub;\n      }\n    }\n  }\n  return longest;\n}\nfunction isPalin(s) {\n  let l = 0, r = s.length - 1;\n  while (l < r) { if (s[l++] !== s[r--]) return false; }\n  return true;\n}`,
              explanation: "Check all substrings and verify each is a palindrome. O(n²) substrings × O(n) palindrome check = O(n³)."
            },
            {
              name: "Optimal (Expand Around Center)",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function longestPalindrome(s) {\n  let start = 0, maxLen = 0;\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      if (r - l + 1 > maxLen) {\n        start = l;\n        maxLen = r - l + 1;\n      }\n      l--;\n      r++;\n    }\n  }\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i);\n    expand(i, i + 1);\n  }\n  return s.slice(start, start + maxLen);\n}`,
              explanation: "Line 3-11: Expand from center while characters match, track longest.\nLine 14: Try odd-length palindromes (single center).\nLine 15: Try even-length palindromes (double center).\nLine 17: Return longest palindrome found. O(n²) time, O(1) space."
            }
          ]
        },
        {
          question: "String to Integer (atoi)",
          difficulty: "medium",
          approaches: [
            {
              name: "Step-by-Step Parsing",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function myAtoi(s) {\n  const INT_MAX = 2147483647, INT_MIN = -2147483648;\n  let i = 0, sign = 1, result = 0;\n  while (i < s.length && s[i] === ' ') i++;\n  if (i < s.length && (s[i] === '+' || s[i] === '-')) {\n    sign = s[i] === '-' ? -1 : 1;\n    i++;\n  }\n  while (i < s.length && s[i] >= '0' && s[i] <= '9') {\n    const digit = s[i].charCodeAt(0) - 48;\n    if (result > Math.floor((INT_MAX - digit) / 10)) {\n      return sign === 1 ? INT_MAX : INT_MIN;\n    }\n    result = result * 10 + digit;\n    i++;\n  }\n  return result * sign;\n}`,
              explanation: "Line 4: Skip leading whitespace.\nLine 5-8: Handle optional sign.\nLine 9: Parse digits.\nLine 11-13: Check for overflow BEFORE multiplying.\nLine 14: Build the number digit by digit.\nLine 17: Apply sign and return."
            }
          ]
        },
        {
          question: "Longest Common Prefix",
          difficulty: "medium",
          approaches: [
            {
              name: "Vertical Scanning",
              complexity: { time: "O(S)", space: "O(1)" },
              code: `function longestCommonPrefix(strs) {\n  if (strs.length === 0) return "";\n  for (let i = 0; i < strs[0].length; i++) {\n    const char = strs[0][i];\n    for (let j = 1; j < strs.length; j++) {\n      if (i >= strs[j].length || strs[j][i] !== char) {\n        return strs[0].slice(0, i);\n      }\n    }\n  }\n  return strs[0];\n}`,
              explanation: "Line 3: Check each character position of the first string.\nLine 5-8: Compare with same position in all other strings.\nLine 6-7: If mismatch or string is shorter, return prefix so far.\nLine 11: If we get through all chars of first string, it is the prefix."
            },
            {
              name: "Sort and Compare First/Last",
              complexity: { time: "O(n * m log n)", space: "O(1)" },
              code: `function longestCommonPrefix(strs) {\n  if (strs.length === 0) return "";\n  strs.sort();\n  const first = strs[0], last = strs[strs.length - 1];\n  let i = 0;\n  while (i < first.length && first[i] === last[i]) i++;\n  return first.slice(0, i);\n}`,
              explanation: "Line 3: Sort strings lexicographically.\nLine 4: After sorting, the most different strings are first and last.\nLine 6: Compare only first and last — their common prefix is the answer for all.\nLine 7: Return common prefix."
            }
          ]
        }
      ]
    },
    {
      id: "linked-lists",
      title: "Linked Lists",
      icon: "LL",
      conceptual: [
        { question: "How do you merge two sorted linked lists?", answer: "Use a dummy node as the head of the merged list. Compare the heads of both lists, append the smaller one to the merged list, and advance that list's pointer. Repeat until one list is exhausted, then append the remaining list. Time is O(n + m), space is O(1) since we reuse existing nodes. Recursive approach is cleaner but uses O(n + m) stack space. This is a fundamental technique used in merge sort for linked lists.", difficulty: "medium", type: "concept" },
        { question: "Explain the slow/fast pointer technique for finding the nth node from end.", answer: "Use two pointers starting at head. Advance the fast pointer n steps ahead. Then move both pointers one step at a time. When fast reaches the end, slow is at the nth node from the end. This works because the gap between the pointers is always n. To remove the nth node from end, use a dummy node before head and stop slow at the node before the target. Time O(n), space O(1), single pass.", difficulty: "medium", type: "concept" },
        { question: "How does adding two numbers represented as linked lists work?", answer: "Numbers are stored in reverse order (1->2->3 represents 321). Traverse both lists simultaneously, adding corresponding digits plus carry. If sum >= 10, carry = 1, digit = sum % 10. Continue until both lists are exhausted and carry is 0. Create new nodes for each digit of the result. Time O(max(n,m)), space O(max(n,m)) for the result. Edge cases: different length lists, final carry creating an extra digit.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Merge Two Sorted Lists",
          difficulty: "medium",
          approaches: [
            {
              name: "Iterative",
              complexity: { time: "O(n + m)", space: "O(1)" },
              code: `function mergeTwoLists(l1, l2) {\n  const dummy = { val: 0, next: null };\n  let current = dummy;\n  while (l1 && l2) {\n    if (l1.val <= l2.val) {\n      current.next = l1;\n      l1 = l1.next;\n    } else {\n      current.next = l2;\n      l2 = l2.next;\n    }\n    current = current.next;\n  }\n  current.next = l1 || l2;\n  return dummy.next;\n}`,
              explanation: "Line 2: Dummy node simplifies edge cases.\nLine 4-12: Compare heads, append smaller node.\nLine 14: Append remaining list.\nLine 15: Return merged list (skip dummy)."
            },
            {
              name: "Recursive",
              complexity: { time: "O(n + m)", space: "O(n + m)" },
              code: `function mergeTwoLists(l1, l2) {\n  if (!l1) return l2;\n  if (!l2) return l1;\n  if (l1.val <= l2.val) {\n    l1.next = mergeTwoLists(l1.next, l2);\n    return l1;\n  } else {\n    l2.next = mergeTwoLists(l1, l2.next);\n    return l2;\n  }\n}`,
              explanation: "Line 2-3: Base cases — one list empty.\nLine 4-6: l1 is smaller — it becomes head, recurse on l1.next and l2.\nLine 7-9: l2 is smaller — similar.\nO(n+m) stack space for recursion."
            }
          ]
        },
        {
          question: "Remove Nth Node From End of List",
          difficulty: "medium",
          approaches: [
            {
              name: "Two Pass",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function removeNthFromEnd(head, n) {\n  let length = 0, current = head;\n  while (current) { length++; current = current.next; }\n  if (n === length) return head.next;\n  current = head;\n  for (let i = 0; i < length - n - 1; i++) current = current.next;\n  current.next = current.next.next;\n  return head;\n}`,
              explanation: "Line 2-3: First pass to get length.\nLine 4: Special case — removing head.\nLine 6: Navigate to node before the target.\nLine 7: Skip the target node."
            },
            {
              name: "Optimal (One Pass — Two Pointers)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function removeNthFromEnd(head, n) {\n  const dummy = { val: 0, next: head };\n  let fast = dummy, slow = dummy;\n  for (let i = 0; i <= n; i++) fast = fast.next;\n  while (fast) {\n    fast = fast.next;\n    slow = slow.next;\n  }\n  slow.next = slow.next.next;\n  return dummy.next;\n}`,
              explanation: "Line 2: Dummy node handles removing head.\nLine 4: Move fast n+1 steps ahead.\nLine 5-8: Move both until fast reaches end.\nLine 9: slow is now before the target — skip it.\nLine 10: Return list (skip dummy). Single pass."
            }
          ]
        },
        {
          question: "Add Two Numbers (Linked Lists)",
          difficulty: "medium",
          approaches: [
            {
              name: "Iterative with Carry",
              complexity: { time: "O(max(n,m))", space: "O(max(n,m))" },
              code: `function addTwoNumbers(l1, l2) {\n  const dummy = { val: 0, next: null };\n  let current = dummy, carry = 0;\n  while (l1 || l2 || carry) {\n    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;\n    carry = Math.floor(sum / 10);\n    current.next = { val: sum % 10, next: null };\n    current = current.next;\n    l1 = l1?.next;\n    l2 = l2?.next;\n  }\n  return dummy.next;\n}`,
              explanation: "Line 2: Dummy node for result list.\nLine 4: Continue while there are digits or carry.\nLine 5: Sum corresponding digits plus carry.\nLine 6: New carry.\nLine 7: Create node with digit (sum % 10).\nLine 9-10: Advance both lists.\nLine 12: Return result."
            }
          ]
        }
      ]
    },
    {
      id: "stacks-queues",
      title: "Stacks & Queues",
      icon: "SQ",
      conceptual: [
        { question: "What is a Min Stack and how does it achieve O(1) getMin?", answer: "A Min Stack supports push, pop, top, and getMin all in O(1). The trick is maintaining a parallel stack (or storing pairs) that tracks the minimum at each level. When pushing, also push the new minimum (min of new value and current min). When popping, pop from both stacks. This way, the top of the min stack always holds the current minimum. Space doubles to O(2n) but all operations remain O(1).", difficulty: "medium", type: "concept" },
        { question: "Explain the Next Greater Element pattern using monotonic stack.", answer: "To find the next greater element for each element, maintain a decreasing monotonic stack. Iterate right to left: while stack top <= current element, pop. The stack top (if exists) is the next greater element for current; otherwise -1. Push current element. Each element is pushed and popped at most once, giving O(n) total. Variations: next smaller element (increasing stack), previous greater/smaller (iterate left to right).", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Min Stack",
          difficulty: "medium",
          approaches: [
            {
              name: "Two Stacks",
              complexity: { time: "O(1) all ops", space: "O(n)" },
              code: `class MinStack {\n  constructor() {\n    this.stack = [];\n    this.minStack = [];\n  }\n  push(val) {\n    this.stack.push(val);\n    const min = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);\n    this.minStack.push(min);\n  }\n  pop() {\n    this.stack.pop();\n    this.minStack.pop();\n  }\n  top() {\n    return this.stack[this.stack.length - 1];\n  }\n  getMin() {\n    return this.minStack[this.minStack.length - 1];\n  }\n}`,
              explanation: "Line 3-4: Main stack + min-tracking stack.\nLine 8: On push, store the current minimum.\nLine 12-13: Pop from both stacks keeps them in sync.\nLine 19: Min stack top always has current minimum — O(1)."
            }
          ]
        },
        {
          question: "Next Greater Element",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(n)" },
              code: `function nextGreaterElement(nums) {\n  const result = new Array(nums.length).fill(-1);\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[j] > nums[i]) {\n        result[i] = nums[j];\n        break;\n      }\n    }\n  }\n  return result;\n}`,
              explanation: "Line 3-9: For each element, scan right to find first larger element.\nO(n²) in worst case (descending array)."
            },
            {
              name: "Optimal (Monotonic Stack)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function nextGreaterElement(nums) {\n  const result = new Array(nums.length).fill(-1);\n  const stack = [];\n  for (let i = nums.length - 1; i >= 0; i--) {\n    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {\n      stack.pop();\n    }\n    if (stack.length > 0) result[i] = stack[stack.length - 1];\n    stack.push(nums[i]);\n  }\n  return result;\n}`,
              explanation: "Line 3: Stack maintains decreasing order from bottom to top.\nLine 4: Iterate right to left.\nLine 5-6: Pop elements smaller than or equal to current.\nLine 8: Stack top is the next greater element.\nLine 9: Push current element.\nEach element pushed/popped at most once — O(n)."
            }
          ]
        },
        {
          question: "Evaluate Reverse Polish Notation",
          difficulty: "medium",
          approaches: [
            {
              name: "Stack-based Evaluation",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function evalRPN(tokens) {\n  const stack = [];\n  for (const token of tokens) {\n    if (['+', '-', '*', '/'].includes(token)) {\n      const b = stack.pop();\n      const a = stack.pop();\n      switch (token) {\n        case '+': stack.push(a + b); break;\n        case '-': stack.push(a - b); break;\n        case '*': stack.push(a * b); break;\n        case '/': stack.push(Math.trunc(a / b)); break;\n      }\n    } else {\n      stack.push(Number(token));\n    }\n  }\n  return stack[0];\n}`,
              explanation: "Line 3: Process each token.\nLine 4: If operator, pop two operands.\nLine 5-6: b is popped first (right operand), a second (left).\nLine 7-11: Apply operator, push result. trunc for integer division.\nLine 14: If number, push to stack.\nLine 17: Final result is the only element left."
            }
          ]
        }
      ]
    },
    {
      id: "trees",
      title: "Trees",
      icon: "Tr",
      conceptual: [
        { question: "How do you validate a Binary Search Tree?", answer: "The naive approach of checking if left < root < right for each node fails — it doesn't ensure the global BST property. The correct approach passes valid ranges to each node: every node must be within (min, max). Root starts with (-Infinity, Infinity). Left child gets (min, parent.val) and right child gets (parent.val, max). If any node violates its range, the tree is not a valid BST. Alternatively, inorder traversal of a BST should give sorted order — verify this.", difficulty: "medium", type: "concept" },
        { question: "What is the Lowest Common Ancestor (LCA) and how do you find it?", answer: "LCA of two nodes p and q is the deepest node that is an ancestor of both. For a BST, if both values are smaller than root, LCA is in left subtree; if both larger, in right subtree; otherwise root is the LCA. For a general binary tree, recursively check left and right subtrees — if both return non-null, current node is LCA. If only one returns non-null, that's the LCA. Time O(n), space O(h) for recursion.", difficulty: "medium", type: "concept" },
        { question: "How do you find the diameter of a binary tree?", answer: "The diameter is the longest path between any two nodes (measured in edges). The path may or may not pass through the root. For each node, the path through it has length = leftHeight + rightHeight. We find the height of each subtree and update the global maximum diameter. This can be done in a single DFS traversal: compute height while tracking max(leftHeight + rightHeight) at each node. Time O(n), space O(h).", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Validate Binary Search Tree",
          difficulty: "medium",
          approaches: [
            {
              name: "Recursive with Range",
              complexity: { time: "O(n)", space: "O(h)" },
              code: `function isValidBST(root, min = -Infinity, max = Infinity) {\n  if (!root) return true;\n  if (root.val <= min || root.val >= max) return false;\n  return isValidBST(root.left, min, root.val) &&\n         isValidBST(root.right, root.val, max);\n}`,
              explanation: "Line 2: Null node is valid.\nLine 3: Check if current node violates range.\nLine 4: Left subtree must be < current value.\nLine 5: Right subtree must be > current value."
            },
            {
              name: "Inorder Traversal Check",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function isValidBST(root) {\n  const values = [];\n  function inorder(node) {\n    if (!node) return;\n    inorder(node.left);\n    values.push(node.val);\n    inorder(node.right);\n  }\n  inorder(root);\n  for (let i = 1; i < values.length; i++) {\n    if (values[i] <= values[i - 1]) return false;\n  }\n  return true;\n}`,
              explanation: "Line 3-8: Collect inorder traversal.\nLine 10-12: Verify array is strictly increasing.\nIf sorted → valid BST. O(n) space for the array."
            }
          ]
        },
        {
          question: "Lowest Common Ancestor of Binary Tree",
          difficulty: "medium",
          approaches: [
            {
              name: "Recursive",
              complexity: { time: "O(n)", space: "O(h)" },
              code: `function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  if (left && right) return root;\n  return left || right;\n}`,
              explanation: "Line 2: Base — null or found p/q.\nLine 3-4: Search both subtrees.\nLine 5: If found in both subtrees, current node is LCA.\nLine 6: Otherwise return whichever side found something."
            }
          ]
        },
        {
          question: "Diameter of Binary Tree",
          difficulty: "medium",
          approaches: [
            {
              name: "DFS with Global Variable",
              complexity: { time: "O(n)", space: "O(h)" },
              code: `function diameterOfBinaryTree(root) {\n  let maxDiameter = 0;\n  function height(node) {\n    if (!node) return 0;\n    const left = height(node.left);\n    const right = height(node.right);\n    maxDiameter = Math.max(maxDiameter, left + right);\n    return Math.max(left, right) + 1;\n  }\n  height(root);\n  return maxDiameter;\n}`,
              explanation: "Line 2: Track maximum diameter globally.\nLine 4: Null node has height 0.\nLine 5-6: Get heights of both subtrees.\nLine 7: Diameter through this node = left + right heights.\nLine 8: Return height of this node.\nLine 10: Trigger DFS from root."
            }
          ]
        }
      ]
    },
    {
      id: "graphs",
      title: "Graphs",
      icon: "Gr",
      conceptual: [
        { question: "How does the Number of Islands problem work?", answer: "Given a 2D grid of '1's (land) and '0's (water), count distinct islands. Start BFS/DFS from each unvisited '1', marking all connected '1's as visited (sinking the island). Each time we start a new BFS/DFS, that's a new island. Time O(m*n) since each cell is visited once. DFS is simpler to implement recursively but may hit stack limits for large grids. BFS avoids this issue.", difficulty: "medium", type: "concept" },
        { question: "How do you detect a cycle in a directed graph?", answer: "Use DFS with three states per node: unvisited, in-progress (on current DFS path), and visited (fully processed). If we encounter an in-progress node during DFS, there's a cycle. This differs from undirected graphs where we just check if a neighbor (other than parent) is visited. Alternatively, Kahn's algorithm (BFS topological sort) detects cycles — if not all nodes are processed, there's a cycle. Time O(V+E) for both approaches.", difficulty: "medium", type: "concept" },
        { question: "What is topological sorting and when is it used?", answer: "Topological sort orders vertices of a DAG (Directed Acyclic Graph) such that for every edge u→v, u comes before v. It's used for task scheduling, build systems, course prerequisites, and dependency resolution. Two approaches: Kahn's (BFS with in-degree tracking) and DFS-based (reverse postorder). If the graph has a cycle, topological sort is impossible. Time O(V+E). There can be multiple valid topological orderings.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Number of Islands",
          difficulty: "medium",
          approaches: [
            {
              name: "DFS",
              complexity: { time: "O(m × n)", space: "O(m × n)" },
              code: `function numIslands(grid) {\n  let count = 0;\n  const rows = grid.length, cols = grid[0].length;\n  function dfs(r, c) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;\n    grid[r][c] = '0';\n    dfs(r + 1, c); dfs(r - 1, c);\n    dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === '1') {\n        count++;\n        dfs(r, c);\n      }\n    }\n  }\n  return count;\n}`,
              explanation: "Line 4-8: DFS sinks the island by marking visited cells as '0'.\nLine 5: Boundary and water checks.\nLine 7-8: Explore all 4 directions.\nLine 12-14: Each new '1' starts a new island count.\nLine 18: Return total islands."
            }
          ]
        },
        {
          question: "Cycle Detection in Directed Graph",
          difficulty: "medium",
          approaches: [
            {
              name: "DFS with 3 States",
              complexity: { time: "O(V + E)", space: "O(V)" },
              code: `function hasCycle(numNodes, edges) {\n  const graph = Array.from({ length: numNodes }, () => []);\n  for (const [u, v] of edges) graph[u].push(v);\n  const state = new Array(numNodes).fill(0);\n  function dfs(node) {\n    state[node] = 1;\n    for (const neighbor of graph[node]) {\n      if (state[neighbor] === 1) return true;\n      if (state[neighbor] === 0 && dfs(neighbor)) return true;\n    }\n    state[node] = 2;\n    return false;\n  }\n  for (let i = 0; i < numNodes; i++) {\n    if (state[i] === 0 && dfs(i)) return true;\n  }\n  return false;\n}`,
              explanation: "Line 4: 0 = unvisited, 1 = in-progress, 2 = done.\nLine 6: Mark node as in-progress.\nLine 8: If neighbor is in-progress → cycle (back edge).\nLine 9: If unvisited, recurse.\nLine 11: Mark as fully processed.\nLine 14-16: Try DFS from each unvisited node."
            }
          ]
        }
      ]
    },
    {
      id: "recursion-backtracking",
      title: "Recursion & Backtracking",
      icon: "RB",
      conceptual: [
        { question: "How do permutations differ from combinations in backtracking?", answer: "Permutations care about order — [1,2] and [2,1] are different permutations. For n elements, there are n! permutations. At each step, you can pick any unused element. Combinations don't care about order — [1,2] and [2,1] are the same. For n choose k, there are C(n,k) combinations. To avoid duplicates in combinations, only pick elements with index >= current start index. Both use backtracking but with different pruning strategies.", difficulty: "medium", type: "concept" },
        { question: "What is the phone number letter combinations problem pattern?", answer: "This is a classic backtracking problem where each digit maps to 3-4 letters. For each digit, try each possible letter, recurse on remaining digits, then backtrack. The number of combinations grows exponentially — for a string of length n with ~3 letters per digit, there are ~3^n combinations. The backtracking tree has depth n (number of digits) and branching factor 3-4. Time O(4^n * n), space O(n) for recursion depth.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Permutations",
          difficulty: "medium",
          approaches: [
            {
              name: "Backtracking",
              complexity: { time: "O(n! * n)", space: "O(n! * n)" },
              code: `function permute(nums) {\n  const result = [];\n  function backtrack(current, remaining) {\n    if (remaining.length === 0) {\n      result.push([...current]);\n      return;\n    }\n    for (let i = 0; i < remaining.length; i++) {\n      current.push(remaining[i]);\n      backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);\n      current.pop();\n    }\n  }\n  backtrack([], nums);\n  return result;\n}`,
              explanation: "Line 4-6: All elements used → complete permutation.\nLine 8: Try each remaining element.\nLine 9: Choose — add to current.\nLine 10: Explore — recurse with remaining elements (excluding chosen).\nLine 11: Unchoose — remove (backtrack)."
            },
            {
              name: "Swap-based (In-place)",
              complexity: { time: "O(n! * n)", space: "O(n)" },
              code: `function permute(nums) {\n  const result = [];\n  function backtrack(start) {\n    if (start === nums.length) {\n      result.push([...nums]);\n      return;\n    }\n    for (let i = start; i < nums.length; i++) {\n      [nums[start], nums[i]] = [nums[i], nums[start]];\n      backtrack(start + 1);\n      [nums[start], nums[i]] = [nums[i], nums[start]];\n    }\n  }\n  backtrack(0);\n  return result;\n}`,
              explanation: "Line 4-6: All positions filled → record permutation.\nLine 8: Try each element at current position.\nLine 9: Swap to place element at start.\nLine 10: Recurse for next position.\nLine 11: Swap back (backtrack). More space-efficient."
            }
          ]
        },
        {
          question: "Letter Combinations of a Phone Number",
          difficulty: "medium",
          approaches: [
            {
              name: "Backtracking",
              complexity: { time: "O(4ⁿ * n)", space: "O(n)" },
              code: `function letterCombinations(digits) {\n  if (!digits) return [];\n  const map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',\n    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };\n  const result = [];\n  function backtrack(index, current) {\n    if (index === digits.length) {\n      result.push(current);\n      return;\n    }\n    for (const char of map[digits[index]]) {\n      backtrack(index + 1, current + char);\n    }\n  }\n  backtrack(0, '');\n  return result;\n}`,
              explanation: "Line 3-4: Digit to letters mapping.\nLine 7-9: All digits processed → save combination.\nLine 11: Try each letter for current digit.\nLine 12: Recurse for next digit with updated string.\nNo explicit backtrack needed since strings are immutable — each recursive call creates a new string."
            }
          ]
        }
      ]
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      icon: "DP",
      conceptual: [
        { question: "How does the Coin Change problem demonstrate DP?", answer: "Given coins and a target amount, find minimum coins needed. Subproblem: dp[i] = min coins for amount i. Recurrence: dp[i] = min(dp[i - coin] + 1) for each coin. Base: dp[0] = 0. Build bottom-up from 1 to target. Each amount considers all coins, giving O(amount * coins) time. This shows optimal substructure (optimal solution uses optimal sub-solutions) and overlapping subproblems (same amounts computed multiple times in recursion).", difficulty: "medium", type: "concept" },
        { question: "Explain the Longest Common Subsequence (LCS) DP formulation.", answer: "Given strings s1 and s2, dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]. If s1[i-1] == s2[j-1], dp[i][j] = dp[i-1][j-1] + 1 (both characters match, extend LCS). Else dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip one character from either string). Base: dp[0][j] = dp[i][0] = 0. Time O(n*m), space O(n*m) or O(min(n,m)) with space optimization since we only need the previous row.", difficulty: "medium", type: "concept" },
        { question: "What is the 0/1 Knapsack problem?", answer: "Given items with weights and values, and a capacity W, maximize total value without exceeding capacity. Each item can be taken (1) or left (0). dp[i][w] = max value using first i items with capacity w. If weight[i] > w, dp[i][w] = dp[i-1][w] (can't take item). Else dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]). Time O(n*W), space O(n*W) or O(W) with 1D optimization.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Coin Change",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force (Recursion)",
              complexity: { time: "O(amount^n)", space: "O(amount)" },
              code: `function coinChange(coins, amount) {\n  if (amount === 0) return 0;\n  if (amount < 0) return -1;\n  let min = Infinity;\n  for (const coin of coins) {\n    const res = coinChange(coins, amount - coin);\n    if (res >= 0) min = Math.min(min, res + 1);\n  }\n  return min === Infinity ? -1 : min;\n}`,
              explanation: "Line 2: Amount 0 needs 0 coins.\nLine 3: Negative amount is impossible.\nLine 5-7: Try each coin, recurse on remaining.\nLine 9: Return min or -1 if impossible. Exponential without memoization."
            },
            {
              name: "Optimal (Bottom-Up DP)",
              complexity: { time: "O(amount × coins)", space: "O(amount)" },
              code: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (coin <= i && dp[i - coin] !== Infinity) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
              explanation: "Line 2: Initialize all amounts as Infinity (impossible).\nLine 3: 0 coins for amount 0.\nLine 4: Build up from 1 to amount.\nLine 5-8: For each coin, check if using it gives fewer coins.\nLine 11: Return answer or -1."
            }
          ]
        },
        {
          question: "Longest Common Subsequence",
          difficulty: "medium",
          approaches: [
            {
              name: "Recursive (Brute Force)",
              complexity: { time: "O(2^(n+m))", space: "O(n + m)" },
              code: `function longestCommonSubsequence(text1, text2) {\n  function lcs(i, j) {\n    if (i === text1.length || j === text2.length) return 0;\n    if (text1[i] === text2[j]) return 1 + lcs(i + 1, j + 1);\n    return Math.max(lcs(i + 1, j), lcs(i, j + 1));\n  }\n  return lcs(0, 0);\n}`,
              explanation: "Line 3: Base — end of either string.\nLine 4: Characters match — include and move both.\nLine 5: Don't match — try skipping from each string."
            },
            {
              name: "Optimal (DP Table)",
              complexity: { time: "O(n × m)", space: "O(n × m)" },
              code: `function longestCommonSubsequence(text1, text2) {\n  const n = text1.length, m = text2.length;\n  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let j = 1; j <= m; j++) {\n      if (text1[i - 1] === text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1;\n      } else {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n  return dp[n][m];\n}`,
              explanation: "Line 3: 2D DP table initialized to 0.\nLine 6-7: Characters match — extend LCS.\nLine 9: Don't match — take max of skipping from either string.\nLine 13: Answer at dp[n][m]."
            }
          ]
        },
        {
          question: "0/1 Knapsack",
          difficulty: "medium",
          approaches: [
            {
              name: "2D DP",
              complexity: { time: "O(n × W)", space: "O(n × W)" },
              code: `function knapsack(weights, values, W) {\n  const n = weights.length;\n  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= W; w++) {\n      dp[i][w] = dp[i - 1][w];\n      if (weights[i - 1] <= w) {\n        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);\n      }\n    }\n  }\n  return dp[n][W];\n}`,
              explanation: "Line 6: Don't take item i.\nLine 7-8: If item fits, consider taking it.\nLine 8: Value = previous state without item's weight + item's value.\nLine 12: Max value with n items and capacity W."
            },
            {
              name: "Optimized 1D DP",
              complexity: { time: "O(n × W)", space: "O(W)" },
              code: `function knapsack(weights, values, W) {\n  const dp = new Array(W + 1).fill(0);\n  for (let i = 0; i < weights.length; i++) {\n    for (let w = W; w >= weights[i]; w--) {\n      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);\n    }\n  }\n  return dp[W];\n}`,
              explanation: "Line 2: 1D array for current capacities.\nLine 4: Iterate capacity backwards to avoid using item twice.\nLine 5: Max of not taking (dp[w]) vs taking (dp[w-weight] + value).\nLine 8: Answer at dp[W]. O(W) space."
            }
          ]
        }
      ]
    },
    {
      id: "sorting-searching",
      title: "Sorting & Searching",
      icon: "SS",
      conceptual: [
        { question: "How does Merge Sort work and why is it preferred for linked lists?", answer: "Merge Sort divides the array in half, recursively sorts both halves, and merges them. It's O(n log n) always with O(n) space. For linked lists, merge sort is ideal because: merging sorted lists is O(1) space (repoint pointers), finding the middle is O(n) with slow/fast pointers, and random access isn't needed. Quick sort is harder on linked lists because partitioning requires random access. Merge sort is also stable, preserving relative order of equal elements.", difficulty: "medium", type: "concept" },
        { question: "How does searching in a rotated sorted array work?", answer: "A rotated sorted array has two sorted halves. At each step of binary search, determine which half is sorted (compare mid with left). If the target is within the sorted half's range, search there; otherwise search the other half. The key insight: at least one half of the array is always sorted. This gives O(log n) search. Handle duplicates by incrementing left when arr[left] == arr[mid], degrading to O(n) worst case.", difficulty: "medium", type: "concept" },
        { question: "What is the Quick Select algorithm?", answer: "Quick Select finds the kth smallest/largest element in O(n) average time using the partition scheme from Quick Sort. Choose a pivot, partition so elements smaller are left and larger are right. If pivot index equals k, we found it. If k is left, recurse on left partition only. If k is right, recurse on right. Unlike Quick Sort which recurses on both halves, Quick Select recurses on only one, giving O(n) average (geometric series). Worst case is O(n²) with bad pivots.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Merge Sort",
          difficulty: "medium",
          approaches: [
            {
              name: "Standard Implementation",
              complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) result.push(left[i++]);\n    else result.push(right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}`,
              explanation: "Line 2: Base case — single element.\nLine 3-5: Split and recursively sort both halves.\nLine 6: Merge sorted halves.\nLine 11-14: Compare and merge in order.\nLine 15: Append remaining elements."
            }
          ]
        },
        {
          question: "Search in Rotated Sorted Array",
          difficulty: "medium",
          approaches: [
            {
              name: "Linear Search",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function search(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === target) return i;\n  }\n  return -1;\n}`,
              explanation: "Simple scan. Doesn't use the sorted property."
            },
            {
              name: "Optimal (Modified Binary Search)",
              complexity: { time: "O(log n)", space: "O(1)" },
              code: `function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[left] <= nums[mid]) {\n      if (target >= nums[left] && target < nums[mid]) right = mid - 1;\n      else left = mid + 1;\n    } else {\n      if (target > nums[mid] && target <= nums[right]) left = mid + 1;\n      else right = mid - 1;\n    }\n  }\n  return -1;\n}`,
              explanation: "Line 5: Target found.\nLine 6: Left half is sorted.\nLine 7: Target is in sorted left half.\nLine 8: Target is in right half.\nLine 10-11: Right half is sorted — similar logic.\nO(log n) by narrowing search space by half each step."
            }
          ]
        }
      ]
    },
    {
      id: "greedy",
      title: "Greedy",
      icon: "Gd",
      conceptual: [
        { question: "What is the Job Sequencing problem?", answer: "Given jobs with deadlines and profits, schedule jobs to maximize profit. Each job takes 1 unit of time and must complete before its deadline. Greedy approach: sort by profit (descending), then for each job assign the latest available slot before its deadline. Use a boolean array to track occupied slots. Time O(n²) with simple array, O(n log n) with Union-Find optimization. This works because choosing the highest-profit job first and placing it as late as possible leaves earlier slots available for other jobs.", difficulty: "medium", type: "concept" },
        { question: "How does the Minimum Platforms problem work?", answer: "Given train arrival and departure times, find minimum platforms needed so no train waits. Greedy approach: sort arrivals and departures separately. Use two pointers — if next event is an arrival, increment platforms needed; if departure, decrement. Track maximum platforms at any point. Time O(n log n) for sorting. This works because sorting allows us to process events chronologically without tracking which train is on which platform.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Job Sequencing Problem",
          difficulty: "medium",
          approaches: [
            {
              name: "Greedy",
              complexity: { time: "O(n²)", space: "O(n)" },
              code: `function jobSequencing(jobs) {\n  jobs.sort((a, b) => b.profit - a.profit);\n  const maxDeadline = Math.max(...jobs.map(j => j.deadline));\n  const slots = new Array(maxDeadline + 1).fill(false);\n  let totalProfit = 0, jobCount = 0;\n  for (const job of jobs) {\n    for (let t = job.deadline; t >= 1; t--) {\n      if (!slots[t]) {\n        slots[t] = true;\n        totalProfit += job.profit;\n        jobCount++;\n        break;\n      }\n    }\n  }\n  return { jobCount, totalProfit };\n}`,
              explanation: "Line 2: Sort by profit descending — greedily pick most profitable first.\nLine 4: Track which time slots are taken.\nLine 7: Try latest slot first (before deadline).\nLine 8-12: If slot is free, assign job.\nLine 16: Return count and total profit."
            }
          ]
        },
        {
          question: "Minimum Platforms",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function minPlatforms(arrivals, departures) {\n  let maxPlatforms = 0;\n  for (let i = 0; i < arrivals.length; i++) {\n    let count = 1;\n    for (let j = 0; j < arrivals.length; j++) {\n      if (i !== j && arrivals[j] <= departures[i] && departures[j] >= arrivals[i]) {\n        count++;\n      }\n    }\n    maxPlatforms = Math.max(maxPlatforms, count);\n  }\n  return maxPlatforms;\n}`,
              explanation: "Line 3-10: For each train, count how many overlap with it.\nO(n²) — checks all pairs."
            },
            {
              name: "Optimal (Sort + Two Pointers)",
              complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function minPlatforms(arrivals, departures) {\n  arrivals.sort((a, b) => a - b);\n  departures.sort((a, b) => a - b);\n  let platforms = 0, maxPlatforms = 0;\n  let i = 0, j = 0;\n  while (i < arrivals.length) {\n    if (arrivals[i] <= departures[j]) {\n      platforms++;\n      i++;\n    } else {\n      platforms--;\n      j++;\n    }\n    maxPlatforms = Math.max(maxPlatforms, platforms);\n  }\n  return maxPlatforms;\n}`,
              explanation: "Line 2-3: Sort both arrays independently.\nLine 7-9: Train arrives — need more platform.\nLine 10-12: Train departs — free a platform.\nLine 14: Track maximum simultaneous trains.\nO(n log n) for sorting."
            }
          ]
        }
      ]
    },
    {
      id: "hashing",
      title: "Hashing",
      icon: "Ha",
      conceptual: [
        { question: "What is the prefix sum + hash map technique?", answer: "For subarray sum problems, prefix sum transforms 'sum of subarray [i,j]' into 'prefix[j] - prefix[i-1]'. To find subarrays with sum k, store prefix sums in a hash map. At each index, check if (currentPrefix - k) exists in the map. If yes, there's a subarray ending here with sum k. This converts O(n²) brute force to O(n). Used in Subarray Sum Equals K, Count Subarrays with Given XOR, and similar problems.", difficulty: "medium", type: "concept" },
        { question: "How does the Longest Consecutive Sequence use hashing?", answer: "Put all numbers in a HashSet. For each number, check if it's the START of a sequence (n-1 not in set). If it is, count consecutive numbers (n, n+1, n+2...). Track the maximum length. Each number is visited at most twice (once in the outer loop, once in a sequence extension), giving O(n) time. The key insight is only starting from sequence starts avoids redundant counting.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Subarray Sum Equals K",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function subarraySum(nums, k) {\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = i; j < nums.length; j++) {\n      sum += nums[j];\n      if (sum === k) count++;\n    }\n  }\n  return count;\n}`,
              explanation: "Line 3-8: Try all subarrays, track running sum. Count matches."
            },
            {
              name: "Optimal (Prefix Sum + HashMap)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function subarraySum(nums, k) {\n  const map = new Map([[0, 1]]);\n  let count = 0, prefixSum = 0;\n  for (const num of nums) {\n    prefixSum += num;\n    if (map.has(prefixSum - k)) count += map.get(prefixSum - k);\n    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);\n  }\n  return count;\n}`,
              explanation: "Line 2: Initialize with prefix sum 0 seen once.\nLine 5: Running prefix sum.\nLine 6: If (prefixSum - k) was seen before, those subarrays sum to k.\nLine 7: Record current prefix sum.\nO(n) time, O(n) space."
            }
          ]
        },
        {
          question: "Longest Consecutive Sequence",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force (Sort)",
              complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function longestConsecutive(nums) {\n  if (nums.length === 0) return 0;\n  nums.sort((a, b) => a - b);\n  let maxLen = 1, currentLen = 1;\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] === nums[i - 1]) continue;\n    if (nums[i] === nums[i - 1] + 1) currentLen++;\n    else currentLen = 1;\n    maxLen = Math.max(maxLen, currentLen);\n  }\n  return maxLen;\n}`,
              explanation: "Sort and scan for consecutive runs. O(n log n) for sorting."
            },
            {
              name: "Optimal (HashSet)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let maxLen = 0;\n  for (const num of set) {\n    if (!set.has(num - 1)) {\n      let current = num, length = 1;\n      while (set.has(current + 1)) { current++; length++; }\n      maxLen = Math.max(maxLen, length);\n    }\n  }\n  return maxLen;\n}`,
              explanation: "Line 2: Put all numbers in a set.\nLine 5: Only start counting from sequence beginnings (no predecessor).\nLine 7: Count consecutive numbers.\nLine 8: Update max length.\nEach number visited at most twice — O(n)."
            }
          ]
        }
      ]
    },
    {
      id: "bit-manipulation",
      title: "Bit Manipulation",
      icon: "Bi",
      conceptual: [
        { question: "How do you count set bits (Hamming Weight)?", answer: "Method 1: Check each bit with n & 1, then right shift. O(32) for 32-bit int. Method 2: Brian Kernighan's — n & (n-1) removes the lowest set bit. Count iterations until n = 0. This is O(k) where k is the number of set bits. Method 3: Lookup table for bytes — precompute counts for 0-255, split number into bytes. For counting bits for all numbers 0 to n, use DP: bits[i] = bits[i >> 1] + (i & 1).", difficulty: "medium", type: "concept" },
        { question: "How to find two non-repeating numbers when all others appear twice?", answer: "XOR all numbers — result is XOR of the two unique numbers (duplicates cancel). Find any set bit in the XOR result (use xor & (-xor) to isolate lowest set bit). This bit is set in one unique number but not the other. Partition all numbers into two groups based on this bit. XOR each group — each group yields one unique number. Time O(n), space O(1). This extends the single-number XOR trick.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Count Set Bits (Hamming Weight)",
          difficulty: "medium",
          approaches: [
            {
              name: "Basic (Check Each Bit)",
              complexity: { time: "O(32)", space: "O(1)" },
              code: `function hammingWeight(n) {\n  let count = 0;\n  while (n > 0) {\n    count += n & 1;\n    n = n >>> 1;\n  }\n  return count;\n}`,
              explanation: "Line 4: Check lowest bit.\nLine 5: Unsigned right shift.\nAlways checks up to 32 bits."
            },
            {
              name: "Optimal (Brian Kernighan's)",
              complexity: { time: "O(k) where k = set bits", space: "O(1)" },
              code: `function hammingWeight(n) {\n  let count = 0;\n  while (n > 0) {\n    n = n & (n - 1);\n    count++;\n  }\n  return count;\n}`,
              explanation: "Line 4: n & (n-1) removes the lowest set bit.\nLine 5: Count each removal.\nOnly iterates k times where k is the number of set bits."
            }
          ]
        },
        {
          question: "Find Two Non-Repeating Numbers",
          difficulty: "medium",
          approaches: [
            {
              name: "HashMap",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function findTwoUnique(nums) {\n  const freq = {};\n  for (const n of nums) freq[n] = (freq[n] || 0) + 1;\n  return Object.keys(freq).filter(k => freq[k] === 1).map(Number);\n}`,
              explanation: "Count frequencies and filter elements appearing once. O(n) space."
            },
            {
              name: "Optimal (XOR + Bit Partitioning)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function findTwoUnique(nums) {\n  let xor = 0;\n  for (const n of nums) xor ^= n;\n  const diffBit = xor & (-xor);\n  let a = 0, b = 0;\n  for (const n of nums) {\n    if (n & diffBit) a ^= n;\n    else b ^= n;\n  }\n  return [a, b];\n}`,
              explanation: "Line 3: XOR all — gives xor of two unique numbers.\nLine 4: Isolate the lowest differing bit.\nLine 6-8: Partition into two groups by this bit. XOR each group.\nLine 10: Each group's XOR is one unique number. O(1) space."
            }
          ]
        }
      ]
    },
    {
      id: "heaps",
      title: "Heaps",
      icon: "Hp",
      conceptual: [
        { question: "How do you merge K sorted lists efficiently?", answer: "Use a min-heap of size K containing the head of each list. Extract min, add it to the result, and push the next element from that list. Time O(N log K) where N is total elements. Space O(K) for the heap. Alternative: divide and conquer — merge pairs of lists repeatedly. Both are O(N log K). The heap approach is preferred when lists arrive as streams since it processes elements one at a time.", difficulty: "medium", type: "concept" },
        { question: "How does Top K Frequent Elements use a heap?", answer: "Count frequencies using a hash map O(n). Then either: (1) Use a min-heap of size K — push elements, pop when size exceeds K, keeping K most frequent. O(n log k). Or (2) Use Quick Select to find the Kth most frequent in O(n) average. Or (3) Bucket Sort — create buckets indexed by frequency, collect from highest buckets. O(n) guaranteed. The bucket sort approach is optimal but the heap approach is most commonly expected in interviews.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Merge K Sorted Lists",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force (Collect and Sort)",
              complexity: { time: "O(N log N)", space: "O(N)" },
              code: `function mergeKLists(lists) {\n  const all = [];\n  for (const list of lists) {\n    let node = list;\n    while (node) { all.push(node.val); node = node.next; }\n  }\n  all.sort((a, b) => a - b);\n  const dummy = { val: 0, next: null };\n  let current = dummy;\n  for (const val of all) {\n    current.next = { val, next: null };\n    current = current.next;\n  }\n  return dummy.next;\n}`,
              explanation: "Collect all values, sort, rebuild list. O(N log N) where N is total nodes."
            },
            {
              name: "Optimal (Divide and Conquer)",
              complexity: { time: "O(N log K)", space: "O(log K)" },
              code: `function mergeKLists(lists) {\n  if (lists.length === 0) return null;\n  while (lists.length > 1) {\n    const merged = [];\n    for (let i = 0; i < lists.length; i += 2) {\n      const l1 = lists[i];\n      const l2 = i + 1 < lists.length ? lists[i + 1] : null;\n      merged.push(mergeTwoLists(l1, l2));\n    }\n    lists = merged;\n  }\n  return lists[0];\n}\nfunction mergeTwoLists(l1, l2) {\n  const dummy = { val: 0, next: null };\n  let c = dummy;\n  while (l1 && l2) {\n    if (l1.val <= l2.val) { c.next = l1; l1 = l1.next; }\n    else { c.next = l2; l2 = l2.next; }\n    c = c.next;\n  }\n  c.next = l1 || l2;\n  return dummy.next;\n}`,
              explanation: "Line 3-10: Merge lists in pairs, reducing K to K/2 each round.\nLine 14-23: Standard merge of two sorted lists.\nLog K rounds, each processing N total nodes — O(N log K)."
            }
          ]
        },
        {
          question: "Top K Frequent Elements",
          difficulty: "medium",
          approaches: [
            {
              name: "Sort by Frequency",
              complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function topKFrequent(nums, k) {\n  const freq = {};\n  for (const n of nums) freq[n] = (freq[n] || 0) + 1;\n  return Object.keys(freq)\n    .sort((a, b) => freq[b] - freq[a])\n    .slice(0, k)\n    .map(Number);\n}`,
              explanation: "Count frequencies, sort by frequency descending, take top k."
            },
            {
              name: "Optimal (Bucket Sort)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function topKFrequent(nums, k) {\n  const freq = {};\n  for (const n of nums) freq[n] = (freq[n] || 0) + 1;\n  const buckets = new Array(nums.length + 1).fill(null).map(() => []);\n  for (const [num, count] of Object.entries(freq)) {\n    buckets[count].push(Number(num));\n  }\n  const result = [];\n  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {\n    result.push(...buckets[i]);\n  }\n  return result.slice(0, k);\n}`,
              explanation: "Line 2-3: Count frequencies.\nLine 4: Buckets indexed by frequency (max freq = n).\nLine 5-6: Place numbers in their frequency bucket.\nLine 9-11: Collect from highest frequency buckets first.\nO(n) time guaranteed."
            }
          ]
        }
      ]
    },
    {
      id: "tries",
      title: "Tries",
      icon: "Ti",
      conceptual: [
        { question: "How does Word Search II use a Trie?", answer: "Build a Trie from the word list. Then DFS on the grid: at each cell, check if the current path exists in the Trie. If a node has isEnd=true, we found a word. If a node has no children matching the next cell, prune that path. This is much faster than searching for each word separately. Time O(m*n*4^L) where L is max word length, but Trie pruning makes it much faster in practice. Remove found words from Trie to avoid duplicates.", difficulty: "medium", type: "concept" },
        { question: "How would you implement autocomplete with a Trie?", answer: "Insert all words into a Trie. For autocomplete, traverse the Trie following the prefix characters. If prefix exists, do DFS from that node to collect all words (concatenate characters along the path). Optionally limit results to top K by frequency — store frequency counts in nodes and use a priority queue during collection. Time O(p + k) where p is prefix length and k is number of results. For real-time autocomplete, consider ternary search tries for better space efficiency.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Word Search II",
          difficulty: "medium",
          approaches: [
            {
              name: "Trie + DFS",
              complexity: { time: "O(m × n × 4^L)", space: "O(W × L)" },
              code: `function findWords(board, words) {\n  const root = {};\n  for (const word of words) {\n    let node = root;\n    for (const c of word) {\n      if (!node[c]) node[c] = {};\n      node = node[c];\n    }\n    node.word = word;\n  }\n  const result = [];\n  const rows = board.length, cols = board[0].length;\n  function dfs(r, c, node) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols) return;\n    const char = board[r][c];\n    if (char === '#' || !node[char]) return;\n    node = node[char];\n    if (node.word) {\n      result.push(node.word);\n      node.word = null;\n    }\n    board[r][c] = '#';\n    dfs(r+1,c,node); dfs(r-1,c,node);\n    dfs(r,c+1,node); dfs(r,c-1,node);\n    board[r][c] = char;\n  }\n  for (let r = 0; r < rows; r++)\n    for (let c = 0; c < cols; c++) dfs(r, c, root);\n  return result;\n}`,
              explanation: "Line 2-9: Build Trie from words, storing full word at end nodes.\nLine 14-16: Boundary, visited, and Trie pruning checks.\nLine 18-20: Found a word — add to result, remove to avoid duplicates.\nLine 22-25: DFS with backtracking (mark visited, explore, unmark).\nLine 27-28: Try DFS from every cell."
            }
          ]
        },
        {
          question: "Implement Autocomplete System",
          difficulty: "medium",
          approaches: [
            {
              name: "Trie with DFS Collection",
              complexity: { time: "O(p + total chars in results)", space: "O(total chars)" },
              code: `class AutocompleteSystem {\n  constructor(sentences) {\n    this.root = {};\n    for (const s of sentences) this.insert(s);\n  }\n  insert(word) {\n    let node = this.root;\n    for (const c of word) {\n      if (!node[c]) node[c] = {};\n      node = node[c];\n    }\n    node.isEnd = true;\n  }\n  search(prefix) {\n    let node = this.root;\n    for (const c of prefix) {\n      if (!node[c]) return [];\n      node = node[c];\n    }\n    const results = [];\n    this.collect(node, prefix, results);\n    return results;\n  }\n  collect(node, prefix, results) {\n    if (node.isEnd) results.push(prefix);\n    for (const c in node) {\n      if (c !== 'isEnd') this.collect(node[c], prefix + c, results);\n    }\n  }\n}`,
              explanation: "Line 6-12: Standard Trie insert.\nLine 14-22: Follow prefix in Trie, then collect all words from that node.\nLine 24-28: DFS to collect all complete words (where isEnd is true).\nLine 25: Current node is end of a word — add to results.\nLine 26-27: Recurse on all children."
            }
          ]
        }
      ]
    },
    {
      id: "sliding-window",
      title: "Sliding Window",
      icon: "SW",
      conceptual: [
        { question: "How does Minimum Window Substring work?", answer: "Use a variable-size sliding window with two hash maps — one for target character frequencies, one for window frequencies. Expand right to include characters. When all target characters are covered (each char count >= target count), try shrinking from left to minimize window size. Track the minimum valid window. Time O(n), space O(k) where k is alphabet size. The key insight is the 'formed' counter — increment when a character's window count matches its target count.", difficulty: "medium", type: "concept" },
        { question: "What is the at-most-K distinct characters pattern?", answer: "Maintain a sliding window with a hash map counting character frequencies. Expand right. When distinct characters exceed K, shrink from left (decrement counts, remove when count hits 0). Track maximum window size. Longest Substring with At Most K Distinct Characters and Fruits Into Baskets (K=2) use this pattern. Time O(n) since each character is added/removed at most once. This is a template for many substring problems.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Minimum Window Substring",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n² × m)", space: "O(m)" },
              code: `function minWindow(s, t) {\n  let minLen = Infinity, result = "";\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i; j < s.length; j++) {\n      const sub = s.slice(i, j + 1);\n      if (containsAll(sub, t) && sub.length < minLen) {\n        minLen = sub.length;\n        result = sub;\n      }\n    }\n  }\n  return result;\n}\nfunction containsAll(s, t) {\n  const freq = {};\n  for (const c of t) freq[c] = (freq[c] || 0) + 1;\n  for (const c of s) { if (freq[c]) freq[c]--; }\n  return Object.values(freq).every(v => v <= 0);\n}`,
              explanation: "Check all substrings and verify each contains all characters of t."
            },
            {
              name: "Optimal (Sliding Window)",
              complexity: { time: "O(n)", space: "O(k)" },
              code: `function minWindow(s, t) {\n  const need = {};\n  for (const c of t) need[c] = (need[c] || 0) + 1;\n  let left = 0, formed = 0, required = Object.keys(need).length;\n  let minLen = Infinity, minStart = 0;\n  const window = {};\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    window[c] = (window[c] || 0) + 1;\n    if (need[c] && window[c] === need[c]) formed++;\n    while (formed === required) {\n      if (right - left + 1 < minLen) {\n        minLen = right - left + 1;\n        minStart = left;\n      }\n      const lc = s[left];\n      window[lc]--;\n      if (need[lc] && window[lc] < need[lc]) formed--;\n      left++;\n    }\n  }\n  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);\n}`,
              explanation: "Line 2-3: Count required characters.\nLine 4: Track how many distinct chars are fully covered.\nLine 9: Add right char to window.\nLine 10: Check if this char is now fully covered.\nLine 11-19: While window is valid, try shrinking from left.\nLine 12-14: Update minimum window.\nLine 16-18: Remove left char, check if coverage breaks.\nO(n) — each char added/removed once."
            }
          ]
        },
        {
          question: "Longest Substring with At Most K Distinct Characters",
          difficulty: "medium",
          approaches: [
            {
              name: "Sliding Window",
              complexity: { time: "O(n)", space: "O(k)" },
              code: `function lengthOfLongestSubstringKDistinct(s, k) {\n  const freq = {};\n  let left = 0, maxLen = 0, distinct = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (!freq[s[right]] || freq[s[right]] === 0) distinct++;\n    freq[s[right]] = (freq[s[right]] || 0) + 1;\n    while (distinct > k) {\n      freq[s[left]]--;\n      if (freq[s[left]] === 0) distinct--;\n      left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
              explanation: "Line 5-6: Add right char, track distinct count.\nLine 7-10: If too many distinct chars, shrink from left.\nLine 8-9: Remove left char, decrement distinct if count reaches 0.\nLine 12: Update max window size.\nO(n) time — each char processed at most twice."
            }
          ]
        }
      ]
    },
    {
      id: "two-pointers",
      title: "Two Pointers",
      icon: "TP",
      conceptual: [
        { question: "How does 3Sum use two pointers?", answer: "Sort the array. Fix one element with outer loop, then use two pointers on the remaining subarray to find pairs that sum to the negative of the fixed element. Skip duplicates at all three levels to avoid duplicate triplets. Time O(n²): outer loop O(n) × two-pointer O(n). Space O(1) excluding output. Key edge cases: handling duplicates by skipping equal adjacent elements after finding a valid triplet.", difficulty: "medium", type: "concept" },
        { question: "How does Container With Most Water use two pointers?", answer: "Start with pointers at both ends (widest container). Calculate area = min(height[left], height[right]) × (right - left). Move the pointer with the shorter height inward — the only way to potentially get a larger area is by finding a taller wall, and moving the taller one inward can only decrease the width with no guarantee of improvement. This greedy observation ensures we don't miss the optimal solution. Time O(n), space O(1).", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "3Sum",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n³)", space: "O(1)" },
              code: `function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const result = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    for (let j = i + 1; j < nums.length - 1; j++) {\n      if (j > i + 1 && nums[j] === nums[j - 1]) continue;\n      for (let k = j + 1; k < nums.length; k++) {\n        if (k > j + 1 && nums[k] === nums[k - 1]) continue;\n        if (nums[i] + nums[j] + nums[k] === 0) result.push([nums[i], nums[j], nums[k]]);\n      }\n    }\n  }\n  return result;\n}`,
              explanation: "Sort to handle duplicates, check all triplets with skip logic."
            },
            {
              name: "Optimal (Sort + Two Pointers)",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const result = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        result.push([nums[i], nums[left], nums[right]]);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++; right--;\n      } else if (sum < 0) left++;\n      else right--;\n    }\n  }\n  return result;\n}`,
              explanation: "Line 2: Sort for two-pointer technique.\nLine 5: Skip duplicate first elements.\nLine 6: Two pointers on remaining subarray.\nLine 8: Calculate triplet sum.\nLine 9-13: Found triplet — skip duplicates, move both pointers.\nLine 14: Sum too small — move left right.\nLine 15: Sum too large — move right left."
            }
          ]
        },
        {
          question: "Container With Most Water",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function maxArea(height) {\n  let max = 0;\n  for (let i = 0; i < height.length; i++) {\n    for (let j = i + 1; j < height.length; j++) {\n      const area = Math.min(height[i], height[j]) * (j - i);\n      max = Math.max(max, area);\n    }\n  }\n  return max;\n}`,
              explanation: "Check all pairs of walls. O(n²)."
            },
            {
              name: "Optimal (Two Pointers)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function maxArea(height) {\n  let left = 0, right = height.length - 1, max = 0;\n  while (left < right) {\n    const area = Math.min(height[left], height[right]) * (right - left);\n    max = Math.max(max, area);\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return max;\n}`,
              explanation: "Line 2: Start at widest container.\nLine 4: Calculate area (limited by shorter wall).\nLine 6: Move shorter wall inward — only way to potentially increase area.\nLine 7: If right is shorter or equal, move it.\nO(n) — each pointer moves at most n times."
            }
          ]
        }
      ]
    }
  ]
};
