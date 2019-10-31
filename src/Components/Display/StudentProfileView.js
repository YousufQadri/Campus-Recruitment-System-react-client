import React from "react";
import user from "../../assets/img/user.png";

const StudentProfileView = ({ profile }) => {
  return (
    <div className="col-sm-6 col-md-12 col-lg-12">
      <div className="card mb-3 border-primary">
        <div className="card-header">
          <img src={user} alt="" width={170} />
          <h3>{profile.studentName}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <strong>Qualification:</strong> {profile.qualification}
          </h5>
          <p className="card-text">
            <strong>CGPA:</strong> {profile.cgpa}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;
