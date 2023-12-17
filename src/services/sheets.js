import {sheet_to_obj} from './sheets-sheets-to-obj.js'
import {bookObj_to_jsonStr} from './sheets-obj-to-str.js'
import constants from '../json/constants.json' assert { type: "json" }

export const loadSpreadsheet = async () => {

  const SPREADSHEET_ID = constants.spreadsheetId

  const bookObj = await sheet_to_obj(SPREADSHEET_ID)
  const bookStr = bookObj_to_jsonStr(bookObj)
  const bookJson = JSON.parse(bookStr.replaceAll('\\\\', '\\'))
  return bookJson
}