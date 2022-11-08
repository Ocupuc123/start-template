const EOL = require('os').EOL

module.exports = function (entity, naming) {
  return [
    `// В этом файле должны быть стили для БЭМ-блока ${naming.stringify(entity)}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${naming.stringify(entity)} {\n  $${naming.stringify(entity)}: &; // #{$${naming.stringify(entity)}}__element\n}\n`
  ].join(EOL)
}
