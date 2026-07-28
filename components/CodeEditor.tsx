import React from 'react';

const CodeEditor: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl group" data-animate="fade-right">
      <div className="absolute -inset-1 bg-gradient-to-br from-indigo to-cyan-signal rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative bg-[#1e1e2e] border border-[#313244] rounded-2xl overflow-hidden shadow-2xl font-mono transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-glow">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#181825] border-b border-[#313244]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fab387]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
          <span className="ml-3 text-[10px] text-[#6c7086] tracking-wide">about.tsx</span>
        </div>
        <div className="overflow-hidden">
          <pre className="p-5 text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-all select-none">
            <span className="text-[#6c7086]">  // dev by night, deploy by day</span>
            {'\n'}
            <span className="text-[#cba6f7]">  import</span>
            {' '}
            <span className="text-[#fab387]">{'{ '}</span>
            <span className="text-[#a6e3a1]">dev</span>
            <span className="text-[#fab387]">{' }'}</span>
            {' '}
            <span className="text-[#cba6f7]">from</span>
            {' '}
            <span className="text-[#a6e3a1]">'./eric'</span>
            {'\n\n'}
            <span className="text-[#cba6f7]">  const</span>
            {' '}
            <span className="text-[#fab387]">about</span>
            {' = {'}
            {'\n'}
            <span className="text-[#89b4fa]">    name</span>
            {": "}
            <span className="text-[#a6e3a1]">'Eric Batista'</span>
            {','}
            {'\n'}
            <span className="text-[#89b4fa]">    role</span>
            {": "}
            <span className="text-[#a6e3a1]">'Full Stack Developer'</span>
            {','}
            {'\n'}
            <span className="text-[#89b4fa]">    stack</span>
            {": ["}
            <span className="text-[#a6e3a1]">'React'</span>
            {', '}
            <span className="text-[#a6e3a1]">'TypeScript'</span>
            {', '}
            <span className="text-[#a6e3a1]">'Tailwind'</span>
            {', '}
            <span className="text-[#a6e3a1]">'Node'</span>
            {'],'}
            {'\n'}
            <span className="text-[#89b4fa]">    passion</span>
            {": "}
            <span className="text-[#a6e3a1]">'building great UX'</span>
            {'\n'}
            {'  };'}
          </pre>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-indigo via-cyan-signal to-transparent" />
      </div>
    </div>
  );
};

export default CodeEditor;
