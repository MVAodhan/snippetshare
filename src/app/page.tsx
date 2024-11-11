'use client'

import React, { useState } from 'react';
import { Search, Code, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ReactSnippetsPlatform = () => {
  const [selectedTag, setSelectedTag] = useState('all');

  const sampleSnippets = [
    {
      id: 1,
      title: "useLocalStorage Hook",
      description: "Custom hook to persist state in localStorage with type safety",
      tags: ["hooks", "typescript", "storage"],
      code: `const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};`,
    },
    {
      id: 2,
      title: "Responsive Image Component",
      description: "A reusable image component with lazy loading and fallback",
      tags: ["components", "typescript"],
      code: `interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ src, alt, className }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={\`relative \${className}\`}>
      <img
        src={error ? '/fallback.png' : src}
        alt={alt}
        className={\`\${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity\`}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
      />
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
    </div>
  );
};`,
    }
  ];

  const allTags = ['all', 'hooks', 'components', 'typescript', 'storage'];

  return (
    <div className="w-full h-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">React Snippets</h1>
            <p className="text-gray-600 text-sm sm:text-base">Discover and share React code patterns</p>
          </div>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
            <Plus size={16} />
            <span>Share Snippet</span>
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 p-3 border rounded-lg bg-white w-full">
            <Search className="text-gray-400 flex-shrink-0" />
            <input 
              type="text"
              placeholder="Search snippets..."
              className="w-full text-black outline-none bg-transparent text-sm sm:text-base"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {allTags.map(tag => (
              <Button 
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                onClick={() => setSelectedTag(tag)}
                className="capitalize text-xs sm:text-sm"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Snippets Grid */}
        <div className="grid gap-6">
          {sampleSnippets.map(snippet => (
            <Card key={snippet.id} className="w-full overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Code size={20} className="flex-shrink-0" />
                    <span className="truncate">{snippet.title}</span>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-800 rounded capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black text-sm sm:text-base mb-4">{snippet.description}</p>
                <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs sm:text-sm font-mono whitespace-pre text-black">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactSnippetsPlatform;