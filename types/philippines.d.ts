declare module 'philippines' {
  interface City {
    name: string;
    province: string;
    city: string;
  }

  interface Philippines {
    cities: City[];
    provinces: Province[];
  }

  const philippines: Philippines;
  export default philippines;
}
