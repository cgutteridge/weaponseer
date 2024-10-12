import fs from 'fs/promises'

const filePath = './Datasheets_wargear.csv'

// Function to parse the HTML links and extract the text inside the <a> tags
const extractTagsFromDescription = (description) => {
  // Regular expression to match the content inside <a>...</a> tags
  const regex = /<a[^>]*>(.*?)<\/a>/g
  let match
  const tags = []

  // Loop over all matches
  while ((match = regex.exec(description)) !== null) {
    tags.push(match[1].trim().toLowerCase()) // Add the matched text (inside <a>) to the tags array
  }

  return tags
}

// Function to parse each line of the file into an object
const parseLine = (line) => {
  const [
    datasheet_id, line_num, line_in_wargear, dice, name, description, range, type, A, BS_WS, S, AP, D
  ] = line.split('|')

  // Extract tags from the description HTML string using the regex function
  const tags = extractTagsFromDescription(description)

  return {
    datasheet_id,
    line_num,
    line_in_wargear,
    dice,
    name,
    description: tags, // Convert HTML to tags list
    range,
    type,
    A,
    BS_WS,
    S,
    AP,
    D
  }
}

// Main function to read the file and process it
const convertToJSON = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    const lines = data.trim().split('\n')
    //const headers = lines[0].split('|') // First line is the header
    const parsedData = lines.slice(1).map(parseLine) // Process each data line

    console.log(JSON.stringify(parsedData, null, 2)) // Output the JSON
  } catch (err) {
    console.error('Error reading or parsing the file:', err)
  }
}

convertToJSON()


