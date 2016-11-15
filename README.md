# Gulp starter pack 

## Purpose

To kick-start any web project.

## Pre-requisits:

- node.js
- gulp

## Usage

1) Fork and/or clone this repository  
2) run `npm install`  
3) run `gulp server`

Dev server starts on port 8080. It's wise to check if that port is not already occupied. In case you need to change it, see `connect` task in `gulpfile.js`. 


## Generating static pages

This toolbox comes with Assemble engine for generating static pages out of HBS templates and partials. 

## Running tasks:

Run tasks via `gulp [taskname]`. See following list for available tasks:

<table>
    <tr>
        <td><code>server</code></td>
        <td>Starts web server and watch for entire SRC directory. The only task you should ever need for development.</td>
    </tr>
    <tr>
        <td><code>connect</code></td>
        <td>Starts web server.</td>
    </tr>
    <tr>
            <td><code>watch</code></td>
            <td>Watch task for entire SRC</td>
    </tr>
    <tr>
            <td><code>sass:lint</code></td>
            <td>Linter for SASS.</td>
    </tr> 
    <tr>
            <td><code>sass:dev</code></td>
            <td>Dev build of SASS.</td>
    </tr>
    <tr>
            <td><code>sass:prod</code></td>
            <td>Production build of SASS - optimized.</td>
    </tr> 
    <tr>
            <td><code>css:dev</code></td>
            <td>SASS lint and css dev build.</td>
    </tr>
    <tr>
            <td><code>css:prod</code></td>
            <td>see sass:prod</td>
    </tr>
    <tr>
            <td><code>scripts:lint</code></td>
            <td>JavaScript linter</td>
    </tr> 
    <tr>
            <td><code>scripts:dev</code></td>
            <td>JavaScript dev build.</td>
    </tr>
    <tr>
            <td><code>scripts:prod</code></td>
            <td>JavaScript prod build.</td>
    </tr> 
    <tr>
            <td><code>render:dev</code></td>
            <td>Render HTML from HBS to build-dev.</td>
    </tr> 
    <tr>
            <td><code>render:prod</code></td>
            <td>Render HTML from HBS copy files to build-prod.</td>
    </tr>
    <tr>
            <td><code>copy:dev</code></td>
            <td>Plain copy of HTML files into build-dev.</td>
    </tr> 
    <tr>
            <td><code>copy:prod</code></td>
            <td>Plain copy of HTML files into build-prod.</td>
    </tr> 
    <tr>
            <td><code>build:dev</code></td>
            <td>Run dev build. CSS, JS, render HTML from HBS.</td>
    </tr> 
    <tr>
            <td><code>build:prod</code></td>
            <td>Run prod build. CSS, JS, render HTML from HBS.</td>
    </tr> 
      <tr>
            <td><code>build-static:dev</code></td>
            <td>Run dev build. CSS, JS, plain HTML copy.</td>
    </tr> 
    <tr>
            <td><code>build-static:prod</code></td>
            <td>Run prod build. CSS, JS, plain HTML copy.</td>
    </tr> 

</table>

