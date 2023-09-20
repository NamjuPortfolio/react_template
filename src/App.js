import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import Nav from "./components/Nav";
import store, { logIn, loggedIn } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./example/Example";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Modify from "./pages/Modify";
import FindEmail from "./pages/FindEmail";
import Write from "./pages/Write";
import Service from "./pages/Service";
import Notice from "./pages/service/Notice";
import Online from "./pages/service/Online";
import Qna from "./pages/service/Qna";
import Gallery from "./pages/service/Gallery";
function App() {

  
  


  return (
    <>
    <Provider store={store}>
      <Inner />
    </Provider>
    </>
  );
}

function Inner(){
  const light = {
    colors: {
      Primary : "orange",
      Secondary : "orangered",
      BgColor : "#e9f1f6",
      Color : "#000",
      ContentBg : "#fff"

    }
  }
  const dark = {
    colors : {
      Primary : "#272929",
      Secondary : "#e9e9e9",
      BgColor: "#333",
      Color: "#e9e9e9",
      ContentBg: "#272929"
    }
  }
  const theme = useSelector(state => state.dark);
  const DarkMode = theme === 'light' ? light : dark;
  const userState = useSelector(state => state.user);
  console.log(userState)

  const dispatch = useDispatch();
  const uid = sessionStorage.getItem("users");
  if(uid){
    dispatch(logIn(uid));
  }

  useEffect(()=>{
    const fetchUser = async () =>{
      if(!uid) return;

      const userDoc = doc(collection(getFirestore(), "users"), uid);
      console.log(userDoc)

      try{
        const docSnapshot = await getDoc(userDoc);
        console.log(docSnapshot)
        if(docSnapshot.exists()){
          const userData = docSnapshot.data();
          dispatch(loggedIn(userData))
        }



      }catch(error){
        console.log(error)
      }

    }
    fetchUser();
  }, [dispatch, uid])


 return (
  <ThemeProvider theme={DarkMode}>

    <GlobalStyle/>
    <Aside/>
    <Nav userState={userState} />
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      {/* <Route path="/" element={<Example/>}></Route> */}
      <Route path="/member" element={<Member/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
      <Route path="/modify" element={<Modify/>}></Route>
      <Route path="/findemail" element={<FindEmail/>}></Route>
      <Route path="/write/:board" element={<Write/>}></Route>
      
      <Route path="/service" element={<Service />}>
        <Route path="notice" element={<Notice />}></Route>
        <Route path="online" element={<Online />}></Route>
        <Route path="qna" element={<Qna />}></Route>
        <Route path="gallery" element={<Gallery />}></Route>
      </Route>
    </Routes>
  </ThemeProvider>
 )
}

export default App;
