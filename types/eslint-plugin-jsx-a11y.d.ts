/**
 * Ambient declaration for `eslint-plugin-jsx-a11y`.
 *
 * The upstream package ships no `.d.ts`, so without this shim the plugin import
 * resolves to an error type and violates `strictTypeChecked` rules.
 */
declare module "eslint-plugin-jsx-a11y" {
  import type { Linter } from "eslint";

  interface JsxA11yPlugin extends Linter.Plugin {
    flatConfigs: {
      recommended: Linter.Config;
      strict: Linter.Config;
    };
  }

  const plugin: JsxA11yPlugin;
  export default plugin;
}
