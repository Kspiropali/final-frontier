import React from 'react'
import { useShop } from '../../contexts/ShopContext'

const filterOptions = [
    { label: 'Backgrounds', key: 'option1' },
    { label: 'Hats', key: 'option2' },
    { label: 'Tops', key: 'option3' },
    { label: 'Bottoms', key: 'option4' },
    { label: 'Shoes', key: 'option5' },
    { label: 'Accessories', key: 'option6' },
  ];

const FilterItems = () => {
    const { selectedFilters, handleCheckboxChange } = useShop()

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
                    onChange={() => handleCheckboxChange(option.key)}
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