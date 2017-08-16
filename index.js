const path = require('path');
const loaderUtils = require('loader-utils');
const Fontmin = require('fontmin');

function glyph(text) {
  return Fontmin.glyph({ text: text });
}

function convert(from, to) {
  if (from === to) {
    return null;
  }
  return Fontmin[from + '2' + to]({ deflate: true });
}

module.exports = function (content) {
  this.cacheable && this.cacheable();

  const callback = this.async();
  const query = loaderUtils.parseQuery(this.resourceQuery);
  const ext = path.extname(this.resourcePath).substr(1);

  let fontmin = new Fontmin()
    .src(content);

  if (ext !== 'ttf') {
    fontmin = fontmin.use(convert(ext, 'ttf'));
  }

  if (query.glyphs) {
    fontmin = fontmin.use(glyph(query.glyphs));
  }

  if (query.ext && query.ext !== 'ttf') {
    fontmin = fontmin.use(convert('ttf', query.ext))
  }

  fontmin
    .run(function (err, files) {
      callback(null, files[0].contents);
    });
};

module.exports.raw = true;

module.exports.pitch = function (request) {
  const ext = path.extname(this.resourcePath).substr(1);
  if (['ttf', 'otf'].indexOf(ext) < 0) {

    return 'module.exports = require(' + loaderUtils.stringifyRequest(this,
      __filename + '!' +
      this.resourcePath.replace( '.' + ext, '.ttf' ) +
      (this.resourceQuery ? ( this.resourceQuery + '&' ) : '?') + 'ext=' + ext) + ');';
  }
};
