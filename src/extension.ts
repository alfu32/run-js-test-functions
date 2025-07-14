import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('Run JS Function');
  context.subscriptions.push(output);

  // CodeLens provider for JS files
  context.subscriptions.push(vscode.languages.registerCodeLensProvider(
    { language: 'javascript', scheme: 'file' },
    new FunctionCodeLensProvider()
  ));

  // Command: run the function
  context.subscriptions.push(vscode.commands.registerCommand('runJsFunction.run',
    async (fileUri: vscode.Uri, funcName: string) => {
      output.clear();
      output.show(true);
      // spawn `node -e "require('...')(...)"` or better, pass args to a helper script
	  const script = path.join(context.extensionPath, 'dist', 'runner.js');
      const proc = spawn(process.execPath, [script, fileUri.fsPath, funcName]);

      proc.stdout.on('data', d => output.append(d.toString()));
      proc.stderr.on('data', d => output.append(d.toString()));
      proc.on('close', code => output.appendLine(`\nProcess exited with ${code}`));
    }
  ));
}

class FunctionCodeLensProvider implements vscode.CodeLensProvider {
	provideCodeLenses(doc: vscode.TextDocument): vscode.CodeLens[] {
	  const fnMatch = doc.fileName.match(/.*test.(c|m)*js/gi)
	  if(fnMatch === null) {
		return []
	  }
	  const lenses: vscode.CodeLens[] = [];
	  // match only functions named test_xxx
	  const regex = /^function\s+(test_[\w$]*)\s*\(/gm;
	  const text = doc.getText();
	  let match: RegExpExecArray | null;
  
	  while ((match = regex.exec(text))) {
		const idx = match.index;
		const pos = doc.positionAt(idx);
		// ensure it’s truly top-level (no indent)
		const line = doc.lineAt(pos.line);
		if (line.firstNonWhitespaceCharacterIndex === 0) {
		  lenses.push(new vscode.CodeLens(
			new vscode.Range(pos, pos),
			{
			  title: '▶ Run',
			  command: 'runJsFunction.run',
			  arguments: [doc.uri, match[1]]
			}
		  ));
		}
	  }
  
	  return lenses;
	}
  }
