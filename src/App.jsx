import React, { useState, useEffect } from 'react';
import { Trophy, ChevronDown, CheckCircle2, Search, Filter } from 'lucide-react';
import realData from './real_app_data.json';
import KnockoutBracket from './components/KnockoutBracket';

const getTeamFlagUrl = (teamName) => {
  const codes = {
    'Mexico': 'mx', 'South Africa': 'za', 'South Korea': 'kr', 'Czechia': 'cz',
    'Canada': 'ca', 'Bosnia and Herzegovina': 'ba', 'Qatar': 'qa', 'Switzerland': 'ch',
    'Brazil': 'br', 'Morocco': 'ma', 'Haiti': 'ht', 'Scotland': 'gb-sct',
    'United States': 'us', 'Paraguay': 'py', 'Australia': 'au', 'Turkey': 'tr',
    'Germany': 'de', 'Curaçao': 'cw', 'Ivory Coast': 'ci', 'Ecuador': 'ec',
    'Netherlands': 'nl', 'Japan': 'jp', 'Sweden': 'se', 'Tunisia': 'tn',
    'Belgium': 'be', 'Egypt': 'eg', 'Iran': 'ir', 'New Zealand': 'nz',
    'Spain': 'es', 'Cape Verde': 'cv', 'Saudi Arabia': 'sa', 'Uruguay': 'uy',
    'France': 'fr', 'Senegal': 'sn', 'Iraq': 'iq', 'Norway': 'no',
    'Argentina': 'ar', 'Algeria': 'dz', 'Austria': 'at', 'Jordan': 'jo',
    'Portugal': 'pt', 'DR Congo': 'cd', 'Uzbekistan': 'uz', 'Colombia': 'co',
    'England': 'gb-eng', 'Croatia': 'hr', 'Ghana': 'gh', 'Panama': 'pa'
  };
  const code = codes[teamName];
  return code ? `https://flagcdn.com/w40/${code}.png` : '';
};

const GroupCard = ({ groupName, groupData, picks, updatePick, isLocked }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/20 hover:border-white/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {groupName}
        </h3>
        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-cyan-200">
          {groupData.teams.length} TEAMS
        </span>
      </div>

      <div className="space-y-4">
        {groupData.matches.map((match, idx) => {
          const matchId = `${groupName}-${idx}`;
          const currentPick = picks[matchId] || { outcome: null, score1: '', score2: '' };

          const handleScoreChange = (teamIndex, value) => {
            if (isLocked) return;
            // Only allow numbers
            if (value !== '' && !/^\d+$/.test(value)) return;
            
            const newPick = { ...currentPick };
            if (teamIndex === 1) newPick.score1 = value;
            else newPick.score2 = value;
            
            // Auto-determine outcome based on score
            if (newPick.score1 !== '' && newPick.score2 !== '') {
              const s1 = parseInt(newPick.score1);
              const s2 = parseInt(newPick.score2);
              if (s1 > s2) newPick.outcome = match.team1;
              else if (s2 > s1) newPick.outcome = match.team2;
              else newPick.outcome = 'DRAW';
            } else {
              newPick.outcome = null;
            }
            
            updatePick(matchId, newPick);
          };

          const handleOutcomeClick = (outcome) => {
            if (isLocked) return;
            // If the user manually clicks an outcome, clear any conflicting entered scores
            updatePick(matchId, { ...currentPick, outcome, score1: '', score2: '' });
          };

          return (
            <div key={idx} className="group relative bg-slate-800/50 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-700/50">
              <div className="text-xs font-bold text-cyan-500/80 mb-3 text-center uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="h-px bg-cyan-500/30 flex-1"></span>
                <span>{match.date}</span>
                <span className="h-px bg-cyan-500/30 flex-1"></span>
              </div>
              
              <div className="flex flex-col gap-3">
                {/* Team 1 Row */}
                <div className="flex items-center justify-between gap-3">
                  <button 
                    disabled={isLocked}
                    onClick={() => handleOutcomeClick(match.team1)}
                    className={`flex-1 min-w-0 flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${currentPick.outcome === match.team1 ? 'bg-cyan-500/20 border border-cyan-400/50' : 'hover:bg-white/5 border border-transparent'} ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  >
                    <div className="w-6 h-6 rounded-full shadow-lg overflow-hidden shrink-0 bg-slate-800 border border-white/10 flex items-center justify-center">
                      <img src={getTeamFlagUrl(match.team1)} alt={match.team1} className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-sm font-semibold text-left flex-1 truncate transition-colors duration-300 ${currentPick.outcome === match.team1 ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
                      {match.team1}
                    </span>
                  </button>
                  <input 
                    type="text" 
                    disabled={isLocked}
                    inputMode="numeric"
                    maxLength={2}
                    value={currentPick.score1}
                    onChange={(e) => handleScoreChange(1, e.target.value)}
                    placeholder="-"
                    className={`w-10 h-10 shrink-0 bg-slate-900 border border-slate-700 rounded-lg text-center font-black text-cyan-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-600 ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  />
                </div>

                {/* Draw Row */}
                <div className="flex justify-center -my-2 relative z-10">
                   <button 
                    disabled={isLocked}
                    onClick={() => handleOutcomeClick('DRAW')}
                    className={`px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-300 ${currentPick.outcome === 'DRAW' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] border-transparent' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'} ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  >
                    DRAW
                  </button>
                </div>

                {/* Team 2 Row */}
                <div className="flex items-center justify-between gap-3">
                  <button 
                    disabled={isLocked}
                    onClick={() => handleOutcomeClick(match.team2)}
                    className={`flex-1 min-w-0 flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${currentPick.outcome === match.team2 ? 'bg-cyan-500/20 border border-cyan-400/50' : 'hover:bg-white/5 border border-transparent'} ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  >
                    <div className="w-6 h-6 rounded-full shadow-lg overflow-hidden shrink-0 bg-slate-800 border border-white/10 flex items-center justify-center">
                      <img src={getTeamFlagUrl(match.team2)} alt={match.team2} className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-sm font-semibold text-left flex-1 truncate transition-colors duration-300 ${currentPick.outcome === match.team2 ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
                      {match.team2}
                    </span>
                  </button>
                  <input 
                    type="text" 
                    disabled={isLocked}
                    inputMode="numeric"
                    maxLength={2}
                    value={currentPick.score2}
                    onChange={(e) => handleScoreChange(2, e.target.value)}
                    placeholder="-"
                    className={`w-10 h-10 shrink-0 bg-slate-900 border border-slate-700 rounded-lg text-center font-black text-cyan-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-600 ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  const [picks, setPicks] = useState({});
  const [bracketPicks, setBracketPicks] = useState({});
  const [activeTab, setActiveTab] = useState('groups');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');

  const cutoffDate = new Date('2026-06-11T00:00:00-04:00'); // Midnight EDT (June 10th ending)
  const isLocked = new Date() >= cutoffDate;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [picksRes, meRes] = await Promise.all([
          fetch('/api/picks'),
          fetch('/api/me')
        ]);

        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.success) setUser(meData.user);
        }

        if (picksRes.ok) {
          const data = await picksRes.json();
          if (data.picks) {
            const loadedPicks = {};
            const loadedBracketPicks = {};
            data.picks.forEach(p => {
              if (p.match_id.startsWith('b')) {
                loadedBracketPicks[parseInt(p.match_id.substring(1))] = p.outcome;
              } else {
                loadedPicks[p.match_id] = {
                  outcome: p.outcome,
                  score1: p.score1 !== null ? String(p.score1) : '',
                  score2: p.score2 !== null ? String(p.score2) : ''
                };
              }
            });
            setPicks(loadedPicks);
            setBracketPicks(loadedBracketPicks);
          }
        }
      } catch (error) {
        console.error("Failed to load initial data", error);
      }
      setIsLoaded(true);
    };
    fetchInitialData();
  }, []);

  const updatePick = (matchId, selectionData) => {
    setPicks(prev => ({
      ...prev,
      [matchId]: selectionData
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const picksArray = Object.entries(picks).map(([matchId, data]) => ({
        matchId,
        ...data
      })).filter(p => p.outcome !== null);

      const bracketPicksArray = Object.entries(bracketPicks).map(([matchId, winner]) => ({
        matchId: `b${matchId}`,
        outcome: winner,
        score1: null,
        score2: null
      })).filter(p => p.outcome !== null);

      const response = await fetch('/api/picks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ picks: [...picksArray, ...bracketPicksArray] })
      });

      if (response.ok) {
        alert("Picks saved successfully!");
      } else {
        alert("Failed to save picks.");
      }
    } catch (error) {
      console.error("Error saving picks", error);
      alert("Error saving picks.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const response = await fetch('/api/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to save name", err);
    }
  };

  const totalMatches = Object.values(realData.groups).reduce((acc, group) => acc + group.matches.length, 0);
  const picksMade = Object.values(picks).filter(p => p.outcome !== null).length + Object.values(bracketPicks).length;
  const progress = Math.round((picksMade / totalMatches) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 supports-[backdrop-filter]:bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-white">WORLD CUP <span className="text-cyan-400">2026</span></h1>
                  {user && user.name ? (
                    <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">Logged in as: {user.name}</p>
                  ) : user ? (
                    <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase">{user.email}</p>
                  ) : (
                    <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase">Authenticating...</p>
                  )}
                </div>
              </div>

              {user && !user.name && (
                <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-2 w-full md:w-auto shadow-lg shadow-cyan-900/20">
                  <form onSubmit={handleNameSubmit} className="flex gap-2 items-center">
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter Display Name..."
                      className="w-full md:w-48 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                      Save
                    </button>
                  </form>
                </div>
              )}

              {/* Progress Bar */}
              <div className="hidden md:flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-2xl border border-white/5">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-300">YOUR PICKS</span>
                  <span className="text-sm font-black text-cyan-400">{picksMade} / {totalMatches}</span>
                </div>
                <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                  {progress > 0 && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
          {/* Navigation */}
          <nav className="flex items-center justify-center gap-2 mb-12">
            {['groups', 'knockouts', 'bonus'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white text-slate-950 shadow-xl shadow-white/10 scale-105' 
                    : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent hover:border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.entries(realData.groups).map(([groupName, groupData]) => (
                  <GroupCard 
                    key={groupName} 
                    groupName={groupName} 
                    groupData={groupData} 
                    picks={picks}
                    updatePick={updatePick}
                    isLocked={isLocked}
                  />
                ))}
              </div>
            )}

            {activeTab === 'knockouts' && (
              <KnockoutBracket 
                bracketPicks={bracketPicks}
                setBracketPicks={setBracketPicks}
                isLocked={isLocked}
              />
            )}

            {activeTab === 'bonus' && (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 mb-8 rounded-full bg-slate-900/50 border border-white/10 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-slate-600" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">COMING SOON</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                  Bonus questions and tournament predictions will appear here.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Floating Submit Action */}
      {!isLocked && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${picksMade > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-black tracking-widest text-sm shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.7)] hover:scale-105'}`}
          >
            <CheckCircle2 className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
            {isSubmitting ? 'SAVING...' : 'SUBMIT PICKS'}
          </button>
        </div>
      )}

      {isLocked && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-red-950/80 text-red-400 border border-red-500/50 px-8 py-3 rounded-full font-black tracking-widest text-sm backdrop-blur-md shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]">
          PICKS ARE LOCKED
        </div>
      )}
    </div>
  );
}

export default App;
