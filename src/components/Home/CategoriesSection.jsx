import React from 'react';
import { CodeBracketIcon, PaintBrushIcon, MegaphoneIcon, AcademicCapIcon, CommandLineIcon, MusicalNoteIcon, HomeModernIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const categories = [
  {
    id: 1,
    name: "Programming & Software Development",
    icon: CodeBracketIcon,
    link: "/categories/programming-&-development",
  },
  {
    id: 2,
    name: "Graphic Design",
    icon: PaintBrushIcon,
    link: "/categories/design",
  },
  {
    id: 3,
    name: "Sales & Digital Marketing",
    icon: MegaphoneIcon,
    link: "/categories/sales-&-marketing",
  },
  {
    id: 4,
    name: "Writing & Translation",
    icon: AcademicCapIcon,
    link: "/categories/writing-&-translation",
  },
  {
    id: 5,
    name: "AI Services",
    icon: CommandLineIcon,
    link: "/categories/ai-services"
  },
  {
    id: 6,
    name: "Music & Audio",
    icon: MusicalNoteIcon,
    link: "/categories/music-&-audio"
  },
  {
    id: 7,
    name: "Video & Photography",
    icon: VideoCameraIcon,
    link: "/categories/video-&-photography"
  },
  {
    id: 8,
    name: "Engineering & Architecture",
    icon: HomeModernIcon,
    link: "/categories/engineering-and-architecture"
  },
];

export default function CategoriesSection() {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-20">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <a href={category.link} key={category.id} className="flex flex-col items-center no-underline">
              <div className="p-6 rounded-lg shadow-lg bg-sky-200 hover:bg-sky-300 text-sky-700 w-full flex items-center justify-center transition-colors duration-300">
                <category.icon className="h-10 w-10" aria-hidden="true" />
              </div>
              <h5 className="mt-3 font-medium text-gray-700">{category.name}</h5>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}