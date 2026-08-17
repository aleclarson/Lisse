# lisse-octane

An unofficial [Octane](https://github.com/octanejs/octane) adapter for
[Lisse](https://github.com/JaceThings/Lisse).

It provides `SmoothCorners`, `useSmoothCorners`, and `Slot` for Octane apps
while reusing Lisse's geometry and effects APIs.

```sh
pnpm add lisse-octane octane
```

```tsx
import { SmoothCorners } from "lisse-octane";

export function Card() {
  return <SmoothCorners corners={{ radius: 20 }}>Hello</SmoothCorners>;
}
```

For the full API and usage details, see the [official Lisse README](https://github.com/JaceThings/Lisse#readme).
