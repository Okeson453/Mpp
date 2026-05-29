'use client';

/**
 * Lesson Viewport Component
 * Main viewport for displaying lesson content
 */

import React from 'react';
import { Play, FileText, Code } from 'lucide-react';
import type { Lesson } from '@/lib/types/masterclass';

interface LessonViewportProps {
    lesson: Lesson;
    className?: string;
}

export const LessonViewport: React.FC<LessonViewportProps> = ({ lesson, className = '' }) => {
    const getFormatIcon = () => {
        switch (lesson.format) {
            case 'video':
                return <Play size={20} />;
            case 'interactive':
                return <Code size={20} />;
            default:
                return <FileText size={20} />;
        }
    };

    return (
        <div className={`bg-slate-800 rounded-lg overflow-hidden ${className}`}>
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-slate-400">{getFormatIcon()}</span>
                    <span className="text-xs font-medium text-slate-400 uppercase">{lesson.format}</span>
                    <span className="text-xs text-slate-500 ml-auto">{lesson.duration} min</span>
                </div>
                <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
                <p className="text-sm text-slate-400 mt-1">{lesson.description}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Text Content */}
                {lesson.content.text && (
                    <div className="prose prose-invert max-w-none">
                        <div
                            className="text-slate-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: lesson.content.text }}
                        />
                    </div>
                )}

                {/* Code Snippets */}
                {lesson.content.codeSnippets && lesson.content.codeSnippets.length > 0 && (
                    <div className="space-y-4">
                        {lesson.content.codeSnippets.map((snippet, idx) => (
                            <div key={idx} className="bg-slate-900 rounded-lg overflow-hidden">
                                <div className="bg-slate-950 px-4 py-2 border-b border-slate-700">
                                    <code className="text-xs text-slate-400">{snippet.language}</code>
                                </div>
                                <pre className="p-4 overflow-x-auto">
                                    <code className="text-sm text-slate-300">{snippet.code}</code>
                                </pre>
                                {snippet.description && (
                                    <div className="px-4 pb-3 text-xs text-slate-400">{snippet.description}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Images */}
                {lesson.content.images && lesson.content.images.length > 0 && (
                    <div className="space-y-4">
                        {lesson.content.images.map((image, idx) => (
                            <img
                                key={idx}
                                src={image}
                                alt={`Lesson content ${idx + 1}`}
                                className="w-full rounded-lg border border-slate-700"
                            />
                        ))}
                    </div>
                )}

                {/* Resources */}
                {lesson.resources && lesson.resources.length > 0 && (
                    <div className="border-t border-slate-700 pt-6">
                        <h3 className="text-sm font-medium text-white mb-3">Resources</h3>
                        <div className="space-y-2">
                            {lesson.resources.map((resource) => (
                                <a
                                    key={resource.id}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-3 bg-slate-900 rounded hover:bg-slate-700 transition-colors"
                                >
                                    <div className="text-sm font-medium text-blue-400">{resource.title}</div>
                                    <div className="text-xs text-slate-400">{resource.type}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonViewport;
