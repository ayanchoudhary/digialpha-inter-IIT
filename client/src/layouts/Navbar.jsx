import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySearch from '@layouts/companySearch/CompanySearch';
import { Modal, Button } from 'antd';
import { Close } from './../assets/icons';
import useStore from '../store';

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const company = useStore((state) => state.company);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const navigate = useNavigate();

  const handleSelect = useCallback(
    ({ value }) => {
      navigate(`/company/${value}`);
    },
    [navigate],
  );

  const [company1, setCompany1] = useState({});
  const [company2, setCompany2] = useState({});

  const handleComparison1 = useCallback(({ value }) => {
    setCompany1(value);
  }, []);

  const handleComparison2 = useCallback(({ value }) => {
    setCompany2(value);
  }, []);

  const compare = useCallback(() => {
    navigate(`/comparison/${company1}/${company2}`);
  }, [navigate]);

  return (
    <div className="navbar flex flex-row justify-between p-10 items-center">
      <CompanySearch
        style={{ width: 500 }}
        placeholder="Search by Company Name or CIK number"
        value={[]}
        onSelect={handleSelect}
      />
      <button
        onClick={showModal}
        className="flex items-center py-2 px-6 text-blue-700 text-base fontClass font-bold compare-button"
      >
        Compare Analytics
      </button>
      <Modal
        visible={isModalVisible}
        // onOk={handleOk}
        // onCancel={handleCancel}
        className="p-40 flex items-center shadow-md rounded-xl"
        footer={null}
        // padding={300}
        // width={800}
      >
        <div className="p-2 space-y-4">
          <div className="topbar font-bold fontClass text-xl">Compare Analytics</div>
          <div className="font-normal text-base">
            Compare metrices of two companies to get better information of the market space.
          </div>
          <div>
            <div className="font-normal text-base text-gray-500">Select the first company:</div>
            <CompanySearch
              style={{ width: 500 }}
              placeholder="Search by Company Name or CIK number"
              value={company1}
              // defaultValue={{name: company?.name, cik: company?.cik}}
              onSelect={handleComparison1}
              mode={null}
            />
          </div>
          <div>
            <div className="font-normal text-base  text-gray-500">Select the second company:</div>
            <CompanySearch
              style={{ width: 500 }}
              placeholder="Search by Company Name or CIK number"
              value={company2}
              onSelect={handleComparison2}
              mode={null}
              // onSelect={handleComparison}
              // onSelect={handleSelect}
            />
          </div>

          <div className="flex flex-row-reverse">
            <button
              onClick={compare}
              className="flex items-center py-2 px-6 text-blue-700 text-base fontClass font-bold compare-button"
            >
              Compare Analytics
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
