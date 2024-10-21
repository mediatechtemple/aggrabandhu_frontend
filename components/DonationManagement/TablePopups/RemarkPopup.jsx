import React, { useState } from 'react';

const RemarkPopup = ({ handleRemarkClose ,remarkData,sortedRows,
    setsortedRows }) => {
    const [isRemarkOpen, setIsRemarkOpen] = useState(false);
    const [remark, setRemark] = useState('');
    const [submittedRemark, setSubmittedRemark] = useState(remarkData.remark);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    const handleIsRemarkHandler = (e) => {
        e.stopPropagation();
        setIsRemarkOpen(true);
    };

    const handleRemarkChange = (event) => {
        setRemark(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading when request begins
        setError(''); // Clear previous error
        //mere pass remark.id hai bhai..agar chahiye to
        try {
            const response = await fetch('https://backend.aggrabandhuss.org/api/donationreceive/'+remarkData.id, {
                method: 'PUT', // Fixed to lowercase 'method'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    remark: remark,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Successful submission
            setSubmittedRemark(remark);
            const updatedRows = sortedRows.map((row) =>
                row.id === remarkData.id ? { ...row, remark: remark } : row
            );
    
            setsortedRows(updatedRows); // Set the updated rows

            setRemark(''); // Clear remark input after submission
            setIsRemarkOpen(false); // Close popup after submission
        } catch (error) {
            // Set the error state
            setError('Failed to submit the remark. Please try again.');
        } finally {
            setLoading(false); // Stop loading when request is done
        }
    };

    return (
        <>
            <div onClick={handleRemarkClose} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[1400] ">
                <div className="bg-white p-8 rounded-lg shadow-lg text-black">
                    <div className='flex justify-end'>
                        <button
                            onClick={handleIsRemarkHandler}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Add Remark
                        </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto w-96">
                        {submittedRemark ? (
                            <div> 
                                <h3 className="font-bold">Submitted Remark:</h3>
                                <p className="border-b border-gray-300 py-1 text-black">{submittedRemark}</p>
                            </div>
                        ) : (
                            <p>No remark added yet!</p>
                        )}
                    </div>
                </div>
            </div>

            {isRemarkOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[1400]">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
                        <h2 className="text-lg font-bold mb-4">Please Add Remark!</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                name="paragraph_text"
                                cols="50"
                                rows="10"
                                className='border border-spacing-1 mb-4 p-2'
                                value={remark}
                                onChange={handleRemarkChange}
                            ></textarea>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? 'Submitting...' : 'Submit'} {/* Show loading text */}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsRemarkOpen(false)}
                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                    Cancel
                                </button>
                            </div>
                        </form>
                        {/* Show error message if there's an error */}
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default RemarkPopup;
