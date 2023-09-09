import React, { useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";

export default function SearchBox({ searchArray, query, setQuery, onSearch }) {
  const [suggestions, setSuggestions] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const inputRef = useRef(null);

  const refineQuery = query.trim();

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setQuery(inputText);
    setSelectedSuggestion(null);

    const filteredSuggestions = searchArray.filter((skill) =>
      skill.toLowerCase().includes(inputText.trim().toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setSelectedItemIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyPress = (e) => {
    if (!isFocused) {
      handleFocus();
    }
    if (e.key === "Escape") {
      inputRef.current.blur();
      handleBlur();
    } else if (e.key === "Enter") {
      if (!query) {
        return;
      }
      selectedSuggestion
        ? handleSearchUsingSuggestion(selectedSuggestion)
        : onSearch();
      handleBlur();
    } else if (e.key === "ArrowUp" && query) {
      e.preventDefault();
      if (selectedItemIndex > 0) {
        setSelectedItemIndex(selectedItemIndex - 1);
        setSelectedSuggestion(suggestions[selectedItemIndex - 1]);
      }
    } else if (e.key === "ArrowDown" && query) {
      e.preventDefault();
      if (selectedItemIndex < suggestions.length - 1) {
        setSelectedItemIndex(selectedItemIndex + 1);
        setSelectedSuggestion(suggestions[selectedItemIndex + 1]);
      }
    }
  };

  const handleSearchUsingSuggestion = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const highlightMatchedCharacters = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<span class="font-semibold">$1</span>');
  };

  return (
    <div
      className={`mx-48 relative flex items-center border rounded-lg bg-white`}
      onBlur={() => handleBlur()}
    >
      <input
        type="text"
        placeholder="Search for skills..."
        value={selectedSuggestion || query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onFocus={() => handleFocus()}
        ref={inputRef}
        className="w-full rounded-lg focus:outline-none p-4"
      />
      {isFocused && refineQuery && suggestions.length > 0 && (
        <div className="absolute w-full top-16 shadow rounded-lg h-search-box p-4 overflow-auto bg-white">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSearchUsingSuggestion(suggestion), handleBlur();
                }}
                className={`p-2 rounded-md cursor-pointer hover:bg-indigo-50 ${
                  selectedItemIndex === index ? "bg-indigo-50" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: highlightMatchedCharacters(suggestion, refineQuery),
                }}
              ></li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="bg-indigo-700 p-4 rounded-r-lg"
        onClick={() =>
          selectedSuggestion
            ? handleSearchUsingSuggestion(selectedSuggestion)
            : query && onSearch()
        }
      >
        <HiSearch className="w-6 h-6 fill-zinc-50" />
      </button>
    </div>
  );
}
