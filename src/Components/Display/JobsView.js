import React from "react";
import Modal from "../Modal";

const JobsView = ({ job }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-header">
          <h4>{job.jobTitle}</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">{job.description}</h5>
          {/* <p className="card-text">Website: {website}</p> */}
          <Modal label="Apply now" job={job} />
        </div>
      </div>
    </div>
  );
};

export default JobsView;
