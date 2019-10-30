import React from "react";
import user from "../../assets/img/user.png";

const StudentsView = ({ student }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="card bg-light mb-3 border-info">
        <div className="card-header">
          <img src={user} alt="user-image" width={170} />
          <h3>{student.studentName}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <strong>Qualification:</strong> {student.qualification}
          </h5>
          <p className="card-text">
            <strong>CGPA:</strong> {student.cgpa}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {student.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentsView;
