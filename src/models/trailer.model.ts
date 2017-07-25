interface Quality {
  quality: string;
  videoURL: string //imdb/single?format=${quality}
}

export class Trailer {
  description: string;
  duration: string;
  qualities: Quality[];
  title: string;
  type: string;
  videoURL: string;
}
