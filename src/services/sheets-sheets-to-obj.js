
import { google } from 'googleapis'
const PRIVATE_KEY = import.meta.env.PRIVATE_KEY;
const CLIENT_EMAIL = import.meta.env.CLIENT_EMAIL;

/**
 * AUTHENTICATE GOOGLE ******************************************************* 
 * @param {*} email    email to connect google
 * @param {*} key      private key for connection
 * @returns obj 
 */ 
const authenticate = async (email, key) => {
// Crear un cliente JWT (JSON Web Token) para la autenticación
const client = new google.auth.JWT(email, null, key,  ['https://www.googleapis.com/auth/spreadsheets']);
// Realizar la autenticación y ejecutar una operación en la hoja de cálculo
let googleSheets = null
  try {
    // Autenticar al cliente
    await client.authorize();
    // Crear instancia de la API de Google Sheets
    googleSheets = google.sheets({ version: 'v4', auth: client });
  } catch (error) {
    console.error('Error::', error.message);
  }
  return googleSheets
};   
 

/** LISTA DE HOJAS DEL LIBRO **********************************************
 * @param {*} googleSheets    // Autheticated google client
 * @param {*} spreadsheetId   // Google sheet code
 * @returns   sheets          // Array of sheets of the book
 */
// Lista de hojas de un libro
const getSheetsList = async (googleSheets, spreadsheetId ) => { 
    const sheets = await googleSheets.spreadsheets.get({
      spreadsheetId,
    });
    const sheetsList = sheets.data.sheets;
    return sheetsList
}
/** LISTA DE FILAS DE LA HOJA *********************************************
 * 
 * @param {*} sheetName       // Sheet Name 
 * @param {*} spreadsheetId   // Google sheet code
 * @returns rows              // Array of rows of the sheet
 */
const getRowsList = async (googleSheets, sheetName ,spreadsheetId) => {
  const sheet = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName.properties.title}!A:Z`, // Especifica el nombre o rango de la hoja que quieres leer
  });
  const rows = sheet.data.values;
  return rows
}

/**  CREAR OBJETO JS REFLEJO DE LA HOJA DE CALCULO
 * @param {*} sheetName       // Sheet Name 
 * @param {*} spreadsheetId   // Google sheet code
 * @returns rows              // Array of rows of the sheet
 */
const createObj = async (googleSheets, sheetsList, SPREADSHEET_ID) => {
  const book = []
  for (const sheet of sheetsList) {
    const cellObj = {}
    cellObj['id'] = sheet.properties.title
    const rowsList =  await getRowsList(googleSheets, sheet, SPREADSHEET_ID)
    rowsList.forEach( ( row, indexRow) => {
      row.forEach(( cell, indexColumn) => {
        cellObj[String.fromCharCode(65 + indexColumn) + (indexRow+1)] = cell.replaceAll('\\', '\\\\')
      })
      
    })
    book.push(cellObj)  
  }
  return book 
}


/** PROCESO PRINCIPAL ********************************************************
 * @param {*} Credential file                     // Credentials 
 * @param {*} spreadsheetId constant file         // Identifier sheets
 */
export const sheet_to_obj = async (SPREADSHEET_ID) => {  
  const googleSheets = await authenticate (CLIENT_EMAIL, PRIVATE_KEY.replace(/\\n/g, '\n'))

  const sheetsList =  await getSheetsList (googleSheets, SPREADSHEET_ID )
  
  const book = await createObj(googleSheets, sheetsList, SPREADSHEET_ID)

  return book
}
