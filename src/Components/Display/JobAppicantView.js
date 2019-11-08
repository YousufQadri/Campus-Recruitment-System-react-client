import React from "react";
import moment from "moment";

const JobApplicantView = ({ applicant }) => {
  console.log(applicant);
  return (
    //   {jobs.map(job =>
    //       console.log(job)

    //   })}

    // <JobCollapse title={applicant.jobId.jobTitle} />
    <div className="col-sm-6">
      <div className="list-group mb-4">
        <div className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h4 className="mb-1">
              <strong>Job:</strong> {applicant.jobId.jobTitle}
            </h4>
            <small>{moment(applicant.createdAt).fromNow()}</small>
          </div>
          <hr />
          <div className="flex">
            <p className="mb-1">
              <strong>Student Name: </strong> {applicant.studentId.studentName}
            </p>
            <p className="mb-1">
              <strong>Qualification: </strong>
              {applicant.studentId.qualification}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicantView;
