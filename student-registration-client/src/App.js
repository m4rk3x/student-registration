import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"
import AddUpdateStudent from './components/Student/AddUpdateStudent';
import StudentList from './components/Student/StudentList';
import SideBar from "./components/Layout/sidebar";
import AddUpdateCourse from './components/Course/AddUpdateCourse';
import CourseList from './components/Course/CourseList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">

          <SideBar />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/studentList" component={StudentList} />
          <Route exact path="/addUpdateStudent" component={AddUpdateStudent} />
          <Route exact path="/addUpdateStudent/:id" component={AddUpdateStudent} />
          <Route exact path="/deleteStudent/:id" component={AddUpdateStudent} />
          <Route exact path="/courseList" component={CourseList} />
          <Route exact path="/addUpdateCourse" component={AddUpdateCourse} />
          <Route exact path="/addUpdateCourse/:id" component={AddUpdateCourse} />
          <Route exact path="/deleteCourse/:id" component={AddUpdateCourse} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
