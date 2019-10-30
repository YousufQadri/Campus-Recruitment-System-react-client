import React from "react";
import ApplyModal from "../ApplyModal";
import CreateModal from "../CreateModal";

const JobsView = ({ job, applyModal, createModal }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-header">
          <h4>{job.jobTitle}</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">{job.description}</h5>
          {applyModal ? <ApplyModal label="Apply now" job={job} /> : null}
        </div>
      </div>
    </div>
  );
};

export default JobsView;
