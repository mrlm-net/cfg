import { describe, it, expect } from 'vitest';
import { environment } from './environment';

describe('environment function', () => {
    it('should return an empty object if no environment variables match the prefix', () => {
        process.env = { TEST_VAR: 'value' };
        const result = environment('PREFIX_');
        expect(result).toEqual({});
    });

    it('should return a flat object if no separator is found', () => {
        process.env = { PREFIX_VAR: 'value' };
        const result = environment('PREFIX_');
        expect(result).toEqual({ var: 'value' });
    });

    it('should return a nested object based on the separator', () => {
        process.env = { PREFIX_VAR_ONE: 'value1', PREFIX_VAR_TWO: 'value2' };
        const result = environment('PREFIX_');
        expect(result).toEqual({ var: { one: 'value1', two: 'value2' } });
    });

    it('should handle custom separators', () => {
        process.env = { "PREFIX_VAR-ONE": 'value1', "PREFIX_VAR-TWO": 'value2' };
        const result = environment('PREFIX_', '-');
        expect(result).toEqual({ var: { one: 'value1', two: 'value2' } });
    });

    it('should handle no prefix', () => {
        process.env = { VAR_ONE: 'value1', VAR_TWO: 'value2' };
        const result = environment('', '_');
        expect(result).toEqual({ var: { one: 'value1', two: 'value2' } });
    });
});
