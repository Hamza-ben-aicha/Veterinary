import React , {useEffect , useState}from "react";

import { Container, Grow, Grid, Button } from "@material-ui/core";
import {getPosts} from'../../actions/posts';
import Posts from "../Posts/Posts";
import Form from "../Form/From";
import useStyles from './styles';
import { useDispatch } from "react-redux";


const Home =() => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    //hook    
    const dispatch = useDispatch();
    //compdidmount & later on it will be -> componentedidupdate
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId,dispatch]);

    const [active,setActive]=useState(false);

    // localStorage.setItem('active',active);
    return (
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
            {active ? (
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            ) : (
              <Button type="button" variant="contained" onClick={()=>setActive(true)} className={classes.buttonSubmit}>
                Create Post
              </Button>
            )}
              </Grid>

          </Grid>
        </Container>
      </Grow>
    );
}


export default Home;