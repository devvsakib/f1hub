// src/components/common/Tabs.jsx
import React, { createContext, useContext, useState } from 'react';

// Create context for tabs
const TabsContext = createContext(null);

// Main Tabs component
export const Tabs = ({ defaultValue, children, className = '', onValueChange }) => {
    const [value, setValue] = useState(defaultValue);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <TabsContext.Provider value={{ value, onChange: handleValueChange }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

// TabsList component
export const TabsList = ({ children, className = '' }) => {
    return (
        <div className={`inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1 ${className}`}>
            {children}
        </div>
    );
};

// TabsTrigger component
export const TabsTrigger = ({ value, children, className = '' }) => {
    const context = useContext(TabsContext);
    const isActive = context.value === value;

    return (
        <button
            type="button"
            className={`
        px-4 py-2 text-sm font-medium transition-all
        ${isActive
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm rounded-md'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }
        ${className}
      `}
            onClick={() => context.onChange(value)}
        >
            {children}
        </button>
    );
};

// TabsContent component
export const TabsContent = ({ value, children, className = '' }) => {
    const context = useContext(TabsContext);

    if (context.value !== value) {
        return null;
    }

    return <div className={className}>{children}</div>;
};