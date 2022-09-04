# 1. Next JS

Date: 4 Sep 2022

## Status

Proposed

## Context

To complete this challenge, the app needs to integrate with the Starling developer APIs. To call those APIs, they require an authentication token. To keep that token private, the API will be called server-side. 

We will also be using BDD acceptance criteria and automated testing, this will require an environment that can be easily configured to return reliable, predictable data. This will be easier with a tool that supports different configuration options. 


## Decision

The app will use Next JS for the following benefits: 
* Built-in API route support 
* Built on and optimised for React
* Quick to create a page
* Support SSR and SSG, although I don't plan to go that far for this task, it could be a future optimisation
* Built-in configuration support to easily switch between LIVE and TEST API - this will enable the BDD end-to-end testing 


## Consequences

Buying in to React and Node.js / Javascript back-end. 



