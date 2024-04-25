#### 总结一下 createContext 在class 组件和hooks 中的用法

#### createContext 组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props

#### 创建context

```javascript
// LanguageContext.tsx
import React from "react"
const LanguageContext = React.createContext({
    language:"",
    setLanguage:(value:)
})

```

