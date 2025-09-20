#!/usr/bin/env node

/*
Env variable: PR_VALIDATION_CONFIG
{
	"owners": ["owner1", "owner2"],
	"userToBranch": {
		"alice": "release/alice",
		"bob": "release/bob"
	}
}
*/

const fs = require('fs');
const path = require('path');

function fail(message) {
	const annotation = `::error file=.github/scripts/validate-pr-branch.js::${message}`;
	console.error(message);
	console.log(annotation);
	if (process.env.GITHUB_STEP_SUMMARY) {
		try {
			fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `실패: ${message}\n`);
		} catch (_) {}
	}
	process.exit(1);
}

function loadJson(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(content);
	} catch (err) {
		fail(`${filePath} JSON을 읽거나 파싱하는 데 실패했습니다: ${err.message}`);
	}
}

async function loadJsonFromUrl(url) {
	try {
		const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
		if (!res.ok) fail(`URL의 내용을 가져오지 못했습니다 (${res.status}): ${url}`);
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			fail(`URL로 주어진 JSON 파싱 실패: ${e.message}`);
		}
	} catch (e) {
		fail(`URL의 내용을 가져오지 못했습니다: ${e.message}`);
	}
}

async function main() {
	const eventPath = process.env.GITHUB_EVENT_PATH;
	if (!eventPath) {
		fail('GITHUB_EVENT_PATH가 설정되지 않았습니다. 이 스크립트는 GitHub Actions의 pull_request 이벤트에서 실행되어야 합니다.');
	}

	const event = loadJson(eventPath);

	let config = null;
	const configEnvRaw = process.env.PR_VALIDATION_CONFIG;
	if (configEnvRaw) {
		try {
			config = JSON.parse(configEnvRaw);
		} catch (err) {
			console.warn(`환경 변수(PR_VALIDATION_CONFIG) 파싱 실패, 원격 URL로 폴백합니다: ${err.message}`);
		}
	}

	if (!config) {
		const fallbackUrl = process.env.PR_VALIDATION_CONFIG_URL || 'https://raw.githubusercontent.com/KWU-UMC/9th_challengers/refs/heads/main/allowed-branches.json';
		config = await loadJsonFromUrl(fallbackUrl);
	}

	const userToBranch = config && typeof config.userToBranch === 'object' && !Array.isArray(config.userToBranch) ? config.userToBranch : {};
	const ownersList = Array.isArray(config.owners) ? config.owners : (config.owner ? [config.owner] : []);
	const ownersSet = new Set(ownersList);

	const pullRequest = event.pull_request;
	if (!pullRequest) {
		fail('이 스크립트는 pull_request 이벤트에서만 실행될 수 있습니다.');
	}

	const author = pullRequest.user && pullRequest.user.login ? pullRequest.user.login : null;
	const baseBranch = pullRequest.base && pullRequest.base.ref ? pullRequest.base.ref : null;

	if (!author) fail('PR 작성자 정보를 확인할 수 없습니다.');
	if (!baseBranch) fail('PR의 대상 브랜치를 확인할 수 없습니다.');

	if (ownersSet.has(author)) {
		console.log(`작성자 ${author}는 소유자여서 브랜치 검사를 생략합니다.`);
		process.exit(0);
	}

	const expectedBranch = userToBranch[author];
	if (!expectedBranch) {
		fail(`사용자 '${author}'에 대한 대상 브랜치 규칙이 설정되어 있지 않습니다.`);
	}

	if (expectedBranch !== baseBranch) {
		fail(`사용자 '${author}'는 '${expectedBranch}' 브랜치로 PR을 보내야 하지만, 현재 PR은 '${baseBranch}'를 대상으로 합니다.`);
	}

	console.log(`사용자 '${author}'가 '${baseBranch}' 브랜치를 올바르게 대상으로 합니다.`);
	process.exit(0);
}

main();
