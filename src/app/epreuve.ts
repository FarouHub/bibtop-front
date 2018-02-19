export class Price {
    prix: Number;
    date: Date;
    type: String;
}

export class SubEpreuve {
  title: String;
  start_date: Date;
  name: String;
  type: String;
  description: String;
  distance: Number;
  maxinscription: Number;
}
  
export class Epreuve {
  title: String;
  contact: String;
  commune: String;
  urlid: String;
  url_club: String;
  start_date: Date;
  phone: String;
  region: String;
  lat: Number;
  long: Number;
  epreuves: SubEpreuve[];
  name: String;
  type: String;
  description: String;
  distance: Number;
  maxinscription: Number;
  prices: Price[];
}
  
