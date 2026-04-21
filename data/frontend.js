export const frontendTopics = [
  {
    id: "javascript",
    title: "JavaScript Core",
    icon: "JS",
    questions: [
      {
        question: "How does the JavaScript event loop work? Explain with setTimeout, Promise, and microtask queue examples.",
        answer: "The event loop continuously checks the call stack and task queues. When the stack is empty, it first processes all microtasks (Promise callbacks, queueMicrotask), then picks one macrotask (setTimeout, setInterval, I/O). For example: console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4') outputs 1, 4, 3, 2. '3' comes before '2' because Promise.then callbacks go to the microtask queue which has higher priority than setTimeout's macrotask queue. In the Marketplace, understanding this was critical when coordinating Socket.io events with React state updates to avoid race conditions.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain closures with a practical use case from your work.",
        answer: "A closure is a function that retains access to its outer scope's variables even after the outer function has returned. The inner function 'closes over' those variables. In the Marketplace search UI, I used closures for the debounce function: function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }. The returned function closes over 'timer', so each call can clear the previous timeout. I also used closures in event handlers and useCallback to capture specific values like product IDs without re-creating functions.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is the difference between var, let, and const? Why does hoisting matter?",
        answer: "var is function-scoped and hoisted with initialization (undefined). let and const are block-scoped and hoisted but NOT initialized — accessing them before declaration throws a ReferenceError (Temporal Dead Zone). const additionally prevents reassignment of the binding (but not mutation of objects/arrays). Hoisting matters because var can cause subtle bugs: a variable used before its declaration silently returns undefined instead of throwing an error. In the Marketplace codebase, we enforced let/const via ESLint rules to avoid hoisting-related bugs. const is our default; we use let only when reassignment is genuinely needed.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How do Promises work internally? Explain Promise chaining vs async/await.",
        answer: "A Promise is a state machine with three states: pending, fulfilled, rejected. When created with new Promise((resolve, reject) => {...}), it starts pending. Calling resolve/reject transitions it and triggers queued .then/.catch handlers via the microtask queue. Promise chaining works because .then() returns a new Promise, so you can chain: fetch(url).then(res => res.json()).then(data => process(data)). async/await is syntactic sugar — an async function returns a Promise, and await pauses execution until the Promise resolves. I prefer async/await for readability but use Promise.all() for parallel operations, like in the Marketplace where we fetch product details and stock levels simultaneously.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is prototypal inheritance? How does it differ from classical OOP?",
        answer: "In JavaScript, objects can inherit directly from other objects through the prototype chain. Every object has a hidden [[Prototype]] link. When you access a property, JS walks up the chain until it finds it or hits null. Classical OOP (Java, C++) uses classes as blueprints to create instances — inheritance is defined at the class level. JavaScript's ES6 class syntax is syntactic sugar over prototypes — there are no real classes. Key difference: you can modify prototypes at runtime, adding methods to all instances. For example, Array.prototype.myMethod = ... would add to every array. Understanding this helps debug issues like 'why does this method exist on my object' when using third-party libraries.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain 'this' binding in different contexts — arrow function, method, constructor, bind/call/apply.",
        answer: "In a regular function, 'this' depends on HOW the function is called, not where it's defined. In a method call (obj.fn()), 'this' is obj. In a standalone call (fn()), 'this' is undefined in strict mode or window in sloppy mode. With new (constructor), 'this' is the newly created object. bind/call/apply explicitly set 'this': call invokes immediately with args, apply takes an array, bind returns a new function. Arrow functions are different — they capture 'this' from the enclosing lexical scope at creation time and CANNOT be rebound. In React, this is why arrow functions in class components auto-bind to the instance, and why we prefer arrow functions in event handlers to avoid manual binding.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain event delegation and how you used it in the Marketplace.",
        answer: "Event delegation leverages event bubbling — instead of attaching listeners to every child element, you attach one listener to a parent and use event.target to determine which child was clicked. This is more memory-efficient and works for dynamically added elements. In the Marketplace product grid, instead of attaching click handlers to each of the hundreds of product cards, I attached one listener to the grid container. Using event.target.closest('.product-card'), I identified which card was clicked. This pattern reduced memory usage significantly when rendering large product lists and simplified cleanup — one listener to remove instead of hundreds.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Deep vs shallow copy — how do you handle immutability in React state?",
        answer: "A shallow copy (spread operator, Object.assign) copies only the first level — nested objects still share references. A deep copy (structuredClone, JSON.parse(JSON.stringify()), or libraries like lodash.cloneDeep) copies all levels. In React, state must be treated as immutable — never mutate directly. For flat state, spread works: setState({...state, name: 'new'}). For nested state, you need to spread at each level: setState({...state, address: {...state.address, city: 'Pune'}}). In the Marketplace cart, I used Immer via Redux Toolkit's createSlice which lets you write 'mutating' code that produces immutable updates under the hood — much cleaner for deeply nested cart item structures.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are generators and iterators in JavaScript? Have you used them?",
        answer: "An iterator is an object with a next() method that returns {value, done}. A generator is a function (function*) that can pause and resume execution using yield. When you call a generator, it returns an iterator. Each next() call runs until the next yield, returning the yielded value. Generators enable lazy evaluation — producing values on demand instead of computing all at once. I used the iterator protocol indirectly through for...of loops and spread operators. I've also seen generators used in Redux-Saga for managing side effects, though at SLB we used Redux Toolkit with createAsyncThunk instead, which I found simpler for our use case.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "Explain WeakMap and WeakSet — when would you use them?",
        answer: "WeakMap and WeakSet hold 'weak' references to their keys/values — if no other reference exists to the key object, it can be garbage collected. Unlike Map/Set, they are not iterable and don't have a size property. WeakMap is useful for associating metadata with DOM nodes or objects without preventing garbage collection. For example, storing private data for class instances: const privateData = new WeakMap(); class User { constructor(name) { privateData.set(this, {name}); } }. When the User instance is garbage collected, the private data goes with it. I haven't used them extensively in production but understand their value for caching and preventing memory leaks in long-running applications.",
        difficulty: "advanced",
        type: "concept"
      }
    ]
  },
  {
    id: "react",
    title: "React.js Deep Dive",
    icon: "Re",
    questions: [
      {
        question: "Explain the Virtual DOM and React's reconciliation algorithm (Fiber).",
        answer: "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes, React creates a new VDOM tree, diffs it against the previous one (reconciliation), and applies only the minimal DOM updates needed. React Fiber (introduced in React 16) is the reimplemented reconciliation engine. Unlike the old stack-based reconciler that processed updates synchronously, Fiber breaks rendering into units of work (fibers) that can be paused, resumed, and prioritized. Each fiber is a JS object representing a component with links to its child, sibling, and parent. This enables concurrent features like Suspense and transitions. In the Marketplace, Fiber's ability to interrupt low-priority renders helped keep the UI responsive during heavy product list updates.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How does React.memo work internally? When did you use it in the Marketplace?",
        answer: "React.memo is a higher-order component that memoizes the rendered output. It performs a shallow comparison of props — if props haven't changed, React skips re-rendering the component and reuses the last result. Internally, React checks the fiber's pendingProps against memoizedProps using Object.is for each prop. In the Marketplace, I wrapped the ProductCard component with React.memo because the parent ProductGrid re-rendered on every search/filter change, but individual cards only needed to re-render if their specific product data changed. I also provided a custom comparator for complex props: React.memo(ProductCard, (prev, next) => prev.product.id === next.product.id && prev.product.stock === next.product.stock) to avoid unnecessary re-renders when only unrelated parent state changed.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain useCallback vs useMemo — how did you optimize re-renders for 10K SKUs?",
        answer: "useMemo memoizes a computed VALUE: const filtered = useMemo(() => products.filter(p => p.category === cat), [products, cat]). useCallback memoizes a FUNCTION reference: const handleClick = useCallback((id) => addToCart(id), [addToCart]). Both take a dependency array and only recompute when dependencies change. For the 10K SKU catalog, I used useMemo to memoize filtered/sorted product lists so expensive computations didn't run on every render. I used useCallback for event handlers passed to memoized child components — without it, new function references on each render would defeat React.memo. Combined with virtualized lists (react-window), this kept the product catalog performant even with 10K items, reducing render time from ~800ms to ~50ms.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are React's render phases? (Render → Commit → Paint)",
        answer: "React's update cycle has two main phases: the Render phase and the Commit phase. In the Render phase, React calls your component functions, generates the new VDOM tree, and diffs it against the previous one to determine what changed. This phase is pure — no side effects, no DOM mutations. It can be interrupted and restarted (in concurrent mode). In the Commit phase, React applies the computed changes to the actual DOM, runs useLayoutEffect synchronously, then the browser paints pixels on screen, and finally React runs useEffect asynchronously. Understanding this matters for performance: expensive calculations in the render phase block the commit, while useEffect runs after paint so it doesn't block visual updates. useLayoutEffect runs before paint — I used it for DOM measurements to avoid visual flickering.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How does the Context API work under the hood? When does it cause unnecessary re-renders?",
        answer: "Context uses a Provider-Consumer pattern. React.createContext creates a context object. The Provider component stores the value and maintains a list of subscribed consumers. When the Provider's value changes (by reference, using Object.is), ALL consuming components re-render regardless of whether they use the specific part of context that changed. This is the key pitfall: if you pass an object like value={{user, theme}}, changing user re-renders components that only need theme. Solutions: split into separate contexts (UserContext, ThemeContext), memoize the value object with useMemo, or use a state management library. In the Marketplace, we split our context into AuthContext, CartContext, and UIContext to avoid this cascade of unnecessary re-renders.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "You built 35 shared components — how did you design the component API (props, composition)?",
        answer: "I followed a composition-over-configuration approach. Instead of a single monolithic component with many props, I created compound components. For example, our DataTable wasn't <DataTable columns={[...]} data={[...]} sortable pagination />, but rather <DataTable data={data}><DataTable.Header><DataTable.Column sortable>Name</DataTable.Column></DataTable.Header><DataTable.Body renderRow={...}/><DataTable.Pagination/></DataTable>. This gave teams flexibility to customize layout without prop explosion. Common patterns I used: compound components for complex UI, render props for flexible rendering, polymorphic components (as prop) for semantic HTML, and forwardRef for DOM access. Each component accepted className for style overrides and followed consistent naming conventions.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "Explain controlled vs uncontrolled components — which did you use in the checkout flow?",
        answer: "Controlled components have their state managed by React via value + onChange props — React is the single source of truth. Uncontrolled components manage their own state internally via the DOM, accessed through refs. In the Marketplace checkout, I used controlled components for all form fields (name, address, payment) because we needed real-time validation, conditional field rendering (show state dropdown only for specific countries), and the ability to programmatically set values (autofill from saved addresses). The only place I used uncontrolled was a file upload input where we just needed the file on submit. Controlled components are more work but give you full control over form behavior, which is essential for a checkout flow where validation errors, field dependencies, and form state persistence matter.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How does React.lazy + Suspense work? How did you implement code splitting?",
        answer: "React.lazy takes a function that returns a dynamic import() and creates a component that loads the module lazily. Suspense wraps lazy components and shows a fallback UI while loading. Under the hood, when React encounters a lazy component, it throws a Promise (yes, throws). Suspense catches this 'thrown Promise' and renders the fallback until it resolves. In the Marketplace, I used route-based code splitting: each major section (catalog, cart, checkout, order tracking, admin) was a lazy-loaded route. This reduced the initial bundle from ~450KB to ~120KB. I also used lazy loading for heavy components like the rich text editor in product descriptions and the chart library in the admin dashboard. Combined with prefetching on hover (preloading the component when users hover over nav links), transitions felt instant.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What React design patterns have you used? (Compound, Render Props, HOC, Custom Hooks)",
        answer: "Compound Components: Used in the component library for DataTable, Dropdown, and Tabs — children share implicit state via Context. Render Props: Used for our Tooltip component where the trigger element needed full control: <Tooltip render={({show}) => <button onMouseEnter={show}>Info</button>}>. HOC (Higher-Order Components): Used withAuth HOC to wrap protected pages, though we later migrated most to custom hooks. Custom Hooks: Our primary pattern — useDebounce for search input, useInfiniteScroll for product lists, useLocalStorage for cart persistence, useMediaQuery for responsive behavior. Custom hooks compose beautifully and are easier to test than HOCs. The general evolution in our codebase was HOC → Render Props → Custom Hooks as the team adopted modern React patterns.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does the key prop affect reconciliation? What happens with incorrect keys in lists?",
        answer: "The key prop helps React identify which items in a list have changed, been added, or removed. During reconciliation, React uses keys to match elements between old and new VDOM trees. Without keys (or with index keys), React matches by position — if you insert an item at the top, every item 'changes' position, causing all to re-render. With unique stable keys, React knows which item is which and can minimize DOM operations. Using array index as key causes bugs when the list is reordered, filtered, or items are added/removed: component state gets mismatched with the wrong item. In the Marketplace product list, I used product.id as key. We once had a bug where using index keys in the cart caused quantity state to 'jump' between items when removing an item from the middle of the list.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Your Marketplace renders 10K SKUs — why not use Vue or Svelte instead of React?",
        answer: "The choice was primarily practical: the team had strong React expertise, a mature React ecosystem was essential (React Query, React Testing Library, Storybook), and SLB's other internal tools were React-based, so shared component libraries could be reused. Vue or Svelte could certainly handle 10K SKUs — Svelte's compile-time approach might even be faster for simple updates. But React's virtual DOM + windowing (react-window) solved our performance needs, and the developer pool for React is larger, making hiring and onboarding easier. The performance bottleneck with 10K items wasn't the framework's diffing — it was DOM node count, which we solved with virtualization regardless of framework choice.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "How do React hooks rules work internally and why can't you call hooks conditionally?",
        answer: "React stores hook state in a linked list attached to the component's fiber node. On each render, React walks through this list in order — the first useState call maps to the first slot, the second to the second slot, and so on. If you call hooks conditionally, the order changes between renders: what was the second hook might become the first, causing state to map to the wrong hook. This is why the Rules of Hooks exist: always call hooks at the top level, never inside conditions or loops. The eslint-plugin-react-hooks enforces this statically. If you need conditional behavior, put the condition INSIDE the hook: useEffect(() => { if (condition) doSomething(); }, [condition]). This design trade-off gives React simple and fast hook state management at the cost of the ordering constraint.",
        difficulty: "advanced",
        type: "internal"
      }
    ]
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "Nx",
    questions: [
      {
        question: "Explain SSR vs SSG vs ISR — when did you use each at ZopSmart?",
        answer: "SSR (Server-Side Rendering) generates HTML on every request — good for personalized or frequently changing content. SSG (Static Site Generation) generates HTML at build time — fastest for static content. ISR (Incremental Static Regeneration) is a hybrid: serves static pages but revalidates them in the background after a specified interval. At ZopSmart, I used SSG for marketing/landing pages that rarely changed (rebuilt on deploy). SSR for product listing pages that needed real-time inventory data. ISR for product detail pages — they're mostly static but prices/stock change occasionally, so I set revalidate: 60 (regenerate every 60 seconds). This gave us the performance of static pages with near-real-time data, and reduced server load compared to full SSR.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are React Server Components? How do they differ from SSR?",
        answer: "Server Components run exclusively on the server and send rendered HTML to the client — their JavaScript is NEVER sent to the browser bundle. SSR also renders on the server but ships the component's JS for hydration (making it interactive). Key differences: Server Components can directly access databases, file systems, and APIs without exposing secrets. They reduce bundle size because their code stays server-side. They can import server-only libraries without bloating the client. However, they cannot use state (useState), effects (useEffect), or browser APIs. In Next.js App Router, all components are Server Components by default — you opt into Client Components with 'use client'. The mental model is: Server Components for data fetching and static content, Client Components for interactivity.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "How does Next.js file-based routing work? App Router vs Pages Router?",
        answer: "Pages Router: files in /pages map to routes — /pages/products/[id].js becomes /products/123. Uses getServerSideProps, getStaticProps for data fetching. Layout requires custom _app.js and _document.js. App Router (Next.js 13+): files in /app directory. Each route is a folder with a page.js file. Introduces layouts (layout.js shared across child routes), loading.js for Suspense fallbacks, error.js for error boundaries, and route groups. Data fetching uses async Server Components directly — no getServerSideProps needed. The key advantage of App Router is nested layouts (persist across navigation, don't re-render), streaming with Suspense, and Server Components by default. The Pages Router is simpler but lacks these architectural improvements.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Next.js caching layers (Router Cache, Data Cache, Full Route Cache).",
        answer: "Next.js has four caching layers: 1) Request Memoization — deduplicates identical fetch calls within a single render pass (same URL, same options). 2) Data Cache — persists fetch results across requests on the server, controlled by revalidate options or cache: 'no-store'. 3) Full Route Cache — caches the rendered HTML and RSC payload of static routes at build time, served from CDN. 4) Router Cache — client-side cache of RSC payloads, so navigating back to a visited page is instant (default 30s for dynamic, 5min for static). Understanding these layers is crucial: if your data isn't updating, it could be cached at any of these levels. I use fetch options like { next: { revalidate: 60 } } for time-based revalidation or revalidatePath/revalidateTag for on-demand cache busting.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How does next/image optimize images? How did you use it for product images?",
        answer: "next/image provides automatic image optimization: it serves images in modern formats (WebP/AVIF), resizes them based on the device screen size using srcset, lazy loads by default (only loads when entering viewport), and prevents CLS by requiring width/height or using fill. Images are optimized on-demand and cached on the server. In the Marketplace product catalog, I used next/image with fill and sizes prop for responsive product thumbnails: <Image src={product.image} fill sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw' />. For the product detail page, I used priority for the hero image to improve LCP. This reduced image payload by ~60% compared to raw images and significantly improved our Lighthouse performance score.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is Streaming SSR and how does Suspense enable it?",
        answer: "Traditional SSR waits for ALL data to be fetched before sending any HTML — the user sees nothing until everything is ready. Streaming SSR sends HTML in chunks as data becomes available. Suspense boundaries define these chunks: content outside Suspense renders immediately, while content inside shows a fallback until its data resolves, then streams in. The browser progressively renders each chunk using HTTP chunked transfer encoding. In Next.js App Router, this works automatically with async Server Components wrapped in Suspense. For example, a product page can stream the header and images instantly while the reviews section (which requires a slow API call) shows a loading skeleton and streams in later. This dramatically improves TTFB and perceived performance.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "You used Next.js for SSR at ZopSmart but React SPA at SLB — how did you decide?",
        answer: "At ZopSmart, the product was a consumer-facing e-commerce site where SEO was critical — product pages needed to be indexed by Google, and first contentful paint had to be fast for conversion rates. SSR/SSG was the clear choice. At SLB, the Marketplace is an internal tool behind authentication — no SEO needed, and users are on corporate networks with decent bandwidth. A React SPA with client-side rendering was simpler to deploy (just static files on S3 + CloudFront), easier to integrate with the existing microservices auth flow, and didn't require a Node.js server in production. The trade-off was worth it: slightly slower initial load but simpler infrastructure and deployment. If we were rebuilding today, I'd consider Next.js App Router even for internal tools because Server Components reduce bundle size significantly.",
        difficulty: "mid",
        type: "cross"
      }
    ]
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "TS",
    questions: [
      {
        question: "Explain interface vs type — when do you use each?",
        answer: "Both define object shapes, but they differ in capabilities. Interfaces support declaration merging (defining the same interface twice merges them) and extends for inheritance. Types support unions (type Status = 'active' | 'inactive'), intersections (type Combined = A & B), mapped types, and conditional types. My rule of thumb: use interface for object shapes and class contracts (they're more extensible), use type for unions, primitives, tuples, and complex type transformations. In the Marketplace component library, we used interfaces for component props (interface ButtonProps { variant: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg' }) because teams could extend them, and types for utility types and union types like type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How do generics work? Give an example from your component library.",
        answer: "Generics allow you to write type-safe code that works with multiple types without losing type information. They're like type parameters. In the component library, our DataTable component was generic: function DataTable<T>({ data, columns }: { data: T[], columns: Column<T>[] }). This meant TypeScript knew the exact shape of each row. When used as <DataTable<Product> data={products} columns={productColumns} />, the column accessor functions were type-checked against the Product type. Another example: our useApi hook was generic: function useApi<T>(url: string): { data: T | null, loading: boolean, error: Error | null }. Calling useApi<Product[]>('/api/products') gave fully typed data. Generics eliminated the need for type assertions and caught prop mismatches at compile time.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain utility types: Partial, Pick, Omit, Record, ReturnType.",
        answer: "Partial<T> makes all properties optional — useful for update functions: function updateProduct(id: string, updates: Partial<Product>). Pick<T, K> selects specific properties: type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>. Omit<T, K> removes properties: type CreateProduct = Omit<Product, 'id' | 'createdAt'> for forms where ID is auto-generated. Record<K, V> creates an object type with keys K and values V: type StockByLocation = Record<string, number>. ReturnType<T> extracts the return type of a function: type ApiResponse = ReturnType<typeof fetchProducts>. In the Marketplace, I used these extensively — Partial for PATCH endpoints, Omit for creation forms, Pick for list views that show only a few fields, and Record for mapping data like categories to product counts.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does type narrowing work? (typeof, instanceof, discriminated unions)",
        answer: "Type narrowing is how TypeScript refines a broad type to a more specific one within a code block. typeof narrows primitives: if (typeof x === 'string') { x.toUpperCase(); }. instanceof narrows class instances: if (error instanceof NetworkError) { error.statusCode; }. Discriminated unions use a common literal property: type Result = { status: 'success', data: Product } | { status: 'error', message: string }. After checking if (result.status === 'success'), TypeScript knows result.data exists. I used discriminated unions extensively in the Marketplace for API responses and state machines (loading/success/error states). The 'in' operator also narrows: if ('email' in user) narrows to a type that has email. Custom type guards (function isProduct(x): x is Product) give you full control for complex narrowing logic.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How did TypeScript help catch bugs in your Marketplace project?",
        answer: "TypeScript caught several categories of bugs at compile time that would have been runtime errors. First, API contract mismatches — when the backend changed a field from 'price' to 'unitPrice', TypeScript flagged every usage immediately instead of us discovering it in production. Second, exhaustiveness checking with discriminated unions — when we added a new order status, TypeScript's never type in switch default cases flagged every switch statement that didn't handle the new status. Third, null safety — strict null checks caught cases where we accessed product.vendor.name without checking if vendor existed (some products had no vendor). Fourth, refactoring confidence — renaming a prop or changing a function signature immediately showed all call sites that needed updating. We estimated TypeScript prevented roughly 15-20% of bugs that would have reached QA.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "Have you ever had a case where TypeScript types were wrong but the code worked?",
        answer: "Yes, this happens with type assertions and 'any' types. One case in the Marketplace: we used a third-party charting library whose types were outdated. The actual API accepted a config option the types didn't include, so we used 'as any' to bypass it. The code worked perfectly but TypeScript didn't validate that config path. Another case was with our API responses — we typed the response as Product[] but the API sometimes returned null for optional fields that our types said were required. The code worked because we had optional chaining (product?.category?.name) but the types were technically lying. We fixed this by making our types more accurate with Partial and explicit null unions. The lesson: TypeScript is only as good as your types. Runtime validation (like Zod) fills the gap between typed assumptions and actual data shapes.",
        difficulty: "mid",
        type: "cross"
      }
    ]
  },
  {
    id: "css",
    title: "CSS & Tailwind",
    icon: "Tw",
    questions: [
      {
        question: "How does CSS specificity work? How does Tailwind avoid specificity issues?",
        answer: "CSS specificity is calculated as a tuple: (inline styles, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements). Higher specificity wins. !important overrides everything (and should be avoided). Specificity conflicts are a major source of CSS bugs — one selector accidentally overriding another. Tailwind avoids this by using single utility classes with flat specificity (one class each). Since you compose styles by adding/removing classes rather than writing selectors that might conflict, specificity wars essentially disappear. Every Tailwind class has the same specificity (0,1,0), and the last one in the stylesheet wins if they conflict. This is why Tailwind's class ordering in the generated CSS matters, and why the cn() utility (clsx + twMerge) is important for conditionally applying classes without conflicts.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Flexbox vs Grid — when do you use each?",
        answer: "Flexbox is one-dimensional — it arranges items along a single axis (row or column). Grid is two-dimensional — it controls both rows and columns simultaneously. I use Flexbox for: navigation bars, centering content, aligning items in a row with varying sizes, simple card layouts. I use Grid for: page-level layouts (header/sidebar/main/footer), product grids with consistent sizing, complex dashboards with named grid areas, and any layout where I need precise control over both dimensions. In the Marketplace, the overall page layout used CSS Grid (sidebar + main content), while individual components like the search bar (input + filter buttons), product cards (image + info stacked), and the header (logo + nav + actions) used Flexbox. In Tailwind, grid-cols-3 gap-4 for product grids and flex items-center justify-between for horizontal layouts.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How did you build responsive layouts for desktop, tablet, mobile AND low-bandwidth field environments?",
        answer: "For responsive layouts, I used Tailwind's mobile-first breakpoint system: base styles for mobile, then sm:, md:, lg: for larger screens. The product grid used grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4. For low-bandwidth field environments (rig workers on satellite connections), I went beyond responsive design: I implemented a 'lite mode' toggle that disabled images (showing text-only product cards), removed animations and transitions, minimized web font loading (used system fonts), and lazy-loaded everything below the fold. We also used Service Worker for offline support of the product catalog and recently viewed items. CSS-specific strategies included using CSS containment (contain: layout) on product cards to limit browser reflow scope, and reducing box-shadow/gradient usage which can cause jank on low-powered tablets used in the field.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How does Tailwind CSS work under the hood? (PostCSS, JIT, purging)",
        answer: "Tailwind is a PostCSS plugin that generates utility classes. In JIT (Just-In-Time) mode (default since v3), it scans your source files for class names and generates ONLY the CSS for classes you actually use — on demand. The process: 1) Tailwind's content config tells it which files to scan (e.g., ./src/**/*.{js,jsx}). 2) It parses these files with regex to find class-name-like strings. 3) For each match, it generates the corresponding CSS rule. 4) The output is a minimal CSS file with only used utilities. This is why you can use arbitrary values like text-[#1da1f2] — JIT generates them on the fly. The old approach (pre-JIT) generated every possible utility class then purged unused ones — resulting in huge dev CSS files. JIT made dev builds fast and small, and enabled features like arbitrary values and per-variant generation.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "Explain CSS-in-JS vs utility-first (Tailwind) — why did you choose Tailwind?",
        answer: "CSS-in-JS (styled-components, Emotion) lets you write CSS inside JavaScript, scoped to components. Pros: dynamic styles based on props, automatic scoping, co-located styles. Cons: runtime overhead (generating CSS in the browser), larger bundle size, and SSR complexity. Tailwind (utility-first) provides predefined classes composed in markup. Pros: zero runtime overhead (CSS is generated at build time), consistent design tokens, easy responsive design, small production CSS (~10KB). Cons: verbose class names, learning curve. We chose Tailwind for the Marketplace because: 1) No runtime cost — critical for performance on low-bandwidth field devices. 2) Design consistency — the team automatically uses the same spacing/color scale. 3) Speed — styling new components is faster once you know the utilities. 4) Storybook compatibility — Tailwind classes just work everywhere without extra setup.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "What are CSS Container Queries and how do they differ from media queries?",
        answer: "Media queries respond to the viewport size — the entire browser window. Container queries respond to the size of a parent container. This is a game-changer for component-based design. With media queries, a card component behaves the same whether it's in a full-width section or a narrow sidebar. With container queries (@container (min-width: 400px) { ... }), the card adapts based on its container's width. You define a containment context on the parent: .card-wrapper { container-type: inline-size; }. Then child elements use @container instead of @media. This makes truly reusable responsive components possible. In our component library, I would have loved to use container queries for the DataTable and Card components, but browser support wasn't universal enough at the time. Now it's supported in all major browsers and it's the right approach for shared component libraries.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "Your Marketplace serves field engineers on low-bandwidth — what specific CSS/loading strategies did you use?",
        answer: "Several strategies layered together: 1) Critical CSS inlining — extracted above-the-fold CSS and inlined it in the HTML head to avoid render-blocking stylesheets. 2) Font optimization — used font-display: swap with system font fallbacks, subset web fonts to only include used characters. 3) Reduced motion — used prefers-reduced-motion media query to disable animations on devices that request it, and in our 'lite mode' by default. 4) Skeleton screens — lightweight CSS-only loading skeletons (no JS) using background gradient animations. 5) CSS containment — contain: layout style on product cards so browser doesn't recalculate layout for the entire page when one card loads. 6) Avoided heavy CSS — no blur filters, minimal box-shadows, no CSS transforms for decorative purposes. 7) Image placeholders — used aspect-ratio CSS to reserve space and prevent CLS while images loaded slowly.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "performance",
    title: "Performance & Core Web Vitals",
    icon: "LH",
    questions: [
      {
        question: "What are Core Web Vitals (LCP, INP, CLS)? How did you measure them?",
        answer: "Core Web Vitals are Google's key metrics for user experience. LCP (Largest Contentful Paint) measures loading performance — time until the largest visible element renders (target: <2.5s). INP (Interaction to Next Paint, replaced FID) measures responsiveness — delay between user interaction and visual update (target: <200ms). CLS (Cumulative Layout Shift) measures visual stability — how much content shifts unexpectedly (target: <0.1). I measured them using: Chrome DevTools Performance panel for debugging, Lighthouse for lab measurements during development, and the web-vitals library for real user monitoring (RUM) in production. We sent CWV data to our analytics dashboard to track regressions. Chrome's Performance Insights panel was also helpful for identifying specific elements causing poor LCP or layout shifts.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Walk me through how you improved Lighthouse from mid-60s to 90+.",
        answer: "The improvement was incremental across several areas: 1) Code splitting — broke the monolithic 450KB bundle into route-based chunks using React.lazy, reducing initial JS by ~70%. 2) Image optimization — converted PNGs to WebP, added proper width/height attributes to prevent CLS, lazy-loaded below-fold images, and used responsive srcset. This alone improved LCP by ~1.5s. 3) Tree shaking — switched from importing the entire lodash library to individual functions (import debounce from 'lodash/debounce'), saving ~70KB. Same for icons — cherry-picked instead of importing the full icon set. 4) Font optimization — preloaded critical fonts, used font-display: swap. 5) React optimization — memoized expensive components, virtualized long lists, reduced unnecessary re-renders. 6) Third-party scripts — defer-loaded analytics and non-critical scripts. The biggest single win was code splitting + tree shaking, which took us from mid-60s to ~80. Image optimization and React performance got us to 90+.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How does code splitting work with React.lazy and dynamic imports?",
        answer: "Code splitting leverages JavaScript's dynamic import() syntax to split your bundle into smaller chunks loaded on demand. When webpack/Vite encounters import('./Component'), it creates a separate chunk file for that module and its dependencies. React.lazy wraps this: const ProductPage = React.lazy(() => import('./ProductPage')). When ProductPage is first rendered, React triggers the dynamic import, loads the chunk over the network, and renders the component. Suspense provides the loading fallback during this process. In the Marketplace, I used route-based splitting (each page is a lazy chunk) plus component-based splitting for heavy components like the image carousel, rich text editor, and admin charts. Webpack's magic comments allow naming chunks: import(/* webpackChunkName: 'checkout' */ './Checkout') for better debugging. The key insight is to split at boundaries where users might not need the code immediately.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain tree shaking — how does Webpack/Vite eliminate dead code?",
        answer: "Tree shaking is dead code elimination based on ES module static analysis. ES modules have static import/export declarations, so bundlers can determine at build time which exports are actually used. If you import { debounce } from 'lodash-es', the bundler marks all other lodash exports as unused and removes them from the output. This only works with ESM (import/export), not CommonJS (require) because CommonJS is dynamic — you can conditionally require modules, so the bundler can't statically determine usage. In the Marketplace, the biggest tree shaking win was switching from lodash to lodash-es (ESM version), which reduced our lodash footprint from ~72KB to ~4KB. We also tree-shook our icon library by switching from import { Icon } from 'icons' to import SearchIcon from 'icons/SearchIcon'. Webpack's sideEffects: false in package.json tells the bundler that unused imports are safe to remove.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "How did you virtualize lists for large datasets? (react-window / react-virtualized)",
        answer: "Virtualization renders only the visible items in a list plus a small buffer, instead of rendering all items. react-window provides FixedSizeList and VariableSizeList components. For the Marketplace product grid, I used FixedSizeGrid for consistent card sizes. It works by calculating which items are visible based on scroll position, rendering only those items with absolute positioning inside a container with the full scrollable height. The overscanCount prop renders extra items above/below the viewport for smooth scrolling. In the Chat App, I used VariableSizeList for messages (different heights for text vs image messages) with a measureRef approach to calculate heights. The impact was dramatic: rendering 10K products went from ~3 seconds and browser freeze to instant, smooth scrolling with only ~20 DOM nodes at any time.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is Intersection Observer? How did you use it for infinite scroll in the Food Delivery app?",
        answer: "Intersection Observer is a browser API that efficiently detects when an element enters or exits the viewport (or any ancestor element). Unlike scroll event listeners (which fire on every pixel of scroll and can cause jank), Intersection Observer is asynchronous and only fires when intersection changes. For infinite scroll in the Food Delivery app, I placed an invisible sentinel element at the bottom of the restaurant list. When it intersected the viewport (threshold: 0.1), I triggered a fetch for the next page: const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) loadMore(); }); observer.observe(sentinelRef.current). I wrapped this in a custom useInfiniteScroll hook that handled loading states and cleanup (observer.disconnect in useEffect return). This was simpler and more performant than tracking scroll position manually.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does image optimization work? (lazy loading, srcset, next/image, WebP)",
        answer: "Multiple techniques work together: Native lazy loading (loading='lazy') defers off-screen images until the user scrolls near them — reduces initial page weight. srcset and sizes attributes let the browser choose the right image size for the device: a phone loads a 400px image, desktop loads 1200px. Modern formats like WebP (25-35% smaller than JPEG) and AVIF (even smaller) reduce file size. Next/image automates all of this: it generates multiple sizes, converts to WebP, lazy loads by default, and adds width/height to prevent CLS. In the Marketplace, product thumbnails used next/image with sizes='(max-width: 640px) 50vw, 25vw'. For the product detail hero image, I used priority to preload it for better LCP. We also used blur placeholder (blurDataURL) for a smooth loading experience — shows a tiny blurred preview while the full image loads.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "You improved Lighthouse to 90+ — what was the biggest single improvement and why?",
        answer: "The biggest single improvement was code splitting, which alone took us from ~65 to ~78. The original bundle was a single ~450KB JavaScript file that had to be downloaded, parsed, and executed before anything interactive appeared. After implementing React.lazy for route-based splitting, the initial bundle dropped to ~120KB. The remaining ~330KB loaded on demand as users navigated. This dramatically improved LCP (less JS blocking rendering), TTI (less JS to parse), and TBT (shorter main thread blocking). The reason it had such outsized impact: JavaScript is the most expensive resource byte-for-byte. Unlike images or CSS, JS must be parsed, compiled, and executed — each step blocks the main thread. Reducing initial JS has a multiplicative effect across all performance metrics.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "How do you handle performance in low-bandwidth environments for field workers?",
        answer: "We took a multi-layered approach: 1) Aggressive caching — Service Worker with Cache First strategy for static assets, Stale While Revalidate for API responses. Product catalog was cached for offline browsing. 2) Data optimization — paginated API responses (20 items per page vs loading all 10K), compressed responses with gzip/brotli, minimal JSON payloads (API returns only needed fields via sparse fieldsets). 3) Progressive loading — skeleton screens appear instantly, critical content loads first, images load last. 4) Lite mode — a toggle that disables images, uses system fonts, reduces animations, and shows simplified product cards. 5) Bundle optimization — code splitting meant users only download JS for the page they're on. 6) Prefetching on good connections — used navigator.connection API to prefetch next pages only when bandwidth is sufficient. This ensured the app was usable even on 2G-like satellite connections.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "testing",
    title: "Testing",
    icon: "Ts",
    questions: [
      {
        question: "What's your testing strategy? How did you achieve 95% coverage?",
        answer: "Our testing pyramid had three layers: Unit tests (Jest + RTL) formed the base — we tested every component, hook, and utility function in isolation. Integration tests (RTL with mock API) tested component interactions — e.g., search input → filter update → product list re-render. E2E tests (Cypress) covered critical user flows — checkout, authentication, order placement. We achieved 95% coverage by making testing part of the PR process: every new component or feature required tests, and our CI pipeline blocked merges below 90% coverage. The key was testing behavior, not implementation — we tested what the user sees and does, not internal state. For example, instead of testing that setState was called, we tested that the correct product appeared after clicking a filter.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Jest vs React Testing Library — what does each tool test?",
        answer: "Jest is the test runner and assertion framework — it provides describe/it/expect, mocking (jest.fn(), jest.mock()), timers (jest.useFakeTimers()), snapshots, and code coverage reporting. RTL (React Testing Library) is a DOM testing utility for React components — it renders components and provides queries to find elements the way users do: getByRole, getByText, getByLabelText (not getByClassName or getById). The philosophy is 'test how users interact, not implementation details.' Jest handles the test lifecycle and assertions (expect(x).toBe(y)), while RTL handles rendering and querying React components. Together: RTL renders a <ProductCard />, you use getByText('Add to Cart') to find the button, fireEvent.click() it, and Jest's expect verifies the callback was called. We used @testing-library/user-event over fireEvent for more realistic interactions.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How do you test hooks? How do you test components that use Context?",
        answer: "For hooks, we use @testing-library/react's renderHook function. It renders a hook in a test component and returns the result: const { result } = renderHook(() => useDebounce('search', 300)). You can then assert on result.current and use act() to trigger updates. For components using Context, we create a wrapper that provides the Context: renderHook(() => useCart(), { wrapper: ({ children }) => <CartProvider>{children}</CartProvider> }). For components, we wrap them in the necessary providers: render(<CartProvider><ProductCard /></CartProvider>). In the Marketplace, we created a TestProviders wrapper that included all necessary contexts (Auth, Cart, Theme) with sensible defaults, making test setup consistent across the codebase.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does Cypress differ from RTL? Why did you add Cypress specifically for checkout?",
        answer: "RTL tests run in jsdom — a simulated browser environment in Node.js. It's fast (milliseconds per test) but doesn't test real browser behavior (navigation, cookies, network requests, CSS rendering). Cypress runs tests in a real browser (Chrome/Firefox), interacting with your actual running application. It tests the full stack: frontend, API calls, redirects, browser storage. We added Cypress for checkout because: 1) Multi-step flow with navigation — RTL can't test page transitions. 2) Payment integration — needed to verify the actual redirect to payment gateway and callback handling. 3) Cookie/session management — checkout requires authenticated sessions across pages. 4) Race conditions — the real app has timing issues between stock reservation and payment that jsdom can't reproduce. Cypress tests are slower (~30s each) but catch integration bugs that unit tests miss.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you mock API calls in tests? (msw vs jest.mock)",
        answer: "jest.mock replaces entire modules: jest.mock('./api', () => ({ fetchProducts: jest.fn() })). It's simple but tightly coupled to implementation — if you refactor how API calls are made, mocks break. MSW (Mock Service Worker) intercepts actual network requests at the network level: rest.get('/api/products', (req, res, ctx) => res(ctx.json(mockProducts))). Your component code runs exactly as in production — same fetch calls, same error handling. We used MSW because: 1) Tests are implementation-agnostic — works whether you use fetch, axios, or React Query. 2) Same mock definitions work in Jest AND Storybook AND development. 3) You can test error scenarios and loading states realistically. 4) If the API URL changes, you update one MSW handler, not dozens of jest.mock calls. For unit testing utility functions or non-network code, jest.fn() is still the right tool.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What do you NOT test? Where do you draw the line?",
        answer: "We don't test: 1) Third-party library internals — I trust React Query's caching works; I test that MY component shows data from the hook. 2) CSS/styling — visual regression testing tools exist but we didn't invest in them; we relied on Storybook visual review. 3) Trivial components — a component that just renders props with no logic ({name}) => <span>{name}</span> doesn't need a test. 4) Implementation details — we don't test that useState was called or that a specific internal function was invoked. 5) Console output or internal logging. The guiding principle: if it can break in a way a user would notice, test it. If it's purely internal and caught by TypeScript, skip it. 95% coverage doesn't mean every line is worth testing — some uncovered lines are catch blocks for impossible states or development-only code.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "95% coverage sounds high — does that mean all your edge cases are covered?",
        answer: "No, coverage percentage is a measure of code execution, not correctness. 95% means 95% of lines/branches were executed during tests — but those tests might not assert the right things. You can have 100% coverage with zero useful assertions. Our real confidence came from: testing the right behaviors (user-facing outcomes, not implementation details), testing edge cases explicitly (empty states, error responses, boundary values, concurrent operations), and having Cypress E2E for critical paths. Coverage was a gate, not a goal — it caught un-tested code, but we focused on test quality. The remaining 5% uncovered was mostly error boundaries, fallback UI, and development-only debug code. A dangerous anti-pattern is writing tests just to hit coverage numbers — that creates brittle tests that break on refactoring without catching real bugs.",
        difficulty: "mid",
        type: "cross"
      }
    ]
  },
  {
    id: "storybook",
    title: "Component Library & Storybook",
    icon: "SB",
    questions: [
      {
        question: "How did you design the component library API? (props, variants, composition)",
        answer: "I followed several principles: 1) Consistent prop naming — every interactive component has variant, size, disabled, className props. Sizes are always 'sm' | 'md' | 'lg'. 2) Sensible defaults — Button defaults to variant='primary', size='md', so <Button>Submit</Button> works without config. 3) Composition over configuration — instead of a mega-component with 20 props, use compound components: <Select><Select.Trigger /><Select.Content><Select.Item /></Select.Content></Select>. 4) Polymorphic 'as' prop — <Button as='a' href='/link'> renders an anchor with button styling. 5) Forward ref — all components use forwardRef so parent components can access DOM nodes. 6) TypeScript generics — components like DataTable<T> preserve type safety for data. The API was designed so developers could be productive within minutes while advanced usage remained possible.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How does Storybook work? How did you document 35 components?",
        answer: "Storybook runs a separate webpack dev server that renders components in isolation — independent of your app. Each component has a .stories.js file that exports 'stories' (different states of the component). For example, Button.stories.js exports Primary, Secondary, Disabled, Loading variants. Storybook reads these exports and renders an interactive catalog. We documented 35 components using: 1) Stories for every variant/size/state combination. 2) ArgTypes for interactive controls — change props in the UI and see live updates. 3) MDX docs that mix markdown with live component examples for usage guidelines. 4) Addon-a11y for accessibility audits per component. 5) Chromatic for visual regression testing. Each component had a consistent documentation structure: Description, Props table (auto-generated from TypeScript), Interactive playground, Usage examples, Do/Don't guidelines. New team members could browse the library and copy-paste working examples.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How did you handle theming, variants, and sizes across components?",
        answer: "We used a design tokens approach integrated with Tailwind CSS. Tokens were defined as CSS custom properties: --color-primary, --color-error, --spacing-md, --radius-lg. Components referenced these tokens through Tailwind's theme config. Variants were implemented using a utility function similar to cva (Class Variance Authority): const buttonVariants = cva('base-classes', { variants: { variant: { primary: 'bg-blue-500 text-white', secondary: 'bg-gray-100 text-gray-800' }, size: { sm: 'px-3 py-1 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' }}}). This ensured consistent styling across all 35 components. Theming could be changed by overriding CSS custom properties at the root level, though we only supported the default theme. Sizes were always consistent: sm/md/lg applied the same scale across all components.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How did you version and distribute the library to 3 teams?",
        answer: "The component library was an internal npm package in our organization's private registry. We followed semantic versioning: patch for bug fixes, minor for new components or non-breaking additions, major for breaking changes. The build output included ESM and CJS bundles (using Rollup), TypeScript declarations, and CSS. Distribution: teams installed it via npm install @slb/marketplace-ui. We published automatically via CI — merging to main triggered a version bump and publish. For breaking changes (major versions), we created a migration guide and gave teams a 2-sprint deprecation period. We also published a changelog with every release. One challenge was CSS conflicts — we solved this by namespacing all our classes with a prefix and documenting Tailwind config requirements for consuming teams.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "3 teams adopted your library — how did you handle breaking changes?",
        answer: "We used a phased approach: 1) RFC (Request for Comments) — propose the breaking change in a shared document, gather feedback from all teams. 2) Deprecation warnings — mark old APIs as deprecated in the current minor version with console.warn messages pointing to the migration path. 3) Codemods — for mechanical changes (prop renames, import path changes), we wrote jscodeshift codemods that teams could run to auto-migrate. 4) Migration period — teams had 2 sprints (4 weeks) to migrate before we dropped the old API. 5) Dual support — during migration, both old and new APIs worked. For example, when we changed Button's color prop to variant, both worked in v2.x, and color was removed in v3.0. Communication was key — we had a Slack channel for the library where we announced changes and helped teams migrate. We learned to batch breaking changes into major releases instead of doing them frequently.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "How did you decide which components to include vs leave out?",
        answer: "We used a 'Rule of Three' — a component was added to the library only when three or more teams needed it, or when the same component was independently built twice. This prevented the library from becoming a dumping ground for one-off components. We started with foundational primitives: Button, Input, Select, Modal, Table, Card, Badge, Tooltip. Then added composite components as patterns emerged: SearchInput (debounced input with clear button), DataTable (sortable, paginated table), ConfirmDialog (modal with confirm/cancel). We excluded: highly app-specific components (ProductCard, OrderTimeline), components with complex business logic, and layout components that were too opinionated. The library focused on UI primitives that enforce design consistency without dictating application architecture.",
        difficulty: "mid",
        type: "cross"
      }
    ]
  },
  {
    id: "marketplace",
    title: "Marketplace Architecture",
    icon: "Mp",
    questions: [
      {
        question: "Walk me through the architecture of the Marketplace.",
        answer: "The Marketplace is an internal e-commerce platform at SLB for field engineers and rig workers to order tools and industrial supplies. Architecture: React.js SPA (with Next.js at ZopSmart, plain React at SLB) with TypeScript. Frontend is deployed as static files on AWS S3 behind CloudFront CDN. It communicates with a Node.js/Express backend via REST APIs. The backend handles authentication (JWT + SSO), product catalog (PostgreSQL), inventory management, order processing, and vendor management. Real-time stock updates flow through Socket.io. State management uses React Query for server state (API data with caching/invalidation) and local useState/useContext for UI state. The frontend is organized by feature: /catalog, /cart, /checkout, /orders, /admin. Shared components live in a Storybook-documented library used by 3 internal teams.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How did you design the product catalog for 10K SKUs? (pagination, caching, search)",
        answer: "The catalog used server-side pagination — the API returned 20 products per page with total count for pagination controls. Fetching all 10K products client-side was never an option. React Query managed the caching layer: each page of results was cached with a key like ['products', { page, category, sort, search }]. When users navigated back to a previously viewed page, data appeared instantly from cache while React Query revalidated in the background (stale-while-revalidate). For search, I implemented debounced input (300ms delay) so we didn't fire API calls on every keystroke. Category filters and price range sliders updated the query parameters, triggering a new API call. The product grid used virtualization for smooth scrolling even when displaying hundreds of items in a category. Prefetching the next page (React Query's prefetchQuery) made pagination feel instant.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "Explain the search UI — debounced input, category filters, price sliders, React Query caching.",
        answer: "The search UI had multiple coordinated filters: 1) Text search — a debounced input (custom useDebounce hook, 300ms delay) that sent the query only after the user stopped typing. 2) Category filters — a multi-select dropdown; selecting categories added them as query parameters. 3) Price range — a dual-thumb slider component from our library, with min/max values updating on drag end (not during drag to avoid excessive API calls). 4) Vendor selector — dropdown to filter by vendor. All filters were synced with URL query parameters using useSearchParams so the URL was shareable and bookmarkable. React Query's query key included all filter values: useQuery(['products', { search, categories, priceMin, priceMax, vendor, page }], fetchProducts). When any filter changed, React Query fetched fresh data while showing the previous results. Clear All Filters button reset all params simultaneously.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How does the real-time stock indicator work? (Socket.io integration on product pages)",
        answer: "When a user views a product page or the catalog, the frontend establishes a Socket.io connection and joins a room for visible products. The backend emits 'stock-update' events whenever inventory changes (from purchases, restocking, or admin updates). The frontend listens: socket.on('stock-update', ({productId, newStock}) => { queryClient.setQueryData(['product', productId], old => ({...old, stock: newStock})) }). This updates the React Query cache directly, so the UI reflects changes instantly without a full refetch. The stock indicator shows: green badge for 'In Stock' (>10 units), yellow for 'Low Stock' (1-10), red for 'Out of Stock' (0), which disables the Add to Cart button. When leaving the page, we socket.leave the product rooms to stop receiving updates. This prevented the common problem of users adding out-of-stock items to cart and discovering the issue only at checkout.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How does the cart → checkout → order tracking flow work?",
        answer: "Cart: managed in React state (initially Redux, later simplified to Context + useReducer). Cart data persisted to localStorage so it survived page refreshes. Adding items checked stock availability first via API call. The cart showed real-time total calculation with tax and shipping estimates. Checkout: multi-step form (shipping address → delivery options → review → confirm). Each step validated before allowing progression. On the review step, a final stock check ensured all items were still available — we had a cart reservation window of 15 minutes. Order placement: on confirm, the frontend sends the order to the backend, which creates the order record, reserves inventory (atomic database transaction), and returns an order ID. Order Tracking: order status progressed through Placed → Processing → Shipped → Delivered. Users could view order history with status badges. The backend updated status via webhooks from the fulfillment system.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How did you handle multi-vendor scenarios? (different vendors, different stock levels)",
        answer: "The Marketplace supported multiple vendors selling the same or different products across 40+ locations. Each product had a vendorId and location-specific stock levels. On the catalog page, products from different vendors appeared together, and users could filter by vendor. Stock was tracked per vendor per location — the same drill bit might be in stock from Vendor A in Location X but out of stock from Vendor B. The cart allowed items from multiple vendors, but the checkout showed items grouped by vendor with separate estimated delivery timelines. The order was split into sub-orders per vendor at the backend. For pricing, each vendor set their own prices, and the UI showed the price from the user's preferred/nearest vendor by default. A vendor comparison feature let users see prices and availability across vendors for the same product category.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "What was the hardest bug you fixed in the Marketplace?",
        answer: "The hardest was a race condition in the cart. Users could click 'Add to Cart' multiple times quickly, or from multiple browser tabs. The cart state in localStorage would get corrupted because multiple async operations were reading and writing simultaneously. Tab A reads cart (2 items), Tab B reads cart (2 items), Tab A writes cart (3 items), Tab B writes cart (3 items with different item) — Tab A's addition is lost. We fixed this with: 1) Optimistic locking — cart included a version number, and writes checked that the version hadn't changed. 2) Debouncing cart writes — batched rapid adds into a single write. 3) BroadcastChannel API — tabs communicated cart changes to each other in real-time. 4) Disabled the 'Add to Cart' button during the async operation with a loading state. This was hard because reproducing race conditions in testing was unreliable — we had to use targeted Cypress tests with artificial delays.",
        difficulty: "advanced",
        type: "cross"
      },
      {
        question: "If you had to rebuild the Marketplace from scratch, what would you change?",
        answer: "Three main things: 1) Use Next.js App Router from the start — Server Components would reduce bundle size significantly, and built-in data fetching with caching would replace a lot of our React Query setup. Even for an internal tool, the performance and DX improvements are worth it. 2) Use a dedicated state management solution like Zustand instead of the React Context + useReducer pattern we evolved into — Context caused unnecessary re-renders that we spent time optimizing away. 3) Implement a design system with design tokens from day one instead of adding the component library later — we had to retrofit consistency across existing pages, which was painful. I'd also consider using tRPC for type-safe API calls between our Node.js backend and React frontend, eliminating the manual API type definitions we maintained separately.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "How does your app handle offline/low-bandwidth scenarios for field workers?",
        answer: "We implemented a progressive approach: 1) Service Worker caching — static assets (JS, CSS, fonts) cached aggressively; API responses cached with stale-while-revalidate. The product catalog could be browsed offline after initial load. 2) Offline-first cart — cart operations worked offline by writing to localStorage and syncing when connectivity resumed. 3) Optimistic UI — actions like adding to cart showed immediate feedback, then synced with the server. If the sync failed (stock unavailable), we showed a notification. 4) Network status detection — navigator.onLine + periodic fetch to our health endpoint detected connectivity changes. A banner warned users when offline. 5) Data compression — API responses used brotli compression, pagination limited payload size, and images had quality variants for low-bandwidth. The app was usable but limited offline — product browsing worked, but checkout required connectivity for payment processing.",
        difficulty: "advanced",
        type: "cross"
      },
      {
        question: "What happens if Socket.io disconnects mid-checkout?",
        answer: "Socket.io disconnection during checkout doesn't break the flow because checkout doesn't depend on Socket.io — it uses standard HTTP API calls. Socket.io is only used for real-time stock indicators on catalog and product pages. However, the risk is: stock could change between the last Socket.io update and the checkout submission. We handle this with a final stock verification at two points: 1) When entering the review step — an API call confirms all items are still available at the expected quantities. If stock changed, we show a warning and let the user adjust. 2) On order submission — the backend atomically checks and reserves inventory in a database transaction. If any item is insufficient, the order fails with a specific error listing the affected items, and the frontend shows which items need adjustment. Socket.io has automatic reconnection built-in (exponential backoff), so brief disconnections resolve themselves. We also poll stock every 30 seconds as a fallback when Socket.io is disconnected.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "projects",
    title: "Other Projects",
    icon: "Pj",
    questions: [
      {
        question: "Food Delivery App: How does Intersection Observer-based infinite scroll work?",
        answer: "I placed a sentinel div at the bottom of the restaurant list. An Intersection Observer watches this element. When it enters the viewport (the user scrolls near the bottom), it triggers loading the next batch of restaurants. The implementation: a useInfiniteScroll custom hook that takes a callback (loadMore) and returns a ref to attach to the sentinel. Inside the hook, useEffect creates an IntersectionObserver with threshold 0.1 (triggers when 10% visible). The observer calls loadMore() which increments the page number and fetches the next 20 restaurants. A loading spinner shows during fetch, and when all data is loaded (hasMore becomes false), the observer disconnects. This handles 500+ restaurant cards smoothly because only 20 load at a time, and combined with lazy-loaded images, the initial page load is fast. The key advantage over scroll event listeners is performance — no calculations on every scroll pixel.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Food Delivery App: Explain your Redux Toolkit cart state with localStorage persistence.",
        answer: "The cart slice used createSlice from Redux Toolkit: state had items (array of {restaurant, item, quantity, price}), total, and itemCount. Reducers included addItem (checks if item exists, increments quantity or adds new), removeItem, updateQuantity, and clearCart. A key feature was restaurant validation — if the cart has items from Restaurant A and you add from Restaurant B, a confirmation dialog warns about clearing the existing cart (like Swiggy). For localStorage persistence, I used a Redux middleware that serialized the cart state to localStorage on every dispatch: store.subscribe(() => localStorage.setItem('cart', JSON.stringify(store.getState().cart))). On app load, createSlice's initialState reads from localStorage: initialState: JSON.parse(localStorage.getItem('cart')) || defaultState. This ensured cart data survived refreshes and browser restarts.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Chat App: How did you virtualize 10K+ messages with react-window?",
        answer: "I used VariableSizeList from react-window because messages have different heights (short text vs long text vs images). The challenge with chat is that new messages appear at the bottom, and you need to scroll to the latest message while allowing scrolling up to load history. Implementation: messages array was the data source, with a getItemSize function that estimated height based on message content length. For accurate heights, I used a resize observer pattern: render the message, measure its DOM height, cache it, and update react-window's item size. scrollToItem(messages.length - 1) auto-scrolls to the latest message. For loading older messages (cursor-based pagination), I detected when the user scrolled to the top, loaded the next page, prepended messages, and adjusted the scroll position to prevent jumping. The result: smooth scrolling through 10K+ messages with only ~15 DOM nodes rendered at any time.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "Chat App: How do typing indicators and presence badges work with Socket.io?",
        answer: "Typing indicators: when a user starts typing, the client emits 'typing-start' with {conversationId, userId}. I throttled this event to once every 2 seconds to reduce Socket.io traffic. The server broadcasts it to other users in the conversation room. On the receiving end, a 'User is typing...' indicator shows for 3 seconds, resetting on each new 'typing-start' event. If no event arrives within 3 seconds, the indicator hides (timeout-based clear). Presence badges: on connect, the client emits 'user-online'. The server maintains an online users Set and broadcasts presence changes. Other users see a green dot for online, gray for offline. On disconnect (page close, network loss), the server removes the user from the Set and broadcasts 'user-offline'. Socket.io's built-in reconnection handles temporary disconnects — the user briefly shows offline then comes back online automatically.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Are these real production apps or learning projects? How do they compare to your work at SLB?",
        answer: "The Food Delivery App and Chat App are personal projects — not deployed to production with real users. They were built to deeply understand patterns I'd only partially used at work: the Chat App to master real-time architecture (Socket.io, WebSocket patterns, presence systems) and the Food Delivery App to practice Redux Toolkit and infinite scroll patterns. However, they're not trivial demos — they handle real-world complexity: the Chat App manages 10K+ messages with virtualization, cursor-based pagination, and Redis pub/sub for horizontal scaling. The key difference from SLB work: these lack production concerns like monitoring, error tracking, A/B testing, accessibility compliance, and multi-team collaboration. But the architectural decisions and technical challenges are genuine. They reinforced patterns I later applied at SLB — for example, the Socket.io patterns from the Chat App directly helped when I implemented real-time stock indicators in the Marketplace.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "Food Delivery App: How did you implement the filtering and search functionality?",
        answer: "The app had multiple filter dimensions similar to Swiggy: cuisine type (multi-select), rating (4.0+, 4.5+), delivery time (under 30min, under 45min), price range (cost for two), and veg/non-veg toggle. Search was a text input that filtered by restaurant name and cuisine. All filtering was client-side since the initial dataset (~500 restaurants from the API) was small enough. I used useMemo to compute filtered results: const filtered = useMemo(() => restaurants.filter(r => matchesCuisine(r) && matchesRating(r) && matchesSearch(r)), [restaurants, filters, search]). Filters were managed in a useReducer with actions like SET_CUISINE, SET_RATING, CLEAR_ALL. The URL reflected filter state via query parameters so filtered views were shareable. Active filters showed as removable chips above the restaurant list, and a 'Clear All' button reset everything. Sort options (rating, delivery time, cost) were separate from filters.",
        difficulty: "mid",
        type: "concept"
      }
    ]
  },
  {
    id: "cross",
    title: "Cross Questions & Behavioral",
    icon: "Cr",
    questions: [
      {
        question: "Why React over Angular/Vue for the Marketplace?",
        answer: "Three reasons: 1) Team expertise — the SLB frontend team already had strong React experience, and hiring React developers is easier due to the larger talent pool. Switching to Angular or Vue would mean retraining the team and slower velocity for months. 2) Ecosystem maturity — React's ecosystem for our needs (React Query for data fetching, Storybook for component docs, Testing Library for tests, react-window for virtualization) was the most mature and well-supported. 3) Organizational alignment — other internal SLB tools used React, so shared component libraries and developer mobility between teams favored React. Vue would have been a fine technical choice (lighter, simpler reactivity), and Angular's opinionated structure has advantages for large teams, but React was the pragmatic choice given our context.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "Why Tailwind over styled-components or CSS modules?",
        answer: "We evaluated all three. styled-components had runtime overhead (generating CSS in the browser) which conflicted with our performance goals for low-bandwidth field environments. CSS modules provided scoping but didn't enforce design consistency — developers could write any arbitrary CSS values. Tailwind gave us: zero runtime cost (CSS generated at build time), built-in design constraints (consistent spacing, colors, sizing from the default scale), extremely fast development once the team learned the utility classes, and excellent responsive design support. The main pushback was 'ugly class names in JSX,' but we mitigated that with component extraction — common patterns became reusable components in our library. The decision was validated when we achieved our Lighthouse performance targets partly because of Tailwind's minimal CSS output.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "Why Redux Toolkit in Food Delivery but React Query at SLB?",
        answer: "Different problems, different tools. In the Food Delivery App, the main state challenge was client-side cart management — adding items, managing quantities, cross-restaurant validation, localStorage persistence. This is client state that doesn't sync with a server in real-time. Redux Toolkit excels here with createSlice and predictable state updates. At SLB's Marketplace, the main challenge was server data — product catalogs, orders, inventory. This is server state that needs caching, background refetching, pagination, and invalidation. React Query is purpose-built for this: it handles cache management, stale-while-revalidate, optimistic updates, and request deduplication. Using Redux for server state would mean writing cache logic, loading/error states, and refetch logic manually. The Marketplace's cart used simple Context because its client state needs were simpler than the Food Delivery App's.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "What's a technical decision you regret?",
        answer: "Early in the Marketplace, I used React Context + useReducer for the cart instead of a simpler solution. As the cart grew complex (multi-vendor, stock validation, price calculations, promotion codes), the Context re-rendered too many consumers. We had to add memoization everywhere and split into multiple contexts. In hindsight, a dedicated state library like Zustand would have been simpler — it provides fine-grained subscriptions (components only re-render when their specific data changes), and the API is much simpler than useReducer for complex state. Another smaller regret: not implementing the component library from day one. We built components ad-hoc for the first 3 months, then had to refactor everything into the library. Starting with the library would have saved significant rework and ensured consistency from the beginning.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "How do you handle disagreements with backend developers about API design?",
        answer: "I approach it collaboratively, focusing on the end-user experience. For example, we disagreed about whether the product search API should return nested vendor objects or just vendor IDs (requiring a separate call). I demonstrated the UX impact: with vendor IDs only, the product list would show blank vendor names while a second API call completed, causing visible layout shifts. I proposed a middle ground — a lightweight vendor summary (id, name, logo) embedded in the product response, with the full vendor object available via a separate endpoint when needed. The key is bringing data to the discussion: I showed network waterfall diagrams, measured the UX impact, and proposed a solution that balanced backend concerns (response size) with frontend needs (immediate rendering). We established API design guidelines together — shared documentation that both teams agreed on.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "Tell me about a time you had to learn something quickly for a deadline.",
        answer: "When we decided to add real-time stock indicators to the Marketplace, I had no Socket.io experience. The feature was needed in 2 weeks to address a high-priority issue: field engineers were ordering items shown as 'in stock' that were actually sold out, causing frustration and order cancellations. I spent the first 2 days understanding WebSocket fundamentals and Socket.io's API through docs and small prototypes. Days 3-5, I implemented the basic integration: connection management, room-based subscriptions, and event handling. Week 2 was spent on edge cases: reconnection logic, handling stale data on page re-entry, and integrating with React Query's cache. The personal Chat App project I was already building on the side actually helped — I had already explored Socket.io patterns for typing indicators. I shipped on time, and the feature reduced 'out of stock after order' complaints by ~80%.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "How do you prioritize tech debt vs feature work?",
        answer: "I categorize tech debt by impact: 1) Blocking debt — things that slow down every developer or cause bugs (flaky tests, broken CI, unclear patterns). These get fixed immediately, even within feature sprints. 2) Strategic debt — things that will compound if not addressed (outdated dependencies, missing TypeScript types, inconsistent component APIs). I advocate for dedicating ~15-20% of each sprint to these, or scheduling dedicated tech debt sprints quarterly. 3) Nice-to-have debt — code that works but could be cleaner. This gets addressed opportunistically when working in the area. At SLB, I successfully pitched our component library refactoring as strategic debt — I showed that 3 teams were building duplicate components, each with different bugs. The library investment paid off in reduced development time within 2 months. The key is quantifying the impact: 'this refactor saves 2 hours per developer per week' is more convincing than 'this code is messy.'",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "What's the most complex UI problem you've solved?",
        answer: "The most complex was the multi-filter search UI with real-time updates for 10K SKUs. The challenge was coordinating multiple filter dimensions (text search, categories, price range, vendor, stock status) while maintaining responsive performance. Each filter change triggered an API call, and rapid filter changes caused race conditions — results from an older query could arrive after a newer query's results, showing stale data. The solution combined: 1) Debouncing — 300ms delay on text input, drag-end only for price slider. 2) Request cancellation — using AbortController to cancel in-flight requests when new filters are applied. 3) React Query's query keys — ensuring each unique filter combination had its own cached result. 4) URL sync — all filters reflected in URL params for shareability. 5) Optimistic UI — showing a subtle loading indicator without removing current results. The coordination between URL state, API state, React Query cache, and UI state across 5+ filter types was the most architecturally challenging UI work I've done.",
        difficulty: "advanced",
        type: "behavioral"
      },
      {
        question: "How do you stay updated with the latest frontend technologies?",
        answer: "I follow a structured approach: 1) Weekly reading — I follow the React blog, Next.js releases, and newsletters like JavaScript Weekly and React Status. 2) Twitter/X — I follow core team members (Dan Abramov, Sebastian Markbage, Lee Robinson) and community leaders for early insights on upcoming features. 3) Side projects — my Food Delivery and Chat App projects are learning sandboxes where I try new patterns before using them at work. 4) Conference talks — I watch recordings from React Conf, Next.js Conf, and JSConf. 5) Code reviews — reviewing teammates' code exposes me to patterns I might not have used. 6) DSA practice — 300+ problems on LeetCode keep my algorithmic thinking sharp. I don't chase every new framework or library — I evaluate whether it solves a real problem we have before investing time in learning it deeply.",
        difficulty: "beginner",
        type: "behavioral"
      },
      {
        question: "What Excellence Award at SLB was for — can you describe the specific contributions?",
        answer: "I received the Excellence Award for 3 consecutive quarters based on three main contributions: 1) Q1 — building and shipping the shared component library (35 components) that was adopted by 3 teams, reducing cross-team development effort by ~30% and establishing design consistency. 2) Q2 — the Lighthouse performance improvement project (mid-60s to 90+) which directly improved user experience for field engineers on low-bandwidth connections and reduced bounce rates by ~25%. 3) Q3 — implementing the real-time stock indicator feature with Socket.io that reduced 'out of stock after order' issues by ~80%, saving operational costs and improving user trust. Beyond features, consistent code quality, thorough code reviews, and mentoring 2 junior developers contributed to the recognition. The award was peer-nominated and manager-approved, reflecting impact on both the product and the team.",
        difficulty: "beginner",
        type: "behavioral"
      }
    ]
  }
];
