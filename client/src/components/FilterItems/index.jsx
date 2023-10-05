import React from 'react'
import { useShop } from '../../contexts/ShopContext'

const filterOptions = [
    { label: 'Avatars', key: 'avatar' },
    { label: 'Characters', key: 'character' },
    { label: 'Backgrounds', key: 'background' }
  ];

const FilterItems = () => {
    const { selectedFilters, handleCheckboxChange } = useShop()

    const handleChange = (key) => {
        handleCheckboxChange(key);
      };

  return (
    <div>
        <ul>
            {filterOptions.map((option) => (
            <li key={option.key}>
                <div className="filter-item">
                <input
                    className="item-checkbox"
                    type="checkbox"
                    id={option.key}
                    checked={selectedFilters[option.key] || false}
                    onChange={() => handleChange(option.key)}
                />
                <label className="filter-label" htmlFor={option.key}>
                    {option.label}
                </label>
              </div>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default FilterItems