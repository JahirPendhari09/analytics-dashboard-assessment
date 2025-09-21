import Papa from 'papaparse'

export const loadCSV = (path) => new Promise((resolve, reject) => {
  Papa.parse(path, {
    download: true,
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (results) => resolve(results.data),
    error: (err) => reject(err),
  })
})
