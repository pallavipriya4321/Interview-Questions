export const androidTopics = [
  {
    id: "kotlin-fundamentals",
    title: "Kotlin Fundamentals",
    icon: "Kt",
    questions: [
      {
        question: "What are the key differences between Kotlin and Java?",
        answer: "1) Null Safety — Kotlin distinguishes nullable (String?) from non-nullable (String) types at compile time, eliminating NullPointerException at the type system level. Java treats everything as nullable. 2) Data Classes — Kotlin auto-generates equals(), hashCode(), toString(), copy(), and componentN() with a one-liner: data class User(val name: String, val age: Int). Java needs boilerplate or Lombok. 3) Extension Functions — add methods to existing classes without inheritance: fun String.isEmail(): Boolean. 4) Coroutines — lightweight concurrency built into the language, replacing Java's verbose Thread/AsyncTask/RxJava. 5) Smart Casts — after a type check (is), Kotlin automatically casts: if (obj is String) obj.length works without explicit cast. 6) Sealed Classes — restricted class hierarchies for exhaustive when expressions. 7) Default & Named Arguments — fun greet(name: String = \"World\") eliminates method overloading. 8) No checked exceptions, no primitive types (all objects), and string templates (\"Hello $name\").",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "Explain val vs var, and const val vs val.",
        answer: "val declares a read-only (immutable reference) variable — once assigned, it cannot be reassigned. However, the object it points to can still be mutable (val list = mutableListOf(1,2) — you can add to the list but not reassign the variable). var declares a mutable variable that can be reassigned. const val is a compile-time constant — it must be a primitive or String, assigned at compile time, and declared at top-level or in a companion object. Internally, val compiles to a Java final field with a getter. const val compiles to a static final field with the value inlined at every usage site (no getter call). Use val by default, var only when mutation is needed, and const val for true compile-time constants like API keys, URLs, or config values.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "What are Kotlin data classes? How do they work internally?",
        answer: "Data classes are declared with the data keyword: data class User(val name: String, val age: Int). The compiler automatically generates: 1) equals() — compares all properties declared in the primary constructor. 2) hashCode() — consistent with equals. 3) toString() — returns 'User(name=John, age=25)'. 4) copy() — creates a shallow copy with optional parameter changes: user.copy(age = 26). 5) componentN() functions — enable destructuring: val (name, age) = user. Internally, these compile to regular Java classes with the generated methods. Requirements: primary constructor must have at least one parameter, all must be val or var, and data classes cannot be abstract, sealed, or inner. The equals/hashCode only considers constructor properties — properties declared in the class body are excluded.",
        difficulty: "beginner",
        type: "internal"
      },
      {
        question: "Explain Kotlin's null safety system and how it works internally.",
        answer: "Kotlin's type system distinguishes nullable types (String?) from non-nullable types (String). The compiler enforces null checks at compile time. Operators: ?. (safe call — returns null if receiver is null), ?: (Elvis — provides default if left side is null), !! (non-null assertion — throws KotlinNullPointerException if null). Internally, nullable types compile to the same JVM bytecode as Java types — there's no runtime wrapper. The null safety is purely a compiler feature using annotations (@Nullable, @NotNull) in the bytecode. When you call a non-null parameter, the compiler inserts Intrinsics.checkNotNullParameter() at the function entry point, throwing IllegalArgumentException if null is passed from Java code. Smart casts after null checks (if (x != null) x.length) work because the compiler tracks nullability through control flow analysis.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "What are sealed classes and sealed interfaces? When do you use them?",
        answer: "Sealed classes restrict which classes can inherit from them — all subclasses must be defined in the same file (or same package in Kotlin 1.5+). This enables exhaustive when expressions: when (result) { is Success -> ..., is Error -> ..., is Loading -> ... } — the compiler knows all cases are covered, no else needed. Sealed interfaces work similarly but allow implementing classes to extend other classes too. Use cases: 1) UI State modeling — sealed class UiState { data class Success(val data: List<Item>) : UiState(), data class Error(val message: String) : UiState(), object Loading : UiState() }. 2) Navigation events. 3) API response wrappers. 4) Redux-style actions. Internally, sealed classes compile to abstract classes with a private constructor. The compiler checks at compile time that all subclasses are known.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Kotlin extension functions — how do they work under the hood?",
        answer: "Extension functions add new functions to existing classes without modifying them: fun String.isPalindrome(): Boolean = this == this.reversed(). You call it like a member: \"racecar\".isPalindrome(). Under the hood, extension functions compile to static methods where the receiver object is passed as the first parameter: public static boolean isPalindrome(String $this) { return $this.equals(StringsKt.reversed($this)); }. This means: 1) They're resolved statically at compile time, not dynamically — no virtual dispatch. 2) They can't access private members of the class. 3) If a member function and extension function have the same signature, the member always wins. 4) They can be declared on nullable types: fun String?.orEmpty(): String = this ?: \"\". Extension functions are widely used in Kotlin stdlib (e.g., .let, .apply, .also) and Android KTX libraries.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "What are higher-order functions and lambdas in Kotlin?",
        answer: "A higher-order function takes functions as parameters or returns them: fun <T> List<T>.filter(predicate: (T) -> Boolean): List<T>. Lambdas are anonymous functions: { x: Int -> x * 2 }. Key concepts: 1) Function types — (Int, String) -> Boolean represents a function taking Int and String, returning Boolean. 2) Trailing lambda — if the last parameter is a function, it can be placed outside parentheses: list.filter { it > 5 }. 3) 'it' implicit parameter — single-parameter lambdas can use 'it'. 4) Closures — lambdas capture variables from the enclosing scope, and unlike Java, they can modify captured vars. Internally, lambdas compile to anonymous inner classes implementing FunctionN interfaces (Function0, Function1, etc.). This creates object allocation overhead, which is why Kotlin has the inline keyword.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What does the inline keyword do and why is it important?",
        answer: "The inline keyword tells the compiler to copy the function body (and lambda arguments) directly at the call site instead of creating a function call. Without inline: list.filter { it > 5 } creates a Function1 object on the heap for the lambda, then calls filter() which iterates and calls the lambda via invoke(). With inline: the compiler copies the filter loop and the lambda body directly into the caller — no function object, no invoke() call. Benefits: 1) No lambda object allocation (avoids GC pressure). 2) No virtual dispatch overhead. 3) Enables non-local returns (return from the enclosing function, not just the lambda). 4) Enables reified type parameters. Trade-offs: increases bytecode size (the function body is copied everywhere). Use inline for small higher-order functions, especially those called frequently. The Kotlin stdlib functions (let, apply, run, also, with, filter, map) are all inline.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "Explain Kotlin scope functions: let, run, with, apply, also.",
        answer: "All are inline extension functions that execute a block of code on an object. Differences: 1) let — receiver as 'it', returns lambda result. Use for: null checks (user?.let { save(it) }), transformations. 2) run — receiver as 'this', returns lambda result. Use for: object configuration + computing a result. 3) with — not an extension (takes object as argument), receiver as 'this', returns lambda result. Use for: calling multiple methods on an object. 4) apply — receiver as 'this', returns the object itself. Use for: object configuration (builder pattern): TextView(context).apply { text = \"Hello\"; textSize = 16f }. 5) also — receiver as 'it', returns the object itself. Use for: side effects (logging, validation) without modifying the chain. The key decision matrix: need 'this' reference? → run/apply/with. Need 'it' reference? → let/also. Return the object? → apply/also. Return something else? → let/run/with.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are Kotlin coroutine basics — suspend, launch, async?",
        answer: "Coroutines are lightweight threads for asynchronous programming. Key concepts: 1) suspend function — a function that can be paused and resumed without blocking a thread. Marked with suspend keyword. Can only be called from another suspend function or a coroutine builder. 2) launch — coroutine builder that starts a new coroutine and returns a Job (fire-and-forget, no result). 3) async — coroutine builder that starts a coroutine and returns a Deferred<T> (like a Future). Call .await() to get the result. 4) CoroutineScope — defines the lifecycle of coroutines. ViewModelScope, lifecycleScope, and GlobalScope are common scopes. 5) Dispatchers — Dispatchers.Main (UI thread), Dispatchers.IO (disk/network), Dispatchers.Default (CPU-intensive). Example: viewModelScope.launch { val user = withContext(Dispatchers.IO) { api.getUser() }; _uiState.value = user }. Coroutines use structured concurrency — when a scope is cancelled, all its child coroutines are cancelled too.",
        difficulty: "mid",
        type: "concept"
      },
    ]
  },
  {
    id: "coroutines-flow",
    title: "Coroutines & Flow",
    icon: "Co",
    questions: [
      {
        question: "How do Kotlin coroutines work internally? What is a Continuation?",
        answer: "Internally, the Kotlin compiler transforms suspend functions into a state machine. Each suspension point becomes a state. The compiler generates a Continuation object that stores: 1) the current state (which suspension point we're at), 2) local variables, and 3) a callback to resume execution. When a suspend function is called, the compiler creates a Continuation and passes it to the suspending call. The callee stores this Continuation and later calls continuation.resume(result) to continue execution. This is called Continuation Passing Style (CPS). The actual suspend function signature transforms from: suspend fun getUser(): User to fun getUser(continuation: Continuation<User>): Any? — it returns COROUTINE_SUSPENDED if it actually suspends, or the result directly if it completes synchronously. The state machine uses a when(state) switch to jump to the right point after resumption. This is why coroutines are 'lightweight' — no thread is blocked during suspension; the state is stored in a small heap object.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "Explain Coroutine Dispatchers and how they work internally.",
        answer: "Dispatchers determine which thread(s) coroutines run on. Dispatchers.Main — uses the Android main looper (Handler(Looper.getMainLooper())), one thread for UI operations. Dispatchers.IO — backed by a shared thread pool (default 64 threads), designed for blocking I/O (network, disk). Dispatchers.Default — backed by a thread pool sized to the number of CPU cores, for CPU-intensive work. Dispatchers.Unconfined — starts in the caller thread, resumes in whatever thread the suspending function resumes in (rarely used in production). Internally, dispatchers implement the CoroutineDispatcher abstract class with a dispatch(context, block) method. When a coroutine suspends and resumes, the dispatcher's dispatch() is called with a Runnable representing the continuation. Dispatchers.Main posts the Runnable to the main looper's message queue. Dispatchers.IO/Default submit to their thread pool executor. The IO and Default dispatchers share threads — a coroutine on Default can use the same thread as one on IO, but IO allows more threads to be created for blocking operations.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "What is structured concurrency and why does it matter?",
        answer: "Structured concurrency means coroutines follow a parent-child hierarchy through CoroutineScope. Rules: 1) A coroutine launched in a scope becomes a child of that scope. 2) A parent coroutine waits for all children to complete before completing itself. 3) When a parent is cancelled, all children are cancelled. 4) When a child fails, the parent is cancelled (and thus all siblings). This prevents: coroutine leaks (forgotten coroutines running forever), fire-and-forget bugs, and resource leaks. In Android: viewModelScope cancels all coroutines when the ViewModel is cleared. lifecycleScope cancels when the lifecycle is destroyed. Example: viewModelScope.launch { val user = async { getUser() }; val posts = async { getPosts() }; _state.value = combine(user.await(), posts.await()) } — if the ViewModel is cleared during the API calls, both coroutines are automatically cancelled. Without structured concurrency (like GlobalScope.launch), you must manually track and cancel coroutines.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is Kotlin Flow? How does it differ from LiveData?",
        answer: "Flow is Kotlin's reactive stream API for emitting multiple values over time. It's cold — the producer only runs when there's a collector. Key types: 1) Flow<T> — cold stream, emits values sequentially. 2) StateFlow<T> — hot stream with a current value (like LiveData). 3) SharedFlow<T> — hot stream without a current value, supports multiple collectors and replay. Flow vs LiveData: 1) Flow is lifecycle-unaware — needs manual lifecycle handling (use flowWithLifecycle or collectAsStateWithLifecycle in Compose). LiveData is lifecycle-aware by default. 2) Flow has powerful operators (map, filter, combine, debounce, flatMapLatest). LiveData has limited transformations. 3) Flow is pure Kotlin (works in non-Android modules). LiveData is Android-specific. 4) StateFlow requires an initial value. LiveData can be uninitialized. In modern Android: use StateFlow in ViewModel (exposed to UI), Flow for repository/data layer, and collectAsStateWithLifecycle() in Compose to collect safely.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain StateFlow vs SharedFlow — when do you use each?",
        answer: "StateFlow: holds a single current value, new collectors immediately get the latest value, conflated (if the value doesn't change, collectors aren't notified), requires an initial value. Use for: UI state that always has a value (UiState, form fields, settings). Backed by a MutableStateFlow. SharedFlow: no current value concept, supports configurable replay (replay = 0 means new collectors get nothing from the past), not conflated by default, supports multiple emissions of the same value. Use for: one-time events (navigation events, snackbar messages, error notifications). Example: navigation events should NOT use StateFlow because re-collecting after configuration change would re-trigger the navigation. SharedFlow with replay=0 ensures events are consumed once. In ViewModels: private val _uiState = MutableStateFlow(UiState.Loading) for state, private val _events = MutableSharedFlow<Event>() for events. The UI collects both but handles them differently.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does Flow work internally? What are cold vs hot streams?",
        answer: "A cold Flow doesn't produce values until collected. The flow { emit(1); emit(2) } builder creates a SafeFlow object. When you call collect(), it invokes the flow's block function, passing the collector. Each emit() call invokes the collector's emit method. If the collector suspends (slow processing), the producer suspends too — this is back-pressure. Internally, Flow uses coroutine suspension for back-pressure (no buffering by default). Hot streams (StateFlow, SharedFlow) produce values regardless of collectors. StateFlow uses an atomic state holder — setting value is thread-safe and conflated (if old == new, no emission). SharedFlow uses a buffer array (replay + extraBufferCapacity) and a subscriber list. Key operators: 1) map/filter — create new Flow wrapping the upstream. 2) flatMapLatest — cancels the previous inner Flow on new emission. 3) combine — collects from multiple Flows, emits when any changes. 4) stateIn/shareIn — converts a cold Flow to StateFlow/SharedFlow, keeps it alive in a CoroutineScope.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "Explain coroutine exception handling — SupervisorJob, CoroutineExceptionHandler.",
        answer: "By default, if a child coroutine fails, the exception propagates to the parent which cancels all other children (structured concurrency). SupervisorJob changes this: child failures don't affect siblings or the parent. Each child handles its own exceptions. viewModelScope uses SupervisorJob by default — one failing API call doesn't cancel others. CoroutineExceptionHandler catches uncaught exceptions: val handler = CoroutineExceptionHandler { _, exception -> log(exception) }. It only works on root coroutines (direct children of a scope). For async, exceptions are delivered when await() is called — wrap in try-catch: try { deferred.await() } catch (e: Exception) { ... }. For launch, exceptions propagate immediately. Best practice in ViewModels: use try-catch inside the coroutine body for expected errors (API failures), and CoroutineExceptionHandler as a safety net for unexpected crashes.",
        difficulty: "advanced",
        type: "concept"
      },
      {
        question: "How do you test coroutines? Explain runTest and TestDispatcher.",
        answer: "The kotlinx-coroutines-test library provides: 1) runTest — a coroutine test builder that auto-advances virtual time (delays complete instantly). 2) StandardTestDispatcher — dispatches coroutines to a test scheduler, requires explicit advanceUntilIdle()/advanceTimeBy(). 3) UnconfinedTestDispatcher — dispatches eagerly (coroutines run immediately without advancing). Testing pattern: @Test fun `test ViewModel state`() = runTest { val dispatcher = StandardTestDispatcher(testScheduler); val viewModel = MyViewModel(repository, dispatcher); viewModel.loadData(); advanceUntilIdle(); assertEquals(UiState.Success(data), viewModel.uiState.value) }. Key: inject dispatchers via constructor (don't hardcode Dispatchers.IO) so tests can substitute TestDispatcher. For Flow testing: use Turbine library — viewModel.uiState.test { assertEquals(Loading, awaitItem()); assertEquals(Success(data), awaitItem()) }.",
        difficulty: "advanced",
        type: "concept"
      },
    ]
  },
  {
    id: "jetpack-compose",
    title: "Jetpack Compose",
    icon: "Jc",
    questions: [
      {
        question: "What is Jetpack Compose and how does it differ from XML-based views?",
        answer: "Jetpack Compose is Android's modern declarative UI toolkit. Instead of defining UI in XML and manipulating views imperatively (findViewById, setText), you write composable functions that describe what the UI should look like for a given state: @Composable fun Greeting(name: String) { Text(\"Hello $name\") }. Key differences: 1) Declarative vs Imperative — Compose re-renders the entire UI description when state changes; the framework diffs and updates efficiently. XML views require manual mutation. 2) No XML — UI is pure Kotlin, enabling IDE support, type safety, and code reuse. 3) Composition over inheritance — instead of custom View subclasses, compose uses function composition. 4) State-driven — UI is a function of state, not a graph of mutable objects. 5) Built-in theming — MaterialTheme with colors, typography, shapes. 6) Preview — @Preview annotation for real-time previews in IDE. Compose uses a compiler plugin that transforms @Composable functions into optimized rendering code.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How does recomposition work in Jetpack Compose?",
        answer: "Recomposition is Compose's process of re-executing composable functions when their inputs change, to update the UI. When state read by a composable changes (via remember + mutableStateOf, or StateFlow), Compose marks that composable as 'invalid' and schedules recomposition. During recomposition, Compose re-runs only the invalidated composables, skipping those whose inputs haven't changed (this is called 'smart recomposition'). Key rules: 1) Composables can run in any order. 2) Composables can run in parallel. 3) Recomposition skips composables with unchanged parameters. 4) Recomposition is optimistic (can be cancelled and restarted). 5) Composables might run frequently — avoid side effects in the composition. For a composable to be skippable, all its parameters must be stable (primitives, String, or @Stable/@Immutable annotated classes). Unstable parameters cause the composable to always recompose when the parent recomposes.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "Explain remember vs rememberSaveable in Compose.",
        answer: "remember stores a value in the Composition — it survives recomposition but is lost on configuration changes (rotation) and process death. Used for transient UI state: var expanded by remember { mutableStateOf(false) }. rememberSaveable stores the value in a Bundle (via SavedStateRegistry) — it survives configuration changes and process death. Used for state that should persist: var text by rememberSaveable { mutableStateOf(\"\") }. Limitation: rememberSaveable only works with types that can be put in a Bundle (primitives, String, Parcelable, Serializable). For complex objects, use a custom Saver: rememberSaveable(saver = MyObjectSaver) { mutableStateOf(myObject) }. Best practice: use remember for ephemeral state (animation, hover), rememberSaveable for user input (text fields, scroll position), and ViewModel for business state (API data, form submissions).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does the Compose compiler plugin work internally?",
        answer: "The Compose compiler plugin (runs during Kotlin compilation) transforms @Composable functions: 1) Adds a Composer parameter — every composable function gets an implicit Composer parameter that manages the slot table (Compose's internal data structure). 2) Generates group markers — startGroup()/endGroup() calls that track the identity of UI elements in the slot table. 3) Adds stability checks — if all parameters are stable and unchanged, the composable is skipped (returns early). 4) Manages remember — stored values go into the slot table at the current composition position. The slot table is a linear array that stores both the UI tree structure and remembered values. During recomposition, the Composer walks the slot table, comparing stored values with new ones. If a composable is skipped, the Composer jumps over its slots. If the tree structure changes (conditional UI), the Composer inserts or removes slots. This is similar to React's Virtual DOM but uses a flat array instead of a tree, making it more cache-friendly.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "What are side effects in Compose? Explain LaunchedEffect, DisposableEffect, SideEffect.",
        answer: "Side effects are operations that affect state outside the composable function (API calls, listeners, analytics). Since composables can recompose frequently, side effects need lifecycle management. 1) LaunchedEffect(key) — launches a coroutine that's cancelled and restarted when key changes. Use for: one-time operations on composition, API calls triggered by state: LaunchedEffect(userId) { viewModel.loadUser(userId) }. 2) DisposableEffect(key) — sets up and tears down a side effect. Returns an onDispose block. Use for: registering/unregistering listeners, observers: DisposableEffect(lifecycle) { val observer = ...; lifecycle.addObserver(observer); onDispose { lifecycle.removeObserver(observer) } }. 3) SideEffect — runs on every successful recomposition. No cleanup. Use for: updating non-Compose state (analytics, logging). 4) rememberCoroutineScope() — creates a scope tied to the composition, for launching coroutines from callbacks: val scope = rememberCoroutineScope(); Button(onClick = { scope.launch { ... } }).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Compose state hoisting pattern.",
        answer: "State hoisting moves state up from a composable to its caller, making the composable stateless and reusable. Pattern: the composable takes the state value and an onValueChange callback as parameters instead of managing state internally. Before hoisting: @Composable fun SearchBar() { var text by remember { mutableStateOf(\"\") }; TextField(value = text, onValueChange = { text = it }) }. After hoisting: @Composable fun SearchBar(text: String, onTextChange: (String) -> Unit) { TextField(value = text, onValueChange = onTextChange) }. The parent controls the state: var searchText by remember { mutableStateOf(\"\") }; SearchBar(text = searchText, onTextChange = { searchText = it }). Benefits: 1) Composable becomes a controlled component — easier to test. 2) Single source of truth — state lives in one place. 3) Shareable — multiple composables can read/write the same state. This mirrors React's controlled component pattern. Hoist to the lowest common ancestor that needs the state.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does Compose handle lists efficiently? LazyColumn/LazyRow.",
        answer: "LazyColumn and LazyRow are Compose's equivalents of RecyclerView — they only compose and render visible items. Usage: LazyColumn { items(users) { user -> UserCard(user) } }. Key features: 1) item/items DSL — add individual items or lists. 2) key parameter — items(users, key = { it.id }) helps Compose identify items for efficient recomposition (like React's key prop). Without keys, reordering causes all items to recompose. 3) contentPadding — padding inside the scrollable area. 4) Arrangement.spacedBy() — spacing between items. 5) stickyHeader — for grouped lists. Internally, LazyColumn uses a SubcomposeLayout that only composes items within the visible viewport + a small prefetch buffer. As the user scrolls, new items are composed and old ones are disposed. The key parameter maps to the slot table's group key — stable keys allow Compose to move slot data instead of recomposing. Performance tips: use stable keys, ensure item composables are skippable (stable params), avoid heavy computations in items, use remember for per-item computations.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is CompositionLocal and when should you use it?",
        answer: "CompositionLocal provides implicit values down the composition tree without passing them as parameters — similar to React Context. Defined with compositionLocalOf (triggers recomposition of readers on change) or staticCompositionLocalOf (doesn't track reads, recomposes entire subtree — use for rarely changing values like theme). Usage: val LocalUserName = compositionLocalOf { \"\" }. Provide: CompositionLocalProvider(LocalUserName provides \"John\") { ChildComposable() }. Read: val name = LocalUserName.current. Built-in examples: LocalContext, LocalLifecycleOwner, LocalDensity, MaterialTheme colors/typography. When to use: 1) Theme/styling data. 2) Navigation controller. 3) Ambient dependencies that many nested composables need. When NOT to use: for business data (use ViewModel), for parent-child communication (use callbacks), or when explicit parameters are clearer. Overuse makes code harder to understand because dependencies are implicit.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you optimize Compose performance?",
        answer: "1) Stability — ensure classes used as parameters are stable (@Stable or @Immutable annotations, or use primitives/data classes with immutable properties). Unstable parameters prevent skipping recomposition. 2) Minimize recomposition scope — read state as close to where it's used as possible. Reading state.value in a parent causes the parent + all children to recompose. Use derivedStateOf for computed values: val showButton by remember { derivedStateOf { listState.firstVisibleItemIndex > 0 } }. 3) Use key() for LazyColumn items. 4) Remember expensive computations: val sorted = remember(list) { list.sortedBy { it.name } }. 5) Avoid allocations in composition — don't create new lambdas or objects inside composables if possible (Compose compiler handles this for many cases). 6) Use Layout Inspector and Compose metrics (compiler reports) to identify unnecessary recompositions. 7) Use Modifier wisely — chain modifiers in the correct order (padding before background vs after changes behavior).",
        difficulty: "advanced",
        type: "concept"
      },
    ]
  },
  {
    id: "architecture",
    title: "Architecture (MVVM, Clean)",
    icon: "Ar",
    questions: [
      {
        question: "Explain MVVM architecture in Android.",
        answer: "MVVM (Model-View-ViewModel) separates concerns into three layers: 1) Model (Data Layer) — repositories, data sources (Room, Retrofit), business logic. Provides data to the ViewModel. 2) View (UI Layer) — Activities, Fragments, Composables. Observes ViewModel state and renders UI. Sends user actions to ViewModel. Never contains business logic. 3) ViewModel — holds and manages UI state. Processes user actions, calls repositories, transforms data. Survives configuration changes. Exposes state as StateFlow/LiveData. Data flow: View → (user action) → ViewModel → (calls) → Repository → (fetches from) → DataSource. Result flows back: DataSource → Repository → ViewModel updates state → View observes and renders. The ViewModel never references the View (no Activity/Fragment references) — this prevents memory leaks and allows easy testing.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "What is Clean Architecture and how does it apply to Android?",
        answer: "Clean Architecture (by Uncle Bob) organizes code into concentric layers with a dependency rule: inner layers know nothing about outer layers. In Android: 1) Domain Layer (innermost) — use cases (interactors), domain models, repository interfaces. Pure Kotlin, no Android dependencies. Example: class GetUserUseCase(private val repo: UserRepository) { suspend operator fun invoke(id: String): User = repo.getUser(id) }. 2) Data Layer — repository implementations, remote data sources (Retrofit services), local data sources (Room DAOs), data mappers. Implements domain interfaces. 3) Presentation Layer (outermost) — ViewModels, UI state classes, Compose/Fragment. Depends on domain layer only. Benefits: testable (domain logic tested without Android), flexible (swap data sources without touching UI), scalable. Trade-offs: more boilerplate (mappers, interfaces), overkill for simple apps. The dependency rule is enforced through Kotlin interfaces — the domain layer defines UserRepository interface, the data layer provides UserRepositoryImpl.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How does Android ViewModel work internally?",
        answer: "ViewModel survives configuration changes (rotation, theme change) because it's stored in a ViewModelStore, not in the Activity/Fragment. Internally: 1) ViewModelStore is a HashMap<String, ViewModel> owned by ViewModelStoreOwner (Activity/Fragment). 2) When you call ViewModelProvider(this).get(MyViewModel::class.java), it checks the store. If the ViewModel exists, returns it. If not, creates one using ViewModelProvider.Factory. 3) During configuration change, the Activity is destroyed and recreated, but the ViewModelStore is retained via NonConfigurationInstances (for Activities) or FragmentManagerViewModel (for Fragments). 4) When the Activity is finally finished (not just recreated), onCleared() is called on all ViewModels in the store. viewModelScope (a SupervisorJob + Dispatchers.Main.immediate) is cancelled in onCleared(). This is why ViewModels must never reference Activity/Context directly — the Activity is destroyed and recreated, but the ViewModel lives on. Use AndroidViewModel or inject Application context if needed.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "Explain the Repository pattern in Android.",
        answer: "The Repository is a mediator between data sources and the rest of the app. It provides a clean API for data access, abstracting whether data comes from network, database, or cache. Example: class UserRepository(private val api: UserApi, private val dao: UserDao) { fun getUser(id: String): Flow<User> = flow { emit(dao.getUser(id)); try { val remote = api.getUser(id); dao.insert(remote); emit(remote) } catch (e: Exception) { /* use cached */ } } }. The repository: 1) Decides the data source — cache first, then network. 2) Handles caching logic — save network responses to Room. 3) Maps between data models — API response DTOs to domain models. 4) Provides a single source of truth — Room database as the SSOT, network updates the database, UI observes the database via Flow. Benefits: ViewModel doesn't care where data comes from, data sources can be swapped independently, caching strategy is centralized. In Clean Architecture, the domain layer defines the repository interface, the data layer implements it.",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "What is Unidirectional Data Flow (UDF) and how is it implemented in Android?",
        answer: "UDF means state flows down (from ViewModel to UI) and events flow up (from UI to ViewModel). The UI never modifies state directly — it sends events/intents to the ViewModel, which processes them and produces new state. Implementation: 1) State: data class UiState(val items: List<Item>, val isLoading: Boolean, val error: String?). 2) Events: sealed class UiEvent { data class Search(val query: String) : UiEvent(), object Refresh : UiEvent() }. 3) ViewModel: private val _state = MutableStateFlow(UiState()); val state: StateFlow<UiState> = _state.asStateFlow(); fun onEvent(event: UiEvent) { when (event) { is Search -> search(event.query); is Refresh -> refresh() } }. 4) UI: val state by viewModel.state.collectAsStateWithLifecycle(); Button(onClick = { viewModel.onEvent(UiEvent.Refresh) }). Benefits: predictable state changes (all go through ViewModel), easy to debug (log all events and state transitions), testable (send events, assert state).",
        difficulty: "mid",
        type: "architecture"
      },
      {
        question: "How do you handle one-time events (Snackbar, Navigation) in MVVM?",
        answer: "Problem: if you use StateFlow for navigation events, re-collecting after configuration change re-triggers navigation. Solutions: 1) SharedFlow with replay=0 — events are consumed once. private val _events = MutableSharedFlow<UiEvent>(); UI collects in a LaunchedEffect. Risk: events emitted when no collector is active are lost. 2) Channel — viewModel sends events via a Channel, UI receives from the Channel's receiveAsFlow(). Channel buffers events so none are lost even without a collector. This is the recommended approach: private val _events = Channel<UiEvent>(); val events = _events.receiveAsFlow(). 3) Event wrapper — wrap the state value in an Event<T> class that can only be consumed once. Anti-pattern but still seen in older codebases. Best practice: separate one-time events from persistent state. Use StateFlow for UI state (what to render) and Channel for events (what to do once).",
        difficulty: "advanced",
        type: "architecture"
      },
    ]
  },
  {
    id: "dependency-injection",
    title: "Hilt & Dependency Injection",
    icon: "Hi",
    questions: [
      {
        question: "What is Dependency Injection and why is it important in Android?",
        answer: "Dependency Injection (DI) is a design pattern where objects receive their dependencies from external sources instead of creating them internally. Without DI: class UserViewModel { val repo = UserRepository(RetrofitClient.api, AppDatabase.dao) } — the ViewModel creates its own dependencies, making it hard to test and tightly coupled. With DI: class UserViewModel @Inject constructor(private val repo: UserRepository) — dependencies are provided externally. Benefits: 1) Testability — inject mock repositories in tests. 2) Loose coupling — change implementations without modifying consumers. 3) Lifecycle management — DI container controls singleton vs per-screen instances. 4) Code reuse — same interface, different implementations (real vs fake). In Android, manual DI is possible (constructor injection) but tedious. Hilt (built on Dagger) automates dependency graph resolution, scoping, and lifecycle management.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How does Hilt work? Explain the key annotations.",
        answer: "Hilt is a compile-time DI framework built on Dagger. Key annotations: 1) @HiltAndroidApp — on Application class, triggers code generation and sets up the root component. 2) @AndroidEntryPoint — on Activity/Fragment/Service to enable injection. 3) @Inject constructor — marks a class as injectable and tells Hilt how to create it. 4) @Module + @InstallIn — provides dependencies that can't use @Inject (interfaces, third-party classes). 5) @Provides — method in a module that creates an instance. 6) @Binds — abstract method that binds an interface to an implementation (more efficient than @Provides). 7) @Singleton, @ViewModelScoped, @ActivityScoped — scoping annotations control instance lifetime. 8) @HiltViewModel — marks a ViewModel for Hilt injection, used with hiltViewModel() in Compose. Example: @Module @InstallIn(SingletonComponent::class) object NetworkModule { @Provides @Singleton fun provideRetrofit(): Retrofit = Retrofit.Builder().baseUrl(URL).build() }.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does Hilt/Dagger work internally? What happens at compile time?",
        answer: "Hilt (built on Dagger 2) uses annotation processing at compile time to generate the entire dependency graph as Java code. Process: 1) The annotation processor scans @Inject, @Module, @Provides, @Binds annotations. 2) It builds a dependency graph — which classes need which dependencies. 3) It validates the graph at compile time — if a dependency is missing, you get a compile error (not a runtime crash like with reflection-based DI). 4) It generates Factory classes for each @Inject class: UserRepository_Factory.create(api, dao). 5) It generates Component classes that wire everything together: SingletonComponent holds all @Singleton providers. 6) Hilt adds an extra layer: it generates Android-specific components (ActivityComponent, FragmentComponent, ViewModelComponent) with proper lifecycle scoping. The generated code is pure Java — no reflection at runtime. This makes Dagger/Hilt fast at runtime (unlike Koin which uses reflection). Trade-off: longer compile times due to annotation processing, and harder-to-read error messages.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "Explain Hilt components and scoping.",
        answer: "Hilt defines a component hierarchy matching Android's lifecycle: SingletonComponent (Application lifecycle) → ActivityRetainedComponent (survives config changes) → ViewModelComponent (ViewModel lifecycle) → ActivityComponent → FragmentComponent → ViewComponent. Each component has a scope annotation: @Singleton (lives as long as the app), @ActivityRetainedScoped, @ViewModelScoped (one per ViewModel), @ActivityScoped, @FragmentScoped. @InstallIn determines which component a module belongs to. If you @Provides a dependency in SingletonComponent with @Singleton, one instance is shared across the entire app. If @ViewModelScoped, each ViewModel gets its own instance. Without a scope annotation, a new instance is created every time it's requested. Example: Retrofit should be @Singleton (one shared instance). Repository can be @ViewModelScoped (each screen has its own). Use case objects are typically unscoped (stateless, cheap to create).",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you provide different implementations with Hilt? (@Qualifier)",
        answer: "When you have multiple implementations of the same type, use @Qualifier annotations: @Qualifier annotation class IoDispatcher; @Qualifier annotation class MainDispatcher. In the module: @Provides @IoDispatcher fun provideIoDispatcher(): CoroutineDispatcher = Dispatchers.IO; @Provides @MainDispatcher fun provideMainDispatcher(): CoroutineDispatcher = Dispatchers.Main. At the injection site: class MyRepo @Inject constructor(@IoDispatcher private val dispatcher: CoroutineDispatcher). Hilt also provides built-in qualifiers: @ApplicationContext and @ActivityContext for Context injection. Another approach is @Binds with qualifiers for interface implementations: @Binds @Named(\"remote\") abstract fun bindRemoteSource(impl: RemoteDataSource): DataSource; @Binds @Named(\"local\") abstract fun bindLocalSource(impl: LocalDataSource): DataSource.",
        difficulty: "mid",
        type: "concept"
      },
    ]
  },
  {
    id: "navigation",
    title: "Navigation & Lifecycle",
    icon: "Na",
    questions: [
      {
        question: "Explain the Android Activity lifecycle in detail.",
        answer: "Activity lifecycle methods: 1) onCreate() — Activity created, set up UI (setContentView/setContent), initialize variables, restore saved state. Called once per creation. 2) onStart() — Activity becomes visible. Register UI-related observers. 3) onResume() — Activity in foreground, interactive. Start animations, acquire camera, resume paused operations. 4) onPause() — Another activity coming to foreground. Pause animations, save draft data. Keep it quick — next activity's onResume() waits. 5) onStop() — Activity no longer visible. Release heavy resources, save data. The Activity may be killed after this. 6) onDestroy() — Activity being destroyed (finish() called or config change). Clean up. 7) onRestart() — Called when Activity returns from stopped state (before onStart). Configuration change flow: onPause → onStop → onDestroy → onCreate → onStart → onResume (new instance, old state via savedInstanceState Bundle). The system can kill a stopped Activity's process — onSaveInstanceState() is called before onStop() to save transient state for restoration.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How does Jetpack Navigation work with Compose?",
        answer: "Jetpack Navigation Compose provides a NavHost and NavController for declarative navigation. Setup: val navController = rememberNavController(); NavHost(navController, startDestination = \"home\") { composable(\"home\") { HomeScreen(onNavigate = { navController.navigate(\"detail/$id\") }) }; composable(\"detail/{id}\") { backStackEntry -> DetailScreen(id = backStackEntry.arguments?.getString(\"id\")) } }. Key concepts: 1) NavController — manages the back stack, handles navigation actions. 2) NavHost — composable container that swaps screens. 3) Routes — string-based destinations with optional arguments. 4) Arguments — passed via route: \"detail/{id}\" with navController.navigate(\"detail/123\"). 5) Deep links — NavHost supports deep link URIs. Type-safe navigation (Kotlin 2.0+): use @Serializable route classes instead of strings. Navigation with Hilt: use hiltViewModel() inside composable destinations — each destination gets its own scoped ViewModel.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does the Android back stack work internally?",
        answer: "The navigation back stack is a LIFO stack of NavBackStackEntry objects. Each entry represents a destination with its arguments, lifecycle, ViewModel store, and saved state. When you navigate forward, a new entry is pushed. When you press back, the top entry is popped and destroyed. NavController operations: navigate() — pushes new destination. popBackStack() — pops current and returns to previous. navigate with popUpTo — pops destinations up to a specified one before navigating (useful for clearing the stack: navigate(\"home\") { popUpTo(\"home\") { inclusive = true } } replaces home instead of stacking). launchSingleTop — prevents duplicate destinations on top. saveState/restoreState — saves popped destination state for later restoration (used in bottom navigation to preserve tab state). The back stack is lifecycle-aware: entries move through CREATED → STARTED → RESUMED lifecycle states. Only the top entry is RESUMED. Entries below are STARTED (visible) or CREATED (in the stack but not visible).",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "What is the difference between Activity, Fragment, and Composable lifecycle?",
        answer: "Activity Lifecycle: onCreate → onStart → onResume → onPause → onStop → onDestroy. Managed by the system. Long-lived — can survive in the back stack. Fragment Lifecycle: same methods plus onCreateView/onDestroyView (view can be destroyed while Fragment lives). Fragment lifecycle is tied to its host Activity but can outlive its view. This dual lifecycle causes common bugs (accessing views after onDestroyView). Composable Lifecycle: composition → recomposition(s) → leaving composition. Much simpler. A composable enters composition when it appears in the tree and leaves when removed. Recomposition can happen many times. Side effects (LaunchedEffect, DisposableEffect) are tied to the composable's presence in the composition. Compose eliminates Fragment lifecycle bugs because there's no separate view lifecycle. ViewModel works with all three — it survives Activity recreation, Fragment detach/reattach, and Compose navigation.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you handle process death and state restoration?",
        answer: "When the system kills the app's process (low memory), all non-saved state is lost. Restoration layers: 1) onSaveInstanceState(Bundle) — save small transient state (scroll position, text input, selected tab). Restored in onCreate(savedInstanceState). Max ~1MB. 2) rememberSaveable in Compose — automatically saves to/restores from Bundle. 3) SavedStateHandle in ViewModel — Hilt injects it automatically. val query = savedStateHandle.getStateFlow(\"query\", \"\"). Survives process death. 4) Room database — persistent storage, survives everything. 5) DataStore/SharedPreferences — for user preferences. What NOT to save in Bundle: large objects, Bitmaps, complex data structures. Store IDs in Bundle and re-fetch from database/network. Testing process death: Developer Options → 'Don't keep activities', or adb shell am kill <package>. Common bug: ViewModel data lost on process death because StateFlow isn't saved. Solution: use SavedStateHandle or load from Room.",
        difficulty: "advanced",
        type: "concept"
      },
    ]
  },
  {
    id: "room-database",
    title: "Room Database",
    icon: "Rm",
    questions: [
      {
        question: "What is Room and how does it work?",
        answer: "Room is Jetpack's abstraction over SQLite providing compile-time SQL verification, Flow/coroutine integration, and less boilerplate. Three components: 1) @Entity — annotated data class representing a table: @Entity data class User(@PrimaryKey val id: Int, val name: String, val email: String). 2) @Dao — interface with SQL methods: @Dao interface UserDao { @Query(\"SELECT * FROM user\") fun getAll(): Flow<List<User>>; @Insert(onConflict = REPLACE) suspend fun insert(user: User); @Delete suspend fun delete(user: User) }. 3) @Database — abstract class extending RoomDatabase: @Database(entities = [User::class], version = 1) abstract class AppDatabase : RoomDatabase() { abstract fun userDao(): UserDao }. Room validates SQL queries at compile time — if you write invalid SQL or reference a non-existent column, you get a compile error. It generates the DAO implementation code, handling cursor iteration, column mapping, and transaction management.",
        difficulty: "beginner",
        type: "concept"
      },
      {
        question: "How does Room work internally? What code does it generate?",
        answer: "The Room annotation processor generates: 1) DAO implementations (UserDao_Impl) — each @Query method becomes a method that: creates a SQLite query string, binds parameters, executes the query, iterates the Cursor, maps columns to the entity's constructor, and returns the result. For Flow-returning DAOs, it creates an InvalidationTracker observer that re-queries when the table changes. 2) Database implementation (AppDatabase_Impl) — implements the abstract database class, creates tables via SQL CREATE statements in createAllTables(), handles migrations, and creates DAO instances. 3) The InvalidationTracker monitors table modifications — when an INSERT/UPDATE/DELETE is executed, it marks the table as 'invalidated'. All Flow/LiveData observers on that table are notified and re-execute their queries. This is how Room provides reactive queries — you don't need to manually refresh after writing data. The generated code is pure SQLite — no ORM magic, just type-safe SQL with compile-time checks.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How do you handle Room database migrations?",
        answer: "When you change the schema (add column, rename table, etc.), you must increment the database version and provide a Migration. Manual migration: val MIGRATION_1_2 = object : Migration(1, 2) { override fun migrate(db: SupportSQLiteDatabase) { db.execSQL(\"ALTER TABLE user ADD COLUMN age INTEGER NOT NULL DEFAULT 0\") } }. Room.databaseBuilder(...).addMigrations(MIGRATION_1_2). Auto-migration (Room 2.4+): @Database(version = 2, autoMigrations = [@AutoMigration(from = 1, to = 2)]). Auto-migration handles simple cases (add column, add table). For complex changes (rename, delete column), provide an AutoMigrationSpec. If no migration is provided, Room throws IllegalStateException (or drops and recreates the database with fallbackToDestructiveMigration()). Best practice: always write migrations for production apps — destructive migration loses user data. Write migration tests using MigrationTestHelper.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Room relationships — @Embedded, @Relation, ForeignKey.",
        answer: "1) @Embedded — flattens another object's fields into the current entity's table: @Entity data class User(val id: Int, @Embedded val address: Address). Address fields become columns in the User table. 2) @Relation — defines a relationship in a result class (not an entity): data class UserWithPosts(@Embedded val user: User, @Relation(parentColumn = \"id\", entityColumn = \"userId\") val posts: List<Post>). Query: @Query(\"SELECT * FROM user\") fun getUsersWithPosts(): List<UserWithPosts>. Room runs two queries internally (one for users, one for posts). 3) @ForeignKey — enforces referential integrity at the database level: @Entity(foreignKeys = [ForeignKey(entity = User::class, parentColumns = [\"id\"], childColumns = [\"userId\"], onDelete = CASCADE)]). Key difference: @Relation is for reading (query-time join), @ForeignKey is for writing (constraint enforcement). For many-to-many: use a junction/cross-reference table with @Relation and associateBy.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How does Room integrate with Kotlin Flow for reactive queries?",
        answer: "When a DAO method returns Flow<T>, Room generates code that: 1) Executes the query and emits the initial result. 2) Registers an InvalidationTracker observer on the queried tables. 3) When any write operation (INSERT/UPDATE/DELETE) modifies the table, the tracker fires, and the Flow re-executes the query and emits the new result. This is the 'single source of truth' pattern: the UI observes a Flow from Room, the network response is saved to Room, and Room automatically pushes the update to the UI. Example: @Query(\"SELECT * FROM user WHERE id = :id\") fun getUser(id: Int): Flow<User?>. In ViewModel: val user = userDao.getUser(id).stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null). The SharingStarted.WhileSubscribed(5000) keeps the Flow active for 5 seconds after the last collector — prevents re-querying on quick config changes. Room Flow queries run on Dispatchers.IO internally — you don't need withContext(Dispatchers.IO).",
        difficulty: "mid",
        type: "internal"
      },
    ]
  },
  {
    id: "networking",
    title: "Networking (Retrofit, OkHttp)",
    icon: "Nw",
    questions: [
      {
        question: "How does Retrofit work? Explain its architecture.",
        answer: "Retrofit is a type-safe HTTP client that turns your API interface into callable Kotlin functions. Architecture: 1) Define interface: interface UserApi { @GET(\"users/{id}\") suspend fun getUser(@Path(\"id\") id: String): User }. 2) Create instance: Retrofit.Builder().baseUrl(URL).addConverterFactory(GsonConverterFactory.create()).build().create(UserApi::class.java). 3) Call: val user = api.getUser(\"123\"). Internally, Retrofit uses dynamic proxy (Java Proxy.newProxyInstance) — when you call api.getUser(), the proxy intercepts the call, reads the annotations (@GET, @Path), builds an OkHttp Request, executes it, and deserializes the response using the converter factory. For suspend functions, Retrofit creates a Call object and uses suspendCancellableCoroutine to bridge OkHttp's callback to coroutine suspension. The converter factory (Gson, Moshi, Kotlinx.serialization) handles JSON ↔ object mapping.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "How does OkHttp work internally? Explain the interceptor chain.",
        answer: "OkHttp processes HTTP requests through a chain of interceptors (Chain of Responsibility pattern). The chain (in order): 1) Application interceptors — added by you (logging, auth headers). Run first, see the original request. 2) RetryAndFollowUpInterceptor — handles retries and redirects. 3) BridgeInterceptor — adds headers (Content-Type, Accept-Encoding, Cookie), decompresses gzip responses. 4) CacheInterceptor — checks if a valid cached response exists. If so, returns it without hitting the network. 5) ConnectInterceptor — opens a TCP connection (or reuses from the connection pool). Handles TLS handshake for HTTPS. 6) Network interceptors — added by you. See the actual network request (after redirects, with all headers). 7) CallServerInterceptor — sends the request and reads the response over the wire. Each interceptor calls chain.proceed(request) to pass to the next interceptor and receives the Response back. This design allows inserting custom logic at any point — logging, auth token refresh, retry logic, caching — without modifying the core HTTP engine.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How do you handle authentication (token refresh) with OkHttp?",
        answer: "Use OkHttp's Authenticator for automatic token refresh on 401 responses: val authenticator = object : Authenticator { override fun authenticate(route: Route?, response: Response): Request? { if (response.request.header(\"Authorization\") != null) { val newToken = runBlocking { tokenManager.refreshToken() }; return if (newToken != null) response.request.newBuilder().header(\"Authorization\", \"Bearer $newToken\").build() else null } return null } }. OkHttpClient.Builder().authenticator(authenticator). For attaching tokens to every request, use an Interceptor: class AuthInterceptor(private val tokenManager: TokenManager) : Interceptor { override fun intercept(chain: Chain): Response { val token = tokenManager.getAccessToken(); val request = chain.request().newBuilder().header(\"Authorization\", \"Bearer $token\").build(); return chain.proceed(request) } }. The Authenticator is called only on 401 — it can retry with a new token. Guard against infinite loops: if the refresh itself returns 401, return null to give up.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you handle network errors gracefully in an Android app?",
        answer: "Layered approach: 1) Repository level — wrap API calls in try-catch, return a sealed class Result: sealed class Result<T> { data class Success(val data: T), data class Error(val message: String, val exception: Exception?), object Loading }. 2) Common exceptions: IOException (no network), HttpException (API error 4xx/5xx), SocketTimeoutException. 3) ViewModel — map Result to UiState: when (result) { is Success -> UiState.Success(result.data); is Error -> UiState.Error(result.message) }. 4) UI — display error state with retry button. 5) Global OkHttp interceptor for common handling: connectivity check before requests, logging all errors. 6) Retry logic: use Kotlin Flow's retry(3) { it is IOException } for automatic retries with exponential backoff. Best practice: never show raw exception messages to users. Map them to user-friendly strings. Provide offline support via Room cache — show cached data with a 'you are offline' banner.",
        difficulty: "mid",
        type: "concept"
      },
    ]
  },
  {
    id: "android-internals",
    title: "Android Internals",
    icon: "In",
    questions: [
      {
        question: "Explain how the Android system starts an Activity.",
        answer: "When you call startActivity(intent): 1) The current Activity calls startActivity(), which calls Instrumentation.execStartActivity(). 2) This sends a Binder IPC call to ActivityManagerService (AMS) in the system_server process. 3) AMS resolves the Intent (finds the target Activity, checks permissions, resolves implicit intents via PackageManager). 4) AMS checks if the target app's process is running. If not, AMS tells Zygote to fork a new process. 5) The new process starts ActivityThread.main() (the app's main thread entry point), creates an Application object, and calls Application.onCreate(). 6) AMS sends a LAUNCH_ACTIVITY transaction back to the app's process via Binder IPC. 7) ActivityThread handles the message, creates the Activity instance via ClassLoader, attaches a Context and Window, and calls Activity.onCreate(). 8) The Activity inflates its layout, the ViewRootImpl schedules a traversal (measure → layout → draw), and the Window becomes visible. The entire flow involves: app process → Binder IPC → system_server (AMS) → Binder IPC → app process (or Zygote fork).",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How does the Android main thread (Looper, Handler, MessageQueue) work?",
        answer: "Every Android thread can have at most one Looper. The main thread's Looper is created in ActivityThread.main(): Looper.prepareMainLooper(); ... Looper.loop(). The Looper runs an infinite loop, pulling Messages from a MessageQueue and dispatching them to their target Handler. A Handler is bound to a Looper/MessageQueue. You post a Message or Runnable to a Handler, it enqueues it, and the Looper eventually picks it up and runs it on the Handler's thread. This is how all UI operations work: 1) Touch events are enqueued as Messages by the input system. 2) View.post(runnable) posts to the main Handler. 3) Activity lifecycle callbacks (onCreate, onResume) are sent as Messages from AMS via the H (Handler) in ActivityThread. 4) Coroutines with Dispatchers.Main post Runnables to the main Handler. If the main thread's MessageQueue is blocked by a long-running operation (>5 seconds), the system shows an ANR (Application Not Responding) dialog. This is why all heavy work must happen off the main thread.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "What is Context in Android? What are the different types?",
        answer: "Context is an abstract class that provides access to application-wide resources and services: getResources(), getSystemService(), startActivity(), sendBroadcast(), getSharedPreferences(). Types: 1) Application Context (getApplicationContext()) — singleton, lives for the entire app process. Safe for singletons, DI containers, database instances. Cannot start Activities (no task affinity) or inflate layouts (no theme). 2) Activity Context — tied to the Activity lifecycle. Has a theme, can start Activities, inflate layouts with correct styling. Risk: storing a reference causes memory leaks if the Activity is destroyed. 3) Service Context — similar to Application Context. 4) ContentProvider Context — available in ContentProvider. 5) In Compose: LocalContext.current provides the nearest Activity context. Rules: use Application Context for long-lived objects (Retrofit, Room, Singletons). Use Activity Context for UI operations (dialogs, Toast, layout inflation). Never store Activity Context in a ViewModel — use Application Context or avoid Context entirely.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "How does RecyclerView work internally and how does it compare to LazyColumn?",
        answer: "RecyclerView uses the ViewHolder pattern with item recycling: 1) LayoutManager determines item positions (LinearLayoutManager, GridLayoutManager). 2) As items scroll off-screen, their ViewHolder (containing the inflated View) is placed in a RecyclerPool. 3) When new items scroll in, RecyclerView reuses a ViewHolder from the pool, and the Adapter binds new data to it (onBindViewHolder). 4) This avoids re-inflating views (expensive XML → View), only rebinding data (cheap). DiffUtil calculates the minimum set of changes (insertions, removals, moves) for efficient updates. LazyColumn in Compose: 1) Uses SubcomposeLayout — only composes visible items. 2) No ViewHolder recycling — instead, Compose disposes off-screen items and composes new ones. 3) The slot table stores composition data; keys help Compose reuse state when items move. 4) State restoration is per-key, not per-position. Key differences: RecyclerView recycles Views (expensive to create, cheap to rebind). LazyColumn recomposes (composition is lightweight). LazyColumn has simpler API but RecyclerView offers more customization (ItemAnimator, ItemDecoration, SnapHelper).",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "Explain Android memory management and common memory leaks.",
        answer: "Android uses a managed runtime (ART) with garbage collection. Each app has a heap limit (typically 256-512MB). The GC collects objects with no strong references. Common memory leaks: 1) Static reference to Activity/Context — a static variable holding an Activity prevents GC. Fix: use Application Context or WeakReference. 2) Inner class holding outer class reference — anonymous inner classes (listeners, callbacks) hold an implicit reference to the enclosing Activity. Fix: use static inner class or lambda with weak reference. 3) Unregistered listeners — registering a BroadcastReceiver or sensor listener in onResume but forgetting to unregister in onPause. 4) ViewModel referencing View/Activity — ViewModel outlives the Activity. 5) Coroutine leaks — using GlobalScope instead of viewModelScope/lifecycleScope. The cancelled scope ensures coroutines are stopped. Detection tools: LeakCanary (auto-detects leaks in debug builds), Android Studio Profiler (heap dump, allocation tracking), and StrictMode for detecting long operations on the main thread.",
        difficulty: "mid",
        type: "concept"
      },
    ]
  },
  {
    id: "data-storage",
    title: "DataStore & Storage",
    icon: "Ds",
    questions: [
      {
        question: "What is Jetpack DataStore and how does it compare to SharedPreferences?",
        answer: "DataStore is Jetpack's modern data storage solution replacing SharedPreferences. Two types: 1) Preferences DataStore — key-value pairs (like SharedPreferences but better). 2) Proto DataStore — typed objects using Protocol Buffers. DataStore vs SharedPreferences: 1) Async — DataStore uses Flow and suspend functions, never blocks the main thread. SharedPreferences.commit() can block; apply() writes to disk asynchronously but can lose data on crash. 2) Thread-safe — DataStore handles concurrency internally. SharedPreferences has no built-in thread safety. 3) Error handling — DataStore wraps IOExceptions in Flow. SharedPreferences silently fails. 4) No apply() data loss — DataStore transactions are atomic. 5) Type safety — Proto DataStore uses generated code for typed access. Usage: val dataStore = context.createDataStore(\"settings\"); suspend fun saveTheme(dark: Boolean) { dataStore.edit { it[booleanPreferencesKey(\"dark_theme\")] = dark } }; val theme: Flow<Boolean> = dataStore.data.map { it[booleanPreferencesKey(\"dark_theme\")] ?: false }.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "When should you use Room vs DataStore vs File storage?",
        answer: "Room: structured, relational data that needs querying (search, filter, sort, join). Examples: user data, messages, product catalog, order history. Use when you have complex data relationships or need SQL queries. DataStore: small key-value settings or typed preferences. Examples: theme preference, login state, feature flags, user settings. Max ~1MB recommended. Use Preferences DataStore for simple key-value, Proto DataStore for complex typed objects. File storage: binary data, large files, media. Examples: cached images, downloaded PDFs, log files. Use internal storage (getFilesDir()) for private data, external storage for shared media. Network cache: use OkHttp cache for HTTP responses (ETags, Cache-Control). Summary: Room for structured data with queries, DataStore for preferences/settings, files for binary/large data, OkHttp cache for network responses.",
        difficulty: "beginner",
        type: "concept"
      },
    ]
  },
  {
    id: "testing-android",
    title: "Testing in Android",
    icon: "Te",
    questions: [
      {
        question: "What are the different types of tests in Android?",
        answer: "1) Unit Tests (test/) — run on JVM, no Android framework. Test ViewModels, repositories, use cases, utility functions. Fast (~ms per test). Use JUnit, Mockito/MockK, Turbine (for Flow), coroutines-test. Example: test that ViewModel produces correct UiState for given repository response. 2) Integration Tests — test interaction between components. Can run on JVM (with Robolectric simulating Android) or device. Example: test ViewModel + Repository together. 3) UI Tests (androidTest/) — run on device/emulator. Test actual UI rendering and interaction. Use Compose Testing (ComposeTestRule) or Espresso (View-based). Example: test that clicking a button shows a dialog. Compose testing: composeTestRule.onNodeWithText(\"Login\").performClick(); composeTestRule.onNodeWithText(\"Welcome\").assertIsDisplayed(). Testing pyramid: many unit tests (fast, cheap), fewer integration tests, fewest UI tests (slow, flaky). Aim for: 70% unit, 20% integration, 10% UI.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you test a ViewModel with coroutines and Flow?",
        answer: "Setup: use kotlinx-coroutines-test for controlling coroutine execution. Inject TestDispatcher into ViewModel. Use Turbine for Flow assertions. Example: @Test fun `load users success`() = runTest { val fakeRepo = FakeUserRepository(listOf(User(\"1\", \"John\"))); val viewModel = UserViewModel(fakeRepo, StandardTestDispatcher(testScheduler)); viewModel.uiState.test { assertEquals(UiState.Loading, awaitItem()); viewModel.loadUsers(); advanceUntilIdle(); assertEquals(UiState.Success(listOf(User(\"1\", \"John\"))), awaitItem()); cancelAndConsumeRemainingEvents() } }. Key patterns: 1) Use Fakes over Mocks — implement the repository interface with controlled behavior. 2) Inject dispatchers — never hardcode Dispatchers.IO in ViewModel, use a parameter. 3) Use Turbine — viewModel.stateFlow.test { awaitItem() } for testing Flow emissions. 4) advanceUntilIdle() — ensures all pending coroutines complete.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "How do you test Jetpack Compose UI?",
        answer: "Compose provides a testing framework with ComposeTestRule: @get:Rule val composeTestRule = createComposeRule(). Write the composable: composeTestRule.setContent { MyScreen(viewModel = fakeViewModel) }. Find nodes: onNodeWithText(\"Hello\"), onNodeWithContentDescription(\"Back button\"), onNodeWithTag(\"input_email\"). Perform actions: performClick(), performTextInput(\"john@email.com\"), performScrollTo(). Assert: assertIsDisplayed(), assertIsEnabled(), assertTextEquals(\"Expected\"). Testing state changes: set up fake ViewModel state, verify UI renders correctly. Example: @Test fun `shows error message on failure`() { fakeViewModel.setState(UiState.Error(\"Network error\")); composeTestRule.setContent { UserScreen(viewModel = fakeViewModel) }; composeTestRule.onNodeWithText(\"Network error\").assertIsDisplayed(); composeTestRule.onNodeWithText(\"Retry\").assertIsDisplayed() }. Use semantics and testTags for finding nodes that don't have visible text. Run with Robolectric for faster tests without a device.",
        difficulty: "mid",
        type: "concept"
      },
    ]
  },
  {
    id: "performance",
    title: "Performance & Optimization",
    icon: "Pf",
    questions: [
      {
        question: "How do you optimize app startup time?",
        answer: "App startup types: Cold (process not running, slowest), Warm (process alive but Activity destroyed), Hot (Activity in background). Optimization: 1) App Startup library — lazy-initialize libraries. Instead of initializing everything in Application.onCreate(), use Initializer<T> with dependencies. 2) Avoid heavy work in Application.onCreate() — defer non-critical initialization (analytics, crash reporting) to background. 3) Use Baseline Profiles — pre-compiled code paths that ART uses for faster execution. Create with Macrobenchmark library. Improves cold start by 30-40%. 4) Minimize main thread work during first frame — avoid synchronous disk reads, network calls, or large object creation. 5) Splash Screen API — show a lightweight splash while the app initializes. 6) In Compose: avoid heavy composition in the first screen. Use placeholder/skeleton UI while data loads. Measurement: use android.app.ActivityManager.getHistoricalProcessStartTime(), logcat 'Displayed' time, or Macrobenchmark library for automated measurement.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What are Baseline Profiles and how do they improve performance?",
        answer: "Baseline Profiles are a list of classes and methods that should be pre-compiled (AOT) at install time. Without them, ART uses Just-In-Time (JIT) compilation — methods are interpreted first, then compiled as they're used. This causes jank during cold start and first interactions. With Baseline Profiles, critical code paths are pre-compiled, so they run at native speed from the first launch. Creation: use Macrobenchmark library to record user journeys: @Test fun startup() { baselineRule.collect(\"com.myapp\") { startActivityAndWait(); device.findObject(By.text(\"Login\")).click() } }. This generates a .prof file included in the APK. At install time, ART reads the profile and compiles those methods ahead of time. Impact: 30-40% faster cold start, smoother scrolling and navigation on first use. All Jetpack libraries include their own baseline profiles. Google reports that the Play Store app's startup improved by 30% with Baseline Profiles.",
        difficulty: "advanced",
        type: "internal"
      },
      {
        question: "How do you detect and fix UI jank in Android?",
        answer: "Jank = dropped frames. Android targets 60fps (16.67ms per frame) or 120fps (8.33ms). If a frame takes longer, it's dropped. Detection: 1) Layout Inspector — shows the composition tree and recomposition counts in Compose. 2) Android Studio Profiler — CPU traces show which methods take too long. 3) systrace/Perfetto — system-level tracing showing frame timing, main thread activity. 4) StrictMode — detects disk/network operations on the main thread. 5) Compose Compiler metrics — show which composables are skippable/restartable and which parameters are unstable. Common causes and fixes: 1) Unstable parameters causing unnecessary recomposition → make classes @Immutable or use wrapper. 2) Heavy computation in composition → move to ViewModel or use remember. 3) Large images without downsampling → use Coil/Glide with size constraints. 4) Nested scrolling/deep layout hierarchies → flatten layouts. 5) Disk/network on main thread → use coroutines with IO dispatcher. 6) Missing keys in LazyColumn → add key parameter for stable item identity.",
        difficulty: "mid",
        type: "concept"
      },
    ]
  },
  {
    id: "common-libraries",
    title: "Common Libraries & Patterns",
    icon: "Lb",
    questions: [
      {
        question: "How does Coil (image loading) work internally?",
        answer: "Coil (Coroutine Image Loader) loads images asynchronously using coroutines. Architecture: 1) ImageRequest — defines what to load (URL, resource), where to display (ImageView, Compose), and transformations (circle crop, blur). 2) ImageLoader — singleton that processes requests. It maintains a MemoryCache (LRU cache of decoded Bitmaps) and a DiskCache (HTTP responses cached on disk). 3) Pipeline: check memory cache → check disk cache → fetch from network (OkHttp) → decode (BitmapFactory/ImageDecoder) → apply transformations → cache result → display. In Compose: AsyncImage(model = url, contentDescription = null). Internally, Coil creates a coroutine in the composition scope, loads the image off the main thread, and triggers recomposition with the result. Key features: automatic request cancellation when the composable leaves composition (or ImageView is detached), memory-efficient (samples large images to the target size), and supports animated GIFs/WebP/SVG.",
        difficulty: "mid",
        type: "internal"
      },
      {
        question: "What is WorkManager and when should you use it?",
        answer: "WorkManager is Jetpack's library for guaranteed background work — tasks that must execute even if the app exits or device restarts. Use cases: uploading photos, syncing data, periodic log cleanup, sending analytics. NOT for: real-time tasks (use coroutines) or exact-time tasks (use AlarmManager). Key features: 1) Guaranteed execution — persists work to a Room database, reschedules after reboot. 2) Constraints — run only when connected to WiFi, charging, idle: Constraints.Builder().setRequiredNetworkType(NetworkType.UNMETERED).build(). 3) Chaining — sequential and parallel work chains: WorkManager.enqueue(workA.then(workB).then(workC)). 4) Unique work — ensureSingleton or replace existing: enqueueUniqueWork(\"sync\", KEEP, syncWork). 5) Observability — observe work status as LiveData/Flow. Internally, WorkManager uses JobScheduler (API 23+), GcmNetworkManager, or AlarmManager + BroadcastReceiver as the underlying scheduler, choosing the best option for the device.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain the Paging 3 library for loading large datasets.",
        answer: "Paging 3 loads data incrementally from a local or remote source. Three layers: 1) PagingSource — defines how to load a page of data: override suspend fun load(params: LoadParams<Int>): LoadResult<Int, User>. Returns LoadResult.Page(data, prevKey, nextKey) or LoadResult.Error. 2) Pager — creates a Flow<PagingData<T>>: Pager(PagingConfig(pageSize = 20)) { UserPagingSource(api) }.flow. 3) LazyPagingItems (Compose) — collects PagingData and provides items to LazyColumn: val users = pager.collectAsLazyPagingItems(); LazyColumn { items(users.itemCount) { index -> users[index]?.let { UserCard(it) } } }. For offline-first: RemoteMediator loads from network, saves to Room, and PagingSource reads from Room (Room as single source of truth). LoadStates track loading/error states for: refresh (initial load), prepend (top), and append (bottom). This handles infinite scrolling, pull-to-refresh, error/retry, and placeholder loading indicators with minimal boilerplate.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "What is the difference between Serializable and Parcelable in Android?",
        answer: "Both convert objects to a byte stream for IPC (Intent extras, Bundle). Serializable: Java interface, uses reflection to serialize all fields. Simple (just implement Serializable), but slow — creates temporary objects and uses reflection. Performance overhead of 5-10x compared to Parcelable. Parcelable: Android-specific interface, requires explicit writeToParcel() and CREATOR implementation. Fast — direct memory write, no reflection. The @Parcelize Kotlin plugin auto-generates the implementation: @Parcelize data class User(val name: String, val age: Int) : Parcelable. Best practice: always use @Parcelize for Android IPC (Activity arguments, Fragment arguments, savedInstanceState). Use Kotlinx.serialization for network/disk (JSON, ProtoBuf). Avoid Serializable in Android — it's slower and creates GC pressure. Exception: Serializable is acceptable for complex objects that Parcelable can't handle (circular references, deep graphs) but this is rare.",
        difficulty: "mid",
        type: "concept"
      },
      {
        question: "Explain Kotlin Multiplatform (KMP) — how does it relate to Android development?",
        answer: "KMP allows sharing Kotlin code across platforms: Android, iOS, Desktop, Web. Structure: commonMain (shared code: business logic, data models, networking, database), androidMain (Android-specific: UI, platform APIs), iosMain (iOS-specific: Swift/UIKit interop). In Android development: you write shared logic once (use cases, repositories, networking with Ktor, database with SQLDelight or Room with KMP support) and use it on both Android and iOS. The UI layer remains platform-specific — Jetpack Compose on Android, SwiftUI on iOS. Benefits: 1) Code reuse — 50-70% of business logic shared. 2) Single source of truth for business rules. 3) Gradual adoption — start sharing one module. Trade-offs: 1) iOS developers need to understand Kotlin. 2) Platform-specific APIs need expect/actual declarations. 3) Debugging across platforms is harder. KMP is increasingly popular — Google now officially supports it for Jetpack libraries (Room, DataStore).",
        difficulty: "mid",
        type: "concept"
      },
    ]
  },
];
