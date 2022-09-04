# 1. Typescript

Date: 4 Sep 2022

## Status

Proposed

## Context

Javascript by default doesn't have inherent types. Typescript offers a way to typecheck and extends JS to improve its functionality.  


## Decision

The app will use TS over vanilla Javascript. 


## Consequences

The prettier and eslint configurations disable implicit 'any' typing, meaning that all methods, functions, etc will need their own Typescript types. This will add compilation type-checking to reduce human error when passing types between methods in the application.  



