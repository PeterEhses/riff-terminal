// const isProduction = process.env.NODE_ENV === 'development';

const unhandled = require('electron-unhandled');
const {openNewGitHubIssue, debugInfo} = require('electron-util');

unhandled({
    logger: e => Logger.error("caught unhandled exception:", e),
    reportButton: e => {
		openNewGitHubIssue({
			user: 'PeterEhses',
			repo: 'riff-terminal',
			body: `\`\`\`\n${e.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`
		});
	}
});

// window.onerror = function (msg, url, line, col, error) {


//     //code to handle or report error goes here
//     if (isProduction) {
//         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//         console.log("!! Error bubbled to root !!")
//         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//     } else {
//         location.reload();
//     }
//     console.error(msg, url, line, col, error);
// }