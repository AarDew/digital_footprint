import { BookOpen, Shield, Lock, AlertTriangle, Eye, Server } from "lucide-react";

export default function LearnPage() {
  const topics = [
    { title: "Understanding Phishing", category: "Social Engineering", icon: AlertTriangle, color: "text-rose-400", time: "5 min read" },
    { title: "Securing Digital Identity", category: "Privacy", icon: Eye, color: "text-blue-400", time: "8 min read" },
    { title: "Malware Analysis Basics", category: "Threat Detection", icon: Server, color: "text-indigo-400", time: "12 min read" },
    { title: "Password Best Practices", category: "Access Control", icon: Lock, color: "text-emerald-400", time: "4 min read" },
    { title: "Zero Trust Architecture", category: "Advanced Systems", icon: Shield, color: "text-purple-400", time: "15 min read" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-gray-800 rounded-xl">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Learning Center</h1>
          <p className="text-gray-400">Master cybersecurity concepts and protect your digital footprint.</p>
        </div>
      </div>

      <div className="mb-12">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 group cursor-pointer flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <p className="text-gray-500 absolute z-0">[Placeholder Video]</p>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 z-20">
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded mb-2 inline-block">Featured Tutorial</span>
            <h2 className="text-2xl font-bold text-white mb-2">Introduction to Threat Intelligence</h2>
            <p className="text-gray-300 max-w-xl">Learn how the professionals track, analyze, and neutralize potential cyber threats before they impact systems.</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <topic.icon className={`w-5 h-5 ${topic.color}`} />
              </div>
              <span className="text-xs font-medium text-gray-500">{topic.time}</span>
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{topic.category}</span>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-indigo-400 transition-colors">{topic.title}</h3>
            <p className="text-sm text-gray-400 mt-3 line-clamp-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
