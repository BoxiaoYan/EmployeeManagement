import { useEffect } from "react";
import { Input } from "antd";
import styles from "./style.module.css";

export default function SearchBar({ storageId, search, setSearch }) {
  useEffect(() => {
    // Load the search result from localStorage
    const storedSearch = localStorage.getItem(storageId);
    if (storedSearch) {
      setSearch(storedSearch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageId]);

  // Handle search bar change
  const handleSearchBarChange = (e) => {
    setSearch(e.target.value);
    localStorage.setItem(storageId, e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <Input
        value={search}
        placeholder="Search employee by name"
        allowClear
        size="large"
        onChange={handleSearchBarChange}
      />
    </div>
  );
}
