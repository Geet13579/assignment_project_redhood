import React, { useState } from 'react';
import { Search } from 'lucide-react';

const MobileNumberFilter = () => {
  // Sample data - replace with your actual mobile numbers
  const allMobileNumbers = [
    "+1 (555) 123-4567",
    "+1 (555) 234-5678",
    "+1 (555) 345-6789",
    "+1 (555) 456-7890",
    "+1 (555) 567-8901",
    "+44 7700 900123",
    "+44 7700 900456",
    "+61 412 345 678",
  ];

  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredNumbers, setFilteredNumbers] = useState(allMobileNumbers);
  const [selectedNumber, setSelectedNumber] = useState('');

  const handleInputChange = (e:any) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
    
    // Filter numbers based on input
    const filtered = allMobileNumbers.filter(number =>
      number.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNumbers(filtered);
    
    // Update selected number with current input
    setSelectedNumber(value);
  };

  const handleSelectNumber = (number:any) => {
    setInputValue(number);
    setSelectedNumber(number);
    setShowDropdown(false);
  };

  const handleBlur = () => {
    // Delay hiding dropdown to allow click events to register
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      setSelectedNumber(inputValue);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search mobile number..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      {showDropdown && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredNumbers.length > 0 ? (
            filteredNumbers.map((number, index) => (
              <div
                key={index}
                onClick={() => handleSelectNumber(number)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {number}
              </div>
            ))
          ) : (
            <div className="px-4 py-2">
              <div className="text-gray-500 mb-2">No matching numbers found</div>
              <div className="text-sm text-blue-600">
                Press Enter to select: {inputValue}
              </div>
            </div>
          )}
        </div>
      )}
      
      {selectedNumber && !showDropdown && (
        <div className="mt-2 text-sm text-gray-600">
          Selected: {selectedNumber}
        </div>
      )}
    </div>
  );
};

export default MobileNumberFilter;