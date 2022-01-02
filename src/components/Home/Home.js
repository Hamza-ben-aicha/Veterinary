import React , {useEffect , useState}from "react";

import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/From";
//import useStyles from './styles';

import { useDispatch } from "react-redux";

import {getPosts} from'../../actions/posts';


const Home =() => {
    const [currentId, setCurrentId] = useState(null);
    //const classes = useStyles();
  //hook    
    const dispatch = useDispatch();
    //compdidmount & later on it will be -> componentedidupdate
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId,dispatch]);
    return (
    <Grow in>
        <Container>
        <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
        </Grid>
        </Container>
    </Grow>
    );
}


export default Home;