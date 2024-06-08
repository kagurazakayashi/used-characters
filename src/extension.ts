// 模块“vscode”包含 VS Code 扩展 API 导入该模块并在下面的代码中使用别名 vscode 引用它
import * as vscode from 'vscode';

// 扩展程序激活时会调用此方法，第一次执行命令时会激活扩展程序
export function activate(context: vscode.ExtensionContext) {

	// 使用控制台输出诊断信息（console.log）和错误（console.error）
	// 这行代码只会在你的扩展程序激活时执行一次
	// console.log('Congratulations, your extension "used-characters" is now active!');

	// 该命令已在 package.json 文件中定义
	// 现在使用 registerCommand 提供命令的实现
	// commandId 参数必须与 package.json 中的 command 字段匹配
	const disposable = vscode.commands.registerCommand('used-characters.usechar', () => {
		// 每次执行命令时都会执行此处放置的代码
		const editor = vscode.window.activeTextEditor;
		if (editor) {
            const selection: vscode.Selection = editor.selection;
            let text: string = editor.document.getText(selection);
			text = getUniqueCharacters(text.replace(/[\n\r\t\f\v]/g, ''));
			if (text) {
                vscode.window.showInformationMessage(text);
            } else {
                vscode.window.showInformationMessage('No text selected');
            }
        }
		// 向用户显示消息框
		// vscode.window.showInformationMessage('Hello World from Used Characters!');
	});

	context.subscriptions.push(disposable);
}

function getUniqueCharacters(input: string): string {
    // 创建一个Set来存储唯一的字符
    const uniqueChars = new Set<string>();
    // 遍历输入字符串的每个字符
    for (const char of input) {
        uniqueChars.add(char);
    }
    // 将Set转换为数组并返回
    return Array.from(uniqueChars).join('');
}

// 当您的扩展程序停用时，将调用此方法
export function deactivate() {}
