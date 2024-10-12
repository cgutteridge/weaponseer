import fs from 'fs/promises'

// Path to the JSON data file
const filePath = './wargear.json'

const extractUniqueTags = async () => {
  try {
    // Read and parse the JSON data file
    const data = await fs.readFile(filePath, 'utf8')
    const wargearData = JSON.parse(data)

    // Create a Set to store unique tags
    const uniqueTags = new Set()

    // Loop through each entry and add tags to the Set
    wargearData.forEach(entry => {
      if (Array.isArray(entry.description)) {
        entry.description.forEach(tag => uniqueTags.add(tag))
      }
    })

    // Convert Set to an array and sort it
    const tagsList = Array.from(uniqueTags).sort()

    // Output the list of unique tags
    console.log(tagsList)
  } catch (err) {
    console.error('Error reading or processing the file:', err)
  }
}

extractUniqueTags()

