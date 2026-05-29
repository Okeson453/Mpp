'use client';

/**
 * Filter Controls Component
 * Advanced filtering options for trades and data
 */

import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';

export interface FilterOption {
    id: string;
    label: string;
    type: 'text' | 'select' | 'date-range' | 'number-range';
    options?: Array<{ value: string; label: string }>;
    value?: string | { min: number; max: number } | { start: Date; end: Date };
    onChange?: (value: any) => void;
}

interface FilterControlsProps {
    filters: FilterOption[];
    onFilterChange?: (filters: FilterOption[]) => void;
    onReset?: () => void;
    className?: string;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
    filters,
    onFilterChange,
    onReset,
    className = '',
}) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleFilterChange = useCallback(
        (id: string, value: any) => {
            const updated = localFilters.map((f) => (f.id === id ? { ...f, value } : f));
            setLocalFilters(updated);
            onFilterChange?.(updated);
        },
        [localFilters, onFilterChange]
    );

    const handleReset = useCallback(() => {
        setLocalFilters(filters.map((f) => ({ ...f, value: undefined })));
        onReset?.();
    }, [filters, onReset]);

    return (
        <div className={`bg-slate-800 rounded-lg p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Filters</h3>
                <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1"
                >
                    <X size={14} />
                    Reset
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {localFilters.map((filter) => (
                    <div key={filter.id}>
                        <label className="block text-xs font-medium text-slate-400 mb-2">{filter.label}</label>

                        {filter.type === 'text' && (
                            <input
                                type="text"
                                value={filter.value as string}
                                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                placeholder="Filter..."
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                        )}

                        {filter.type === 'select' && (
                            <select
                                value={filter.value as string}
                                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="">All</option>
                                {filter.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        {filter.type === 'number-range' && (
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterControls;
