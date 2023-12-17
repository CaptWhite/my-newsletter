

export const bookObj_to_jsonStr = (book) => {
  let output = `{ "data": [ ^^ ] }`                               // ^^ representa el punto de inserción de datos del json generado

  for (const [index0, sheet] of book.entries()) {
  //    ********  CONSTANTES  ****************
    const keys = Object.keys(sheet)                                 // Claves de la hoja 0:   [  "id",   "A1",   "B1",   "C1", .....  "J5"]  
    const sheetName = sheet.id                                      // Nombre de la hoja:     '100'
    const keysTitle = keys.filter(key => key.substring(1) == '1')   // Claves de los t´tulos  [  "id",   "A1",   "B1",   "C1", .....  "J1"]  
    const valuesTitle = keysTitle.map(key => sheet[key])            // Valores de los t´tulos:["date", "widthPhoto", "[news]", .....  "widthPhoto2"]
    const changeLevel = valuesTitle.find(value => 
      value.substring(0,1) == '[')                                  // Título que empieza nivel 2:   "[news]""
    const changePosition = valuesTitle.indexOf(changeLevel)         // Posición que empieza niv 2:   2  
    const numberRows = keys.reduce( (max, key) => 
      key.substring(1) > max ? key.substring(1) : max, 0 )          // Número filas de la hoja

    //    ********  LEVEL 0  ****************
    // output es la salida del módulo y es el json generado en formato string
    let out = ` { "id": ${sheetName}, ^^ }, == `                    // out es el espacio json a intercalar en esta seccion                   
    let split = /(.*)\^\^(.*)/.exec(output)
    output = split[1] + out + split[2] 

    //    ********  LEVEL 1  ****************
    out = ''
    for (let i = 0; i < changePosition; i++){
      const cellTitle = `${String.fromCharCode(65 + i - 0)}1`
      const cellValue = `${String.fromCharCode(65 + i - 0)}2`
      out = out + `"${sheet[cellTitle]}": "${sheet[cellValue]}", ` 
    }
    split = /(.*)\^\^(.*)/.exec(output)
    output = split[1] + out + '^^' + split[2]

    //    ********  MIDDLE  ****************
    out = ''
    split = /(.*)\^\^(.*)/.exec(output)
    const cellTitle = `${String.fromCharCode(65 + changePosition - 0)}1`
    const cellTitleValue = sheet[cellTitle].substring(1,sheet[cellTitle].length-1)
    out = out + `"${cellTitleValue}": [^^], &&  ` 
    output = split[1] + out + split[2]

    //    ********  LEVEL 2  ****************
    for (let row=3; row<=numberRows; row++) {
      out = '{'

      for (let col = changePosition+1; col<keysTitle.length ; col++){
        const cellTitle = `${String.fromCharCode(65 + col - 0)}1`
        const cellValue = `${String.fromCharCode(65 + col - 0)}${row}`
        out = out + `"${sheet[cellTitle]}": "${sheet[cellValue]}"`
        if (col !== keysTitle.length-1)  out = out + ','
      }
      out = out + '}, ^^ '
      split = /(.*)\^\^(.*)/.exec(output)
      output = split[1] + out + split[2]
    }
    output = output.replace(', ^^ ', '').replace('&&','^^')
    output = output.replace(', ^^ ', '').replace('==','^^')
  }
  output = output.replace(', ^^ ', '')
  return output
} 