````markdown
# Run JS Function

Run JS Function adds a convenient ▶ Run CodeLens above your test functions, letting you execute them directly in VS Code without leaving the editor.

## Features

- **One-click execution**  
  Run any top-level function prefixed with `test_` in a single click.  
- **Smart activation**  
  Lenses appear only on files named `*test.js`, `*test.mjs`, or `*test.cjs`.  
- **Real-time output**  
  View function results and errors immediately in the **Run JS Function** output panel.  
- **Zero setup**  
  No configuration required—install and start running tests right away.

## Usage

1. Open or create a JavaScript file whose name ends with `test.js`, `test.mjs`, or `test.cjs`.  
2. Define one or more top-level functions beginning with `test_`, for example:  
   ```js
   function test_sum() {
     return 1 + 2;
   }
````

3. Hover above the function declaration to reveal the **▶ Run** lens.
4. Click **▶ Run** to execute the function.
5. Switch to the **Run JS Function** output panel to see the result or any errors.

## Support

Encountered a problem or have a suggestion? Please open an issue in the extension’s repository.

```
```
