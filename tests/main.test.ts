import { describe, expect, test } from '@jest/globals';
import main from "../src/main";

describe('main function', () => {
    test('main function returns the string "Hello, World!"', () => {
        expect(main()).toMatch("Hello, World!");
    })
});