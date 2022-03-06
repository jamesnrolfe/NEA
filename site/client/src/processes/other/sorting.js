export const insertionSort = async array => {
    for (let i = 1; i < array.length; i++) {
        // for all items in the array, starting at 2nd item and ending at n-1th items
        let item = array[i];
        let j = i - 1; // temp
        while (j > -1 && item.score < array[j].score) {
            // whist the previous item is smaller
            array[j + 1] = array[j]; // swap items
            j--; // then look at next items
        }
        array[j + 1] = item;
    }
    return array.reverse(); // send the reverse back for descending order which is more useful
};
