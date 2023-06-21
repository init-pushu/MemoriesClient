import React, { useState,useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Avatar, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';


import Post from '../Posts/Post/Post';
import { getUserById, getPostsByCreator, getPostsBySearch} from '../../actions/posts';
import swal from 'sweetalert';

const CreatorOrTag = () => {
  const { name } = useParams();
  // const { userr,isLoading } = useSelector((state) => state.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const {posts, isLoading } = useSelector((state) => state.posts);
  

  const location = useLocation();
  // const sd = user?.result?.DOB.toLocaledateString;

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  // useEffect(() => {
  //   dispatch(getUserById(name));
  // }, [name]);

  // if(!user)return(
  //   swal("Please Sign In to see User's activities!")
    
  // )
  // if(!user)return(
  //   router.push('/')
  // )


  if (!posts.length && !isLoading) return(
    <div>
      <Typography variant="h4">All Posts of {name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {name} has not added any post yet!
    </div>
  )

  const arr = posts[0];
  let dob='';let about='';let loc='';let pic='';

  // console.log(posts[0].title);
  if(!isLoading){
    console.log(arr.title);
    dob = arr.creatorDOB;
    dob = new Date(dob).toDateString();
    // dob=dob.toString();
    pic=arr.creatorpic;
    loc=arr.creatorloc;
    about=arr.creatorabout;
  }



  return (
    <div>
      <div style={{ float: "right"}}><img style={{height: "200px",width: "300px", borderRadius: "52%"}} src= {pic}/></div>
      {/* <div style={{float: "right", height: "200px"}}><Avatar  src={pic}></Avatar></div> */}
       <Typography variant="h4"><div style={{color: '#3f51b5', fontFamily:'sans-serif', fontStyle: 'oblique'}}>Welcome to {name}'s page!</div></Typography>
      <Divider style={{ margin: '5px 0 5px 0' }} />
      
      <Typography><div style={{fontSize: '18px', fontStyle: 'italic'}}><b>About {name} - </b>{about}</div></Typography>
      <Typography><div style={{fontSize: '18px', fontStyle: 'italic'}}><b>HomeTown - </b>{loc} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <b>Date Of Birth - </b>{dob.substring(4,)}</div></Typography>
      {/* <Typography><div style={{fontSize: '20px', fontStyle: 'italic'}}><b>HomeTown - </b>{loc} </div></Typography> */}
{/* <Divider style={{ margin: '5px 0 5px 0' }} />
      <Typography variant="h5"><div style={{color: 'red', fontStyle: 'oblique', fontFamily:'sans-serif'}}>All Posts of {name}!!</div></Typography> */}
      {/* <Divider style={{ margin: '10px 0 10px 0' }} /> */}
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => 
          (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
