import type { Newsletter } from '../services/interfaces/newsletter.d.ts'

import {loadSpreadsheet} from '../services/sheets.js'
import type { Reverse } from '../services/interfaces/newsletter.d.ts'

export async function getNewslettersAll() {
  const {data} = await loadSpreadsheet()
  return data
}
export async function getNewslettersLast() {
  const {data} = await loadSpreadsheet()
  const dataSelected = data.reduce((previous, current) => {
    return current.id > previous.id ? current : previous;
  });

  if (!dataSelected.widthPhoto) data['widthPhoto'] = 70
  return dataSelected
}

export async function getNewsletters(page) {
  const {data} = await loadSpreadsheet()
  const dataSelected = data.filter(item => item.id==page)  
  if (!dataSelected[0].widthPhoto[0]) dataSelected[0]['widthPhoto'] = 70
  return dataSelected[0]
}



export function newsSortedGrouped (news) {
  const newsSorted = news.slice().sort(function(a, b) {
    return a.order - b.order;
  })
 
  const newsGruopedBy = newsSorted.reduce(function (acc, obj) {
    const keyValue = obj['category'];
    if (!acc[keyValue]) {
      acc[keyValue] = [];
    }
    acc[keyValue].push(obj);
    return acc;
  }, {});
  return newsGruopedBy
}

export function calculeClasesReverse(news) {
const reverse: Reverse =  (news.order%2 == 1 || news.widthPhoto == 0 || news.widthPhoto == 100) 
? {rever:'', 
  first:'column column-2 mn-column2-article', 
  last:'column column-2 mn-column2-article'}  
: {rever:'reverse', 
  first:'column column-2 mn-column2-article first', 
  last:'column column-2 mn-column2-article last'} 

    return reverse
} 