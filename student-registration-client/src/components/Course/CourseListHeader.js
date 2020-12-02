import React from "react";

const CourseListHeader = () =>  {
    return (
        <div>
            <table className="table table-striped" style={{ width: '900px' }}>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default CourseListHeader;