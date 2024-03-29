import React from "react";

const CompaniesView = ({ company }) => {
  console.log(company);

  return (
    <div className="col-sm-12 col-md-6 col-lg-6">
      <div className="card bg-light mb-3 border-info">
        <div className="card-header">
          <h3>{company.companyName}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <strong>Description: </strong>
            {company.description}
          </h5>
          <p className="card-text">Website: {company.website}</p>
        </div>
      </div>
    </div>
  );
};

export default CompaniesView;
