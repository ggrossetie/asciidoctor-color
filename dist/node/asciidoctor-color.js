// const COLOR_REGEX = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig

function colorInlineMacro () {
  const self = this
  self.named('color')
  self.process(function (parent, target) {
    return self.createBlock(parent, 'pass', `<code>${target}<span class="color-chip"><span style="background-color:${target};"></span></span></code>`).convert()
  })
}

function colorHexInline () {
  const self = this
  self.named('#')
  self.$match(/<code>(#([\da-f]{3}){1,2})<\/code>/ig)
  self.process(function (parent, target) {
    return self.createBlock(parent, 'pass', `<code>${target}<span class="color-chip"><span style="background-color:${target};"></span></span></code>`).convert()
  })
}

function colorRGBorHSLInline () {
  const self = this
  self.named('rgb-hsl')
  self.$match(/<code>((rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))<\/code>/ig)
  self.process(function (parent, target) {
    return self.createBlock(parent, 'pass', `<code>${target}<span class="color-chip"><span style="background-color:${target};"></span></span></code>`).convert()
  })
}

function colorRGBAorHSLAInline () {
  const self = this
  self.named('rgba-hsla')
  self.$match(/<code>((rgb|hsl)a\((\d{1,3}%?,\s?){3}((1|0?\.\d+)|\d{1,3}%?)\))<\/code>/ig)
  self.process(function (parent, target) {
    return self.createBlock(parent, 'pass', `<code>${target}<span class="color-chip"><span style="background-color:${target};"></span></span></code>`).convert()
  })
}

const colorDocinfoProcessor = function () {
  const self = this
  self.process((doc) => {
    if (doc.getBackend() !== 'html5') {
      return ''
    }
    const style = `.color-chip {
  display: inline-block;
  line-height: 1;
  margin: 0 0 2px 4px;
  vertical-align: middle;
  border-radius: 3px;
  width: 0.9em;
  height: 0.9em;
  background: #fff;
  background-image: linear-gradient(135deg, #e1e1e1 25%, transparent 0%, transparent 75%, #e1e1e1 0%),linear-gradient(135deg, #e1e1e1 25%, transparent 0%, transparent 75%, #e1e1e1 0%);
  background-size: 1em 1em;
  background-position: 0 0, 0.5em 0.5em;
}

.color-chip>span {
  display: inline-block;
  width: 100%;
  height: 100%;
  margin-bottom: 2px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.3);
}`
    return `<style type="text/css" class="color-style">${style}</style>`
  })
}

module.exports.register = function register (registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.inlineMacro(colorHexInline)
      this.inlineMacro(colorRGBAorHSLAInline)
      this.inlineMacro(colorRGBorHSLInline)
      this.inlineMacro(colorInlineMacro)
      this.docinfoProcessor(colorDocinfoProcessor)
    })
  } else if (typeof registry.block === 'function') {
    registry.inlineMacro(colorHexInline)
    registry.inlineMacro(colorRGBAorHSLAInline)
    registry.inlineMacro(colorRGBorHSLInline)
    registry.inlineMacro(colorInlineMacro)
    registry.docinfoProcessor(colorDocinfoProcessor)
  }
  return registry
}
