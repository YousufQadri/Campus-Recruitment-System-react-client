import React from "react";
import ApplyModal from "../ApplyModal";

const AppliedJobsView = ({ job }) => {
  console.log("Job", job);

  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div
        className="card border-info mb-3 text-info"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header">
          <h4>Title: {job.jobId.jobTitle}</h4>
        </div>
        <div className="card-body text-dark">
          <h5 className="card-title">
            <strong>Company: </strong>
            {/* {job.companyId.companyName} */}
          </h5>
          <h5 className="card-text">
            <strong>Job description: </strong>
            {job.jobId.description}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobsView;
