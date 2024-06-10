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
	const disposable = vscode.commands.registerCommand('used-characters.usedchar', () => {
		// 每次执行命令时都会执行此处放置的代码
		const editor = vscode.window.activeTextEditor;
		if (editor) {
            const selection: vscode.Selection = editor.selection;
            let text: string = editor.document.getText(selection);
			text = getUniqueCharacters(text);
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

export function getUniqueCharacters(input: string): string {
    // 移除多余的换行符和控制字符
    const cleanedInput = input.replace(/[\n\r\t\f\v]/g, '');

    // 创建Set来存储唯一的字符
    const uniqueChars = new Set<string>();

    // 遍历清理后的字符串的每个字符
    for (const char of cleanedInput) {
        uniqueChars.add(char);
    }

    // 将Set转换为数组
    const uniqueArray = Array.from(uniqueChars);

    // 分类数组
    const numbers: string[] = [];
    const letters: string[] = [];
    const punctuation: string[] = [];
    const chinese: string[] = [];
    const japanese: string[] = [];
    const korean: string[] = [];
    const spaces: string[] = [];
    const others: string[] = [];

    // 正则表达式匹配
    const numberRegex = /\d/;
    const letterRegex = /[a-zA-Z]/;
    const punctuationRegex = /[\u2000-\u206F\u2E00-\u2E7F\p{P}]/u;
    const chineseRegex = /[\u4e00-\u9fa5]/;
    const japaneseRegex = /[\u3000-\u30FF\u31F0-\u31FF\uFF00-\uFFEF]/;
    const koreanRegex = /[\uAC00-\uD7AF\u1100-\u11FF]/;

    // 分类
    uniqueArray.forEach(char => {
        if (char === ' ') {
            spaces.push(char);
        } else if (numberRegex.test(char)) {
            numbers.push(char);
        } else if (letterRegex.test(char)) {
            letters.push(char);
        } else if (punctuationRegex.test(char)) {
            punctuation.push(char);
        } else if (chineseRegex.test(char)) {
            chinese.push(char);
        } else if (japaneseRegex.test(char)) {
            japanese.push(char);
        } else if (koreanRegex.test(char)) {
            korean.push(char);
        } else {
            others.push(char);
        }
    });

    // 排序
    numbers.sort();
    letters.sort();
    punctuation.sort();

    // 按顺序连接
    return numbers.join('') + letters.join('') + spaces.join('') + punctuation.join('') + chinese.join('') + japanese.join('') + korean.join('') + others.join('');
}

// 当您的扩展程序停用时，将调用此方法
export function deactivate() {}
