import * as assert from 'assert';

// 您可以导入并使用“vscode”模块中的所有 API，也可以导入您的扩展来测试它
import * as vscode from 'vscode';
import * as extension from '../extension';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	test('TEST: getUniqueCharacters', () => {
		let testString = "Hello Hello, 你好你好， 123! こんにちは World。안녕하세요 ( っ*'ω'*c)";
		testString = extension.getUniqueCharacters(testString);
		vscode.window.showInformationMessage(testString);
		console.log(testString);
	});
});
