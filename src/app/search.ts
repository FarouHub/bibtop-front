export class Search {
  input: String;
  types: TypeFilter;
  start_date: Date;
  end_date: Date;
  distance: DistanceFilter;
  start_price: Number;
  end_price: Number;
  lat: Number;
  long: Number;
  zoom: Number;
}

export class DistanceFilter {
  min: Number;
  max: Number; 
  step: Number; 
  value: Number;
  start_distance: Number;
  end_distance: Number;
}

export class TypeFilter {
  trail: Boolean;
  cross: Boolean;
  route: Boolean;
  bikeandrun: Boolean;
}