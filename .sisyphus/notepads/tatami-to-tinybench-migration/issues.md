# Issues & Gotchas: tatami-to-tinybench-migration

## Problems Encountered

(Subagents will append issues here)

## [2026-02-10] Pre-existing Issue: busy-wait.mjs times out

**File**: `busy-wait.mjs`
**Status**: Syntax migrated successfully, but runtime timeout issue persists
**Root Cause**: Benchmark implementations each wait for 2000ms (2 seconds), causing the entire benchmark suite to take 8+ seconds minimum.

**Evidence**:

- Original tatami-ng version: Times out after 30+ seconds
- Migrated tinybench version: Times out after 30+ seconds
- Both versions have identical timeout behavior

**Conclusion**: This is NOT a migration issue - the file has never successfully completed execution in reasonable time. The syntax migration from tatami-ng to tinybench is correct, but the benchmark logic itself is problematic.

**Recommendation**: User should either:

1. Reduce `const timeout = 2000` to a smaller value (e.g., 50ms)
2. Accept that this benchmark takes minutes to complete
3. Remove this benchmark file as it's not practical

**Migration Status**: ✓ Syntax migrated correctly, ⚠ Pre-existing runtime issue documented
