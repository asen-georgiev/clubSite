import _ from 'lodash';

//Must calculate the starting index of items for the currentPage
export function paginateFunct(items, itemsPerPage,currentPage){
    const startIndex = (currentPage -1) * itemsPerPage;

    //Using lodash _ to go to the startIndex and take all the items that we need for the currentPage
    //first converting items array to lodash _ wrapper and then chaining the slice and take methods.
    return _(items).slice(startIndex).take(itemsPerPage).value();
}
