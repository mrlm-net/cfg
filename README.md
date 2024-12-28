# mrlm-net/cfg

Typescript hierarchical configuration package, it's doing nothing more than working with objects and merge them deeply without any additional dependencies.

| Package | `mrlm-net/cfg` |
| :-- | :-- |
| NPM name | `@mrlm/cfg` |
| NPM version | ![NPM Version](https://img.shields.io/npm/v/@mrlm/cfg) |
| Latest version | ![GitHub Release](https://img.shields.io/github/v/release/mrlm-net/cfg) |
| License | ![GitHub License](https://img.shields.io/github/license/mrlm-net/cfg) |

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Advanced Usage](#advanced-usage)
- [Interfaces](#interfaces)
- [Exports](#export-paths)

## Installation

> I'm using `YARN` so examples will be using it, you can install this package via any Node Package Manager.

```shell
$ yarn add @mrlm/cfg
```

## Usage

Import the package and use it to merge configuration objects deeply.

```typescript
import { Config } from '@mrlm/cfg';

const defaultConfig = {
  database: {
    host: 'localhost',
    port: 5432,
  },
  server: {
    port: 3000,
  },
};

const environmentConfig = {
  database: {
    host: 'production-db.example.com',
  },
  server: {
    port: 8000,
  },
};

const instance = new Config(defaultConfig, environmentConfig);

console.log(instance);
// Config instance:
// class Config implements IConfig {
//   private config: {    
//     database: {
//       host: 'production-db.example.com',
//       port: 5432,
//     },
//     server: {
//       port: 8000,
//     },
//   }
// }

// GET value without fallback
console.log(instance.get("database.host")); 
// Output: 'production-db.example.com'
// GET value with fallback
console.log(instance.get("database.unknown", "fallback")); 
// Output: 'fallback'
```

## Advanced Usage

We have specific handlers for Node.js based environments to allow you easily manage environment variables mapping and also filesystem based configurations. Those functions are exported as part of `@mrlm/cfg/server` package and can be used as follows. Also all components are exported as separated subpackage to allow you to not pollute application bundle with unnecessary code.

### Deepmerge function

We have created our own naive implementation of deepmerge function, you can also use this package to achieve deep merge in your other apps.

```typescript
import { deepmerge } from '@mrlm/cfg/deepmerge';

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 } };

const merged = deepmerge(obj1, obj2);
console.log(merged); // Output: { a: 1, b: { c: 2, d: 3 } }
```

### Environment function

You can map environment variables to your configuration using the `environment` function. It accepts the prefix to be stripped and optional level separator.

```shell
# .env file contents
PREFIX_DATABASE_HOST="env-db-host"
PREFIX_DATABASE_PORT="env-db-port"
PREFIX_SERVER_PORT="env-server-port"
```

```typescript
import { environment } from '@mrlm/cfg/environment';

const envConfig = environment('PREFIX_', '_');

console.log(envConfig);
// Output will depend on your environment variables, e.g.:
// {
//   database: {
//     host: 'env-db-host',
//     port: 'env-db-port',
//   },
//   server: {
//     port: 'env-server-port',
//   },
// }
```

### Load function

You can load configuration from files using the `load` and `loadMultiple` functions.

```typescript
import { load } from '@mrlm/cfg/file';

const file = load("config/default.json"), 

const files = loadMultiple([
  "config/default.json", 
  "config/production.json"
]);

console.log(file, files);
// Output will depend on the contents of your configuration files.
```

### Export Paths

The following export paths are available based on the `package.json`:

- `@mrlm/cfg` for the main package
- `@mrlm/cfg/environment` for the environment function
- `@mrlm/cfg/deepmerge` for the deepmerge function
- `@mrlm/cfg/file` for the loadFiles function
- `@mrlm/cfg/server` for the server-specific functions

## Contributing

_Contributions are welcomed and must follow [Code of Conduct](https://github.com/mrlm-net/logz?tab=coc-ov-file) and common [Contributions guidelines](https://github.com/mrlm-net/.github/blob/main/docs/CONTRIBUTING.md)._

> If you'd like to report security issue please follow [security guidelines](https://github.com/mrlm-net/logz?tab=security-ov-file).

---
<sup><sub>_All rights reserved &copy; Martin Hrášek [<@marley-ma>](https://github.com/marley-ma) and WANTED.solutions s.r.o. [<@wanted-solutions>](https://github.com/wanted-solutions)_</sub></sup>