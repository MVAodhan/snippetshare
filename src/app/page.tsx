"use client";

import React, { useEffect, useState } from "react";
import { Code, Plus, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSnippetsAction } from "./safe-actions/get-snippets";
import { type Snippet } from "./db/schema";
import Link from "next/link";
import { favoriteSnippet } from "./safe-actions/favorite-snippet";

const ReactSnippetsPlatform = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [codeSnippets, setCodeSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const getSnippets = async () => {
    const snippets = await getSnippetsAction();

    console.log(snippets);
    if (snippets && snippets.data) {
      setCodeSnippets(snippets.data);
      setFilteredSnippets(snippets.data);
    }
  };

  useEffect(() => {
    getSnippets();
  }, []);

  const allTags = ["all", "react", "drizzle"];

  const handleTagFilter = () => {
    if (selectedTag === "all") {
      setFilteredSnippets(codeSnippets);
      return;
    }
    const filteredSnippets = codeSnippets.filter((snippet) => {
      for (const tag of snippet.tags) {
        if (tag.toLocaleLowerCase() === selectedTag) {
          return snippet;
        }
      }
    });

    setFilteredSnippets(filteredSnippets);
  };

  const handleFavorite = async (id: string) => {
    const res = await favoriteSnippet({
      snippetId: id,
    });

    console.log(res);
    if (res?.data && !res?.data?.error) {
      if (favoriteIds.includes(id)) {
        const filtered = favoriteIds.filter((id) => id !== id);
        setFavoriteIds(filtered);
      } else {
        setFavoriteIds([...favoriteIds, id]);
      }
    }
  };

  console.log(favoriteIds);

  useEffect(() => {
    handleTagFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag]);

  return (
    <div className="w-full h-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              React Snippets
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Discover and share React code patterns
            </p>
          </div>
          <Link href="/share" className="text-primary">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
              <Plus size={16} />
              <span>Share Snippet</span>
            </Button>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          {/* <div className="flex items-center gap-2 p-3 border rounded-lg bg-white w-full">
             <Search className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search snippets..."
              className="w-full text-black outline-none bg-transparent text-sm sm:text-base"
            /> }
          </div> */}

          <div className="flex gap-2 flex-wrap">
            {allTags.map((tag) => (
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
          {filteredSnippets.map((snippet) => (
            <Card key={snippet.id} className="w-full overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Code size={20} className="flex-shrink-0" />
                    <span className="truncate">{snippet.title}</span>
                  </CardTitle>

                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map((tag) => (
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
                <p className=" text-sm sm:text-base mb-4">
                  {snippet.description}
                </p>
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 hover:bg-gray-100"
                    onClick={() => handleFavorite(snippet.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favoriteIds.includes(snippet.id)
                          ? "fill-current text-red-500"
                          : ""
                      }`}
                    />
                  </Button>
                </div>
                <div className=" p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs sm:text-sm font-mono">
                    <code className="language-typescript">{snippet.code}</code>
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
