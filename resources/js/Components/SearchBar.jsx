import { useEffect, useRef } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

function SearchBar({
  children,
  label = "Cari Item",
  onChange,
  placeholder = "",
  scanResult = "",
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    const searchItemInput = inputRef.current;
    searchItemInput.value = scanResult;
  }, [scanResult]);

  return (
    <div className="w-full">
      <form className="flex space-y-6 mb-4">
        <div className="w-auto max-w-sm">
          <InputLabel htmlFor="search-item" value={`Cari ${label}`} />
          <TextInput
            id="search-item"
            type="text"
            name="search-item"
            className="mt-1 h-10 w-full"
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            ref={inputRef}
          />
        </div>

        {children}
      </form>
    </div>
  );
}

export default SearchBar;
