const asciidoctor = require('@asciidoctor/core')()
const asciidoctorColor = require('../src/asciidoctor-color')

const registry = asciidoctorColor.register(asciidoctor.Extensions.create())
asciidoctor.convertFile('color.adoc', { extension_registry: registry, safe: 'safe' })
