import React from "react";

const CompaniesView = ({ name, desc, website }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-header">{name}</div>
        <div className="card-body">
          <h5 className="card-title">{desc}</h5>
          <p className="card-text">Website: {website}</p>
        </div>
      </div>
    </div>
  );
};

export default CompaniesView;
