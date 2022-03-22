import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySearch from '@layouts/companySearch/CompanySearch';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSelect = useCallback(
    ({ value }) => {
      navigate(`/company/${value}`);
    },
    [navigate],
  );

  return (
    <div className="navbar flex flex-row justify-between p-10 items-center">
      <CompanySearch
        style={{ width: 500 }}
        placeholder="Search by Company Name or CIK number"
        value={[]}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Navbar;
