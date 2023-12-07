

import type { News, Reverse } from '../services/interfaces/newsletter.d.ts'

export async function getNewsletters() {
  //const response = await fetch("http://localhost:3000/data")
  const response = await fetch("https://my-json-server.typicode.com/CaptWhite/aster-newsletter/data")
  const data = await response.json() 
  if (!data.widthPhoto) data['widthPhoto'] = 70
  return data
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