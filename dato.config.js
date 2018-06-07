const dataDir = `static/data/`

module.exports = (dato, root) => {
  root.directory(dataDir, dir => {
    const questions = dato.collectionsByType.questions
    const mainQuestions = questions.filter(question => !question.followUp && !question.dependent)

    dir.createDataFile('questions.json', 'json', mapCollection(mainQuestions))
    dir.createDataFile('about.json', 'json', pageToJson(dato.about))
    dir.createDataFile('onboarding.json', 'json', pageToJson(dato.collectionsByType.onboarding))
    dir.createDataFile('share.json', 'json', pageToJson(dato.collectionsByType.share))
    dir.createDataFile('mijnRotterdam.json', 'json', pageToJson(dato.collectionsByType.mijnRotterdam))
    dir.createDataFile('seo.json', 'json', pageToJson(dato.collectionsByType.seo))
  })
}

function pageToJson (page) {
  return [page.toMap()]
    .map(removeMetaData)
    .pop()
}

function mapCollection(collection) {
  return collection.reduce((acc, item) => {
    const mappedData = [item.toMap(10)].map(removeMetaData)
    acc.push(...mappedData)
    return acc
  }, []);
}

function removeMetaData (item) {
  ['id', 'createdAt', 'updatedAt'].forEach(prop => {
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
