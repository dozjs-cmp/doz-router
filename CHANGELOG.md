# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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
