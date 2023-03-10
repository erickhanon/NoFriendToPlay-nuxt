export type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: number };
}

export type Ad = {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  discord: string;
}

export type NewAd = {
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

