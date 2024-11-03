// Base Interface for common fields across Province, District, and Ward
interface LocationBase {
  id: string;
  name: string;
  type: number;
  typeText: string;
}

// Province Data Structure
export interface ProvinceInterface {
  total: number;
  data: ProvinceData[];
}

export interface ProvinceData extends LocationBase {
  slug: string;
}

// District Data Structure
export interface DistrictInterface {
  total: number;
  data: DistrictData[];
}

export interface DistrictData extends LocationBase {
  provinceId: string;
}

// Ward Data Structure
export interface WardInterface {
  total: number;
  data: WardData[];
}

export interface WardData extends LocationBase {
  districtId: string;
}
