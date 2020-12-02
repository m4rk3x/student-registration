import React from "react";

const StudentListHeader = () =>  {
    return (
        //React.Fragment wraps it in a invisible parent component 
        <div>
            <table className="table table-striped" style={{ width: '900px' }}>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default StudentListHeader;