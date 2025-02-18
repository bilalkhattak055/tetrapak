export const filterItems =(data, searchTerm, fields)=> {
    const lowerSearchTerm = searchTerm.toLowerCase()
    return data.filter(item=> {
        return fields.some(field=> {
            console.log('11111111111',item[field])
            return String(item[field]).toLowerCase().includes(lowerSearchTerm)
        })
    })
}

export const applyButtonFilters = (currentFilters, data) => {
    let filteredData = [...data];

    Object.keys(currentFilters).forEach((key) => {
        if (currentFilters[key]) {
            filteredData = filteredData.filter((item) =>
                String(item[key]).toLowerCase() === String(currentFilters[key]).toLowerCase()
            );
        }
    });

    return filteredData;

  
};