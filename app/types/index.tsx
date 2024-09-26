export type People = {
    id: number;
    name: string;
    username: string;
    email:string;
    phone: string;
    website: string;
    company:Company;
    address: Address
  }; 

export type Company ={
  name:string;
  catchPhrase:string;
  bs:string; 
}
 

export type Address ={
  street:string;
  suite:string;
  city:string; 
  zipcode:string; 
  geo:Geo
}
export type Geo ={
  lat:string; 
  lng:string; 
}