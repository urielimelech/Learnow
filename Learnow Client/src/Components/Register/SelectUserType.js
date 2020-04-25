import React from 'react'
import Select from 'react-select';

export const SelectUserType = ({onChange, name}) => {

    const userTypeOptions = [
        { value: 'student', label: 'Student / Pupil' },
        { value: 'researcher', label: 'Researcher' }
    ]

    const handleChange = selectedOption => {
        selectedOption.target = {name: name, value: selectedOption.value}
        onChange(selectedOption)
    }

    return (
        <Select
            defaultValue={null}
            label="Single select"
            options={userTypeOptions}
            onChange={handleChange}
        />
    )
}