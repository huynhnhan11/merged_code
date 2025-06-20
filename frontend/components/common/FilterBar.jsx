import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from "react-icons/fi";
import "./filterBar.css";

export default function FilterBar({
  showKeyword = true,
  showFromDate = true,
  showToDate = true,
  onSearch,
  extraButtons = null
}) {
  const [keyword, setKeyword] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    onSearch?.({ keyword, fromDate, toDate });
  };

  return (
    <form className="filterbar-root" onSubmit={handleSearch}>
      <div className="filterbar-group">
        {showKeyword && (
          <input
            type="text"
            placeholder="Nhập từ khóa"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="filterbar-input"
          />
        )}
        {showFromDate && (
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            placeholderText="Từ ngày (dd/mm/yyyy)"
            dateFormat="dd/MM/yyyy"
            className="filterbar-input"
            calendarClassName="filterbar-calendar"
            popperPlacement="bottom-start"
            isClearable
          />
        )}
        {showToDate && (
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            placeholderText="Đến ngày (dd/mm/yyyy)"
            dateFormat="dd/MM/yyyy"
            className="filterbar-input"
            calendarClassName="filterbar-calendar"
            popperPlacement="bottom-start"
            isClearable
          />
        )}
        <button type="submit" className="filterbar-btn" title="Tìm kiếm">
          <FiSearch />
        </button>
      </div>
      {extraButtons && <div className="filterbar-extra">{extraButtons}</div>}
    </form>
  );
}
