"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";

export default function VideoCard({ title, videoId, thumbnail, channelTitle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group flex flex-col gap-3 bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 shadow-md cursor-pointer h-full"
      >
        <div className="w-full aspect-video overflow-hidden relative border-b border-gray-800">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 drop-shadow-xl" />
          </div>
        </div>
        <div className="px-4 pb-4 flex flex-col flex-grow justify-between">
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors" title={title}>
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">{channelTitle}</p>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col shadow-indigo-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full z-10 transition-opacity">
               <span className="text-white font-semibold truncate pr-4 drop-shadow-md">{title}</span>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-all hover:scale-105 border border-white/10"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            <div className="w-full aspect-video relative bg-gray-900">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                className="absolute inset-0 w-full h-full outline-none border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
