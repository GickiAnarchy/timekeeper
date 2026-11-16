import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
const packageLock = JSON.parse(readFileSync(join(projectRoot, 'package-lock.json'), 'utf8'));
const appMarkup = readFileSync(join(projectRoot, 'index.html'), 'utf8');
const androidGradle = readFileSync(join(projectRoot, 'android', 'app', 'build.gradle'), 'utf8');

// This is the versionCode read from the manifest of the APK linked by the app
// before this update (release v1.5, artifact versionName 1.5.1).
const previousReleasedVersionCode = 10501;

test('web, npm, and Android source versions stay aligned', () => {
  const appBadge = appMarkup.match(/<span\b[^>]*id="version-badge"[^>]*>([^<]+)<\/span>/)?.[1];
  const androidVersionName = androidGradle.match(/\bversionName\s+"([^"]+)"/)?.[1];

  assert.equal(packageJson.version, '1.8.0');
  assert.equal(packageLock.version, packageJson.version);
  assert.equal(packageLock.packages[''].version, packageJson.version);
  assert.equal(appBadge, `v${packageJson.version}`);
  assert.equal(androidVersionName, packageJson.version);
});

test('Android versionCode is safely higher than the previously released APK', () => {
  const versionCode = Number(androidGradle.match(/\bversionCode\s+(\d+)/)?.[1]);

  assert.equal(versionCode, 10800);
  assert.ok(versionCode > previousReleasedVersionCode);
});
