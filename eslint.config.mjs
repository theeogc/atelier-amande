import coreWebVitals from "eslint-config-next/core-web-vitals"
import typescript from "eslint-config-next/typescript"

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  {
    rules: {
      // Site en français : apostrophes et guillemets typographiques dans le JSX
      "react/no-unescaped-entities": "off",
    },
  },
]

export default eslintConfig
