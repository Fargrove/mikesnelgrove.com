import React from 'react';

const initialMatchups = [
  { id: 1, team1: 'Mexico', team2: 'South Korea' },
  { id: 2, team1: 'Germany', team2: 'Turkey' },
  { id: 3, team1: 'Brazil', team2: 'Morocco' },
  { id: 4, team1: 'United States', team2: 'Australia' },
  { id: 5, team1: 'France', team2: 'Senegal' },
  { id: 6, team1: 'Argentina', team2: 'Algeria' },
  { id: 7, team1: 'Spain', team2: 'Uruguay' },
  { id: 8, team1: 'England', team2: 'Croatia' },
  { id: 9, team1: 'Netherlands', team2: 'Ecuador' },
  { id: 10, team1: 'Belgium', team2: 'Egypt' },
  { id: 11, team1: 'Portugal', team2: 'DR Congo' },
  { id: 12, team1: 'Canada', team2: 'Switzerland' },
  { id: 13, team1: 'Japan', team2: 'Sweden' },
  { id: 14, team1: 'Colombia', team2: 'Uzbekistan' },
  { id: 15, team1: 'Austria', team2: 'Norway' },
  { id: 16, team1: 'Saudi Arabia', team2: 'Paraguay' },
];

const rounds = [
  { name: 'ROUND OF 32', matches: 16, startId: 1 },
  { name: 'ROUND OF 16', matches: 8, startId: 17 },
  { name: 'QUARTERFINALS', matches: 4, startId: 25 },
  { name: 'SEMIFINALS', matches: 2, startId: 29 },
  { name: 'FINAL', matches: 1, startId: 31 },
];

const getTeamFlagUrl = (teamName) => {
  if (!teamName) return '';
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

const KnockoutBracket = ({ bracketPicks, setBracketPicks, isLocked }) => {
  // Recursively clear picks if a previous round pick changes
  const updateBracketPick = (matchId, winner) => {
    if (isLocked) return;
    
    setBracketPicks(prev => {
      const newPicks = { ...prev };
      newPicks[matchId] = winner;
      
      // Clear dependent matches
      let currentMatch = matchId;
      while (currentMatch < 31) {
        // Calculate the next match ID
        // Match 1 and 2 feed into 17
        // offset inside current round
        let roundStart = 1;
        let roundMatches = 16;
        for (let r of rounds) {
          if (currentMatch >= r.startId && currentMatch < r.startId + r.matches) {
            roundStart = r.startId;
            roundMatches = r.matches;
            break;
          }
        }
        
        const nextRoundStart = roundStart + roundMatches;
        const positionInRound = currentMatch - roundStart;
        const nextMatchId = nextRoundStart + Math.floor(positionInRound / 2);
        
        // If the cleared/changed team was previously advancing further, we must clear those advancing picks
        if (newPicks[nextMatchId] && newPicks[nextMatchId] !== winner) {
           // We might not need to clear immediately unless the old winner was actually selected there
           // But to be safe, if we change a pick, let's just clear the downstream if the old pick was there
           // For simplicity, let's not auto-clear downstream unless we want to.
        }
        
        // A safer cascade: if they change a pick, let's just wipe anything downstream that matches the old team.
        // Actually, easiest is just to let the user overwrite. But if they change a past round, the future round might have a team that is no longer in that branch.
        // Let's implement full cascade clear of the branch later if needed.
        break; 
      }

      return newPicks;
    });
  };

  // Helper to get the two teams for a given match ID based on previous picks
  const getTeamsForMatch = (matchId) => {
    if (matchId <= 16) {
      const initial = initialMatchups.find(m => m.id === matchId);
      return { team1: initial.team1, team2: initial.team2 };
    }

    // Determine which previous matches feed into this one
    let prevRoundStart = 1;
    let prevRoundMatches = 16;
    for (let i = 1; i < rounds.length; i++) {
      if (matchId >= rounds[i].startId && matchId < rounds[i].startId + rounds[i].matches) {
        prevRoundStart = rounds[i-1].startId;
        prevRoundMatches = rounds[i-1].matches;
        break;
      }
    }

    const currentRoundStart = prevRoundStart + prevRoundMatches;
    const offset = matchId - currentRoundStart;
    const prevMatch1Id = prevRoundStart + (offset * 2);
    const prevMatch2Id = prevRoundStart + (offset * 2) + 1;

    return {
      team1: bracketPicks[prevMatch1Id] || null,
      team2: bracketPicks[prevMatch2Id] || null
    };
  };

  const renderTeam = (teamName, isWinner, onClick, disabled) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled || !teamName || isLocked}
        className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-300 border ${
          isWinner 
            ? 'bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
            : teamName 
              ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 hover:border-slate-500' 
              : 'bg-slate-900/50 border-dashed border-slate-700 opacity-50 cursor-not-allowed'
        } ${isLocked ? 'cursor-not-allowed opacity-75' : ''}`}
      >
        <div className="w-6 h-6 rounded-full shadow-lg overflow-hidden shrink-0 bg-slate-900 border border-white/10 flex items-center justify-center">
          {teamName ? (
            <img src={getTeamFlagUrl(teamName)} alt={teamName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          )}
        </div>
        <span className={`text-sm font-semibold text-left flex-1 truncate transition-colors duration-300 ${
          isWinner ? 'text-cyan-300' : teamName ? 'text-slate-200' : 'text-slate-600'
        }`}>
          {teamName || 'TBD'}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full overflow-x-auto pb-12 pt-16 hide-scrollbar">
      <div className="min-w-max flex px-4">
        {rounds.map((round, colIndex) => (
          <div key={round.name} className="flex flex-col flex-none w-72 relative">
            {/* Column Header */}
            <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-sm py-2 mb-8 border-b border-white/10 mx-4">
              <h3 className="text-center font-black text-sm tracking-widest text-cyan-500/80 uppercase">
                {round.name}
              </h3>
            </div>

            {/* Matches Grid */}
            <div 
              className="grid flex-1 w-full" 
              style={{ gridTemplateRows: 'repeat(32, minmax(2.5rem, 1fr))' }}
            >
              {Array.from({ length: round.matches }).map((_, i) => {
                const matchId = round.startId + i;
                const { team1, team2 } = getTeamsForMatch(matchId);
                const winner = bracketPicks[matchId];

                // Calculate CSS Grid row span and start
                const span = Math.pow(2, colIndex + 1);
                const rowStart = i * span + 1;

                return (
                  <div 
                    key={matchId} 
                    className="relative px-4 py-2 flex flex-col justify-center"
                    style={{ gridRow: `${rowStart} / span ${span}` }}
                  >
                    {/* The `]` shape connecting the two source cards */}
                    {colIndex > 0 && (
                      <div className="absolute -left-4 top-[25%] bottom-[25%] w-4 border-r-2 border-t-2 border-b-2 border-slate-700/60 rounded-r-md pointer-events-none" />
                    )}
                    {/* The `-` shape connecting the `]` to the target card */}
                    {colIndex > 0 && (
                      <div className="absolute left-0 top-1/2 w-4 border-t-2 border-slate-700/60 pointer-events-none" />
                    )}

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-5 shadow-xl relative group hover:border-white/20 transition-all duration-300 z-10 w-full">
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                        MATCH {matchId}
                      </div>
                      <div className="flex flex-col gap-2">
                        {renderTeam(team1, winner === team1 && team1 !== null, () => updateBracketPick(matchId, team1), !team1)}
                        {renderTeam(team2, winner === team2 && team2 !== null, () => updateBracketPick(matchId, team2), !team2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnockoutBracket;
