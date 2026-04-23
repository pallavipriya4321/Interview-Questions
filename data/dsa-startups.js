export const startups = {
  id: "startups",
  title: "Startups",
  description: "YC, Series A-C, fast-paced",
  topics: [
    { id: "arrays", title: "Arrays", icon: "Ar",
      conceptual: [
        { question: "How would you efficiently rotate an array by K positions?", answer: "Three approaches: (1) Extra array — copy elements to shifted positions. O(n) time, O(n) space. (2) Cyclic replacements — place each element at its final position in cycles. O(n) time, O(1) space but tricky to implement. (3) Reverse trick — reverse entire array, then reverse first k and last n-k elements. O(n) time, O(1) space, simplest. The reverse approach works because reversing undoes the rotation in two steps.", difficulty: "medium", type: "concept" },
        { question: "How do you traverse a matrix in spiral order?", answer: "Maintain four boundaries: top, bottom, left, right. Traverse right along top row, down along right column, left along bottom row, up along left column. After each traversal, shrink the corresponding boundary. Continue until boundaries overlap. Handle edge cases where only one row or column remains. Time O(m*n), space O(1) excluding output. This pattern extends to spiral matrix generation.", difficulty: "medium", type: "concept" },
        { question: "How does Meeting Rooms II find minimum meeting rooms?", answer: "Sort meetings by start time. Use a min-heap tracking end times of ongoing meetings. For each meeting: if earliest ending meeting (heap top) ends before current starts, remove it (reuse room). Always add current end time to heap. Heap size at any point = rooms needed. Alternatively, sort start and end times separately and use two pointers. Both approaches O(n log n). The heap approach simulates actual room allocation.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Rotate Array", difficulty: "medium",
          approaches: [
            { name: "Brute Force (Extra Array)", complexity: { time: "O(n)", space: "O(n)" },
              code: `function rotate(nums, k) {\n  const n = nums.length;\n  k = k % n;\n  const temp = [...nums];\n  for (let i = 0; i < n; i++) nums[(i + k) % n] = temp[i];\n}`,
              explanation: "Line 3: Handle k > n.\nLine 4: Copy array.\nLine 5: Place each element at shifted position." },
            { name: "Optimal (Triple Reverse)", complexity: { time: "O(n)", space: "O(1)" },
              code: `function rotate(nums, k) {\n  k = k % nums.length;\n  reverse(nums, 0, nums.length - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, nums.length - 1);\n}\nfunction reverse(arr, l, r) {\n  while (l < r) { [arr[l], arr[r]] = [arr[r], arr[l]]; l++; r--; }\n}`,
              explanation: "Line 3: Reverse entire array.\nLine 4: Reverse first k elements.\nLine 5: Reverse remaining. This effectively rotates right by k. O(1) space." }
          ] },
        { question: "Spiral Matrix", difficulty: "medium",
          approaches: [
            { name: "Layer-by-Layer", complexity: { time: "O(m × n)", space: "O(1)" },
              code: `function spiralOrder(matrix) {\n  const result = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) result.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);\n    right--;\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);\n      left++;\n    }\n  }\n  return result;\n}`,
              explanation: "Line 6-7: Traverse top row, shrink top.\nLine 8-9: Traverse right column, shrink right.\nLine 10-12: Traverse bottom row (if exists), shrink bottom.\nLine 14-16: Traverse left column (if exists), shrink left.\nBoundary checks prevent revisiting." }
          ] },
        { question: "Meeting Rooms II", difficulty: "medium",
          approaches: [
            { name: "Sort + Two Pointers", complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function minMeetingRooms(intervals) {\n  const starts = intervals.map(i => i[0]).sort((a,b) => a-b);\n  const ends = intervals.map(i => i[1]).sort((a,b) => a-b);\n  let rooms = 0, maxRooms = 0, j = 0;\n  for (let i = 0; i < starts.length; i++) {\n    if (starts[i] < ends[j]) rooms++;\n    else j++;\n    maxRooms = Math.max(maxRooms, rooms);\n  }\n  return maxRooms;\n}`,
              explanation: "Line 2-3: Sort starts and ends separately.\nLine 6: Meeting starts before earliest end — need new room.\nLine 7: A meeting ended — reuse that room.\nLine 8: Track peak rooms needed." }
          ] }
      ] },
    { id: "strings", title: "Strings", icon: "St",
      conceptual: [
        { question: "What are the key patterns for string encoding/decoding problems?", answer: "Encoding: convert data to a string format that can be unambiguously decoded. Common technique: length-prefix encoding (store length + delimiter + string). For example, '4#code5#ninja'. Decoding: parse length, extract that many characters, repeat. This handles any characters including delimiters. Alternative: escape special characters. For nested encoding (like '3[a2[bc]]'), use a stack to handle nesting. These patterns are common in serialization and API design.", difficulty: "medium", type: "concept" },
        { question: "How does the Decode Ways problem relate to DP?", answer: "Given a string of digits, count ways to decode (1=A, 2=B, ..., 26=Z). dp[i] = number of ways to decode s[0..i-1]. If s[i-1] is valid (1-9), dp[i] += dp[i-1] (single digit decode). If s[i-2..i-1] is valid (10-26), dp[i] += dp[i-2] (two digit decode). Similar to climbing stairs but with validity constraints. Edge cases: '0' alone is invalid, leading zeros are invalid. Time O(n), space O(1) with optimization.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Group Anagrams", difficulty: "medium",
          approaches: [
            { name: "Sort Each Word", complexity: { time: "O(n × k log k)", space: "O(n × k)" },
              code: `function groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(s);\n  }\n  return Array.from(map.values());\n}`,
              explanation: "Sort chars to create canonical key for anagram groups." },
            { name: "Optimal (Frequency Key)", complexity: { time: "O(n × k)", space: "O(n × k)" },
              code: `function groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const count = new Array(26).fill(0);\n    for (const c of s) count[c.charCodeAt(0) - 97]++;\n    const key = count.join(',');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(s);\n  }\n  return Array.from(map.values());\n}`,
              explanation: "Use character frequency as key instead of sorting. O(k) per word instead of O(k log k)." }
          ] },
        { question: "Decode Ways", difficulty: "medium",
          approaches: [
            { name: "DP", complexity: { time: "O(n)", space: "O(1)" },
              code: `function numDecodings(s) {\n  if (s[0] === '0') return 0;\n  let prev2 = 1, prev1 = 1;\n  for (let i = 1; i < s.length; i++) {\n    let current = 0;\n    if (s[i] !== '0') current += prev1;\n    const twoDigit = parseInt(s.slice(i-1, i+1));\n    if (twoDigit >= 10 && twoDigit <= 26) current += prev2;\n    prev2 = prev1;\n    prev1 = current;\n  }\n  return prev1;\n}`,
              explanation: "Line 6: Single digit valid (not '0') — add dp[i-1] ways.\nLine 7-8: Two digit valid (10-26) — add dp[i-2] ways.\nLine 9-10: Slide window. O(1) space." }
          ] },
        { question: "Encode and Decode Strings", difficulty: "medium",
          approaches: [
            { name: "Length Prefix", complexity: { time: "O(n)", space: "O(n)" },
              code: `function encode(strs) {\n  return strs.map(s => s.length + '#' + s).join('');\n}\nfunction decode(str) {\n  const result = [];\n  let i = 0;\n  while (i < str.length) {\n    let j = i;\n    while (str[j] !== '#') j++;\n    const len = parseInt(str.slice(i, j));\n    result.push(str.slice(j + 1, j + 1 + len));\n    i = j + 1 + len;\n  }\n  return result;\n}`,
              explanation: "Encode: prefix each string with length + '#'.\nDecode: parse length, extract that many chars. Handles any characters including '#'." }
          ] }
      ] },
    { id: "linked-lists", title: "Linked Lists", icon: "LL",
      conceptual: [
        { question: "Why is LRU Cache commonly asked in startup interviews?", answer: "LRU Cache tests system design thinking and data structure combination — hash map for O(1) lookup + doubly linked list for O(1) eviction. It's practical — caches are everywhere in real systems (CDNs, databases, API responses). Startups value practical DS knowledge over pure algorithmic complexity. Follow-ups: thread safety, distributed LRU, TTL support, LFU variant. Understanding cache eviction strategies is crucial for building scalable systems.", difficulty: "medium", type: "concept" },
        { question: "How does flattening a multilevel linked list work?", answer: "Each node may have a child pointer to another linked list. Use DFS: when encountering a child, insert the child list between current and next. Keep a stack or use recursion to remember the 'next' pointer. After inserting child list, continue traversal. The key is properly connecting the tail of the child list to the original next node. Time O(n) where n is total nodes across all levels. This tests understanding of complex pointer manipulation.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "LRU Cache", difficulty: "hard",
          approaches: [
            { name: "Map + Doubly Linked List", complexity: { time: "O(1) all ops", space: "O(capacity)" },
              code: `class LRUCache {\n  constructor(capacity) {\n    this.cap = capacity;\n    this.map = new Map();\n    this.head = { next: null, prev: null };\n    this.tail = { next: null, prev: null };\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n  _remove(n) { n.prev.next = n.next; n.next.prev = n.prev; }\n  _addFront(n) {\n    n.next = this.head.next; n.prev = this.head;\n    this.head.next.prev = n; this.head.next = n;\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const n = this.map.get(key);\n    this._remove(n); this._addFront(n);\n    return n.val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) {\n      const n = this.map.get(key);\n      n.val = value;\n      this._remove(n); this._addFront(n);\n    } else {\n      const n = { key, val: value };\n      this.map.set(key, n);\n      this._addFront(n);\n      if (this.map.size > this.cap) {\n        const lru = this.tail.prev;\n        this._remove(lru);\n        this.map.delete(lru.key);\n      }\n    }\n  }\n}`,
              explanation: "Dummy head/tail simplify edge cases.\n_remove: O(1) unlink node.\n_addFront: O(1) add after head.\nget: move to front, return value.\nput: update/create, evict LRU from tail if over capacity." }
          ] },
        { question: "Flatten Multilevel Doubly Linked List", difficulty: "medium",
          approaches: [
            { name: "Iterative with Stack", complexity: { time: "O(n)", space: "O(n)" },
              code: `function flatten(head) {\n  if (!head) return null;\n  let current = head;\n  while (current) {\n    if (current.child) {\n      let childTail = current.child;\n      while (childTail.next) childTail = childTail.next;\n      childTail.next = current.next;\n      if (current.next) current.next.prev = childTail;\n      current.next = current.child;\n      current.child.prev = current;\n      current.child = null;\n    }\n    current = current.next;\n  }\n  return head;\n}`,
              explanation: "Line 6-7: Find tail of child list.\nLine 8-9: Connect child tail to current's next.\nLine 10-11: Connect current to child.\nLine 12: Clear child pointer.\nO(n) total — each node visited at most twice." }
          ] }
      ] },
    { id: "stacks-queues", title: "Stacks & Queues", icon: "SQ",
      conceptual: [
        { question: "How does Daily Temperatures use a monotonic stack?", answer: "Maintain a decreasing stack of indices. For each temperature, pop all indices with lower temperatures — for each popped index, the answer is current index minus popped index. Push current index. Each element pushed/popped once — O(n). This finds the 'next warmer day' for each day. The monotonic stack pattern is extremely common in interviews: next greater element, stock span, largest rectangle, etc.", difficulty: "medium", type: "concept" },
        { question: "How does a circular queue differ from a regular queue?", answer: "A circular queue uses a fixed-size array with front and rear pointers that wrap around. Enqueue: place at rear, advance rear = (rear + 1) % size. Dequeue: advance front = (front + 1) % size. Full: (rear + 1) % size === front. Empty: front === rear. Advantages: O(1) operations, no shifting needed, fixed memory. Used in: CPU scheduling, buffered I/O, streaming data. Regular queue (array-based) wastes space as front advances.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Daily Temperatures", difficulty: "medium",
          approaches: [
            { name: "Brute Force", complexity: { time: "O(n²)", space: "O(1)" },
              code: `function dailyTemperatures(temps) {\n  const result = new Array(temps.length).fill(0);\n  for (let i = 0; i < temps.length; i++) {\n    for (let j = i + 1; j < temps.length; j++) {\n      if (temps[j] > temps[i]) { result[i] = j - i; break; }\n    }\n  }\n  return result;\n}`,
              explanation: "For each day, scan forward for first warmer day." },
            { name: "Optimal (Monotonic Stack)", complexity: { time: "O(n)", space: "O(n)" },
              code: `function dailyTemperatures(temps) {\n  const result = new Array(temps.length).fill(0);\n  const stack = [];\n  for (let i = 0; i < temps.length; i++) {\n    while (stack.length > 0 && temps[stack[stack.length - 1]] < temps[i]) {\n      const idx = stack.pop();\n      result[idx] = i - idx;\n    }\n    stack.push(i);\n  }\n  return result;\n}`,
              explanation: "Line 5: Pop indices with lower temps — current day is their answer.\nLine 7: Distance = current index - popped index.\nLine 9: Push current index.\nEach index pushed/popped once — O(n)." }
          ] },
        { question: "Design Circular Queue", difficulty: "medium",
          approaches: [
            { name: "Array-based", complexity: { time: "O(1) all ops", space: "O(k)" },
              code: `class MyCircularQueue {\n  constructor(k) {\n    this.data = new Array(k);\n    this.size = k;\n    this.front = 0;\n    this.rear = -1;\n    this.count = 0;\n  }\n  enQueue(value) {\n    if (this.isFull()) return false;\n    this.rear = (this.rear + 1) % this.size;\n    this.data[this.rear] = value;\n    this.count++;\n    return true;\n  }\n  deQueue() {\n    if (this.isEmpty()) return false;\n    this.front = (this.front + 1) % this.size;\n    this.count--;\n    return true;\n  }\n  Front() { return this.isEmpty() ? -1 : this.data[this.front]; }\n  Rear() { return this.isEmpty() ? -1 : this.data[this.rear]; }\n  isEmpty() { return this.count === 0; }\n  isFull() { return this.count === this.size; }\n}`,
              explanation: "Circular array with front/rear pointers wrapping via modulo.\nenQueue: advance rear, place value.\ndeQueue: advance front.\nCount tracks actual elements. All O(1)." }
          ] }
      ] },
    { id: "trees", title: "Trees", icon: "Tr",
      conceptual: [
        { question: "How do you find the Kth smallest element in a BST?", answer: "Inorder traversal of a BST visits nodes in ascending order. Perform inorder traversal and return the kth visited node. Iterative approach with stack is preferred to avoid stack overflow. Time O(H + k) where H is tree height. For frequent queries, augment each node with left-subtree size for O(H) search. Follow-up: what if the BST is modified frequently? Use an order-statistic tree (augmented BST).", difficulty: "medium", type: "concept" },
        { question: "What is the right side view of a binary tree?", answer: "The right side view contains the last node visible at each level when viewed from the right. Use BFS (level-order traversal) and take the last node of each level. Alternatively, use DFS with right-first traversal — the first node visited at each new depth is the rightmost. Time O(n), space O(w) for BFS where w is max width, or O(h) for DFS where h is height. Left side view is the mirror: take first node of each level or left-first DFS.", difficulty: "medium", type: "concept" },
        { question: "How do you flatten a binary tree to linked list in-place?", answer: "Morris-like approach or reverse postorder. Simple approach: for each node, if it has a left child, find the rightmost node of the left subtree (predecessor), connect it to the right child, then move the left subtree to the right and clear left. Move to the next right node. This is O(n) time, O(1) space. Recursive approach: flatten right subtree, flatten left subtree, attach flattened left to root.right, attach flattened right to end of that. Preorder sequence.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Kth Smallest Element in BST", difficulty: "medium",
          approaches: [
            { name: "Inorder Traversal", complexity: { time: "O(H + k)", space: "O(H)" },
              code: `function kthSmallest(root, k) {\n  const stack = [];\n  let current = root;\n  while (true) {\n    while (current) {\n      stack.push(current);\n      current = current.left;\n    }\n    current = stack.pop();\n    k--;\n    if (k === 0) return current.val;\n    current = current.right;\n  }\n}`,
              explanation: "Iterative inorder using stack.\nLine 5-7: Go as far left as possible.\nLine 9-10: Process node, decrement k.\nLine 11: kth element found.\nLine 12: Move to right subtree." }
          ] },
        { question: "Binary Tree Right Side View", difficulty: "medium",
          approaches: [
            { name: "BFS", complexity: { time: "O(n)", space: "O(w)" },
              code: `function rightSideView(root) {\n  if (!root) return [];\n  const result = [], queue = [root];\n  while (queue.length > 0) {\n    const size = queue.length;\n    for (let i = 0; i < size; i++) {\n      const node = queue.shift();\n      if (i === size - 1) result.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n  }\n  return result;\n}`,
              explanation: "BFS level by level.\nLine 8: Last node at each level is the rightmost visible." },
            { name: "DFS (Right-First)", complexity: { time: "O(n)", space: "O(h)" },
              code: `function rightSideView(root) {\n  const result = [];\n  function dfs(node, depth) {\n    if (!node) return;\n    if (depth === result.length) result.push(node.val);\n    dfs(node.right, depth + 1);\n    dfs(node.left, depth + 1);\n  }\n  dfs(root, 0);\n  return result;\n}`,
              explanation: "Line 5: First node at new depth = rightmost (since we go right first).\nLine 6-7: Visit right before left." }
          ] },
        { question: "Flatten Binary Tree to Linked List", difficulty: "medium",
          approaches: [
            { name: "Iterative (In-Place)", complexity: { time: "O(n)", space: "O(1)" },
              code: `function flatten(root) {\n  let current = root;\n  while (current) {\n    if (current.left) {\n      let pred = current.left;\n      while (pred.right) pred = pred.right;\n      pred.right = current.right;\n      current.right = current.left;\n      current.left = null;\n    }\n    current = current.right;\n  }\n}`,
              explanation: "Line 5-6: Find rightmost of left subtree.\nLine 7: Connect it to right child.\nLine 8: Move left subtree to right.\nLine 9: Clear left.\nLine 11: Move to next. O(1) space." }
          ] }
      ] },
    { id: "graphs", title: "Graphs", icon: "Gr",
      conceptual: [
        { question: "How does Course Schedule relate to topological sort?", answer: "Course Schedule is a direct application of cycle detection in a directed graph. Model courses as nodes, prerequisites as edges. If there's a cycle, impossible to complete all courses. Use DFS with 3 states (unvisited, in-progress, done) or Kahn's BFS. Course Schedule II asks for a valid ordering — topological sort. This maps to real-world dependency resolution in build systems, package managers, and task scheduling.", difficulty: "medium", type: "concept" },
        { question: "How does Clone Graph work?", answer: "Deep copy a graph — create new nodes with same values and same neighbor relationships. Use DFS/BFS with a HashMap (old node → new node) to avoid duplicating nodes and handle cycles. When visiting a node: if already cloned (in map), return clone. Otherwise, create clone, add to map, then recursively clone all neighbors. Time and space O(V + E). The HashMap serves as both a 'visited' set and a mapping from originals to clones.", difficulty: "medium", type: "concept" },
        { question: "What are practical applications of graph algorithms in startups?", answer: "Social networks: friend recommendations (BFS), community detection (connected components). Maps/navigation: shortest path (Dijkstra, A*). Dependency management: topological sort for build systems. Fraud detection: cycle detection in transaction graphs. Recommendation engines: graph-based collaborative filtering. Knowledge graphs: BFS/DFS for entity relationships. Understanding these applications shows practical thinking valued by startups.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Course Schedule", difficulty: "medium",
          approaches: [
            { name: "DFS (Cycle Detection)", complexity: { time: "O(V + E)", space: "O(V)" },
              code: `function canFinish(numCourses, prerequisites) {\n  const graph = Array.from({ length: numCourses }, () => []);\n  for (const [a, b] of prerequisites) graph[b].push(a);\n  const state = new Array(numCourses).fill(0);\n  function dfs(node) {\n    if (state[node] === 1) return false;\n    if (state[node] === 2) return true;\n    state[node] = 1;\n    for (const next of graph[node]) {\n      if (!dfs(next)) return false;\n    }\n    state[node] = 2;\n    return true;\n  }\n  for (let i = 0; i < numCourses; i++) {\n    if (!dfs(i)) return false;\n  }\n  return true;\n}`,
              explanation: "0=unvisited, 1=in-progress, 2=done.\nLine 6: In-progress → cycle → impossible.\nLine 7: Already done → safe.\nLine 8-11: Mark in-progress, explore neighbors.\nLine 12: Mark done after processing all descendants." }
          ] },
        { question: "Clone Graph", difficulty: "medium",
          approaches: [
            { name: "DFS with HashMap", complexity: { time: "O(V + E)", space: "O(V)" },
              code: `function cloneGraph(node) {\n  if (!node) return null;\n  const map = new Map();\n  function dfs(n) {\n    if (map.has(n)) return map.get(n);\n    const clone = { val: n.val, neighbors: [] };\n    map.set(n, clone);\n    for (const neighbor of n.neighbors) {\n      clone.neighbors.push(dfs(neighbor));\n    }\n    return clone;\n  }\n  return dfs(node);\n}`,
              explanation: "Line 5: Already cloned — return clone (handles cycles).\nLine 6-7: Create clone and map it before recursing (prevents infinite loops).\nLine 8-10: Recursively clone all neighbors." }
          ] }
      ] },
    { id: "recursion-backtracking", title: "Recursion & Backtracking", icon: "RB",
      conceptual: [
        { question: "How does Generate Parentheses use backtracking?", answer: "Build valid parentheses strings by making choices: at each step, add '(' if open count < n, or ')' if close count < open count. Base case: string length = 2n. The constraint close < open ensures we never have more closing than opening brackets at any point. This generates all valid combinations without checking validity after. Time O(4^n/sqrt(n)) (Catalan number). Practical: parser generators, expression validators use similar logic.", difficulty: "medium", type: "concept" },
        { question: "How does Word Break use DP vs backtracking?", answer: "Backtracking tries every possible split: for each prefix that's a valid word, recurse on the suffix. Without memoization it's exponential. With memoization (DP), dp[i] = true if s[0..i-1] can be segmented. For each i, check all j < i: if dp[j] is true and s[j..i] is in the dictionary, dp[i] = true. Time O(n² * m) where m is max word length for substring comparison. Use a Set for O(1) word lookup. Common follow-up: return all possible segmentations.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Generate Parentheses", difficulty: "medium",
          approaches: [
            { name: "Backtracking", complexity: { time: "O(4ⁿ/√n)", space: "O(n)" },
              code: `function generateParenthesis(n) {\n  const result = [];\n  function backtrack(current, open, close) {\n    if (current.length === 2 * n) { result.push(current); return; }\n    if (open < n) backtrack(current + '(', open + 1, close);\n    if (close < open) backtrack(current + ')', open, close + 1);\n  }\n  backtrack('', 0, 0);\n  return result;\n}`,
              explanation: "Line 4: Complete string — add to results.\nLine 5: Can add '(' if haven't used all n.\nLine 6: Can add ')' only if fewer than open count. This ensures validity." }
          ] },
        { question: "Word Break", difficulty: "medium",
          approaches: [
            { name: "Brute Force (Recursion)", complexity: { time: "O(2ⁿ)", space: "O(n)" },
              code: `function wordBreak(s, wordDict) {\n  const set = new Set(wordDict);\n  function canBreak(start) {\n    if (start === s.length) return true;\n    for (let end = start + 1; end <= s.length; end++) {\n      if (set.has(s.slice(start, end)) && canBreak(end)) return true;\n    }\n    return false;\n  }\n  return canBreak(0);\n}`,
              explanation: "Try every prefix as a word, recurse on the rest. Exponential without memo." },
            { name: "Optimal (DP)", complexity: { time: "O(n² × m)", space: "O(n)" },
              code: `function wordBreak(s, wordDict) {\n  const set = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && set.has(s.slice(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}`,
              explanation: "dp[i] = can s[0..i-1] be segmented.\nLine 7: If s[0..j-1] can be segmented AND s[j..i-1] is a word.\nLine 13: Answer for full string." }
          ] }
      ] },
    { id: "dynamic-programming", title: "Dynamic Programming", icon: "DP",
      conceptual: [
        { question: "How does House Robber demonstrate DP?", answer: "Can't rob adjacent houses. dp[i] = max money from first i houses. Recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i]) — either skip current house (take prev best) or rob it (add to best from 2 houses ago). Base: dp[0] = nums[0], dp[1] = max(nums[0], nums[1]). Optimize to O(1) space using two variables. Follow-ups: circular arrangement (House Robber II), tree structure (House Robber III).", difficulty: "medium", type: "concept" },
        { question: "Why is DP important for startup interviews?", answer: "Startups value engineers who optimize. DP problems test ability to identify repeated work and eliminate it — a core optimization principle. Common DP in production: caching strategies (memoization), route optimization (shortest path), text processing (edit distance for fuzzy matching), pricing optimization (knapsack variants). Understanding when to trade space for time mirrors real engineering decisions. Plus, medium-hard DP problems filter for strong problem-solving ability.", difficulty: "medium", type: "concept" },
        { question: "How do Decode Ways and Climbing Stairs relate?", answer: "Both have the same DP structure: dp[i] depends on dp[i-1] and dp[i-2]. In Climbing Stairs, dp[i] = dp[i-1] + dp[i-2] always. In Decode Ways, dp[i] = dp[i-1] (if single digit valid) + dp[i-2] (if two-digit valid). The validity constraints make Decode Ways harder. Many DP problems are variations of this Fibonacci-like pattern: unique paths, tiling problems, combination sum with limited choices.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "House Robber", difficulty: "medium",
          approaches: [
            { name: "DP (Space Optimized)", complexity: { time: "O(n)", space: "O(1)" },
              code: `function rob(nums) {\n  if (nums.length <= 2) return Math.max(...nums);\n  let prev2 = nums[0], prev1 = Math.max(nums[0], nums[1]);\n  for (let i = 2; i < nums.length; i++) {\n    const current = Math.max(prev1, prev2 + nums[i]);\n    prev2 = prev1;\n    prev1 = current;\n  }\n  return prev1;\n}`,
              explanation: "Line 5: Max of skipping (prev1) or robbing (prev2 + current).\nO(1) space with two variables." }
          ] },
        { question: "Decode Ways", difficulty: "medium",
          approaches: [
            { name: "DP", complexity: { time: "O(n)", space: "O(1)" },
              code: `function numDecodings(s) {\n  if (s[0] === '0') return 0;\n  let prev2 = 1, prev1 = 1;\n  for (let i = 1; i < s.length; i++) {\n    let current = 0;\n    if (s[i] !== '0') current += prev1;\n    const two = parseInt(s.slice(i-1, i+1));\n    if (two >= 10 && two <= 26) current += prev2;\n    prev2 = prev1;\n    prev1 = current;\n  }\n  return prev1;\n}`,
              explanation: "Line 6: Single digit (1-9) adds prev1 ways.\nLine 7-8: Two digits (10-26) adds prev2 ways.\nSame Fibonacci pattern with validity constraints." }
          ] },
        { question: "Word Break", difficulty: "medium",
          approaches: [
            { name: "DP", complexity: { time: "O(n² × m)", space: "O(n)" },
              code: `function wordBreak(s, wordDict) {\n  const set = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }\n    }\n  }\n  return dp[s.length];\n}`,
              explanation: "dp[i] = can s[0..i-1] be segmented into dictionary words.\nLine 7: If s[0..j-1] segmentable AND s[j..i-1] is a word → dp[i] = true." }
          ] }
      ] },
    { id: "sorting-searching", title: "Sorting & Searching", icon: "SS",
      conceptual: [
        { question: "Why is QuickSelect preferred over sorting for finding Kth element?", answer: "QuickSelect finds the kth element in O(n) average time vs O(n log n) for sorting. It only recurses into one partition (the one containing the kth position), unlike QuickSort which processes both. Using randomized pivot selection, expected time is O(n) — geometric series 1 + 1/2 + 1/4 + ... = 2n. Worst case O(n²) with bad pivots, but randomization makes this astronomically unlikely. For top-K problems, heap approach O(n log k) is better when k << n.", difficulty: "medium", type: "concept" },
        { question: "How does Find Peak Element use binary search?", answer: "A peak element is greater than its neighbors. Since nums[-1] and nums[n] are -∞, a peak always exists. Binary search: if nums[mid] < nums[mid+1], peak is in the right half (values increase toward right). Otherwise, peak is in the left half (or mid itself). This works because following the increasing direction always leads to a peak. Time O(log n). This demonstrates that binary search works whenever there's a 'directional' property, not just sorted arrays.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Kth Largest Element (QuickSelect)", difficulty: "medium",
          approaches: [
            { name: "QuickSelect", complexity: { time: "O(n) avg", space: "O(1)" },
              code: `function findKthLargest(nums, k) {\n  const target = nums.length - k;\n  function quickSelect(l, r) {\n    const pivot = nums[r];\n    let p = l;\n    for (let i = l; i < r; i++) {\n      if (nums[i] <= pivot) {\n        [nums[i], nums[p]] = [nums[p], nums[i]];\n        p++;\n      }\n    }\n    [nums[p], nums[r]] = [nums[r], nums[p]];\n    if (p === target) return nums[p];\n    if (p < target) return quickSelect(p + 1, r);\n    return quickSelect(l, p - 1);\n  }\n  return quickSelect(0, nums.length - 1);\n}`,
              explanation: "Partition around pivot, recurse only into the half containing target index.\nAverage O(n) since we process n + n/2 + n/4 + ... = 2n elements." }
          ] },
        { question: "Find Peak Element", difficulty: "medium",
          approaches: [
            { name: "Binary Search", complexity: { time: "O(log n)", space: "O(1)" },
              code: `function findPeakElement(nums) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] < nums[mid + 1]) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}`,
              explanation: "Line 5: If mid < mid+1, peak must be to the right.\nLine 6: Otherwise peak is at mid or to the left.\nConverges to a peak in O(log n)." }
          ] }
      ] },
    { id: "greedy", title: "Greedy", icon: "Gd",
      conceptual: [
        { question: "How does Jump Game use greedy?", answer: "Track the farthest index reachable. Iterate through the array: at each position, update farthest = max(farthest, i + nums[i]). If i > farthest at any point, we're stuck — return false. If farthest >= last index, return true. O(n) time, O(1) space. The greedy insight: we only need to know the maximum reach, not the specific path. Jump Game II (min jumps) uses a similar BFS-like greedy approach.", difficulty: "medium", type: "concept" },
        { question: "How does Gas Station use greedy?", answer: "If total gas >= total cost, a solution exists. Start from station 0, track current tank. If tank goes negative at station i, stations 0 to i can't be the start — try starting from i+1. Reset tank. The start that doesn't cause a negative tank is the answer. O(n) time, O(1) space. Proof: if starting from station k allows completing the circuit, no earlier station works (they'd have even less gas at the problematic point).", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Jump Game", difficulty: "medium",
          approaches: [
            { name: "Greedy", complexity: { time: "O(n)", space: "O(1)" },
              code: `function canJump(nums) {\n  let farthest = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > farthest) return false;\n    farthest = Math.max(farthest, i + nums[i]);\n  }\n  return true;\n}`,
              explanation: "Line 4: Can't reach this position — impossible.\nLine 5: Update maximum reachable index.\nLine 7: If we finish the loop, last index is reachable." }
          ] },
        { question: "Gas Station", difficulty: "medium",
          approaches: [
            { name: "Greedy (Single Pass)", complexity: { time: "O(n)", space: "O(1)" },
              code: `function canCompleteCircuit(gas, cost) {\n  let total = 0, tank = 0, start = 0;\n  for (let i = 0; i < gas.length; i++) {\n    const diff = gas[i] - cost[i];\n    total += diff;\n    tank += diff;\n    if (tank < 0) {\n      start = i + 1;\n      tank = 0;\n    }\n  }\n  return total >= 0 ? start : -1;\n}`,
              explanation: "Line 5: Track total to check if solution exists.\nLine 6: Track current tank.\nLine 7-9: Tank negative → can't start here or earlier; try next.\nLine 12: If total gas >= total cost, start is the answer." }
          ] }
      ] },
    { id: "hashing", title: "Hashing", icon: "Ha",
      conceptual: [
        { question: "How does Top K Frequent Words combine hashing and sorting?", answer: "Count frequencies with HashMap O(n). Then: (1) Sort entries by frequency desc, then alphabetically O(m log m). (2) Min-heap of size K — better when k << n, O(m log k). (3) Bucket sort by frequency O(m). For the follow-up 'what if words stream in', use a Trie + heap for efficient updates. Startups often ask this as a system design warmup — it's the core of trending topics, autocomplete ranking, and analytics dashboards.", difficulty: "medium", type: "concept" },
        { question: "How would you design a HashMap from scratch?", answer: "Array of buckets, hash function maps key to bucket index. Handle collisions with chaining (linked list per bucket) or open addressing (probe for next empty). Load factor = entries/buckets; resize (double and rehash) when > 0.75. Hash function should distribute evenly — for strings, use polynomial hash. Operations: O(1) average, O(n) worst case with bad hash. Real-world: Java's HashMap uses tree bins for long chains (>8). This tests understanding of fundamentals.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Top K Frequent Words", difficulty: "medium",
          approaches: [
            { name: "Sort by Frequency", complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function topKFrequent(words, k) {\n  const freq = {};\n  for (const w of words) freq[w] = (freq[w] || 0) + 1;\n  return Object.keys(freq)\n    .sort((a, b) => freq[b] - freq[a] || a.localeCompare(b))\n    .slice(0, k);\n}`,
              explanation: "Count frequencies, sort by freq desc then alphabetically, take top k." }
          ] },
        { question: "Design HashMap", difficulty: "medium",
          approaches: [
            { name: "Array + Chaining", complexity: { time: "O(1) avg", space: "O(n)" },
              code: `class MyHashMap {\n  constructor() {\n    this.size = 1000;\n    this.buckets = new Array(this.size).fill(null).map(() => []);\n  }\n  _hash(key) { return key % this.size; }\n  put(key, value) {\n    const bucket = this.buckets[this._hash(key)];\n    for (const pair of bucket) {\n      if (pair[0] === key) { pair[1] = value; return; }\n    }\n    bucket.push([key, value]);\n  }\n  get(key) {\n    const bucket = this.buckets[this._hash(key)];\n    for (const pair of bucket) {\n      if (pair[0] === key) return pair[1];\n    }\n    return -1;\n  }\n  remove(key) {\n    const bucket = this.buckets[this._hash(key)];\n    const idx = bucket.findIndex(p => p[0] === key);\n    if (idx !== -1) bucket.splice(idx, 1);\n  }\n}`,
              explanation: "1000 buckets with chaining (arrays of [key, value]).\nHash: key % size.\nput: update if exists, else append.\nget: search in bucket.\nremove: find and splice." }
          ] }
      ] },
    { id: "bit-manipulation", title: "Bit Manipulation", icon: "Bi",
      conceptual: [
        { question: "How does Counting Bits use DP with bit manipulation?", answer: "Count set bits for all numbers 0 to n. dp[i] = dp[i >> 1] + (i & 1). i >> 1 removes the last bit (same as i/2). i & 1 checks if last bit is set. So bits in i = bits in i/2 + last bit. Alternative: dp[i] = dp[i & (i-1)] + 1 (removing lowest set bit). Both give O(n) time, O(n) space. The key insight: relate each number's bit count to a smaller number's.", difficulty: "medium", type: "concept" },
        { question: "How does Reverse Bits work?", answer: "Process each bit from right to left: extract bit with n & 1, place it in the reversed position using left shift, then right shift n. For 32-bit: result = (result << 1) | (n & 1), n >>= 1, repeat 32 times. Alternatively use divide-and-conquer: swap adjacent bits, then pairs, then nibbles, etc. O(1) time for fixed-width integers. JavaScript caveat: use >>> for unsigned right shift to handle the sign bit correctly.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Counting Bits", difficulty: "medium",
          approaches: [
            { name: "DP", complexity: { time: "O(n)", space: "O(n)" },
              code: `function countBits(n) {\n  const dp = new Array(n + 1).fill(0);\n  for (let i = 1; i <= n; i++) {\n    dp[i] = dp[i >> 1] + (i & 1);\n  }\n  return dp;\n}`,
              explanation: "dp[i] = bits in i/2 + last bit of i.\nBuilds on previously computed values. O(n) time." }
          ] },
        { question: "Reverse Bits", difficulty: "medium",
          approaches: [
            { name: "Bit-by-Bit", complexity: { time: "O(1)", space: "O(1)" },
              code: `function reverseBits(n) {\n  let result = 0;\n  for (let i = 0; i < 32; i++) {\n    result = (result << 1) | (n & 1);\n    n >>>= 1;\n  }\n  return result >>> 0;\n}`,
              explanation: "Line 4: Shift result left, add lowest bit of n.\nLine 5: Unsigned right shift n.\nLine 7: >>> 0 ensures unsigned 32-bit result." }
          ] }
      ] },
    { id: "heaps", title: "Heaps", icon: "Hp",
      conceptual: [
        { question: "How does Task Scheduler relate to heap/greedy?", answer: "Count task frequencies. The most frequent task determines the minimum time. Formula: (maxFreq - 1) * (n + 1) + countOfMaxFreq. Explanation: maxFreq-1 blocks of (n+1) length + final block. If total tasks > formula, answer is just total tasks (no idle). Heap approach: repeatedly schedule top-k frequent tasks in each (n+1) cycle. Math approach is O(n), heap is O(n log 26) = O(n). Both are asked in interviews.", difficulty: "medium", type: "concept" },
        { question: "How does K Closest Points use a heap?", answer: "Calculate distances for all points. Use a max-heap of size K — keep the K smallest distances. For each point: if heap size < K or distance < heap top, add (and remove top if over K). Final heap contains K closest points. Time O(n log k). Alternative: QuickSelect on distances for O(n) average. The heap approach handles streaming data; QuickSelect needs all points upfront. Follow-up: what if points stream in continuously? Heap is the answer.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Task Scheduler", difficulty: "medium",
          approaches: [
            { name: "Math/Greedy", complexity: { time: "O(n)", space: "O(1)" },
              code: `function leastInterval(tasks, n) {\n  const freq = new Array(26).fill(0);\n  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;\n  const maxFreq = Math.max(...freq);\n  const maxCount = freq.filter(f => f === maxFreq).length;\n  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);\n}`,
              explanation: "Count frequencies. Formula: (maxFreq-1) blocks of (n+1) + final batch. Max with total tasks for when no idle needed." }
          ] },
        { question: "K Closest Points to Origin", difficulty: "medium",
          approaches: [
            { name: "Sort", complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function kClosest(points, k) {\n  return points.sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2)).slice(0, k);\n}`,
              explanation: "Sort by distance to origin, take first k." },
            { name: "QuickSelect", complexity: { time: "O(n) avg", space: "O(1)" },
              code: `function kClosest(points, k) {\n  const dist = p => p[0]**2 + p[1]**2;\n  function quickSelect(l, r) {\n    const pivotDist = dist(points[r]);\n    let p = l;\n    for (let i = l; i < r; i++) {\n      if (dist(points[i]) <= pivotDist) {\n        [points[i], points[p]] = [points[p], points[i]];\n        p++;\n      }\n    }\n    [points[p], points[r]] = [points[r], points[p]];\n    if (p === k) return;\n    if (p < k) quickSelect(p + 1, r);\n    else quickSelect(l, p - 1);\n  }\n  quickSelect(0, points.length - 1);\n  return points.slice(0, k);\n}`,
              explanation: "Partition by distance. Only recurse into the half containing kth position. O(n) average." }
          ] }
      ] },
    { id: "tries", title: "Tries", icon: "Ti",
      conceptual: [
        { question: "How does Design Add and Search Words use a Trie?", answer: "Add words normally to a Trie. For search with '.' wildcards, use DFS: when encountering '.', try all children at that level. For regular characters, follow the specific child. Return true if any path reaches a word end. Without wildcards, search is O(m). With wildcards in worst case, it's O(26^m) but typically much faster. This combines Trie traversal with backtracking — a common interview pattern.", difficulty: "medium", type: "concept" },
        { question: "How does Replace Words use a Trie?", answer: "Build a Trie from the root dictionary. For each word in the sentence, traverse the Trie character by character. If we reach a node marked as end-of-word, replace the word with this root (prefix). If we exhaust the Trie path without finding a root, keep the original word. Time O(sum of all characters). The Trie finds the shortest root for each word efficiently. This models real-world text processing and stemming algorithms.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Add and Search Words (Wildcard)", difficulty: "medium",
          approaches: [
            { name: "Trie + DFS", complexity: { time: "O(m) add, O(26^m) search worst", space: "O(total chars)" },
              code: `class WordDictionary {\n  constructor() { this.root = {}; }\n  addWord(word) {\n    let node = this.root;\n    for (const c of word) {\n      if (!node[c]) node[c] = {};\n      node = node[c];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    return this._dfs(word, 0, this.root);\n  }\n  _dfs(word, i, node) {\n    if (i === word.length) return !!node.isEnd;\n    if (word[i] === '.') {\n      for (const key in node) {\n        if (key !== 'isEnd' && this._dfs(word, i + 1, node[key])) return true;\n      }\n      return false;\n    }\n    if (!node[word[i]]) return false;\n    return this._dfs(word, i + 1, node[word[i]]);\n  }\n}`,
              explanation: "addWord: standard Trie insert.\nsearch with '.': try all children at that level (DFS).\nRegular char: follow specific child.\nLine 15: Reached end — check if valid word." }
          ] },
        { question: "Replace Words", difficulty: "medium",
          approaches: [
            { name: "Trie", complexity: { time: "O(n)", space: "O(dict chars)" },
              code: `function replaceWords(dictionary, sentence) {\n  const root = {};\n  for (const word of dictionary) {\n    let node = root;\n    for (const c of word) {\n      if (!node[c]) node[c] = {};\n      node = node[c];\n    }\n    node.isEnd = true;\n  }\n  return sentence.split(' ').map(word => {\n    let node = root;\n    for (let i = 0; i < word.length; i++) {\n      if (!node[word[i]]) return word;\n      node = node[word[i]];\n      if (node.isEnd) return word.slice(0, i + 1);\n    }\n    return word;\n  }).join(' ');\n}`,
              explanation: "Build Trie from dictionary.\nFor each word: traverse Trie. If hit isEnd, replace with that prefix.\nIf Trie path breaks, keep original word." }
          ] }
      ] },
    { id: "sliding-window", title: "Sliding Window", icon: "SW",
      conceptual: [
        { question: "How does Fruit Into Baskets map to at-most-K-distinct?", answer: "Each tree type = distinct character, 2 baskets = at most K=2 distinct types. Find longest subarray with at most 2 distinct values. Use sliding window with a frequency map. Expand right, adding fruits. When distinct types > 2, shrink from left. Track max window size. O(n) time. This demonstrates how real-world problems map to standard patterns — recognizing the pattern is half the battle.", difficulty: "medium", type: "concept" },
        { question: "How does Permutation in String use sliding window?", answer: "Check if any permutation of s1 is a substring of s2. Use a fixed-size window of length s1 on s2. Maintain character frequency comparison. Slide: add right char, remove left char. If frequencies match, found a permutation. Time O(n) where n = len(s2). Optimization: track count of matching characters instead of comparing full arrays each time. Same technique applies to Find All Anagrams in a String.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Fruit Into Baskets (At Most 2 Distinct)", difficulty: "medium",
          approaches: [
            { name: "Sliding Window", complexity: { time: "O(n)", space: "O(1)" },
              code: `function totalFruit(fruits) {\n  const freq = {};\n  let left = 0, maxLen = 0, distinct = 0;\n  for (let right = 0; right < fruits.length; right++) {\n    if (!freq[fruits[right]]) distinct++;\n    freq[fruits[right]] = (freq[fruits[right]] || 0) + 1;\n    while (distinct > 2) {\n      freq[fruits[left]]--;\n      if (freq[fruits[left]] === 0) { delete freq[fruits[left]]; distinct--; }\n      left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
              explanation: "Expand right, track distinct types.\nWhen > 2 types, shrink from left.\nTrack max window size. Classic at-most-K pattern." }
          ] },
        { question: "Permutation in String", difficulty: "medium",
          approaches: [
            { name: "Sliding Window + Frequency Match", complexity: { time: "O(n)", space: "O(1)" },
              code: `function checkInclusion(s1, s2) {\n  if (s1.length > s2.length) return false;\n  const count = new Array(26).fill(0);\n  for (const c of s1) count[c.charCodeAt(0) - 97]++;\n  let matches = count.filter(c => c === 0).length;\n  for (let i = 0; i < s2.length; i++) {\n    const idx = s2.charCodeAt(i) - 97;\n    count[idx]--;\n    if (count[idx] === 0) matches++;\n    else if (count[idx] === -1) matches--;\n    if (i >= s1.length) {\n      const lidx = s2.charCodeAt(i - s1.length) - 97;\n      count[lidx]++;\n      if (count[lidx] === 0) matches++;\n      else if (count[lidx] === 1) matches--;\n    }\n    if (matches === 26) return true;\n  }\n  return false;\n}`,
              explanation: "Track how many of 26 chars have matching counts.\nSlide window of size s1.length.\nWhen all 26 match (matches === 26), found a permutation.\nO(n) — each char processed once." }
          ] }
      ] },
    { id: "two-pointers", title: "Two Pointers", icon: "TP",
      conceptual: [
        { question: "How does Sort Colors (Dutch National Flag) use three pointers?", answer: "Three regions: [0..low-1] are 0s, [low..mid-1] are 1s, [high+1..n-1] are 2s. Initialize low=0, mid=0, high=n-1. Process mid: if 0, swap with low and advance both. If 1, advance mid. If 2, swap with high and decrement high (don't advance mid — swapped element needs processing). One pass, O(n) time, O(1) space. This partitions in-place without sorting. Named after the Dutch flag with three stripes.", difficulty: "medium", type: "concept" },
        { question: "How does counting palindromic substrings use expand-around-center?", answer: "For each index i, expand around center (i, i) for odd-length and (i, i+1) for even-length palindromes. Count how far each center expands while maintaining the palindrome property. Total palindromic substrings = sum of expansions from all centers. Time O(n²), space O(1). This is essentially the same as Longest Palindromic Substring but counting instead of tracking the longest. Manacher's algorithm achieves O(n) but is rarely expected.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        { question: "Sort Colors (Dutch National Flag)", difficulty: "medium",
          approaches: [
            { name: "Three Pointers", complexity: { time: "O(n)", space: "O(1)" },
              code: `function sortColors(nums) {\n  let low = 0, mid = 0, high = nums.length - 1;\n  while (mid <= high) {\n    if (nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++; mid++;\n    } else if (nums[mid] === 1) {\n      mid++;\n    } else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n    }\n  }\n}`,
              explanation: "0 → swap to low region, advance both.\n1 → already in place, advance mid.\n2 → swap to high region, only decrement high (swapped element unknown).\nOne pass, O(1) space." }
          ] },
        { question: "Palindromic Substrings", difficulty: "medium",
          approaches: [
            { name: "Expand Around Center", complexity: { time: "O(n²)", space: "O(1)" },
              code: `function countSubstrings(s) {\n  let count = 0;\n  for (let i = 0; i < s.length; i++) {\n    count += expand(s, i, i);\n    count += expand(s, i, i + 1);\n  }\n  return count;\n}\nfunction expand(s, l, r) {\n  let count = 0;\n  while (l >= 0 && r < s.length && s[l] === s[r]) {\n    count++;\n    l--; r++;\n  }\n  return count;\n}`,
              explanation: "Line 4: Count odd-length palindromes centered at i.\nLine 5: Count even-length palindromes centered at (i, i+1).\nexpand: count how many palindromes expand from this center." }
          ] }
      ] }
  ]
};
