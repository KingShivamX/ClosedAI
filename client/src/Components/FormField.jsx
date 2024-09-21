import React from "react"

const FormField = ({
    lableName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
}) => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-green-900"
                >
                    {lableName}
                </label>
                {isSurpriseMe && (
                    <button
                        type="button"
                        onClick={handleSurpriseMe}
                        className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black "
                    >
                        Surprise Me
                    </button>
                )}
            </div>

            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                required
                className="bg-grey-50 border-gray-300 text-gray-900 text-sm rounded-lg border focus:ring-[#FFAE00] focus:border-[#FFAE00] outline-none block w-full p-3"
            />
        </div>
    )
}

export default FormField
