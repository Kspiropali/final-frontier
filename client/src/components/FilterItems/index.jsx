import React from 'react'
import { useShop } from '../../contexts/ShopContext'

const filterOptions = [
    { label: 'Backgrounds', key: 'option1' },
    { label: 'Hats', key: 'option2' },
    { label: 'Tops', key: 'option3' },
    { label: 'Shoes', key: 'option4' }
  ];

const FilterItems = () => {
    const { selectedFilters, handleCheckboxChange } = useShop()

  return (
    <div className="filter-items">
        <ul>
            {filterOptions.map((option) => (
            <li key={option.key}>
                <label>
                <input
                    type="checkbox"
                    checked={selectedFilters[option.key] || false}
                    onChange={() => handleCheckboxChange(option.key)}
                />
                {option.label}
                </label>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default FilterItems