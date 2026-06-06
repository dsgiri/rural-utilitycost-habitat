export type Category = 'animal' | 'bird' | 'flower' | 'tree' | 'shrub' | 'grass' | 'other';
export type Status = 'pending' | 'approved' | 'rejected';
export type NativeStatus = 'native' | 'likely-native' | 'unsure';
export type LocationPrecision = 'exact' | 'city' | 'county' | 'region' | 'state' | 'country' | 'approximate';

export interface Species {
  id: string;
  commonName: string;
  scientificName?: string;
  category: Category;
  location: string;
  nativeRangeLevel?: string;
  latitude?: number;
  longitude?: number;
  locationPrecision?: LocationPrecision;
  nativeStatus: NativeStatus;
  note: string;
  submitterName?: string;
  status: Status;
  createdAt: string;
  source?: string;
}
