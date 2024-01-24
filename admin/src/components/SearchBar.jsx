import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <>
      <div className="input-group ">
        <input
          type="text"
          className="form-control"
          placeholder="Search Product Here..."
          aria-label="Search Product Here..."
          aria-describedby="basic-addon2"
        />
        <span className="input-group-text" id="basic-addon2">
          <BsSearch className="fs-5" />
        </span>
      </div>
    </>
  );
};

export default SearchBar;
