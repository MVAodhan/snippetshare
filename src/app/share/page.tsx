"use client";

import React, { useRef, useState } from "react";
import { X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveSnippetAction } from "../safe-actions/save-snippet";
import { useUser } from "@clerk/nextjs";

// Tags Form Component
const TagsForm = ({
  tags,
  onAddTag,
  onRemoveTag,
  error,
}: {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  error?: string;
}) => {
  const [currentTag, setCurrentTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTag.trim()) {
      onAddTag(currentTag.trim());
      setCurrentTag("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags</Label>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            id="currentTag"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Add a tag..."
            className={error ? "border-red-500" : ""}
          />
          <Button type="submit" className="flex-shrink-0">
            <Plus size={16} />
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="hover:text-blue-900"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

// Main Component
const SnippetForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    code: "",
    tags: "",
  });

  // Refs for form inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const handleAddTag = (newTag: string) => {
    if (!tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setErrors((prev) => ({ ...prev, tags: "" }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const { user } = useUser();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      code: "",
      tags: "",
    };

    if (!titleRef.current?.value.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!descriptionRef.current?.value.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!codeRef.current?.value.trim()) {
      newErrors.code = "Code snippet is required";
      isValid = false;
    }

    if (tags.length === 0) {
      newErrors.tags = "At least one tag is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const formData = {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        code: codeRef.current?.value,
        tags,
      };
      console.log("Form submitted:", formData);

      const savedSnippet = await saveSnippetAction({
        code: formData.code!,
        title: formData.title!,
        description: formData.description!,
        tags: formData.tags,
        authorId: user!.id,
      });

      console.log("saved Snippet", savedSnippet);
    }
  };

  return (
    <div className=" p-4 sm:p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Share a Snippet</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            ref={titleRef}
            placeholder="e.g., Custom useLocalStorage Hook"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            ref={descriptionRef}
            placeholder="Briefly describe what your snippet does..."
            className={`min-h-[100px] ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Textarea
            id="code"
            ref={codeRef}
            placeholder="Paste your code here..."
            className={`font-mono min-h-[200px] ${
              errors.code ? "border-red-500" : ""
            }`}
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
        </div>

        <TagsForm
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          error={errors.tags}
        />

        <Button onClick={handleSubmit} className="w-full">
          Share Snippet
        </Button>
      </div>
    </div>
  );
};

export default SnippetForm;
