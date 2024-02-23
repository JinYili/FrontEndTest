export type People = {
  id: number;
    name: string;
    height: number;
    mass:number;
    gender: string;
    homeworld: string;
    wiki: string;
    image: string;
    born: number;
    died:number;
    diedLocation: string;
    cybernetics:string;
    species:string;
    eyeColor:string;
    skinColor:string;
    hairColor:string;
    affiliations:string[];
    formerAffiliations:string[]
    distance:number
    position?:{
      lat:number;
      lng:number;
    }
  }; 

export type Point ={
  id:number;
  lat:number;
  long:number; 
}
 
