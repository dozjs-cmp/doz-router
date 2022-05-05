# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.12.2] - 2022-05-05
- **Fixed** memory leak using bindLink

## [1.12.1] - 2022-05-02
- **Fixed** `data-router-link-radix` now can be empty

## [1.12.0] - 2022-04-29
- **Added** `data-router-link-radix` to links

## [1.11.0] - 2022-04-05
- **Changed** the bindLink method now resynchronizes the already stored links 

## [1.10.0] - 2022-03-28
- **Added** `init` method

## [1.9.1] - 2022-02-09
- **Fixed** query params now are available on create

## [1.9.0] - 2021-09-30
- **Added** `data-router-anchor-link` option which identifies an anchor link

## [1.8.3] - 2021-02-23
- **Fixed** added component name

## [1.8.2] - 2021-02-23
- **Fixed** fake boolean attribute `preserve`

## [1.8.1] - 2020-07-10
- **Improved** `initial-redirect-last`

## [1.8.0] - 2020-06-25
- **Added** `initial-redirect-last`

## [1.7.1] - 2020-03-22
- **Fixed** possible no object item

## [1.7.0] - 2020-03-22
- **Added** support to Doz 3.x

## [1.6.4] - 2020-02-08
- **Fixed** issue with popState and pushState

## [1.6.3] - 2020-01-31
- **Fixed** possible page not found when use `initial-redirect`

## [1.6.2] - 2019-07-09
- **Fixed** an issue with `initial-redirect` and Doz 1.20.x

## [1.6.1] - 2019-04-06
- **Fixed** active link in Electron environment

## [1.6.0] - 2019-04-04
- **Added** directive `no-destroy`
- **Fixed** some issues in Electron environment

## [1.5.0] - 2019-03-27
- **Added** support to file protocol

## [1.4.4] - 2018-11-09
- **Fixed** possible issue when set `root` property

## [1.4.3] - 2018-11-09
- **Improved** querystring parser

## [1.4.2] - 2018-11-05
- **Fixed** issue when use a cache buster like "/home/?anything"

## [1.4.1] - 2018-10-11
- **Fixed** `initial-redirect` issue when use SSR o PRE-RENDER

## [1.4.0] - 2018-10-11
- **Added** `initial-redirect` props
- **Added** wild card support for root, now works also "/*"
- **Added** `router` property to global mixin, now router instance is available in all components without you need call it by ID
- **Deprecated** methods:
    - `$param` in favor of `param`
    - `$query` in favor of `query`
    - `$currentPath` in favor of `currentPath`

## [1.2.3] - 2018-10-09
- **Fixed** possible issue when set "preserve"

## [1.2.2] - 2018-10-04
- **Fixed** README example

## [1.2.1] - 2018-10-04
- **Changed** default link router

## [1.2.0] - 2018-09-24
- **Added** support to pre-rendering

## [1.1.1] - 2018-09-02
- **Removed** HMR from build production -.-"

## [1.1.0] - 2018-09-01
- **Added** support to server side rendering

## [1.0.0] - 2018-08-18
- **Added** wild cards support
- **Added** `$currentPath` method

## [0.1.4] - 2018-08-03
- **Fixed** HTML5 api issue
- **Improvement** documentation

## [0.1.3] - 2018-08-01
- **Improvement** hmr compatibility

## [0.1.2] - 2018-07-03
- **Improvement** `$navigate` method

## [0.1.1] - 2018-06-11
- **Improvement** for router-link

## [0.1.0] - 2018-06-10
- First release
