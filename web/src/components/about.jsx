
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import './about.css'
import { Link  } from "react-router-dom";


import coverImage from '../img/cover.jpg';
import profileImage from '../img/profile.jpg';



function About() {

  let { state } = useContext(GlobalContext);


  const [tweets, settweets] = useState([])
  const [loadtweet, setloadtweet] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTweet, seteditingTweet] = useState(null)

  

  const getAlltweets = async () => {
    try {
      const response = await axios.get(`${state.baseUrl}/tweets`)
      console.log("response: ", response.data);

      settweets(response.data.data)

    } catch (error) {
      console.log("error in getting all tweets", error);
    }
  }

  const deleteTweet = async (id) => {
    try {
      const response = await axios.delete(`${state.baseUrl}/tweet/${id}`)
      console.log("response: ", response.data);

      setloadtweet(!loadtweet)

    } catch (error) {
      console.log("error in getting all tweets", error);
    }
  }

  const editMode = (tweet) => {
    setIsEditMode(!isEditMode)
    seteditingTweet(tweet)

    editFormik.setFieldValue("tweetsText", tweet.name)
    editFormik.setFieldValue("tweetsPrice", tweet.price)
    editFormik.setFieldValue("tweetsDescription", tweet.description)

  }

  useEffect(() => {

    getAlltweets()

  }, [loadtweet])


  const tweetsValidatonSchema = yup.object({
    tweetsText: yup
      .string('Enter your tweets name')
      .required('tweets name is required')
      .min(3, "please enter more then 3 characters ")
      .max(140, "please enter within 140 characters ")
  })

  const myFormik = useFormik({
    initialValues: {
      tweetsText: ''
    },

    validationSchema: tweetsValidatonSchema,
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.post(`${state.baseUrl}/tweet`, {
        text: values.tweetsText
      })
        .then(response => {
          console.log("response: ", response.data);
          setloadtweet(!loadtweet)
        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });
  
  const editFormik = useFormik({
    initialValues: {
      tweetsText: ''
    },
    validationSchema: tweetsValidatonSchema,
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.put(`${state.baseUrl}/tweet/${editingTweet._id}`, {
        text: values.tweetsText,

      })
        .then(response => {
          console.log("response: ", response.data);
          setloadtweet(!loadtweet)

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });


  return (

    <div>
        <div className='banner'>
            <img className='cover' src={coverImage} alt=''/>
            <img className='profile'src={profileImage} alt=''/>
            <button>
            <Link to={`/change-password`}>Change Password</Link>
            </button>
        </div>


    </div>





  );
}

export default About;