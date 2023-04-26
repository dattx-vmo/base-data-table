import get from "lodash.get";

export function isValidDate(dateString: any) {
  var d = new Date(dateString);
  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

export const sortBy = function(array: any[], key: string, type: string = 'asc') {
  return array.sort(function(a, b) {
    const valueA = typeof get(a, key) === 'string' ? get(a, key).toLowerCase() : get(a, key);
    const valueB = typeof get(b, key) === 'string' ? get(b, key).toLowerCase() : get(b, key);
    
    const x = isValidDate(valueA) ? new Date(valueA) : valueA ? valueA : '';
    const y = isValidDate(valueB) ? new Date(valueB) : valueB ? valueB : '';
    
    if (type === 'asc') {
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
  
}