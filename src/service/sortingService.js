const sortingService = {
  byProperty: (list, propertyKey, order) => {
    return list.sort((first, second) => {

      if(order === 'asc') {
       return second[propertyKey] < first[propertyKey] ? 1 : -1;
      }

      return first[propertyKey] < second[propertyKey] ? 1 : -1;
    });
  }
};

export default sortingService;