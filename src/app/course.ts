export class Price {
  prix: Number;
  date: Date;
  type: String;
}


export class Epreuve {
  name: String;
  type: String;
  description: String;
  distance: Number;
  maxinscription: Number;
  prices: Price[];
}

export class Course {
  
  title: String;
  date: String;
  contact: String;
  commune: String;
  urlid: String;
  url_club: String;
  start_date: Date;
  phone: String;
  region: String;
  lat: Number;
  long: Number;
  epreuves: Epreuve[];
}