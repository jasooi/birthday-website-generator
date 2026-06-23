import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "%SystemDrive%/**",
      ".tmp-supabase-agent-skills-2/**"
    ]
  }
];

export default config;
