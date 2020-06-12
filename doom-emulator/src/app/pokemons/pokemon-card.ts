export interface PokemonCard {
  trainerName: string;
  name: string;
  type1: string;
  type2: string;
  type3: string;
  description: string;
  encodedGeneratorValue: string;
  image: any;
  imageData: any;
  src: string;
  redesignImage: any;
  redesignSrc: string;
  generatorValues?: any;
  isReported?: any;
  isLiked?: any;
  _id?: string;
  likes?: number;
  reports?: number;
}
