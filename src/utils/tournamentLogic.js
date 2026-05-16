export const generateTeams = (players) => {
  // Shuffle players
  const shuffled = [...players].sort(() => 0.5 - Math.random());
  
  const teamNames = [
    'Dink Dynamos', 'Kitchen Krew', 'Paddle Smashers', 'Volley Vipers', 
    'Net Ninjas', 'Court Crushers', 'Baseline Bosses', 'Rally Royals'
  ];

  const teams = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    const teamIndex = i / 2;
    teams.push({
      id: `team-${teamIndex + 1}`,
      name: teamNames[teamIndex] || `Team ${teamIndex + 1}`,
      players: [shuffled[i], shuffled[i + 1]]
    });
  }
  return teams;
};

export const generateRoundRobinSchedule = (teams) => {
  const schedule = [];
  let tIds = teams.map(t => t.id);
  
  // Add a BYE team if odd number of teams
  if (tIds.length % 2 !== 0) {
    tIds.push('BYE');
  }
  
  const numRounds = tIds.length - 1;
  const half = tIds.length / 2;
  
  let matchIdCounter = 1;

  for (let round = 0; round < numRounds; round++) {
    let courtCounter = 1;
    for (let i = 0; i < half; i++) {
      const t1Id = tIds[i];
      const t2Id = tIds[tIds.length - 1 - i];
      
      if (t1Id !== 'BYE' && t2Id !== 'BYE') {
        const team1 = teams.find(t => t.id === t1Id);
        const team2 = teams.find(t => t.id === t2Id);
        
        schedule.push({
          id: `m${matchIdCounter++}`,
          round: round + 1,
          court: courtCounter++,
          team1,
          team2,
          winner: null
        });
      }
    }
    
    // Rotate: index 0 stays fixed, others rotate clockwise
    const last = tIds.pop();
    tIds.splice(1, 0, last);
  }
  
  return schedule;
};

export const calculateStandings = (teams, matches) => {
  const standingsMap = {};
  
  teams.forEach(team => {
    standingsMap[team.id] = { ...team, wins: 0, losses: 0, headToHead: {} };
  });

  matches.forEach(match => {
    if (match.winner) {
      const loserId = match.winner === match.team1.id ? match.team2.id : match.team1.id;
      standingsMap[match.winner].wins += 1;
      standingsMap[loserId].losses += 1;
      
      // Track head to head for tie breaking
      standingsMap[match.winner].headToHead[loserId] = 1; // 1 means won against
      standingsMap[loserId].headToHead[match.winner] = -1; // -1 means lost against
    }
  });

  const standings = Object.values(standingsMap);

  // Sort by wins, then head to head
  standings.sort((a, b) => {
    if (a.wins !== b.wins) {
      return b.wins - a.wins;
    }
    if (a.headToHead[b.id] === 1) return -1;
    if (a.headToHead[b.id] === -1) return 1;
    return 0; // if tied
  });

  // Assign rank
  standings.forEach((team, index) => {
    team.rank = index + 1;
  });

  return standings;
};

export const generateFinals = (standings) => {
  if (standings.length < 2) return [];
  
  if (standings.length === 2 || standings.length === 3) {
    return [
      {
        id: 'f_champ',
        title: 'Championship Match',
        team1: standings[0],
        team2: standings[1],
        winner: null
      }
    ];
  }
  
  return [
    {
      id: 'f_3rd',
      title: '3rd Place Match',
      team1: standings[2],
      team2: standings[3],
      winner: null
    },
    {
      id: 'f_champ',
      title: 'Championship Match',
      team1: standings[0],
      team2: standings[1],
      winner: null
    }
  ];
};
