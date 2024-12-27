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
- [Contributing](#contributing)

## Installation

> I'm using `YARN` so examples will be using it, you can install this package via any Node Package Manager.

```shell
$ yarn add @mrlm/cfg
```

## Usage

Import the package and use it to merge configuration objects deeply.

```typescript
import { Config } from '@mrlm/cfg';

const default = {
  database: {
    host: 'localhost',
    port: 5432,
  },
  server: {
    port: 3000,
  },
};

const environment = {
  database: {
    host: 'production-db.example.com',
  },
  server: {
    port: 8000,
  },
};

const instance = new Config(default, environment);

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
console.log(instance.get("database.host"))
// GET value with fallback
console.log(instance.get("database.unknown", "fallback"))
```

## Advanced Usage

We have specific handlers for Node.js based environments to allow you easilly manage environment variables mapping and also filesystem based configuratons. Those function are exported as part of `@mrlm/cfg/server` package and can be used as follows.


## Contributing

_Contributions are welcomed and must follow [Code of Conduct](https://github.com/mrlm-net/logz?tab=coc-ov-file) and common [Contributions guidelines](https://github.com/mrlm-net/.github/blob/main/docs/CONTRIBUTING.md)._

> If you'd like to report security issue please follow [security guidelines](https://github.com/mrlm-net/logz?tab=security-ov-file).

---
<sup><sub>_All rights reserved &copy; Martin Hrášek [<@marley-ma>](https://github.com/marley-ma) and WANTED.solutions s.r.o. [<@wanted-solutions>](https://github.com/wanted-solutions)_</sub></sup>