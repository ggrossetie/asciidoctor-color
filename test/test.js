const chai = require('chai')
const expect = chai.expect
const asciidoctorColor = require('../src/asciidoctor-color')
const asciidoctor = require('@asciidoctor/core')()
const cheerio = require('cheerio')

const registry = asciidoctorColor.register(asciidoctor.Extensions.create())

describe('Asciidoctor color extension', () => {
  it('should display a color chip using hex format', () => {
    const html = asciidoctor.convert('We should use the color color:#FF5733[] in our logo.', { extension_registry: registry })
    const result = cheerio.load(html)
    expect(result('.paragraph > p').html()).to.equal('We should use the color <code>#FF5733<span class="color-chip"><span style="background-color:#FF5733;"></span></span></code> in our logo.')
  })

  it('should display a color chip using short hex format', () => {
    const html = asciidoctor.convert('We should use the color `#FF5733` in our logo.', { extension_registry: registry })
    const result = cheerio.load(html)
    expect(result('.paragraph > p').html()).to.equal('We should use the color <code>#FF5733<span class="color-chip"><span style="background-color:#FF5733;"></span></span></code> in our logo.')
  })

  it('should display a color chip using a color name', () => {
    const html = asciidoctor.convert('color:red[]', { extension_registry: registry })
    const result = cheerio.load(html)
    expect(result('.paragraph > p').html()).to.equal('<code>red<span class="color-chip"><span style="background-color:red;"></span></span></code>')
  })

  it('should include a default style', () => {
    const html = asciidoctor.convert('color:#FF5733[]', { extension_registry: registry, header_footer: true, safe: 'safe' })
    const result = cheerio.load(html)
    expect(result('head > style.color-style')).to.have.lengthOf(1)
  })

  it('should not display a color chip when the short format is invalid', () => {
    let result = cheerio.load(asciidoctor.convert('`#rrr`', { extension_registry: registry }))
    expect(result('.paragraph > p').html()).to.equal('<code>#rrr</code>')
    result = cheerio.load(asciidoctor.convert('`#fff abc`', { extension_registry: registry }))
    expect(result('.paragraph > p').html()).to.equal('<code>#fff abc</code>')
  })
})
