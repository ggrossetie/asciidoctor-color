# :art: Color Extension for Asciidoctor.js

[![Travis build status](https://img.shields.io/travis/Mogztter/asciidoctor-color/master.svg)](https://travis-ci.org/Mogztter/asciidoctor-color)

An extension for [Asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js) to render color chips.

## Install

    $ npm i @asciidoctor/core asciidoctor-color

## Usage

In your document, use the `color` macro with a color reference (name, rgb, rgba, hsl, hsla or hex):

```
color:#FF5733[]
```

You can also use a short syntax if you are using a rgb, rgba, hsl, hsla or hex reference:

```
I like the color `#fcf`!
```

```
What do you think about `hsla(36, 100%, 50%, 75%)` in our design?
```

## Rendering

```adoc
[%hardbreaks]
`#fcf`
`#00BCD4`
`rgb(232, 74, 87)`
`rgba(103,58,183,50%)`
`hsl(88, 50%, 53%)`
`hsla(36, 100%, 50%, 75%)`

We should use the color color:blueviolet[] in our logo.
```

![](https://github.com/Mogztter/asciidoctor-color/raw/master/rendering.png)
