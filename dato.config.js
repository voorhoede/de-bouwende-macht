const dataDir = `static/data/`

module.exports = (dato, root) => {
  root.directory(dataDir, dir => {
    const questions = dato.collectionsByType.questions
    dir.createDataFile('questions.json', 'json', mapCollection(questions))

    const locations = dato.collectionsByType.locations
    dir.createDataFile('locations.json', 'json', mapCollection(locations))
  })
}

function mapCollection(collection) {
  return collection.reduce((acc, item) => {
    const mappedData = item.toMap()
    acc.push(mappedData)
    return acc
  }, []);
}