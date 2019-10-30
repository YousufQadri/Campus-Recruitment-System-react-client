import React from "react";

const CompanyProfileView = ({ profile }) => {
  return (
    <div className="col-sm-6 col-md-12 col-lg-12">
      <div className="card mb-3 border-primary">
        <div className="card-header">
          <h3>{profile.companyName}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <strong>Description:</strong> {profile.description}
          </h5>
          <p className="card-text">{/* <strong>CGPA:</strong> {profile} */}</p>
          <div className="card-text">
            <h4>
              <strong>Contact info:</strong>
            </h4>
            <div className="row">
              <div className="col-sm-4">
                <strong>Email:</strong> {profile.email}
              </div>
              <div className="col-sm-4">
                <strong>Contact:</strong> {profile.contactNo}
              </div>
              <div className="col-sm-4">
                <strong>Website:</strong> {profile.website}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileView;
