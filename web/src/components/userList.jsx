
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';


function Home() {

  let { state } = useContext(GlobalContext);



  useEffect(() => {

  }, [])




  return (
    <div>
      <h1>Search user to start the chat</h1>

     



    </div >

  );
}

export default Home;