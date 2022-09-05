# 1. Luxon

Date: 5 Sep 2022

## Status

Proposed

## Context

Javascipt Date objects are fine for simple use cases but struggle when comparisons are involved. There are popular date libraries that make working with dates much easier. 


## Decision

Luxon is the chosen date library due to its immutability of its return objects. It reduces the risk involved with passing a wrong variable or result between functions. 


## Consequences

A dependency upon Luxon. The library is well supported and maintained so is a minor risk. 



