import { useEffect } from "react";
import { Input } from "antd";
import styles from "./style.module.css";

export default function SearchBar({
  searchId,
  search,
  setSearch,
  pageId,
  setCurrentPage,
}) {
  useEffect(() => {
    // Load the search result from localStorage
    const storedSearch = localStorage.getItem(searchId);
    if (storedSearch) {
      setSearch(storedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchId]);

  // Handle search bar change
  const handleSearchBarChange = (e) => {
    setSearch(e.target.value);
    localStorage.setItem(searchId, e.target.value);
    if (pageId) {
      setCurrentPage(1);
      localStorage.setItem("profileSummaryPage", 1);
    }
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