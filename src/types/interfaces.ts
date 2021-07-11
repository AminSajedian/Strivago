

export interface Property {
    _id:         string;
    name:        string;
    description: string;
    maxGuests:   number;
    city:        string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface InputProperty {
  name:        string;
  description: string;
  maxGuests:   number;
  city:        string;
}

// export interface Accommodation {
//     data: Datum[];
// }

// *************************

export interface Test {
  message: string;
}

export interface Accommodation {
  accommodation: AccommodationElement[];
}

export interface AccommodationElement {
  _id:         string;
  name:        string;
  description: string;
  maxGuests:   number;
  city:        string;
  createdAt:   Date;
  updatedAt:   Date;
  __v:         number;
}

export interface Accommodation {
  cities: string[];
}