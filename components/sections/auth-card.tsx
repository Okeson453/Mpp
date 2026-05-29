'use client';

/**
 * Auth Card Component
 * Styled card for authentication forms
 */

import React from 'react';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = '',
}) => {
  return (
    <div className={`w-full max-w-md ${className}`}>
      {/* Card */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>

        {/* Form Content */}
        <div className="space-y-4">{children}</div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 text-center text-sm text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
};

export default AuthCard;
