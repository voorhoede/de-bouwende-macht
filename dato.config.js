const dataDir = `static/data/`

module.exports = (dato, root) => {
  root.directory(dataDir, dir => {
    const questions = dato.collectionsByType.questions
    dir.createDataFile('questions.json', 'json', mapCollection(questions))
  })
}

function mapCollection(collection) {
  return collection.reduce((acc, item) => {
    const mappedData = [item.toMap(10)].map(removeMetaData)
    acc.push(mappedData)
    return acc
  }, []);
}

function removeMetaData (item) {
  ['id', 'itemType', 'createdAt', 'updatedAt'].forEach(prop => {
    delete item[prop]
  })
  if (typeof item === 'object') {
    Object.keys(item).forEach(key => {
      if (Array.isArray(item[key])) {
        item[key].forEach(removeMetaData)
      } else if (item[key] && typeof item[key] === 'object') {
        removeMetaData(item[key])
      }
    })
  }
  return item
}
