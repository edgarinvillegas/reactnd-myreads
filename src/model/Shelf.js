/**
 * Shelf string enum. Can be imported independently
 */
const ShelfEnum = Object.freeze({
  CURRENTLY_READING: 'currentlyReading',
  WANT_TO_READ: 'wantToRead',
  READ: 'read',
  NONE: 'none'
});

/**
 * Shelf object, static class style.
 */
const Shelf = Object.freeze({
  Enum: ShelfEnum,  //Shelf.Enum is an alternative to ShelfEnum

  /**
   * Returns the human readable label for a given shelf identifier.
   * @param {ShelfEnum} shelf
   * @return {String}
   */
  getLabel: (shelf) => {
    return {
      [ShelfEnum.CURRENTLY_READING]: 'Currently Reading',
      [ShelfEnum.WANT_TO_READ]: 'Want to read',
      [ShelfEnum.READ]: 'Read',
      [ShelfEnum.NONE]: 'None'
    }[shelf];
  }
});

export default Shelf;
export { ShelfEnum }

