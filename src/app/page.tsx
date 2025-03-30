"use client";

import React from 'react';
import Header from "../app/components/headers/header";
// import EventsPage from './components/EventPage';
import HomeComp from './components/Home';
// shuld be a get title from the API
// fetch().then((response) => response.json()).then((data) => console.log(data));
// based on the click of the user in the system
const title = 'איתור מופעים';

export default function Home() {
  return (
    <div className="page-wapper">
        {/* <Header title={title} className='header' /> */}
    <HomeComp />
    </div>
  );
}