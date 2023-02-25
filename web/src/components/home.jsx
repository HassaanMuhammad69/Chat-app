
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';


function Home() {

  let { state } = useContext(GlobalContext);


  const [tweets, settweets] = useState([])
  const [loadtweet, setloadtweet] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTweet, seteditingTweet] = useState(null)

  const [eof, setEof] = useState(false)
  const [preview, setPreview] = useState(null)



  const getAlltweets = async () => {
    if (eof) return;
    try {
      const response = await axios.get(`${state.baseUrl}/tweetFeed?page=${tweets.length}`)
      console.log("response: ", response.data);

      if (response.data.data.length === 0) setEof(true)

      settweets((prev) => {
        return [...prev, ...response.data.data]
      })

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

      let fileInput= document.getElementById("picture")
      console.log("fileInput: ", fileInput.files[0]);

      let formData = new FormData();
      formData.append("myFile", fileInput.files[0]);
      formData.append("text", values.tweetsText);

      axios({
        method: 'post',
        url: `${state.baseUrl}/tweet`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(res => {
          setloadtweet(!loadtweet)
          console.log(`upload Success` + res.data);
        })
        .catch(err => {
          console.log("error: ", err);
        })


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
      <h1>this is Home</h1>

      <form onSubmit={myFormik.handleSubmit}>
        <textarea
          id="tweetsText"
          placeholder="What is in your mind?"
          value={myFormik.values.tweetsText}
          onChange={myFormik.handleChange}
          rows="4"
          cols="50"
        ></textarea>
        {
          (myFormik.touched.tweetsText && Boolean(myFormik.errors.tweetsText)) ?
            <span style={{ color: "red" }}>{myFormik.errors.tweetsText}</span>
            :
            null
        }
        <br />
        <label htmlFor='picture'>Picture for tweet</label>
        <br />
        <input 
        id='picture' 
        type="file" 
        accept='image/*' 
        onChange={(e)=>{

          let url = URL.createObjectURL(e.currentTarget.files[0])
          console.log("url: ", url);

          setPreview(url)

        }}
        />
        <br/>
        <img width={200} src={preview} alt=""/>


        <br />
        <button type="submit"> Submit </button>
      </form>

      <br />
      <br />




      <InfiniteScroll
        pageStart={0}
        loadMore={getAlltweets}
        hasMore={!eof}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {tweets.map((eachProduct, i) => (
          <div key={i} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
            <h2>{eachProduct?.owner?.firstName}</h2>
            <div>{moment(eachProduct?.createdOn).fromNow()} </div>
            <h2>{eachProduct?.text}</h2>

            <img width={200} src={eachProduct?.imageUrl} alt="tweetimage" />

          <br/>

            <button onClick={() => {
              deleteTweet(eachProduct._id)
            }}>delete</button>

            <button onClick={() => {
              editMode(eachProduct)
            }}>edit</button>

            {(isEditMode && editingTweet._id === eachProduct._id) ?
              <div>

                <form onSubmit={editFormik.handleSubmit}>
                  <input
                    id="tweetsText"
                    placeholder="Product Name"
                    value={editFormik.values.tweetsText}
                    onChange={editFormik.handleChange}
                  />
                  {
                    (editFormik.touched.tweetsText && Boolean(editFormik.errors.tweetsText)) ?
                      <span style={{ color: "red" }}>{editFormik.errors.tweetsText}</span>
                      :
                      null
                  }

                  <br />
                  <input
                    id="productPrice"
                    placeholder="Product Price"
                    value={editFormik.values.productPrice}
                    onChange={editFormik.handleChange}
                  />
                  {
                    (editFormik.touched.productPrice && Boolean(editFormik.errors.productPrice)) ?
                      <span style={{ color: "red" }}>{editFormik.errors.productPrice}</span>
                      :
                      null
                  }

                  <br />
                  <input
                    id="productDescription"
                    placeholder="Product Description"
                    value={editFormik.values.productDescription}
                    onChange={editFormik.handleChange}
                  />
                  {
                    (editFormik.touched.productDescription && Boolean(editFormik.errors.productDescription)) ?
                      <span style={{ color: "red" }}>{editFormik.errors.productDescription}</span>
                      :
                      null
                  }

                  <br />
                  <button type="submit"> Submit </button>
                </form>

              </div> : null}

          </div>
        ))}
      </InfiniteScroll>




    </div >

  );
}

export default Home;