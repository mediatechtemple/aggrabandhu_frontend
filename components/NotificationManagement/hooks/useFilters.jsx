import { useState, useEffect } from 'react';

const useFilters = (initialMembers) => {
    
    const [filteredMembers, setFilteredMembers] = useState(initialMembers);
    const [filters, setFilters] = useState({
        refrenceId:'',
        district: '',
        state: '',
        name: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        let result = initialMembers;

        // Apply district filter
        if (filters.district) {
            result = result.filter(member => 
                member.district.toLowerCase().includes(filters.district.toLowerCase())
            );
        }

        // Apply state filter
        if (filters.state) {
            result = result.filter(member => 
                member.state.toLowerCase().includes(filters.state.toLowerCase())
            );
        }

        // Apply name filter
        if (filters.name) {
            result = result.filter(member => 
                member.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // Apply date filter
        if (filters.startDate && filters.endDate) {
            result = result.filter(member => {
                const memberDate = new Date(member.date);
                const startDate = new Date(filters.startDate);
                const endDate = new Date(filters.endDate);

                return memberDate >= startDate && memberDate <= endDate;
            });
        }

        if(filters.refrenceId){
            result = result.filter(member => 
                member.referenceId.toLowerCase().includes(filters.refrenceId.toLowerCase())
            );
        }

        setFilteredMembers(result);
    }, [filters, initialMembers]);

    
    const handleFilterChange = (e) => {
      
        const { name, value } = e.target;
        console.log(name,value);
        setFilters({
            ...filters,
            [name]: value
        });
    };

    return {
        filteredMembers,
        filters,
        handleFilterChange
    };
};

export default useFilters;
