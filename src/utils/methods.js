export function filterByCity(adverts, city) {
  const array = [];
  if(city === null) {
      return adverts
  }
  if (adverts != null && adverts.length > 0) {
    adverts.map(advert => {
      if (advert.city === city.id) {
        array.push(advert);
      }
    });
  }
  return array;
}

// {
//     id: 'some uniq string id',
//     title: 'list item title'
// }

// export function citiesToDataset(cities) {
//     const array = []
//     cities.map(city => {
//         {
//             array.push({
//                 id: city.id,
//                 title
//             })
//         }
//     })
// }
