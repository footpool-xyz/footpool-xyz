const round = args[0];
const league = args[1]; // 140
const season = args[2]; // 2023

if (!secrets.apiKey) {
    throw Error(
        "FOOTBALL_API_KEY environment variable not set for CoinMarketCap API.  Get a free key from https://coinmarketcap.com/api/"
    );
}

const roundString = 'Regular Season - ' + round;
const footballApiRequest = Functions.makeHttpRequest({
    url: `https://v3.football.api-sports.io/fixtures`,
    headers: {
        "Content-Type": "application/json",
        "X-APISPORTS-KEY": secrets.apiKey,
    },
    params: {
        round: roundString,
        league: league,
        season: season
    },
});

const footballApiResponse = await footballApiRequest;

if (footballApiResponse.error) {
    throw new Error("CoinMarketCap Error");
}

const allMatches = footballApiResponse.data.response;
const result = allMatches.map(match => {

    return {
        'm': match.fixture.id
    }
});

return Functions.encodeString(JSON.stringify(result));
