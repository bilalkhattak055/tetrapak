
export const applyDynamicFilters = (data, filters = []) => {
    return filters.reduce((filteredData, filterFunction) => {

      return filterFunction ? filterFunction(filteredData) : filteredData;
    }, data);
  };
  

  export const createSearchFilter = (searchValue, fields) => {
    const searchTerm = searchValue.trim().toLowerCase();
    return (data) => {
      if (!searchTerm) return data; // Return unfiltered data if searchValue is empty
      return data.filter((item) =>
        fields.some((field) => {
          const fieldValue = item[field]?.props?.children || item[field]; // Handle nested values like React elements
          return fieldValue && fieldValue.toString().toLowerCase().includes(searchTerm);
        })
      );
    };
  };
  
 
  export const createRoleFilter = (roleValue) => {
    return (data) => {
      if (!roleValue) return data; // Return unfiltered data if roleValue is not provided
      return data.filter((item) =>
        item.role.props.btnText.toLowerCase() === roleValue.toLowerCase()
      );
    };
  };
  
  //date filter 
  export const dateFilter =(dateValue)=> {
    console.log('dateValue', dateValue)
    return (data) => {
      if(!dateValue) return data;
      return data.filter((item)=> item.date === dateValue)
    }
  }
  
 
  
  