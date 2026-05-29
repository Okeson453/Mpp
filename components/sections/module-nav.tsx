'use client';

/**
 * Module Navigation Component
 * Navigation for masterclass modules and lessons
 */

import React, { useState, useCallback } from 'react';
import { ChevronDown, Lock, CheckCircle } from 'lucide-react';
import type { MasterclassModule } from '@/lib/types/masterclass';

interface ModuleNavProps {
    modules: MasterclassModule[];
    activeModuleId?: string;
    onModuleSelect?: (moduleId: string) => void;
    onLessonSelect?: (moduleId: string, lessonId: string) => void;
    className?: string;
}

export const ModuleNav: React.FC<ModuleNavProps> = ({
    modules,
    activeModuleId,
    onModuleSelect,
    onLessonSelect,
    className = '',
}) => {
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

    const toggleModule = useCallback((moduleId: string) => {
        setExpandedModules((prev) => {
            const next = new Set(prev);
            if (next.has(moduleId)) next.delete(moduleId);
            else next.add(moduleId);
            return next;
        });
    }, []);

    const handleModuleClick = useCallback(
        (moduleId: string) => {
            onModuleSelect?.(moduleId);
            toggleModule(moduleId);
        },
        [onModuleSelect, toggleModule]
    );

    return (
        <nav className={`space-y-2 ${className}`}>
            {modules.map((module) => (
                <div key={module.id}>
                    <button
                        onClick={() => handleModuleClick(module.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeModuleId === module.id
                                ? 'bg-blue-500 text-white'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                    >
                        <div className="flex-shrink-0">
                            {module.completed ? (
                                <CheckCircle size={20} className="text-green-500" />
                            ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-500" />
                            )}
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-medium">{module.title}</div>
                            <div className="text-xs opacity-75">{module.progress}% complete</div>
                        </div>
                        <div className="flex-shrink-0">
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${expandedModules.has(module.id) ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </button>

                    {/* Lessons */}
                    {expandedModules.has(module.id) && (
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-700">
                            {module.lessons.map((lesson) => (
                                <button
                                    key={lesson.id}
                                    onClick={() => onLessonSelect?.(module.id, lesson.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
                                >
                                    {lesson.completedAt ? (
                                        <CheckCircle size={16} className="text-green-500" />
                                    ) : (
                                        <Lock size={16} className="opacity-50" />
                                    )}
                                    <span>{lesson.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default ModuleNav;
