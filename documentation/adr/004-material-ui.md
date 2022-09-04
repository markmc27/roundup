# 1. Material UI

Date: 4 Sep 2022

## Status

Proposed

## Context

There are many React UI libraries that provide a maintained and extensive list of components out-of-the-box. Most of the libraries have theming capability to facilitate custom look and feel to match almost any design. 

Using a UI framework means we won't need to reinvent common components and have a head-start with how the site looks. We will also get accessibility, performance, and responsive layouts. 


## Decision

Material UI is a well-supported, popular React UI framework that is based on Google's Material UI guidelines. It provides extensive theming options and a wide variety of components. 


## Consequences

A dependency upon Material UI. The app will create custom wrapper components around the Material UI components to create a separation of concerns between Material UI and the app's own components. 



