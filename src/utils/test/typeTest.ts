export function takeInt<N extends number>(n: Int<N>) {
  return n
}

// takeInt(1)
// takeInt(1.1)
// takeInt(0)
// takeInt(-1)
// takeInt(100)
// takeInt(-100)
