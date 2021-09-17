## Changelog

# [4.0.0](https://github.com/logdna/logdna-winston/compare/v3.0.5...v4.0.0) (2021-09-17)


### Chores

* **deps**: eslint-config-logdna@5.1.0 [1313046](https://github.com/logdna/logdna-winston/commit/1313046c9285294761c131c4ffe34f4e80c7194f) - Darin Spivey
* **deps**: eslint@7.32.0 [12f2235](https://github.com/logdna/logdna-winston/commit/12f22352b8eab571de5006f2a76131ac4f8ffb20) - Darin Spivey
* **deps**: semantic-release-config-logdna@1.3.0 [500705c](https://github.com/logdna/logdna-winston/commit/500705c2e6b9d3bc21be422684eefd2dd81fb9a1) - Darin Spivey
* **deps**: semantic-release@17.4.7 [a6e4501](https://github.com/logdna/logdna-winston/commit/a6e450129e0a1eb44616fae4bb0d94f0771771e5) - Darin Spivey


### Features

* **levels**: Support custom log levels in LogDNA [02c6b3e](https://github.com/logdna/logdna-winston/commit/02c6b3e41260c72e4397ed45565dbc2072c17209) - Darin Spivey, closes: [#31](https://github.com/logdna/logdna-winston/issues/31)


### **BREAKING CHANGES**

* **levels:** This removes the log level "translation"
that used to be in place to convert Winston levels to ones
that would be acceptable by LogDNA. Since LogDNA can now
define custom levels as well, this translation is no longer
needed, however it may break implementations that are
relying on the translated levels.

## [3.0.5](https://github.com/logdna/logdna-winston/compare/v3.0.4...v3.0.5) (2021-04-15)


### Build System

* replace npmignore with explicit files list [0e2058a](https://github.com/logdna/logdna-winston/commit/0e2058afa66164ff5b661ca6e830b5fe39885149) - Mike Del Tito


### Chores

* **deps**: update eslint tooling [2298f36](https://github.com/logdna/logdna-winston/commit/2298f366044125b9a16382c9cafa61c49b97605f) - Mike Del Tito
* **deps**: update logdna/logger@2.2.4 [f891936](https://github.com/logdna/logdna-winston/commit/f89193612c8ef82db9bcc67f0c681e371ffd33cf) - Mike Del Tito


### Continuous Integration

* add semantic-release [da609d7](https://github.com/logdna/logdna-winston/commit/da609d7c893054660c252a0fba64ca62ad7d1f57) - Mike Del Tito


### Miscellaneous

* add @darinspivey as a contributor [b11ed79](https://github.com/logdna/logdna-winston/commit/b11ed7979005bafd896eccf7848d4cf9009d88f1) - Mike Del Tito
* add @LYHuang as a contributor [b58fdac](https://github.com/logdna/logdna-winston/commit/b58fdac428744efcb05edae4a6fdfbad363fb49e) - Mike Del Tito
* add @mariocasciaro as a contributor [03e4def](https://github.com/logdna/logdna-winston/commit/03e4defc3039283275e47cb2dfbc25b1623ae4b5) - Mike Del Tito
* add @mdeltito as a contributor [4b401ff](https://github.com/logdna/logdna-winston/commit/4b401ff7bf902e0ea096f5c048ad3b4af9e3682f) - Mike Del Tito
* add @respectus as a contributor [3b3dd66](https://github.com/logdna/logdna-winston/commit/3b3dd66cabec501b64af6420a7b6fe0f400edf51) - Mike Del Tito
* add @smusali as a contributor [10b207c](https://github.com/logdna/logdna-winston/commit/10b207ced1a4f4fe985b2a84b8e7ebe91c4d7b39) - Mike Del Tito
* add @TheConnMan as a contributor [43ba8bd](https://github.com/logdna/logdna-winston/commit/43ba8bd71ee01fd1ebc973dd51e395f5e3aa4eee) - Mike Del Tito
* add @vilyapilya as a contributor [75c4348](https://github.com/logdna/logdna-winston/commit/75c43485f96258651c371288faae900270e7b3ab) - Mike Del Tito

# 2020-12-17, Version 3.0.4 (Stable)

* [[7be3610c3b](https://github.com/logdna/logdna-winston/commit/7be3610c3b)] - Always translate the log level. (Mario Casciaro)

# 2020-12-16, Version 3.0.3 (Stable)

* [[c5123aa947](https://github.com/logdna/logdna-winston/commit/c5123aa947)] - fix(ci): Expose linter results in the junit output (Darin Spivey)

# 2020-10-28, Version 3.0.2 (Stable)

* [[29f225ac1d](https://github.com/logdna/logdna-winston/commit/29f225ac1d)] - deps: @logdna/logger@2.0.0 (Darin Spivey)

# 2020-10-27, Version 3.0.1 (Stable)

* [[fe8b166d89](https://github.com/logdna/logdna-winston/commit/fe8b166d89)] - fix: add PR source validation to Jenkinsfile (Mike Del Tito) [LOG-7713](https://logdna.atlassian.net/browse/LOG-7713)

# 2020-10-08, Version 3.0.0 (Stable)

* [[1bba9a2b5e](https://github.com/logdna/logdna-winston/commit/1bba9a2b5e)] - **(SEMVER-MAJOR)** feat!: Change to use @logdna/logger as the client (Darin Spivey) [LOG-7378](https://logdna.atlassian.net/browse/LOG-7378)
* [[468a43930c](https://github.com/logdna/logdna-winston/commit/468a43930c)] - bump: bump the package version to v2.3.2 (#20) (Samir Musali)
* [[57d2bc5907](https://github.com/logdna/logdna-winston/commit/57d2bc5907)] - ci: Change to use Jenkins (Darin Spivey) [LOG-7378](https://logdna.atlassian.net/browse/LOG-7378)
* [[cabd1e5fa2](https://github.com/logdna/logdna-winston/commit/cabd1e5fa2)] - deps: eslint-config-logdna@2.0.0 (Darin Spivey) [LOG-7378](https://logdna.atlassian.net/browse/LOG-7378)
