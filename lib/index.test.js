const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const { rhash } = require('../lib');
const fs = require('fs');
const path = require('path');
const os = require('os');

let testFile;
let testBuffer;

describe('rhash', () => {
  before(() => {
    // Create a test ROM file (32KB of zeros simulates a simple Game Boy ROM)
    testFile = path.join(os.tmpdir(), 'test-rom.gb');
    testBuffer = Buffer.alloc(32768, 0x00);
    fs.writeFileSync(testFile, testBuffer);
  });

  after(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  describe('file mode', () => {
    test('should hash a Game Boy ROM from file', () => {
      const result = rhash(4, testFile);
      assert.strictEqual(result, 'bb7df04e1b0a2570657527a7e108ae23');
      assert.strictEqual(result.length, 32);
    });

    test('should throw error for non-existent file', () => {
      assert.throws(
        () => rhash(4, '/path/that/does/not/exist.gb'),
        /Could not open file/
      );
    });

    test('should throw error for invalid console ID', () => {
      assert.throws(() => rhash(999, testFile));
    });
  });

  describe('buffer mode', () => {
    test('should hash a Game Boy ROM from buffer', () => {
      const result = rhash(4, testFile, testBuffer);
      assert.strictEqual(result, 'bb7df04e1b0a2570657527a7e108ae23');
    });

    test('should produce same hash for file and buffer', () => {
      const fileHash = rhash(4, testFile);
      const bufferHash = rhash(4, testFile, testBuffer);
      assert.strictEqual(fileHash, bufferHash);
    });

    test('should throw error for disc-based systems', () => {
      assert.throws(
        () => rhash(41, '/path/to/game.iso', testBuffer),
        /Unsupported console for buffer hash/
      );
    });

    test('should require file path for arcade (filename-based hash)', () => {
      assert.throws(
        () => rhash(27, '/fake/dkong.zip', testBuffer),
        /Unsupported console for buffer hash/
      );
    });
  });

  describe('input validation', () => {
    test('should require at least 2 arguments', () => {
      assert.throws(() => rhash(), /Expected at least 2 arguments/);
      assert.throws(() => rhash(4), /Expected at least 2 arguments/);
    });

    test('should require first argument to be a number', () => {
      assert.throws(() => rhash('4', testFile), /Arguments must be/);
    });

    test('should require second argument to be a string', () => {
      assert.throws(() => rhash(4, 123), /Arguments must be/);
    });
  });
});
