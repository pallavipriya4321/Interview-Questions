export const fullstackTopics = [
  {
    id: "javascript",
    title: "JavaScript & TypeScript",
    icon: "JS",
    questions: [
      {
        question: "How does the JavaScript event loop work? How does it differ in Node.js vs the browser?",
        answer: "Both environments use an event loop but with different implementations. The browser event loop handles DOM events, setTimeout, requestAnimationFrame, and microtasks (Promises). Node.js uses libuv's event loop with 6 phases: timers → pending callbacks → idle/prepare → poll → check → close callbacks. Key difference: Node.js has setImmediate() (runs in the check phase) and process.nextTick() (runs before any phase transition, higher priority than Promises). In the browser, requestAnimationFrame fires before the next repaint. Understanding this was critical when building the Marketplace — on the frontend, I needed to avoid blocking the rendering phase, and on the backend, I needed to understand how async I/O operations in Express handlers were scheduled.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "Explain closures and how they're used in both frontend and backend code.",
        answer: "A closure is a function that captures variables from its enclosing scope. The inner function retains access even after the outer function returns. On the frontend, I used closures in debounce functions for search input and in useCallback to capture specific product IDs. On the backend, closures are everywhere in Express middleware: function authMiddleware(requiredRole) { return (req, res, next) => { if (req.user.role !== requiredRole) return res.status(403).json({error: 'Forbidden'}); next(); }; } — the inner middleware closes over requiredRole. This factory pattern allowed us to create role-specific middleware: app.get('/admin', authMiddleware('admin'), handler). Closures also power our database connection pooling — the pool is captured in the closure scope of query functions.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain design patterns you've used: Singleton, Factory, Observer, Strategy.",
        answer: "Singleton: Our database connection pool — one instance shared across the app. I used a module-level variable: let pool; function getPool() { if (!pool) pool = createPool(config); return pool; }. Node.js modules are cached after first require, which naturally creates singletons. Factory: The authMiddleware factory above creates different middleware based on role. Also used in our API error handler: createError(404, 'Product not found') creates consistent error objects. Observer: Socket.io is essentially the Observer pattern — clients subscribe to events, the server notifies all subscribers. We also used EventEmitter in the backend to decouple order processing: orderEmitter.emit('order-placed', order) triggers inventory updates, email notifications, and analytics. Strategy: Our pricing calculator accepts different strategies (standard, bulk, promotional) for computing order totals.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are Proxy and Reflect in JavaScript? Use cases?",
        answer: "Proxy wraps an object and intercepts operations like property access (get), assignment (set), function calls (apply), and more. Reflect provides the default behavior for these operations. Example: const logged = new Proxy(api, { get(target, prop, receiver) { console.log(`Accessing ${prop}`); return Reflect.get(target, prop, receiver); }}). Use cases: validation (reject invalid property assignments), logging/debugging (track property access), reactive systems (Vue 3 uses Proxy for reactivity), default values (return defaults for missing properties), and access control (prevent writes to certain properties). I haven't used Proxy extensively in production but understand its value — libraries like Immer use Proxy to enable 'mutable' syntax while producing immutable updates, which Redux Toolkit leverages internally in createSlice reducers.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "Explain the module system: CommonJS vs ESM — how does Node.js handle both?",
        answer: "CommonJS (CJS) uses require() and module.exports. It's synchronous — modules load and execute immediately. ESM uses import/export syntax. It's asynchronous and supports static analysis for tree shaking. Node.js determines the module system by: .cjs files → CommonJS, .mjs files → ESM, .js files → check nearest package.json's 'type' field ('module' for ESM, 'commonjs' or absent for CJS). You can use ESM import in CJS with dynamic import() (returns a Promise), and use CJS modules in ESM with createRequire(). In the Marketplace backend, we used CommonJS (older Node.js project), but newer projects like the Chat App used ESM. The key practical difference: ESM enables tree shaking (bundlers remove unused exports), top-level await, and proper circular dependency handling. CJS is simpler for Node.js scripts but ESM is the future and is now supported natively.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do Promises work internally? Explain async/await error handling patterns.",
        answer: "A Promise is a state machine: pending → fulfilled/rejected. It maintains internal lists of onFulfilled and onRejected handlers added via .then/.catch. When resolved/rejected, handlers execute as microtasks. .then returns a NEW Promise, enabling chaining. For async/await error handling, I use try/catch blocks: try { const data = await fetchProduct(id); } catch (error) { if (error.status === 404) return res.status(404).json({message: 'Not found'}); throw error; }. In Express, I use an asyncHandler wrapper to catch unhandled rejections: const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next). This sends errors to Express's error middleware instead of crashing the process. For parallel operations, Promise.all fails fast on any rejection; Promise.allSettled waits for all and reports individual results — I used allSettled when fetching stock from multiple vendors where some might fail.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain prototypal inheritance and how it relates to ES6 classes.",
        answer: "JavaScript uses prototypal inheritance — objects inherit directly from other objects via the [[Prototype]] chain. When accessing a property, JS walks up the chain: object → object.__proto__ → Object.prototype → null. ES6 classes are syntactic sugar over this mechanism. class Product extends BaseModel {} creates a constructor function whose prototype inherits from BaseModel.prototype. Methods defined in the class body go on Product.prototype. static methods go on Product itself. The 'super' keyword calls the parent constructor or method. Key differences from classical OOP: prototypes can be modified at runtime (add methods to all instances dynamically), there's no true encapsulation (private fields are recent with #syntax), and JavaScript supports mixins/multiple inheritance patterns through Object.assign or class factories — something we used for our model classes in the backend.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are generators and how are they used in real-world Node.js applications?",
        answer: "Generators (function*) are functions that can pause execution at yield points and resume later. They return iterators where each next() call runs until the next yield. Real-world uses in Node.js: 1) Lazy data processing — reading large CSV files line by line without loading everything into memory: function* readLines(file) { for (const line of file) yield parseLine(line); }. 2) Redux-Saga used generators for complex async flows (though we used createAsyncThunk). 3) Koa.js (Express alternative) originally used generators for middleware. 4) Testing — generators can control async flow step by step, making tests deterministic. 5) Infinite sequences — generating sequential IDs or timestamps on demand. I've used them less in production but understand they're powerful for controlling flow and managing memory with large datasets in Node.js streams and batch processing jobs.",
        difficulty: "advanced",
        type: "concept"
      }
    ]
  },
  {
    id: "react-nextjs",
    title: "React & Next.js",
    icon: "Re",
    questions: [
      {
        question: "Explain the Virtual DOM and React Fiber architecture.",
        answer: "The Virtual DOM is a lightweight JS representation of the real DOM. On state change, React creates a new VDOM tree, diffs it against the old one (reconciliation), and applies minimal DOM updates. React Fiber (v16+) reimplemented reconciliation as a linked list of 'fiber' nodes (units of work) that can be paused, resumed, and prioritized. Each fiber links to child, sibling, and parent. In the old stack reconciler, rendering was synchronous and blocked the main thread. Fiber enables concurrent features: time-slicing (breaking work into chunks yielding to the browser between them), Suspense (pausing render while data loads), and transitions (marking updates as non-urgent). This matters for our Marketplace — when filtering 10K SKUs, Fiber prevents the UI from freezing during the expensive re-render by yielding to handle user input between fiber units.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How do React Server Components work? What are the trade-offs?",
        answer: "Server Components run exclusively on the server — their code never reaches the browser bundle. They can directly access databases, file systems, and secrets. They send rendered HTML + a special RSC payload (serialized component tree) to the client. Client Components (marked 'use client') run on both server (SSR) and client (hydration + interactivity). Trade-offs: Server Components reduce bundle size dramatically and improve initial load, but they can't use state, effects, or browser APIs. The boundary between Server and Client Components requires careful thinking — you can pass Server Components as children to Client Components but not import Server Components inside Client Components. In the Marketplace, Server Components would be ideal for the product listing page — data fetching and rendering on the server, with only the interactive bits (cart button, search input) as Client Components.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "Explain SSR vs SSG vs ISR — when would you use each?",
        answer: "SSR renders HTML on every request — good for personalized, real-time data. SSG renders at build time — fastest, served from CDN, ideal for content that rarely changes. ISR is the hybrid — serves static pages but revalidates in the background after a set interval. At ZopSmart: SSG for marketing pages (rebuilt on deploy), SSR for product listings (real-time inventory), ISR for product details (revalidate every 60s). For the Marketplace, we used a React SPA (no SSR/SSG) because it's an internal tool behind auth with no SEO needs. If rebuilding, I'd use Next.js App Router with Server Components — they give SSR-like benefits (reduced bundle, server-side data fetching) without the per-request HTML generation overhead. The choice depends on: data freshness needs, SEO requirements, personalization, and infrastructure constraints.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you optimize React performance? Explain memo, useCallback, useMemo.",
        answer: "React.memo wraps a component to skip re-rendering if props haven't changed (shallow comparison). useCallback memoizes function references so they remain stable across renders — essential when passing callbacks to memoized children. useMemo memoizes computed values — avoids expensive recalculations on every render. In the Marketplace: React.memo on ProductCard (parent re-renders on filter changes, but individual cards only re-render if their data changes). useCallback on addToCart handler passed to each ProductCard — without it, a new function reference on each render defeats React.memo. useMemo for filtered/sorted product lists: const filtered = useMemo(() => products.filter(...).sort(...), [products, filters, sort]). Key insight: don't memoize everything — it has memory cost and adds complexity. Profile first with React DevTools Profiler, then optimize the actual bottlenecks.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Next.js caching layers and data fetching patterns.",
        answer: "Next.js App Router has 4 cache layers: 1) Request Memoization — deduplicates identical fetch calls within a single render tree (e.g., layout and page both fetching user data). 2) Data Cache — server-side cache for fetch results, persists across requests. Control with { cache: 'no-store' } or { next: { revalidate: 60 } }. 3) Full Route Cache — pre-rendered HTML and RSC payload cached at build time for static routes. 4) Router Cache — client-side cache of visited pages for instant back-navigation. Data fetching in App Router uses async Server Components directly: async function ProductPage({ params }) { const product = await fetch(...); }. No getServerSideProps needed. For client-side data, we use React Query with its own cache layer. Understanding which cache is stale is the hardest debugging challenge — I've been burned by the Full Route Cache serving stale data after a database update.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "What are custom hooks? Give examples from your projects.",
        answer: "Custom hooks are functions starting with 'use' that encapsulate reusable stateful logic. They can use other hooks and compose together. Examples from my projects: useDebounce(value, delay) — returns a debounced value for search input, uses useState + useEffect with setTimeout/clearTimeout. useInfiniteScroll(callback) — uses useRef for sentinel element + IntersectionObserver in useEffect, returns ref to attach. useLocalStorage(key, initial) — syncs state with localStorage, handles SSR (returns initial if window is undefined). useMediaQuery(query) — wraps window.matchMedia in state for responsive behavior. useSocket(event, handler) — manages Socket.io subscription lifecycle, connects on mount, disconnects on unmount. In the Marketplace, custom hooks kept components clean — a ProductCard doesn't know about debouncing or Socket.io, it just uses useStockLevel(productId) which internally manages the Socket.io subscription.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does React's Context API work? When should you avoid it?",
        answer: "Context provides a way to pass data through the component tree without prop drilling. createContext creates a context, Provider wraps the tree with a value, and useContext consumes it. Internally, when Provider's value changes (by reference), React traverses the tree and re-renders all consumers. Avoid Context when: 1) The value changes frequently (e.g., mouse position) — it causes all consumers to re-render. 2) Many consumers only need a small part of the context — changing user.name re-renders components that only use user.theme. Solutions: split into separate contexts, use useMemo on the value object, or use a state library like Zustand that supports fine-grained subscriptions. In the Marketplace, we split into AuthContext, CartContext, and UIContext. For server state (products, orders), React Query was the right choice — it doesn't cause the cascade re-render problem.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "You used Next.js at ZopSmart but React SPA at SLB — how did you decide?",
        answer: "At ZopSmart, the product was consumer-facing e-commerce needing SEO (product pages indexed by Google) and fast first contentful paint for conversion rates. Next.js SSR/SSG was essential. At SLB, the Marketplace is an internal tool behind corporate SSO — no SEO needed. A React SPA was simpler: static files on S3 + CloudFront, no Node.js server needed in production, simpler deployment pipeline, and the team was more experienced with client-side React. The trade-off was slightly slower initial load but simpler infrastructure. If rebuilding today, I'd choose Next.js App Router even for internal tools — Server Components reduce bundle size significantly, and the simplified data fetching model with async components is better DX. The infrastructure concern is no longer valid since Vercel makes Next.js deployment trivial, and the performance benefits extend to even internal apps.",
        difficulty: "mid",
        type: "cross"
      }
    ]
  },
  {
    id: "nodejs",
    title: "Node.js & Express",
    icon: "No",
    questions: [
      {
        question: "How does the Node.js event loop work? How is it different from the browser's?",
        answer: "Node.js uses libuv's event loop with 6 phases: 1) Timers — executes setTimeout/setInterval callbacks. 2) Pending callbacks — system-level callbacks (TCP errors). 3) Idle/prepare — internal use. 4) Poll — retrieves I/O events, executes I/O callbacks; blocks here if nothing else is scheduled. 5) Check — executes setImmediate() callbacks. 6) Close — socket.on('close') callbacks. Between each phase, the microtask queue is drained (process.nextTick first, then Promises). The browser event loop is simpler: macrotask → all microtasks → render → repeat. Key differences: Node.js has setImmediate (no browser equivalent), process.nextTick (higher priority than Promise microtasks), and the poll phase that blocks for I/O. Understanding this is critical for backend performance — a CPU-intensive synchronous operation in a request handler blocks the entire event loop, preventing all other requests from being processed.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How does Express middleware work? What middleware chain did you use?",
        answer: "Express middleware are functions with (req, res, next) signature that execute sequentially. Each middleware can: modify req/res, end the response, or call next() to pass control to the next middleware. Our chain: 1) cors() — CORS headers for frontend access. 2) helmet() — security headers (CSP, HSTS, X-Frame-Options). 3) express.json() — parse JSON request bodies. 4) requestLogger — custom middleware logging method, URL, timestamp, and response time. 5) authMiddleware — validates JWT token from Authorization header, attaches user to req.user. 6) rbacMiddleware — checks user role against route permissions. 7) Route handlers. 8) Error middleware — catches all errors, formats consistent error responses. The order matters — auth must come before RBAC, and error middleware must be last (it takes 4 params: err, req, res, next). We also used express-rate-limit on auth routes to prevent brute force attacks.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you handle errors in Express? (error middleware, try-catch, async wrapper)",
        answer: "Three layers: 1) async wrapper — wraps route handlers to catch unhandled Promise rejections: const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next). Without this, unhandled rejections crash the server. 2) Explicit try-catch in handlers for expected errors: try { const product = await Product.findById(id); if (!product) throw createError(404, 'Product not found'); } catch (err) { next(err); }. 3) Global error middleware (must have 4 params): app.use((err, req, res, next) => { const status = err.status || 500; res.status(status).json({ error: err.message, ...(isDev && {stack: err.stack}) }) }). We also used custom error classes: class NotFoundError extends Error { constructor(resource) { super(); this.status = 404; this.message = `${resource} not found`; }}. And process.on('unhandledRejection') and 'uncaughtException' as last-resort handlers to log and gracefully shut down.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Node.js streams — when would you use them?",
        answer: "Streams process data in chunks without loading everything into memory. Four types: Readable (fs.createReadStream), Writable (fs.createWriteStream), Transform (modify data in transit), Duplex (both read/write, like TCP sockets). Use cases: 1) Large file processing — reading a 2GB CSV file line by line instead of loading into memory. 2) HTTP responses — streaming a large JSON array to the client as items are fetched from the database. 3) File uploads — piping the request stream to disk: req.pipe(fs.createWriteStream(path)). 4) Data transformation — compressing responses: stream.pipe(zlib.createGzip()).pipe(res). In the Marketplace backend, I used streams for bulk product export (CSV download of 10K products) — generating and sending the CSV row by row instead of building the entire file in memory. Streams are composable via .pipe(), and Node's async iterators (for await...of) make them easier to work with in modern code.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "What is clustering in Node.js? How do you scale a Node.js server?",
        answer: "Node.js runs single-threaded, so a single process uses only one CPU core. The cluster module forks multiple worker processes that share the same port. The master process distributes incoming connections to workers using round-robin (default on Linux) or OS-level load balancing. Implementation: if (cluster.isPrimary) { for (let i = 0; i < numCPUs; i++) cluster.fork(); cluster.on('exit', (worker) => cluster.fork()); } else { app.listen(3000); }. In production, we use PM2 which handles clustering, process management, auto-restart, and zero-downtime reloads. Beyond clustering: horizontal scaling with multiple server instances behind a load balancer (AWS ALB), Docker containers with Kubernetes or ECS for orchestration. For the Chat App, clustering introduced a challenge — Socket.io connections on different workers couldn't communicate. We solved this with the Redis adapter (@socket.io/redis-adapter), which broadcasts events across all workers via Redis pub/sub.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "How do you handle file uploads in Node.js?",
        answer: "We use multer middleware for multipart/form-data file uploads. Configuration: const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => { if (['image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true); else cb(new Error('Invalid file type')); }}). For the Marketplace product images: the upload goes to multer's memory storage (buffer), then we process it (resize with sharp library), then upload to AWS S3, and store the S3 URL in the database. For large files, we use multer's disk storage or stream directly to S3 using the AWS SDK's upload method with a readable stream. Security considerations: always validate file type (check magic bytes, not just extension), set size limits, scan for malware in production, generate unique filenames (UUID) to prevent path traversal attacks, and never serve uploaded files from the same domain without sanitization.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is the difference between process.nextTick() and setImmediate()?",
        answer: "process.nextTick() adds a callback to the microtask queue — it runs BEFORE the event loop continues to the next phase. setImmediate() adds a callback to the check phase — it runs AFTER the current poll phase completes. process.nextTick has higher priority: nextTick callbacks run before any I/O, before Promises, and before setImmediate. This means excessive process.nextTick can starve I/O (the event loop never reaches the poll phase). setImmediate is generally safer for deferring work because it doesn't block I/O. Practical use: process.nextTick for ensuring a callback runs after the current operation but before any I/O (e.g., emitting events after constructor completion). setImmediate for breaking up CPU-intensive work to yield to I/O between chunks. In most application code, we use neither — Promises and async/await handle async flow naturally. These are more relevant for library/framework authors.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "You wrote REST APIs for orders and inventory — how did you handle concurrent orders for the same item?",
        answer: "This is a classic race condition problem. Two users order the last item simultaneously: both read stock=1, both proceed, both decrement stock, resulting in stock=-1 and two fulfilled orders for one item. We solved this at the database level using PostgreSQL's transactional guarantees. The order placement uses a serializable transaction: BEGIN; SELECT stock FROM products WHERE id=$1 FOR UPDATE (row-level lock); if stock >= requested quantity, UPDATE stock and INSERT order; COMMIT. The FOR UPDATE clause locks the row — the second concurrent transaction waits until the first commits or rolls back. If stock is insufficient after acquiring the lock, we roll back and return a 409 Conflict response. We also added an application-level check before starting the transaction (optimistic check) to avoid acquiring locks unnecessarily for clearly out-of-stock items. The real-time stock indicators via Socket.io reduce the chance of this scenario but can't eliminate it.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "api-design",
    title: "REST API Design",
    icon: "AP",
    questions: [
      {
        question: "How do you design a RESTful API? Explain your naming conventions.",
        answer: "REST APIs use HTTP methods as verbs acting on noun-based URLs. Conventions I follow: plural nouns for collections (/products, /orders), nested resources for relationships (/vendors/{id}/products), consistent naming (kebab-case for URLs: /order-items). HTTP methods map to CRUD: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE. Status codes: 200 (success), 201 (created), 204 (no content for DELETE), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 409 (conflict), 422 (validation error), 500 (server error). In the Marketplace: GET /products?category=tools&page=2 for filtered listing, POST /orders for placing an order, PATCH /products/:id for updating stock. I return consistent response envelopes: { data, meta: { page, totalPages, total } } for lists, { data } for single resources, { error: { message, code } } for errors.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain idempotency — which HTTP methods are idempotent and why does it matter?",
        answer: "An idempotent operation produces the same result regardless of how many times it's called. GET, PUT, DELETE are idempotent: GET /product/1 always returns the same product; PUT /product/1 with the same body always results in the same state; DELETE /product/1 — first call deletes it, subsequent calls return 404 but the end state is the same (product is gone). POST is NOT idempotent: POST /orders creates a new order each time. This matters for reliability: if a network request fails and the client retries, idempotent operations are safe to retry. Non-idempotent operations can cause duplicates. For the Marketplace order placement (POST), we implemented idempotency keys: the client sends a unique key (UUID) with each request, and the server checks if that key was already processed. If so, it returns the cached response. This prevents double-ordering when users click 'Place Order' and the request times out.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How did you implement server-side pagination for the product catalog?",
        answer: "We used offset-based pagination for the product catalog: GET /products?page=2&limit=20&sort=price&order=asc. The API returns: { data: [...20 products], meta: { page: 2, limit: 20, total: 10000, totalPages: 500 } }. The SQL query uses LIMIT and OFFSET: SELECT * FROM products WHERE category=$1 ORDER BY price ASC LIMIT 20 OFFSET 20. For the Chat App, we used cursor-based pagination instead: GET /messages?cursor=msg_abc123&limit=50. The cursor is the ID of the last message seen. Query: SELECT * FROM messages WHERE conversation_id=$1 AND created_at < $cursor_timestamp ORDER BY created_at DESC LIMIT 50. Cursor pagination is better for real-time data (no skipping/duplicating when new items are added) and performs better on large datasets (no OFFSET scanning). Offset is simpler for catalogs where users jump to specific pages.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you version APIs? When is versioning necessary?",
        answer: "Common approaches: URL path versioning (/api/v1/products, /api/v2/products), header versioning (Accept: application/vnd.marketplace.v2+json), or query parameter (?version=2). I prefer URL path versioning — it's explicit, easy to route, and works with all HTTP clients without special header support. Versioning is necessary when you make breaking changes: removing or renaming fields, changing response structure, altering authentication mechanisms, or modifying business logic that affects clients. Non-breaking changes (adding new optional fields, new endpoints) don't need versioning. In the Marketplace, we maintained v1 and v2 simultaneously during a major refactor. v1 returned flat product objects; v2 returned nested objects with vendor details. Both versions shared the same database and business logic — only the serialization layer differed. After a migration period, we deprecated v1 with a sunset header and removed it 3 months later.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain rate limiting — how would you implement it?",
        answer: "Rate limiting restricts how many requests a client can make in a time window. Implementation options: 1) Fixed window — count requests in fixed intervals (e.g., 100 requests per minute). Simple but has burst issues at window boundaries. 2) Sliding window — smoother but more memory-intensive. 3) Token bucket — clients get tokens at a fixed rate; each request costs a token. Allows bursts while maintaining average rate. In Express, I used express-rate-limit middleware: const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, keyGenerator: (req) => req.user?.id || req.ip }). For production with multiple server instances, we stored counts in Redis (rate-limit-redis adapter) so limits are shared across instances. Auth endpoints had stricter limits (5 login attempts per 15 minutes) to prevent brute force. The API returns 429 Too Many Requests with a Retry-After header indicating when the client can try again.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do Webhooks work? Where did you use them?",
        answer: "Webhooks are HTTP callbacks — instead of polling an API for changes, you register a URL where the service sends POST requests when events occur. The webhook provider sends a payload describing the event. Implementation: the consumer exposes an endpoint (POST /webhooks/payment), the provider sends event data to that URL when something happens (payment completed, refund issued). In the Marketplace, we received webhooks from the payment gateway for order status updates: payment_success, payment_failed, refund_processed. Our webhook handler verified the signature (HMAC using a shared secret) to ensure the request was legitimate, processed the event idempotently (using the event ID to prevent double processing), and updated the order status. We also sent webhooks to the fulfillment system when new orders were placed. Key considerations: verify signatures, handle retries (webhooks retry on failure), process asynchronously (acknowledge with 200 immediately, process in background), and implement idempotency.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Your catalog has 10K SKUs with filters and search — how does the API handle complex queries efficiently?",
        answer: "The API uses a combination of database optimization and smart query building. The endpoint accepts query parameters: GET /products?search=drill&category=tools&priceMin=50&priceMax=500&vendor=acme&sort=price&order=asc&page=1&limit=20. On the backend, I build the SQL query dynamically: start with a base query, add WHERE clauses for each active filter using parameterized queries (prevent SQL injection), apply full-text search using PostgreSQL's tsvector/tsquery for text search (much faster than LIKE '%term%'). Indexes are critical: composite index on (category, price) for category+price range queries, GIN index on the search vector for full-text search, index on vendor_id for vendor filtering. The API also supports sparse fieldsets (fields=id,name,price,thumbnail) to reduce payload size — list views don't need full product descriptions. Response compression (brotli/gzip) further reduces transfer size. With proper indexing, complex filtered queries return in <200ms even with 10K products.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "auth",
    title: "Authentication & Security",
    icon: "Au",
    questions: [
      {
        question: "Explain JWT — header, payload, signature. Where do you store tokens?",
        answer: "A JWT has three Base64-encoded parts separated by dots. Header: { alg: 'HS256', typ: 'JWT' } — algorithm and type. Payload: claims like { sub: userId, role: 'admin', iat: timestamp, exp: timestamp }. Signature: HMAC-SHA256(base64(header) + '.' + base64(payload), secret) — verifies the token hasn't been tampered with. Storage options: httpOnly cookies (secure, immune to XSS, but vulnerable to CSRF — mitigated with SameSite attribute) or localStorage (accessible to JavaScript, vulnerable to XSS). In the Marketplace, we use httpOnly cookies with SameSite=Strict for the refresh token (never accessible to JS) and an in-memory variable for the access token (short-lived, 15 min). We avoided localStorage for tokens because any XSS vulnerability would expose them. The access token is attached to API requests via Authorization: Bearer <token> header.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do refresh tokens work? What's the rotation strategy?",
        answer: "Access tokens are short-lived (15 minutes) so compromised tokens have limited impact. When they expire, instead of re-authenticating, the client sends the refresh token (long-lived, 7 days) to get a new access token. Our rotation strategy: each time a refresh token is used, the server issues BOTH a new access token AND a new refresh token, invalidating the old refresh token. This is called refresh token rotation. If someone steals and uses the old refresh token, the server detects reuse (the token was already rotated), invalidates ALL refresh tokens for that user (force re-login), and logs a security event. Implementation: refresh tokens are stored in a database table with userId, tokenHash, and expiresAt. On rotation, the old token is marked as used. On reuse detection, all tokens for that user are deleted. The client handles token refresh transparently using an Axios interceptor that catches 401 responses and retries with a fresh token.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "Explain your RBAC implementation — 5 roles, 30 routes. How did you design the permission model?",
        answer: "We defined 5 roles: Admin, Manager, Vendor, FieldEngineer, Viewer. The permission model uses a permissions matrix stored as configuration: const permissions = { '/products': { GET: ['*'], POST: ['Admin', 'Vendor'], PUT: ['Admin', 'Vendor'], DELETE: ['Admin'] }, '/orders': { GET: ['Admin', 'Manager', 'FieldEngineer'], POST: ['FieldEngineer'] }, ... }. The RBAC middleware reads the user's role from the JWT (attached by auth middleware) and checks against the permissions matrix: function rbac(req, res, next) { const route = req.baseUrl; const method = req.method; const allowed = permissions[route]?.[method]; if (!allowed || (!allowed.includes('*') && !allowed.includes(req.user.role))) return res.status(403).json({error: 'Insufficient permissions'}); next(); }. The matrix is defined in a config file, so adding a new role or changing permissions doesn't require code changes — just update the config and redeploy. We considered attribute-based access control (ABAC) but RBAC was sufficient for our 5-role structure.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How does SSO via SAML work? Walk me through the flow.",
        answer: "SAML (Security Assertion Markup Language) enables Single Sign-On with the corporate identity provider (IdP). The flow: 1) User visits the Marketplace (Service Provider/SP). 2) SP checks — no session, so it redirects the browser to the corporate IdP login page with a SAML AuthnRequest (Base64-encoded XML). 3) User authenticates with the IdP (corporate credentials, possibly MFA). 4) IdP generates a SAML Response containing assertions (user identity, attributes like email, role, department) signed with the IdP's private key. 5) IdP redirects the browser back to the SP's ACS (Assertion Consumer Service) URL with the SAML Response. 6) SP validates the signature using the IdP's public certificate, extracts user info, creates a local session (issues our JWT). The user is now logged in without creating a separate Marketplace account. We used passport-saml in Node.js. The main challenge was parsing SAML XML and handling edge cases like clock skew between SP and IdP.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "JWT vs Session-based auth — trade-offs?",
        answer: "Session-based: server stores session data (in memory, Redis, or database), client gets a session ID cookie. Pros: easy revocation (delete the session), no token size limit, inherently secure (session ID is opaque). Cons: stateful (server must store sessions), scaling requires shared session store (Redis), CORS complexity with cookies. JWT: token contains all claims, signed and self-verifying. Pros: stateless (no server-side storage), works across microservices (each service validates independently), easy for mobile/SPA (Authorization header). Cons: can't be revoked easily (must wait for expiry or maintain a blacklist, defeating statelessness), token size grows with claims, vulnerable if secret is compromised. In the Marketplace, we chose JWT because: microservices architecture (each service validates tokens independently without a shared session store), SPA frontend sends tokens via headers (simpler than cookie management across domains), and we needed the token to carry role information for RBAC without a database lookup on every request.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you prevent common security vulnerabilities? (XSS, CSRF, SQL injection)",
        answer: "XSS prevention: sanitize user input before rendering (DOMPurify), use React's JSX which auto-escapes by default (never use dangerouslySetInnerHTML with user input), set Content-Security-Policy headers via helmet(), and use httpOnly cookies so scripts can't access tokens. CSRF prevention: SameSite cookie attribute (Strict or Lax), CSRF tokens for state-changing requests from forms. SQL injection prevention: always use parameterized queries (pg library with $1 placeholders) — NEVER concatenate user input into SQL strings. Additional measures: helmet() middleware sets 12+ security headers, rate limiting on auth endpoints, input validation with joi/zod schemas before processing, HTTPS everywhere (HSTS header), dependency scanning with npm audit, and secure password hashing (bcrypt with appropriate salt rounds). In the Marketplace, we ran OWASP ZAP scans quarterly to catch vulnerabilities.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is OAuth 2.0? Explain the Authorization Code flow.",
        answer: "OAuth 2.0 is an authorization framework that lets users grant third-party apps limited access to their resources without sharing credentials. The Authorization Code flow (most secure for server-side apps): 1) App redirects user to the authorization server with client_id, redirect_uri, scope, and state (CSRF protection). 2) User logs in and consents to the requested permissions. 3) Authorization server redirects back to redirect_uri with an authorization code. 4) App's backend exchanges the code + client_secret for an access token (server-to-server, code never exposed to the browser). 5) App uses the access token to call the resource API. For SPAs, PKCE (Proof Key for Code Exchange) replaces client_secret with a dynamically generated code verifier/challenge since SPAs can't keep secrets. We used OAuth for third-party integrations in the Marketplace — vendors authenticated via their own OAuth providers to manage their product listings.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What happens when a JWT expires mid-request? How does the frontend handle it?",
        answer: "When a JWT expires, the API returns 401 Unauthorized. The frontend handles this transparently using an Axios response interceptor. The interceptor catches 401 errors, pauses the failed request, sends the refresh token to /auth/refresh to get a new access token, then retries the original request with the new token. Implementation: axiosInstance.interceptors.response.use(response => response, async error => { if (error.response?.status === 401 && !error.config._retry) { error.config._retry = true; const { accessToken } = await refreshToken(); error.config.headers.Authorization = `Bearer ${accessToken}`; return axiosInstance(error.config); } return Promise.reject(error); }). If the refresh also fails (refresh token expired), we redirect to login. To avoid multiple simultaneous refresh calls (multiple 401s at once), I implemented a queue: the first 401 triggers the refresh, subsequent 401s wait for it to complete, then all retry with the new token.",
        difficulty: "advanced",
        type: "cross"
      },
      {
        question: "Your RBAC has 5 roles — how do you handle a new role or permission change without redeploying?",
        answer: "The permissions matrix is stored as a configuration file that could be externalized. For no-redeploy changes, we could: 1) Store permissions in the database — a permissions table with role, resource, action columns. The RBAC middleware fetches and caches (with TTL) permissions from the database. Admin UI to manage permissions. 2) Use a configuration service (AWS AppConfig, HashiCorp Consul) that the app polls for changes. 3) Feature flags (LaunchDarkly) to toggle permissions. Currently in the Marketplace, we do redeploy for permission changes because they're infrequent and we want them code-reviewed. But the architecture supports extraction: the permissions object is a single config import, and the RBAC middleware is decoupled from how permissions are stored. If we needed real-time permission changes (e.g., temporarily revoking vendor access), we'd move to database-stored permissions with an admin panel and Redis cache for performance.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    icon: "DB",
    questions: [
      {
        question: "Explain SQL vs NoSQL — when did you use PostgreSQL vs MongoDB?",
        answer: "SQL databases (PostgreSQL) use structured tables with relationships, enforce schemas, support ACID transactions, and use SQL for complex queries. NoSQL databases (MongoDB) use flexible documents (JSON-like), scale horizontally easily, and handle unstructured/varied data well. In the Marketplace, we used PostgreSQL because: the data is highly relational (products→vendors, orders→users→products), we needed complex queries (joins, aggregations for reports), ACID transactions for order processing (can't have partial orders), and strong consistency. For the Food Delivery App, I used MongoDB because: restaurant data has varied structures (different cuisines have different attributes), the read-heavy workload benefits from document embedding (restaurant + menu in one document), and rapid prototyping was easier with schemaless design. Redis was our third database — used as a cache and for real-time features (session store, Socket.io adapter, presence tracking).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How did you optimize the PostgreSQL query from 1.2s to 200ms? What indexes did you add?",
        answer: "The slow query was the product listing with multiple filters: SELECT * FROM products p JOIN vendors v ON p.vendor_id = v.id WHERE p.category = 'tools' AND p.price BETWEEN 50 AND 500 AND p.status = 'active' ORDER BY p.price ASC LIMIT 20 OFFSET 40. Step 1: EXPLAIN ANALYZE revealed a sequential scan on products (10K rows) and a nested loop join. Step 2: Added a composite index: CREATE INDEX idx_products_category_price ON products(category, price) WHERE status = 'active' (partial index, only active products). This turned the sequential scan into an index scan. Step 3: Added an index on vendor_id (CREATE INDEX idx_products_vendor ON products(vendor_id)) to speed up the join. Step 4: For text search, replaced LIKE '%term%' with PostgreSQL full-text search using a GIN index on a tsvector column. Step 5: Added SELECT only needed columns instead of SELECT *. The composite index was the biggest win — category equality + price range maps perfectly to a B-tree index scan. Result: 1.2s → 200ms, and even faster for cached queries.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "Explain B-tree vs Hash indexes — when do you use each?",
        answer: "B-tree indexes store data in a sorted balanced tree. They support equality (=), range queries (<, >, BETWEEN), ordering (ORDER BY), and prefix matching (LIKE 'abc%'). They're the default and most versatile index type. Hash indexes store hash values for fast equality lookups only — they can't handle range queries, ordering, or partial matching. They use slightly less space and are marginally faster for pure equality checks. In practice, B-tree indexes are almost always the right choice. Use hash indexes only when: you exclusively need equality checks, never range queries, AND performance testing shows a measurable improvement. In the Marketplace, all our indexes were B-tree: composite index (category, price) for filtered product queries, single-column indexes on vendor_id, user_id for joins, and a GIN index (specialized for full-text search and array containment). PostgreSQL also supports GiST (geometric/full-text), SP-GiST (partitioned search), and BRIN (for large naturally-ordered tables like time-series).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is query planning? How do you use EXPLAIN ANALYZE?",
        answer: "The query planner determines the most efficient way to execute a query — choosing between sequential scan vs index scan, join algorithms (nested loop, hash join, merge join), and join order. EXPLAIN shows the planned execution without running it; EXPLAIN ANALYZE actually runs the query and shows real timing. Reading the output: Seq Scan on products means table scan (usually bad for large tables). Index Scan using idx_products_category means the index is being used. The cost numbers (cost=0.42..12.56) are relative estimates. Rows show estimated vs actual row counts. Buffers shows I/O statistics. I used EXPLAIN ANALYZE to debug the 1.2s product query — it revealed the planner was choosing a sequential scan because it estimated the filter would match most rows (outdated statistics). Running ANALYZE products refreshed statistics, and the planner correctly chose the index scan. Key lesson: check EXPLAIN ANALYZE after adding indexes to confirm they're actually used.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How does MongoDB handle relationships? (embedding vs referencing)",
        answer: "Embedding stores related data inside the parent document: { name: 'Restaurant', menu: [{item: 'Pizza', price: 10}, ...] }. Referencing stores an ID and requires a separate query: { name: 'Restaurant', menuId: ObjectId('...') }. Embed when: data is queried together (restaurant + menu), the child doesn't exist independently, the array is bounded (a restaurant has finite menu items), and you need atomic updates. Reference when: data is shared (a user has many orders, but orders exist independently), the child data is large or unbounded, or you need to query children independently. In the Food Delivery App, I embedded menu items inside restaurant documents because they're always displayed together and are bounded. Orders referenced user_id and restaurant_id because orders exist independently and need separate queries. MongoDB's $lookup (aggregation) provides a join-like operation for referenced data, but it's slower than SQL joins — if you need many joins, PostgreSQL is usually better.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Redis data structures — how did you use Redis for presence tracking in the Chat App?",
        answer: "Redis provides: Strings (simple key-value), Hashes (field-value maps), Lists (ordered collections), Sets (unique unordered), Sorted Sets (unique with score), Pub/Sub (messaging). For presence tracking: I used a Redis Set to store online user IDs: SADD online_users user123 when connected, SREM online_users user123 on disconnect. To check if a user is online: SISMEMBER online_users user123. To get all online users in a conversation: SMEMBERS online_users then intersect with conversation participants. For 'last seen' timestamps: a Redis Hash with user IDs as fields and timestamps as values: HSET last_seen user123 1698012345. Redis TTL handles cleanup — if a user's connection drops without a clean disconnect event, their presence key expires automatically (SET user:user123:online 1 EX 60, refreshed every 30 seconds by heartbeat). Redis was ideal for presence because: sub-millisecond reads, natural data structures (Sets for online users), built-in TTL, and Pub/Sub for broadcasting presence changes across server instances.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "What is Redis pub/sub? How does it help with multi-instance message delivery?",
        answer: "Redis Pub/Sub is a messaging pattern: publishers send messages to channels, subscribers receive messages from channels they've subscribed to. Messages are fire-and-forget — if no subscriber is listening, the message is lost. For multi-instance Socket.io: when a user sends a message, it hits one server instance. That instance needs to broadcast to all recipients, but some may be connected to different instances. The Redis adapter (@socket.io/redis-adapter) solves this: when server A receives a message, it publishes to a Redis channel. All server instances subscribe to this channel. Server B receives the publication and delivers the message to its connected clients. This makes Socket.io horizontally scalable — any number of instances can coordinate through Redis. In the Chat App, this was essential for deployment on multiple server instances behind a load balancer. Without Redis adapter, messages would only reach users connected to the same instance.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "Explain cursor-based vs offset-based pagination — why did you use cursor-based for chat?",
        answer: "Offset pagination: LIMIT 20 OFFSET 40 — skip 40 rows, return 20. Simple, supports jumping to any page. Problems: slow on large datasets (database must scan and skip offset rows), inconsistent results when data changes between pages (new messages shift offsets, causing duplicates or missed items). Cursor pagination: WHERE created_at < '2024-01-01T12:00:00' ORDER BY created_at DESC LIMIT 20 — uses a reference point (cursor) instead of offset. The cursor is typically a timestamp or unique ID. Pros: consistent O(1) performance regardless of page depth, stable results when data changes. Cons: can't jump to arbitrary pages, only next/previous. For chat, cursor-based was essential because: 1) New messages arrive constantly — offset pagination would show duplicate messages as new ones push the offset. 2) Chat history can be massive — offset pagination would get slower deeper into history. 3) Users only scroll sequentially (no 'jump to page 50'). The API returned: { messages: [...], nextCursor: 'msg_abc123', hasMore: true }.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are database transactions? When do you need them in an e-commerce order flow?",
        answer: "A transaction is a sequence of database operations that either ALL succeed (commit) or ALL fail (rollback) — atomicity. ACID properties: Atomic (all-or-nothing), Consistent (database stays valid), Isolated (concurrent transactions don't interfere), Durable (committed data survives crashes). In the Marketplace order flow, a transaction is essential: BEGIN; 1) Check stock for all items (SELECT ... FOR UPDATE to lock rows). 2) Decrement stock for each item. 3) Create the order record. 4) Create order_items records. 5) Calculate and record the total. COMMIT. If any step fails (e.g., insufficient stock at step 1), ROLLBACK reverses everything. Without a transaction: stock could be decremented but order creation could fail, leaving inventory permanently reduced. Or two concurrent orders could both pass the stock check, then both decrement, resulting in negative stock. PostgreSQL's transaction support was a key reason we chose it over MongoDB (which only gained multi-document transactions in v4.0 and they're slower).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Your marketplace has orders + inventory — how do you prevent overselling with concurrent requests?",
        answer: "We use pessimistic locking within a database transaction. When placing an order: BEGIN TRANSACTION; SELECT stock FROM products WHERE id IN ($productIds) FOR UPDATE; — this acquires row-level locks on the product rows. Any concurrent transaction trying to read these rows FOR UPDATE will wait. We then check if stock >= requested quantity for all items. If yes, UPDATE products SET stock = stock - quantity and INSERT the order. If not, ROLLBACK and return an error. The FOR UPDATE lock is released when the transaction commits or rolls back. We also added a database-level CHECK constraint: ALTER TABLE products ADD CONSTRAINT positive_stock CHECK (stock >= 0). This is a safety net — even if our application logic has a bug, the database rejects negative stock values. The real-time stock indicators (Socket.io) reduce the chance of concurrent ordering of the last item, but the database transaction is the authoritative guard against overselling.",
        difficulty: "advanced",
        type: "cross"
      },
      {
        question: "Why PostgreSQL for the Chat App instead of MongoDB?",
        answer: "We chose PostgreSQL for the Chat App because: 1) Relational data model — messages belong to conversations, conversations have participants, participants are users. These relationships are naturally relational and benefit from foreign keys and JOIN queries. 2) Strong consistency — messages must maintain strict ordering and not be lost. PostgreSQL's ACID transactions guarantee this. 3) Complex queries — features like 'search messages across all conversations' and 'unread message count per conversation' are easier and faster with SQL JOINs and aggregations than MongoDB aggregation pipelines. 4) Cursor-based pagination — PostgreSQL's indexed ORDER BY with WHERE clause is very efficient for scrolling through message history. MongoDB could work too, but its strengths (flexible schema, easy horizontal sharding) weren't needed here — message schema is fixed and a single PostgreSQL instance handles our scale. Redis handled the parts MongoDB would have excelled at — caching, presence, and pub/sub.",
        difficulty: "mid",
        type: "cross"
      }
    ]
  },
  {
    id: "websockets",
    title: "Real-time & WebSockets",
    icon: "Ws",
    questions: [
      {
        question: "How does WebSocket differ from HTTP? Explain the handshake.",
        answer: "HTTP is request-response: client sends request, server responds, connection can close. Each interaction requires a new request. WebSocket provides full-duplex, persistent communication — both client and server can send messages anytime without waiting. The WebSocket handshake starts as an HTTP request: the client sends an Upgrade header (Connection: Upgrade, Upgrade: websocket) with a random key. If the server supports WebSocket, it responds with HTTP 101 Switching Protocols and a derived accept key. After the handshake, the connection upgrades from HTTP to WebSocket protocol — same TCP connection, different protocol. This persistent connection eliminates the overhead of HTTP headers on every message (WebSocket frames have only 2-14 bytes of overhead vs hundreds of bytes for HTTP headers). This matters for real-time apps like our Chat App where thousands of messages flow per minute — HTTP polling would waste bandwidth and add latency.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does Socket.io work? What fallback mechanisms does it use?",
        answer: "Socket.io is a library built ON TOP of WebSocket that adds features: automatic reconnection, room-based broadcasting, acknowledgements, and fallback transports. It's NOT a WebSocket implementation — it uses its own protocol. Socket.io first connects via HTTP long-polling (sends HTTP requests that the server holds open until data is available), then upgrades to WebSocket if available. This fallback is important because some corporate firewalls block WebSocket. The transport upgrade is transparent to application code. Socket.io adds: namespaces (separate connection contexts, like /chat, /notifications), rooms (subscribe/unsubscribe from channels), acknowledgements (confirm delivery), binary support, and automatic reconnection with exponential backoff. In the Marketplace, we used the default namespace for stock updates, and in the Chat App, we used rooms per conversation: socket.join(`conversation:${conversationId}`). Broadcasting to a room: io.to(`conversation:${id}`).emit('new-message', data).",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "Explain your Socket.io implementation for real-time stock updates in the Marketplace.",
        answer: "Architecture: when a user views a product page or catalog, the frontend connects to Socket.io and joins rooms for visible products: socket.emit('subscribe-stock', productIds). The server adds the socket to rooms named 'product:{id}'. When inventory changes (from purchases, restocking, or admin updates), the backend service emits: io.to(`product:${productId}`).emit('stock-update', { productId, newStock, status }). The frontend listener updates the React Query cache directly: socket.on('stock-update', ({productId, newStock}) => { queryClient.setQueryData(['product', productId], old => ({...old, stock: newStock})) }). The UI reactively shows green/yellow/red indicators and disables 'Add to Cart' when stock reaches 0. When leaving a product page, the client emits 'unsubscribe-stock' to leave the room. We rate-limited stock emissions to once per second per product to avoid flooding clients during bulk inventory operations.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How did you handle Socket.io across multiple server instances? (Redis adapter)",
        answer: "In production, our Node.js backend runs on multiple instances behind a load balancer. Without coordination, Socket.io on Instance A can't broadcast to clients connected to Instance B. The solution: @socket.io/redis-adapter. Each Socket.io server instance subscribes to Redis Pub/Sub channels. When Instance A calls io.to('room').emit('event', data), the adapter publishes the message to Redis. All instances (including A) receive the publication and deliver the message to their locally connected clients in that room. Setup: import { createAdapter } from '@socket.io/redis-adapter'; const pubClient = createClient({ url: REDIS_URL }); const subClient = pubClient.duplicate(); io.adapter(createAdapter(pubClient, subClient)). We use two Redis clients because Pub/Sub subscribers can't execute other commands while subscribed. Performance impact is minimal — Redis Pub/Sub adds <1ms latency. This made our Chat App and Marketplace horizontally scalable without Socket.io being a bottleneck.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How do typing indicators work? (throttling, timeout-based clear)",
        answer: "When a user types in the message input, the client emits 'typing' to the conversation room. I throttled this emission to once every 2 seconds (not every keystroke) to reduce Socket.io traffic: const emitTyping = throttle(() => socket.emit('typing', { conversationId, userId }), 2000). The server broadcasts 'user-typing' to all other users in the conversation room. On the receiving end, the client shows 'User is typing...' and sets a 3-second timeout. Each new 'user-typing' event resets the timeout. If no event arrives within 3 seconds, the indicator hides — this handles the case where the user stops typing without sending a message. When a message is actually sent, the client emits 'stop-typing' to immediately hide the indicator. For multiple typers: the client maintains a Set of typing user IDs, displaying 'Alice is typing...', 'Alice and Bob are typing...', or '3 people are typing...'.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do read receipts work in your Chat App?",
        answer: "When a user opens a conversation, the client identifies unread messages (messages with no read receipt from this user) and emits 'messages-read' with { conversationId, messageIds, userId }. The server: 1) Stores read receipts in the database (a read_receipts table with message_id, user_id, read_at). 2) Broadcasts 'messages-read' to the sender so their UI can update (show blue double-check marks). For efficiency: we batch read receipts — instead of emitting one event per message, we send all newly-read message IDs in a single emission when the user scrolls through messages. We also track the 'last read message' cursor per user per conversation (the highest message ID read) — this is more efficient than storing individual receipts for every message. For the unread count badge: it's calculated as total messages in conversation minus messages up to the user's last-read cursor.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "What happens if Socket.io connection drops — how do you handle reconnection and missed messages?",
        answer: "Socket.io has built-in reconnection with exponential backoff (reconnectionDelay starts at 1s, doubles up to reconnectionDelayMax of 5s). On reconnect, the client re-joins rooms and re-subscribes to events. But messages emitted during the disconnection are lost — Socket.io is fire-and-forget. To handle missed messages: 1) On reconnect, the client fetches messages newer than its last-received message timestamp via REST API: GET /messages?after={lastTimestamp}. This fills the gap. 2) For critical data (stock updates), we combine Socket.io with polling — if Socket.io is disconnected for >10 seconds, a fallback polling interval (every 30s) fetches the latest stock levels via REST API. 3) In the Chat App, messages are persisted to PostgreSQL before broadcasting. If Socket.io delivery fails, the message is still in the database and will be fetched on next load. The client shows a 'reconnecting...' banner during disconnection so users know updates may be delayed.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps & AWS",
    icon: "Dv",
    questions: [
      {
        question: "Explain Docker — what is a Dockerfile, image, container, volume?",
        answer: "Dockerfile: a text file with instructions to build an image (FROM node:18, COPY, RUN npm install, CMD). It's the blueprint. Image: a read-only template built from the Dockerfile — includes the OS, runtime, dependencies, and application code. Images are layered (each instruction creates a layer) and cached for fast rebuilds. Container: a running instance of an image — isolated process with its own filesystem, network, and PID namespace. Containers are ephemeral — data inside is lost when the container stops. Volume: persistent storage that survives container restarts — mounted from the host machine into the container. For databases, volumes store the actual data. In the Marketplace, our Dockerfile used multi-stage builds: stage 1 installs dependencies and compiles TypeScript, stage 2 copies only the compiled output and production dependencies — resulting in a smaller final image (~150MB vs ~800MB with dev dependencies).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How did you Dockerize your services? What was the Dockerfile structure?",
        answer: "Multi-stage Dockerfile for the Node.js backend: Stage 1 (build): FROM node:18-alpine AS build, WORKDIR /app, COPY package*.json, RUN npm ci (deterministic install), COPY src/ tsconfig.json, RUN npm run build (TypeScript → JavaScript). Stage 2 (production): FROM node:18-alpine, WORKDIR /app, COPY --from=build /app/dist ./dist, COPY package*.json, RUN npm ci --production (only prod dependencies), EXPOSE 3000, CMD ['node', 'dist/server.js']. The alpine base image is ~5MB vs ~350MB for full node image. We used .dockerignore to exclude node_modules, .git, tests, and docs. For local development, docker-compose.yml orchestrated the backend, PostgreSQL, Redis, and frontend together: docker-compose up starts everything. Environment variables were passed via .env files (not baked into the image). Health checks ensured containers were ready before dependent services started.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain CI/CD — what does your pipeline look like?",
        answer: "Our CI/CD pipeline runs on every push to GitHub: 1) Lint — ESLint checks for code quality issues. 2) Type check — tsc --noEmit catches TypeScript errors. 3) Unit tests — Jest runs all tests with coverage check (must be >90%). 4) Build — TypeScript compiles, Docker image is built. 5) Integration tests — Docker Compose spins up the app + dependencies, runs API tests. 6) Push — Docker image is pushed to ECR (AWS container registry) with git SHA tag. 7) Deploy to staging — ECS service updates with the new image, runs health checks. 8) Manual approval gate for production. 9) Deploy to production — blue-green deployment via ECS, gradual traffic shift. The pipeline takes ~8 minutes for CI (steps 1-5) and ~5 minutes for deployment. We use GitHub Actions with reusable workflow files. Feature branches run steps 1-4; main branch runs the full pipeline. Rollback is fast — point ECS back to the previous image tag.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How does AWS S3 work? What did you store there?",
        answer: "S3 (Simple Storage Service) is object storage — you store files (objects) in buckets with unique keys (paths). It's virtually unlimited, highly durable (99.999999999% — 11 nines), and supports lifecycle policies, versioning, and access control. In the Marketplace: 1) Frontend static assets — built React app (JS, CSS, HTML) deployed to S3, served via CloudFront CDN. 2) Product images — vendors upload product photos via our backend, which processes them (resize, optimize with Sharp) and stores multiple sizes in S3. 3) Order documents — invoices and delivery receipts stored as PDFs. 4) Data exports — CSV exports of product catalogs and order reports. Access control: the S3 bucket is private. The frontend is served through CloudFront with an OAI (Origin Access Identity). Product images use pre-signed URLs (temporary, time-limited access URLs generated by the backend) so clients fetch images directly from S3 without going through our server.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does CloudFront CDN work? How did you configure it?",
        answer: "CloudFront is AWS's CDN — it caches content at 400+ edge locations globally. When a user requests a file, CloudFront serves it from the nearest edge location. If not cached (cache miss), it fetches from the origin (S3, EC2, etc.) and caches it. Configuration for the Marketplace: Origin was the S3 bucket. Cache behavior: static assets (JS/CSS/images) cached for 1 year with cache-busting via content hashes in filenames (main.abc123.js). HTML files cached for 5 minutes (or no-cache for SPA index.html to always get the latest). Custom error pages: 404 and 403 redirected to index.html for client-side routing. SSL certificate from ACM for HTTPS. CORS headers configured for API calls. Invalidation: after each deployment, we invalidated /index.html in CloudFront to ensure users get the new version. Cost: CloudFront reduced our origin requests by ~95% and improved page load times globally (edge locations in India, US, Middle East where SLB operates).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain deployment strategies: blue-green, canary, rolling.",
        answer: "Blue-green: maintain two identical environments. Blue is live, green has the new version. Switch traffic from blue to green instantly (via load balancer). Rollback = switch back to blue. Pros: instant rollback, zero downtime. Cons: double infrastructure cost. Canary: route a small percentage of traffic (5-10%) to the new version. Monitor for errors. Gradually increase to 100%. Pros: real-world testing with limited blast radius. Cons: complex routing setup, need monitoring. Rolling: update instances one at a time. Instance 1 gets new version while 2-N serve traffic. Then instance 2, etc. Pros: no extra infrastructure. Cons: during deployment, different versions serve traffic simultaneously. In the Marketplace, we used blue-green via AWS ECS — new task definitions are deployed alongside old ones. The load balancer's target group switches to new tasks after health checks pass. If new tasks fail health checks, the old tasks remain active. We chose blue-green over canary because our user base (5K) was small enough that gradual rollout wasn't necessary.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "You deployed on AWS with CI/CD — walk me through a production deployment from git push to live.",
        answer: "1) Developer pushes to main branch (after PR review and merge). 2) GitHub Actions triggers: runs lint, type check, unit tests (~3 min). 3) If tests pass: Docker image is built using multi-stage Dockerfile. Image is tagged with git SHA and 'latest'. 4) Image is pushed to AWS ECR (Elastic Container Registry). 5) ECS (Elastic Container Service) task definition is updated with the new image tag via AWS CLI. 6) ECS creates new task instances with the new image alongside existing tasks. 7) ALB (Application Load Balancer) health checks the new tasks (HTTP GET /health returns 200). 8) If healthy: ALB routes traffic to new tasks, old tasks drain connections and stop. If unhealthy: new tasks are killed, old tasks continue serving. 9) CloudFront invalidation runs for frontend assets (if frontend changed). 10) Deployment notification sent to Slack channel. Total time: ~8-10 minutes from push to live. Rollback: update ECS task definition back to the previous image SHA.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "system-design",
    title: "System Design",
    icon: "SD",
    questions: [
      {
        question: "Design an e-commerce marketplace (based on your SLB Marketplace project).",
        answer: "Requirements: Product catalog (10K SKUs), multi-vendor, cart/checkout, real-time stock, 5K users across 40+ locations. Architecture: React SPA frontend on S3/CloudFront. Node.js/Express API layer. PostgreSQL for transactional data. Redis for caching and sessions. Socket.io for real-time stock updates. S3 for product images.\n\nProduct Service: handles catalog CRUD, search (PostgreSQL full-text with GIN indexes), filtering (composite indexes on category+price). Paginated API (20 items/page). Product images stored in S3 with multiple sizes.\n\nInventory Service: tracks stock per product per location per vendor. Uses PostgreSQL transactions with row-level locking (SELECT FOR UPDATE) to prevent overselling. Publishes stock changes to Socket.io rooms.\n\nOrder Service: handles cart → checkout → order creation in a database transaction. Creates sub-orders per vendor. Integrates with payment gateway via webhooks.\n\nAuth Service: JWT with refresh token rotation. SSO via SAML for corporate users. RBAC with 5 roles.\n\nScaling: horizontal scaling of API servers behind ALB. PostgreSQL read replicas for catalog queries. Redis cache for frequently accessed products. CloudFront CDN for static assets and images. For 10x growth: add ElasticSearch for search (instead of PostgreSQL full-text), message queue (SQS) for order processing, and database sharding by location.",
        difficulty: "advanced",
        type: "system_design"
      },
      {
        question: "Design a real-time chat application (based on your Chat App project).",
        answer: "Requirements: 1:1 and group messaging, typing indicators, read receipts, online/offline presence, message history with pagination.\n\nArchitecture: Next.js frontend, NestJS backend, PostgreSQL for persistent data, Redis for real-time features, Socket.io for WebSocket communication.\n\nDatabase Schema: users (id, name, avatar, last_seen), conversations (id, type: 'direct'|'group', name), conversation_participants (conversation_id, user_id, last_read_message_id), messages (id, conversation_id, sender_id, content, type, created_at). Indexes: (conversation_id, created_at DESC) for message history pagination.\n\nReal-time Layer: Socket.io with Redis adapter for multi-instance. Users join conversation rooms on connect. Messages are persisted to PostgreSQL first, then broadcast via Socket.io. If delivery fails, messages are still in the database.\n\nPresence: Redis Set for online users. Heartbeat every 30s refreshes TTL. On disconnect, TTL expires after 60s and user shows offline.\n\nMessage Delivery: sender → API → persist to PostgreSQL → broadcast to conversation room via Socket.io/Redis pub/sub → recipients receive in real-time. Missed messages fetched via REST API on reconnection (cursor-based pagination).\n\nRead Receipts: client sends 'messages-read' with last_read_message_id. Server updates conversation_participants.last_read_message_id. Unread count = total messages - messages up to last_read cursor.\n\nScaling: Redis pub/sub for multi-instance Socket.io. PostgreSQL handles message volume with proper indexing. Conversation-level sharding if needed at extreme scale.",
        difficulty: "advanced",
        type: "system_design"
      },
      {
        question: "Design a notification system.",
        answer: "Requirements: support in-app, email, and push notifications. User preferences for notification types. Delivery guarantees. Scalable.\n\nArchitecture: Notification Service receives events from other services (order placed, stock low, message received). Event-driven using a message queue (SQS/RabbitMQ).\n\nFlow: 1) Source service publishes event to the message queue: { type: 'order_placed', userId, data }. 2) Notification Service consumes the event, checks user preferences (stored in PostgreSQL: user_id, channel, enabled). 3) For each enabled channel, dispatches to the appropriate handler: in-app (store in notifications table + push via Socket.io), email (queue to email service like SES), push (send via FCM/APNs).\n\nIn-app notifications: stored in PostgreSQL (id, user_id, type, title, body, read, created_at). Fetched via REST API with pagination. Real-time delivery via Socket.io when user is online. Unread count badge via: SELECT COUNT(*) WHERE user_id=$1 AND read=false.\n\nDelivery guarantees: message queue ensures at-least-once processing. Idempotency key on each notification prevents duplicates. Dead letter queue for failed deliveries with retry. Email/push failures are logged and retried 3 times with exponential backoff.\n\nBatching: digest notifications (hourly/daily summaries) for non-urgent events. Implemented via a scheduled job that aggregates unsent notifications.\n\nScaling: the message queue decouples producers from consumers. Add more consumer instances for higher throughput. Redis cache for user preferences to avoid database lookup per notification.",
        difficulty: "advanced",
        type: "system_design"
      },
      {
        question: "Design a URL shortener.",
        answer: "Requirements: shorten long URLs, redirect short URLs to original, track click analytics, handle high read throughput.\n\nCore algorithm: generate a unique short code (6-8 characters). Options: 1) Counter-based + Base62 encoding (sequential, predictable but simple). 2) Random generation + collision check. 3) Hash-based (MD5/SHA of URL, take first 7 chars, handle collisions). I'd use a distributed counter with Base62 — gives unique, short codes without collision checking.\n\nArchitecture: API Service (Node.js/Express) behind a load balancer. PostgreSQL for URL mappings (short_code PRIMARY KEY, original_url, user_id, created_at, click_count). Redis cache for hot URLs (most shortened URLs are accessed frequently shortly after creation).\n\nCreate: POST /api/shorten { url: 'https://very-long-url.com/...' } → generate short code, store in PostgreSQL, return { shortUrl: 'https://short.ly/abc123' }.\n\nRedirect: GET /:code → check Redis cache first, if miss check PostgreSQL, return 301/302 redirect to original URL. Increment click count asynchronously (don't block the redirect).\n\nAnalytics: track clicks with timestamp, referrer, user agent, geo (IP-based). Store in a separate analytics table or time-series database. Display on dashboard.\n\nScaling: Redis handles read-heavy traffic (cache popular URLs). PostgreSQL handles persistence. Horizontal scaling of API servers. For extreme scale: pre-generate batches of short codes, distribute ranges to server instances to avoid central counter bottleneck.",
        difficulty: "mid",
        type: "system_design"
      },
      {
        question: "Design a rate limiter.",
        answer: "Requirements: limit API requests per user/IP to prevent abuse. Support multiple rate limits (e.g., 100 req/min, 1000 req/hour). Distributed (works across multiple server instances).\n\nAlgorithms: 1) Fixed Window — count requests in fixed time windows. Simple, but allows bursts at window boundaries (199 req at 0:59, 200 at 1:01 = 399 in 2 seconds). 2) Sliding Window Log — store timestamp of each request, count within the window. Accurate but memory-intensive. 3) Sliding Window Counter — hybrid of fixed window + interpolation. Good balance. 4) Token Bucket — tokens added at fixed rate, each request costs a token. Allows controlled bursts. 5) Leaky Bucket — requests enter a queue (bucket) processed at fixed rate. Smoothest output.\n\nI'd implement Token Bucket with Redis: key: rate_limit:{userId}, store tokens (integer) and last_refill_time. On each request: calculate tokens to add since last refill, cap at max, subtract 1 for this request. If tokens <= 0, reject with 429 Too Many Requests + Retry-After header. Redis atomic operations (MULTI/EXEC or Lua script) prevent race conditions.\n\nDistributed: Redis is shared across all server instances, so limits are enforced globally. Use Redis Lua scripting for atomic check-and-decrement to prevent race conditions where two instances simultaneously allow the last token.\n\nResponse: 429 status, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers. From my Marketplace experience, we used express-rate-limit with redis-store for exactly this pattern on our auth endpoints.",
        difficulty: "mid",
        type: "system_design"
      }
    ]
  },
  {
    id: "marketplace",
    title: "Marketplace Architecture",
    icon: "Mp",
    questions: [
      {
        question: "Walk me through the full architecture — frontend to database.",
        answer: "The user loads the Marketplace SPA from S3/CloudFront. The React app initializes, authenticates via JWT (or SSO/SAML redirect for first-time users). For a product search: the React component calls the search API via Axios. The request hits the ALB, which routes to one of the Node.js/Express API instances running in ECS. Express middleware chain processes it: CORS → JSON parsing → JWT validation → RBAC check → route handler. The handler builds a PostgreSQL query with filters and pagination, using parameterized queries. PostgreSQL uses its composite index on (category, price) for fast retrieval. Results are serialized and returned as JSON. React Query on the frontend caches the response and renders ProductCards. For real-time stock: the frontend connects to Socket.io, which uses the Redis adapter. When inventory changes, the backend publishes to Redis, and all Socket.io instances broadcast to subscribed clients. Product images are served directly from S3/CloudFront. The entire flow: Browser → CloudFront → S3 (static assets) | → ALB → Express → PostgreSQL (data) | → Socket.io → Redis (real-time).",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How did you handle inventory across 40+ locations and multiple vendors?",
        answer: "Inventory was tracked in a stock table: (product_id, vendor_id, location_id, quantity, last_updated). This three-dimensional model allowed different stock levels per product per vendor per location. When a user in Location X views a product, the API returns stock for their location first (from their profile's assigned location) with an option to check other locations. The checkout process reserves stock for the user's location specifically. For vendor management: each vendor had access only to their own stock levels via the RBAC system (Vendor role with vendor_id filter). They could update stock through a dedicated vendor portal. Stock aggregation queries (total stock across all locations for admin dashboard) used PostgreSQL GROUP BY with indexes on (product_id, vendor_id). Alerts triggered when stock fell below threshold per location: a scheduled job checked stock levels hourly and notified relevant vendors and managers. The real-time Socket.io stock updates reflected the user's specific location stock.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "Explain the order flow: cart → checkout → payment → order tracking.",
        answer: "Cart: items stored in React Context (backed by localStorage). Adding items first checks stock via API (optimistic check). Cart displays items with quantities, per-item totals, and grand total. Checkout: multi-step form — shipping address → delivery method → review → confirm. Each step validates before advancing. On the review step, a final stock reservation API call locks items for 15 minutes (database row locks). Confirm: the backend processes the order in a PostgreSQL transaction: verify stock, decrement inventory, create order + order_items records, record payment info. If payment is external, redirect to payment gateway, which calls back via webhook on success/failure. Order creation: generates order number (ORD-YYYYMMDD-XXXX), sets status to 'Placed'. Order tracking: order status progresses through Placed → Confirmed → Processing → Shipped → Delivered. Status updates come from the fulfillment system via webhooks and admin actions. The frontend polls order status or receives updates via Socket.io if the user is on the order page. Users can view full order history with filtering and search.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How does the on-call rotation work? What issues did you debug in production?",
        answer: "We had a weekly on-call rotation among the team. The on-call person monitored alerts (CloudWatch alarms for error rates, latency, CPU), responded to Slack alerts, and had access to production logs. Common issues I debugged: 1) Memory leak — a Socket.io event handler was creating closures that retained references to large product objects. The ECS container memory grew until it was killed by the OOM handler. Fixed by removing the closure and using product IDs instead of full objects. 2) Slow API responses — a missing database index on a newly added filter column caused full table scans. Diagnosed with EXPLAIN ANALYZE, fixed with an index. 3) CORS errors after a deployment — CloudFront cache was serving old headers. Fixed with cache invalidation. 4) Connection pool exhaustion — too many concurrent database connections during a bulk upload. Fixed by implementing a queue for bulk operations and increasing the pool size. Debugging tools: CloudWatch logs, PostgreSQL pg_stat_activity for active queries, Node.js --inspect for heap snapshots.",
        difficulty: "advanced",
        type: "behavioral"
      },
      {
        question: "How did you mentor the 2 junior devs? What React patterns did you teach them?",
        answer: "I mentored through pair programming, code reviews, and structured learning sessions. Key areas: 1) React fundamentals — taught them the mental model of state → render → commit, why immutability matters, and when re-renders happen. 2) Component design — how to extract reusable components, props vs state, controlled vs uncontrolled forms. We refactored their first components together, showing how a 300-line component could become 3 focused components. 3) Hooks patterns — custom hooks for encapsulating logic, dependency arrays in useEffect (the most common source of their bugs), cleanup functions. 4) Testing — writing tests that test behavior not implementation, using RTL queries (getByRole, getByText instead of querySelector). 5) Code review as teaching — instead of just fixing their PR, I'd ask questions: 'What happens if this prop is undefined?', 'Could this effect run more than once?'. The most challenging part was balancing between giving them answers (fast) and letting them discover solutions (slower but stickier).",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "What was the worst production incident you handled?",
        answer: "A deployment introduced a bug in the checkout flow — the stock reservation API started returning 500 errors because a database migration added a NOT NULL column without a default value. All existing rows had NULL for the new column, causing INSERT failures. Impact: checkout was completely broken for ~30 minutes during peak hours. Response: I was on-call and saw the CloudWatch error rate alarm. Checked logs, identified the stack trace pointing to the INSERT query. Diagnosed the root cause in 5 minutes. The fix was: ALTER TABLE orders ALTER COLUMN new_field SET DEFAULT 'pending'. Applied directly to production database after confirming with the team lead. Then deployed a hotfix to the application code to explicitly set the field value. Post-mortem: we added a CI check that runs database migrations against a snapshot of production data before deployment. Also added a rule that all new columns must have DEFAULT values or be nullable. This incident taught me the importance of database migration testing and the value of having a runbook for common failure scenarios.",
        difficulty: "advanced",
        type: "cross"
      },
      {
        question: "If traffic 10x'd tomorrow, what breaks first?",
        answer: "The database is the first bottleneck. Our PostgreSQL instance handles current load fine, but 10x concurrent queries (especially filtered product searches and order transactions) would exhaust connection pools and increase query latency. Immediate fixes: 1) Add PostgreSQL read replicas for catalog queries (read-heavy) while the primary handles writes (orders). 2) Increase connection pool size and add PgBouncer for connection pooling. 3) Add Redis cache layer for product data (cache popular products and search results with short TTL). Beyond the database: Socket.io would need more instances (Redis adapter already handles multi-instance, just scale horizontally). The Node.js API servers scale horizontally behind the ALB (ECS auto-scaling). S3/CloudFront handle static assets at any scale. For sustained 10x: introduce ElasticSearch for product search (offload from PostgreSQL), message queue for order processing (SQS), and potentially shard the database by location. The Marketplace's architecture was designed for moderate scale (5K users) — 10x would require evolving from a monolithic database to a more distributed architecture.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "chat-app",
    title: "Chat App Architecture",
    icon: "Ch",
    questions: [
      {
        question: "Explain the full architecture: Next.js frontend → NestJS backend → PostgreSQL + Redis.",
        answer: "Frontend: Next.js with React — handles routing, UI rendering, and Socket.io client connection. Uses App Router with Server Components for initial page load and Client Components for interactive chat interface. Backend: NestJS (TypeScript, modular architecture) — RESTful API for CRUD operations (conversations, messages, users) and Socket.io Gateway for real-time events. NestJS modules: AuthModule (JWT), ChatModule (messages, conversations), UserModule, and a WebSocket Gateway. PostgreSQL: persistent storage for users, conversations, messages, and read receipts. Properly indexed for cursor-based pagination (conversation_id + created_at). Redis: three roles — 1) Socket.io adapter for multi-instance broadcasting, 2) presence tracking (online/offline Sets with TTL), 3) caching (recent messages, user profiles). The flow: user opens chat → Next.js loads conversation list from API → selects conversation → Socket.io connects and joins room → messages stream in real-time → sent messages go to NestJS API → persisted to PostgreSQL → broadcast via Socket.io/Redis to recipients.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "Why NestJS over Express for this project?",
        answer: "I chose NestJS for the Chat App specifically to learn and demonstrate full-stack TypeScript architecture. NestJS advantages: 1) Modular architecture with decorators — @Module, @Controller, @Injectable naturally organize code into domains (ChatModule, AuthModule). Express requires manual structure. 2) Built-in TypeScript support — NestJS is written in TypeScript with full decorator-based DI (Dependency Injection). Express is JS-first with optional TypeScript. 3) WebSocket Gateway — NestJS has first-class Socket.io support via @WebSocketGateway, @SubscribeMessage decorators. In Express, Socket.io integration is manual. 4) Guards, Pipes, Interceptors — NestJS provides clean abstractions for auth guards (@UseGuards(JwtAuthGuard)), validation pipes (class-validator), and response transformation. Express achieves this with middleware but less elegantly. Trade-off: NestJS has a steeper learning curve and more boilerplate for simple APIs. For the Marketplace's straightforward REST APIs, Express was the right choice. For the Chat App's complex real-time features with multiple modules, NestJS's structure paid off.",
        difficulty: "mid",
        type: "cross"
      },
      {
        question: "How does cursor-based pagination work for loading chat history?",
        answer: "When a user opens a conversation, the initial load fetches the most recent 50 messages: GET /messages?conversationId=abc&limit=50 (no cursor = start from newest). The response includes: { messages: [...50 messages, newest first], nextCursor: 'msg_xyz789', hasMore: true }. When the user scrolls up, the frontend requests older messages using the cursor: GET /messages?conversationId=abc&cursor=msg_xyz789&limit=50. The SQL query: SELECT * FROM messages WHERE conversation_id = $1 AND created_at < (SELECT created_at FROM messages WHERE id = $2) ORDER BY created_at DESC LIMIT 50. The cursor (message ID) maps to a created_at timestamp. This is stable — new messages arriving don't affect pagination of older messages. The frontend prepends older messages to the top while maintaining scroll position (by measuring scrollHeight before and after insertion and adjusting scrollTop). Performance is consistent — the indexed query takes O(log n) regardless of how deep into history the user scrolls, unlike OFFSET which scans skipped rows.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does Redis pub/sub ensure message delivery across multiple server instances?",
        answer: "When User A (connected to Instance 1) sends a message to a conversation where User B is connected to Instance 2: 1) User A sends the message via Socket.io to Instance 1. 2) Instance 1 persists the message to PostgreSQL. 3) Instance 1 calls io.to('conversation:123').emit('new-message', message). 4) The Socket.io Redis adapter intercepts this emit and publishes it to a Redis channel. 5) All Socket.io instances (including Instance 2) are subscribed to this Redis channel. 6) Instance 2 receives the publication and delivers the message to User B's Socket.io connection. This happens in <5ms. Without Redis adapter, Instance 1 would only deliver to its locally connected users — User B would never receive the message in real-time. The adapter is transparent to application code — you write io.to().emit() as usual, and the adapter handles cross-instance delivery. Redis pub/sub is fire-and-forget (no persistence), but that's fine because messages are already persisted to PostgreSQL before broadcasting.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How did you design the PostgreSQL schema? (users, conversations, messages tables)",
        answer: "Four main tables: 1) users (id UUID PK, username, email, avatar_url, last_seen TIMESTAMP, created_at). 2) conversations (id UUID PK, type ENUM('direct','group'), name VARCHAR NULL — NULL for direct, set for groups, created_at). 3) conversation_participants (conversation_id FK, user_id FK, joined_at, last_read_message_id FK NULL — tracks read receipts, PRIMARY KEY (conversation_id, user_id)). 4) messages (id UUID PK, conversation_id FK, sender_id FK, content TEXT, type ENUM('text','image','file'), created_at TIMESTAMP, INDEX (conversation_id, created_at DESC) for pagination). Key design decisions: direct conversations have exactly 2 participants (enforced in application logic). Group conversations have 2+ participants with a name. last_read_message_id in participants enables efficient unread count: SELECT COUNT(*) FROM messages WHERE conversation_id = $1 AND created_at > (SELECT created_at FROM messages WHERE id = participant.last_read_message_id). UUIDs instead of serial IDs for security (can't guess message IDs) and distributed generation.",
        difficulty: "advanced",
        type: "architecture"
      },
      {
        question: "How do you handle message ordering with eventual consistency?",
        answer: "In our architecture, message ordering is maintained by PostgreSQL's created_at timestamp set server-side (not client-side, to avoid clock skew between devices). When a message is persisted, it gets a server timestamp and a UUID. The database ensures chronological ordering via the (conversation_id, created_at DESC) index. Eventual consistency arises with Socket.io delivery: messages might arrive out of order due to network latency or Redis pub/sub timing. The frontend handles this by maintaining a sorted messages array — new messages are inserted at the correct position based on created_at, not just appended. If a message arrives that's 'older' than the latest displayed (e.g., due to network delay), it's inserted in the right chronological position. For the rare case of exact timestamp collision: the UUID provides a tiebreaker (ORDER BY created_at DESC, id DESC). This ensures deterministic ordering even at the microsecond level. In practice, collisions are extremely rare at our scale.",
        difficulty: "advanced",
        type: "cross"
      },
      {
        question: "What happens if Redis goes down?",
        answer: "Redis serves three roles, each with different failure impacts: 1) Socket.io adapter — if Redis goes down, Socket.io instances can't communicate across instances. Messages still persist to PostgreSQL, but real-time delivery only works for users connected to the same instance as the sender. Mitigation: Socket.io detects adapter disconnection and falls back to local-only delivery. Users can still fetch messages via REST API (polling fallback). 2) Presence tracking — online/offline status becomes unavailable. We'd show all users as 'offline' or hide the indicator entirely until Redis recovers. 3) Caching — cache misses hit PostgreSQL directly. Increased database load but functionally correct. Recovery: Redis Sentinel or Redis Cluster provides automatic failover to a replica. Our setup uses Redis Sentinel with one master and two replicas — if the master fails, Sentinel promotes a replica within seconds. Data loss is minimal (sub-second of Pub/Sub messages). For persistent data (presence, cache), we set TTLs so stale data naturally expires.",
        difficulty: "advanced",
        type: "cross"
      }
    ]
  },
  {
    id: "cross",
    title: "Cross Questions & Behavioral",
    icon: "Cr",
    questions: [
      {
        question: "You've been at SLB for 3 years — why are you looking to leave?",
        answer: "I've had a fantastic learning journey at SLB — from building the Marketplace from scratch to owning the frontend architecture and mentoring junior developers. I've grown from a junior developer to someone leading technical decisions. Now I'm looking for the next challenge: a role where I can work on products with larger scale, contribute to open-source or developer-facing tools, and be in an engineering culture that prioritizes technical excellence. SLB is an energy company where software is a support function — I want to join a company where engineering is the product. I'm also excited about working with more modern architectures (microservices, event-driven systems) and technologies that SLB's internal tools don't always require. I'm grateful for the foundation SLB gave me, but I'm ready for growth beyond what an internal tools team can offer.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "Why full stack over specializing in frontend or backend?",
        answer: "Being full stack gives me the superpower of understanding the entire system. When I build a frontend feature, I understand what the API needs to provide and can design better contracts. When I write an API, I understand how the frontend will consume it and can optimize for the client's needs. This reduces back-and-forth between teams and leads to better architectural decisions. For example, when implementing the search UI, I knew both sides — I could design the API's filter parameters to exactly match the frontend's needs without multiple iterations. That said, I'm not 50/50 — I'm stronger in frontend (~60-65%) with solid backend skills (~35-40%). I don't claim to be a deep backend specialist in areas like distributed systems or database internals. My value is bridging the gap between frontend and backend, owning features end-to-end, and making pragmatic trade-offs because I understand both sides.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "Tell me about the AI-powered search prototype — what embeddings model, how does it work?",
        answer: "The prototype uses OpenAI's text-embedding-ada-002 model to enable natural language product search. Instead of keyword matching, users can type 'something to cut through steel pipes' and find relevant products. How it works: 1) Offline indexing — we generate embeddings for each product (combining name, description, category, specifications into a text blob) and store the 1536-dimensional vectors in a PostgreSQL table with pgvector extension. 2) At query time — the user's search query is embedded using the same model. 3) We perform a cosine similarity search: SELECT * FROM products ORDER BY embedding <=> query_embedding LIMIT 20. pgvector's HNSW index makes this fast. Results are ranked by semantic similarity, not keyword match. It's currently in internal testing — accuracy is good for descriptive queries but struggles with exact part numbers (where traditional search is better). The plan is a hybrid: if the query looks like a part number, use exact match; otherwise, use embedding search. Cost is minimal — embedding generation is a one-time batch job, and query embedding is one API call (~$0.0001 per search).",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "How do you decide between building something custom vs using a third-party library?",
        answer: "My framework: 1) Is it a core differentiator? If yes, build custom. Our component library was custom because it enforced our design system — no third-party library would match our exact needs. 2) Is it a solved problem with well-maintained libraries? If yes, use a library. We used React Query (not a custom data fetching layer), Socket.io (not raw WebSocket), and bcrypt (not custom password hashing). 3) Check the library: maintenance status (last commit, open issues), bundle size impact, license compatibility, community support, and escape hatches. 4) Consider the learning curve vs time saved. I'll build custom when: the library is overly heavy for our needs (we built a simple modal instead of installing a full UI framework), or when the abstraction leaks and we'd spend more time fighting the library than building. Red flags for libraries: no TypeScript types, >6 months since last update, fewer than 100 GitHub stars for a common problem, and viral licenses (GPL in MIT projects).",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "Describe your code review process — what do you look for?",
        answer: "I review PRs in layers: 1) Purpose — does the PR description clearly explain what and why? Does it match the Jira ticket? 2) Architecture — is the approach right? Are files in the right place? Is the component/function responsibility clear? This is the most important layer — it's expensive to fix later. 3) Logic correctness — edge cases handled? Null checks? Error handling? Race conditions? 4) Performance — unnecessary re-renders in React? N+1 queries in APIs? Missing indexes? 5) Security — user input sanitized? SQL injection possible? Sensitive data exposed? 6) Tests — are the right things tested? Do tests test behavior, not implementation? 7) Readability — clear variable names? Comments where needed? No overly clever code? What I DON'T do: bikeshed on style (that's what linters and Prettier are for), or block PRs for minor nits. I use 'nit:' prefix for suggestions that don't need to be addressed. I always start with something positive and explain the 'why' behind change requests.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "How do you handle on-call incidents? Walk me through a real one.",
        answer: "Our on-call process: 1) CloudWatch alarm fires → PagerDuty alerts on-call person via Slack + phone. 2) Acknowledge within 5 minutes. 3) Assess severity: P1 (service down), P2 (degraded), P3 (minor issue). 4) Communicate status in the incident Slack channel. 5) Diagnose and fix. 6) Post-mortem within 48 hours. A real incident: Monday morning, error rate spiked from 0.1% to 15%. CloudWatch alarm at 9:05 AM. I checked the logs — hundreds of 500 errors from the product catalog API. Stack trace showed a connection pool exhaustion: 'too many clients already'. Root cause: a new background job (bulk product import) was opening database connections without releasing them properly — it was missing connection pool cleanup in the error path. The import failed repeatedly, each failure leaking a connection. Fix: killed the runaway import job, connections freed up, error rate normalized by 9:20 AM. Permanent fix: added proper connection cleanup in the finally block of the import handler, and reduced the import job's concurrency. Post-mortem: added monitoring for connection pool usage and a circuit breaker for batch operations.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "What's your approach to estimating work in sprint planning?",
        answer: "I use relative sizing with story points (Fibonacci: 1, 2, 3, 5, 8, 13) rather than time-based estimates. A '1' is something trivially simple (rename a variable, fix a typo), a '3' is a well-understood task with clear requirements (add a new API endpoint with tests), a '5' involves some complexity or unknowns, an '8' is a multi-day feature with dependencies, and '13' means 'this should probably be broken down.' Before estimating, I ask: Do I understand the requirements? What files/modules are affected? Are there dependencies on other teams? Is there a similar task I've done before? I'm transparent about uncertainty — 'I think this is a 5, but there might be database migration complexity that could make it an 8.' I've learned to account for: code review time, testing, and deployment. A common mistake juniors make is estimating only the coding time. After each sprint, we review velocity and adjust future estimates. Our team's velocity was fairly stable at 35-40 points per sprint.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "Tell me about mentoring the 2 junior devs — what was challenging?",
        answer: "The main challenge was calibrating the right level of support — too much hand-holding and they don't learn to solve problems independently, too little and they get stuck and frustrated. One junior dev would spend 3 hours stuck on a bug without asking for help (fear of looking incompetent). I addressed this by establishing a '30-minute rule' — if stuck for 30 minutes, share what you've tried and ask for direction. The other junior dev would ask for help immediately without trying first. I started responding with guiding questions instead of answers: 'What have you tried?', 'What does the error message say?', 'Have you checked the network tab?'. Teaching testing was particularly challenging — they'd write tests that passed but tested nothing meaningful (like checking that a component renders without crashing). I showed them how to think about tests: 'What should the user see?', 'What if the API fails?'. Pair programming sessions on their PRs were the most effective teaching tool — seeing the thought process behind decisions was more valuable than just seeing the final code.",
        difficulty: "mid",
        type: "behavioral"
      },
      {
        question: "What technology or trend are you most excited about right now?",
        answer: "React Server Components and the broader shift toward server-first UI architectures. The idea that components can run on the server, directly access databases, and send only the rendered output to the client is a fundamental shift from the SPA-everywhere era. It solves real problems I've faced: large bundle sizes, client-side data fetching waterfalls, and the complexity of managing loading/error states for every API call. Next.js App Router makes this practical — it's not theoretical, it's production-ready. I'm also excited about AI-assisted development tools. Having built the OpenAI embeddings search prototype, I see AI moving from 'cool demo' to 'practical feature' — semantic search, content generation, and intelligent suggestions are becoming table stakes. On the infrastructure side, edge computing (Cloudflare Workers, Vercel Edge Functions) excites me — running backend logic at the CDN edge for sub-50ms response times globally.",
        difficulty: "beginner",
        type: "behavioral"
      }
    ]
  }
];
