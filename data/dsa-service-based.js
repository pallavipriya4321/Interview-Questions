export const serviceBased = {
  id: "service-based",
  title: "Service Based",
  description: "TCS, Infosys, Wipro, Cognizant, Accenture",
  topics: [
    {
      id: "arrays",
      title: "Arrays",
      icon: "Ar",
      conceptual: [
        { question: "What is the difference between an array and a linked list?", answer: "Arrays store elements in contiguous memory locations allowing O(1) random access via index, while linked lists store elements in nodes scattered in memory connected by pointers. Arrays have fixed size (in most languages) and expensive O(n) insertions/deletions in the middle since elements must shift. Linked lists allow O(1) insertion/deletion at known positions but require O(n) to access an element by index. Arrays have better cache performance due to spatial locality.", difficulty: "beginner", type: "concept" },
        { question: "What is the time complexity of common array operations?", answer: "Access by index is O(1) since arrays use contiguous memory. Searching for an element is O(n) in unsorted arrays and O(log n) in sorted arrays using binary search. Insertion at the end is O(1) amortized for dynamic arrays, but O(n) at the beginning or middle since elements must shift. Deletion is similarly O(n) in the worst case. Sorting takes O(n log n) with efficient algorithms like merge sort or quicksort.", difficulty: "beginner", type: "concept" },
        { question: "What are subarrays, subsequences, and subsets?", answer: "A subarray is a contiguous portion of an array — for [1,2,3], subarrays include [1], [1,2], [2,3], [1,2,3]. A subsequence maintains relative order but elements need not be contiguous — [1,3] is a subsequence of [1,2,3]. A subset is any collection of elements regardless of order — {2,1} is a subset of {1,2,3}. An array of size n has n*(n+1)/2 subarrays, 2^n subsequences, and 2^n subsets.", difficulty: "beginner", type: "concept" },
      ],
      coding: [
        {
          question: "Two Sum",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`,
              explanation: "Line 2: Outer loop picks the first element.\nLine 3: Inner loop picks the second element starting after i to avoid duplicates.\nLine 4-5: If the pair sums to target, return their indices.\nLine 9: Return empty array if no pair found."
            },
            {
              name: "Optimal (HashMap)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
              explanation: "Line 2: Create a HashMap to store value -> index.\nLine 4: Calculate the complement needed to reach target.\nLine 5-6: If complement already exists in map, we found our pair.\nLine 8: Otherwise, store current value and its index.\nLine 10: Single pass O(n) — each lookup and insert is O(1)."
            }
          ]
        },
        {
          question: "Find Maximum Element in Array",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Sort)",
              complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function findMax(nums) {\n  nums.sort((a, b) => a - b);\n  return nums[nums.length - 1];\n}`,
              explanation: "Line 2: Sort array in ascending order — O(n log n).\nLine 3: Last element after sorting is the maximum."
            },
            {
              name: "Optimal (Linear Scan)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function findMax(nums) {\n  let max = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] > max) {\n      max = nums[i];\n    }\n  }\n  return max;\n}`,
              explanation: "Line 2: Initialize max with the first element.\nLine 3: Iterate through remaining elements.\nLine 4-5: Update max whenever a larger element is found.\nLine 8: Return the maximum after one pass — O(n) time, O(1) space."
            }
          ]
        },
        {
          question: "Reverse an Array",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Extra Array)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function reverseArray(arr) {\n  const result = [];\n  for (let i = arr.length - 1; i >= 0; i--) {\n    result.push(arr[i]);\n  }\n  return result;\n}`,
              explanation: "Line 2: Create a new array for the result.\nLine 3-4: Iterate from end to beginning, pushing each element.\nLine 6: Return the reversed array. Uses O(n) extra space."
            },
            {
              name: "Optimal (Two Pointers In-Place)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function reverseArray(arr) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    [arr[left], arr[right]] = [arr[right], arr[left]];\n    left++;\n    right--;\n  }\n  return arr;\n}`,
              explanation: "Line 2: Initialize two pointers at both ends.\nLine 3: Continue while pointers haven't crossed.\nLine 4: Swap elements at left and right using destructuring.\nLine 5-6: Move both pointers inward.\nLine 8: Array is reversed in-place with O(1) space."
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
        { question: "What is the difference between strings and character arrays?", answer: "In JavaScript, strings are immutable — you cannot modify individual characters after creation. Any 'modification' creates a new string. Character arrays are mutable and allow in-place modifications. Strings have built-in methods like slice, indexOf, replace. For problems requiring frequent character modifications, converting to an array first with split('') is more efficient than creating new strings repeatedly.", difficulty: "beginner", type: "concept" },
        { question: "What are common string manipulation techniques?", answer: "Key techniques include: two-pointer approach for palindrome checks and reversal, sliding window for substring problems, hashing for anagram detection, and KMP/Rabin-Karp for pattern matching. ASCII values are useful for character frequency counting using arrays of size 26 or 128. StringBuilder pattern (using array + join) is important in JS since string concatenation in loops creates O(n²) intermediate strings.", difficulty: "medium", type: "concept" },
        { question: "How does string comparison work internally?", answer: "String comparison is lexicographic — characters are compared left to right using their Unicode/ASCII values. 'a' < 'b' because 97 < 98. The comparison stops at the first differing character. If one string is a prefix of the other, the shorter one is considered smaller. In JavaScript, === checks both value and type, while == may coerce. String comparison is O(n) where n is the length of the shorter string.", difficulty: "beginner", type: "concept" },
      ],
      coding: [
        {
          question: "Reverse a String",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Built-in)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function reverseString(s) {\n  return s.split('').reverse().join('');\n}`,
              explanation: "Line 2: Split string to array, reverse it, join back. Creates multiple intermediate arrays so uses O(n) extra space."
            },
            {
              name: "Optimal (Two Pointers)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function reverseString(s) {\n  const arr = s.split('');\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    [arr[left], arr[right]] = [arr[right], arr[left]];\n    left++;\n    right--;\n  }\n  return arr.join('');\n}`,
              explanation: "Line 2: Convert to array for in-place modification.\nLine 3: Two pointers at both ends.\nLine 4-7: Swap characters moving inward until pointers meet.\nLine 9: Join back to string. The swap is done in-place within the array."
            }
          ]
        },
        {
          question: "Check if String is Palindrome",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Reverse and Compare)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function isPalindrome(s) {\n  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  const reversed = cleaned.split('').reverse().join('');\n  return cleaned === reversed;\n}`,
              explanation: "Line 2: Remove non-alphanumeric chars and convert to lowercase.\nLine 3: Create reversed version of the string.\nLine 4: Compare original cleaned string with reversed. Uses O(n) extra space for reversed string."
            },
            {
              name: "Optimal (Two Pointers)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function isPalindrome(s) {\n  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let left = 0, right = cleaned.length - 1;\n  while (left < right) {\n    if (cleaned[left] !== cleaned[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}`,
              explanation: "Line 2: Clean the string.\nLine 3: Initialize two pointers.\nLine 4-7: Compare characters from both ends moving inward.\nLine 5: If any mismatch, not a palindrome.\nLine 9: If all characters matched, it is a palindrome."
            }
          ]
        },
        {
          question: "Check if Two Strings are Anagrams",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Sort)",
              complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  return s.split('').sort().join('') === t.split('').sort().join('');\n}`,
              explanation: "Line 2: Different lengths means they can't be anagrams.\nLine 3: Sort both strings and compare. If sorted versions are equal, they are anagrams."
            },
            {
              name: "Optimal (Frequency Count)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = new Array(26).fill(0);\n  for (let i = 0; i < s.length; i++) {\n    count[s.charCodeAt(i) - 97]++;\n    count[t.charCodeAt(i) - 97]--;\n  }\n  return count.every(c => c === 0);\n}`,
              explanation: "Line 2: Quick length check.\nLine 3: Array of 26 zeros for each letter.\nLine 5: Increment count for chars in s.\nLine 6: Decrement count for chars in t.\nLine 8: If all counts are zero, strings are anagrams. Space is O(1) since array is fixed size 26."
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
        { question: "What are the types of linked lists?", answer: "Singly linked list has nodes with data and a next pointer. Doubly linked list adds a prev pointer allowing traversal in both directions. Circular linked list has the last node pointing back to the head. Doubly circular has both prev and next with circular connections. Singly is simplest and most common in interviews. Doubly is used in LRU Cache implementations.", difficulty: "beginner", type: "concept" },
        { question: "How do you detect a cycle in a linked list?", answer: "Floyd's Cycle Detection (Tortoise and Hare) uses two pointers — slow moves one step, fast moves two steps. If there's a cycle, fast will eventually catch up to slow inside the cycle. If fast reaches null, there's no cycle. To find the cycle start, reset one pointer to head and move both at the same speed — they meet at the cycle start. This works in O(n) time and O(1) space.", difficulty: "medium", type: "concept" },
        { question: "What are the advantages of linked lists over arrays?", answer: "Linked lists allow O(1) insertion and deletion at any known position without shifting elements. They have dynamic size — no need to pre-allocate memory. They use exactly as much memory as needed (no wasted capacity). However, arrays are better for random access O(1) vs O(n) in linked lists, and arrays have better cache locality since elements are stored contiguously in memory.", difficulty: "beginner", type: "concept" },
      ],
      coding: [
        {
          question: "Reverse a Linked List",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Using Stack)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function reverseList(head) {\n  const stack = [];\n  let current = head;\n  while (current) {\n    stack.push(current.val);\n    current = current.next;\n  }\n  current = head;\n  while (current) {\n    current.val = stack.pop();\n    current = current.next;\n  }\n  return head;\n}`,
              explanation: "Line 2: Create a stack to store values.\nLine 3-6: Traverse list, pushing all values onto stack.\nLine 8-11: Traverse again, popping values (LIFO order reverses them).\nLine 13: Return head — same nodes, reversed values."
            },
            {
              name: "Optimal (Iterative Pointer Reversal)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}`,
              explanation: "Line 2: prev starts as null (new tail).\nLine 3: current starts at head.\nLine 5: Save next node before we overwrite the pointer.\nLine 6: Reverse the link — current now points to prev.\nLine 7-8: Move prev and current one step forward.\nLine 10: prev is the new head after loop completes."
            }
          ]
        },
        {
          question: "Detect Cycle in Linked List",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force (HashSet)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function hasCycle(head) {\n  const visited = new Set();\n  let current = head;\n  while (current) {\n    if (visited.has(current)) return true;\n    visited.add(current);\n    current = current.next;\n  }\n  return false;\n}`,
              explanation: "Line 2: Set to track visited nodes.\nLine 4-7: Traverse the list. If we see a node twice, there's a cycle.\nLine 8: If we reach null, no cycle exists. Uses O(n) space for the set."
            },
            {
              name: "Optimal (Floyd's Tortoise & Hare)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function hasCycle(head) {\n  let slow = head;\n  let fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}`,
              explanation: "Line 2-3: Both pointers start at head.\nLine 4: Continue while fast can move two steps.\nLine 5: Slow moves one step.\nLine 6: Fast moves two steps.\nLine 7: If they meet, there's a cycle.\nLine 9: If fast reaches null, no cycle. O(1) space."
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
        { question: "What is the difference between a stack and a queue?", answer: "A stack follows LIFO (Last In First Out) — the last element added is the first removed, like a stack of plates. A queue follows FIFO (First In First Out) — the first element added is the first removed, like a line at a store. Both support O(1) push/enqueue and O(1) pop/dequeue. Stacks are used for function calls, undo operations, and expression evaluation. Queues are used for BFS, task scheduling, and buffering.", difficulty: "beginner", type: "concept" },
        { question: "How can you implement a queue using two stacks?", answer: "Use two stacks: an input stack and an output stack. For enqueue, push to the input stack. For dequeue, if the output stack is empty, pop all elements from input stack and push them to output stack, then pop from output. This reverses the order giving FIFO behavior. Amortized time complexity is O(1) per operation since each element is moved between stacks at most once.", difficulty: "medium", type: "concept" },
        { question: "What is a monotonic stack and when is it used?", answer: "A monotonic stack maintains elements in strictly increasing or decreasing order. When a new element violates the order, elements are popped until the invariant is restored. It's used for 'next greater element', 'next smaller element', 'largest rectangle in histogram', and 'trapping rain water' problems. It reduces what would be O(n²) brute force to O(n) since each element is pushed and popped at most once.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Valid Parentheses",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Replace Pairs)",
              complexity: { time: "O(n²)", space: "O(n)" },
              code: `function isValid(s) {\n  while (s.includes('()') || s.includes('[]') || s.includes('{}')) {\n    s = s.replace('()', '').replace('[]', '').replace('{}', '');\n  }\n  return s.length === 0;\n}`,
              explanation: "Line 2: Keep checking for matching adjacent pairs.\nLine 3: Remove all adjacent matching pairs.\nLine 5: If string is empty, all brackets were matched. O(n²) since replace is O(n) and we may need n/2 passes."
            },
            {
              name: "Optimal (Stack)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', ']': '[', '}': '{' };\n  for (const char of s) {\n    if (char === '(' || char === '[' || char === '{') {\n      stack.push(char);\n    } else {\n      if (stack.pop() !== map[char]) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
              explanation: "Line 2: Stack to track opening brackets.\nLine 3: Map closing brackets to their opening counterparts.\nLine 5-6: Push opening brackets onto stack.\nLine 8: For closing brackets, pop stack and check if it matches.\nLine 11: Valid if stack is empty (all brackets matched)."
            }
          ]
        },
        {
          question: "Implement Queue using Two Stacks",
          difficulty: "medium",
          approaches: [
            {
              name: "Approach 1 (Costly Dequeue)",
              complexity: { time: "O(n) dequeue, O(1) enqueue", space: "O(n)" },
              code: `class MyQueue {\n  constructor() {\n    this.input = [];\n    this.output = [];\n  }\n  push(x) {\n    this.input.push(x);\n  }\n  pop() {\n    if (this.output.length === 0) {\n      while (this.input.length > 0) {\n        this.output.push(this.input.pop());\n      }\n    }\n    return this.output.pop();\n  }\n  peek() {\n    if (this.output.length === 0) {\n      while (this.input.length > 0) {\n        this.output.push(this.input.pop());\n      }\n    }\n    return this.output[this.output.length - 1];\n  }\n  empty() {\n    return this.input.length === 0 && this.output.length === 0;\n  }\n}`,
              explanation: "Line 3-4: Two stacks — input for enqueue, output for dequeue.\nLine 7: Push always goes to input stack — O(1).\nLine 10-13: On pop, if output is empty, transfer all from input to output (reverses order).\nLine 15: Pop from output gives FIFO order.\nLine 23: Peek returns top of output without removing.\nAmortized O(1) per operation since each element transfers at most once."
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
        { question: "What are the different tree traversal methods?", answer: "Inorder (Left, Root, Right) — gives sorted order for BST. Preorder (Root, Left, Right) — useful for creating a copy of the tree or prefix expressions. Postorder (Left, Right, Root) — useful for deleting a tree or postfix expressions. Level order (BFS) — visits nodes level by level using a queue. DFS traversals can be done recursively or iteratively using a stack. Level order always uses a queue.", difficulty: "beginner", type: "concept" },
        { question: "What is a Binary Search Tree (BST)?", answer: "A BST is a binary tree where for every node, all values in the left subtree are smaller and all values in the right subtree are larger. This property enables O(log n) search, insert, and delete on average. However, in the worst case (skewed tree), operations degrade to O(n). Self-balancing BSTs like AVL and Red-Black trees guarantee O(log n) by maintaining balance. Inorder traversal of a BST gives elements in sorted order.", difficulty: "beginner", type: "concept" },
        { question: "What is the difference between a complete and a full binary tree?", answer: "A full binary tree has every node with either 0 or 2 children — no node has only one child. A complete binary tree has all levels fully filled except possibly the last level, which is filled from left to right. A perfect binary tree is both full and complete — all levels are completely filled. A complete binary tree with n nodes has height O(log n) and is the structure used for heaps.", difficulty: "beginner", type: "concept" },
      ],
      coding: [
        {
          question: "Maximum Depth of Binary Tree",
          difficulty: "beginner",
          approaches: [
            {
              name: "Recursive (DFS)",
              complexity: { time: "O(n)", space: "O(h)" },
              code: `function maxDepth(root) {\n  if (!root) return 0;\n  const leftDepth = maxDepth(root.left);\n  const rightDepth = maxDepth(root.right);\n  return Math.max(leftDepth, rightDepth) + 1;\n}`,
              explanation: "Line 2: Base case — null node has depth 0.\nLine 3-4: Recursively find depth of left and right subtrees.\nLine 5: Depth is 1 + max of both subtree depths. Space is O(h) for recursion stack where h is tree height."
            },
            {
              name: "Iterative (BFS)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function maxDepth(root) {\n  if (!root) return 0;\n  const queue = [root];\n  let depth = 0;\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    depth++;\n  }\n  return depth;\n}`,
              explanation: "Line 3: Initialize queue with root.\nLine 4: Track depth counter.\nLine 6: Process all nodes at current level.\nLine 8-10: Dequeue each node and enqueue its children.\nLine 12: Increment depth after processing each level.\nLine 14: Return total depth."
            }
          ]
        },
        {
          question: "Level Order Traversal",
          difficulty: "beginner",
          approaches: [
            {
              name: "BFS with Queue",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const level = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}`,
              explanation: "Line 4: Start queue with root node.\nLine 6: Capture level size before processing.\nLine 7: Array to store current level's values.\nLine 9-12: Process each node: add value to level, enqueue children.\nLine 14: Add completed level to result.\nLine 16: Return array of arrays, each representing one level."
            },
            {
              name: "DFS Recursive",
              complexity: { time: "O(n)", space: "O(h)" },
              code: `function levelOrder(root) {\n  const result = [];\n  function dfs(node, depth) {\n    if (!node) return;\n    if (result.length === depth) result.push([]);\n    result[depth].push(node.val);\n    dfs(node.left, depth + 1);\n    dfs(node.right, depth + 1);\n  }\n  dfs(root, 0);\n  return result;\n}`,
              explanation: "Line 3: DFS helper takes node and current depth.\nLine 5: Create new level array when we reach a new depth.\nLine 6: Add current node's value to its depth's array.\nLine 7-8: Recurse on children with incremented depth.\nLine 10: Start DFS from root at depth 0."
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
        { question: "What are the ways to represent a graph?", answer: "Adjacency Matrix uses a 2D array where matrix[i][j] = 1 if there's an edge from i to j. It uses O(V²) space and allows O(1) edge lookup. Adjacency List uses an array of lists where each index stores its neighbors. It uses O(V + E) space and is more space-efficient for sparse graphs. Edge List stores all edges as pairs. For most interview problems, adjacency list is preferred since real-world graphs tend to be sparse.", difficulty: "beginner", type: "concept" },
        { question: "What is the difference between BFS and DFS?", answer: "BFS explores all neighbors at current depth before moving to the next level, using a queue. It finds the shortest path in unweighted graphs. DFS explores as deep as possible before backtracking, using a stack or recursion. DFS uses less memory O(h) vs O(w) for BFS where h is height and w is width. BFS is better for shortest path problems; DFS is better for topological sort, cycle detection, and path-finding in mazes.", difficulty: "beginner", type: "concept" },
      ],
      coding: [
        {
          question: "BFS Traversal of Graph",
          difficulty: "beginner",
          approaches: [
            {
              name: "Standard BFS",
              complexity: { time: "O(V + E)", space: "O(V)" },
              code: `function bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  const result = [];\n  visited.add(start);\n  while (queue.length > 0) {\n    const node = queue.shift();\n    result.push(node);\n    for (const neighbor of graph[node] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return result;\n}`,
              explanation: "Line 2: Set to track visited nodes and avoid revisiting.\nLine 3: Queue initialized with start node.\nLine 5: Mark start as visited before entering loop.\nLine 7: Dequeue the front node.\nLine 8: Add to result.\nLine 9-13: Enqueue all unvisited neighbors, marking them visited.\nLine 16: Return traversal order."
            }
          ]
        },
        {
          question: "DFS Traversal of Graph",
          difficulty: "beginner",
          approaches: [
            {
              name: "Recursive DFS",
              complexity: { time: "O(V + E)", space: "O(V)" },
              code: `function dfs(graph, start) {\n  const visited = new Set();\n  const result = [];\n  function explore(node) {\n    visited.add(node);\n    result.push(node);\n    for (const neighbor of graph[node] || []) {\n      if (!visited.has(neighbor)) {\n        explore(neighbor);\n      }\n    }\n  }\n  explore(start);\n  return result;\n}`,
              explanation: "Line 2: Set to track visited nodes.\nLine 4-11: Recursive helper function.\nLine 5-6: Mark node visited and add to result.\nLine 7-9: Recursively explore unvisited neighbors.\nLine 13: Start DFS from the given node.\nLine 14: Return traversal order."
            },
            {
              name: "Iterative DFS (Stack)",
              complexity: { time: "O(V + E)", space: "O(V)" },
              code: `function dfs(graph, start) {\n  const visited = new Set();\n  const stack = [start];\n  const result = [];\n  while (stack.length > 0) {\n    const node = stack.pop();\n    if (visited.has(node)) continue;\n    visited.add(node);\n    result.push(node);\n    for (const neighbor of (graph[node] || []).reverse()) {\n      if (!visited.has(neighbor)) {\n        stack.push(neighbor);\n      }\n    }\n  }\n  return result;\n}`,
              explanation: "Line 3: Use explicit stack instead of recursion.\nLine 6: Pop from stack (LIFO gives depth-first behavior).\nLine 7: Skip if already visited.\nLine 8-9: Mark visited and add to result.\nLine 10: Push unvisited neighbors (reversed to match recursive order).\nLine 16: Return traversal order."
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
        { question: "What is the difference between recursion and iteration?", answer: "Recursion solves a problem by breaking it into smaller subproblems, with a function calling itself. It uses the call stack for state, which can lead to stack overflow for deep recursion. Iteration uses loops and explicit state variables. Any recursive solution can be converted to iterative using an explicit stack. Recursion often leads to cleaner, more readable code for tree/graph problems, divide and conquer, and backtracking. Iteration is generally more memory-efficient.", difficulty: "beginner", type: "concept" },
        { question: "What is backtracking and how does it work?", answer: "Backtracking is a refined brute-force technique that incrementally builds candidates and abandons a candidate ('backtracks') as soon as it determines the candidate cannot lead to a valid solution. It explores the solution space as a tree, pruning branches that violate constraints. Common applications include N-Queens, Sudoku, permutations, subsets, and combination sum. The key pattern is: choose, explore, unchoose. Time complexity is often exponential but pruning significantly reduces the actual search space.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Fibonacci Number",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Pure Recursion)",
              complexity: { time: "O(2ⁿ)", space: "O(n)" },
              code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
              explanation: "Line 2: Base cases — fib(0)=0, fib(1)=1.\nLine 3: Recursive case — sum of two previous. O(2ⁿ) because each call branches into two subcalls. Many subproblems are computed repeatedly."
            },
            {
              name: "Better (Memoization)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function fibonacci(n, memo = {}) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);\n  return memo[n];\n}`,
              explanation: "Line 1: memo object caches computed results.\nLine 3: Return cached result if available.\nLine 4: Compute and cache the result.\nEach subproblem is computed only once — O(n) time."
            },
            {
              name: "Optimal (Iterative)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  let prev2 = 0, prev1 = 1;\n  for (let i = 2; i <= n; i++) {\n    const current = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = current;\n  }\n  return prev1;\n}`,
              explanation: "Line 3: Only track the last two values.\nLine 4-7: Build up from bottom, updating the two previous values.\nLine 9: Return the nth Fibonacci number. O(1) space since we only store 2 variables."
            }
          ]
        },
        {
          question: "Power Set (All Subsets)",
          difficulty: "medium",
          approaches: [
            {
              name: "Iterative",
              complexity: { time: "O(n * 2ⁿ)", space: "O(n * 2ⁿ)" },
              code: `function subsets(nums) {\n  const result = [[]];\n  for (const num of nums) {\n    const newSubsets = result.map(subset => [...subset, num]);\n    result.push(...newSubsets);\n  }\n  return result;\n}`,
              explanation: "Line 2: Start with empty subset.\nLine 3: For each number in the array.\nLine 4: Create new subsets by adding current number to each existing subset.\nLine 5: Add all new subsets to result.\nLine 7: Return all 2ⁿ subsets."
            },
            {
              name: "Backtracking",
              complexity: { time: "O(n * 2ⁿ)", space: "O(n * 2ⁿ)" },
              code: `function subsets(nums) {\n  const result = [];\n  function backtrack(start, current) {\n    result.push([...current]);\n    for (let i = start; i < nums.length; i++) {\n      current.push(nums[i]);\n      backtrack(i + 1, current);\n      current.pop();\n    }\n  }\n  backtrack(0, []);\n  return result;\n}`,
              explanation: "Line 4: Add a copy of the current subset to results (every node in the decision tree is a valid subset).\nLine 5: Try adding each remaining element.\nLine 6: Choose — add element to current subset.\nLine 7: Explore — recurse with next starting index.\nLine 8: Unchoose — remove element (backtrack).\nLine 11: Start backtracking from index 0 with empty subset."
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
        { question: "What is Dynamic Programming and when should you use it?", answer: "Dynamic Programming is an optimization technique for problems with overlapping subproblems and optimal substructure. Overlapping subproblems means the same smaller problems are solved multiple times. Optimal substructure means the optimal solution contains optimal solutions to subproblems. DP comes in two flavors: top-down (memoization, recursive) and bottom-up (tabulation, iterative). Use DP when you see counting problems, optimization (min/max), or when brute force recursion has exponential time with repeated subproblems.", difficulty: "medium", type: "concept" },
        { question: "What is the difference between memoization and tabulation?", answer: "Memoization (top-down) starts with the original problem and recursively breaks it down, caching results of subproblems in a hash map or array. It only solves subproblems that are actually needed. Tabulation (bottom-up) starts from the smallest subproblems and iteratively builds up to the answer using a table. It solves all subproblems regardless of need. Tabulation avoids recursion stack overhead and is generally faster due to no function call overhead. Memoization is easier to implement and more intuitive for some problems.", difficulty: "medium", type: "concept" },
        { question: "What are the steps to solve a DP problem?", answer: "1) Identify if the problem has overlapping subproblems and optimal substructure. 2) Define the state — what parameters uniquely identify a subproblem (e.g., dp[i] = answer for first i elements). 3) Write the recurrence relation (e.g., dp[i] = dp[i-1] + dp[i-2]). 4) Identify base cases. 5) Determine the computation order (for tabulation). 6) Optionally optimize space if only a few previous states are needed.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Climbing Stairs",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Recursion)",
              complexity: { time: "O(2ⁿ)", space: "O(n)" },
              code: `function climbStairs(n) {\n  if (n <= 2) return n;\n  return climbStairs(n - 1) + climbStairs(n - 2);\n}`,
              explanation: "Line 2: Base cases — 1 way for 1 step, 2 ways for 2 steps.\nLine 3: From step n, we could have come from n-1 (1 step) or n-2 (2 steps). Exponential because of repeated subproblems."
            },
            {
              name: "Better (Memoization)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function climbStairs(n, memo = {}) {\n  if (n <= 2) return n;\n  if (memo[n]) return memo[n];\n  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);\n  return memo[n];\n}`,
              explanation: "Line 3: Return cached result if already computed.\nLine 4: Compute, cache, and return.\nEach value computed once — O(n) time, O(n) space for memo + recursion stack."
            },
            {
              name: "Optimal (Tabulation)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev2 = 1, prev1 = 2;\n  for (let i = 3; i <= n; i++) {\n    const current = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = current;\n  }\n  return prev1;\n}`,
              explanation: "Line 3: prev2 = ways(1), prev1 = ways(2).\nLine 4-7: Build up from step 3 to n.\nLine 5: Current step = sum of two previous.\nLine 6-7: Slide the window forward.\nLine 9: Return result. O(1) space since only 2 variables needed."
            }
          ]
        },
        {
          question: "Fibonacci with Memoization vs Tabulation",
          difficulty: "beginner",
          approaches: [
            {
              name: "Top-Down (Memoization)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function fibMemo(n, memo = new Map()) {\n  if (n <= 1) return n;\n  if (memo.has(n)) return memo.get(n);\n  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n  memo.set(n, result);\n  return result;\n}`,
              explanation: "Line 2: Base cases.\nLine 3: Return cached value if exists.\nLine 4: Recursively compute.\nLine 5: Cache before returning.\nTop-down: only computes needed subproblems."
            },
            {
              name: "Bottom-Up (Tabulation)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function fibTab(n) {\n  if (n <= 1) return n;\n  const dp = new Array(n + 1);\n  dp[0] = 0;\n  dp[1] = 1;\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}`,
              explanation: "Line 3: Create table of size n+1.\nLine 4-5: Fill base cases.\nLine 6-8: Fill table iteratively from smallest to largest.\nLine 9: Answer is in dp[n].\nBottom-up: no recursion overhead, but computes all subproblems."
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
        { question: "What are the common sorting algorithms and their complexities?", answer: "Bubble Sort: O(n²) avg/worst, O(1) space, stable. Selection Sort: O(n²), O(1) space, unstable. Insertion Sort: O(n²) worst but O(n) for nearly sorted, O(1) space, stable. Merge Sort: O(n log n) always, O(n) space, stable. Quick Sort: O(n log n) avg, O(n²) worst, O(log n) space, unstable. Heap Sort: O(n log n), O(1) space, unstable. For interviews, know merge sort and quicksort well.", difficulty: "beginner", type: "concept" },
        { question: "How does binary search work and when can it be applied?", answer: "Binary search works on sorted arrays by repeatedly dividing the search space in half. Compare the target with the middle element: if equal, found; if target is smaller, search left half; if larger, search right half. Time complexity is O(log n). It can be applied whenever the search space has a monotonic property — if a condition is true for some value x, it's true for all values greater (or lesser) than x. It applies to sorted arrays, rotated sorted arrays, and even abstract search spaces.", difficulty: "beginner", type: "concept" },
        { question: "What is the difference between stable and unstable sorting?", answer: "A stable sorting algorithm preserves the relative order of elements with equal keys. For example, if two elements have the same value, their original order is maintained after sorting. Merge Sort, Insertion Sort, and Bubble Sort are stable. Quick Sort and Heap Sort are unstable. Stability matters when sorting by multiple criteria — e.g., sort by name then by age; a stable sort ensures people with the same age remain sorted by name.", difficulty: "beginner", type: "concept" },
      ],
      coding: [
        {
          question: "Bubble Sort",
          difficulty: "beginner",
          approaches: [
            {
              name: "Basic Bubble Sort",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function bubbleSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`,
              explanation: "Line 3: Outer loop for n-1 passes.\nLine 4: Inner loop compares adjacent elements. Range shrinks each pass since largest elements bubble to end.\nLine 5-6: Swap if current element is larger than next.\nLine 10: Array is sorted in-place."
            },
            {
              name: "Optimized (Early Exit)",
              complexity: { time: "O(n) best, O(n²) worst", space: "O(1)" },
              code: `function bubbleSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    let swapped = false;\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n  }\n  return arr;\n}`,
              explanation: "Line 4: Track if any swaps occurred in this pass.\nLine 8: Set flag when a swap happens.\nLine 11: If no swaps in a pass, array is already sorted — exit early.\nBest case O(n) for already sorted arrays."
            }
          ]
        },
        {
          question: "Binary Search",
          difficulty: "beginner",
          approaches: [
            {
              name: "Iterative",
              complexity: { time: "O(log n)", space: "O(1)" },
              code: `function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
              explanation: "Line 2: Initialize search range to entire array.\nLine 3: Continue while range is valid.\nLine 4: Find middle index (avoiding overflow).\nLine 5: Target found at mid.\nLine 6: Target is in right half — move left pointer.\nLine 7: Target is in left half — move right pointer.\nLine 9: Target not found."
            },
            {
              name: "Recursive",
              complexity: { time: "O(log n)", space: "O(log n)" },
              code: `function binarySearch(arr, target, left = 0, right = arr.length - 1) {\n  if (left > right) return -1;\n  const mid = Math.floor((left + right) / 2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);\n  return binarySearch(arr, target, left, mid - 1);\n}`,
              explanation: "Line 2: Base case — empty range means not found.\nLine 3: Calculate mid point.\nLine 4: Found the target.\nLine 5: Search right half recursively.\nLine 6: Search left half recursively.\nO(log n) recursive calls, each using O(1) space on stack."
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
        { question: "What is the greedy approach and when does it work?", answer: "Greedy algorithms make the locally optimal choice at each step, hoping to find a global optimum. They work when the problem has the greedy choice property (a locally optimal choice leads to a globally optimal solution) and optimal substructure. Greedy doesn't always give the optimal answer — it fails for problems like 0/1 Knapsack. Classic greedy problems include activity selection, Huffman coding, fractional knapsack, and Kruskal's/Prim's MST algorithms.", difficulty: "medium", type: "concept" },
        { question: "How does greedy differ from dynamic programming?", answer: "Greedy makes one choice per step and never reconsiders (no backtracking). DP considers all possibilities and chooses the best from subproblem solutions. Greedy is faster but doesn't always give the optimal answer. DP guarantees optimality but may be slower. If a greedy solution works, it's preferred since it's simpler and faster. The key test is: does making the locally best choice always lead to the globally best result?", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Activity Selection Problem",
          difficulty: "medium",
          approaches: [
            {
              name: "Greedy (Sort by End Time)",
              complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function activitySelection(activities) {\n  activities.sort((a, b) => a[1] - b[1]);\n  const selected = [activities[0]];\n  let lastEnd = activities[0][1];\n  for (let i = 1; i < activities.length; i++) {\n    if (activities[i][0] >= lastEnd) {\n      selected.push(activities[i]);\n      lastEnd = activities[i][1];\n    }\n  }\n  return selected;\n}`,
              explanation: "Line 2: Sort activities by their end time.\nLine 3: Always select the first activity (earliest finish).\nLine 4: Track when the last selected activity ends.\nLine 6: If current activity starts after last one ends, it's compatible.\nLine 7-8: Select it and update lastEnd.\nLine 11: Return maximum non-overlapping activities."
            }
          ]
        },
        {
          question: "Fractional Knapsack",
          difficulty: "medium",
          approaches: [
            {
              name: "Greedy (Sort by Value/Weight Ratio)",
              complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function fractionalKnapsack(items, capacity) {\n  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));\n  let totalValue = 0;\n  let remaining = capacity;\n  for (const item of items) {\n    if (item.weight <= remaining) {\n      totalValue += item.value;\n      remaining -= item.weight;\n    } else {\n      totalValue += item.value * (remaining / item.weight);\n      break;\n    }\n  }\n  return totalValue;\n}`,
              explanation: "Line 2: Sort items by value-to-weight ratio (descending).\nLine 4: Track remaining capacity.\nLine 6-8: If item fits completely, take it all.\nLine 9-11: Otherwise, take a fraction that fills remaining capacity.\nLine 14: Return maximum total value. Greedy works here because we can take fractions."
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
        { question: "What is hashing and how do hash tables work?", answer: "Hashing maps data of arbitrary size to fixed-size values using a hash function. A hash table stores key-value pairs where the key is hashed to determine the storage index. Average-case operations (insert, search, delete) are O(1). Collisions occur when two keys hash to the same index. Common collision resolution strategies are chaining (linked lists at each bucket) and open addressing (probing for next empty slot). Load factor = items/buckets; resizing typically occurs when load factor exceeds 0.75.", difficulty: "beginner", type: "concept" },
        { question: "What are common hash table collision resolution strategies?", answer: "Chaining (Separate Chaining) stores colliding elements in a linked list at each bucket. Average lookup is O(1 + n/m) where n is items and m is buckets. Open Addressing finds the next empty slot using: Linear Probing (check next slot), Quadratic Probing (check slots at 1², 2², 3²...), or Double Hashing (use a second hash function for step size). Open addressing has better cache performance but degrades more at high load factors. Robin Hood hashing reduces variance by stealing from rich buckets.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "First Non-Repeating Character",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function firstNonRepeating(s) {\n  for (let i = 0; i < s.length; i++) {\n    let found = false;\n    for (let j = 0; j < s.length; j++) {\n      if (i !== j && s[i] === s[j]) {\n        found = true;\n        break;\n      }\n    }\n    if (!found) return s[i];\n  }\n  return null;\n}`,
              explanation: "Line 2: Check each character.\nLine 4-8: Search entire string for a duplicate.\nLine 10: If no duplicate found, this is the first non-repeating char.\nLine 12: Return null if all characters repeat."
            },
            {
              name: "Optimal (HashMap)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function firstNonRepeating(s) {\n  const freq = {};\n  for (const char of s) {\n    freq[char] = (freq[char] || 0) + 1;\n  }\n  for (const char of s) {\n    if (freq[char] === 1) return char;\n  }\n  return null;\n}`,
              explanation: "Line 2: Object to count character frequencies.\nLine 3-4: First pass — count occurrences of each character.\nLine 6-7: Second pass — find first char with count 1.\nLine 9: Return null if none found. Space O(1) since alphabet is finite."
            }
          ]
        },
        {
          question: "Group Anagrams",
          difficulty: "medium",
          approaches: [
            {
              name: "Sort Each Word",
              complexity: { time: "O(n * k log k)", space: "O(n * k)" },
              code: `function groupAnagrams(strs) {\n  const map = new Map();\n  for (const str of strs) {\n    const key = str.split('').sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(str);\n  }\n  return Array.from(map.values());\n}`,
              explanation: "Line 2: Map to group anagrams.\nLine 4: Sort characters to create a canonical key — anagrams have the same sorted form.\nLine 5: Create new group if key doesn't exist.\nLine 6: Add word to its anagram group.\nLine 8: Return all groups."
            },
            {
              name: "Optimal (Character Count Key)",
              complexity: { time: "O(n * k)", space: "O(n * k)" },
              code: `function groupAnagrams(strs) {\n  const map = new Map();\n  for (const str of strs) {\n    const count = new Array(26).fill(0);\n    for (const c of str) count[c.charCodeAt(0) - 97]++;\n    const key = count.join('#');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(str);\n  }\n  return Array.from(map.values());\n}`,
              explanation: "Line 4: Create frequency array for 26 letters.\nLine 5: Count each character.\nLine 6: Create key from frequency array — avoids O(k log k) sorting.\nLine 7-8: Group by key.\nLine 10: Return groups. O(n * k) where n is number of strings, k is max length."
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
        { question: "What are common bitwise operators?", answer: "AND (&): both bits 1 → 1. OR (|): either bit 1 → 1. XOR (^): different bits → 1 (same → 0). NOT (~): flips all bits. Left Shift (<<): multiplies by 2. Right Shift (>>): divides by 2. Key properties: a ^ a = 0, a ^ 0 = a, a & (a-1) removes the lowest set bit. XOR is especially useful for finding unique elements since duplicates cancel out.", difficulty: "beginner", type: "concept" },
        { question: "How to check if a number is a power of 2?", answer: "A power of 2 has exactly one bit set: 1(1), 2(10), 4(100), 8(1000). Subtracting 1 flips that bit and sets all lower bits: 8-1=7(0111). AND-ing gives 0: 8 & 7 = 1000 & 0111 = 0. So n > 0 && (n & (n-1)) === 0 checks power of 2 in O(1). Alternative: check n > 0 && n === (n & -n), where n & -n isolates the lowest set bit.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Single Number (find element appearing once)",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (HashMap)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function singleNumber(nums) {\n  const freq = {};\n  for (const num of nums) freq[num] = (freq[num] || 0) + 1;\n  for (const num in freq) {\n    if (freq[num] === 1) return Number(num);\n  }\n}`,
              explanation: "Line 2-3: Count frequency of each number.\nLine 4-5: Find the number with count 1.\nUses O(n) extra space for the hash map."
            },
            {
              name: "Optimal (XOR)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function singleNumber(nums) {\n  let result = 0;\n  for (const num of nums) {\n    result ^= num;\n  }\n  return result;\n}`,
              explanation: "Line 2: Initialize to 0.\nLine 3-4: XOR every number. Since a^a=0, duplicate pairs cancel out.\nLine 6: Only the single number remains. O(1) space."
            }
          ]
        },
        {
          question: "Check Power of Two",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Loop)",
              complexity: { time: "O(log n)", space: "O(1)" },
              code: `function isPowerOfTwo(n) {\n  if (n <= 0) return false;\n  while (n > 1) {\n    if (n % 2 !== 0) return false;\n    n = n / 2;\n  }\n  return true;\n}`,
              explanation: "Line 2: Negative numbers and 0 aren't powers of 2.\nLine 3-5: Keep dividing by 2. If ever not divisible, it's not a power of 2.\nLine 7: If we reach 1, it is a power of 2."
            },
            {
              name: "Optimal (Bit Trick)",
              complexity: { time: "O(1)", space: "O(1)" },
              code: `function isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0;\n}`,
              explanation: "Line 2: n must be positive. n & (n-1) removes the lowest set bit. Powers of 2 have exactly one set bit, so removing it gives 0. Single operation — O(1)."
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
        { question: "What is a heap and what are its types?", answer: "A heap is a complete binary tree satisfying the heap property. In a max-heap, every parent is >= its children (root is max). In a min-heap, every parent is <= its children (root is min). Heaps are stored as arrays: for index i, left child is 2i+1, right child is 2i+2, parent is floor((i-1)/2). Insert and delete are O(log n), peek is O(1). Heaps are used for priority queues, heap sort, and finding kth largest/smallest elements.", difficulty: "beginner", type: "concept" },
        { question: "What is a priority queue and how is it implemented?", answer: "A priority queue serves elements based on priority rather than insertion order. The highest (or lowest) priority element is served first. It's typically implemented using a heap — min-heap for minimum priority, max-heap for maximum priority. Insert is O(log n) — add to end and bubble up. Extract is O(log n) — remove root, move last element to root, and sink down. JavaScript doesn't have a built-in priority queue, so you must implement one or use a library.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Kth Largest Element in Array",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force (Sort)",
              complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function findKthLargest(nums, k) {\n  nums.sort((a, b) => b - a);\n  return nums[k - 1];\n}`,
              explanation: "Line 2: Sort in descending order.\nLine 3: Kth largest is at index k-1."
            },
            {
              name: "Optimal (QuickSelect)",
              complexity: { time: "O(n) avg, O(n²) worst", space: "O(1)" },
              code: `function findKthLargest(nums, k) {\n  const target = nums.length - k;\n  function quickSelect(left, right) {\n    const pivot = nums[right];\n    let p = left;\n    for (let i = left; i < right; i++) {\n      if (nums[i] <= pivot) {\n        [nums[i], nums[p]] = [nums[p], nums[i]];\n        p++;\n      }\n    }\n    [nums[p], nums[right]] = [nums[right], nums[p]];\n    if (p === target) return nums[p];\n    if (p < target) return quickSelect(p + 1, right);\n    return quickSelect(left, p - 1);\n  }\n  return quickSelect(0, nums.length - 1);\n}`,
              explanation: "Line 2: Kth largest = (n-k)th smallest in sorted order.\nLine 4: Choose rightmost element as pivot.\nLine 5-10: Partition: elements <= pivot go to left.\nLine 12: Place pivot in its final sorted position.\nLine 13: If pivot is at target index, we found our answer.\nLine 14-15: Otherwise, recurse on the relevant half only.\nAverage O(n) since we only recurse into one half."
            }
          ]
        },
        {
          question: "Sort a Nearly Sorted Array (K sorted)",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force (Full Sort)",
              complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function sortNearlySorted(arr) {\n  return arr.sort((a, b) => a - b);\n}`,
              explanation: "Line 2: Standard sort. O(n log n) and ignores the nearly-sorted property."
            },
            {
              name: "Optimal (Insertion Sort for K-sorted)",
              complexity: { time: "O(n * k)", space: "O(1)" },
              code: `function sortNearlySorted(arr, k) {\n  for (let i = 1; i < arr.length; i++) {\n    const key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && j >= i - k && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`,
              explanation: "Line 2: Process each element.\nLine 3: Save current element.\nLine 5: Only need to look back at most k positions since array is k-sorted.\nLine 6-7: Shift larger elements right.\nLine 9: Place element in correct position.\nO(n*k) which is better than O(n log n) when k is small."
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
        { question: "What is a Trie and when is it used?", answer: "A Trie (prefix tree) is a tree where each node represents a character and paths from root to nodes represent prefixes. Each node may have up to 26 children (for lowercase English). Insert, search, and prefix search are all O(m) where m is the word length, independent of the number of words stored. Used for autocomplete, spell checking, IP routing, and word games. Space can be O(n * m * 26) in worst case but compressed tries reduce this.", difficulty: "medium", type: "concept" },
        { question: "How does a Trie compare to a HashMap for storing words?", answer: "A HashMap stores whole words as keys with O(m) insert/lookup where m is word length. A Trie also has O(m) operations but additionally supports efficient prefix queries (find all words starting with 'pre') which HashMap cannot do efficiently. Trie uses more memory per word but shares prefixes between words. For autocomplete and prefix matching, Tries are superior. For simple key-value lookup with no prefix needs, HashMap is simpler and more memory-efficient.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Implement Trie (Insert, Search, StartsWith)",
          difficulty: "medium",
          approaches: [
            {
              name: "HashMap Children",
              complexity: { time: "O(m) per operation", space: "O(n * m)" },
              code: `class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEnd = false;\n  }\n}\n\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node.children[ch]) node.children[ch] = new TrieNode();\n      node = node.children[ch];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node.children[ch]) return false;\n      node = node.children[ch];\n    }\n    return node.isEnd;\n  }\n  startsWith(prefix) {\n    let node = this.root;\n    for (const ch of prefix) {\n      if (!node.children[ch]) return false;\n      node = node.children[ch];\n    }\n    return true;\n  }\n}`,
              explanation: "Lines 1-5: TrieNode with children map and end-of-word flag.\nLines 12-18: Insert traverses char by char, creating nodes as needed, marks end.\nLines 20-26: Search follows the path and checks isEnd.\nLines 28-34: startsWith follows the path but doesn't check isEnd — any prefix match is valid."
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
        { question: "What is the sliding window technique?", answer: "Sliding window maintains a window (contiguous subarray/substring) that slides across data to solve problems efficiently. Fixed-size windows compute result for first window, then slide by adding/removing one element — O(n) instead of O(n*k). Variable-size windows expand by moving the right pointer and shrink by moving the left pointer based on conditions. Used for max sum subarray of size k, longest substring without repeating characters, minimum window substring, etc.", difficulty: "beginner", type: "concept" },
        { question: "When do you use fixed vs variable size sliding window?", answer: "Fixed-size: when the window size k is given (max sum subarray of size k, moving average). Variable-size: when you need to find the optimal window satisfying a condition (longest substring without repeating chars, minimum window containing all characters). For variable windows, typically expand right to satisfy the condition, then shrink left to optimize. The key insight is that both pointers only move forward, giving O(n) total.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Maximum Sum Subarray of Size K",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n * k)", space: "O(1)" },
              code: `function maxSubarraySum(arr, k) {\n  let maxSum = -Infinity;\n  for (let i = 0; i <= arr.length - k; i++) {\n    let sum = 0;\n    for (let j = i; j < i + k; j++) sum += arr[j];\n    maxSum = Math.max(maxSum, sum);\n  }\n  return maxSum;\n}`,
              explanation: "Line 3: Try every starting position.\nLine 5: Sum k elements from current position.\nLine 6: Track maximum sum. O(n*k) due to recalculating each window."
            },
            {
              name: "Optimal (Sliding Window)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function maxSubarraySum(arr, k) {\n  let windowSum = 0;\n  for (let i = 0; i < k; i++) windowSum += arr[i];\n  let maxSum = windowSum;\n  for (let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i - k];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}`,
              explanation: "Line 3: Sum the first window.\nLine 5: Slide the window.\nLine 6: Add new element, remove old element — O(1) update.\nLine 7: Track maximum. Total O(n)."
            }
          ]
        },
        {
          question: "Longest Substring Without Repeating Characters",
          difficulty: "medium",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n³)", space: "O(n)" },
              code: `function lengthOfLongestSubstring(s) {\n  let maxLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i; j < s.length; j++) {\n      const sub = s.slice(i, j + 1);\n      if (new Set(sub).size === sub.length) {\n        maxLen = Math.max(maxLen, sub.length);\n      } else break;\n    }\n  }\n  return maxLen;\n}`,
              explanation: "Line 3-4: Try all substrings.\nLine 6: Check if all characters are unique using Set.\nLine 7: Update max if unique.\nLine 8: Break if duplicate found (extending won't help)."
            },
            {
              name: "Optimal (Sliding Window + Set)",
              complexity: { time: "O(n)", space: "O(min(n, m))" },
              code: `function lengthOfLongestSubstring(s) {\n  const set = new Set();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
              explanation: "Line 2: Set tracks characters in current window.\nLine 4: Expand window by moving right.\nLine 5-7: If duplicate, shrink from left until it's removed.\nLine 9: Add current character.\nLine 10: Update max window size. Each character is added and removed at most once — O(n)."
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
        { question: "What is the two-pointer technique?", answer: "Two pointers use two indices that traverse data in a coordinated way. Common patterns: (1) Opposite ends — start from both ends, move inward (palindrome, two sum on sorted array). (2) Same direction — slow/fast pointers (remove duplicates, linked list cycle detection). (3) Two arrays — one pointer per array (merge sorted arrays). Reduces O(n²) to O(n) for many problems. Typically requires sorted data for the opposite-ends pattern.", difficulty: "beginner", type: "concept" },
        { question: "How is two pointers different from sliding window?", answer: "Sliding window is a specific case of two pointers where the elements between the pointers form a contiguous window of interest. In general two pointers, we might only care about the elements at the pointer positions (e.g., two sum sorted). Sliding window always processes elements in the window; two pointers may skip over elements. Both achieve O(n) by ensuring pointers only move forward. Sliding window is best for subarray/substring problems; two pointers is more general.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Two Sum on Sorted Array",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n  return [];\n}`,
              explanation: "Line 2-4: Check all pairs. Doesn't use the sorted property."
            },
            {
              name: "Optimal (Two Pointers)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function twoSum(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    const sum = nums[left] + nums[right];\n    if (sum === target) return [left, right];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}`,
              explanation: "Line 2: Pointers at both ends.\nLine 4: Calculate sum.\nLine 5: Found the pair.\nLine 6: Sum too small — move left pointer right to increase.\nLine 7: Sum too large — move right pointer left to decrease.\nO(n) time, O(1) space."
            }
          ]
        },
        {
          question: "Remove Duplicates from Sorted Array",
          difficulty: "beginner",
          approaches: [
            {
              name: "Brute Force (Extra Array)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function removeDuplicates(nums) {\n  const unique = [...new Set(nums)];\n  for (let i = 0; i < unique.length; i++) nums[i] = unique[i];\n  return unique.length;\n}`,
              explanation: "Line 2: Create Set to get unique values.\nLine 3: Copy unique values back to original array.\nLine 4: Return count. Uses O(n) extra space."
            },
            {
              name: "Optimal (Two Pointers In-Place)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function removeDuplicates(nums) {\n  if (nums.length === 0) return 0;\n  let write = 1;\n  for (let read = 1; read < nums.length; read++) {\n    if (nums[read] !== nums[read - 1]) {\n      nums[write] = nums[read];\n      write++;\n    }\n  }\n  return write;\n}`,
              explanation: "Line 3: Write pointer starts at 1 (first element is always unique).\nLine 4: Read pointer scans forward.\nLine 5: New unique element found.\nLine 6-7: Write it and advance write pointer.\nLine 10: Return count of unique elements. O(1) space — modified in-place."
            }
          ]
        }
      ]
    }
  ]
};
