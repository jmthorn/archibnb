import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
    const [location, setLocation] = useState("")
    const [start_date, setStartDate] = useState(new Date())
    const [end_date, setEndDate] = useState(new Date())
    const [rounded_start_date, setRoundedStartDate] = useState((new Date()).toString().split(" ").slice(1,4).join(" "))
    const [rounded_end_date, setRoundedEndDate] = useState((new Date()).toString().split(" ").slice(1,4).join(" "))
    const [guests, setGuests] = useState("")

  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation,
        start_date,
        setStartDate,
        end_date,
        setEndDate,
        rounded_start_date,
        setRoundedStartDate,
        rounded_end_date,
        setRoundedEndDate,
        guests,
        setGuests
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}


    