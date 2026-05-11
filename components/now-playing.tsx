"use client";

import Link from "next/link";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type NowPlayingData = {
  isPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  trackUrl: string;
  lastfmUrl: string;
  error?: string;
};

export type Genre =
  | "rock"
  | "pop"
  | "ballad"
  | "classic"
  | "instrumental"
  | "orchestra"
  | "bolero"
  | "jazz"
  | "blues"
  | "bossa"
  | "lofi"
  | "default";

const guessGenre = (name: string, artist: string): Genre => {
  const text = `${name} ${artist}`.toLowerCase();

  if (["rock", "metal", "punk", "grunge"].some((k) => text.includes(k)))
    return "rock";
  if (["jazz", "swing", "bebop", "soul"].some((k) => text.includes(k)))
    return "jazz";
  if (["blues", "r&b", "rhythm"].some((k) => text.includes(k))) return "blues";
  if ([" bossa ", "nova", "samba", "brazil"].some((k) => text.includes(k)))
    return "bossa";
  if (["lofi", "chill", "study", "relax"].some((k) => text.includes(k)))
    return "lofi";
  if (["pop", "dance", "disco", "k-pop", "v-pop"].some((k) => text.includes(k)))
    return "pop";
  if (
    ["ballad", "slow", "acoustic", "unplugged", "sad", "lo-fi"].some((k) =>
      text.includes(k),
    )
  )
    return "ballad";
  if (
    ["classic", "symphony", "mozart", "piano solo"].some((k) =>
      text.includes(k),
    )
  )
    return "classic";
  if (
    [
      "instrumental",
      "violin",
      "guitar",
      "saxophone",
      "richard clayderman",
    ].some((k) => text.includes(k))
  )
    return "instrumental";
  if (["orchestra", "philharmonic", "cinematic"].some((k) => text.includes(k)))
    return "orchestra";
  if (
    ["bolero", "thuy nga", "tru tinh", "que huong"].some((k) =>
      text.includes(k),
    )
  )
    return "bolero";

  return "default";
};

interface NowPlayingContextType {
  data: NowPlayingData | null;
  genre: Genre;
}

const NowPlayingContext = createContext<NowPlayingContextType | undefined>(
  undefined,
);

export function NowPlayingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [genre, setGenre] = useState<Genre>("default");

  useEffect(() => {
    let active = true;

    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(`/api/now-playing?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });
        if (!response.ok) return;

        const json = (await response.json()) as NowPlayingData;
        if (!active) return;

        setData(json);
        if (json.name && json.artist) {
          setGenre(guessGenre(json.name, json.artist));
        }
      } catch {
        // Silently fail
      }
    };

    fetchNowPlaying();

    const interval = window.setInterval(fetchNowPlaying, 30000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <NowPlayingContext.Provider value={{ data, genre }}>
      {children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext);
  if (context === undefined) {
    throw new Error("useNowPlaying must be used within a NowPlayingProvider");
  }
  return context;
}

export function NowPlaying() {
  const { data } = useNowPlaying();

  const nowPlayingText = `${data?.name ?? ""} — ${data?.artist ?? ""}`;

  const youtubeMusicUrl = useMemo(() => {
    if (!data || !data.artist || !data.name) return "/";
    return `https://music.youtube.com/search?q=${encodeURIComponent(
      `${data.artist} ${data.name}`,
    )}`;
  }, [data]);

  const shouldMarquee = useMemo(
    () => data?.isPlaying && nowPlayingText.length > 30,
    [data?.isPlaying, nowPlayingText],
  );

  const content = () => {
    if (!data) {
      return (
        <span className="text-white/50">Not Listening - Youtube Music</span>
      );
    }

    if (data.isPlaying) {
      return (
        <Link
          href={youtubeMusicUrl}
          target="_blank"
          rel="noreferrer"
          className="group block min-w-full overflow-hidden"
        >
          <div className="flex min-w-full items-center gap-2 whitespace-nowrap text-sm font-medium text-white">
            <span className="text-white/70">Now Playing :</span>
            <span
              className="min-w-0 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 16px, black calc(100% - 24px), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 16px, black calc(100% - 24px), transparent 100%)",
              }}
            >
              <span
                className={`inline-flex min-w-full items-center gap-4 ${
                  shouldMarquee ? "animate-now-playing-marquee" : "truncate"
                }`}
              >
                <span>{nowPlayingText}</span>
                {shouldMarquee && <span>{nowPlayingText}</span>}
              </span>
            </span>
          </div>
        </Link>
      );
    }

    return <span className="text-white/50">Not Listening - Youtube Music</span>;
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-96 items-center gap-3 overflow-hidden rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white shadow-sm shadow-black/20">
        <div
          className={`flex shrink-0 items-center justify-center ${data?.isPlaying ? "animate-pulse" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 6.81c-2.86 0-5.19 2.33-5.19 5.19s2.33 5.19 5.19 5.19 5.19-2.33 5.19-5.19S14.86 6.81 12 6.81m-1.93 8.15V9.05L15.18 12l-5.11 2.95Z" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 15.92c-3.27 0-5.92-2.65-5.92-5.92S8.73 6.08 12 6.08s5.92 2.65 5.92 5.92-2.65 5.92-5.92 5.92" />
          </svg>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">{content()}</div>
      </div>
    </div>
  );
}
