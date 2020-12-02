import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"
import AddStudent from './components/Student/AddStudent';
import StudentList from './components/Student/StudentList';
import UpdateStudent from './components/Student/UpdateStudent';
import SideBar from "./components/Layout/sidebar";
import AddCourse from './components/Course/AddCourse';
import CourseList from './components/Course/CourseList';
import UpdateCourse from './components/Course/UpdateCourse';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">

          <SideBar />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/studentList" component={StudentList} />
          <Route exact path="/addStudent" component={AddStudent} />
          <Route exact path="/updateStudent/:id" component={UpdateStudent} />
          <Route exact path="/deleteStudent/:id" component={UpdateStudent} />
          <Route exact path="/courseList" component={CourseList} />
          <Route exact path="/addCourse" component={AddCourse} />
          <Route exact path="/updateCourse/:id" component={UpdateCourse} />
          <Route exact path="/deleteCourse/:id" component={UpdateCourse} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
