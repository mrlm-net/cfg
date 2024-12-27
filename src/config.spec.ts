import { describe, it, expect } from 'vitest';
import { Config } from './config';

describe('Config', () => {
    it('should get and set simple values', () => {
        const config = new Config();
        config.set('key', 'value');
        expect(config.get('key')).toBe('value');
    });

    it('should get and set nested values', () => {
        const config = new Config();
        config.set('nested.key', 'value');
        expect(config.get('nested.key')).toBe('value');
        expect(config.get('nested')).toEqual({ key: 'value' });
    });

    it('should merge complex structures', () => {
        const config = new Config({ nested: { key: { subkey: 'initial' } } });
        config.set('nested.key', { subkey: 'updated', another: 'value' });
        expect(config.get('nested.key')).toEqual({ subkey: 'updated', another: 'value' });
        expect(config.get('nested')).toEqual({ key: { subkey: 'updated', another: 'value' } });
    });

    it('should return undefined for non-existent keys', () => {
        const config = new Config();
        expect(config.get('non.existent.key')).toBeUndefined();
    });

    it('should initialize with multiple config objects', () => {
        const config = new Config({ key1: 'value1' }, { key2: 'value2' });
        expect(config.get('key1')).toBe('value1');
        expect(config.get('key2')).toBe('value2');
    });

    it('should properly merge nested objects during creation', () => {
        const config = new Config(
            { nested: { key1: 'value1' } },
            { nested: { key2: 'value2' } }
        );

        expect(config.get('nested.key1')).toBe('value1');
        expect(config.get('nested.key2')).toBe('value2');
        expect(config.get('nested')).toEqual({ key1: 'value1', key2: 'value2' });
    });

    it('should properly merge nested objects with deep structures during creation', () => {
        const config = new Config(
            { nested: { key: { subkey1: 'value1' } } },
            { nested: { key: { subkey2: 'value2' } } }
        );
        expect(config.get('nested.key.subkey1')).toBe('value1');
        expect(config.get('nested.key.subkey2')).toBe('value2');
        expect(config.get('nested.key')).toEqual({ subkey1: 'value1', subkey2: 'value2' });
        expect(config.get('nested')).toEqual({ key: { subkey1: 'value1', subkey2: 'value2' }});
    });

    it('should return fallback value for non-existent keys', () => {
        const config = new Config();
        expect(config.get('non.existent.key', 'default')).toBe('default');
    });

    it('should return fallback value for non-existent nested keys', () => {
        const config = new Config({ nested: { key: 'value' } });
        expect(config.get('nested.nonExistentKey', 'default')).toBe('default');
    });
});
