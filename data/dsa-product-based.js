export const productBased = {
  id: "product-based",
  title: "Product Based",
  description: "Google, Amazon, Microsoft, Meta",
  topics: [
    {
      id: "arrays",
      title: "Arrays",
      icon: "Ar",
      conceptual: [
        { question: "Explain the two-pointer approach for Trapping Rain Water.", answer: "Use two pointers from both ends with maxLeft and maxRight tracking the tallest bar seen from each side. Water at any position = min(maxLeft, maxRight) - height[position]. Move the pointer with the smaller max inward since water is bounded by the shorter side. This avoids the need for prefix/suffix arrays and achieves O(n) time, O(1) space. The key insight is that the shorter side determines the water level, so we can safely compute water for that side.", difficulty: "advanced", type: "concept" },
        { question: "How does First Missing Positive achieve O(n) time and O(1) space?", answer: "The key insight is that for an array of size n, the first missing positive must be in [1, n+1]. Use the array itself as a hash map: place each number i at index i-1. Iterate through the array, swapping nums[i] to its correct position nums[nums[i]-1] while it's in range [1,n] and not already in place. After all swaps, the first index i where nums[i] !== i+1 gives the answer i+1. This is called cyclic sort and is O(n) despite nested loops because each swap places one element correctly.", difficulty: "advanced", type: "concept" },
        { question: "Explain the binary search approach for Median of Two Sorted Arrays.", answer: "Instead of merging both arrays O(n+m), binary search on the smaller array to find the correct partition. Partition both arrays such that all left elements ≤ all right elements. Binary search the partition position i in the smaller array; j = (n+m+1)/2 - i in the larger. Valid when maxLeft1 ≤ minRight2 and maxLeft2 ≤ minRight1. The median is derived from the four boundary elements. Time O(log(min(n,m))), space O(1). This is one of the hardest binary search problems.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Trapping Rain Water",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function trap(height) {\n  let water = 0;\n  for (let i = 0; i < height.length; i++) {\n    let maxLeft = 0, maxRight = 0;\n    for (let j = 0; j <= i; j++) maxLeft = Math.max(maxLeft, height[j]);\n    for (let j = i; j < height.length; j++) maxRight = Math.max(maxRight, height[j]);\n    water += Math.min(maxLeft, maxRight) - height[i];\n  }\n  return water;\n}`,
              explanation: "Line 4-6: For each position, find tallest bar to left and right.\nLine 7: Water at this position = min(maxLeft, maxRight) - height.\nO(n²) — scans left and right for each position."
            },
            {
              name: "Better (Prefix/Suffix Arrays)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function trap(height) {\n  const n = height.length;\n  const maxLeft = new Array(n), maxRight = new Array(n);\n  maxLeft[0] = height[0];\n  for (let i = 1; i < n; i++) maxLeft[i] = Math.max(maxLeft[i-1], height[i]);\n  maxRight[n-1] = height[n-1];\n  for (let i = n-2; i >= 0; i--) maxRight[i] = Math.max(maxRight[i+1], height[i]);\n  let water = 0;\n  for (let i = 0; i < n; i++) water += Math.min(maxLeft[i], maxRight[i]) - height[i];\n  return water;\n}`,
              explanation: "Line 4-5: Precompute max height to the left of each position.\nLine 6-7: Precompute max height to the right.\nLine 9: Water at each position = min(maxLeft, maxRight) - height.\nO(n) time but O(n) extra space."
            },
            {
              name: "Optimal (Two Pointers)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function trap(height) {\n  let left = 0, right = height.length - 1;\n  let maxLeft = 0, maxRight = 0, water = 0;\n  while (left < right) {\n    if (height[left] <= height[right]) {\n      maxLeft = Math.max(maxLeft, height[left]);\n      water += maxLeft - height[left];\n      left++;\n    } else {\n      maxRight = Math.max(maxRight, height[right]);\n      water += maxRight - height[right];\n      right--;\n    }\n  }\n  return water;\n}`,
              explanation: "Line 2-3: Two pointers and running max from each side.\nLine 5: Process shorter side — water is bounded by it.\nLine 6: Update max from left.\nLine 7: Water at this position = maxLeft - height.\nLine 10-12: Same logic for right side.\nO(n) time, O(1) space."
            }
          ]
        },
        {
          question: "First Missing Positive",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force (HashSet)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function firstMissingPositive(nums) {\n  const set = new Set(nums);\n  for (let i = 1; i <= nums.length + 1; i++) {\n    if (!set.has(i)) return i;\n  }\n}`,
              explanation: "Put all numbers in a set, then check 1, 2, 3... until one is missing. O(n) space."
            },
            {
              name: "Optimal (Cyclic Sort — In-Place)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function firstMissingPositive(nums) {\n  const n = nums.length;\n  for (let i = 0; i < n; i++) {\n    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {\n      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    if (nums[i] !== i + 1) return i + 1;\n  }\n  return n + 1;\n}`,
              explanation: "Line 4: While current number is in range [1,n] and not at correct position.\nLine 5: Swap it to its correct index (value i goes to index i-1).\nLine 8-10: First position where value ≠ index+1 gives the answer.\nLine 11: All positions correct → answer is n+1.\nEach element swapped at most once → O(n)."
            }
          ]
        },
        {
          question: "Median of Two Sorted Arrays",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force (Merge)",
              complexity: { time: "O(n + m)", space: "O(n + m)" },
              code: `function findMedianSortedArrays(nums1, nums2) {\n  const merged = [];\n  let i = 0, j = 0;\n  while (i < nums1.length && j < nums2.length) {\n    if (nums1[i] <= nums2[j]) merged.push(nums1[i++]);\n    else merged.push(nums2[j++]);\n  }\n  while (i < nums1.length) merged.push(nums1[i++]);\n  while (j < nums2.length) merged.push(nums2[j++]);\n  const mid = Math.floor(merged.length / 2);\n  return merged.length % 2 === 0 ? (merged[mid-1] + merged[mid]) / 2 : merged[mid];\n}`,
              explanation: "Merge both sorted arrays, then find median from merged array."
            },
            {
              name: "Optimal (Binary Search)",
              complexity: { time: "O(log(min(n,m)))", space: "O(1)" },
              code: `function findMedianSortedArrays(nums1, nums2) {\n  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n  const n = nums1.length, m = nums2.length;\n  let lo = 0, hi = n;\n  while (lo <= hi) {\n    const i = Math.floor((lo + hi) / 2);\n    const j = Math.floor((n + m + 1) / 2) - i;\n    const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];\n    const minRight1 = i === n ? Infinity : nums1[i];\n    const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];\n    const minRight2 = j === m ? Infinity : nums2[j];\n    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n      if ((n + m) % 2 === 0) {\n        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;\n      }\n      return Math.max(maxLeft1, maxLeft2);\n    } else if (maxLeft1 > minRight2) {\n      hi = i - 1;\n    } else {\n      lo = i + 1;\n    }\n  }\n}`,
              explanation: "Line 2: Ensure binary search on smaller array.\nLine 6-7: Partition both arrays so left side has (n+m+1)/2 elements.\nLine 8-11: Get boundary elements (use ±Infinity for edges).\nLine 12: Valid partition — all left ≤ all right.\nLine 13-16: Calculate median based on odd/even total.\nLine 17-20: Adjust binary search range.\nO(log(min(n,m))) time."
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
        { question: "How does the sliding window approach work for Minimum Window Substring?", answer: "Maintain character frequency maps for the target and current window. Expand right to include characters. Track 'formed' — the count of distinct characters whose window frequency meets or exceeds the target frequency. When formed equals the number of distinct target characters, shrink from left to minimize the window. Each shrink that breaks the condition stops the inner loop. Time O(n) since each character is added and removed at most once. This is a template for many 'find minimum/maximum window containing X' problems.", difficulty: "advanced", type: "concept" },
        { question: "How does dynamic programming solve Regular Expression Matching?", answer: "Define dp[i][j] = whether s[0..i-1] matches p[0..j-1]. Base: dp[0][0] = true. For pattern *, dp[0][j] = dp[0][j-2] (zero occurrences). Transition: if p[j-1] is a letter or '.', dp[i][j] = dp[i-1][j-1] when chars match. If p[j-1] is '*': dp[i][j] = dp[i][j-2] (zero occurrences) OR dp[i-1][j] if s[i-1] matches p[j-2] (one or more occurrences). Time O(n*m), space O(n*m). The '*' case is tricky because it can match zero or more of the preceding character.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Longest Valid Parentheses",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n³)", space: "O(n)" },
              code: `function longestValidParentheses(s) {\n  let maxLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i + 2; j <= s.length; j += 2) {\n      if (isValid(s.slice(i, j))) maxLen = Math.max(maxLen, j - i);\n    }\n  }\n  return maxLen;\n}\nfunction isValid(s) {\n  let count = 0;\n  for (const c of s) {\n    if (c === '(') count++;\n    else if (--count < 0) return false;\n  }\n  return count === 0;\n}`,
              explanation: "Check all even-length substrings for validity. O(n³)."
            },
            {
              name: "Better (Stack)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function longestValidParentheses(s) {\n  const stack = [-1];\n  let maxLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === '(') {\n      stack.push(i);\n    } else {\n      stack.pop();\n      if (stack.length === 0) {\n        stack.push(i);\n      } else {\n        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);\n      }\n    }\n  }\n  return maxLen;\n}`,
              explanation: "Line 2: Stack initialized with -1 as base.\nLine 5-6: Push index of '('.\nLine 8: Pop for ')'.\nLine 9-10: Stack empty — push current as new base.\nLine 12: Valid length = current index - stack top."
            },
            {
              name: "Optimal (Two Pass — No Extra Space)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function longestValidParentheses(s) {\n  let left = 0, right = 0, maxLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === '(') left++; else right++;\n    if (left === right) maxLen = Math.max(maxLen, 2 * right);\n    if (right > left) { left = 0; right = 0; }\n  }\n  left = 0; right = 0;\n  for (let i = s.length - 1; i >= 0; i--) {\n    if (s[i] === '(') left++; else right++;\n    if (left === right) maxLen = Math.max(maxLen, 2 * left);\n    if (left > right) { left = 0; right = 0; }\n  }\n  return maxLen;\n}`,
              explanation: "Lines 3-7: Left-to-right: count open/close. When equal → valid. When close > open → reset.\nLines 9-13: Right-to-left: same logic reversed to catch cases missed by first pass.\nO(1) space, two O(n) passes."
            }
          ]
        },
        {
          question: "Regular Expression Matching",
          difficulty: "hard",
          approaches: [
            {
              name: "Recursive",
              complexity: { time: "O(2^(n+m))", space: "O(n + m)" },
              code: `function isMatch(s, p) {\n  if (p.length === 0) return s.length === 0;\n  const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === '.');\n  if (p.length >= 2 && p[1] === '*') {\n    return isMatch(s, p.slice(2)) || (firstMatch && isMatch(s.slice(1), p));\n  }\n  return firstMatch && isMatch(s.slice(1), p.slice(1));\n}`,
              explanation: "Line 2: Empty pattern matches only empty string.\nLine 3: First characters match?\nLine 4-5: If next is '*': skip pattern pair (zero match) OR consume one char if first matches.\nLine 7: No '*' — consume one from each if they match."
            },
            {
              name: "Optimal (DP)",
              complexity: { time: "O(n × m)", space: "O(n × m)" },
              code: `function isMatch(s, p) {\n  const n = s.length, m = p.length;\n  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));\n  dp[0][0] = true;\n  for (let j = 2; j <= m; j++) {\n    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];\n  }\n  for (let i = 1; i <= n; i++) {\n    for (let j = 1; j <= m; j++) {\n      if (p[j - 1] === '*') {\n        dp[i][j] = dp[i][j - 2];\n        if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {\n          dp[i][j] = dp[i][j] || dp[i - 1][j];\n        }\n      } else if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {\n        dp[i][j] = dp[i - 1][j - 1];\n      }\n    }\n  }\n  return dp[n][m];\n}`,
              explanation: "Line 4: Empty string matches empty pattern.\nLine 5-6: Handle patterns like a*b*c* matching empty string.\nLine 10-14: '*' case: zero occurrences (dp[i][j-2]) or extend match (dp[i-1][j]).\nLine 15-16: Direct character or '.' match.\nLine 20: Answer at dp[n][m]."
            }
          ]
        },
        {
          question: "Minimum Window Substring",
          difficulty: "hard",
          approaches: [
            {
              name: "Optimal (Sliding Window)",
              complexity: { time: "O(n)", space: "O(k)" },
              code: `function minWindow(s, t) {\n  const need = {};\n  for (const c of t) need[c] = (need[c] || 0) + 1;\n  let left = 0, formed = 0, required = Object.keys(need).length;\n  let minLen = Infinity, minStart = 0;\n  const window = {};\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    window[c] = (window[c] || 0) + 1;\n    if (need[c] && window[c] === need[c]) formed++;\n    while (formed === required) {\n      if (right - left + 1 < minLen) {\n        minLen = right - left + 1;\n        minStart = left;\n      }\n      const lc = s[left];\n      window[lc]--;\n      if (need[lc] && window[lc] < need[lc]) formed--;\n      left++;\n    }\n  }\n  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);\n}`,
              explanation: "Line 2-3: Count required character frequencies.\nLine 9: Add right character to window.\nLine 10: If character count meets requirement, increment formed.\nLine 11: While window contains all required characters, try shrinking.\nLine 16-18: Remove left character, check if requirement breaks.\nO(n) time — each character added/removed once."
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
        { question: "How does reversing nodes in K-groups work?", answer: "Process the list in chunks of K nodes. For each chunk: check if K nodes remain, reverse them, and connect to the next chunk. Use a dummy node to simplify head handling. For each group, reverse K nodes using the standard iterative reversal, then connect the tail of the previous group to the head of the reversed group. Time O(n), space O(1). The tricky part is maintaining proper connections between groups.", difficulty: "advanced", type: "concept" },
        { question: "How does Copy List with Random Pointer work in O(1) space?", answer: "Three-pass approach: (1) Create cloned nodes interleaved with originals — for each node A, insert A' after A. (2) Set random pointers — A'.random = A.random.next (the clone of A's random target). (3) Separate the interleaved list into original and clone. This avoids a hash map by using the interleaved structure to map originals to clones. Time O(n), space O(1) excluding the output list.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Reverse Nodes in K-Group",
          difficulty: "hard",
          approaches: [
            {
              name: "Iterative",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function reverseKGroup(head, k) {\n  const dummy = { val: 0, next: head };\n  let prevGroup = dummy;\n  while (true) {\n    let kth = prevGroup;\n    for (let i = 0; i < k; i++) {\n      kth = kth.next;\n      if (!kth) return dummy.next;\n    }\n    let nextGroup = kth.next;\n    let prev = nextGroup, current = prevGroup.next;\n    for (let i = 0; i < k; i++) {\n      const next = current.next;\n      current.next = prev;\n      prev = current;\n      current = next;\n    }\n    const tail = prevGroup.next;\n    prevGroup.next = prev;\n    prevGroup = tail;\n  }\n}`,
              explanation: "Line 5-8: Check if K nodes remain.\nLine 10-16: Reverse K nodes — standard reversal with prev starting at nextGroup.\nLine 18: Old first node is now the tail of this group.\nLine 19: Connect previous group to new head.\nLine 20: Move prevGroup to current tail for next iteration."
            }
          ]
        },
        {
          question: "Merge K Sorted Lists",
          difficulty: "hard",
          approaches: [
            {
              name: "Divide and Conquer",
              complexity: { time: "O(N log K)", space: "O(log K)" },
              code: `function mergeKLists(lists) {\n  if (lists.length === 0) return null;\n  while (lists.length > 1) {\n    const merged = [];\n    for (let i = 0; i < lists.length; i += 2) {\n      const l1 = lists[i];\n      const l2 = i + 1 < lists.length ? lists[i + 1] : null;\n      merged.push(merge(l1, l2));\n    }\n    lists = merged;\n  }\n  return lists[0];\n}\nfunction merge(l1, l2) {\n  const d = { val: 0, next: null };\n  let c = d;\n  while (l1 && l2) {\n    if (l1.val <= l2.val) { c.next = l1; l1 = l1.next; }\n    else { c.next = l2; l2 = l2.next; }\n    c = c.next;\n  }\n  c.next = l1 || l2;\n  return d.next;\n}`,
              explanation: "Line 3-10: Merge lists in pairs each round, halving the count.\nLine 14-23: Standard merge of two sorted lists.\nlog K rounds × N nodes per round = O(N log K)."
            }
          ]
        },
        {
          question: "Copy List with Random Pointer",
          difficulty: "hard",
          approaches: [
            {
              name: "HashMap",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function copyRandomList(head) {\n  if (!head) return null;\n  const map = new Map();\n  let current = head;\n  while (current) {\n    map.set(current, { val: current.val, next: null, random: null });\n    current = current.next;\n  }\n  current = head;\n  while (current) {\n    map.get(current).next = map.get(current.next) || null;\n    map.get(current).random = map.get(current.random) || null;\n    current = current.next;\n  }\n  return map.get(head);\n}`,
              explanation: "Line 5-7: First pass — create clone for each node.\nLine 10-13: Second pass — set next and random using map."
            },
            {
              name: "Optimal (Interleaving — O(1) Space)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function copyRandomList(head) {\n  if (!head) return null;\n  let current = head;\n  while (current) {\n    const clone = { val: current.val, next: current.next, random: null };\n    current.next = clone;\n    current = clone.next;\n  }\n  current = head;\n  while (current) {\n    if (current.random) current.next.random = current.random.next;\n    current = current.next.next;\n  }\n  const newHead = head.next;\n  current = head;\n  while (current) {\n    const clone = current.next;\n    current.next = clone.next;\n    clone.next = clone.next ? clone.next.next : null;\n    current = current.next;\n  }\n  return newHead;\n}`,
              explanation: "Lines 3-7: Interleave clones — A→A'→B→B'→C→C'.\nLines 10-12: Set random pointers — clone.random = original.random.next.\nLines 16-20: Separate into two lists.\nO(1) extra space."
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
        { question: "How does Largest Rectangle in Histogram use a stack?", answer: "Use a monotonic increasing stack storing indices. When a bar shorter than stack top is encountered, pop and calculate the rectangle with the popped bar as the shortest. Width = current index - stack top - 1 (or current index if stack is empty). This works because each bar stays on the stack until a shorter bar is found, at which point we know its maximum extent. Time O(n) — each bar pushed/popped once. Append a 0-height bar at the end to flush remaining bars.", difficulty: "advanced", type: "concept" },
        { question: "How does Sliding Window Maximum use a deque?", answer: "Use a monotonic decreasing deque storing indices. For each new element: (1) remove indices outside the window from the front, (2) remove indices of elements smaller than current from the back (they can never be the max), (3) push current index. The front of the deque is always the maximum in the current window. Time O(n) — each index is added and removed at most once from each end. This is more efficient than using a heap which would be O(n log k).", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Largest Rectangle in Histogram",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function largestRectangleArea(heights) {\n  let maxArea = 0;\n  for (let i = 0; i < heights.length; i++) {\n    let minHeight = heights[i];\n    for (let j = i; j < heights.length; j++) {\n      minHeight = Math.min(minHeight, heights[j]);\n      maxArea = Math.max(maxArea, minHeight * (j - i + 1));\n    }\n  }\n  return maxArea;\n}`,
              explanation: "For each starting bar, extend right while tracking min height."
            },
            {
              name: "Optimal (Monotonic Stack)",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function largestRectangleArea(heights) {\n  const stack = [];\n  let maxArea = 0;\n  heights.push(0);\n  for (let i = 0; i < heights.length; i++) {\n    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {\n      const h = heights[stack.pop()];\n      const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;\n      maxArea = Math.max(maxArea, h * w);\n    }\n    stack.push(i);\n  }\n  heights.pop();\n  return maxArea;\n}`,
              explanation: "Line 4: Append 0 to flush all remaining bars.\nLine 6: Pop bars taller than current.\nLine 7: Popped bar's height.\nLine 8: Width extends from stack top+1 to current index.\nLine 9: Update max area.\nLine 11: Push current index.\nEach bar pushed/popped once → O(n)."
            }
          ]
        },
        {
          question: "Sliding Window Maximum",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n × k)", space: "O(1)" },
              code: `function maxSlidingWindow(nums, k) {\n  const result = [];\n  for (let i = 0; i <= nums.length - k; i++) {\n    let max = nums[i];\n    for (let j = i + 1; j < i + k; j++) max = Math.max(max, nums[j]);\n    result.push(max);\n  }\n  return result;\n}`,
              explanation: "For each window position, find max in O(k). Total O(n*k)."
            },
            {
              name: "Optimal (Monotonic Deque)",
              complexity: { time: "O(n)", space: "O(k)" },
              code: `function maxSlidingWindow(nums, k) {\n  const deque = [], result = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (deque.length > 0 && deque[0] < i - k + 1) deque.shift();\n    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) deque.pop();\n    deque.push(i);\n    if (i >= k - 1) result.push(nums[deque[0]]);\n  }\n  return result;\n}`,
              explanation: "Line 4: Remove indices outside current window from front.\nLine 5: Remove smaller elements from back (can never be max).\nLine 6: Add current index.\nLine 7: Window is full — front of deque is the max.\nEach index added/removed at most once → O(n)."
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
        { question: "How do you serialize and deserialize a binary tree?", answer: "Serialization converts a tree to a string; deserialization reconstructs it. BFS approach: level-order traversal, using 'null' for missing children. Preorder DFS is often simpler: serialize as 'val,left,right' with 'N' for null nodes. For deserialization, use a queue/index to consume values in the same order. The null markers are essential — without them, the tree structure is ambiguous. Time O(n) for both operations. JSON is not ideal since it doesn't preserve tree structure efficiently.", difficulty: "advanced", type: "concept" },
        { question: "What is the Binary Tree Maximum Path Sum problem?", answer: "Find the maximum sum path between any two nodes (not necessarily root-to-leaf). At each node, the maximum path through it = node.val + maxGain(left) + maxGain(right), where maxGain is the maximum sum path going down from that child (clamped to 0 to exclude negative paths). Update global max at each node. Return maxGain = node.val + max(left, right) (can only go one direction upward). This is a post-order DFS problem. Time O(n).", difficulty: "advanced", type: "concept" },
        { question: "How do you construct a binary tree from preorder and inorder traversal?", answer: "Preorder's first element is the root. Find this root in inorder — elements to its left form the left subtree, elements to its right form the right subtree. Use a hashmap for O(1) inorder index lookups. Recursively build left and right subtrees using the corresponding portions of both arrays. Preorder tells us the root at each level; inorder tells us the left/right split. Time O(n), space O(n). This works uniquely only with both traversals; one alone is ambiguous.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Serialize and Deserialize Binary Tree",
          difficulty: "hard",
          approaches: [
            {
              name: "Preorder DFS",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function serialize(root) {\n  if (!root) return 'N';\n  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);\n}\nfunction deserialize(data) {\n  const values = data.split(',');\n  let i = 0;\n  function build() {\n    if (values[i] === 'N') { i++; return null; }\n    const node = { val: parseInt(values[i++]), left: null, right: null };\n    node.left = build();\n    node.right = build();\n    return node;\n  }\n  return build();\n}`,
              explanation: "Serialize: preorder — root, left, right. 'N' for null.\nDeserialize: consume values in same preorder order.\nLine 9: 'N' means null node.\nLine 10: Create node from current value.\nLine 11-12: Recursively build left then right."
            }
          ]
        },
        {
          question: "Binary Tree Maximum Path Sum",
          difficulty: "hard",
          approaches: [
            {
              name: "DFS",
              complexity: { time: "O(n)", space: "O(h)" },
              code: `function maxPathSum(root) {\n  let maxSum = -Infinity;\n  function maxGain(node) {\n    if (!node) return 0;\n    const left = Math.max(0, maxGain(node.left));\n    const right = Math.max(0, maxGain(node.right));\n    maxSum = Math.max(maxSum, node.val + left + right);\n    return node.val + Math.max(left, right);\n  }\n  maxGain(root);\n  return maxSum;\n}`,
              explanation: "Line 5-6: Max gain from each subtree (0 if negative — don't include).\nLine 7: Path through this node = val + left + right. Update global max.\nLine 8: Return max gain going one direction (for parent's calculation)."
            }
          ]
        },
        {
          question: "Construct Binary Tree from Preorder and Inorder",
          difficulty: "hard",
          approaches: [
            {
              name: "Recursive with HashMap",
              complexity: { time: "O(n)", space: "O(n)" },
              code: `function buildTree(preorder, inorder) {\n  const map = new Map();\n  inorder.forEach((val, i) => map.set(val, i));\n  let preIdx = 0;\n  function build(inStart, inEnd) {\n    if (inStart > inEnd) return null;\n    const rootVal = preorder[preIdx++];\n    const node = { val: rootVal, left: null, right: null };\n    const inIdx = map.get(rootVal);\n    node.left = build(inStart, inIdx - 1);\n    node.right = build(inIdx + 1, inEnd);\n    return node;\n  }\n  return build(0, inorder.length - 1);\n}`,
              explanation: "Line 2-3: Map inorder values to indices for O(1) lookup.\nLine 7: Next preorder value is the root.\nLine 9: Find root position in inorder.\nLine 10: Left subtree = inorder elements before root.\nLine 11: Right subtree = inorder elements after root."
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
        { question: "How does Word Ladder use BFS?", answer: "Model the problem as an unweighted graph where each word is a node and edges connect words differing by one letter. BFS finds the shortest transformation sequence. Optimization: instead of checking all word pairs O(n²), for each word generate all possible one-letter variants and check if they're in the word list using a set. Time O(n * m * 26) where n is word list size and m is word length. Bidirectional BFS can further improve performance.", difficulty: "advanced", type: "concept" },
        { question: "What is the Alien Dictionary problem?", answer: "Given a sorted list of alien words, determine the character ordering. Compare adjacent words to find ordering rules: the first differing character gives an edge in a directed graph. Then perform topological sort on this graph. If there's a cycle, no valid ordering exists. Edge case: if a longer word appears before its prefix, the input is invalid. Time O(C) where C is total characters across all words. This combines string comparison with graph topological sort.", difficulty: "advanced", type: "concept" },
        { question: "What is Dijkstra's algorithm and when does it fail?", answer: "Dijkstra finds shortest paths from a source in a weighted graph with non-negative edges. Use a min-heap: extract node with smallest distance, relax all its edges. If shorter path found, update distance and add to heap. Time O((V+E) log V) with a binary heap. It fails with negative edge weights because it assumes once a node is processed, its shortest distance is final. For negative edges, use Bellman-Ford O(V*E). For shortest path in unweighted graphs, simple BFS suffices.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Word Ladder",
          difficulty: "hard",
          approaches: [
            {
              name: "BFS",
              complexity: { time: "O(n × m × 26)", space: "O(n × m)" },
              code: `function ladderLength(beginWord, endWord, wordList) {\n  const wordSet = new Set(wordList);\n  if (!wordSet.has(endWord)) return 0;\n  const queue = [[beginWord, 1]];\n  const visited = new Set([beginWord]);\n  while (queue.length > 0) {\n    const [word, steps] = queue.shift();\n    for (let i = 0; i < word.length; i++) {\n      for (let c = 97; c <= 122; c++) {\n        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);\n        if (newWord === endWord) return steps + 1;\n        if (wordSet.has(newWord) && !visited.has(newWord)) {\n          visited.add(newWord);\n          queue.push([newWord, steps + 1]);\n        }\n      }\n    }\n  }\n  return 0;\n}`,
              explanation: "Line 2: Convert word list to set for O(1) lookup.\nLine 4: BFS queue with word and step count.\nLine 8-16: For each position, try all 26 letters.\nLine 11: If we reach endWord, return steps.\nLine 12-14: If valid word and unvisited, add to queue."
            }
          ]
        },
        {
          question: "Alien Dictionary",
          difficulty: "hard",
          approaches: [
            {
              name: "Topological Sort (BFS — Kahn's)",
              complexity: { time: "O(C)", space: "O(V + E)" },
              code: `function alienOrder(words) {\n  const graph = new Map();\n  const inDegree = new Map();\n  for (const word of words) {\n    for (const c of word) {\n      if (!graph.has(c)) { graph.set(c, new Set()); inDegree.set(c, 0); }\n    }\n  }\n  for (let i = 0; i < words.length - 1; i++) {\n    const w1 = words[i], w2 = words[i + 1];\n    if (w1.length > w2.length && w1.startsWith(w2)) return "";\n    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {\n      if (w1[j] !== w2[j]) {\n        if (!graph.get(w1[j]).has(w2[j])) {\n          graph.get(w1[j]).add(w2[j]);\n          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);\n        }\n        break;\n      }\n    }\n  }\n  const queue = [];\n  for (const [c, deg] of inDegree) { if (deg === 0) queue.push(c); }\n  let result = "";\n  while (queue.length > 0) {\n    const c = queue.shift();\n    result += c;\n    for (const next of graph.get(c)) {\n      inDegree.set(next, inDegree.get(next) - 1);\n      if (inDegree.get(next) === 0) queue.push(next);\n    }\n  }\n  return result.length === graph.size ? result : "";\n}`,
              explanation: "Line 4-7: Initialize all characters.\nLine 9-20: Compare adjacent words to build ordering edges.\nLine 11: Invalid if longer word before its prefix.\nLine 13-17: First differing char gives an ordering rule.\nLine 22-31: Kahn's BFS topological sort.\nLine 33: If not all chars in result → cycle → invalid."
            }
          ]
        },
        {
          question: "Shortest Path in Binary Matrix",
          difficulty: "medium",
          approaches: [
            {
              name: "BFS",
              complexity: { time: "O(n²)", space: "O(n²)" },
              code: `function shortestPathBinaryMatrix(grid) {\n  const n = grid.length;\n  if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;\n  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];\n  const queue = [[0, 0, 1]];\n  grid[0][0] = 1;\n  while (queue.length > 0) {\n    const [r, c, dist] = queue.shift();\n    if (r === n-1 && c === n-1) return dist;\n    for (const [dr, dc] of dirs) {\n      const nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {\n        grid[nr][nc] = 1;\n        queue.push([nr, nc, dist + 1]);\n      }\n    }\n  }\n  return -1;\n}`,
              explanation: "Line 4: 8 directions (including diagonals).\nLine 5: BFS from (0,0) with distance 1.\nLine 9: Reached destination — return distance.\nLine 12-14: If neighbor is clear, mark visited and enqueue.\nBFS guarantees shortest path in unweighted grid."
            }
          ]
        }
      ]
    },
    {
      id: "recursion-backtracking", title: "Recursion & Backtracking", icon: "RB",
      conceptual: [
        { question: "How does the N-Queens problem use backtracking?", answer: "Place queens row by row. For each row, try each column. Check if the position is safe (no queen in same column, same diagonal, or same anti-diagonal). If safe, place the queen and recurse to the next row. If recursion fails, remove the queen and try the next column. Use sets to track occupied columns, diagonals (row-col), and anti-diagonals (row+col) for O(1) safety checks. Time O(n!), but pruning makes it much faster in practice.", difficulty: "advanced", type: "concept" },
        { question: "How does the Sudoku solver use backtracking?", answer: "Find the first empty cell. Try digits 1-9. For each digit, check if it's valid (not in same row, column, or 3x3 box). If valid, place it and recurse to the next empty cell. If recursion fails, remove the digit and try the next. If all digits fail, backtrack. Use sets or boolean arrays for O(1) validity checks. Time worst case O(9^(n*n)) but constraints (row/col/box uniqueness) prune heavily. Most puzzles solve in milliseconds.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "N-Queens",
          difficulty: "hard",
          approaches: [
            {
              name: "Backtracking",
              complexity: { time: "O(n!)", space: "O(n²)" },
              code: `function solveNQueens(n) {\n  const result = [];\n  const cols = new Set(), diags = new Set(), antiDiags = new Set();\n  const board = Array.from({ length: n }, () => '.'.repeat(n));\n  function backtrack(row) {\n    if (row === n) { result.push([...board]); return; }\n    for (let col = 0; col < n; col++) {\n      if (cols.has(col) || diags.has(row - col) || antiDiags.has(row + col)) continue;\n      cols.add(col); diags.add(row - col); antiDiags.add(row + col);\n      board[row] = board[row].slice(0, col) + 'Q' + board[row].slice(col + 1);\n      backtrack(row + 1);\n      cols.delete(col); diags.delete(row - col); antiDiags.delete(row + col);\n      board[row] = '.'.repeat(n);\n    }\n  }\n  backtrack(0);\n  return result;\n}`,
              explanation: "Line 3: Track occupied columns, diagonals, anti-diagonals.\nLine 6: All rows filled → valid solution.\nLine 8: Skip unsafe positions.\nLine 9: Place queen — mark occupied.\nLine 11: Recurse to next row.\nLine 12-13: Remove queen — backtrack."
            }
          ]
        },
        {
          question: "Sudoku Solver",
          difficulty: "hard",
          approaches: [
            {
              name: "Backtracking",
              complexity: { time: "O(9^empty_cells)", space: "O(1)" },
              code: `function solveSudoku(board) {\n  function isValid(board, row, col, num) {\n    const char = String(num);\n    for (let i = 0; i < 9; i++) {\n      if (board[row][i] === char) return false;\n      if (board[i][col] === char) return false;\n      const r = 3 * Math.floor(row / 3) + Math.floor(i / 3);\n      const c = 3 * Math.floor(col / 3) + (i % 3);\n      if (board[r][c] === char) return false;\n    }\n    return true;\n  }\n  function solve() {\n    for (let r = 0; r < 9; r++) {\n      for (let c = 0; c < 9; c++) {\n        if (board[r][c] === '.') {\n          for (let num = 1; num <= 9; num++) {\n            if (isValid(board, r, c, num)) {\n              board[r][c] = String(num);\n              if (solve()) return true;\n              board[r][c] = '.';\n            }\n          }\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n  solve();\n}`,
              explanation: "Line 2-11: Check row, column, and 3x3 box for validity.\nLine 14-25: Find first empty cell, try 1-9.\nLine 19: Place digit.\nLine 20: Recurse — if successful, keep it.\nLine 21: Otherwise backtrack.\nLine 24: No valid digit → backtrack.\nLine 28: All cells filled → solved."
            }
          ]
        }
      ]
    },
    {
      id: "dynamic-programming", title: "Dynamic Programming", icon: "DP",
      conceptual: [
        { question: "How does Edit Distance (Levenshtein) DP work?", answer: "dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]. If chars match: dp[i][j] = dp[i-1][j-1]. If not: dp[i][j] = 1 + min(dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (replace)). Base: dp[i][0] = i (delete all), dp[0][j] = j (insert all). Time O(n*m), space O(n*m) or O(min(n,m)). Used in spell checkers, DNA sequence alignment, and diff algorithms.", difficulty: "advanced", type: "concept" },
        { question: "How does LIS (Longest Increasing Subsequence) achieve O(n log n)?", answer: "Maintain an array 'tails' where tails[i] is the smallest tail element for increasing subsequences of length i+1. For each element: binary search for its position in tails. If larger than all, append (extends longest). Otherwise, replace the first element >= it (maintains optimal tails). The length of tails is the LIS length. Time O(n log n) due to binary search per element. Note: tails doesn't contain the actual LIS, just tracks the optimal tail elements.", difficulty: "advanced", type: "concept" },
        { question: "What is the Burst Balloons DP formulation?", answer: "This is an interval DP problem. dp[i][j] = max coins from bursting balloons between i and j (exclusive boundaries). For each balloon k between i and j chosen to burst LAST, coins = nums[i]*nums[k]*nums[j] + dp[i][k] + dp[k][j]. Choosing k as the last balloon to burst means boundaries i and j are still intact. Iterate by interval length from small to large. Time O(n³), space O(n²). The key insight is thinking about which balloon bursts last rather than first.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Edit Distance",
          difficulty: "hard",
          approaches: [
            {
              name: "Recursive",
              complexity: { time: "O(3^(n+m))", space: "O(n + m)" },
              code: `function minDistance(word1, word2) {\n  function dp(i, j) {\n    if (i === 0) return j;\n    if (j === 0) return i;\n    if (word1[i-1] === word2[j-1]) return dp(i-1, j-1);\n    return 1 + Math.min(dp(i-1, j), dp(i, j-1), dp(i-1, j-1));\n  }\n  return dp(word1.length, word2.length);\n}`,
              explanation: "Line 3-4: Base cases — convert empty to non-empty.\nLine 5: Chars match — no operation needed.\nLine 6: Min of delete, insert, replace."
            },
            {
              name: "Optimal (DP Table)",
              complexity: { time: "O(n × m)", space: "O(n × m)" },
              code: `function minDistance(word1, word2) {\n  const n = word1.length, m = word2.length;\n  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));\n  for (let i = 0; i <= n; i++) dp[i][0] = i;\n  for (let j = 0; j <= m; j++) dp[0][j] = j;\n  for (let i = 1; i <= n; i++) {\n    for (let j = 1; j <= m; j++) {\n      if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];\n      else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);\n    }\n  }\n  return dp[n][m];\n}`,
              explanation: "Line 4-5: Base cases.\nLine 8: Characters match — take diagonal.\nLine 9: 1 + min of three operations."
            }
          ]
        },
        {
          question: "Longest Increasing Subsequence",
          difficulty: "medium",
          approaches: [
            {
              name: "DP O(n²)",
              complexity: { time: "O(n²)", space: "O(n)" },
              code: `function lengthOfLIS(nums) {\n  const dp = new Array(nums.length).fill(1);\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);\n    }\n  }\n  return Math.max(...dp);\n}`,
              explanation: "dp[i] = length of LIS ending at index i.\nLine 5: If nums[j] < nums[i], extend LIS ending at j."
            },
            {
              name: "Optimal (Binary Search)",
              complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function lengthOfLIS(nums) {\n  const tails = [];\n  for (const num of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) {\n      const mid = Math.floor((lo + hi) / 2);\n      if (tails[mid] < num) lo = mid + 1;\n      else hi = mid;\n    }\n    tails[lo] = num;\n  }\n  return tails.length;\n}`,
              explanation: "Line 2: tails[i] = smallest ending element for LIS of length i+1.\nLine 4-9: Binary search for position.\nLine 10: Replace or append.\nLine 12: Length of tails = LIS length."
            }
          ]
        },
        {
          question: "Burst Balloons",
          difficulty: "hard",
          approaches: [
            {
              name: "Interval DP",
              complexity: { time: "O(n³)", space: "O(n²)" },
              code: `function maxCoins(nums) {\n  nums = [1, ...nums, 1];\n  const n = nums.length;\n  const dp = Array.from({ length: n }, () => new Array(n).fill(0));\n  for (let len = 2; len < n; len++) {\n    for (let i = 0; i + len < n; i++) {\n      const j = i + len;\n      for (let k = i + 1; k < j; k++) {\n        dp[i][j] = Math.max(dp[i][j],\n          nums[i] * nums[k] * nums[j] + dp[i][k] + dp[k][j]);\n      }\n    }\n  }\n  return dp[0][n - 1];\n}`,
              explanation: "Line 2: Add boundary 1s.\nLine 5: Iterate by interval length.\nLine 8: k is the LAST balloon to burst in range (i,j).\nLine 9-10: Coins from k being last + left subproblem + right subproblem.\nLine 14: Answer for full range."
            }
          ]
        }
      ]
    },
    {
      id: "sorting-searching", title: "Sorting & Searching", icon: "SS",
      conceptual: [
        { question: "How does finding the median of two sorted arrays work with binary search?", answer: "Binary search on the smaller array for partition point i. The other partition j = (n+m+1)/2 - i. Valid when maxLeft1 ≤ minRight2 and maxLeft2 ≤ minRight1. If maxLeft1 > minRight2, move left. If maxLeft2 > minRight1, move right. Median from the four boundary values. O(log(min(n,m))). The key insight: we're searching for the correct number of elements from the smaller array to include in the left half.", difficulty: "advanced", type: "concept" },
        { question: "How does Count of Smaller Numbers After Self work?", answer: "For each element, count elements to its right that are smaller. Brute force is O(n²). Merge sort approach: during merging, when a right element is placed before a left element, it means the right element is smaller — increment count for all remaining left elements. This piggybacks on merge sort's comparison pattern. Alternative: use a BST or BIT (Binary Indexed Tree). Merge sort approach: O(n log n) time, O(n) space.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Count of Smaller Numbers After Self",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(n)" },
              code: `function countSmaller(nums) {\n  const result = new Array(nums.length).fill(0);\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[j] < nums[i]) result[i]++;\n    }\n  }\n  return result;\n}`,
              explanation: "For each element, count smaller elements to its right. O(n²)."
            },
            {
              name: "Optimal (Merge Sort)",
              complexity: { time: "O(n log n)", space: "O(n)" },
              code: `function countSmaller(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(0);\n  const indices = nums.map((_, i) => i);\n  function mergeSort(start, end) {\n    if (end - start <= 1) return;\n    const mid = Math.floor((start + end) / 2);\n    mergeSort(start, mid);\n    mergeSort(mid, end);\n    const temp = [];\n    let left = start, right = mid, rightCount = 0;\n    while (left < mid && right < end) {\n      if (nums[indices[right]] < nums[indices[left]]) {\n        rightCount++;\n        temp.push(indices[right++]);\n      } else {\n        result[indices[left]] += rightCount;\n        temp.push(indices[left++]);\n      }\n    }\n    while (left < mid) {\n      result[indices[left]] += rightCount;\n      temp.push(indices[left++]);\n    }\n    while (right < end) temp.push(indices[right++]);\n    for (let i = start; i < end; i++) indices[i] = temp[i - start];\n  }\n  mergeSort(0, n);\n  return result;\n}`,
              explanation: "Line 4: Track original indices through sorting.\nLine 13: Right element smaller → increment counter.\nLine 17: Left element placed → it has rightCount smaller elements from right side.\nLine 21-22: Remaining left elements also get rightCount.\nPiggybacks on merge sort comparisons — O(n log n)."
            }
          ]
        }
      ]
    },
    {
      id: "greedy", title: "Greedy", icon: "Gd",
      conceptual: [
        { question: "How does Task Scheduler use greedy?", answer: "Schedule the most frequent task first. In each cooling interval of n+1 slots, schedule the n+1 most frequent tasks. The minimum time depends on the most frequent task's count: (maxFreq - 1) * (n + 1) + countOfMaxFreqTasks. If total tasks exceed this formula, the answer is just the total task count (no idle time needed). Greedy: always execute the most frequent available task to minimize idle slots.", difficulty: "advanced", type: "concept" },
        { question: "How do Non-overlapping Intervals use greedy?", answer: "Sort intervals by end time. Greedily select intervals that start after the previous one ends. The minimum removals = total intervals - maximum non-overlapping intervals. Sorting by end time is critical — it maximizes the room for remaining intervals. This is equivalent to the activity selection problem. Time O(n log n). Alternatively, sort by start time and when overlap is found, keep the interval with smaller end time.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Task Scheduler",
          difficulty: "medium",
          approaches: [
            {
              name: "Greedy (Math)",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function leastInterval(tasks, n) {\n  const freq = new Array(26).fill(0);\n  for (const task of tasks) freq[task.charCodeAt(0) - 65]++;\n  const maxFreq = Math.max(...freq);\n  const maxCount = freq.filter(f => f === maxFreq).length;\n  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);\n}`,
              explanation: "Line 2-3: Count task frequencies.\nLine 4: Most frequent task count.\nLine 5: How many tasks share the max frequency.\nLine 6: Formula: (maxFreq-1) intervals of (n+1) width + final batch. Take max with total tasks (for when no idle needed)."
            }
          ]
        },
        {
          question: "Non-overlapping Intervals",
          difficulty: "medium",
          approaches: [
            {
              name: "Greedy (Sort by End)",
              complexity: { time: "O(n log n)", space: "O(1)" },
              code: `function eraseOverlapIntervals(intervals) {\n  intervals.sort((a, b) => a[1] - b[1]);\n  let end = intervals[0][1], removals = 0;\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < end) {\n      removals++;\n    } else {\n      end = intervals[i][1];\n    }\n  }\n  return removals;\n}`,
              explanation: "Line 2: Sort by end time.\nLine 5: Overlap detected — remove current (it ends later).\nLine 7-8: No overlap — update end.\nLine 11: Return total removals."
            }
          ]
        }
      ]
    },
    {
      id: "hashing", title: "Hashing", icon: "Ha",
      conceptual: [
        { question: "How does LRU Cache combine a hash map and doubly linked list?", answer: "HashMap provides O(1) key-to-node lookup. Doubly linked list maintains access order — most recently used at head, least recently used at tail. On get: move node to head. On put: if key exists, update and move to head. If new, add to head. If capacity exceeded, remove tail node and its hash map entry. All operations are O(1). This is one of the most commonly asked design problems in product-based interviews.", difficulty: "advanced", type: "concept" },
        { question: "How does Max Points on a Line use hashing?", answer: "For each point i, calculate slopes to all other points j. Points on the same line through i have the same slope. Use a hash map to count points per slope. The max count + 1 (for point i itself) gives the max collinear points through i. Handle edge cases: duplicate points, vertical lines (infinite slope), and floating-point precision (use reduced fractions a/b as key instead of decimals). Time O(n²), space O(n).", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "LRU Cache",
          difficulty: "hard",
          approaches: [
            {
              name: "HashMap + Doubly Linked List",
              complexity: { time: "O(1) all ops", space: "O(capacity)" },
              code: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n    this.head = { key: 0, val: 0 };\n    this.tail = { key: 0, val: 0 };\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n  _remove(node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n  _addToHead(node) {\n    node.next = this.head.next;\n    node.prev = this.head;\n    this.head.next.prev = node;\n    this.head.next = node;\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const node = this.map.get(key);\n    this._remove(node);\n    this._addToHead(node);\n    return node.val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) {\n      const node = this.map.get(key);\n      node.val = value;\n      this._remove(node);\n      this._addToHead(node);\n    } else {\n      const node = { key, val: value };\n      this.map.set(key, node);\n      this._addToHead(node);\n      if (this.map.size > this.capacity) {\n        const lru = this.tail.prev;\n        this._remove(lru);\n        this.map.delete(lru.key);\n      }\n    }\n  }\n}`,
              explanation: "Line 5-8: Dummy head/tail for easier operations.\nLine 10-12: Remove node from its position.\nLine 14-18: Add node right after head (most recent).\nLine 20-25: Get: move to head, return value.\nLine 27-41: Put: update existing or create new. Evict LRU (tail.prev) if over capacity."
            }
          ]
        }
      ]
    },
    {
      id: "bit-manipulation", title: "Bit Manipulation", icon: "Bi",
      conceptual: [
        { question: "How does Maximum XOR of Two Numbers use a Trie?", answer: "Build a binary Trie where each number is inserted bit by bit from MSB to LSB. For each number, traverse the Trie greedily choosing the opposite bit at each level (to maximize XOR). If the opposite bit exists, take it (this bit will be 1 in XOR); otherwise take the same bit. This gives O(n * 32) = O(n) time. Alternative: use bit manipulation with a set — for each bit position from high to low, check if the current best XOR can have this bit set by checking all prefix pairs.", difficulty: "advanced", type: "concept" },
        { question: "How do you divide two integers without using multiplication, division, or mod?", answer: "Use bit shifting (which doubles/halves). Find the largest (divisor << shift) that fits in the dividend. Subtract it and add (1 << shift) to the quotient. Repeat until dividend < divisor. Handle edge cases: negative numbers (track sign separately), overflow (INT_MIN / -1 overflows INT_MAX). Time O(log²n) since for each subtraction we do log n shifts. This simulates long division in binary.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Maximum XOR of Two Numbers in Array",
          difficulty: "hard",
          approaches: [
            {
              name: "Brute Force",
              complexity: { time: "O(n²)", space: "O(1)" },
              code: `function findMaximumXOR(nums) {\n  let max = 0;\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      max = Math.max(max, nums[i] ^ nums[j]);\n    }\n  }\n  return max;\n}`,
              explanation: "Check all pairs. O(n²)."
            },
            {
              name: "Optimal (Bit-by-Bit with Set)",
              complexity: { time: "O(n × 32)", space: "O(n)" },
              code: `function findMaximumXOR(nums) {\n  let maxXor = 0, mask = 0;\n  for (let i = 31; i >= 0; i--) {\n    mask |= (1 << i);\n    const prefixes = new Set();\n    for (const num of nums) prefixes.add(num & mask);\n    const candidate = maxXor | (1 << i);\n    for (const prefix of prefixes) {\n      if (prefixes.has(prefix ^ candidate)) {\n        maxXor = candidate;\n        break;\n      }\n    }\n  }\n  return maxXor;\n}`,
              explanation: "Line 3: Build answer bit by bit from MSB.\nLine 4: Mask keeps only bits we've decided.\nLine 6: Get all prefixes up to current bit.\nLine 7: Try setting current bit in answer.\nLine 8-11: If two prefixes XOR to candidate, it's achievable.\nO(32n) = O(n)."
            }
          ]
        }
      ]
    },
    {
      id: "heaps", title: "Heaps", icon: "Hp",
      conceptual: [
        { question: "How does Find Median from Data Stream use two heaps?", answer: "Use a max-heap for the lower half and a min-heap for the upper half. Balance sizes: max-heap can have at most one more element. On insert: add to max-heap, then move max-heap's top to min-heap if needed to maintain the ordering (max-heap's top ≤ min-heap's top) and balance. Median: if sizes equal, average of both tops; otherwise, max-heap's top. All operations O(log n). This gives O(1) median query vs O(n) if we sorted each time.", difficulty: "advanced", type: "concept" },
        { question: "How does Reorganize String use a max-heap?", answer: "Count character frequencies. Use a max-heap to always place the most frequent character. After placing a character, decrease its count and save it. Place the next most frequent character, then re-add the saved character (with decreased count) back to the heap. This ensures no two adjacent characters are the same. If the most frequent character count > ceil(n/2), reorganization is impossible. Time O(n log k) where k is distinct characters.", difficulty: "medium", type: "concept" },
      ],
      coding: [
        {
          question: "Find Median from Data Stream",
          difficulty: "hard",
          approaches: [
            {
              name: "Two Heaps (Simulated with Sorted Insert)",
              complexity: { time: "O(log n) per add, O(1) median", space: "O(n)" },
              code: `class MedianFinder {\n  constructor() {\n    this.low = [];\n    this.high = [];\n  }\n  addNum(num) {\n    this._pushMax(this.low, num);\n    this._pushMin(this.high, this._popMax(this.low));\n    if (this.high.length > this.low.length) {\n      this._pushMax(this.low, this._popMin(this.high));\n    }\n  }\n  findMedian() {\n    if (this.low.length > this.high.length) return this.low[0];\n    return (this.low[0] + this.high[0]) / 2;\n  }\n  _pushMax(heap, val) {\n    heap.push(val);\n    let i = heap.length - 1;\n    while (i > 0) {\n      const p = Math.floor((i - 1) / 2);\n      if (heap[p] >= heap[i]) break;\n      [heap[p], heap[i]] = [heap[i], heap[p]];\n      i = p;\n    }\n  }\n  _popMax(heap) {\n    const max = heap[0];\n    heap[0] = heap[heap.length - 1];\n    heap.pop();\n    let i = 0;\n    while (true) {\n      let largest = i;\n      const l = 2*i+1, r = 2*i+2;\n      if (l < heap.length && heap[l] > heap[largest]) largest = l;\n      if (r < heap.length && heap[r] > heap[largest]) largest = r;\n      if (largest === i) break;\n      [heap[i], heap[largest]] = [heap[largest], heap[i]];\n      i = largest;\n    }\n    return max;\n  }\n  _pushMin(heap, val) {\n    heap.push(val);\n    let i = heap.length - 1;\n    while (i > 0) {\n      const p = Math.floor((i - 1) / 2);\n      if (heap[p] <= heap[i]) break;\n      [heap[p], heap[i]] = [heap[i], heap[p]];\n      i = p;\n    }\n  }\n  _popMin(heap) {\n    const min = heap[0];\n    heap[0] = heap[heap.length - 1];\n    heap.pop();\n    let i = 0;\n    while (true) {\n      let smallest = i;\n      const l = 2*i+1, r = 2*i+2;\n      if (l < heap.length && heap[l] < heap[smallest]) smallest = l;\n      if (r < heap.length && heap[r] < heap[smallest]) smallest = r;\n      if (smallest === i) break;\n      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];\n      i = smallest;\n    }\n    return min;\n  }\n}`,
              explanation: "low = max-heap (lower half), high = min-heap (upper half).\naddNum: add to low, balance to high, rebalance sizes.\nfindMedian: if low has more, its top; otherwise average of both tops.\nCustom heap implementations since JS lacks built-in."
            }
          ]
        }
      ]
    },
    {
      id: "tries", title: "Tries", icon: "Ti",
      conceptual: [
        { question: "How does Word Search II combine Trie and backtracking?", answer: "Build a Trie from the word dictionary. DFS on the grid: at each cell, follow the Trie path. If a Trie node has no matching child, prune (don't continue). If a node marks the end of a word, add to results. Mark cells as visited during DFS, unmark on backtrack. This is much faster than running word search for each word separately. Remove found words from Trie to avoid duplicates and further prune the search. Time O(m*n*4^L) worst case but heavily pruned.", difficulty: "advanced", type: "concept" },
        { question: "How would you design a search autocomplete system?", answer: "Use a Trie where each node stores the top-K sentences passing through it (precomputed during insert). On input, traverse the Trie following the prefix, then return stored suggestions. Update frequencies on new inputs. For real-time performance, limit DFS collection depth. For ranking, use a min-heap of size K at each node. Space trade-off: storing suggestions at each node uses more memory but gives O(p) query time where p is prefix length, vs O(p + total_chars) with DFS collection.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Design Search Autocomplete System",
          difficulty: "hard",
          approaches: [
            {
              name: "Trie with Frequency Tracking",
              complexity: { time: "O(p + m log m) per query", space: "O(total chars)" },
              code: `class AutocompleteSystem {\n  constructor(sentences, times) {\n    this.root = {};\n    this.current = '';\n    for (let i = 0; i < sentences.length; i++) {\n      this.addSentence(sentences[i], times[i]);\n    }\n  }\n  addSentence(sentence, count) {\n    let node = this.root;\n    for (const c of sentence) {\n      if (!node[c]) node[c] = {};\n      node = node[c];\n    }\n    node._count = (node._count || 0) + count;\n  }\n  input(c) {\n    if (c === '#') {\n      this.addSentence(this.current, 1);\n      this.current = '';\n      return [];\n    }\n    this.current += c;\n    let node = this.root;\n    for (const ch of this.current) {\n      if (!node[ch]) return [];\n      node = node[ch];\n    }\n    const results = [];\n    this.collect(node, this.current, results);\n    results.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));\n    return results.slice(0, 3).map(r => r[0]);\n  }\n  collect(node, prefix, results) {\n    if (node._count) results.push([prefix, node._count]);\n    for (const c in node) {\n      if (c !== '_count') this.collect(node[c], prefix + c, results);\n    }\n  }\n}`,
              explanation: "Line 9-15: Add sentence with frequency to Trie.\nLine 17-32: On input, follow prefix path, collect all completions.\nLine 31: Sort by frequency (desc) then alphabetically.\nLine 32: Return top 3.\nLine 34-38: DFS to collect all words from current node."
            }
          ]
        }
      ]
    },
    {
      id: "sliding-window", title: "Sliding Window", icon: "SW",
      conceptual: [
        { question: "How does Substring with Concatenation of All Words work?", answer: "Given a string and a list of equal-length words, find starting indices where a concatenation of all words exists as a substring. Use a sliding window of size totalWords*wordLength. For each possible starting offset (0 to wordLength-1), slide the window word-by-word. Maintain a frequency map of words in the window. Compare with the target frequency map. Time O(n * wordLength) where n is string length. The key insight is processing word-by-word instead of character-by-character.", difficulty: "advanced", type: "concept" },
        { question: "How does the variable-size sliding window template work?", answer: "Template: initialize left=0. For each right, expand window (add s[right] to state). While window is invalid, shrink (remove s[left], left++). Update answer. This template solves: longest substring with at most K distinct, minimum window substring, longest repeating character replacement, etc. The invariant is that the window always represents a valid (or candidate) state. Time O(n) since left and right each move at most n times total.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "Substring with Concatenation of All Words",
          difficulty: "hard",
          approaches: [
            {
              name: "Sliding Window (Word-by-Word)",
              complexity: { time: "O(n × w)", space: "O(m × w)" },
              code: `function findSubstring(s, words) {\n  if (words.length === 0) return [];\n  const wordLen = words[0].length;\n  const totalLen = wordLen * words.length;\n  const wordCount = {};\n  for (const w of words) wordCount[w] = (wordCount[w] || 0) + 1;\n  const result = [];\n  for (let offset = 0; offset < wordLen; offset++) {\n    let left = offset, count = 0;\n    const window = {};\n    for (let right = offset; right + wordLen <= s.length; right += wordLen) {\n      const word = s.slice(right, right + wordLen);\n      if (wordCount[word]) {\n        window[word] = (window[word] || 0) + 1;\n        count++;\n        while (window[word] > wordCount[word]) {\n          const lw = s.slice(left, left + wordLen);\n          window[lw]--;\n          count--;\n          left += wordLen;\n        }\n        if (count === words.length) result.push(left);\n      } else {\n        window = {};\n        count = 0;\n        left = right + wordLen;\n      }\n    }\n  }\n  return result;\n}`,
              explanation: "Line 8: Try each starting offset within word length.\nLine 11: Process word-by-word.\nLine 13-21: If valid word, add to window. Shrink if count exceeds target.\nLine 22: All words found — record start index.\nLine 23-26: Invalid word — reset window."
            }
          ]
        }
      ]
    },
    {
      id: "two-pointers", title: "Two Pointers", icon: "TP",
      conceptual: [
        { question: "How does 4Sum extend the 3Sum two-pointer approach?", answer: "Sort the array. Fix two elements with two nested loops (i, j). Use two pointers (left, right) on the remaining subarray to find pairs summing to target - nums[i] - nums[j]. Skip duplicates at all four levels. Time O(n³): two outer loops O(n²) × two-pointer O(n). This pattern generalizes to KSum: fix K-2 elements with nested loops, then use two pointers for the last pair. For K > 4, recursion is cleaner than nested loops.", difficulty: "advanced", type: "concept" },
        { question: "How is Trapping Rain Water solved with two pointers?", answer: "Two pointers from both ends with maxLeft and maxRight. Process the shorter side: if height[left] <= height[right], water at left = maxLeft - height[left], move left. Otherwise, water at right = maxRight - height[right], move right. This works because the shorter side determines the water level — the other side is guaranteed to have a bar at least as tall. Time O(n), space O(1). This is more space-efficient than the prefix array approach.", difficulty: "advanced", type: "concept" },
      ],
      coding: [
        {
          question: "4Sum",
          difficulty: "medium",
          approaches: [
            {
              name: "Sort + Two Pointers",
              complexity: { time: "O(n³)", space: "O(1)" },
              code: `function fourSum(nums, target) {\n  nums.sort((a, b) => a - b);\n  const result = [];\n  for (let i = 0; i < nums.length - 3; i++) {\n    if (i > 0 && nums[i] === nums[i-1]) continue;\n    for (let j = i + 1; j < nums.length - 2; j++) {\n      if (j > i + 1 && nums[j] === nums[j-1]) continue;\n      let left = j + 1, right = nums.length - 1;\n      while (left < right) {\n        const sum = nums[i] + nums[j] + nums[left] + nums[right];\n        if (sum === target) {\n          result.push([nums[i], nums[j], nums[left], nums[right]]);\n          while (left < right && nums[left] === nums[left+1]) left++;\n          while (left < right && nums[right] === nums[right-1]) right--;\n          left++; right--;\n        } else if (sum < target) left++;\n        else right--;\n      }\n    }\n  }\n  return result;\n}`,
              explanation: "Line 2: Sort for two-pointer approach.\nLine 4-5: Fix first element, skip duplicates.\nLine 6-7: Fix second element, skip duplicates.\nLine 8-17: Two pointers for remaining pair.\nLine 11-15: Found quadruplet — skip duplicates, move both.\nO(n³) — three nested iterations."
            }
          ]
        },
        {
          question: "Trapping Rain Water (Two Pointers)",
          difficulty: "hard",
          approaches: [
            {
              name: "Two Pointers",
              complexity: { time: "O(n)", space: "O(1)" },
              code: `function trap(height) {\n  let left = 0, right = height.length - 1;\n  let maxLeft = 0, maxRight = 0, water = 0;\n  while (left < right) {\n    if (height[left] <= height[right]) {\n      maxLeft = Math.max(maxLeft, height[left]);\n      water += maxLeft - height[left];\n      left++;\n    } else {\n      maxRight = Math.max(maxRight, height[right]);\n      water += maxRight - height[right];\n      right--;\n    }\n  }\n  return water;\n}`,
              explanation: "Line 5: Process shorter side — water level is bounded by it.\nLine 6: Update max from left.\nLine 7: Water = maxLeft - current height (guaranteed non-negative).\nLine 10-12: Same for right side.\nO(n) time, O(1) space — optimal."
            }
          ]
        }
      ]
    }
  ]
};
