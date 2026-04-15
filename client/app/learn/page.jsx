"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { BookOpen, Shield, AlertTriangle, CheckCircle, Loader2, PlayCircle } from "lucide-react";
import VideoCard from "@/components/VideoCard";

const TOPICS = [
  { id: "phishing", name: "Phishing" },
  { id: "malware", name: "Malware" },
  { id: "password-security", name: "Password Security" },
  { id: "social-engineering", name: "Social Engineering" },
  { id: "safe-browsing", name: "Safe Browsing" },
  { id: "ransomware", name: "Ransomware" },
  { id: "network-security", name: "Network Security" },
];

export default function LearnPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  let routeTopic = params && params.topic ? decodeURIComponent(params.topic) : null;
  if (routeTopic) {
    routeTopic = routeTopic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  
  const initialCategory = routeTopic || searchParams.get("category") || "Phishing";

  const [activeTopic, setActiveTopic] = useState(initialCategory);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideosLoading(true);
        setVideosError(null);
        const res = await fetch("/api/learn/videos?topic=" + encodeURIComponent(activeTopic));
        if (!res.ok) throw new Error("Failed to fetch videos");
        const json = await res.json();
        setVideos(json);
      } catch (err) {
        setVideosError(err.message || "An unexpected error occurred");
      } finally {
        setVideosLoading(false);
      }
    };
    fetchVideos();
  }, [activeTopic]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setSelectedAnswers({}); // Reset quiz when topic changes
        
        const res = await fetch("/api/learn/content?category=" + encodeURIComponent(activeTopic));
        
        if (!res.ok) {
          throw new Error("Failed to fetch learn content");
        }
        
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTopic]);

  const handleTopicSelect = (topic) => {
    setActiveTopic(topic.name);
    // Push the URL purely visually so it stays extremely fast via state
    window.history.pushState(null, '', '/learn/' + topic.id);
  };

  const handleQuizSelect = (questionIdx, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: option }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gray-800 rounded-xl shadow-lg shadow-gray-900/50">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{data?.title || activeTopic + " Overview"}</h1>
          <p className="text-gray-400 mt-1">Select a topic below to dynamically load specialized cybersecurity training.</p>
        </div>
      </div>

      {/* Dynamic Topic Navigation Ribbon */}
      <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-gray-800">
        {TOPICS.map(topic => {
          const isActive = activeTopic.toLowerCase() === topic.name.toLowerCase();
          return (
            <button 
               key={topic.id}
               onClick={() => !isActive && handleTopicSelect(topic)}
               className={"px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm flex items-center " + (isActive ? "bg-indigo-600 text-white shadow-indigo-500/20 scale-105" : "bg-gray-900/80 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-gray-800")}
            >
              {topic.name}
            </button>
          )
        })}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-white">Generating module for {activeTopic}...</h2>
          <p className="text-gray-400 mt-2">Connecting to AI to securely fetch dynamic content.</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="p-4 bg-rose-500/10 rounded-full mb-4">
            <AlertTriangle className="w-12 h-12 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Content</h2>
          <p className="text-rose-400 font-medium">{error}</p>
          <button 
            onClick={() => handleTopicSelect(TOPICS.find(t => t.name.toLowerCase() === activeTopic.toLowerCase()) || TOPICS[0])}
            className="mt-6 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
          >
            Try Again
          </button>
        </div>
      )}

      {data && !loading && !error && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 relative p-8 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-black border border-gray-800 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent z-0" />
              <div className="relative z-20">
                <span className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-md mb-4 inline-block border border-indigo-500/30">Article</span>
                <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
                  {data.article ? (
                    Array.isArray(data.article) ? data.article.map((p, i) => <p key={i} className="leading-relaxed">{p}</p>) : <div dangerouslySetInnerHTML={{ __html: data.article }} />
                  ) : (
                    <p>No article content available.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-white">Key Takeaways</h2>
              <div className="flex flex-col gap-3">
                {data.keyTakeaways && data.keyTakeaways.length > 0 ? (
                  data.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-800 bg-emerald-900/10 hover:bg-emerald-900/20 hover:border-emerald-700/50 transition-all">
                      <div className="p-1 rounded-full bg-emerald-500/20 mt-1 shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-200 leading-relaxed">{takeaway}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No key takeaways found.</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 mt-16">
            <PlayCircle className="w-6 h-6 text-rose-500" />
            <h2 className="text-2xl font-bold text-white">Recommended Videos</h2>
          </div>
          
          <div className="mb-12">
            {videosLoading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            )}
            {videosError && !videosLoading && (
              <p className="text-rose-400 text-sm">{videosError}</p>
            )}
            {!videosLoading && !videosError && videos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid, idx) => (
                  <VideoCard 
                    key={idx}
                    title={vid.title}
                    videoId={vid.videoId}
                    thumbnail={vid.thumbnail}
                    channelTitle={vid.channelTitle}
                  />
                ))}
              </div>
            )}
            {!videosLoading && !videosError && videos.length === 0 && (
              <p className="text-gray-500">No videos found for this topic.</p>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6 mt-16">
            <Shield className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Knowledge Check</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {data.quiz && data.quiz.length > 0 ? (
              data.quiz.map((qItem, idx) => (
                <div key={idx} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg shadow-black/20">
                  <h3 className="text-lg font-bold text-white mb-4"><span className="text-indigo-400 mr-2">Q{idx + 1}.</span>{qItem.question}</h3>
                  <div className="space-y-3">
                    {qItem.options && qItem.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[idx] === option;
                      const isAnswered = selectedAnswers[idx] !== undefined;
                      const isCorrect = qItem.answer && option === qItem.answer;
                      let optionClass = "border-gray-700 hover:border-indigo-500 hover:bg-indigo-900/20 text-gray-400 font-normal";
                      
                      if (isSelected) {
                        if (qItem.answer) {
                          optionClass = isCorrect 
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-medium"
                            : "border-rose-500 bg-rose-500/20 text-rose-300 font-medium";
                        } else {
                          optionClass = "border-indigo-500 bg-indigo-500/20 text-indigo-300 font-medium";
                        }
                      } else if (isAnswered && isCorrect) {
                         optionClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300 border-dashed delay-100 font-medium";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => !isAnswered && handleQuizSelect(idx, option)}
                          disabled={isAnswered}
                          className={"w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 " + optionClass}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No quiz available for this category.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
