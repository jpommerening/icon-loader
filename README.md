# icon-loader 😐

> I feel stupid for creating [yet](https://www.npmjs.com/package/fontmin-loader) [another](https://www.npmjs.com/package/awesome-fontmin-loader) [font](https://www.npmjs.com/package/font-subset-loader) [loader](https://www.npmjs.com/package/font-gen-loader), but here it is.

## ![But why?](https://raw.githubusercontent.com/jpommerening/icon-loader/i/but-why.gif)

I wanted a font loader to:

- extract a subset of glyphs
- convert TTF to other formats
- not haphazardly write files to my filesystem
- require no additional setup

Apparently, you can only choose two.

## Usage

Install this loader and [fontmin](https://www.npmjs.com/package/fontmin):

```console
$ npm install --save-dev icon-loader fontmin
```

Hook it up [somewhere](https://webpack.js.org/configuration/module/#module-rules) in your webpack config:

```js
// webpack config
{
  test: /\.(eot|ttf|woff2?)(\?.*)?$/,
  use: [ 'file-loader', 'icon-loader' ] // or url-loader
}
```

Import your font and use the `glyphs=` query option to select the glyphs to extract from your font.
In SCSS you can of course build your list of glyphs programmatically as well.
Here's an example for [Font Awesome](http://fontawesome.io):

```scss
@import '~font-awesome/scss/_variables.scss';

/* the glyph= query parameter is used by the loader to determine which glyphs to extract */
/* $fa-font-path and $fa-var-meh-o are variables defined by font-awesome */

$fa-font-path: '~font-awesome/fonts';
$fa-font-query: 'v=#{$fa-version}&glyphs=#{unquote($fa-var-meh-o)}';

@font-face {
  font-family: 'FontAwesome';
  src: url('#{$fa-font-path}/fontawesome-webfont.eot?#{$fa-font-query}');
  src: url('#{$fa-font-path}/fontawesome-webfont.eot?#{$fa-font-query}') format('embedded-opentype'),
    url('#{$fa-font-path}/fontawesome-webfont.woff?#{$fa-font-query}') format('woff'),
    url('#{$fa-font-path}/fontawesome-webfont.ttf?#{$fa-font-query}') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@import '~font-awesome/scss/_mixins.scss';
@import '~font-awesome/scss/_core.scss';
```

## Legalese

MIT and stuff
