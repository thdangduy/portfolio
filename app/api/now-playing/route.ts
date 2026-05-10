import { NextResponse } from "next/server";

type LastfmTrack = {
  artist: { "#text": string };
  name: string;
  album?: { "#text": string };
  url?: string;
  "@attr"?: { nowplaying?: "true" };
};

type LastfmRecentTracksResponse = {
  recenttracks?: {
    track?: LastfmTrack | LastfmTrack[];
  };
};

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return NextResponse.json(
      { error: "Missing LASTFM_API_KEY or LASTFM_USERNAME environment variables." },
      { status: 500 },
    );
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
    username,
  )}&limit=1&api_key=${encodeURIComponent(apiKey)}&format=json`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    const body = await response.text();
    return NextResponse.json(
      { error: `Last.fm API returned ${response.status}: ${body}` },
      { status: 502 },
    );
  }

  const json = (await response.json()) as LastfmRecentTracksResponse;
  const trackData = json.recenttracks?.track;

  if (!trackData) {
    return NextResponse.json({ isPlaying: false, name: "", artist: "", album: "", trackUrl: "", lastfmUrl: "" });
  }

  const track = Array.isArray(trackData) ? trackData[0] : trackData;

  if (!track || !track.name || !track.artist?.["#text"]) {
    return NextResponse.json({ isPlaying: false, name: "", artist: "", album: "", trackUrl: "", lastfmUrl: "" });
  }

  const isPlaying = track["@attr"]?.nowplaying === "true";
  const name = track.name;
  const artist = track.artist["#text"];
  const album = track.album?.["#text"] ?? "";
  const lastfmUrl = track.url ?? "";
  const trackUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${artist} ${name}`)}`;

  return NextResponse.json(
    { isPlaying, name, artist, album, trackUrl, lastfmUrl },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
  );
}
