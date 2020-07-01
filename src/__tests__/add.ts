// Imports
import add from '../add';

// Test Suite
describe('add function', () => {
    it('should correctly add two numbers', () => {
        // Define two numbers to add together
        const num1 = 5;
        const num2 = 7;

        // Define expected result
        const expected = num1 + num2;

        // Compute actual result
        const actual = add(num1, num2);

        // Expect results to match
        expect(actual).toBe(expected);
    });
});
