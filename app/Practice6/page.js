'use client'
import Pagination from "@/user_component/Pagination/Pagination";
import { useState } from "react";
// import Pagination from "./Pagination";

const TableWithPagination = () => {
  const data = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
    { id: 4, name: "David", age: 28 },
    { id: 5, name: "Eve", age: 24 },
    { id: 6, name: "Frank", age: 29 },
    { id: 7, name: "Grace", age: 26 },
    { id: 8, name: "Hannah", age: 31 },
    { id: 9, name: "Ian", age: 27 },
    { id: 10, name: "Jack", age: 32 },
    { id: 11, name: "Karen", age: 23 },
    { id: 12, name: "Leo", age: 35 },
    { id: 13, name: "Mona", age: 28 },
    { id: 14, name: "Nina", age: 26 },
    { id: 15, name: "Owen", age: 30 },
    { id: 16, name: "Paul", age: 27 },
    { id: 17, name: "Quinn", age: 29 },
    { id: 18, name: "Rose", age: 25 },
    { id: 19, name: "Steve", age: 33 },
    { id: 20, name: "Tina", age: 24 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Displaying 5 items per page


  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "ascending" });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    alert(pageNumber);
    setCurrentPage(pageNumber);
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Paginated Table</h2>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset current page to 1 on search
        }}
        className="mb-4 p-2 border rounded"
      />

      {/* Table */}
      <table className="w-full text-left border border-gray-300">
        <thead>
          <tr>
            <th onClick={() => requestSort("id")} className="cursor-pointer border-b p-2">ID</th>
            <th onClick={() => requestSort("name")} className="cursor-pointer border-b p-2">Name</th>
            <th onClick={() => requestSort("age")} className="cursor-pointer border-b p-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border-b">{item.id}</td>
              <td className="p-2 border-b">{item.name}</td>
              <td className="p-2 border-b">{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>




      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TableWithPagination;
