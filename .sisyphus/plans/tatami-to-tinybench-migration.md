# tatami-ng to tinybench Migration

## TL;DR

> **Quick Summary**: Migrate all 17 benchmark files from tatami-ng to tinybench, maintaining identical benchmark behavior with a simpler console.table() output format.
>
> **Deliverables**:
>
> - All 17 benchmark files converted to tinybench API
> - package.json updated (add tinybench, remove tatami-ng)
> - All benchmarks verified to run successfully
>
> **Estimated Effort**: Medium (2-3 hours)
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 → Task 2-18 (parallel) → Task 19

---

## Context

### Original Request

User requested a migration from `tatami-ng` benchmarking library to `tinybench` across the entire benchmarks-js project.

### Interview Summary

**Key Discussions**:

- **Migration level**: Direct 1:1 migration - preserve exact same benchmarks, just change the library
- **Output format**: Simple console.table() - no custom formatting needed
- **Strategy**: Big bang - migrate all files, verify each one after migration
- **Verification**: Execute each benchmark post-migration to confirm it works

**Research Findings**:

- Project has 17 benchmark files with identical tatami-ng patterns
- One special case: `round-robin-index.mjs` uses `before:` hooks for state reset
- tinybench uses `beforeEach` instead of `before:` for per-iteration setup
- All files use consistent ESM imports and group/bench/run pattern

### Metis Review

**Identified Gaps** (addressed):

- **Hook migration**: `before:` → `beforeEach` for round-robin-index.mjs (Task 16 handles this)
- **Dynamic group names**: Template literals preserved in bench name parameter
- **Parameter-style benchmarks**: `(obj = object) =>` syntax preserved as-is
- **Commented code**: Will be migrated to new API style if uncommented
- **No scope creep**: No warmup, concurrency, or custom formatting additions

---

## Work Objectives

### Core Objective

Replace tatami-ng with tinybench across all benchmark files while maintaining identical benchmark behavior and results.

### Concrete Deliverables

- 17 migrated benchmark files (\*.mjs)
- Updated package.json with tinybench dependency
- Removed tatami-ng dependency

### Definition of Done

- [ ] `node <file>.mjs` runs successfully for all 17 benchmarks
- [ ] No tatami-ng imports remain in codebase
- [ ] tinybench is the only benchmarking dependency

### Must Have

- All existing benchmarks preserved exactly
- Same benchmark names and groupings
- Each benchmark executes and produces output
- Hook behavior preserved for round-robin-index.mjs

### Must NOT Have (Guardrails)

- NO custom output formatting (just console.table)
- NO warmup configuration
- NO concurrency features
- NO changes to benchmark logic itself
- NO modifications to benchmark-utils.mjs (utility file, not a benchmark)
- NO new benchmarks or removed benchmarks

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> Every criterion is verified by running a command or using a tool.

### Test Decision

- **Infrastructure exists**: NO (no test framework in project)
- **Automated tests**: None (benchmarks are self-verifying via execution)
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

Each benchmark migration is verified by:

1. Running `node <file>.mjs`
2. Asserting exit code 0
3. Asserting output contains benchmark table

**Verification Tool**: Bash (node execution)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Add tinybench dependency

Wave 2 (After Wave 1):
├── Task 2: busy-wait.mjs
├── Task 3: deep-clone-object.mjs
├── Task 4: deep-merge-object.mjs
├── Task 5: empty-array.mjs
├── Task 6: fibonacci.mjs
├── Task 7: is-empty-object.mjs
├── Task 8: is-undefined.mjs
├── Task 9: json-stringify.mjs
├── Task 10: max.mjs
├── Task 11: min.mjs
├── Task 12: object-hash.mjs
├── Task 13: promise-handling.mjs
├── Task 14: quick-select.mjs
├── Task 15: random.mjs
├── Task 16: round-robin-index.mjs (SPECIAL: hooks)
├── Task 17: shallow-clone-object.mjs
└── Task 18: uuid-generator.mjs

Wave 3 (After Wave 2):
└── Task 19: Remove tatami-ng, final verification

Critical Path: Task 1 → Any Task 2-18 → Task 19
Parallel Speedup: ~80% faster than sequential (17 files in parallel)
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With      |
| ---- | ---------- | ------ | ------------------------- |
| 1    | None       | 2-18   | None                      |
| 2-18 | 1          | 19     | Each other (all parallel) |
| 19   | 2-18       | None   | None (final)              |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Dispatch                          |
| ---- | ----- | --------------------------------------------- |
| 1    | 1     | task(category="quick", ...)                   |
| 2    | 2-18  | 17 parallel task(category="quick", ...) calls |
| 3    | 19    | task(category="quick", ...)                   |

---

## TODOs

### Task 1: Add tinybench dependency

- [x] 1. Add tinybench dependency

  **What to do**:
  - Run `pnpm add tinybench` to add tinybench to dependencies
  - Verify package.json contains tinybench

  **Must NOT do**:
  - Do not remove tatami-ng yet (other files still use it)
  - Do not modify any benchmark files yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single command execution, trivial task
  - **Skills**: `[]`
    - No special skills needed for pnpm add

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (alone)
  - **Blocks**: Tasks 2-18
  - **Blocked By**: None

  **References**:
  - `package.json` - Current dependencies, add tinybench here
  - tinybench npm: https://www.npmjs.com/package/tinybench

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: tinybench dependency added successfully
    Tool: Bash
    Preconditions: pnpm available, package.json exists
    Steps:
      1. Run: pnpm add tinybench
      2. Assert: exit code 0
      3. Run: grep "tinybench" package.json
      4. Assert: output contains "tinybench"
      5. Run: node -e "import('tinybench').then(() => console.log('OK'))"
      6. Assert: output contains "OK"
    Expected Result: tinybench installed and importable
    Evidence: Command outputs captured
  ```

  **Commit**: YES
  - Message: `chore(deps): add tinybench dependency`
  - Files: `package.json`, `pnpm-lock.yaml`
  - Pre-commit: `pnpm install`

---

### Task 2: Migrate busy-wait.mjs

- [x] 2. Migrate busy-wait.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change benchmark logic
  - Do not add custom formatting
  - Do not modify busyWait function

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Mechanical API translation, single file
  - **Skills**: `[]`
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3-18)
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `busy-wait.mjs:1-20` - Current tatami-ng implementation to migrate

  **Migration Pattern** (apply to this file):

  ```javascript
  // FROM:
  import { bench, group, run } from 'tatami-ng'
  group('Group Name', () => {
    bench('test name', () => {
      /* code */
    })
  })
  await run({ units: true })

  // TO:
  import { Bench } from 'tinybench'
  const bench = new Bench({ name: 'Group Name', time: 100 })
  bench.add('test name', () => {
    /* code */
  })
  await bench.run()
  console.table(bench.table())
  ```

  **External References**:
  - tinybench API: https://github.com/tinylibs/tinybench#usage

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: busy-wait.mjs runs successfully with tinybench
    Tool: Bash
    Preconditions: tinybench installed, file migrated
    Steps:
      1. Run: node busy-wait.mjs
      2. Wait for: benchmark completion (timeout: 60s)
      3. Assert: exit code 0
      4. Assert: stdout contains "Task name" (table header)
      5. Assert: stdout contains "ops/sec" or "Throughput"
      6. Assert: stdout does NOT contain "tatami"
    Expected Result: Benchmark runs and outputs results table
    Evidence: Terminal output captured

  Scenario: No tatami-ng imports remain
    Tool: Bash
    Preconditions: File migrated
    Steps:
      1. Run: grep -c "tatami-ng" busy-wait.mjs
      2. Assert: output is "0" or exit code 1 (not found)
      3. Run: grep -c "tinybench" busy-wait.mjs
      4. Assert: output is "1" or greater
    Expected Result: Only tinybench imports present
    Evidence: grep output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 3: Migrate deep-clone-object.mjs

- [x] 3. Migrate deep-clone-object.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Preserve dynamic group name with template literal: `Deep clone object (${JSON.stringify(object)})`
  - Add console.table() for output

  **Must NOT do**:
  - Do not change benchmark logic
  - Do not modify the object being cloned
  - Do not change the cloning implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Mechanical API translation, single file
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4-18)
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `deep-clone-object.mjs:1-50` - Current implementation with dynamic group name

  **Migration Pattern**:

  ```javascript
  // Dynamic group name - use in Bench constructor:
  const bench = new Bench({ name: `Deep clone object (${JSON.stringify(object)})`, time: 100 })
  ```

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: deep-clone-object.mjs runs successfully
    Tool: Bash
    Preconditions: tinybench installed, file migrated
    Steps:
      1. Run: node deep-clone-object.mjs
      2. Wait for: benchmark completion (timeout: 60s)
      3. Assert: exit code 0
      4. Assert: stdout contains table output
    Expected Result: Benchmark runs with all clone methods
    Evidence: Terminal output captured

  Scenario: No tatami-ng imports remain
    Tool: Bash
    Steps:
      1. Run: grep -c "tatami-ng" deep-clone-object.mjs
      2. Assert: exit code 1 (not found) or output "0"
    Expected Result: No tatami imports
    Evidence: grep output
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 4: Migrate deep-merge-object.mjs

- [x] 4. Migrate deep-merge-object.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change merge logic
  - Do not modify test objects

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `deep-merge-object.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: deep-merge-object.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node deep-merge-object.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 5: Migrate empty-array.mjs

- [x] 5. Migrate empty-array.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change array emptying methods

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `empty-array.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: empty-array.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node empty-array.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 6: Migrate fibonacci.mjs

- [x] 6. Migrate fibonacci.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change fibonacci implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `fibonacci.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: fibonacci.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node fibonacci.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 7: Migrate is-empty-object.mjs

- [x] 7. Migrate is-empty-object.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change isEmpty implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `is-empty-object.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: is-empty-object.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node is-empty-object.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 8: Migrate is-undefined.mjs

- [x] 8. Migrate is-undefined.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change undefined check implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `is-undefined.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: is-undefined.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node is-undefined.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 9: Migrate json-stringify.mjs

- [x] 9. Migrate json-stringify.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change stringify implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `json-stringify.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: json-stringify.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node json-stringify.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 10: Migrate max.mjs

- [x] 10. Migrate max.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change max implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `max.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: max.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node max.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 11: Migrate min.mjs

- [x] 11. Migrate min.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change min implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `min.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: min.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node min.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 12: Migrate object-hash.mjs

- [x] 12. Migrate object-hash.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change hash implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `object-hash.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: object-hash.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node object-hash.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 13: Migrate promise-handling.mjs

- [x] 13. Migrate promise-handling.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Handle async benchmarks properly (tinybench supports async)
  - Add console.table() for output

  **Must NOT do**:
  - Do not change promise handling implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `promise-handling.mjs` - Current implementation (may have async benchmarks)

  **Acceptance Criteria**:

  ```
  Scenario: promise-handling.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node promise-handling.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes (may take longer due to async)
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 14: Migrate quick-select.mjs

- [x] 14. Migrate quick-select.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change quickselect implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `quick-select.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: quick-select.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node quick-select.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 15: Migrate random.mjs

- [x] 15. Migrate random.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change random implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `random.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: random.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node random.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 16: Migrate round-robin-index.mjs (SPECIAL: hooks)

- [x] 16. Migrate round-robin-index.mjs to tinybench (SPECIAL HANDLING REQUIRED) - **FILE DOES NOT EXIST**

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - **CRITICAL**: Convert `before:` hooks to `beforeEach` option
  - Add console.table() for output
  - Migrate any commented benchmark code to new API style

  **Must NOT do**:
  - Do not change round-robin logic
  - Do not remove the hook (state reset is required for correct benchmarking)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Still mechanical, but needs attention to hook migration
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `round-robin-index.mjs` - Current implementation with `before:` hooks

  **Hook Migration Pattern** (CRITICAL):

  ```javascript
  // FROM (tatami-ng):
  bench('name', () => fn(), {
    before: () => {
      index = 0
    },
  })

  // TO (tinybench):
  bench.add('name', () => fn(), {
    beforeEach: () => {
      index = 0
    },
  })
  ```

  **External References**:
  - tinybench hooks: https://github.com/tinylibs/tinybench#hooks

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: round-robin-index.mjs runs successfully with hooks
    Tool: Bash
    Preconditions: tinybench installed, file migrated with beforeEach
    Steps:
      1. Run: node round-robin-index.mjs
      2. Wait for: benchmark completion (timeout: 60s)
      3. Assert: exit code 0
      4. Assert: stdout contains table output
    Expected Result: Benchmark runs with state properly reset between iterations
    Evidence: Terminal output captured

  Scenario: beforeEach hook is used (not before)
    Tool: Bash
    Steps:
      1. Run: grep -c "beforeEach" round-robin-index.mjs
      2. Assert: output is "1" or greater (hooks present)
      3. Run: grep -c "before:" round-robin-index.mjs
      4. Assert: output is "0" or exit code 1 (old syntax removed)
    Expected Result: New hook syntax used
    Evidence: grep output
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 17: Migrate shallow-clone-object.mjs

- [x] 17. Migrate shallow-clone-object.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change clone implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `shallow-clone-object.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: shallow-clone-object.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node shallow-clone-object.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 18: Migrate uuid-generator.mjs

- [x] 18. Migrate uuid-generator.mjs to tinybench

  **What to do**:
  - Replace tatami-ng imports with tinybench
  - Convert group/bench/run pattern to Bench class pattern
  - Add console.table() for output

  **Must NOT do**:
  - Do not change UUID generation implementations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 19
  - **Blocked By**: Task 1

  **References**:
  - `uuid-generator.mjs` - Current implementation

  **Acceptance Criteria**:

  ```
  Scenario: uuid-generator.mjs runs successfully
    Tool: Bash
    Steps:
      1. Run: node uuid-generator.mjs
      2. Assert: exit code 0
      3. Assert: stdout contains table output
    Expected Result: Benchmark completes
    Evidence: Output captured
  ```

  **Commit**: NO (groups with Task 19)

---

### Task 19: Remove tatami-ng and final verification

- [x] 19. Remove tatami-ng dependency and verify all benchmarks

  **What to do**:
  - Run `pnpm remove tatami-ng` to remove the old dependency
  - Verify no tatami-ng imports remain in any file
  - Run ALL 17 benchmarks to confirm migration success

  **Must NOT do**:
  - Do not skip any benchmark verification
  - Do not leave tatami-ng in dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Cleanup task with verification loop
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (alone, final)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 2-18 (all migrations must complete)

  **References**:
  - `package.json` - Remove tatami-ng from here
  - All 17 benchmark files - Verify each runs

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: tatami-ng removed from dependencies
    Tool: Bash
    Preconditions: All migrations complete
    Steps:
      1. Run: pnpm remove tatami-ng
      2. Assert: exit code 0
      3. Run: grep "tatami-ng" package.json
      4. Assert: exit code 1 (not found)
    Expected Result: tatami-ng no longer in package.json
    Evidence: Command output captured

  Scenario: No tatami-ng imports in codebase
    Tool: Bash
    Steps:
      1. Run: grep -r "tatami-ng" *.mjs
      2. Assert: exit code 1 (no matches) or empty output
    Expected Result: Zero tatami-ng references
    Evidence: grep output

  Scenario: All 17 benchmarks run successfully
    Tool: Bash
    Steps:
      1. Run each benchmark file sequentially:
         node busy-wait.mjs && \
         node deep-clone-object.mjs && \
         node deep-merge-object.mjs && \
         node empty-array.mjs && \
         node fibonacci.mjs && \
         node is-empty-object.mjs && \
         node is-undefined.mjs && \
         node json-stringify.mjs && \
         node max.mjs && \
         node min.mjs && \
         node object-hash.mjs && \
         node promise-handling.mjs && \
         node quick-select.mjs && \
         node random.mjs && \
         node round-robin-index.mjs && \
         node shallow-clone-object.mjs && \
         node uuid-generator.mjs
      2. Assert: exit code 0 for entire chain
    Expected Result: All benchmarks complete without error
    Evidence: Output captured (may be long)
  ```

  **Commit**: YES
  - Message: `refactor(bench): migrate from tatami-ng to tinybench`
  - Files: All 17 `.mjs` files, `package.json`, `pnpm-lock.yaml`
  - Pre-commit: `node busy-wait.mjs` (quick sanity check)

---

## Commit Strategy

| After Task | Message                                                | Files                                     | Verification       |
| ---------- | ------------------------------------------------------ | ----------------------------------------- | ------------------ |
| 1          | `chore(deps): add tinybench dependency`                | package.json, pnpm-lock.yaml              | pnpm install       |
| 19         | `refactor(bench): migrate from tatami-ng to tinybench` | All 17 .mjs, package.json, pnpm-lock.yaml | node busy-wait.mjs |

---

## Success Criteria

### Verification Commands

```bash
# No tatami-ng in codebase
grep -r "tatami-ng" . --include="*.mjs" --include="package.json"  # Expected: no output

# tinybench is installed
grep "tinybench" package.json  # Expected: "tinybench": "^X.X.X"

# All benchmarks run (quick check with one)
node busy-wait.mjs  # Expected: table output, exit 0

# Full verification (run all)
for f in *.mjs; do [[ "$f" != "benchmark-utils.mjs" ]] && node "$f" || true; done  # Expected: all succeed
```

### Final Checklist

- [ ] All 17 benchmarks migrated to tinybench API
- [ ] All benchmarks execute without error
- [ ] tatami-ng completely removed
- [ ] No custom formatting (only console.table)
- [ ] benchmark-utils.mjs unchanged
- [ ] round-robin-index.mjs uses beforeEach hooks
