export const projectsData = {
  marketplace: {
    id: "marketplace",
    title: "E-Commerce Marketplace",
    subtitle: "SLB (Schlumberger) — Professional Team Project",
    description:
      "An internal B2B e-commerce platform for SLB's field operations — enabling 5,000+ users across 40+ global locations to browse, order, and track industrial equipment and supplies from multiple vendors. I led the frontend architecture, built the component library (35 reusable components adopted by 3 teams), designed the real-time stock system, and contributed to backend API design. This was a team project — I owned specific modules and mentored 2 junior developers.",
    scale: "5K users, 40+ locations, 10K SKUs",
    duration: "2+ years",
    team: "Team of 5 — I led frontend architecture",
    sections: {
      frontend: {
        techStack: [
          {
            name: "React 18",
            purpose: "UI Framework",
            how: "Built the entire SPA — product catalog, cart, checkout, order tracking. Used functional components with hooks throughout. React.memo and useMemo for performance with 10K SKU lists.",
            why: "Large ecosystem, team expertise, excellent DevTools for debugging. Vue/Svelte were considered but React's mature tooling and hiring pool won.",
          },
          {
            name: "TypeScript",
            purpose: "Type Safety",
            how: "Strict mode across the codebase. Interfaces for API responses, component props, and shared types. Generic components in the shared library. Discriminated unions for API response states (loading/success/error).",
            why: "Caught bugs at compile time instead of production. Essential for a 35-component shared library used by 3 teams — types served as documentation.",
          },
          {
            name: "React Query (TanStack Query)",
            purpose: "Server State Management",
            how: "All API calls go through React Query. Configured staleTime for product data (30s), infinite staleTime for static config. Used queryClient.setQueryData for optimistic updates on cart operations. Socket.io stock updates directly mutate the React Query cache.",
            why: "Separates server state from UI state cleanly. Built-in caching, deduplication, and background refetching. Redux was overkill for server state — React Query + Context was simpler.",
          },
          {
            name: "Tailwind CSS",
            purpose: "Styling",
            how: "Utility-first classes for all components. Custom theme tokens for brand colors. Responsive design with sm/md/lg breakpoints. Purged unused styles — production CSS was ~12KB.",
            why: "Faster development than writing CSS modules. No specificity issues. Consistent design tokens across 35 components. Better than CSS-in-JS for performance (no runtime overhead).",
          },
          {
            name: "Socket.io (Client)",
            purpose: "Real-time Stock Updates",
            how: "Connected to Socket.io on product pages. Subscribed to product rooms (subscribe-stock with product IDs). Listened for stock-update events and updated React Query cache directly. Showed green/yellow/red stock indicators. Unsubscribed on unmount.",
            why: "Need real-time stock visibility — HTTP polling would waste bandwidth for 10K products. Socket.io handles reconnection and fallbacks automatically.",
          },
          {
            name: "react-window",
            purpose: "List Virtualization",
            how: "Used FixedSizeGrid for the product catalog — only renders ~20 visible items out of 10K. Measured row heights, configured overscan count for smooth scrolling. Combined with React Query's paginated fetching.",
            why: "Rendering 10K ProductCards caused 2-3 second jank. Virtualization reduced DOM nodes from 10K to ~30, making scroll buttery smooth.",
          },
          {
            name: "Storybook",
            purpose: "Component Documentation",
            how: "Documented all 35 shared components with stories showing variants, states, and edge cases. Added controls for interactive props. Used Chromatic for visual regression testing.",
            why: "3 teams consumed the component library — Storybook was the single source of truth for component APIs and visual behavior.",
          },
          {
            name: "Jest + React Testing Library",
            purpose: "Testing (95% Coverage)",
            how: "Unit tests for utilities, integration tests for components with user-event. Tested hooks in isolation. Used MSW (Mock Service Worker) for API mocking. Custom TestProviders wrapper for context.",
            why: "RTL forces testing user behavior, not implementation. MSW intercepts at the network level, making tests realistic. 95% coverage gave confidence for refactoring.",
          },
          {
            name: "Cypress",
            purpose: "E2E Testing",
            how: "E2E tests for critical flows: search → product → cart → checkout → order confirmation. Ran in CI on every PR. Used data-testid attributes for stable selectors.",
            why: "Checkout flow involved multiple steps, API calls, and state transitions — unit tests couldn't catch integration issues. Cypress caught 3 production-blocking bugs in the first month.",
          },
        ],
        architecture: `The Story of the Marketplace Frontend:

When I joined SLB, the Marketplace was a legacy jQuery app that field engineers hated using. My first task was to architect the React rewrite from scratch.

Architecture Decision: React SPA (not Next.js) because it's an internal tool behind corporate SSO — no SEO needed. Static files deployed to S3, served via CloudFront CDN globally. This meant zero Node.js servers for the frontend — simpler infrastructure, fewer things to break.

State Management Strategy: I chose a split approach — React Query for all server state (products, orders, vendors) and React Context for UI state (auth, cart, sidebar). No Redux. React Query handles caching, background refetching, and optimistic updates. Context is split into AuthContext, CartContext, and UIContext to minimize re-renders.

Component Library: Built 35 reusable components (Button, Input, Select, Modal, DataTable, ProductCard, etc.) published as @slb/marketplace-ui. Used compound component pattern for complex components (e.g., DataTable with sortable columns). Storybook for documentation, Chromatic for visual testing. Adopted by 3 teams within SLB.

Product Catalog: The core challenge — rendering 10K SKUs with filters, search, and sorting. Solution: react-window for virtualization (renders only visible rows), React Query for paginated API fetching, useMemo for filtered/sorted results, debounced search input to avoid excessive API calls. Lighthouse went from mid-60s to 90+ after these optimizations.

Real-time Stock: Socket.io client connects on product pages, subscribes to visible product rooms. Stock changes from the backend update React Query cache directly — no re-fetching needed. Users see live green/yellow/red indicators and "Add to Cart" disables when stock hits 0.

Code Splitting: Route-based splitting with React.lazy + Suspense. The initial bundle went from 450KB to 120KB. Checkout, admin, and vendor portals load on demand.

Low-Bandwidth Support: Many field engineers work in remote locations with slow connections. I built a "lite mode" that lazy-loads images, uses smaller thumbnails, implements service worker caching for static assets, and reduces API payload sizes with field selection.`,
        features: [
          {
            title: "35-Component Shared Library",
            detail: "Designed and built a reusable UI component library (Button, Input, Modal, DataTable, ProductCard, etc.) with TypeScript, published as @slb/marketplace-ui npm package. Documented in Storybook. Adopted by 3 teams. Managed versioning, breaking changes, and migration guides.",
          },
          {
            title: "Product Catalog with 10K SKU Virtualization",
            detail: "Built the product browsing experience — virtualized grid with react-window, multi-filter sidebar (category, price range, vendor, availability), debounced search, and paginated API fetching via React Query. Handles 10K products without jank.",
          },
          {
            title: "Real-time Stock Indicator",
            detail: "Integrated Socket.io on product pages — subscribed to stock rooms, updated React Query cache on stock-update events, displayed live stock status badges (In Stock/Low Stock/Out of Stock), and disabled cart actions when stock reaches 0.",
          },
          {
            title: "Cart → Checkout Multi-Step Flow",
            detail: "Built a 4-step checkout: items review → shipping address → delivery method → order confirmation. Each step validates before advancing. Optimistic cart updates with rollback on API failure. Stock reservation for 15 minutes during checkout.",
          },
          {
            title: "Performance: Lighthouse 60s → 90+",
            detail: "Route-based code splitting (450KB → 120KB initial bundle), tree shaking (replaced lodash with lodash-es), image lazy loading with next/image patterns, virtualized lists, and React.memo on expensive components. Single biggest win was code splitting.",
          },
          {
            title: "Low-Bandwidth Mode for Field Workers",
            detail: "Lite mode: lazy-loaded images, compressed thumbnails, service worker caching for offline access to product info, reduced API payloads with field selection. Ensured the app was usable on 2G/3G connections.",
          },
          {
            title: "Mentored 2 Junior Developers",
            detail: "Pair programming sessions, structured code reviews with teaching (asking questions instead of just fixing), weekly React pattern sessions. Taught component design, hooks patterns, testing with RTL. Both devs became independent contributors within 3 months.",
          },
        ],
        challenges: [
          {
            problem: "Rendering 10K products caused 2-3 second UI freeze on filter changes",
            solution: "Implemented react-window virtualization (renders only ~30 visible items), combined with useMemo for filtered/sorted results and debounced search. Result: consistent 60fps scrolling.",
          },
          {
            problem: "Cart race condition — rapid add/remove caused stale state",
            solution: "Used React Query's optimistic updates with rollback: update cache immediately, send API request, revert cache if request fails. Added request deduplication so rapid clicks don't fire duplicate API calls.",
          },
          {
            problem: "Socket.io disconnection during checkout caused missed stock updates",
            solution: "Built a hybrid approach: Socket.io for real-time + REST API polling fallback (every 30s) when Socket disconnects for >10 seconds. Final stock check via API before order submission as the authoritative guard.",
          },
          {
            problem: "3 teams using the component library with different needs and breaking change fears",
            solution: "Semantic versioning, deprecation warnings before removal, codemods for automated migrations, and a 'request for comment' process before breaking changes. Maintained v1 and v2 simultaneously during major refactors.",
          },
          {
            problem: "Field engineers on low-bandwidth couldn't load the product catalog",
            solution: "Built 'lite mode': smaller image thumbnails, service worker caching for offline product browsing, API field selection to reduce payload sizes, and progressive image loading (blur → thumbnail → full).",
          },
        ],
        questions: [
          {
            question: "Walk me through the Marketplace frontend architecture.",
            answer: "React 18 SPA deployed on S3/CloudFront. State management: React Query for server state (products, orders) + Context for UI state (auth, cart). Component library of 35 shared components published as npm package, documented in Storybook. Product catalog uses react-window for virtualizing 10K SKUs. Real-time stock updates via Socket.io that directly mutate React Query cache. Route-based code splitting (450KB → 120KB initial bundle). The architecture prioritizes performance (field workers on low-bandwidth) and maintainability (shared library, TypeScript, 95% test coverage).",
            difficulty: "advanced",
            type: "architecture",
          },
          {
            question: "How did you handle rendering 10K products without UI freeze?",
            answer: "Three-pronged approach: 1) react-window FixedSizeGrid for virtualization — only ~30 DOM nodes visible at a time instead of 10K. 2) useMemo for filtering and sorting — recomputes only when products, filters, or sort criteria change. 3) Debounced search input (300ms) to avoid re-filtering on every keystroke. Also used React.memo on ProductCard components so changing a filter doesn't re-render unchanged cards. The combination brought Lighthouse from mid-60s to 90+ and achieved consistent 60fps scrolling.",
            difficulty: "advanced",
            type: "architecture",
          },
          {
            question: "Why React Query instead of Redux for state management?",
            answer: "Redux treats server data and UI state the same — you manually fetch, store, and track loading/error states. React Query is purpose-built for server state: automatic caching with configurable staleTime, background refetching, deduplication of concurrent requests, and built-in loading/error states. Our UI state (auth, cart, sidebar) was simple enough for Context. The combo eliminated 70% of the Redux boilerplate we would have needed. The biggest win was React Query's cache — navigating between product pages is instant because data is cached, and stale data is silently refreshed in the background.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "How does the real-time stock system work on the frontend?",
            answer: "When a product page mounts, the component calls socket.emit('subscribe-stock', [productIds]) to join Socket.io rooms. The server emits 'stock-update' events when inventory changes. On the client, the handler updates React Query cache directly: queryClient.setQueryData(['product', id], old => ({...old, stock: newStock})). This triggers a re-render showing updated stock badges (green/yellow/red) without refetching from the API. On unmount, we emit 'unsubscribe-stock' to leave rooms. Custom hook useStockLevel(productId) encapsulates all Socket.io logic so components stay clean.",
            difficulty: "mid",
            type: "architecture",
          },
          {
            question: "How did you build the 35-component shared library? How was it adopted by 3 teams?",
            answer: "I started with an audit of repeated UI patterns across teams. Built each component with TypeScript interfaces, extensive prop types, and compound component patterns for complex ones (DataTable with columns config). Published as @slb/marketplace-ui on the internal npm registry. Storybook served as live documentation. Adoption strategy: presented demos to team leads, provided migration codemods, and offered pair-programming sessions. Managed breaking changes with semantic versioning, deprecation warnings, and a 3-month overlap period for major versions.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "What was the hardest bug you fixed in the Marketplace?",
            answer: "A cart race condition: users rapidly clicking 'Add to Cart' caused stale state. The issue was that each click dispatched an optimistic cache update, but the API responses returned in different order than the requests, overwriting the cache with stale data. Fix: I implemented request deduplication (ignore duplicate requests for the same product within 500ms) and used React Query's onMutate/onError/onSettled for proper optimistic update with rollback. Also added an API-side idempotency check using request IDs.",
            difficulty: "advanced",
            type: "cross",
          },
          {
            question: "How did you improve Lighthouse from mid-60s to 90+? What was the single biggest win?",
            answer: "The biggest single win was route-based code splitting — using React.lazy + Suspense to split the checkout, admin, and vendor portals into separate chunks. Initial bundle went from 450KB to 120KB, dramatically improving First Contentful Paint. Other improvements: replaced lodash with lodash-es for tree shaking (saved 70KB), implemented react-window for virtualized product lists, lazy-loaded product images with blur placeholders, added service worker caching for static assets, and used React.memo on ProductCard to prevent unnecessary re-renders.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "Why React over Vue or Svelte for this project?",
            answer: "Three factors: 1) Team expertise — the existing team knew React well. Switching would mean months of ramp-up time. 2) Ecosystem maturity — React's ecosystem for enterprise needs (testing with RTL, state with React Query, virtualization with react-window, documentation with Storybook) was more mature. 3) Hiring — easier to hire React developers in India for the team. Vue and Svelte are technically excellent but the practical considerations favored React. If starting greenfield today with a fresh team, I'd seriously consider Next.js with React Server Components for the reduced bundle size benefits.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "If you rebuilt the Marketplace from scratch, what would you change?",
            answer: "1) Use Next.js App Router instead of a plain React SPA — Server Components would reduce bundle size significantly, and the built-in SSR would improve initial load even for an internal tool. 2) Use Zustand instead of Context for UI state — less boilerplate and better performance with selectors. 3) Design the component library API differently — I'd use the Radix UI primitives approach (headless components) instead of pre-styled ones, giving consuming teams more flexibility. 4) Add ElasticSearch from the start for product search instead of relying on PostgreSQL full-text search. 5) Implement feature flags from day one for safer deployments.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "How did you handle low-bandwidth for field workers?",
            answer: "Multi-layered approach: 1) Lite mode toggle — uses smaller image thumbnails (100px vs 400px), reduces API response fields, and simplifies the UI. 2) Service worker caching — product catalog cached for offline browsing, updated when connection is available. 3) Progressive image loading — blur hash placeholder → low-res thumbnail → full image. 4) Code splitting — only load the code needed for the current page. 5) Compression — gzip on all API responses. 6) React Query's caching — once data is fetched, navigating between pages is instant from cache. The combination made the app functional even on 2G connections.",
            difficulty: "mid",
            type: "architecture",
          },
        ],
      },
      fullstack: {
        techStack: [
          {
            name: "React 18 + TypeScript",
            purpose: "Frontend",
            how: "SPA with React Query for server state, Context for UI state, react-window for virtualization, Storybook for 35-component library. Deployed on S3/CloudFront.",
            why: "Team expertise, mature ecosystem, strong TypeScript support. Same reasoning as frontend interview — plus it integrates well with the Node.js backend through shared TypeScript types.",
          },
          {
            name: "Node.js + Express",
            purpose: "Backend API",
            how: "RESTful API server with middleware chain: CORS → helmet → JSON parsing → request logging → JWT validation → RBAC → route handlers → error middleware. AsyncHandler wrapper for clean error propagation. Express-rate-limit on auth routes.",
            why: "JavaScript across the full stack — shared types, shared validation logic. Express is minimal and flexible for REST APIs. The team had more Express experience than NestJS or Fastify.",
          },
          {
            name: "PostgreSQL",
            purpose: "Primary Database",
            how: "Stores products, orders, vendors, users, inventory. Composite indexes on (category, price) for fast catalog queries. Full-text search with GIN indexes. Transactions with row-level locking (FOR UPDATE) for order placement. Query optimization: reduced a key query from 1.2s to 200ms by adding proper indexes.",
            why: "ACID transactions essential for e-commerce (orders + inventory must be atomic). Relational model fits the data naturally. Strong indexing and query optimization capabilities. MongoDB was considered but lacked the transactional guarantees we needed for concurrent ordering.",
          },
          {
            name: "Redis",
            purpose: "Caching + Real-time",
            how: "Three roles: 1) Cache layer for frequently accessed product data (short TTL). 2) Socket.io adapter for multi-instance broadcasting. 3) Session store for rate limiting counters shared across instances.",
            why: "Sub-millisecond reads for hot product data. Redis adapter enables Socket.io to work across multiple server instances behind a load balancer. Without Redis, each instance is isolated.",
          },
          {
            name: "Socket.io (Server + Client)",
            purpose: "Real-time Stock Updates",
            how: "Server: manages product stock rooms. When inventory changes (purchase, restock, admin update), emits stock-update to the product room. Redis adapter broadcasts across all server instances. Client: subscribes to visible product rooms, updates React Query cache directly. Rate-limited to 1 emission per second per product during bulk operations.",
            why: "Real-time stock visibility prevents users from ordering out-of-stock items. Polling would waste bandwidth for 10K products. Socket.io handles reconnection, fallbacks (long-polling → WebSocket upgrade), and room-based broadcasting.",
          },
          {
            name: "JWT + SAML SSO",
            purpose: "Authentication",
            how: "JWT access tokens (15-min expiry) + refresh tokens (7-day, rotated on use). SSO via SAML for corporate users (redirect to IdP → SAML assertion → JWT issued). Refresh token rotation: old token invalidated when new one is issued, prevents token theft replay.",
            why: "JWT is stateless — no session store needed for auth verification. SAML SSO required by SLB's corporate security policy. Refresh tokens enable long sessions without long-lived access tokens.",
          },
          {
            name: "RBAC (5 Roles, 30 Routes)",
            purpose: "Authorization",
            how: "Roles: Super Admin, Admin, Manager, Vendor, User. Permission model: role → allowed routes + allowed actions. Middleware factory: rbacMiddleware(allowedRoles) checks req.user.role against the whitelist. Vendor role includes a vendor_id filter — vendors only see their own data.",
            why: "Different user types need different access levels. Middleware approach is clean and declarative. Adding a new role or changing permissions is a config change, not a code change.",
          },
          {
            name: "Docker + AWS (S3, CloudFront, ECS, ECR, ALB)",
            purpose: "Infrastructure",
            how: "Multi-stage Dockerfile (build + production, alpine base). Docker Compose for local dev (backend + PostgreSQL + Redis). Production: ECR for images, ECS for container orchestration, ALB for load balancing with health checks, S3 + CloudFront for frontend static assets. Blue-green deployments.",
            why: "Docker ensures consistency across dev/staging/production. ECS handles auto-scaling and health checks. CloudFront CDN reduces latency globally (SLB operates in India, US, Middle East). Blue-green deployment enables instant rollback.",
          },
          {
            name: "GitHub Actions CI/CD",
            purpose: "Continuous Integration & Deployment",
            how: "Pipeline: lint → type check → unit tests → build → integration tests (Docker Compose) → push to ECR → deploy to ECS staging → manual approval → production. ~8 min for CI, ~5 min for deploy.",
            why: "Automated quality gates prevent broken code from reaching production. Integration tests with Docker Compose catch issues unit tests miss. Manual approval gate for production gives confidence.",
          },
        ],
        architecture: `The Full Marketplace Architecture — End to End:

The user opens the Marketplace in their browser. The React SPA is served from S3 via CloudFront CDN — no server involved for the frontend. After loading, the app authenticates: returning users have a JWT in localStorage → validated silently. New users redirect to the corporate SAML IdP → authenticate → receive a SAML assertion → our backend exchanges it for JWT + refresh token.

For a product search: the React component (using React Query) calls GET /api/products?category=tools&search=wrench&page=2. The request hits the ALB (Application Load Balancer), which routes to one of several Node.js/Express instances running in ECS containers. The Express middleware chain processes it: CORS → JSON parsing → JWT validation (verify signature, check expiry) → RBAC check (User role allowed on this route) → route handler.

The handler builds a PostgreSQL query with parameterized inputs (preventing SQL injection), uses the composite index on (category, price) for fast retrieval, and applies full-text search with GIN indexes for the search term. Results are paginated (LIMIT 20 OFFSET 40) and serialized as JSON. Response includes: { data: [...20 products], meta: { page: 2, total: 10000, totalPages: 500 } }.

React Query on the frontend caches this response. The ProductCard components render using react-window (only visible rows in the DOM). For real-time stock: the frontend connects to Socket.io (which upgrades from HTTP long-polling to WebSocket). The server uses the Redis adapter — when inventory changes on any server instance, Redis pub/sub broadcasts to all instances, which then emit to connected clients.

For ordering: Cart → Checkout flow. The backend processes orders in a PostgreSQL transaction: BEGIN → SELECT stock FOR UPDATE (row lock) → verify stock >= requested → UPDATE stock → INSERT order → INSERT order_items → COMMIT. If any step fails, ROLLBACK. The FOR UPDATE lock prevents concurrent orders from overselling. After order creation, Socket.io emits stock-update to all watchers of that product.

Product images are uploaded via the backend (multer for multipart handling, Sharp for resizing), stored in S3, and served directly from CloudFront with pre-signed URLs.

Deployment: git push → GitHub Actions → lint + test + build → Docker image → ECR → ECS blue-green deployment → ALB health checks → live. Rollback: point ECS back to previous image tag.`,
        features: [
          {
            title: "REST API Design for Products, Orders, Vendors",
            detail: "Designed RESTful APIs with consistent conventions: plural nouns (/products, /orders), nested resources (/vendors/:id/products), pagination with meta (page, total, totalPages), and consistent error envelopes. Implemented idempotency keys for order creation to prevent double-ordering on network retries.",
          },
          {
            title: "RBAC with 5 Roles Across 30 Routes",
            detail: "Designed a role-based access control system: Super Admin (full access), Admin (manage products/orders), Manager (view reports, manage vendors), Vendor (CRUD own products/stock only), User (browse, order). Implemented as Express middleware factory: rbacMiddleware(['admin', 'manager']) applied per route. Vendor role includes automatic data filtering by vendor_id.",
          },
          {
            title: "JWT + SAML SSO Authentication",
            detail: "Implemented JWT with 15-min access tokens and 7-day refresh tokens with rotation. Corporate SSO via SAML: redirect to IdP → SAML assertion → backend validates assertion → issues JWT. Refresh token rotation invalidates old tokens on use, preventing replay attacks. Tokens stored in httpOnly cookies for security.",
          },
          {
            title: "Database Query Optimization (1.2s → 200ms)",
            detail: "A critical product listing query was taking 1.2s. Used EXPLAIN ANALYZE to diagnose: sequential scan on a 10K row table despite having filters. The planner had outdated statistics. Fix: ANALYZE products to refresh stats, added composite index on (category, price, vendor_id), added GIN index for full-text search. Query dropped to 200ms.",
          },
          {
            title: "Concurrent Order Handling with PostgreSQL Transactions",
            detail: "Prevented overselling with pessimistic locking: BEGIN → SELECT stock FOR UPDATE (row-level lock) → check availability → UPDATE stock → INSERT order → COMMIT. Added CHECK constraint (stock >= 0) as a database-level safety net. Combined with real-time stock updates via Socket.io to reduce the likelihood of concurrent last-item ordering.",
          },
          {
            title: "Socket.io with Redis Adapter for Multi-Instance",
            detail: "Socket.io on a single server instance can't broadcast to clients connected to other instances. Implemented @socket.io/redis-adapter so all instances subscribe to Redis pub/sub channels. Stock updates, order notifications, and admin broadcasts work seamlessly across any number of server instances behind the load balancer.",
          },
          {
            title: "CI/CD Pipeline with Blue-Green Deployment",
            detail: "GitHub Actions pipeline: lint → type check → unit tests (Jest, 95% coverage) → Docker build → integration tests (Docker Compose with real PostgreSQL/Redis) → push to ECR → deploy to ECS with blue-green strategy. ALB health checks confirm new containers are healthy before routing traffic. Rollback takes <2 minutes.",
          },
          {
            title: "Production Debugging & On-Call",
            detail: "Weekly on-call rotation. Debugged: memory leak in Socket.io (closures retaining large objects — fixed by using IDs instead of full objects), slow queries (missing index on new column), CORS issues after deployment (CloudFront cache invalidation), and connection pool exhaustion during bulk uploads (implemented queue + increased pool).",
          },
        ],
        challenges: [
          {
            problem: "Two users ordering the last item simultaneously — overselling risk",
            solution: "PostgreSQL transaction with SELECT ... FOR UPDATE (row-level lock). Second transaction waits until first commits/rolls back. Added CHECK constraint (stock >= 0) as database-level safety net. Application-level optimistic check before acquiring lock to reduce contention.",
          },
          {
            problem: "Database migration broke checkout — NOT NULL column without default on existing rows",
            solution: "Applied immediate fix: ALTER TABLE SET DEFAULT. Post-mortem: added CI check that runs migrations against a snapshot of production data before deployment. New rule: all columns must have DEFAULT values or be nullable.",
          },
          {
            problem: "Memory leak in production — ECS containers killed by OOM handler",
            solution: "Socket.io event handler closures were retaining references to large product objects. Diagnosed with Node.js heap snapshots (--inspect). Fixed by passing product IDs instead of full objects in the closure. Memory usage dropped from 800MB → 200MB.",
          },
          {
            problem: "Socket.io can't communicate across multiple ECS instances",
            solution: "Implemented @socket.io/redis-adapter — all instances subscribe to Redis pub/sub channels. Stock updates published by any instance are received by all instances and delivered to their connected clients. Added <1ms latency.",
          },
          {
            problem: "Connection pool exhaustion during bulk vendor uploads",
            solution: "Bulk uploads spawned hundreds of concurrent database connections. Implemented a job queue (process uploads in batches of 50), increased pool size from 10 to 25, and added PgBouncer for connection pooling at scale.",
          },
          {
            problem: "Product search too slow on 10K rows (1.2s response time)",
            solution: "EXPLAIN ANALYZE revealed sequential scan due to stale planner statistics. Ran ANALYZE to refresh stats, added composite index on (category, price, vendor_id) and GIN index for full-text search. Query dropped to 200ms. Learned to always verify index usage with EXPLAIN ANALYZE after adding indexes.",
          },
        ],
        questions: [
          {
            question: "Walk me through the full Marketplace architecture — frontend to database.",
            answer: "User loads React SPA from S3/CloudFront → authenticates via JWT (or SAML SSO redirect) → React Query fetches products from Express API via ALB → Express middleware chain: CORS, JWT validation, RBAC → handler queries PostgreSQL with parameterized queries and composite indexes → paginated JSON response cached by React Query → ProductCards rendered via react-window. Real-time: Socket.io connects, subscribes to product rooms, Redis adapter broadcasts stock changes across all server instances. Product images served directly from S3/CloudFront with pre-signed URLs. The full flow: Browser → CloudFront → S3 (static) | → ALB → Express → PostgreSQL (data) | → Socket.io → Redis (real-time).",
            difficulty: "advanced",
            type: "architecture",
          },
          {
            question: "How did you prevent overselling with concurrent orders?",
            answer: "Pessimistic locking in a PostgreSQL transaction: BEGIN → SELECT stock FROM products WHERE id IN ($ids) FOR UPDATE (acquires row-level locks) → check stock >= requested quantity → UPDATE stock → INSERT order + order_items → COMMIT. The FOR UPDATE clause makes the second concurrent transaction wait. If stock is insufficient after acquiring the lock, we ROLLBACK and return 409 Conflict. Added a database CHECK constraint (stock >= 0) as a safety net. The real-time Socket.io stock indicators reduce the chance of concurrent last-item ordering, but the transaction is the authoritative guard.",
            difficulty: "advanced",
            type: "cross",
          },
          {
            question: "What was the worst production incident you handled?",
            answer: "A deployment added a NOT NULL column to the orders table without a DEFAULT value. All existing rows had NULL, causing INSERT failures. Checkout was completely broken for ~30 minutes during peak hours. I was on-call, saw the CloudWatch error rate alarm, traced the stack to the INSERT query in 5 minutes. Immediate fix: ALTER TABLE orders ALTER COLUMN new_field SET DEFAULT 'pending'. Then deployed a hotfix to explicitly set the field. Post-mortem: added CI check to run migrations against production data snapshot. New team rule: all new columns must have DEFAULT values or be nullable.",
            difficulty: "advanced",
            type: "behavioral",
          },
          {
            question: "How did you optimize the PostgreSQL query from 1.2s to 200ms?",
            answer: "Used EXPLAIN ANALYZE on the product listing query — discovered a sequential scan on a 10K row table despite having filters. The query planner had outdated statistics (it estimated the filter would match most rows). Fix: 1) Ran ANALYZE products to refresh statistics. 2) Added composite index on (category, price, vendor_id) for filtered queries. 3) Added GIN index for full-text search. After fixes, EXPLAIN ANALYZE confirmed the planner chose index scans. Key lesson: always verify indexes are used with EXPLAIN ANALYZE after creating them.",
            difficulty: "advanced",
            type: "cross",
          },
          {
            question: "If traffic 10x'd tomorrow, what breaks first?",
            answer: "PostgreSQL is the first bottleneck — 10x concurrent queries would exhaust connection pools and increase latency. Immediate fixes: 1) PostgreSQL read replicas for catalog queries (read-heavy). 2) PgBouncer for connection pooling. 3) Redis cache for hot product data. Beyond the database: Node.js instances scale horizontally (ECS auto-scaling + ALB). Socket.io scales via Redis adapter. S3/CloudFront handles any static traffic. For sustained 10x: add ElasticSearch for search (offload from PostgreSQL), SQS for async order processing, and database sharding by location.",
            difficulty: "advanced",
            type: "cross",
          },
          {
            question: "How does your CI/CD pipeline work end-to-end?",
            answer: "git push to main → GitHub Actions triggers: 1) Lint (ESLint), 2) Type check (tsc --noEmit), 3) Unit tests (Jest, >90% coverage required), 4) Docker build (multi-stage: build TS → production alpine image), 5) Integration tests (Docker Compose spins up app + PostgreSQL + Redis, runs API tests), 6) Push to ECR with git SHA tag, 7) Update ECS task definition, 8) ECS blue-green deployment (new containers alongside old), 9) ALB health checks new containers, 10) Traffic switches to new containers, old drain. ~13 minutes total. Rollback: point ECS to previous image SHA.",
            difficulty: "mid",
            type: "architecture",
          },
          {
            question: "How did you handle the memory leak in production?",
            answer: "ECS containers were getting killed by the OOM handler — memory grew steadily until the 512MB limit. Diagnosed by attaching --inspect to a staging instance and taking heap snapshots. Found: Socket.io event handlers were creating closures that captured full product objects (each ~5KB). With 10K products and frequent stock updates, these closures accumulated. Fix: passed product IDs instead of full objects in the event handlers, and the handler fetched minimal data from Redis when needed. Memory dropped from 800MB → 200MB.",
            difficulty: "advanced",
            type: "cross",
          },
          {
            question: "How did you design the RBAC system?",
            answer: "5 roles: Super Admin, Admin, Manager, Vendor, User. Permission model stored in a config file mapping role → allowed routes + actions. Express middleware factory: function rbacMiddleware(allowedRoles) { return (req, res, next) => { if (!allowedRoles.includes(req.user.role)) return res.status(403).json({error: 'Forbidden'}); next(); }}. Applied per route: app.delete('/products/:id', rbacMiddleware(['admin']), handler). The Vendor role adds an extra filter: queries are scoped to vendor_id from the JWT. Adding a new role or changing permissions is a config change — no code changes needed.",
            difficulty: "mid",
            type: "architecture",
          },
        ],
      },
    },
  },
  foodDelivery: {
    id: "foodDelivery",
    title: "Food Delivery App",
    subtitle: "Personal Project — Built Everything Solo",
    description:
      "A Swiggy/Zomato-style food delivery application built as a personal project to deepen my understanding of state management, infinite scrolling, and responsive UI design. Features restaurant browsing with infinite scroll, menu viewing with category filters, cart management with Redux Toolkit and localStorage persistence, and a complete ordering flow. I built everything — frontend, backend, database design, and deployment.",
    scale: "100+ restaurants, real API integration",
    duration: "3 months",
    team: null,
    sections: {
      frontend: {
        techStack: [
          {
            name: "React",
            purpose: "UI Framework",
            how: "Functional components with hooks. Custom hooks for infinite scroll (useInfiniteScroll), debounced search (useDebounce), and localStorage sync (useLocalStorage). Component composition for restaurant cards, menu items, and cart.",
            why: "Wanted to deepen React skills beyond what I used at work. Chose plain React (no Next.js) to focus on client-side patterns without SSR complexity.",
          },
          {
            name: "Redux Toolkit",
            purpose: "State Management",
            how: "Used createSlice for cart state (items, quantities, totals). createAsyncThunk for restaurant and menu API calls with loading/error states. Middleware for localStorage persistence — every cart action triggers a save to localStorage. configureStore with Redux DevTools for debugging.",
            why: "Wanted to learn Redux properly — at SLB I used React Query for server state and Context for UI state. Redux Toolkit's opinionated approach (Immer for immutability, thunks for async) made it much simpler than vanilla Redux.",
          },
          {
            name: "Tailwind CSS",
            purpose: "Styling",
            how: "Utility-first approach. Responsive design with mobile-first breakpoints. Custom theme for the food delivery brand colors. Container queries for restaurant cards that adapt to grid columns.",
            why: "Consistent with my SLB experience. Fast iteration, no context-switching between files. Purged CSS keeps production bundle tiny.",
          },
          {
            name: "Intersection Observer API",
            purpose: "Infinite Scroll",
            how: "Created a useInfiniteScroll hook: places a sentinel div at the bottom of the restaurant list. IntersectionObserver watches this sentinel — when it enters the viewport, it triggers the next page fetch. Handles loading states, error retry, and 'no more results' state.",
            why: "Better than scroll event listeners — IntersectionObserver is performant (runs off the main thread), doesn't cause layout thrashing, and handles edge cases like fast scrolling. Also used for lazy-loading restaurant images.",
          },
        ],
        architecture: `The Food Delivery App — Frontend Architecture:

This was my first personal project where I built everything from scratch. The goal was to create a Swiggy-like experience with proper state management and performance patterns.

Architecture: React SPA with Redux Toolkit for global state. I deliberately chose Redux over Context to learn it properly — at SLB I had been using React Query + Context and wanted to understand Redux patterns.

State Design: Redux store has three slices — restaurantsSlice (list + pagination + filters), menuSlice (current restaurant's menu + categories), and cartSlice (items + quantities + totals + localStorage sync). Each slice uses createAsyncThunk for API calls, handling pending/fulfilled/rejected states.

Infinite Scroll: The restaurant list uses Intersection Observer instead of scroll events. A sentinel div sits at the bottom of the list. When it becomes visible, it triggers the next page fetch. The hook handles deduplication (don't fetch if already loading), error states (show retry button), and end-of-list detection.

Cart Persistence: Redux middleware saves the cart to localStorage on every dispatch. On app load, the cart initializer reads from localStorage and hydrates the store. This means the cart survives page refreshes and browser close/reopen.

Search & Filters: Debounced search input (300ms) with category and cuisine filters. Filters update the Redux state, which triggers a re-fetch with the new parameters.`,
        features: [
          {
            title: "Restaurant Listing with Infinite Scroll",
            detail: "Custom useInfiniteScroll hook using Intersection Observer. Sentinel div at the bottom of the list triggers next-page fetch when visible. Handles loading, error retry, and end-of-list states. Lazy-loads restaurant images using the same observer pattern.",
          },
          {
            title: "Menu Browsing with Category Filters",
            detail: "Each restaurant has a menu page with sticky category tabs (Starters, Main Course, Desserts, etc.). Clicking a tab scrolls to that section. IntersectionObserver updates the active tab as the user scrolls through categories — same pattern as my SLB sidebar navigation.",
          },
          {
            title: "Redux Toolkit Cart with localStorage Persistence",
            detail: "Cart state managed by createSlice with actions: addItem, removeItem, updateQuantity, clearCart. Custom middleware saves to localStorage on every cart action. On app load, the cart initializer hydrates from localStorage. Cart displays item count badge, per-item totals, and grand total.",
          },
          {
            title: "Debounced Search & Multi-Filter UI",
            detail: "Search input with 300ms debounce to avoid excessive API calls. Combined with cuisine filter (Indian, Chinese, Italian, etc.), price range, and rating filter. All filters are composed — selecting 'Indian' + '4+ stars' + '$10-20' sends one API request with all parameters.",
          },
          {
            title: "Responsive Design",
            detail: "Mobile-first layout: single-column restaurant cards on mobile, 2-column on tablet, 3-column on desktop. Sticky bottom bar for cart summary on mobile. Swipeable category tabs on the menu page. Touch-friendly tap targets.",
          },
        ],
        challenges: [
          {
            problem: "Infinite scroll triggering duplicate fetches on fast scroll",
            solution: "Added a loading guard in the IntersectionObserver callback — if isLoading is true, ignore the intersection event. Also added a debounce to the observer callback (100ms) to prevent rapid-fire triggers.",
          },
          {
            problem: "Redux cart state getting out of sync with localStorage on rapid updates",
            solution: "Instead of saving on every action, added a debounced middleware that batches saves — saves to localStorage at most once every 500ms. Also added a version key to detect and handle stale localStorage data.",
          },
          {
            problem: "Category scroll-spy conflicting with click-to-scroll on menu page",
            solution: "When the user clicks a category tab, I temporarily disable the IntersectionObserver for 500ms to prevent the scroll animation from triggering observer callbacks that would change the active tab.",
          },
        ],
        questions: [
          {
            question: "Why did you use Redux Toolkit instead of Context API or React Query?",
            answer: "Learning goal — I used React Query + Context at SLB and wanted to understand Redux patterns deeply. Redux Toolkit was the right choice here because: 1) The cart state is complex (items, quantities, totals, persistence) and benefits from Redux's structured approach. 2) createAsyncThunk elegantly handles loading/error states for API calls. 3) Redux DevTools were invaluable for debugging state changes. In hindsight, React Query would be better for the server state (restaurants, menus), but Redux for the cart was a good fit.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "How does your infinite scroll implementation work?",
            answer: "Custom useInfiniteScroll hook using Intersection Observer API. I place a sentinel <div> at the bottom of the restaurant list. An IntersectionObserver watches it — when the sentinel enters the viewport (threshold: 0.1), the callback triggers the next page fetch via Redux createAsyncThunk. Guards: if already loading or no more pages, ignore the event. On error, the sentinel becomes a 'Retry' button. The observer is created in a useEffect and cleaned up on unmount. This is much more performant than scroll event listeners because IntersectionObserver runs off the main thread.",
            difficulty: "mid",
            type: "concept",
          },
          {
            question: "How does the localStorage cart persistence work?",
            answer: "Custom Redux middleware listens for cart actions (addItem, removeItem, updateQuantity, clearCart). On any cart action, it debounces a save to localStorage (once per 500ms to handle rapid clicks). On app initialization, configureStore's preloadedState reads from localStorage to hydrate the cart. I added a schema version key — if the stored cart has an old version (schema changed), it's cleared instead of causing errors. This means the cart survives page refreshes, browser close/reopen, and even works offline.",
            difficulty: "mid",
            type: "concept",
          },
          {
            question: "This is a personal project — how does it compare to your SLB work?",
            answer: "The Food Delivery App is smaller in scale but gave me depth in areas SLB didn't cover: Redux (SLB used React Query), infinite scroll (SLB used pagination), and building backend APIs from scratch (at SLB I worked with existing APIs). The patterns I learned here directly helped at work — the IntersectionObserver pattern I built for infinite scroll became the basis for lazy-loading product images in the Marketplace. Personal projects let me experiment without production constraints, while SLB taught me production-grade practices (testing, monitoring, CI/CD).",
            difficulty: "mid",
            type: "behavioral",
          },
        ],
      },
      fullstack: {
        techStack: [
          {
            name: "React + Redux Toolkit",
            purpose: "Frontend",
            how: "Same as frontend interview — SPA with Redux for state management, infinite scroll, localStorage cart persistence.",
            why: "Focused on learning Redux patterns deeply. React Query would be better for server state in hindsight.",
          },
          {
            name: "Express.js",
            purpose: "Backend API",
            how: "RESTful API for restaurants, menus, orders. Middleware for CORS, auth, error handling. Pagination with limit/offset. Filter/search query parameters.",
            why: "Lightweight and flexible. Wanted to focus on API design patterns rather than framework abstractions (unlike NestJS which I used for the Chat App).",
          },
          {
            name: "MongoDB",
            purpose: "Database",
            how: "Restaurants collection with embedded menu items (menus are always fetched with the restaurant). Orders collection referencing user_id and restaurant_id. Used Mongoose for schema validation and virtuals.",
            why: "Flexible schema ideal for restaurants with varying menu structures. Embedding menus inside restaurant documents means one query fetches everything needed. Referencing for orders because they need independent querying.",
          },
        ],
        architecture: `The Food Delivery App — Full Stack Architecture:

Frontend: React SPA with Redux Toolkit. Backend: Express.js REST API. Database: MongoDB with Mongoose.

Data flow: User opens app → Redux dispatch fetches restaurants (GET /api/restaurants?page=1&limit=20&cuisine=Indian). Express handler queries MongoDB with filters and pagination. Response includes restaurant data with basic menu info.

User selects a restaurant → fetches full menu (GET /api/restaurants/:id/menu). Menu items are embedded inside the restaurant document in MongoDB — one query returns everything. The frontend caches this in the Redux menuSlice.

Cart is entirely client-side (Redux + localStorage). When the user checks out, the frontend sends POST /api/orders with cart items. Express validates items exist and prices match, then creates the order in MongoDB.

MongoDB Schema Design:
- restaurants: { name, image, cuisine, rating, deliveryTime, menu: [{ name, price, category, image, description }] }
- orders: { userId (ref), restaurantId (ref), items: [{ menuItem, quantity, price }], total, status, createdAt }
- users: { name, email, passwordHash, addresses }

I chose embedding for menus (always queried with the restaurant, bounded size) and referencing for orders (queried independently, unbounded).`,
        features: [
          {
            title: "REST APIs for Restaurants, Menus, Orders",
            detail: "GET /restaurants (paginated, filterable by cuisine/rating/price), GET /restaurants/:id/menu, POST /orders, GET /orders/:id. Consistent error handling, input validation with Joi, and pagination metadata in responses.",
          },
          {
            title: "MongoDB Schema Design — Embedding vs Referencing",
            detail: "Embedded menu items inside restaurant documents (always fetched together, bounded size ~50 items). Referenced orders by user_id and restaurant_id (queried independently, unbounded). Used Mongoose populate for fetching order details with restaurant info.",
          },
          {
            title: "User Authentication",
            detail: "JWT-based auth with bcrypt password hashing. Sign up, login, token refresh endpoints. Protected routes with auth middleware. User profile with saved addresses.",
          },
        ],
        challenges: [
          {
            problem: "Restaurant menu items vary wildly — some have options (size, toppings), some don't",
            solution: "Used MongoDB's flexible schema: menu items have an optional 'options' array. Items without options have no field at all (not an empty array). Mongoose schema uses Mixed type for options, with runtime validation in the API layer.",
          },
          {
            problem: "Order total computed on client could be tampered with",
            solution: "Server-side validation: on order creation, the API re-fetches prices from the database and recalculates the total. If the client total doesn't match server total (within rounding tolerance), the order is rejected with the correct prices.",
          },
        ],
        questions: [
          {
            question: "Why MongoDB instead of PostgreSQL for this project?",
            answer: "Restaurant data is naturally document-oriented — each restaurant has a different menu structure with varying item options (some have sizes, toppings, combos). MongoDB's flexible schema handles this without complex relational joins. Embedding menus inside restaurant documents means one query fetches everything needed for a restaurant page. For orders, I used references (restaurant_id, user_id) because they're queried independently. If this needed complex transactions (inventory management, concurrent ordering), I'd choose PostgreSQL — which is exactly what I did for the Marketplace and Chat App.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "Embedding vs referencing — how did you decide?",
            answer: "Three criteria: 1) Is the data always queried together? Menus are always shown with the restaurant → embed. Orders are queried independently → reference. 2) Is the data bounded? A restaurant has at most ~100 menu items → safe to embed. Orders are unbounded → must reference. 3) Does the data change independently? Menu items only change when the restaurant updates them → embed is fine. MongoDB's 16MB document limit was never a concern — our largest restaurant document was ~50KB. The $lookup aggregation handles referenced data when needed, though it's slower than SQL JOINs.",
            difficulty: "mid",
            type: "concept",
          },
          {
            question: "How would you scale this to a real food delivery service?",
            answer: "Current architecture wouldn't scale: 1) Add a dedicated search service (ElasticSearch) for restaurant search with geo-queries (restaurants near user). 2) Real-time order tracking with Socket.io (order status: placed → accepted → preparing → out for delivery → delivered). 3) Payment integration (Stripe/Razorpay). 4) Delivery partner matching algorithm. 5) Redis caching for restaurant data (doesn't change often). 6) Message queue (RabbitMQ) for order processing pipeline. 7) Separate microservices: restaurant-service, order-service, delivery-service, payment-service. The MongoDB → PostgreSQL migration would be needed for the order/payment service where ACID transactions are critical.",
            difficulty: "advanced",
            type: "system_design",
          },
        ],
      },
    },
  },
  chatApp: {
    id: "chatApp",
    title: "Real-time Chat App",
    subtitle: "Personal Project — Built Everything Solo",
    description:
      "A full-featured real-time chat application supporting 1:1 and group messaging, typing indicators, presence tracking, read receipts, and message history with cursor-based pagination. Built to deepen my understanding of WebSocket architecture, real-time patterns, and database design for messaging systems. I designed and implemented the entire stack — frontend, backend, database schema, and real-time infrastructure.",
    scale: "10K+ messages, real-time multi-instance",
    duration: "4 months",
    team: null,
    sections: {
      frontend: {
        techStack: [
          {
            name: "Next.js (App Router)",
            purpose: "Frontend Framework",
            how: "Server Components for conversation list and user profiles (static data). Client Components for the chat interface, message input, and real-time features. Used App Router's layouts for persistent sidebar across routes.",
            why: "Wanted to learn Next.js App Router and Server Components — different from the React SPA approach at SLB. Server Components reduce bundle size for non-interactive parts of the UI.",
          },
          {
            name: "Socket.io (Client)",
            purpose: "Real-time Communication",
            how: "Connected on app mount. Joined conversation rooms. Listened for new-message, user-typing, messages-read, and presence-changed events. Emitted send-message, typing, stop-typing, and messages-read events. Custom useSocket hook manages lifecycle.",
            why: "Needed bidirectional real-time communication. Socket.io provides automatic reconnection, room-based messaging, fallback transports, and acknowledgements. Raw WebSocket would require implementing all of this manually.",
          },
          {
            name: "react-window (VariableSizeList)",
            purpose: "Message Virtualization",
            how: "Chat history can have 10K+ messages. VariableSizeList renders only visible messages. Each message height is measured and cached. Handles variable heights (short text vs long paragraphs vs images). Scroll-to-bottom on new message, maintain position when loading older history.",
            why: "FixedSizeList wouldn't work — messages have different heights. Without virtualization, rendering 10K messages causes severe jank. VariableSizeList with dynamic height measurement was the solution.",
          },
          {
            name: "Tailwind CSS",
            purpose: "Styling",
            how: "Chat bubble styling, responsive layout (sidebar + chat area), dark theme, message alignment (sent = right, received = left). Animations for typing indicator dots.",
            why: "Consistent with my other projects. Fast iteration for the chat UI which has many small visual details (bubbles, timestamps, read receipts, presence dots).",
          },
        ],
        architecture: `The Chat App — Frontend Architecture:

This project pushed my frontend skills in a direction different from the Marketplace — real-time UI with complex state synchronization.

Layout: Next.js App Router with a persistent sidebar layout. Server Component for the conversation list (fetched once, updated via Socket.io events). Client Component for the active chat (fully interactive).

Message Flow: User types a message → hits send → message appears immediately in the UI (optimistic, with pending indicator) → Socket.io emits 'send-message' → server acknowledges → pending indicator removed. If the server rejects, the message shows an error state with retry button.

Virtualization: The chat window uses react-window's VariableSizeList. Challenge: messages have variable heights (text length varies, images vary). Solution: measure each message's height using a hidden measurement div, cache the result, and pass it to VariableSizeList's itemSize function. On window resize, heights are recalculated.

Scroll Behavior: Three modes: 1) Normal view — user is at the bottom, new messages auto-scroll. 2) Scrolled up — user is reading history, new messages show a "New messages ↓" badge without scrolling. 3) Loading history — user scrolls to the top, cursor-based pagination loads older messages. After loading, scroll position is maintained (not jumped to top).

Typing Indicators: When the user types, a throttled (2s) Socket.io emission notifies others. Receiving clients show "Alice is typing..." with an animated dots indicator. A 3-second timeout hides the indicator if no new typing event arrives. Multiple typers: "Alice and Bob are typing..." or "3 people are typing...".

Presence: Socket.io connection/disconnection events update a local presence map. Green dot = online, gray dot = offline with "last seen" timestamp. The backend uses Redis TTL for presence — if a user's connection drops without a clean disconnect, their presence expires after 60 seconds.

Read Receipts: When the user views a conversation, unread messages are marked as read (batch emission to server). The sender sees blue double-checkmarks when their messages are read.`,
        features: [
          {
            title: "Message UI with Virtualized Scrolling",
            detail: "react-window VariableSizeList for 10K+ messages. Dynamic height measurement for variable-length messages. Three scroll modes: auto-scroll at bottom, 'new messages' badge when scrolled up, and scroll-position-preserved history loading. Smooth scroll-to-bottom animation.",
          },
          {
            title: "Typing Indicators with Throttling",
            detail: "Throttled Socket.io emission (every 2s while typing). Receiving clients show animated dots indicator. 3-second timeout clears indicator if no new event. Supports multiple typers ('Alice and Bob are typing...'). Stop-typing emitted on message send.",
          },
          {
            title: "Presence System (Online/Offline)",
            detail: "Green/gray dot on user avatars. Updates via Socket.io presence-changed events. Shows 'last seen' timestamp for offline users. Backend uses Redis TTL — presence expires 60s after disconnect for dropped connections.",
          },
          {
            title: "Read Receipts (Blue Checkmarks)",
            detail: "When a user views a conversation, unread messages are batch-marked as read. Socket.io notifies the sender, who sees blue double-checkmarks. Unread count badge on conversation list updates in real-time.",
          },
          {
            title: "Cursor-Based Pagination for History",
            detail: "Initial load fetches 50 most recent messages. Scrolling to the top triggers cursor-based fetch for older messages. The cursor is the oldest message's created_at. Scroll position is preserved after inserting older messages (no jump to top).",
          },
          {
            title: "Responsive Chat Layout",
            detail: "Desktop: sidebar + chat area side by side. Mobile: conversation list is the default view, clicking opens full-screen chat with back button. Smooth transitions between views. Touch-friendly message interactions.",
          },
        ],
        challenges: [
          {
            problem: "Variable-height messages break react-window's FixedSizeList",
            solution: "Switched to VariableSizeList with a dynamic height measurement system: render each message in a hidden div, measure its height with ResizeObserver, cache the result, and pass it to itemSize. Heights are recalculated on window resize.",
          },
          {
            problem: "Loading older messages jumps scroll position to the top",
            solution: "Before loading: save scrollHeight. After inserting older messages: calculate the difference in scrollHeight and set scrollTop to the difference. This keeps the user viewing the same messages while older ones appear above.",
          },
          {
            problem: "New messages arriving while user is reading history — auto-scroll or not?",
            solution: "Track if the user is 'at bottom' (within 100px of the bottom). If at bottom: auto-scroll on new message. If scrolled up: show a floating 'New messages ↓' badge with count. Clicking the badge scrolls to bottom.",
          },
          {
            problem: "Typing indicator flickering — events arriving too frequently",
            solution: "Throttled emission to 2s intervals on the sender side. On the receiver: use a 3-second timer that resets on each event. Indicator only disappears when the timer expires (no flicker between rapid events).",
          },
        ],
        questions: [
          {
            question: "How did you virtualize 10K+ messages with variable heights?",
            answer: "Used react-window's VariableSizeList instead of FixedSizeList because messages have different heights. The key challenge was knowing each message's height before rendering. Solution: a measurement system that renders each message in a hidden div, uses ResizeObserver to measure its height, caches the result by message ID, and passes a function to VariableSizeList's itemSize prop that returns the cached height. On window resize, heights are invalidated and re-measured. This keeps only ~20 messages in the DOM instead of 10K, while accurately handling variable heights.",
            difficulty: "advanced",
            type: "architecture",
          },
          {
            question: "How do typing indicators work without flickering?",
            answer: "Sender side: throttled to emit once per 2 seconds (not every keystroke). Receiver side: on receiving 'user-typing', show the indicator and set a 3-second timer. Each new event resets the timer. The indicator only disappears when the timer expires — this eliminates flickering between rapid events. When a message is sent, 'stop-typing' is emitted to immediately hide the indicator. For multiple typers, the client maintains a Map of userId → timer, showing 'Alice is typing...', 'Alice and Bob are typing...', or 'N people are typing...'.",
            difficulty: "mid",
            type: "concept",
          },
          {
            question: "How do you handle scroll position when loading older messages?",
            answer: "Three scenarios: 1) User at bottom: new messages auto-scroll. 2) User scrolled up: new messages trigger a 'New messages ↓' badge without scrolling. 3) Loading history: before fetching, save the current scrollHeight. After inserting older messages at the top, calculate the new scrollHeight minus the old scrollHeight and set scrollTop to this difference. This keeps the user looking at the same messages while older ones appear above. The 'at bottom' detection uses a threshold of 100px from the bottom to account for fractional pixel differences.",
            difficulty: "mid",
            type: "concept",
          },
          {
            question: "Why react-window over other virtualization libraries?",
            answer: "Compared three options: 1) react-window — lightweight (6KB), supports VariableSizeList, actively maintained. 2) react-virtualized — more features but much larger (28KB), heavier API. 3) @tanstack/virtual — newer, framework-agnostic, but had fewer examples at the time. I chose react-window for its small size and because VariableSizeList handled my exact use case (variable-height messages). The trade-off: react-window requires you to know item sizes upfront, which required the measurement system. @tanstack/virtual handles this more elegantly and I'd use it today.",
            difficulty: "mid",
            type: "cross",
          },
        ],
      },
      fullstack: {
        techStack: [
          {
            name: "Next.js (App Router)",
            purpose: "Frontend",
            how: "Server Components for conversation list. Client Components for chat UI. Socket.io client for real-time. react-window for message virtualization.",
            why: "Learn Server Components, reduce bundle size for non-interactive parts.",
          },
          {
            name: "NestJS",
            purpose: "Backend Framework",
            how: "Modular architecture: AuthModule (JWT), ChatModule (messages, conversations), UserModule (profiles, presence). WebSocket Gateway with @SubscribeMessage decorators for Socket.io events. Guards for auth, Pipes for validation, Interceptors for response transformation.",
            why: "Chose NestJS over Express to learn a structured framework. First-class TypeScript support, built-in WebSocket gateway, dependency injection, and modular architecture. For the Chat App's complex real-time features, NestJS's structure paid off. Express would have required manual organization.",
          },
          {
            name: "PostgreSQL",
            purpose: "Message Persistence",
            how: "Tables: users, conversations, conversation_participants (with last_read_message_id), messages. Composite index on (conversation_id, created_at DESC) for cursor-based pagination. UUID primary keys for security. ACID transactions for message delivery guarantees.",
            why: "Relational data model: messages belong to conversations, conversations have participants — natural for JOINs. ACID guarantees ensure messages are never lost. Strong indexing for efficient cursor-based pagination. MongoDB could work but PostgreSQL's JOINs and consistency were better fits.",
          },
          {
            name: "Redis",
            purpose: "Real-time Infrastructure",
            how: "Three roles: 1) Socket.io adapter — Redis pub/sub for multi-instance broadcasting. 2) Presence tracking — Redis Sets (SADD/SREM online_users) with TTL for dropped connections. 3) Caching — recent messages and user profiles for fast access.",
            why: "Sub-millisecond operations for real-time needs. Redis Sets are perfect for online user tracking. Pub/Sub enables Socket.io to work across multiple server instances. TTL-based expiry handles unclean disconnects automatically.",
          },
          {
            name: "Socket.io (Server + Redis Adapter)",
            purpose: "Real-time Communication",
            how: "NestJS WebSocket Gateway: @SubscribeMessage('send-message') handles incoming messages, @SubscribeMessage('typing') broadcasts typing indicators. Redis adapter ensures messages reach clients on any server instance. Room-based: each conversation is a room.",
            why: "Bidirectional real-time communication with room-based broadcasting. NestJS's @WebSocketGateway integration is cleaner than manual Express + Socket.io setup. Redis adapter makes it horizontally scalable.",
          },
          {
            name: "JWT Authentication",
            purpose: "Auth",
            how: "JWT access tokens validated on both REST API (NestJS Guard) and WebSocket connections (handshake auth). Refresh tokens for long sessions.",
            why: "Stateless auth works for both REST and WebSocket connections. The token is sent in the WebSocket handshake, so every Socket.io event is authenticated.",
          },
        ],
        architecture: `The Chat App — Full Stack Architecture:

This project taught me real-time architecture patterns that directly improved my work on the Marketplace's Socket.io features.

Frontend: Next.js with App Router. Server Components render the conversation list and user profiles (fetched once, low interactivity). Client Components handle the chat window (fully interactive, real-time).

Backend: NestJS with modular architecture.
- AuthModule: JWT-based authentication with Guards for protecting both REST endpoints and WebSocket events.
- ChatModule: Handles conversations, messages, and read receipts. REST endpoints for CRUD + cursor-based pagination. WebSocket Gateway for real-time events (send-message, typing, messages-read).
- UserModule: Profiles, presence tracking, last-seen timestamps.

Database: PostgreSQL for persistent data.
Schema: users (id, name, avatar, last_seen) → conversations (id, type, name) → conversation_participants (conversation_id, user_id, last_read_message_id) → messages (id, conversation_id, sender_id, content, type, created_at).
Key index: (conversation_id, created_at DESC) for cursor-based pagination.

Real-time Layer: Socket.io with Redis adapter.
- User connects → joins rooms for all their conversations.
- Sending a message: client → NestJS Gateway → persist to PostgreSQL → broadcast to conversation room via Socket.io (Redis adapter ensures delivery across instances).
- Typing: throttled client emission → server broadcasts to room → receiver shows indicator with timeout.
- Presence: connection adds user to Redis Set (SADD), disconnection removes (SREM). TTL of 60s handles dropped connections. Heartbeat every 30s refreshes TTL.
- Read receipts: client sends last_read_message_id → server updates conversation_participants → broadcasts to room → sender sees blue checkmarks.

Message Delivery: Messages are persisted to PostgreSQL BEFORE broadcasting via Socket.io. If Socket.io delivery fails, the message is still in the database and will be fetched on the recipient's next load. Socket.io is the fast path; the database is the reliable path.

Scaling: Redis adapter makes Socket.io horizontally scalable. PostgreSQL handles message volume with proper indexing. For extreme scale: conversation-level sharding, dedicated message search with ElasticSearch.`,
        features: [
          {
            title: "NestJS Modular Architecture",
            detail: "AuthModule (JWT Guards for REST + WebSocket), ChatModule (messages, conversations, read receipts), UserModule (profiles, presence). Dependency Injection for clean service separation. Pipes for validation, Interceptors for response transformation.",
          },
          {
            title: "WebSocket Gateway with @SubscribeMessage",
            detail: "NestJS's first-class Socket.io integration: @WebSocketGateway with @SubscribeMessage decorators for send-message, typing, stop-typing, messages-read. JwtAuthGuard applied to the gateway — every event is authenticated via the handshake token.",
          },
          {
            title: "PostgreSQL Schema for Messaging",
            detail: "4 tables: users, conversations (direct/group), conversation_participants (with last_read_message_id for efficient unread counts), messages. Composite index on (conversation_id, created_at DESC) for O(log n) cursor-based pagination. UUID primary keys prevent ID guessing.",
          },
          {
            title: "Cursor-Based Pagination API",
            detail: "GET /messages?conversationId=abc&limit=50 (newest first, no cursor = start from newest). GET /messages?conversationId=abc&cursor=msg_xyz&limit=50 (older messages). SQL: WHERE conversation_id = $1 AND created_at < (SELECT created_at FROM messages WHERE id = $cursor) ORDER BY created_at DESC LIMIT 50. Stable under concurrent writes, O(log n) performance regardless of history depth.",
          },
          {
            title: "Redis Presence Tracking",
            detail: "Online users tracked in Redis Set: SADD online_users userId on connect, SREM on disconnect. Heartbeat every 30s refreshes a per-user TTL key (EX 60). If connection drops without clean disconnect, TTL expires and user shows offline. Last-seen timestamp stored in Redis Hash.",
          },
          {
            title: "Redis Pub/Sub for Multi-Instance Socket.io",
            detail: "@socket.io/redis-adapter: when Instance A broadcasts to a conversation room, Redis pub/sub delivers to all instances. Instance B's connected clients receive the message. Enables horizontal scaling — add server instances behind a load balancer without Socket.io becoming a bottleneck.",
          },
          {
            title: "Read Receipt System",
            detail: "Client sends 'messages-read' with conversationId and last_read_message_id. Server updates conversation_participants.last_read_message_id. Unread count: SELECT COUNT(*) FROM messages WHERE conversation_id = $1 AND created_at > (SELECT created_at FROM messages WHERE id = last_read_message_id). Broadcasts to room so sender sees blue checkmarks.",
          },
        ],
        challenges: [
          {
            problem: "Socket.io on multiple server instances can't see each other's clients",
            solution: "@socket.io/redis-adapter — all instances subscribe to Redis pub/sub channels. Events published by any instance are received by all. Each instance delivers to its locally connected clients. Added <1ms latency. Two Redis clients needed: one for pub, one for sub (subscribers can't execute other commands).",
          },
          {
            problem: "Message ordering with eventual consistency — messages arriving out of order",
            solution: "Server-side timestamps (not client-side, avoiding clock skew). Frontend maintains a sorted messages array — new messages are inserted at the correct chronological position, not just appended. For timestamp collisions: UUID provides a tiebreaker (ORDER BY created_at DESC, id DESC).",
          },
          {
            problem: "What happens if Redis goes down?",
            solution: "Three failure modes: 1) Socket.io adapter — falls back to local-only delivery (messages still persist to PostgreSQL, fetched on next load). 2) Presence — show all users as 'offline' until Redis recovers. 3) Cache — cache misses hit PostgreSQL directly (increased load but functionally correct). Redis Sentinel with one master + two replicas provides automatic failover in <5 seconds.",
          },
          {
            problem: "Unclean disconnections leaving users showing as 'online' indefinitely",
            solution: "TTL-based presence: each user has a Redis key with 60-second expiry (SET user:id:online 1 EX 60). Client heartbeat refreshes the TTL every 30 seconds. If the connection drops, the key expires naturally after 60 seconds and the user shows offline.",
          },
          {
            problem: "Cursor-based pagination: user scrolls up while new messages arrive at the bottom",
            solution: "Cursor pagination is inherently stable — the cursor points to a specific message, so new messages don't affect older history. The frontend separates 'history loading' from 'real-time messages' — new messages are appended to the bottom while the cursor fetch inserts at the top, both operating independently.",
          },
        ],
        questions: [
          {
            question: "Explain the full Chat App architecture: frontend → backend → database.",
            answer: "Next.js frontend (Server Components for static content, Client Components for chat UI). NestJS backend with modular architecture: AuthModule (JWT), ChatModule (REST + WebSocket Gateway), UserModule. PostgreSQL for persistent data (users, conversations, participants, messages). Redis for three real-time needs: Socket.io adapter (multi-instance broadcasting), presence tracking (Sets with TTL), and caching. Flow: user opens chat → conversation list from API → selects conversation → Socket.io connects, joins room → messages stream in real-time → sent messages persisted to PostgreSQL first, then broadcast via Socket.io/Redis.",
            difficulty: "advanced",
            type: "architecture",
          },
          {
            question: "Why NestJS over Express for this project?",
            answer: "Four reasons: 1) Modular architecture — @Module, @Controller, @Injectable naturally organize complex features (chat, auth, users). Express requires manual structure. 2) First-class WebSocket support — @WebSocketGateway with @SubscribeMessage decorators. Express + Socket.io requires manual integration. 3) Built-in TypeScript with dependency injection — services are injected via constructors, making testing easy. 4) Guards, Pipes, Interceptors — clean auth (JwtAuthGuard on both REST and WebSocket), validation (class-validator), and response transformation. Trade-off: steeper learning curve and more boilerplate. For the Marketplace's simpler REST APIs, Express was the right choice. For Chat App's complex real-time features, NestJS's structure paid off.",
            difficulty: "mid",
            type: "cross",
          },
          {
            question: "How does cursor-based pagination work for chat history?",
            answer: "Initial load: GET /messages?conversationId=abc&limit=50 (no cursor = newest 50 messages). Response: { messages: [...], nextCursor: 'msg_xyz', hasMore: true }. Loading older: GET /messages?conversationId=abc&cursor=msg_xyz&limit=50. SQL: SELECT * FROM messages WHERE conversation_id = $1 AND created_at < (SELECT created_at FROM messages WHERE id = $2) ORDER BY created_at DESC LIMIT 50. The cursor (message ID) maps to a timestamp. This is stable under concurrent writes (new messages don't affect pagination of older ones) and has O(log n) performance via the (conversation_id, created_at DESC) index — unlike offset pagination which scans skipped rows.",
            difficulty: "mid",
            type: "concept",
          },
          {
            question: "How does Redis pub/sub ensure message delivery across server instances?",
            answer: "User A (Instance 1) sends a message → Instance 1 persists to PostgreSQL → calls io.to('conversation:123').emit('new-message', data) → Redis adapter intercepts and publishes to a Redis channel → all instances (including Instance 2) receive the publication → Instance 2 delivers to User B's Socket.io connection. This happens in <5ms. Without the adapter, only users connected to the same instance would receive real-time messages. The adapter is transparent to application code — you write io.to().emit() as usual.",
            difficulty: "advanced",
            type: "internal",
          },
          {
            question: "What happens if Redis goes down?",
            answer: "Three degradation modes: 1) Socket.io adapter — instances can't cross-communicate. Messages still persist to PostgreSQL, and recipients fetch via REST on next load. Socket.io delivers locally only. 2) Presence — online/offline status unavailable. UI hides presence indicators. 3) Cache — misses hit PostgreSQL directly, increasing load but remaining functional. Mitigation: Redis Sentinel (1 master + 2 replicas) provides automatic failover in <5 seconds with minimal data loss (sub-second of pub/sub messages). For persistent data (presence, cache), TTLs ensure stale data expires naturally.",
            difficulty: "advanced",
            type: "cross",
          },
          {
            question: "How do you handle message ordering with eventual consistency?",
            answer: "Messages get server-side timestamps (not client-side, to avoid clock skew). The database index (conversation_id, created_at DESC) ensures consistent ordering. Eventual consistency arises in Socket.io delivery: network latency or Redis timing may deliver messages out of order. The frontend handles this: new messages are inserted at the correct chronological position (binary search on created_at), not blindly appended. For rare timestamp collisions: UUID tiebreaker (ORDER BY created_at DESC, id DESC). In practice at our scale, out-of-order delivery is very rare.",
            difficulty: "advanced",
            type: "cross",
          },
          {
            question: "How did you design the PostgreSQL schema for messaging?",
            answer: "4 tables: users (UUID PK, name, avatar, last_seen), conversations (UUID PK, type ENUM direct/group, name), conversation_participants (composite PK: conversation_id + user_id, last_read_message_id for read receipts), messages (UUID PK, conversation_id FK, sender_id FK, content, type ENUM text/image/file, created_at). Key design: last_read_message_id in participants enables O(1) unread count calculation. UUIDs prevent ID enumeration. Composite index (conversation_id, created_at DESC) makes cursor pagination O(log n). Direct conversations have exactly 2 participants (application-enforced).",
            difficulty: "advanced",
            type: "architecture",
          },
        ],
      },
    },
  },
};
