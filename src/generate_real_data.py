import json

groups = {
    "Group A": ["Mexico", "South Africa", "South Korea", "Czechia"],
    "Group B": ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
    "Group C": ["Brazil", "Morocco", "Haiti", "Scotland"],
    "Group D": ["United States", "Paraguay", "Australia", "Turkey"],
    "Group E": ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
    "Group F": ["Netherlands", "Japan", "Sweden", "Tunisia"],
    "Group G": ["Belgium", "Egypt", "Iran", "New Zealand"],
    "Group H": ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
    "Group I": ["France", "Senegal", "Iraq", "Norway"],
    "Group J": ["Argentina", "Algeria", "Austria", "Jordan"],
    "Group K": ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
    "Group L": ["England", "Croatia", "Ghana", "Panama"]
}

# The actual dates for the 2026 World Cup Group stage are roughly June 11 to June 27.
# We will generate placeholder dates for the 3 matches each team plays in the group stage.
app_data = {
    "groups": {},
    "knockout": {},
    "tournament_picks": {}
}

import datetime
from datetime import timedelta

start_date = datetime.date(2026, 6, 11)

for i, (group_name, team_list) in enumerate(groups.items()):
    group_letter = group_name[-1]
    
    # Each group has 6 matches. 
    # Matchday 1
    m1_date = start_date + timedelta(days=i//2)
    # Matchday 2
    m2_date = m1_date + timedelta(days=6)
    # Matchday 3
    m3_date = m2_date + timedelta(days=6)

    matches = [
        {"date": m1_date.strftime("%b %d").upper(), "matchup": f"{team_list[0][:3].upper()} - {team_list[1][:3].upper()}", "team1": team_list[0], "team2": team_list[1]},
        {"date": m1_date.strftime("%b %d").upper(), "matchup": f"{team_list[2][:3].upper()} - {team_list[3][:3].upper()}", "team1": team_list[2], "team2": team_list[3]},
        {"date": m2_date.strftime("%b %d").upper(), "matchup": f"{team_list[0][:3].upper()} - {team_list[2][:3].upper()}", "team1": team_list[0], "team2": team_list[2]},
        {"date": m2_date.strftime("%b %d").upper(), "matchup": f"{team_list[1][:3].upper()} - {team_list[3][:3].upper()}", "team1": team_list[1], "team2": team_list[3]},
        {"date": m3_date.strftime("%b %d").upper(), "matchup": f"{team_list[0][:3].upper()} - {team_list[3][:3].upper()}", "team1": team_list[0], "team2": team_list[3]},
        {"date": m3_date.strftime("%b %d").upper(), "matchup": f"{team_list[1][:3].upper()} - {team_list[2][:3].upper()}", "team1": team_list[1], "team2": team_list[2]}
    ]

    app_data["groups"][f"GROUP {group_letter}"] = {
        "teams": team_list,
        "matches": matches
    }

with open("src/real_app_data.json", "w") as f:
    json.dump(app_data, f, indent=2)

print("Created real_app_data.json")
