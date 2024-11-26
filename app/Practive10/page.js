'use client'
import React, { useState } from 'react';

// Sample data
const users = [
    { id: 1, name: 'Alice', age: 25, status: 'Active', state: 'California', district: 'District A' },
    { id: 2, name: 'Bob', age: 30, status: 'Inactive', state: 'Texas', district: 'District B' },
    { id: 3, name: 'Charlie', age: 35, status: 'Active', state: 'California', district: 'District C' },
    { id: 4, name: 'David', age: 40, status: 'Inactive', state: 'Texas', district: 'District D' },
    { id: 5, name: 'Eve', age: 22, status: 'Active', state: 'New York', district: 'District E' },
];

const MultiFilterComponent = () => {
    const [filters, setFilters] = useState({
        name: '',
        ageRange: '',
        status: '',
        state: '',
        district: '',
    });

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredUsers = users.filter((user) => {
        const matchesName = user.name.toLowerCase().includes(filters.name.toLowerCase());
        const matchesAgeRange = !filters.ageRange || (
            (filters.ageRange === '20-30' && user.age >= 20 && user.age <= 30) ||
            (filters.ageRange === '31-40' && user.age >= 31 && user.age <= 40)
        );
        const matchesStatus = !filters.status || user.status === filters.status;
        const matchesState = !filters.state || user.state === filters.state;
        const matchesDistrict = !filters.district || user.district === filters.district;

        return matchesName && matchesAgeRange && matchesStatus && matchesState && matchesDistrict;
    });

    // Unique states and districts for dropdowns
    const uniqueStates = [...new Set(users.map((user) => user.state))];
    const uniqueDistricts = [...new Set(users.map((user) => user.district))];

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Filter Users</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Age Range</label>
                    <select
                        name="ageRange"
                        value={filters.ageRange}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">All</option>
                        <option value="20-30">20-30</option>
                        <option value="31-40">31-40</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">State</label>
                    <select
                        name="state"
                        value={filters.state}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">All</option>
                        {uniqueStates.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">District</label>
                    <select
                        name="district"
                        value={filters.district}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">All</option>
                        {uniqueDistricts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Filtered Results */}
            <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Filtered Users</h3>
                {filteredUsers.length > 0 ? (
                    <ul className="list-disc pl-4">
                        {filteredUsers.map((user) => (
                            <li key={user.id}>
                                {user.name} - {user.age} - {user.status} - {user.state} - {user.district}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users match the filters.</p>
                )}
            </div>
        </div>
    );
};

export default MultiFilterComponent;
