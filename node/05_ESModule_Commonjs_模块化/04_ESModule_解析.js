// 1. ES Module的解析过程可以划分为三个阶段
//      阶段一：构建(Construction), 根据地址查找js文件，并且下载，将其解析成模块记录
//      阶段二：实例化(Instantiation),对模块记录进行实例化，并且分配内存空间，解析模块的导入和导出语句，把模块指向对应的内存地址。
//      阶段三：运行(Evaluation), 运行代码，计算值，并且将值填充到内存地址中

// 2. 模块加载器的基本原理
//    2.1 一个简单的模块加载器需要具备以下功能：
//    2.2 解析模块文件，识别其中的 export 和 import 语句。
//    2.3 维护一个模块的依赖图。
//    2.4 根据依赖关系加载和执行模块。

class ModuleLoader {
	constructor() {
		this.modules = {}; // 存储已加载的模块
	}
	async loadModule(modulePath) {
		if (this.modules[modulePath]) {
			return this.modules[modulePath];
		}

		const moduleContent = await this.fetchModule(modulePath);
		const moduleExports = this.parseModule(moduleContent, modulePath);
		this.modules[modulePath] = moduleExports;

		return moduleExports;
	}
	async fetchModule(modulePath) {
		// 这里使用 fetch 模拟从文件系统或网络获取模块内容
		const response = await fetch(modulePath);
		return await response.text();
	}
	parseModule(content, modulePath) {
		const exports = {};
		const importRegex =
			/import\s+(?:{([^}]+)}|(\w+))\s+from\s+['"]([^'"]+)['"]/g;
		const exportRegex = /export\s+(?:const|function)\s+(\w+)/g;

		// 解析 import 语句
		let match;
		while ((match = importRegex.exec(content)) !== null) {
			const importedNames = match[1]
				? match[1].split(",").map((name) => name.trim())
				: [match[2]];
			const importedPath = match[3];
			const resolvedPath = this.resolvePath(modulePath, importedPath);

			this.loadModule(resolvedPath).then((importedModule) => {
				importedNames.forEach((name) => {
					const [importedName, alias] = name
						.split(" as ")
						.map((n) => n.trim());
					exports[alias || importedName] =
						importedModule[importedName];
				});
			});
		}

		// 解析 export 语句
		while ((match = exportRegex.exec(content)) !== null) {
			const exportName = match[1];
			exports[exportName] = this.evaluateExport(content, exportName);
		}

		return exports;
	}
	resolvePath(basePath, relativePath) {
		// 简单的路径解析，可以根据需要改进
		if (relativePath.startsWith(".")) {
			return new URL(relativePath, basePath).pathname;
		}
		return relativePath;
	}

	evaluateExport(content, exportName) {
		const functionRegex = new RegExp(
			`export\\s+function\\s+${exportName}\\s*\\(([^)]*)\\)\\s*{([^}]*)}`,
		);
		const constRegex = new RegExp(
			`export\\s+const\\s+${exportName}\\s*=\\s*([^;]+);`,
		);

		let match = functionRegex.exec(content);
		if (match) {
			const args = match[1];
			const body = match[2];
			return new Function(args, body);
		}

		match = constRegex.exec(content);
		if (match) {
			return eval(match[1]);
		}

		throw new Error(`Unable to evaluate export: ${exportName}`);
	}
}

// 使用示例
const loader = new ModuleLoader();
loader.loadModule('./app.js').then(() => {
  console.log('Modules loaded and executed.');
});
