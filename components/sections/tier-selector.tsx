'use client';

/**
 * Tier Selector Component
 * Interactive tier selection for subscriptions and plans
 */

import React, { useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import type { UserTier } from '@/lib/types/user';

export interface TierOption {
  tier: UserTier;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface TierSelectorProps {
  tiers: TierOption[];
  selectedTier?: UserTier;
  onTierSelect?: (tier: UserTier) => void;
  className?: string;
}

export const TierSelector: React.FC<TierSelectorProps> = ({
  tiers,
  selectedTier,
  onTierSelect,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {tiers.map((tier) => (
        <button
          key={tier.tier}
          onClick={() => onTierSelect?.(tier.tier)}
          className={`rounded-lg p-6 text-left transition-all transform ${
            selectedTier === tier.tier
              ? 'ring-2 ring-blue-500 scale-105 bg-slate-700 border-blue-500'
              : tier.popular
                ? 'border-2 border-blue-500 bg-slate-800'
                : 'border border-slate-700 bg-slate-800 hover:bg-slate-700'
          }`}
        >
          {tier.popular && (
            <div className="mb-3 inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
              Most Popular
            </div>
          )}

          {/* Tier Name */}
          <h3 className="text-lg font-bold text-white mb-2">{tier.name}</h3>

          {/* Price */}
          <div className="mb-4">
            <div className="text-3xl font-bold text-blue-400">
              ${tier.price}
              <span className="text-sm text-slate-400 ml-1">/{tier.period}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4 border-t border-slate-700 pt-4">
            {tier.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                <Check size={16} className="text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            className={`w-full py-2 rounded font-medium transition-colors ${
              selectedTier === tier.tier
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {selectedTier === tier.tier ? 'Selected' : 'Select'}
          </button>
        </button>
      ))}
    </div>
  );
};

export default TierSelector;
